const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Free TTS Services
const TTS_SERVICES = {
  // FreeTTS - Free text-to-speech service
  freetts: async (text) => {
    try {
      const response = await axios.get(`https://freetts.com/Home/PlayAudio`, {
        params: {
          Language: 'sv-SE',
          Voice: 'sv-SE-Standard-A',
          TextMessage: text,
          type: 1
        },
        responseType: 'arraybuffer'
      });
      return response.data;
    } catch (error) {
      console.log('FreeTTS failed:', error.message);
      return null;
    }
  },

  // ResponsiveVoice - Another free TTS service
  responsivevoice: async (text) => {
    try {
      const response = await axios.get(`https://code.responsivevoice.org/getvoice.php`, {
        params: {
          t: text,
          tl: 'sv',
          srv: 'g1',
          spd: 0.8,
          vp: 'female'
        },
        responseType: 'arraybuffer'
      });
      return response.data;
    } catch (error) {
      console.log('ResponsiveVoice failed:', error.message);
      return null;
    }
  },

  // Google Translate TTS (free tier)
  googleTranslate: async (text) => {
    try {
      const response = await axios.get(`https://translate.google.com/translate_tts`, {
        params: {
          ie: 'UTF-8',
          q: text,
          tl: 'sv',
          client: 'tw-ob',
          total: 1,
          idx: 0,
          textlen: text.length
        },
        responseType: 'arraybuffer',
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
        }
      });
      return response.data;
    } catch (error) {
      console.log('Google Translate TTS failed:', error.message);
      return null;
    }
  },

  // Yandex TTS (free tier)
  yandex: async (text) => {
    try {
      const response = await axios.get(`https://tts.voicetech.yandex.net/tts`, {
        params: {
          text: text,
          lang: 'sv-SE',
          format: 'mp3',
          quality: 'hi'
        },
        responseType: 'arraybuffer'
      });
      return response.data;
    } catch (error) {
      console.log('Yandex TTS failed:', error.message);
      return null;
    }
  }
};

// Main TTS endpoint
app.post('/api/tts', async (req, res) => {
  try {
    const { text, service = 'auto' } = req.body;
    
    if (!text) {
      return res.status(400).json({ error: 'Text is required' });
    }

    console.log(`TTS request for: "${text}" using service: ${service}`);

    let audioData = null;
    let usedService = '';

    // Try specific service if requested
    if (service !== 'auto' && TTS_SERVICES[service]) {
      audioData = await TTS_SERVICES[service](text);
      usedService = service;
    }

    // If no specific service or it failed, try all services
    if (!audioData) {
      const services = Object.keys(TTS_SERVICES);
      
      for (const serviceName of services) {
        console.log(`Trying ${serviceName}...`);
        audioData = await TTS_SERVICES[serviceName](text);
        
        if (audioData) {
          usedService = serviceName;
          console.log(`Success with ${serviceName}`);
          break;
        }
      }
    }

    if (audioData) {
      res.set({
        'Content-Type': 'audio/mpeg',
        'Content-Length': audioData.length,
        'X-Used-Service': usedService
      });
      res.send(audioData);
    } else {
      res.status(500).json({ 
        error: 'All TTS services failed',
        message: 'Unable to generate audio for the given text'
      });
    }

  } catch (error) {
    console.error('TTS API Error:', error);
    res.status(500).json({ 
      error: 'Internal server error',
      message: error.message 
    });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'healthy', 
    service: 'Swedish TTS API',
    available_services: Object.keys(TTS_SERVICES)
  });
});

// Get available services
app.get('/api/services', (req, res) => {
  res.json({
    services: Object.keys(TTS_SERVICES),
    description: 'Free Swedish Text-to-Speech services'
  });
});

// Test endpoint
app.get('/api/test', async (req, res) => {
  try {
    const testText = 'hej världen';
    const audioData = await TTS_SERVICES.googleTranslate(testText);
    
    if (audioData) {
      res.set({
        'Content-Type': 'audio/mpeg',
        'Content-Length': audioData.length
      });
      res.send(audioData);
    } else {
      res.status(500).json({ error: 'Test failed' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`🎤 Swedish TTS API running on port ${PORT}`);
  console.log(`📡 Available endpoints:`);
  console.log(`   POST /api/tts - Generate Swedish audio`);
  console.log(`   GET  /api/health - Health check`);
  console.log(`   GET  /api/services - List available services`);
  console.log(`   GET  /api/test - Test endpoint`);
});

module.exports = app; 