# 🚀 Swedish TTS API Deployment Guide

## Free Hosting Options

### 1. Railway (Recommended)
1. Go to [railway.app](https://railway.app)
2. Sign up with GitHub
3. Click "New Project" → "Deploy from GitHub repo"
4. Select your `flodhasten-tts-api` repository
5. Railway will automatically detect it's a Node.js app
6. Your API will be available at: `https://your-project-name.railway.app`

### 2. Render
1. Go to [render.com](https://render.com)
2. Sign up with GitHub
3. Click "New" → "Web Service"
4. Connect your `flodhasten-tts-api` repository
5. Set:
   - **Name**: `flodhasten-tts-api`
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
6. Click "Create Web Service"
7. Your API will be available at: `https://your-service-name.onrender.com`

### 3. Heroku
1. Go to [heroku.com](https://heroku.com)
2. Sign up and install Heroku CLI
3. Run these commands:
   ```bash
   heroku login
   heroku create flodhasten-tts-api
   git push heroku main
   ```
4. Your API will be available at: `https://flodhasten-tts-api.herokuapp.com`

## Update Frontend API URL

After deployment, update the API URL in your React app:

```javascript
// In src/src/utils/ttsApi.js
const API_BASE_URL = 'https://your-deployed-url.com';
```

## Test Your Deployment

Test your deployed API:
```bash
curl -X POST https://your-deployed-url.com/api/tts \
  -H "Content-Type: application/json" \
  -d '{"text": "hej"}'
```

## Environment Variables (Optional)

You can set these in your hosting platform:
- `PORT`: Port number (usually auto-set)
- `NODE_ENV`: Set to `production`

## Monitoring

- **Railway**: Built-in monitoring and logs
- **Render**: Built-in monitoring and logs  
- **Heroku**: Use `heroku logs --tail` for logs

## Free Tier Limits

- **Railway**: $5/month free tier
- **Render**: Free tier with sleep after inactivity
- **Heroku**: No free tier anymore (paid only)

## Recommended: Railway

Railway is recommended because:
- ✅ Free tier available
- ✅ Automatic deployments from GitHub
- ✅ Built-in monitoring
- ✅ Easy environment variable management
- ✅ No sleep/wake delays 