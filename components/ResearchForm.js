import React, { useState, useEffect } from 'react';

export default function ResearchForm({ onResearch, isLoading }) {
  const [topic, setTopic] = useState('');
  const [depth, setDepth] = useState('quick');
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState([]);
  const [startTime, setStartTime] = useState(null);

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
      if (!startTime) {
        setStartTime(Date.now());
        setCompletedSteps([]);
        setCurrentStep(0);
      }
      
      const interval = setInterval(() => {
        setCurrentStep((prev) => {
          const nextStep = (prev + 1) % loadingSteps.length;
          if (nextStep === 0) {
            setCompletedSteps([0, 1, 2, 3]);
          } else if (nextStep === 1) {
            setCompletedSteps([0]);
          } else if (nextStep === 2) {
            setCompletedSteps([0, 1]);
          } else if (nextStep === 3) {
            setCompletedSteps([0, 1, 2]);
          }
          return nextStep;
        });
      }, 4000);
      return () => clearInterval(interval);
    } else {
      setCurrentStep(0);
      setCompletedSteps([]);
      setStartTime(null);
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
      padding: '24px',
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
            className="animated-border-input"
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
              transition: 'all 0.3s',
              position: 'relative'
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
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    transform: 'translateY(0)',
                    boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
                  }}
                  onMouseOver={(e) => {
                    e.target.style.borderColor = 'var(--blue-primary)';
                    e.target.style.color = 'var(--blue-primary)';
                    e.target.style.transform = 'translateY(-2px)';
                    e.target.style.boxShadow = '0 4px 12px rgba(24, 95, 165, 0.15)';
                    e.target.style.background = 'var(--blue-light)';
                  }}
                  onMouseOut={(e) => {
                    e.target.style.borderColor = 'var(--border-light)';
                    e.target.style.color = 'var(--text-muted)';
                    e.target.style.transform = 'translateY(0)';
                    e.target.style.boxShadow = '0 1px 3px rgba(0,0,0,0.1)';
                    e.target.style.background = 'white';
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
            <div style={{ width: '100%' }}>
              <div style={{
                marginBottom: '1rem',
                textAlign: 'center',
                fontSize: '0.875rem',
                color: 'var(--text-muted)',
                fontWeight: '500'
              }}>
                Researching: {topic}
              </div>
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '0.75rem',
                marginBottom: '1rem'
              }}>
                {loadingSteps.map((step, index) => (
                  <div
                    key={index}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.75rem',
                      opacity: completedSteps.includes(index) ? 1 : 
                                index === currentStep ? 1 : 0.4,
                      transition: 'opacity 0.3s'
                    }}
                  >
                    <div style={{
                      width: '20px',
                      height: '20px',
                      borderRadius: '50%',
                      border: completedSteps.includes(index) 
                        ? 'none' 
                        : index === currentStep 
                          ? '2px solid var(--blue-primary)'
                          : '2px solid var(--border-light)',
                      background: completedSteps.includes(index) 
                        ? 'var(--blue-primary)'
                        : index === currentStep
                          ? 'white'
                          : 'var(--bg-page)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '10px',
                      color: completedSteps.includes(index) ? 'white' : 'transparent',
                      position: 'relative'
                    }}>
                      {completedSteps.includes(index) && (
                        <svg
                          width="12"
                          height="12"
                          viewBox="0 0 12 12"
                          fill="currentColor"
                        >
                          <path d="M10 3L4.5 8.5L2 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
                        </svg>
                      )}
                      {index === currentStep && !completedSteps.includes(index) && (
                        <div style={{
                          width: '8px',
                          height: '8px',
                          borderRadius: '50%',
                          background: 'var(--blue-primary)',
                          animation: 'pulse 2s infinite'
                        }} />
                      )}
                    </div>
                    <span style={{
                      fontSize: '0.875rem',
                      color: completedSteps.includes(index) 
                        ? 'var(--text-primary)'
                        : index === currentStep
                          ? 'var(--blue-primary)'
                          : 'var(--text-muted)',
                      fontWeight: completedSteps.includes(index) || index === currentStep ? '600' : '400'
                    }}>
                      {step}
                    </span>
                  </div>
                ))}
              </div>
              <div style={{
                textAlign: 'center',
                fontSize: '0.75rem',
                color: 'var(--text-muted)'
              }}>
                {depth === 'quick' ? '~30 seconds remaining' : '~2 minutes remaining'}
              </div>
            </div>
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
        
        @keyframes gradient-border {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        
        @keyframes pulse {
          0% { opacity: 1; }
          50% { opacity: 0.5; }
          100% { opacity: 1; }
        }
        
        .animated-border-input:focus {
          border: 2px solid transparent;
          background-image: linear-gradient(white, white), 
                            linear-gradient(45deg, var(--blue-primary), var(--yellow-primary), var(--blue-primary));
          background-origin: border-box;
          background-clip: padding-box, border-box;
          background-size: 200% 200%;
          animation: gradient-border 3s ease infinite;
        }
      `}</style>
    </div>
  );
}
