import React, { useState, useEffect } from 'react';

export default function ResearchForm({ onResearch, isLoading }) {
  const [topic, setTopic] = useState('');
  const [depth, setDepth] = useState('quick');
  const [currentStep, setCurrentStep] = useState(0);

  const exampleTopics = [
    "AI trends 2025",
    "Climate change solutions", 
    "Remote work productivity",
    "Cryptocurrency regulation"
  ];

  const loadingSteps = [
    "Searching the web...",
    "Reading sources...",
    "Analyzing data...",
    "Writing report..."
  ];

  useEffect(() => {
    if (isLoading) {
      const interval = setInterval(() => {
        setCurrentStep((prev) => (prev + 1) % loadingSteps.length);
      }, 4000);
      return () => clearInterval(interval);
    } else {
      setCurrentStep(0);
    }
  }, [isLoading]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (topic.trim() && !isLoading) {
      onResearch(topic.trim(), depth);
    }
  };

  const handleTopicChange = (e) => {
    const value = e.target.value;
    if (value.length <= 200) {
      setTopic(value);
    }
  };

  const handleExampleClick = (exampleTopic) => {
    setTopic(exampleTopic);
  };

  return (
    <div style={{
      background: 'white',
      border: `1px solid var(--border-light)`,
      borderRadius: '12px',
      padding: '2rem',
      maxWidth: '600px',
      margin: '0 auto 2rem',
      boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
    }}>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '1.5rem' }}>
          <div style={{ position: 'relative' }}>
          <textarea
            value={topic}
            onChange={handleTopicChange}
            placeholder="Enter any topic to research..."
            disabled={isLoading}
            style={{
              width: '100%',
              minHeight: '120px',
              padding: '1rem',
              paddingBottom: '2.5rem',
              border: `1px solid var(--border-light)`,
              borderRadius: '8px',
              fontSize: '1rem',
              fontFamily: 'inherit',
              resize: 'vertical',
              backgroundColor: isLoading ? 'var(--bg-page)' : 'white',
              color: 'var(--text-primary)',
              outline: 'none',
              transition: 'border-color 0.2s'
            }}
            onFocus={(e) => {
              if (!isLoading) {
                e.target.style.borderColor = 'var(--blue-primary)';
              }
            }}
            onBlur={(e) => {
              e.target.style.borderColor = 'var(--border-light)';
            }}
          />
          <div style={{
            position: 'absolute',
            bottom: '0.75rem',
            right: '1rem',
            fontSize: '0.75rem',
            color: topic.length >= 180 ? 'var(--yellow-primary)' : 'var(--text-muted)',
            fontWeight: topic.length >= 180 ? '600' : '400',
            pointerEvents: 'none'
          }}>
            {topic.length}/200
          </div>
        </div>
        </div>

        <div style={{ marginBottom: '1.5rem' }}>
          <label style={{
            display: 'block',
            fontSize: '0.875rem',
            fontWeight: '600',
            color: 'var(--text-primary)',
            marginBottom: '0.75rem'
          }}>
            Research Depth
          </label>
          <div style={{
            display: 'flex',
            background: 'var(--bg-page)',
            border: `1px solid var(--border-light)`,
            borderRadius: '24px',
            padding: '4px',
            position: 'relative'
          }}>
            <button
              type="button"
              onClick={() => setDepth('quick')}
              disabled={isLoading}
              style={{
                flex: 1,
                padding: '0.75rem 1rem',
                border: 'none',
                borderRadius: '20px',
                background: depth === 'quick' ? 'var(--blue-primary)' : 'transparent',
                color: depth === 'quick' ? 'white' : 'var(--text-primary)',
                fontSize: '0.875rem',
                fontWeight: '600',
                cursor: isLoading ? 'not-allowed' : 'pointer',
                transition: 'all 0.2s',
                zIndex: depth === 'quick' ? 2 : 1,
                position: 'relative'
              }}
            >
              Quick (30s)
            </button>
            <button
              type="button"
              onClick={() => setDepth('deep')}
              disabled={isLoading}
              style={{
                flex: 1,
                padding: '0.75rem 1rem',
                border: 'none',
                borderRadius: '20px',
                background: depth === 'deep' ? 'var(--blue-primary)' : 'transparent',
                color: depth === 'deep' ? 'white' : 'var(--text-primary)',
                fontSize: '0.875rem',
                fontWeight: '600',
                cursor: isLoading ? 'not-allowed' : 'pointer',
                transition: 'all 0.2s',
                zIndex: depth === 'deep' ? 2 : 1,
                position: 'relative'
              }}
            >
              Deep (2min)
            </button>
          </div>
          <p style={{
            fontSize: '0.75rem',
            color: 'var(--text-muted)',
            marginTop: '0.5rem',
            margin: '0.5rem 0 0'
          }}>
            {depth === 'quick' ? '3 searches' : '7 searches'}
          </p>
        </div>

        {!isLoading && (
          <div style={{ marginBottom: '1.5rem' }}>
            <p style={{
              fontSize: '0.875rem',
              color: 'var(--text-muted)',
              marginBottom: '0.75rem'
            }}>
              Example topics:
            </p>
            <div style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '0.5rem'
            }}>
              {exampleTopics.map((example, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => handleExampleClick(example)}
                  style={{
                    padding: '0.5rem 0.75rem',
                    border: `1px solid var(--border-light)`,
                    borderRadius: '20px',
                    background: 'white',
                    color: 'var(--text-muted)',
                    fontSize: '0.875rem',
                    cursor: 'pointer',
                    transition: 'all 0.2s'
                  }}
                  onMouseOver={(e) => {
                    e.target.style.borderColor = 'var(--blue-primary)';
                    e.target.style.color = 'var(--blue-primary)';
                  }}
                  onMouseOut={(e) => {
                    e.target.style.borderColor = 'var(--border-light)';
                    e.target.style.color = 'var(--text-muted)';
                  }}
                >
                  {example}
                </button>
              ))}
            </div>
          </div>
        )}

        <button
          type="submit"
          disabled={!topic.trim() || isLoading}
          style={{
            width: '100%',
            padding: '1rem',
            border: 'none',
            borderRadius: '8px',
            background: (!topic.trim() || isLoading) ? 'var(--border-light)' : 'var(--blue-primary)',
            color: (!topic.trim() || isLoading) ? 'var(--text-muted)' : 'white',
            fontSize: '1rem',
            fontWeight: '600',
            cursor: (!topic.trim() || isLoading) ? 'not-allowed' : 'pointer',
            transition: 'all 0.2s',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.5rem'
          }}
        >
          {isLoading ? (
            <>
              <div style={{
                width: '16px',
                height: '16px',
                border: '2px solid rgba(255,255,255,0.3)',
                borderTop: '2px solid white',
                borderRadius: '50%',
                animation: 'spin 1s linear infinite'
              }} />
              {loadingSteps[currentStep]}
            </>
          ) : (
            'Research  \u2192'
          )}
        </button>
      </form>

      <style jsx>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
