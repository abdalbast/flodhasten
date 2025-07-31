// Swedish TTS API Client
const API_BASE_URL = process.env.REACT_APP_TTS_API_URL || 'https://flodhasten-tts-api-production.up.railway.app';

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

  // Play Swedish text using the API
  async playSwedish(text, service = 'auto') {
    try {
      console.log('🎤 Attempting to use TTS API for:', text);
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
      console.log('✅ TTS API audio played successfully');
      return audio;

    } catch (error) {
      console.error('❌ TTS API failed:', error);
      throw error;
    }
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