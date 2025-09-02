// Crypto utilities for client-side HMAC generation
// Uses Web Crypto API for secure hash generation

/**
 * Generate HMAC-SHA256 signature for translation requests
 * @param {string} text - Text to translate
 * @param {string} from - Source language code
 * @param {string} to - Target language code
 * @param {number} ts - Timestamp
 * @param {string} secret - Client secret (will be hashed with server secret)
 * @returns {Promise<string>} - Hex-encoded HMAC signature
 */
export async function generateHMAC(text, from, to, ts, secret) {
  try {
    // Create the message to sign
    const message = `${text}|${from}|${to}|${ts}`;
    
    // Convert secret to ArrayBuffer
    const encoder = new TextEncoder();
    const keyData = encoder.encode(secret);
    
    // Import the key
    const cryptoKey = await crypto.subtle.importKey(
      'raw',
      keyData,
      { name: 'HMAC', hash: 'SHA-256' },
      false,
      ['sign']
    );
    
    // Sign the message
    const messageData = encoder.encode(message);
    const signature = await crypto.subtle.sign('HMAC', cryptoKey, messageData);
    
    // Convert to hex string
    return Array.from(new Uint8Array(signature))
      .map(b => b.toString(16).padStart(2, '0'))
      .join('');
  } catch (error) {
    console.error('HMAC generation error:', error);
    throw new Error('Failed to generate HMAC signature');
  }
}

/**
 * Generate a secure random string for client secret
 * @param {number} length - Length of the random string (default: 32)
 * @returns {Promise<string>} - Random hex string
 */
export async function generateRandomSecret(length = 32) {
  const array = new Uint8Array(length);
  crypto.getRandomValues(array);
  
  return Array.from(array)
    .map(b => b.toString(16).padStart(2, '0'))
    .join('');
}

/**
 * Get current timestamp in seconds
 * @returns {number} - Unix timestamp in seconds
 */
export function getCurrentTimestamp() {
  return Math.floor(Date.now() / 1000);
}

/**
 * Validate timestamp is within acceptable range
 * @param {number} ts - Timestamp to validate
 * @param {number} tolerance - Tolerance in seconds (default: 60)
 * @returns {boolean} - True if timestamp is valid
 */
export function isValidTimestamp(ts, tolerance = 60) {
  const now = getCurrentTimestamp();
  const diff = Math.abs(now - ts);
  return diff <= tolerance;
}
