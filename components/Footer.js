import React from 'react';

export default function Footer() {
  return (
    <footer style={{
      background: 'var(--bg-white)',
      borderTop: '0.5px solid var(--border)',
      padding: '14px 24px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    }}>
      <div style={{
        fontFamily: "'Courier New', monospace",
        fontSize: '12px',
        color: 'var(--text-faint)'
      }}>
        research.agent · 2025
      </div>
      
      <a
        href="https://fernandocontreras.dev"
        target="_blank"
        rel="noopener noreferrer"
        style={{
          fontFamily: "'Courier New', monospace",
          fontSize: '12px',
          color: 'var(--text-faint)',
          textDecoration: 'none',
          transition: 'color 0.2s ease'
        }}
        onMouseOver={(e) => {
          e.target.style.color = 'var(--accent)';
        }}
        onMouseOut={(e) => {
          e.target.style.color = 'var(--text-faint)';
        }}
      >
        built by Fernando Contreras
      </a>
    </footer>
  );
}
