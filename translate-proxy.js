const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

// Get Azure credentials from environment variables
const AZURE_KEY = process.env.AZURE_TRANSLATION_KEY;
const AZURE_REGION = process.env.AZURE_TRANSLATION_REGION || "westeurope";

// Validate that required environment variables are set
if (!AZURE_KEY) {
  console.error('ERROR: AZURE_TRANSLATION_KEY environment variable is required');
  console.error('Please set it in your .env file or environment');
  process.exit(1);
}

app.post('/api/translate', async (req, res) => {
  try {
    const { swedishArray } = req.body;
    if (!Array.isArray(swedishArray) || swedishArray.length === 0) {
      return res.status(400).json({ error: 'No words provided.' });
    }
    const translations = [];
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
      // To avoid rate limits, wait 400ms between requests
      await new Promise(res => setTimeout(res, 400));
    }
    res.json({ translations });
  } catch (err) {
    res.status(500).json({ error: 'Translation failed', details: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`Translation proxy running on http://localhost:${PORT}`);
});
