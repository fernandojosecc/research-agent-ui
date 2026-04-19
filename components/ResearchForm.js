import React, { useState, useEffect } from 'react';

export default function ResearchForm({ onResearch, isLoading }) {
  const [topic, setTopic] = useState('');
  const [depth, setDepth] = useState('quick');
  const [timeLeft, setTimeLeft] = useState(30);
  const [progressStep, setProgressStep] = useState(0);

  const progressMessages = [
    "Searching the web...",
    "Reading sources...",
    "Analyzing findings...",
    "Writing report..."
  ];

  useEffect(() => {
    if (!isLoading) {
      setTimeLeft(depth === 'deep' ? 120 : 30);
      setProgressStep(0);
      return;
    }
    const countdown = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(countdown);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    const stepper = setInterval(() => {
      setProgressStep(prev => (prev + 1) % 4);
    }, 4000);
    return () => {
      clearInterval(countdown);
      clearInterval(stepper);
    };
  }, [isLoading, depth]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (topic.trim() && !isLoading) {
      onResearch(topic.trim(), depth);
    }
  };

  const TerminalPanel = () => {
    const terminalLines = [
      `> research --topic "${topic || 'enter topic'}"`,
      'initializing agent...',
      'searching: web trends and developments',
      'searching: expert analysis and opinions', 
      'searching: recent data and statistics',
      'sources collected: 8',
      'generating report...',
      'report ready'
    ];

    return (
      <div style={{
        background: 'var(--terminal-bg)',
        border: '0.5px solid var(--border)',
        borderRadius: '8px',
        padding: '16px',
        fontFamily: "'Courier New', monospace",
        fontSize: '11px',
        lineHeight: '1.8'
      }}>
        {/* Terminal bar */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '12px'
        }}>
          <div style={{ display: 'flex', gap: '6px' }}>
            <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#ff5f57' }} />
            <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#febc2e' }} />
            <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#28c840' }} />
          </div>
          <span style={{ color: 'var(--text-faint)', fontSize: '10px' }}>agent · bash</span>
        </div>

        {/* Terminal lines */}
        <div>
          {terminalLines.map((line, index) => {
            const isPrompt = line.startsWith('>');
            const isCommand = line.includes('research --topic');
            const isSuccess = line.includes('report ready');
            const delay = isLoading ? index * 400 : 0;
            
            return (
              <div 
                key={index}
                style={{
                  color: isPrompt ? 'var(--accent)' : 
                         isCommand ? '#555' : 
                         isSuccess ? 'var(--success)' : '#999',
                  opacity: isLoading && index > 0 ? 0 : 1,
                  animation: isLoading && index > 0 ? `terminalLine 0.4s ease-out ${delay}ms forwards` : 'none',
                  marginBottom: '2px'
                }}
              >
                {line}
                {index === 0 && !isLoading && <span className="terminal-cursor" />}
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div style={{
      background: 'var(--bg-white)',
      borderBottom: '0.5px solid var(--border)'
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '48px 24px',
        display: 'grid',
        gridTemplateColumns: '60% 40%',
        gap: '48px',
        alignItems: 'start'
      }}>
        {/* Left Column */}
        <div>
          {/* Label */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            marginBottom: '24px'
          }}>
            <div style={{
              width: '20px',
              height: '1px',
              background: 'var(--border)'
            }} />
            <span style={{
              fontFamily: "'Courier New', monospace",
              fontSize: '12px',
              color: 'var(--text-faint)',
              textTransform: 'uppercase'
            }}>
              AI RESEARCH AGENT
            </span>
          </div>

          {/* Heading */}
          <h1 style={{
            fontFamily: 'Georgia, serif',
            fontSize: '40px',
            lineHeight: '1.2',
            marginBottom: '24px',
            fontWeight: 'normal'
          }}>
            <span style={{ display: 'block', fontWeight: 'bold', color: 'var(--text-primary)' }}>
              Research
            </span>
            <span style={{ display: 'block', fontStyle: 'italic', fontWeight: '300', color: 'var(--text-primary)' }}>
              anything
            </span>
            <span style={{ display: 'block', fontWeight: 'bold', color: 'var(--accent)' }}>
              autonomously.
            </span>
          </h1>

          {/* Description */}
          <p style={{
            fontFamily: 'system-ui, sans-serif',
            fontSize: '16px',
            color: 'var(--text-muted)',
            maxWidth: '300px',
            marginBottom: '32px',
            lineHeight: '1.5'
          }}>
            Enter any topic and get a comprehensive research report generated by AI, with sources and insights.
          </p>

          {/* Depth Toggle */}
          <div style={{ marginBottom: '24px' }}>
            <div style={{
              display: 'flex',
              gap: '8px'
            }}>
              <button
                type="button"
                onClick={() => setDepth('quick')}
                disabled={isLoading}
                className="button-scale"
                style={{
                  padding: '8px 16px',
                  border: depth === 'quick' ? 'none' : '0.5px solid var(--border)',
                  borderRadius: '2px',
                  background: depth === 'quick' ? 'var(--text-primary)' : 'transparent',
                  color: depth === 'quick' ? 'var(--bg-white)' : 'var(--text-faint)',
                  fontFamily: "'Courier New', monospace",
                  fontSize: '12px',
                  fontWeight: 'bold',
                  cursor: isLoading ? 'not-allowed' : 'pointer'
                }}
              >
                QUICK · 30s
              </button>
              <button
                type="button"
                onClick={() => setDepth('deep')}
                disabled={isLoading}
                className="button-scale"
                style={{
                  padding: '8px 16px',
                  border: depth === 'deep' ? 'none' : '0.5px solid var(--border)',
                  borderRadius: '2px',
                  background: depth === 'deep' ? 'var(--text-primary)' : 'transparent',
                  color: depth === 'deep' ? 'var(--bg-white)' : 'var(--text-faint)',
                  fontFamily: "'Courier New', monospace",
                  fontSize: '12px',
                  fontWeight: 'bold',
                  cursor: isLoading ? 'not-allowed' : 'pointer'
                }}
              >
                DEEP · 2min
              </button>
            </div>
          </div>

          {/* Search Row */}
          <form onSubmit={handleSubmit} style={{
            display: 'flex',
            gap: '8px'
          }}>
            <input
              type="text"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="enter topic to research..."
              disabled={isLoading}
              style={{
                flex: 1,
                padding: '12px 16px',
                border: '0.5px solid var(--border)',
                borderRadius: '2px',
                background: 'var(--bg-warm)',
                fontFamily: "'Courier New', monospace",
                fontSize: '14px',
                color: 'var(--text-primary)',
                outline: 'none'
              }}
            />
            <button
              type="submit"
              disabled={!topic.trim() || isLoading}
              className="button-scale"
              style={{
                padding: '12px 20px',
                border: 'none',
                borderRadius: '2px',
                background: (!topic.trim() || isLoading) ? 'var(--border)' : 'var(--text-primary)',
                color: (!topic.trim() || isLoading) ? 'var(--text-faint)' : 'var(--bg-white)',
                fontFamily: "'Courier New', monospace",
                fontSize: '14px',
                fontWeight: 'bold',
                cursor: (!topic.trim() || isLoading) ? 'not-allowed' : 'pointer'
              }}
            >
              RUN
            </button>
          </form>
        </div>

        {/* Right Column - Terminal Panel */}
        <div>
          <TerminalPanel />
          
          {/* Progress Section */}
          {isLoading && (
            <div style={{
              marginTop: '24px',
              fontFamily: "'Courier New', monospace",
              fontSize: '12px',
              color: 'var(--text-muted)'
            }}>
              <div style={{ marginBottom: '8px' }}>
                {progressMessages[progressStep]}
              </div>
              <div>
                {timeLeft > 0 ? `[${timeLeft}] seconds remaining` : "Almost done..."}
              </div>
            </div>
          )}
        </div>
      </div>
      
      <style jsx>{`
        @media (max-width: 768px) {
          div {
            gridTemplateColumns: 1fr !important;
            gap: 24px !important;
            padding: 24px 16px !important;
          }
          
          h1 {
            font-size: 32px !important;
          }
          
          p {
            font-size: 14px !important;
          }
        }
      `}</style>
    </div>
  );
}
