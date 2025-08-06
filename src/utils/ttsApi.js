// Swedish TTS API Client
const API_BASE_URL = process.env.REACT_APP_TTS_API_URL || 'https://flodhasten-tts-api.onrender.com';

class SwedishTTSApi {
  constructor() {
    this.baseUrl = API_BASE_URL;
    this.cache = new Map(); // Simple in-memory cache
  }

  // Generate audio for Swedish text
  async generateAudio(text, service = 'auto') {
    try {
      // Check cache first
      const cacheKey = `${text}-${service}`;
      if (this.cache.has(cacheKey)) {
        console.log('Using cached audio for:', text);
        return this.cache.get(cacheKey);
      }

      console.log(`Requesting TTS for: "${text}" using service: ${service}`);

      const response = await fetch(`${this.baseUrl}/api/tts`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text, service })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'TTS request failed');
      }

      const audioBlob = await response.blob();
      const audioUrl = URL.createObjectURL(audioBlob);
      
      // Cache the result
      this.cache.set(cacheKey, audioUrl);
      
      console.log(`TTS generated successfully using service: ${response.headers.get('X-Used-Service')}`);
      return audioUrl;

    } catch (error) {
      console.error('TTS API Error:', error);
      throw error;
    }
  }

  // Play Swedish text using browser TTS as primary, API as fallback
  async playSwedish(text, service = 'auto') {
    console.log('🎤 Playing Swedish:', text);

    // Try browser TTS first (primary source)
    try {
      const browserResult = await this.playSwedishBrowser(text);
      if (browserResult) {
        console.log('✅ Browser TTS used successfully');
        return browserResult;
      }
    } catch (error) {
      console.log('⚠️ Browser TTS failed, trying API fallback:', error.message);
    }

    // Fallback to API if browser TTS fails
    try {
      console.log('🔄 Using TTS API as fallback for:', text);
      const audioUrl = await this.generateAudio(text, service);
      const audio = new Audio(audioUrl);
      
      // Clean up the URL after playing
      audio.onended = () => {
        URL.revokeObjectURL(audioUrl);
      };
      
      audio.onerror = () => {
        console.error('Audio playback failed');
        URL.revokeObjectURL(audioUrl);
      };

      await audio.play();
      console.log('✅ TTS API fallback audio played successfully');
      return audio;

    } catch (error) {
      console.error('❌ Both browser TTS and API failed:', error);
      throw error;
    }
  }

  // Browser TTS implementation (primary source)
  async playSwedishBrowser(text) {
    return new Promise((resolve, reject) => {
      if (!('speechSynthesis' in window)) {
        reject(new Error('Speech synthesis not supported'));
        return;
      }

      // Stop any current speech
      window.speechSynthesis.cancel();
      
      const speakWithSwedishVoice = () => {
        const voices = window.speechSynthesis.getVoices();
        console.log('Available voices:', voices.map(v => `${v.name} (${v.lang})`));
        
        // Only use Alva (sv-SE) voice as requested
        let swedishVoice = voices.find(voice => 
          voice.name.toLowerCase().includes('alva') && voice.lang === 'sv-SE'
        );
        
        const utter = new window.SpeechSynthesisUtterance(text);
        utter.lang = 'sv-SE';
        utter.rate = 0.8; // Slightly faster for better flow
        utter.pitch = 1.0;
        utter.volume = 1.0;
        
        if (swedishVoice) {
          utter.voice = swedishVoice;
          console.log('🎤 Using Alva (sv-SE) voice:', swedishVoice.name, swedishVoice.lang);
        } else {
          console.log('⚠️ Alva (sv-SE) voice not found. Not playing audio.');
          reject(new Error('Alva (sv-SE) voice not available'));
          return;
        }
        
        utter.onend = () => {
          console.log('✅ Browser TTS completed');
          resolve(true);
        };
        
        utter.onerror = (event) => {
          console.error('❌ Browser TTS error:', event.error);
          reject(new Error(event.error));
        };
        
        window.speechSynthesis.speak(utter);
      };
      
      // If voices are already loaded
      if (window.speechSynthesis.getVoices().length > 0) {
        speakWithSwedishVoice();
      } else {
        // Wait for voices to load
        window.speechSynthesis.onvoiceschanged = speakWithSwedishVoice;
      }
    });
  }

  // Get available services
  async getServices() {
    try {
      const response = await fetch(`${this.baseUrl}/api/services`);
      const data = await response.json();
      return data.services;
    } catch (error) {
      console.error('Failed to get services:', error);
      return [];
    }
  }

  // Health check
  async healthCheck() {
    try {
      const response = await fetch(`${this.baseUrl}/api/health`);
      const data = await response.json();
      return data.status === 'healthy';
    } catch (error) {
      console.error('Health check failed:', error);
      return false;
    }
  }

  // Test the API
  async test() {
    try {
      const response = await fetch(`${this.baseUrl}/api/test`);
      if (response.ok) {
        const audioBlob = await response.blob();
        const audioUrl = URL.createObjectURL(audioBlob);
        const audio = new Audio(audioUrl);
        
        audio.onended = () => {
          URL.revokeObjectURL(audioUrl);
        };
        
        await audio.play();
        return true;
      }
      return false;
    } catch (error) {
      console.error('Test failed:', error);
      return false;
    }
  }

  // Clear cache
  clearCache() {
    this.cache.clear();
    console.log('TTS cache cleared');
  }
}

// Create singleton instance
const ttsApi = new SwedishTTSApi();

export default ttsApi; 