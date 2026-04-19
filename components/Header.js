import React from 'react';

export default function Header() {
  return (
    <nav style={{
      background: 'var(--bg-white)',
      borderBottom: '0.5px solid var(--border)',
      padding: '14px 24px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '8px'
      }}>
        <div style={{
          width: '8px',
          height: '8px',
          borderRadius: '50%',
          background: 'var(--accent)'
        }} />
        <span style={{
          fontFamily: "'Courier New', monospace",
          fontSize: '14px',
          color: 'var(--text-primary)',
          fontWeight: '400'
        }}>
          research.agent
        </span>
      </div>
      
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        padding: '4px 12px',
        borderRadius: '16px',
        background: 'var(--accent-light)'
      }}>
        <div style={{
          width: '6px',
          height: '6px',
          borderRadius: '50%',
          background: 'var(--accent)'
        }} />
        <span style={{
          fontFamily: "'Courier New', monospace",
          fontSize: '11px',
          color: 'var(--text-faint)',
          fontWeight: '400'
        }}>
          POWERED BY CLAUDE + TAVILY
        </span>
      </div>
    </nav>
  );
}
