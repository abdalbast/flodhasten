// Configuration utility for API endpoints
// Handles different environments (development, staging, production)

const getApiEndpoint = () => {
  // Check if we're in production (Vercel)
  if (window.location.hostname.includes('vercel.app')) {
    return '/api/translate';
  }
  
  // Check if we're in staging (GitHub Pages)
  if (window.location.hostname.includes('github.io')) {
    // For GitHub Pages, we'll need to use the local proxy
    // This will be updated when we have a proper staging API
    return 'http://localhost:4000/api/translate';
  }
  
  // Development environment
  return 'http://localhost:4000/api/translate';
};

export const API_CONFIG = {
  translateEndpoint: getApiEndpoint(),
  timeout: 10000, // 10 seconds
  retryAttempts: 3
};

export default API_CONFIG;
