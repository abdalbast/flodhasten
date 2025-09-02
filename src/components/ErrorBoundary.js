import React from 'react';

// Enhanced fetch with retry logic
export const fetchWithRetry = async (url, options = {}, maxRetries = 3, delay = 1000) => {
  let lastError;
  
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      const response = await fetch(url, {
        ...options,
        headers: {
          'Content-Type': 'application/json',
          ...options.headers,
        },
      });
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
      
      return response;
    } catch (error) {
      lastError = error;
      console.warn(`Fetch attempt ${attempt} failed:`, error.message);
      
      if (attempt < maxRetries) {
        await new Promise(resolve => setTimeout(resolve, delay * attempt));
      }
    }
  }
  
  throw lastError;
};

// Global error handler
export const handleGlobalError = (error, errorInfo) => {
  console.error('Global error caught:', error, errorInfo);
  
  // Log to external service in production
  if (process.env.NODE_ENV === 'production') {
    // TODO: Send to error tracking service
    console.log('Error would be sent to tracking service');
  }
};

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      hasError: false, 
      error: null,
      errorInfo: null,
      retryCount: 0
    };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Flodhästen Error Boundary caught an error:', error, errorInfo);
    this.setState({ errorInfo });
    handleGlobalError(error, errorInfo);
  }

  handleRetry = () => {
    this.setState(prevState => ({
      hasError: false,
      error: null,
      errorInfo: null,
      retryCount: prevState.retryCount + 1
    }));
  };

  render() {
    if (this.state.hasError) {
      const { isDarkMode = false } = this.props;
      const textColor = isDarkMode ? '#f5f5f5' : '#2c3e50';
      const bgColor = isDarkMode ? '#2d2d2d' : '#f8f9fa';
      const borderColor = isDarkMode ? '#555' : '#e8f4f8';
      const accentColor = '#3498db';

      return (
        <div 
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '2rem',
            minHeight: '300px',
            backgroundColor: bgColor,
            color: textColor,
            textAlign: 'center'
          }}
          role="alert"
          aria-live="polite"
        >
          <div 
            style={{
              fontSize: '3rem',
              marginBottom: '1rem'
            }}
            role="img"
            aria-label="River horse emoji"
          >
            🦛
          </div>
          <h2 
            style={{
              margin: '0 0 1rem 0',
              fontFamily: '"Georgia", serif',
              color: textColor
            }}
          >
            Oops! Something went wrong
          </h2>
          <p 
            style={{
              margin: '0 0 1.5rem 0',
              fontFamily: '"Georgia", serif',
              color: isDarkMode ? '#bdc3c7' : '#7f8c8d'
            }}
          >
            Flodhästen encountered an unexpected error. Please try refreshing the page.
          </p>
          
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center' }}>
            <button
              onClick={this.handleRetry}
              style={{
                background: accentColor,
                color: '#fff',
                border: 'none',
                borderRadius: '10px',
                padding: '0.8rem 1.5rem',
                fontSize: '1rem',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                fontFamily: '"Georgia", serif',
                outline: 'none'
              }}
              onMouseEnter={(e) => {
                e.target.style.background = '#2980b9';
                e.target.style.transform = 'scale(1.05)';
              }}
              onMouseLeave={(e) => {
                e.target.style.background = accentColor;
                e.target.style.transform = 'scale(1)';
              }}
              onFocus={(e) => {
                e.target.style.outline = `2px solid ${accentColor}`;
                e.target.style.outlineOffset = '2px';
              }}
              onBlur={(e) => {
                e.target.style.outline = 'none';
              }}
            >
              Try Again
            </button>
            
            <button
              onClick={() => window.location.reload()}
              style={{
                background: 'transparent',
                color: textColor,
                border: `2px solid ${borderColor}`,
                borderRadius: '10px',
                padding: '0.8rem 1.5rem',
                fontSize: '1rem',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                fontFamily: '"Georgia", serif',
                outline: 'none'
              }}
              onMouseEnter={(e) => {
                e.target.style.background = isDarkMode ? '#3a3a3a' : '#e8f4f8';
                e.target.style.transform = 'scale(1.05)';
              }}
              onMouseLeave={(e) => {
                e.target.style.background = 'transparent';
                e.target.style.transform = 'scale(1)';
              }}
              onFocus={(e) => {
                e.target.style.outline = `2px solid ${accentColor}`;
                e.target.style.outlineOffset = '2px';
              }}
              onBlur={(e) => {
                e.target.style.outline = 'none';
              }}
            >
              Refresh Page
            </button>
          </div>

          {this.state.retryCount > 0 && (
            <p style={{
              marginTop: '1rem',
              fontSize: '0.9rem',
              color: isDarkMode ? '#bdc3c7' : '#7f8c8d'
            }}>
              Retry attempt: {this.state.retryCount}
            </p>
          )}

          {process.env.NODE_ENV === 'development' && (
            <details style={{
              marginTop: '1rem',
              textAlign: 'left',
              maxWidth: '500px'
            }}>
              <summary 
                style={{ 
                  cursor: 'pointer', 
                  color: '#e74c3c',
                  outline: 'none'
                }}
                onFocus={(e) => {
                  e.target.style.outline = `2px solid ${accentColor}`;
                  e.target.style.outlineOffset = '2px';
                }}
                onBlur={(e) => {
                  e.target.style.outline = 'none';
                }}
              >
                Error Details (Development)
              </summary>
              <pre style={{
                backgroundColor: isDarkMode ? '#1a1a1a' : '#f1f1f1',
                padding: '1rem',
                borderRadius: '5px',
                overflow: 'auto',
                fontSize: '0.8rem',
                marginTop: '0.5rem',
                border: `1px solid ${borderColor}`
              }}>
                {this.state.error && this.state.error.toString()}
                {this.state.errorInfo && this.state.errorInfo.componentStack && (
                  <>
                    {'\n\nComponent Stack:'}
                    {this.state.errorInfo.componentStack}
                  </>
                )}
              </pre>
            </details>
          )}
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary; 