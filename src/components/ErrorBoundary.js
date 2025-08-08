import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Flodhästen Error Boundary caught an error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      const { isDarkMode = false } = this.props;
      const textColor = isDarkMode ? '#f5f5f5' : '#2c3e50';
      const bgColor = isDarkMode ? '#2d2d2d' : '#f8f9fa';
      const borderColor = isDarkMode ? '#555' : '#e8f4f8';

      return (
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '2rem',
          minHeight: '300px',
          backgroundColor: bgColor,
          color: textColor,
          textAlign: 'center'
        }}>
          <div style={{
            fontSize: '3rem',
            marginBottom: '1rem'
          }}>
            🦛
          </div>
          <h2 style={{
            margin: '0 0 1rem 0',
            fontFamily: '"Georgia", serif',
            color: textColor
          }}>
            Oops! Something went wrong
          </h2>
          <p style={{
            margin: '0 0 1.5rem 0',
            fontFamily: '"Georgia", serif',
            color: isDarkMode ? '#bdc3c7' : '#7f8c8d'
          }}>
            Flodhästen encountered an unexpected error. Please try refreshing the page.
          </p>
          <button
            onClick={() => window.location.reload()}
            style={{
              background: '#3498db',
              color: '#fff',
              border: 'none',
              borderRadius: '10px',
              padding: '0.8rem 1.5rem',
              fontSize: '1rem',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              fontFamily: '"Georgia", serif'
            }}
            onMouseEnter={(e) => {
              e.target.style.background = '#2980b9';
            }}
            onMouseLeave={(e) => {
              e.target.style.background = '#3498db';
            }}
          >
            Refresh Page
          </button>
          {process.env.NODE_ENV === 'development' && (
            <details style={{
              marginTop: '1rem',
              textAlign: 'left',
              maxWidth: '500px'
            }}>
              <summary style={{ cursor: 'pointer', color: '#e74c3c' }}>
                Error Details (Development)
              </summary>
              <pre style={{
                backgroundColor: isDarkMode ? '#1a1a1a' : '#f1f1f1',
                padding: '1rem',
                borderRadius: '5px',
                overflow: 'auto',
                fontSize: '0.8rem',
                marginTop: '0.5rem'
              }}>
                {this.state.error && this.state.error.toString()}
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