// Client-side translation library

// Types for translation requests and responses (JSDoc comments)
/**
 * @typedef {Object} TranslateRequest
 * @property {string} text - Text to translate
 * @property {string} from - Source language code
 * @property {string} to - Target language code
 */

/**
 * @typedef {Object} TranslateResponse
 * @property {string} translated - Translated text
 * @property {string} [error] - Error message if any
 */

// Configuration
const API_ENDPOINT = process.env.REACT_APP_TRANSLATE_API_URL || '/api/translate';

// Error class for translation errors
export class TranslationError extends Error {
  constructor(message, status) {
    super(message);
    this.name = 'TranslationError';
    this.status = status;
  }
}

/**
 * Translate text using the translation API
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

    // Prepare request
    /** @type {TranslateRequest} */
    const request = {
      text,
      from,
      to
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

    /** @type {TranslateResponse} */
    const data = await response.json();
    
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
  /** @type {string[]} */
  const results = [];
  
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
