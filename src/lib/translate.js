// Client-side translation library with HMAC signing
import { generateHMAC, getCurrentTimestamp } from './crypto';

// Types for translation requests and responses (JSDoc comments)
/**
 * @typedef {Object} TranslateRequest
 * @property {string} text - Text to translate
 * @property {string} from - Source language code
 * @property {string} to - Target language code
 * @property {number} ts - Timestamp
 * @property {string} sig - HMAC signature
 */

/**
 * @typedef {Object} TranslateResponse
 * @property {string} translated - Translated text
 * @property {string} [error] - Error message if any
 */

// Configuration
const API_ENDPOINT = '/api/translate';
const CLIENT_SECRET = process.env.REACT_APP_TRANSLATE_SECRET || '';

// Error class for translation errors
export class TranslationError extends Error {
  constructor(message, status) {
    super(message);
    this.name = 'TranslationError';
    this.status = status;
  }
}

/**
 * Translate text using the secure API
 * @param {string} text - Text to translate
 * @param {string} from - Source language code (e.g., 'sv')
 * @param {string} to - Target language code (e.g., 'en')
 * @returns {Promise<string>} - Translated text
 */
export async function translateText(text, from = 'sv', to = 'en') {
  try {
    // Validate inputs
    if (!text || typeof text !== 'string') {
      throw new TranslationError('Invalid text provided');
    }

    if (!CLIENT_SECRET) {
      throw new TranslationError('Translation secret not configured');
    }

    // Generate timestamp
    const ts = getCurrentTimestamp();

    // Generate HMAC signature
    const sig = await generateHMAC(text, from, to, ts, CLIENT_SECRET);

    // Prepare request
    const request: TranslateRequest = {
      text,
      from,
      to,
      ts,
      sig
    };

    // Make API call
    const response = await fetch(API_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(request)
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new TranslationError(
        errorData.error || `HTTP ${response.status}`,
        response.status
      );
    }

    const data: TranslateResponse = await response.json();
    
    if (data.error) {
      throw new TranslationError(data.error);
    }

    if (!data.translated) {
      throw new TranslationError('No translation received');
    }

    return data.translated;

  } catch (error) {
    if (error instanceof TranslationError) {
      throw error;
    }
    
    console.error('Translation error:', error);
    throw new TranslationError('Translation failed');
  }
}

/**
 * Translate multiple texts in batch
 * @param {string[]} texts - Array of texts to translate
 * @param {string} from - Source language code
 * @param {string} to - Target language code
 * @returns {Promise<string[]>} - Array of translated texts
 */
export async function translateBatch(texts, from = 'sv', to = 'en') {
  const results: string[] = [];
  
  for (const text of texts) {
    try {
      const translated = await translateText(text, from, to);
      results.push(translated);
      
      // Rate limiting: wait 400ms between requests
      await new Promise(resolve => setTimeout(resolve, 400));
    } catch (error) {
      console.error(`Failed to translate "${text}":`, error);
      results.push('(translation failed)');
    }
  }
  
  return results;
}

/**
 * Check if translation service is available
 * @returns {Promise<boolean>} - True if service is available
 */
export async function checkTranslationService() {
  try {
    const testText = 'hej';
    await translateText(testText, 'sv', 'en');
    return true;
  } catch (error) {
    console.warn('Translation service not available:', error);
    return false;
  }
}

// Export types for use in other modules (JSDoc types)
