import type { VercelRequest, VercelResponse } from '@vercel/node';
import crypto from 'crypto';

// Types for the request and response
interface TranslateRequest {
  text: string;
  from: string;
  to: string;
  ts: number;
  sig: string;
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

// HMAC verification function
function verifyHMAC(text: string, from: string, to: string, ts: number, sig: string): boolean {
  const serverSecret = process.env.TRANSLATE_SECRET;
  if (!serverSecret) {
    console.error('TRANSLATE_SECRET environment variable not set');
    return false;
  }

  // Create the message to verify
  const message = `${text}|${from}|${to}|${ts}`;
  
  // Create HMAC
  const hmac = crypto.createHmac('sha256', serverSecret);
  hmac.update(message);
  const expectedSig = hmac.digest('hex');
  
  return crypto.timingSafeEqual(
    Buffer.from(sig, 'hex'),
    Buffer.from(expectedSig, 'hex')
  );
}

// Check if timestamp is within 60 seconds
function isTimestampValid(ts: number): boolean {
  const now = Math.floor(Date.now() / 1000);
  const diff = Math.abs(now - ts);
  return diff <= 60; // 60 seconds tolerance
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
    const { text, from, to, ts, sig }: TranslateRequest = req.body;

    // Validate required fields
    if (!text || !from || !to || !ts || !sig) {
      res.status(400).json({ error: 'Missing required fields' });
      return;
    }

    // Validate timestamp
    if (!isTimestampValid(ts)) {
      res.status(400).json({ error: 'Request expired or invalid timestamp' });
      return;
    }

    // Verify HMAC signature
    if (!verifyHMAC(text, from, to, ts, sig)) {
      res.status(401).json({ error: 'Invalid signature' });
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
