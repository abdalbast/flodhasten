// Image optimization utilities for better mobile performance

// Lazy loading utility
export const lazyLoadImage = (src, alt, className = '') => {
  return (
    <img
      src={src}
      alt={alt}
      className={className}
      loading="lazy"
      decoding="async"
      onLoad={(e) => {
        e.target.style.opacity = '1';
      }}
      style={{
        opacity: 0,
        transition: 'opacity 0.3s ease-in-out'
      }}
    />
  );
};

// Responsive image component
export const ResponsiveImage = ({ 
  src, 
  alt, 
  sizes = '100vw', 
  className = '',
  placeholder = null 
}) => {
  const [isLoaded, setIsLoaded] = React.useState(false);
  const [hasError, setHasError] = React.useState(false);

  const handleLoad = () => {
    setIsLoaded(true);
  };

  const handleError = () => {
    setHasError(true);
  };

  return (
    <div style={{ position: 'relative', overflow: 'hidden' }}>
      {placeholder && !isLoaded && (
        <div 
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: placeholder,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <div style={{ fontSize: '12px', color: '#666' }}>Loading...</div>
        </div>
      )}
      
      <img
        src={src}
        alt={alt}
        className={className}
        sizes={sizes}
        loading="lazy"
        decoding="async"
        onLoad={handleLoad}
        onError={handleError}
        style={{
          width: '100%',
          height: 'auto',
          opacity: isLoaded ? 1 : 0,
          transition: 'opacity 0.3s ease-in-out',
          display: hasError ? 'none' : 'block'
        }}
      />
      
      {hasError && (
        <div 
          style={{
            width: '100%',
            height: '100px',
            background: '#f0f0f0',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#666',
            fontSize: '14px'
          }}
        >
          Image unavailable
        </div>
      )}
    </div>
  );
};

// Preload critical images
export const preloadImage = (src) => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
};

// Preload multiple images
export const preloadImages = (imageSources) => {
  return Promise.all(imageSources.map(preloadImage));
};

// Generate responsive image sources
export const generateImageSources = (baseSrc, widths = [320, 640, 1024]) => {
  return widths.map(width => ({
    src: `${baseSrc}?w=${width}`,
    width: width
  }));
};

// Optimize image loading for mobile
export const optimizeForMobile = {
  // Reduce image quality for mobile
  getMobileImageSrc: (src, quality = 0.7) => {
    if (src.includes('?')) {
      return `${src}&q=${quality}&mobile=1`;
    }
    return `${src}?q=${quality}&mobile=1`;
  },

  // Check if device is mobile
  isMobile: () => {
    return window.innerWidth <= 768;
  },

  // Get appropriate image size
  getImageSize: (sizes) => {
    const isMobile = window.innerWidth <= 768;
    return isMobile ? sizes.mobile || sizes.default : sizes.desktop || sizes.default;
  }
};

// Image compression utility
export const compressImage = async (file, quality = 0.8, maxWidth = 1024) => {
  return new Promise((resolve) => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();

    img.onload = () => {
      // Calculate new dimensions
      let { width, height } = img;
      if (width > maxWidth) {
        height = (height * maxWidth) / width;
        width = maxWidth;
      }

      canvas.width = width;
      canvas.height = height;

      // Draw and compress
      ctx.drawImage(img, 0, 0, width, height);
      canvas.toBlob(resolve, 'image/jpeg', quality);
    };

    img.src = URL.createObjectURL(file);
  });
};

// WebP support detection
export const supportsWebP = () => {
  return new Promise((resolve) => {
    const webP = new Image();
    webP.onload = webP.onerror = () => {
      resolve(webP.height === 2);
    };
    webP.src = 'data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA';
  });
};

// Get optimal image format
export const getOptimalImageFormat = async (src) => {
  const webPSupported = await supportsWebP();
  
  if (webPSupported && src.includes('.jpg')) {
    return src.replace('.jpg', '.webp');
  }
  
  return src;
}; 