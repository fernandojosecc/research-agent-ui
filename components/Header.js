import React from 'react';

export default function Header() {
  return (
    <header style={{
      textAlign: 'center',
      padding: '3rem 1rem 2rem',
      maxWidth: '800px',
      margin: '0 auto'
    }}>
      <h1 style={{
        fontSize: '3rem',
        fontWeight: '700',
        color: 'var(--blue-primary)',
        margin: '0 0 0.5rem',
        lineHeight: '1.2'
      }}>
        AI Research Agent
      </h1>
      <p style={{
        fontSize: '1.25rem',
        color: 'var(--text-muted)',
        margin: '0 0 1rem',
        fontWeight: '400'
      }}>
        by Fernando Contreras
      </p>
      <div style={{
        display: 'flex',
        gap: '1rem',
        justifyContent: 'center',
        alignItems: 'center',
        flexWrap: 'wrap',
        marginBottom: '1.5rem'
      }}>
        <a 
          href="https://fernandocontreras.dev"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            color: 'var(--blue-primary)',
            textDecoration: 'none',
            fontWeight: '500',
            fontSize: '1rem',
            transition: 'all 0.2s',
            borderBottom: '1px solid transparent'
          }}
          onMouseOver={(e) => {
            e.target.style.color = '#1564A0';
            e.target.style.borderBottomColor = 'var(--blue-primary)';
          }}
          onMouseOut={(e) => {
            e.target.style.color = 'var(--blue-primary)';
            e.target.style.borderBottomColor = 'transparent';
          }}
        >
          fernandocontreras.dev
        </a>
        <span style={{ color: 'var(--text-muted)' }}>·</span>
        <div style={{
          background: 'var(--yellow-light)',
          color: 'var(--yellow-primary)',
          padding: '0.25rem 0.75rem',
          borderRadius: '20px',
          fontSize: '0.875rem',
          fontWeight: '600',
          border: `1px solid var(--yellow-primary)`
        }}>
          Powered by Claude + Tavily
        </div>
      </div>
    </header>
  );
}
