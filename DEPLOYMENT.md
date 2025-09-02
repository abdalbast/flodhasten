# Flodhästen Deployment Guide

This guide covers deployment to both staging (GitHub Pages) and production (Vercel) environments.

## 🚀 Quick Deploy

### Staging (GitHub Pages)
```bash
npm run deploy:staging
```

### Production (Vercel)
```bash
npm run deploy:production
```

## 📋 Prerequisites

### For Staging (GitHub Pages)
- GitHub account
- Repository access
- `gh-pages` package (already installed)

### For Production (Vercel)
- Vercel account
- Vercel CLI installed: `npm i -g vercel`
- Environment variables configured in Vercel dashboard

## 🔧 Environment Setup

### Vercel Environment Variables
Configure these in your Vercel project dashboard:

1. Go to your Vercel project settings
2. Navigate to "Environment Variables"
3. Add the following variables:

| Variable | Value | Environment |
|----------|-------|-------------|
| `AZURE_TRANSLATION_KEY` | Your Azure Translation API key | Production |
| `AZURE_TRANSLATION_REGION` | `westeurope` (or your region) | Production |
| `NODE_ENV` | `production` | Production |

## 🛠️ Deployment Process

### 1. Staging Deployment (GitHub Pages)

```bash
# Build and deploy to staging
npm run deploy:staging
```

**What happens:**
- Runs version update script
- Builds the application
- Deploys to `gh-pages` branch
- Available at: `https://abdalbast.github.io/flodhasten/`

### 2. Production Deployment (Vercel)

```bash
# First time setup
vercel login

# Deploy to production
npm run deploy:production
```

**What happens:**
- Builds the application using Vercel's build system
- Deploys with security headers
- Available at: `https://flodhasten.vercel.app/`

## 🔒 Security Features

### Production Security Headers
The Vercel deployment includes comprehensive security headers:

- **Content Security Policy**: Restricts resource loading
- **Permissions Policy**: Controls microphone access
- **Strict Transport Security**: Enforces HTTPS
- **X-Frame-Options**: Prevents clickjacking
- **X-Content-Type-Options**: Prevents MIME sniffing
- **X-XSS-Protection**: Additional XSS protection

### API Security
- CORS properly configured
- Rate limiting implemented
- Input validation
- Error handling without exposing internals

## 📊 Monitoring

### Performance Monitoring
```bash
# Run Lighthouse audit
npm run lighthouse
```

### Security Audit
```bash
# Check for vulnerabilities
npm run audit
```

## 🔄 Rollback

### GitHub Pages Rollback
```bash
# Revert to previous version
git checkout gh-pages
git reset --hard HEAD~1
git push origin gh-pages --force
```

### Vercel Rollback
```bash
# List deployments
vercel ls

# Rollback to previous deployment
vercel rollback
```

## 🚨 Troubleshooting

### Common Issues

1. **Build Failures**
   ```bash
   # Clear cache and rebuild
   rm -rf node_modules package-lock.json
   npm install
   npm run build
   ```

2. **Environment Variables Not Working**
   - Check Vercel dashboard settings
   - Ensure variables are set for correct environment
   - Redeploy after adding variables

3. **API Endpoints Not Working**
   - Verify Azure Translation API key
   - Check network connectivity
   - Review browser console for errors

### Debug Commands

```bash
# Test build locally
npm run build

# Test API locally
node translate-proxy.js

# Check environment variables
echo $AZURE_TRANSLATION_KEY
```

## 📝 Deployment Checklist

Before deploying to production:

- [ ] All tests pass: `npm test`
- [ ] Build succeeds: `npm run build`
- [ ] Lighthouse score > 90: `npm run lighthouse`
- [ ] No security vulnerabilities: `npm run audit`
- [ ] Environment variables configured
- [ ] API endpoints tested
- [ ] Mobile responsiveness verified
- [ ] Accessibility features working

## 🔗 Useful Links

- **Staging**: https://abdalbast.github.io/flodhasten/
- **Production**: https://flodhasten.vercel.app/
- **Vercel Dashboard**: https://vercel.com/dashboard
- **Azure Portal**: https://portal.azure.com/
- **GitHub Repository**: https://github.com/abdalbast/flodhasten
