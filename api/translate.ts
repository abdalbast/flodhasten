import type { VercelRequest, VercelResponse } from '@vercel/node';
interface TranslateRequest {
  text: string;
  from: string;
  to: string;
}

interface TranslateResponse {
  translated: string;
  error?: string;
}

// CORS configuration - only allow Vercel domains
const ALLOWED_ORIGINS = [
  'https://flodhasten.vercel.app',
  'https://abdalbast.github.io',
  'http://localhost:3000' // For development
];

const ALLOWED_LANGS = new Set(['sv', 'en', 'ku', 'ku-lat']);
const MAX_TEXT_LENGTH = 500;
const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX_REQUESTS = 30;
const requestLog = new Map<string, number[]>();

function getClientKey(req: VercelRequest): string {
  const forwardedFor = req.headers['x-forwarded-for'];
  const realIp = req.headers['x-real-ip'];
  const rawIp = Array.isArray(forwardedFor)
    ? forwardedFor[0]
    : (forwardedFor || realIp || req.socket?.remoteAddress || 'unknown');
  const ip = String(rawIp).split(',')[0].trim();
  return ip || 'unknown';
}

function isRateLimited(clientKey: string): { limited: boolean; retryAfterSeconds?: number } {
  const now = Date.now();
  const recent = (requestLog.get(clientKey) || []).filter(ts => now - ts < RATE_LIMIT_WINDOW_MS);
  requestLog.set(clientKey, recent);

  if (recent.length >= RATE_LIMIT_MAX_REQUESTS) {
    const oldest = recent[0];
    const retryAfterSeconds = Math.max(1, Math.ceil((RATE_LIMIT_WINDOW_MS - (now - oldest)) / 1000));
    return { limited: true, retryAfterSeconds };
  }

  recent.push(now);
  requestLog.set(clientKey, recent);
  return { limited: false };
}

// CORS helper
function setCORSHeaders(req: VercelRequest, res: VercelResponse): boolean {
  const origin = req.headers.origin;
  
  if (!origin || !ALLOWED_ORIGINS.includes(origin)) {
    res.status(403).json({ error: 'Origin not allowed' });
    return false;
  }
  
  res.setHeader('Access-Control-Allow-Origin', origin);
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Access-Control-Max-Age', '86400'); // 24 hours
  
  return true;
}

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
): Promise<void> {
  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    if (!setCORSHeaders(req, res)) return;
    res.status(200).end();
    return;
  }

  // Only allow POST requests
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  // Set CORS headers
  if (!setCORSHeaders(req, res)) return;

  try {
    const clientKey = getClientKey(req);
    const rateLimit = isRateLimited(clientKey);
    if (rateLimit.limited) {
      if (rateLimit.retryAfterSeconds) {
        res.setHeader('Retry-After', String(rateLimit.retryAfterSeconds));
      }
      res.status(429).json({ error: 'Rate limit exceeded. Please try again later.' });
      return;
    }

    const { text, from, to }: TranslateRequest = req.body;

    // Validate required fields
    if (!text || !from || !to) {
      res.status(400).json({ error: 'Missing required fields' });
      return;
    }

    if (typeof text !== 'string' || typeof from !== 'string' || typeof to !== 'string') {
      res.status(400).json({ error: 'Invalid request payload' });
      return;
    }

    if (text.length > MAX_TEXT_LENGTH) {
      res.status(400).json({ error: `Text too long (max ${MAX_TEXT_LENGTH} chars)` });
      return;
    }

    if (!ALLOWED_LANGS.has(from) || !ALLOWED_LANGS.has(to)) {
      res.status(400).json({ error: 'Unsupported language pair' });
      return;
    }

    if (from === to) {
      res.status(400).json({ error: 'Source and target languages must be different' });
      return;
    }

    // Get Azure credentials
    const azureKey = process.env.AZURE_TRANSLATION_KEY;
    const azureRegion = process.env.AZURE_TRANSLATION_REGION || 'westeurope';

    if (!azureKey) {
      console.error('AZURE_TRANSLATION_KEY environment variable not set');
      res.status(500).json({ error: 'Translation service not configured' });
      return;
    }

    // Call Azure Translator API
    const response = await fetch(
      `https://api.cognitive.microsofttranslator.com/translate?api-version=3.0&from=${from}&to=${to}`,
      {
        method: 'POST',
        headers: {
          'Ocp-Apim-Subscription-Key': azureKey,
          'Ocp-Apim-Subscription-Region': azureRegion,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify([{ Text: text }])
      }
    );

    if (!response.ok) {
      console.error('Azure Translator API error:', response.status, response.statusText);
      res.status(500).json({ error: 'Translation service error' });
      return;
    }

    const data = await response.json();
    
    if (Array.isArray(data) && data[0] && data[0].translations && data[0].translations[0]) {
      const translated = data[0].translations[0].text;
      res.status(200).json({ translated });
    } else {
      res.status(500).json({ error: 'Invalid response from translation service' });
    }

  } catch (error) {
    console.error('Translation error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}
