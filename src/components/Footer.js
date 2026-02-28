import React from 'react';
import { FaHeart, FaShieldAlt, FaGavel } from 'react-icons/fa';
import { Stack, Text } from '../design/components';
import '../design/patterns/shared-ui.css';

const Footer = ({ isDarkMode, setScreen }) => {
  return (
    <footer className={`fd-footer ${isDarkMode ? 'fd-theme-dark' : ''}`}>
      <div className="fd-footer-inner">
        {/* Main footer content */}
        <div className="fd-footer-row">
          <Text as="span" variant="caption" color="secondary">
            Made with
          </Text>
          <FaHeart style={{ color: '#e74c3c', fontSize: '0.9rem' }} aria-hidden="true" />
          <Text as="span" variant="caption" color="secondary">
            for Swedish learners
          </Text>
        </div>

        {/* Legal links */}
        <Stack direction="row" gap="12px" align="center" justify="center" wrap className="fd-footer-row">
          <button
            onClick={() => setScreen('privacy')}
            className="fd-footer-link"
            type="button"
          >
            <FaShieldAlt />
            <Text as="span" variant="caption" weight="medium" color="accent">Privacy Policy</Text>
          </button>

          <Text as="span" variant="caption" color="muted">•</Text>

          <button
            onClick={() => setScreen('terms')}
            className="fd-footer-link"
            type="button"
          >
            <FaGavel />
            <Text as="span" variant="caption" weight="medium" color="accent">Terms of Service</Text>
          </button>
        </Stack>

        {/* Copyright */}
        <Text as="div" variant="micro" color="muted" style={{ marginTop: '0.5rem' }}>
          © {new Date().getFullYear()} Flodhästen. All rights reserved.
        </Text>
      </div>
    </footer>
  );
};

export default Footer;
