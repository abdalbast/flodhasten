/* eslint-disable no-unused-vars */
import { useState, useEffect } from 'react';

// Types for speech support detection (JSDoc comments)
/**
 * @typedef {Object} SpeechSupport
 * @property {boolean} isSupported - Whether Web Speech Recognition is supported
 * @property {boolean} isAvailable - Whether microphone access is available
 * @property {boolean} isInitialized - Whether the hook has finished initializing
 * @property {string|null} error - Error message if any
 * @property {string} browser - Detected browser name
 * @property {'multiple-choice'|'text-input'|'none'} fallbackMode - Recommended fallback mode
 */

// Browser detection helper
function detectBrowser() {
  const userAgent = navigator.userAgent;
  
  if (userAgent.includes('Chrome')) return 'Chrome';
  if (userAgent.includes('Firefox')) return 'Firefox';
  if (userAgent.includes('Safari') && !userAgent.includes('Chrome')) return 'Safari';
  if (userAgent.includes('Edge')) return 'Edge';
  if (userAgent.includes('Opera')) return 'Opera';
  
  return 'Unknown';
}

// Check if Web Speech Recognition is supported
function checkSpeechRecognitionSupport() {
  return 'webkitSpeechRecognition' in window || 'SpeechRecognition' in window;
}

// Check if speech recognition is available (not just supported)
async function checkSpeechRecognitionAvailability() {
  try {
    // Try to create a speech recognition instance
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) return false;
    
    const recognition = new SpeechRecognition();
    
    // Check if we can access the microphone
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      try {
        await navigator.mediaDevices.getUserMedia({ audio: true });
        return true;
      } catch (error) {
        console.warn('Microphone access denied:', error);
        return false;
      }
    }
    
    return true;
  } catch (error) {
    console.warn('Speech recognition availability check failed:', error);
    return false;
  }
}

// Determine fallback mode based on browser and support
function determineFallbackMode(browser, isSupported) {
  if (isSupported) return 'none';
  
  // iOS Safari doesn't support Web Speech Recognition
  if (browser === 'Safari' && /iPad|iPhone|iPod/.test(navigator.userAgent)) {
    return 'multiple-choice';
  }
  
  // Other unsupported browsers
  return 'text-input';
}

/**
 * Hook to detect Web Speech Recognition support and provide fallback options
 * @returns {SpeechSupport} SpeechSupport object with support status and fallback information
 */
export function useSpeechSupport() {
  const [support, setSupport] = useState({
    isSupported: false,
    isAvailable: false,
    isInitialized: false,
    error: null,
    browser: 'Unknown',
    fallbackMode: 'none'
  });

  useEffect(() => {
    async function initializeSpeechSupport() {
      try {
        const browser = detectBrowser();
        const isSupported = checkSpeechRecognitionSupport();
        const isAvailable = isSupported ? await checkSpeechRecognitionAvailability() : false;
        const fallbackMode = determineFallbackMode(browser, isSupported);

        setSupport({
          isSupported,
          isAvailable,
          isInitialized: true,
          error: null,
          browser,
          fallbackMode
        });

        // Log support status for debugging
        console.log('Speech Recognition Support:', {
          browser,
          isSupported,
          isAvailable,
          fallbackMode
        });

      } catch (error) {
        console.error('Error initializing speech support:', error);
        setSupport(prev => ({
          ...prev,
          isInitialized: true,
          error: error instanceof Error ? error.message : 'Unknown error'
        }));
      }
    }

    initializeSpeechSupport();
  }, []);

  return support;
}

// Helper functions for components
export function getSpeechRecognitionInstance() {
  if (typeof window === 'undefined') return null;
  return window.SpeechRecognition || window.webkitSpeechRecognition;
}

export function isIOS(): boolean {
  return /iPad|iPhone|iPod/.test(navigator.userAgent);
}

export function isSafari(): boolean {
  return /Safari/.test(navigator.userAgent) && !/Chrome/.test(navigator.userAgent);
}

// Export types for use in other modules (JSDoc types)
