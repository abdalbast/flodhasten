# 🎤 Swedish TTS API

A free Swedish Text-to-Speech API that uses multiple free TTS services to provide high-quality Swedish pronunciation.

## 🚀 Features

- **Multiple Free TTS Services**: Google Translate, ResponsiveVoice, FreeTTS, Yandex
- **Automatic Fallback**: If one service fails, automatically tries others
- **Caching**: Client-side caching for better performance
- **Cross-Platform**: Works on all devices and browsers
- **Completely Free**: No API keys or paid services required

## 📦 Installation

```bash
cd api
npm install
```

## 🏃‍♂️ Running the API

### Development Mode
```bash
npm run dev
```

### Production Mode
```bash
npm start
```

The API will run on `http://localhost:3001`

## 📡 API Endpoints

### POST `/api/tts`
Generate Swedish audio from text.

**Request:**
```json
{
  "text": "hej världen",
  "service": "auto" // optional: "googleTranslate", "responsivevoice", "freetts", "yandex", "auto"
}
```

**Response:**
- `Content-Type: audio/mpeg`
- Audio file as binary data
- `X-Used-Service` header shows which service was used

### GET `/api/health`
Health check endpoint.

**Response:**
```json
{
  "status": "healthy",
  "service": "Swedish TTS API",
  "available_services": ["googleTranslate", "responsivevoice", "freetts", "yandex"]
}
```

### GET `/api/services`
Get list of available TTS services.

**Response:**
```json
{
  "services": ["googleTranslate", "responsivevoice", "freetts", "yandex"],
  "description": "Free Swedish Text-to-Speech services"
}
```

### GET `/api/test`
Test endpoint that plays "hej världen".

**Response:**
- `Content-Type: audio/mpeg`
- Audio file as binary data

## 🎮 Client Usage

### React Component Example
```javascript
import ttsApi from './utils/ttsApi';

// Play Swedish text
async function playSwedish() {
  try {
    await ttsApi.playSwedish('hej världen');
  } catch (error) {
    console.error('TTS failed:', error);
  }
}

// Test the API
async function testApi() {
  const isHealthy = await ttsApi.healthCheck();
  if (isHealthy) {
    await ttsApi.test();
  }
}
```

## 🔧 Configuration

### Environment Variables
- `PORT`: Server port (default: 3001)
- `REACT_APP_TTS_API_URL`: Client-side API URL (default: http://localhost:3001)

### CORS
The API is configured to accept requests from any origin for development. For production, configure CORS appropriately.

## 🎯 TTS Services

### 1. Google Translate TTS
- **Quality**: High
- **Reliability**: Very High
- **Rate Limit**: Generous free tier

### 2. ResponsiveVoice
- **Quality**: Good
- **Reliability**: High
- **Rate Limit**: Free tier available

### 3. FreeTTS
- **Quality**: Medium
- **Reliability**: Medium
- **Rate Limit**: Free

### 4. Yandex TTS
- **Quality**: High
- **Reliability**: High
- **Rate Limit**: Free tier

## 🔄 Fallback Strategy

1. Try requested service (if specified)
2. Try Google Translate TTS
3. Try ResponsiveVoice
4. Try FreeTTS
5. Try Yandex TTS
6. Return error if all fail

## 🚀 Deployment

### Local Development
```bash
# Terminal 1: Start API
cd api && npm run dev

# Terminal 2: Start React App
cd src && npm start
```

### Production
Deploy the API to your preferred hosting service (Heroku, Vercel, Railway, etc.) and update the client configuration.

## 🐛 Troubleshooting

### Common Issues

1. **CORS Errors**: Ensure the API is running and CORS is configured
2. **Audio Not Playing**: Check browser console for errors
3. **Service Failures**: The API will automatically try other services

### Debug Mode
Check the server console for detailed logs about which services are being tried and which one succeeds.

## 📝 License

This project is open source and free to use.

## 🤝 Contributing

Feel free to add more free TTS services or improve the existing ones! 