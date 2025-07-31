// Performance utilities for Flodhästen

// Lazy load images with intersection observer
export const lazyLoadImage = (imgElement, src) => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        imgElement.src = src;
        observer.unobserve(imgElement);
      }
    });
  });
  
  observer.observe(imgElement);
};

// Preload critical images
export const preloadImages = (imageUrls) => {
  imageUrls.forEach(url => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'image';
    link.href = url;
    document.head.appendChild(link);
  });
};

// Optimize images for different screen sizes
export const getOptimizedImageUrl = (baseUrl, width) => {
  // For now, return the base URL
  // In production, you could use a CDN with width parameters
  return baseUrl;
};

// Debounce function for performance
export const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

// Throttle function for performance
export const throttle = (func, limit) => {
  let inThrottle;
  return function() {
    const args = arguments;
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
};

// Check if device is mobile
export const isMobile = () => {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
};

// Check connection speed
export const getConnectionSpeed = () => {
  if ('connection' in navigator) {
    const connection = navigator.connection;
    if (connection.effectiveType) {
      return connection.effectiveType; // 'slow-2g', '2g', '3g', '4g'
    }
  }
  return 'unknown';
};

// Optimize based on connection speed
export const shouldLoadHighResImages = () => {
  const speed = getConnectionSpeed();
  return speed === '4g' || speed === 'unknown';
};

// Cache management
export const clearOldCaches = async () => {
  if ('caches' in window) {
    const cacheNames = await caches.keys();
    const currentCacheNames = ['flodhasten-static-v1', 'flodhasten-dynamic-v1'];
    
    for (const cacheName of cacheNames) {
      if (!currentCacheNames.includes(cacheName)) {
        await caches.delete(cacheName);
      }
    }
  }
}; 