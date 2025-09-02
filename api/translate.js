// Vercel serverless function for Azure Translation API
// Handles Swedish to English translation requests

export default async function handler(req, res) {
  // Enable CORS for the frontend
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { swedishArray } = req.body;

    // Validate input
    if (!Array.isArray(swedishArray) || swedishArray.length === 0) {
      return res.status(400).json({ error: 'No words provided.' });
    }

    // Get Azure credentials from environment variables
    const AZURE_KEY = process.env.AZURE_TRANSLATION_KEY;
    const AZURE_REGION = process.env.AZURE_TRANSLATION_REGION || "westeurope";

    // Validate that required environment variables are set
    if (!AZURE_KEY) {
      console.error('ERROR: AZURE_TRANSLATION_KEY environment variable is required');
      return res.status(500).json({ error: 'Translation service not configured' });
    }

    const translations = [];

    // Translate each Swedish word
    for (const swedish of swedishArray) {
      const apiRes = await fetch('https://api.cognitive.microsofttranslator.com/translate?api-version=3.0&from=sv&to=en', {
        method: 'POST',
        headers: {
          'Ocp-Apim-Subscription-Key': AZURE_KEY,
          'Ocp-Apim-Subscription-Region': AZURE_REGION,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify([{ Text: swedish }])
      });

      const data = await apiRes.json();
      
      if (Array.isArray(data) && data[0] && data[0].translations && data[0].translations[0]) {
        translations.push(data[0].translations[0].text);
      } else {
        translations.push('(unknown)');
      }

      // Rate limiting: wait 400ms between requests
      await new Promise(resolve => setTimeout(resolve, 400));
    }

    res.status(200).json({ translations });
  } catch (err) {
    console.error('Translation error:', err);
    res.status(500).json({ error: 'Translation failed', details: err.message });
  }
}
