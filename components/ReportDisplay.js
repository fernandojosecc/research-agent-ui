import React, { useState } from 'react';

export default function ReportDisplay({ report, onNewResearch }) {
  const [copied, setCopied] = useState(false);
  const [shared, setShared] = useState(false);

  const handleCopyReport = async () => {
    const reportText = `${report.title}\n\n${report.executive_summary}\n\nKey Findings:\n${report.key_findings.map((finding, index) => `${index + 1}. ${finding}`).join('\n')}\n\n${report.sections.map(section => `${section.heading}\n${section.content}`).join('\n\n')}\n\nSources:\n${report.sources.map(source => `- ${source.title}: ${source.url}`).join('\n')}`;
    
    try {
      await navigator.clipboard.writeText(reportText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy report:', err);
    }
  };

  const handleShare = async () => {
    try {
      const pageUrl = window.location.href;
      await navigator.clipboard.writeText(pageUrl);
      setShared(true);
      setTimeout(() => setShared(false), 2000);
    } catch (err) {
      console.error('Failed to share:', err);
    }
  };

  const formatDate = (timestamp) => {
    return new Date(timestamp).toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const calculateReadingTime = () => {
    const allText = `${report.title} ${report.executive_summary} ${report.key_findings.join(' ')} ${report.sections.map(section => `${section.heading} ${section.content}`).join(' ')}`;
    const wordsPerMinute = 200;
    const wordCount = allText.split(/\s+/).length;
    const readingTime = Math.ceil(wordCount / wordsPerMinute);
    return readingTime;
  };

  const getDomainFromUrl = (url) => {
    try {
      const domain = new URL(url).hostname;
      return domain.replace('www.', '');
    } catch {
      return 'Unknown Source';
    }
  };

  return (
    <div style={{
      animation: 'fadeIn 0.5s ease-in',
      maxWidth: '800px',
      margin: '0 auto 2rem'
    }}>
      <div style={{
        background: 'white',
        border: `1px solid var(--border-light)`,
        borderRadius: '12px',
        padding: '24px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
      }}>
        {/* Report Title */}
        <div>
          <h2 style={{
            fontSize: '2rem',
            fontWeight: '700',
            color: 'var(--text-primary)',
            marginBottom: '0.5rem',
            lineHeight: '1.2'
          }}>
            {report.title}
          </h2>
          <div style={{
            fontSize: '0.875rem',
            color: 'var(--text-muted)',
            marginBottom: '1.5rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}>
            <span>~{calculateReadingTime()} min read</span>
            <span>·</span>
            <span>{report.key_findings.length} key findings</span>
            <span>·</span>
            <span>{report.sources.length} sources</span>
          </div>
        </div>

        {/* Executive Summary */}
        <div style={{
          background: 'var(--blue-light)',
          border: `1px solid var(--blue-primary)`,
          borderRadius: '8px',
          padding: '1.5rem',
          marginBottom: '2rem'
        }}>
          <h3 style={{
            fontSize: '1.25rem',
            fontWeight: '600',
            color: 'var(--blue-primary)',
            marginBottom: '0.75rem'
          }}>
            Executive Summary
          </h3>
          <p style={{
            fontSize: '1rem',
            lineHeight: '1.6',
            color: 'var(--text-primary)',
            margin: 0
          }}>
            {report.executive_summary}
          </p>
        </div>

        {/* Key Findings */}
        <div style={{ marginBottom: '2rem' }}>
          <h3 style={{
            fontSize: '1.25rem',
            fontWeight: '600',
            color: 'var(--text-primary)',
            marginBottom: '1rem'
          }}>
            Key Findings
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {report.key_findings.map((finding, index) => (
              <div key={index} style={{
                display: 'flex',
                alignItems: 'flex-start',
                padding: '1rem',
                borderLeft: '4px solid var(--blue-primary)',
                background: 'var(--blue-light)',
                borderRadius: '0 8px 8px 0',
                transition: 'all 0.2s'
              }}
              onMouseOver={(e) => {
                e.target.style.background = 'var(--bg-page)';
                e.target.style.transform = 'translateX(4px)';
              }}
              onMouseOut={(e) => {
                e.target.style.background = 'var(--blue-light)';
                e.target.style.transform = 'translateX(0)';
              }}>
                <p style={{
                  fontSize: '1rem',
                  lineHeight: '1.6',
                  color: 'var(--text-primary)',
                  margin: 0,
                  fontWeight: '500'
                }}>
                  {finding}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Sections */}
        <div style={{ marginBottom: '2rem' }}>
          {report.sections.map((section, index) => (
            <div key={index} style={{ marginBottom: '1.5rem' }}>
              <h4 style={{
                fontSize: '1.125rem',
                fontWeight: '600',
                color: 'var(--text-primary)',
                marginBottom: '0.75rem',
                paddingBottom: '0.5rem',
                borderBottom: '3px solid var(--blue-primary)',
                display: 'inline-block'
              }}>
                {section.heading}
              </h4>
              <p style={{
                fontSize: '1rem',
                lineHeight: '1.6',
                color: 'var(--text-primary)',
                margin: 0
              }}>
                {section.content}
              </p>
            </div>
          ))}
        </div>

        {/* Sources */}
        <div style={{ marginBottom: '2rem' }}>
          <h3 style={{
            fontSize: '1.125rem',
            fontWeight: '600',
            color: 'var(--text-primary)',
            marginBottom: '1rem'
          }}>
            Sources
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem' }}>
            {report.sources.map((source, index) => (
              <a
                key={index}
                href={source.url}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  padding: '1rem',
                  border: `1px solid var(--border-light)`,
                  borderRadius: '8px',
                  background: 'white',
                  textDecoration: 'none',
                  transition: 'all 0.2s',
                  cursor: 'pointer'
                }}
                onMouseOver={(e) => {
                  e.target.style.borderColor = 'var(--blue-primary)';
                  e.target.style.boxShadow = '0 4px 12px rgba(24, 95, 165, 0.15)';
                  e.target.style.transform = 'translateY(-2px)';
                }}
                onMouseOut={(e) => {
                  e.target.style.borderColor = 'var(--border-light)';
                  e.target.style.boxShadow = 'none';
                  e.target.style.transform = 'translateY(0)';
                }}
              >
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  marginBottom: '0.5rem',
                  fontSize: '0.75rem',
                  color: 'var(--text-muted)',
                  fontWeight: '600'
                }}>
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 12 12"
                    fill="currentColor"
                  >
                    <path d="M6 0C2.686 0 0 2.686 0 6s2.686 6 6 6 6-2.686 6-6S9.314 0 6 0zm0 10.5c-2.485 0-4.5-2.015-4.5-4.5S3.515 1.5 6 1.5s4.5 2.015 4.5 4.5-2.015 4.5-4.5 4.5zm.75-6.75H5.25v4.5h1.5v-3h1.5v-1.5z"/>
                    <path d="M8.25 3.75L9.75 2.25 12 4.5 10.5 6z" fill="currentColor"/>
                  </svg>
                  {getDomainFromUrl(source.url)}
                </div>
                <div style={{
                  fontSize: '0.875rem',
                  color: 'var(--text-primary)',
                  lineHeight: '1.4',
                  fontWeight: '500'
                }}>
                  {source.title}
                </div>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.25rem',
                  marginTop: '0.5rem',
                  fontSize: '0.75rem',
                  color: 'var(--blue-primary)',
                  fontWeight: '500'
                }}>
                  Visit source
                  <svg
                    width="10"
                    height="10"
                    viewBox="0 0 10 10"
                    fill="currentColor"
                  >
                    <path d="M8 0H6V2H7.586L3 6.586V5H1v4h4V7H3.414L8 2.414V4h2V0z"/>
                  </svg>
                </div>
              </a>
            ))}
          </div>
        </div>

        {/* Timestamp */}
        <div style={{
          fontSize: '0.875rem',
          color: 'var(--text-muted)',
          marginBottom: '1.5rem',
          textAlign: 'center'
        }}>
          Generated on {formatDate(report.timestamp)}
        </div>

        {/* Action Buttons */}
        <div style={{
          display: 'flex',
          gap: '1rem',
          justifyContent: 'center'
        }}>
          <button
            onClick={handleCopyReport}
            style={{
              padding: '0.75rem 1.5rem',
              border: `1px solid var(--blue-primary)`,
              borderRadius: '8px',
              background: 'white',
              color: 'var(--blue-primary)',
              fontSize: '0.875rem',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.2s'
            }}
            onMouseOver={(e) => {
              e.target.style.background = 'var(--blue-light)';
            }}
            onMouseOut={(e) => {
              e.target.style.background = 'white';
            }}
          >
            {copied ? 'Copied!' : 'Copy report'}
          </button>
          <button
            onClick={handleShare}
            style={{
              padding: '0.75rem 1.5rem',
              border: `1px solid var(--blue-primary)`,
              borderRadius: '8px',
              background: 'white',
              color: 'var(--blue-primary)',
              fontSize: '0.875rem',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.2s'
            }}
            onMouseOver={(e) => {
              e.target.style.background = 'var(--blue-light)';
            }}
            onMouseOut={(e) => {
              e.target.style.background = 'white';
            }}
          >
            {shared ? 'Link copied!' : 'Share'}
          </button>
          <button
            onClick={onNewResearch}
            style={{
              padding: '0.75rem 1.5rem',
              border: 'none',
              borderRadius: '8px',
              background: 'var(--blue-primary)',
              color: 'white',
              fontSize: '0.875rem',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.2s'
            }}
            onMouseOver={(e) => {
              e.target.style.background = '#1564A0';
            }}
            onMouseOut={(e) => {
              e.target.style.background = 'var(--blue-primary)';
            }}
          >
            New research \u2192
          </button>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}
