import React, { useState } from 'react';

export default function ReportDisplay({ report, onNewResearch }) {
  const [copied, setCopied] = useState(false);

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

  const formatDate = (timestamp) => {
    return new Date(timestamp).toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
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
    <div className="report-fade-in" style={{
      background: 'var(--bg-page)',
      padding: '32px 24px'
    }}>
      <div style={{
        maxWidth: '800px',
        margin: '0 auto'
      }}>
        {/* Report Header */}
        <div style={{ marginBottom: '48px' }}>
          <div style={{
            fontFamily: "'Courier New', monospace",
            fontSize: '10px',
            color: 'var(--text-faint)',
            textTransform: 'uppercase',
            marginBottom: '16px'
          }}>
            01 - RESEARCH REPORT
          </div>
          
          <h2 style={{
            fontFamily: 'Georgia, serif',
            fontSize: '18px',
            fontWeight: 'bold',
            color: 'var(--text-primary)',
            marginBottom: '8px'
          }}>
            {report.title}
          </h2>
          
          <div style={{
            fontFamily: "'Courier New', monospace",
            fontSize: '10px',
            color: 'var(--text-faint)'
          }}>
            {formatDate(report.timestamp)}
          </div>
        </div>

        {/* Executive Summary */}
        <div style={{
          borderLeft: '2px solid var(--accent)',
          background: 'var(--bg-white)',
          padding: '12px 16px',
          marginBottom: '48px'
        }}>
          <p style={{
            fontFamily: 'system-ui, sans-serif',
            fontSize: '12px',
            color: 'var(--text-muted)',
            lineHeight: '1.75',
            margin: 0
          }}>
            {report.executive_summary}
          </p>
        </div>

        {/* Key Findings */}
        <div style={{ marginBottom: '48px' }}>
          <div style={{
            fontFamily: "'Courier New', monospace",
            fontSize: '10px',
            color: 'var(--text-faint)',
            textTransform: 'uppercase',
            marginBottom: '24px'
          }}>
            KEY FINDINGS
          </div>
          
          <div>
            {report.key_findings.map((finding, index) => (
              <div key={index} style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: '16px',
                paddingBottom: '16px',
                borderBottom: index < report.key_findings.length - 1 ? '0.5px solid var(--border)' : 'none'
              }}>
                <div style={{
                  fontFamily: "'Courier New', monospace",
                  fontSize: '12px',
                  color: 'var(--accent)',
                  fontWeight: 'bold',
                  minWidth: '20px'
                }}>
                  {String(index + 1).padStart(2, '0')}
                </div>
                <div style={{
                  fontFamily: 'system-ui, sans-serif',
                  fontSize: '14px',
                  color: 'var(--text-primary)',
                  lineHeight: '1.6'
                }}>
                  {finding}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Sections */}
        {report.sections.map((section, index) => (
          <div key={index} style={{ marginBottom: '48px' }}>
            <h3 style={{
              fontFamily: 'Georgia, serif',
              fontSize: '16px',
              fontWeight: 'bold',
              color: 'var(--text-primary)',
              marginBottom: '16px'
            }}>
              {section.heading}
            </h3>
            <p style={{
              fontFamily: 'system-ui, sans-serif',
              fontSize: '14px',
              color: 'var(--text-primary)',
              lineHeight: '1.6',
              margin: 0
            }}>
              {section.content}
            </p>
          </div>
        ))}

        {/* Sources */}
        {report && report.sources && report.sources.length > 0 && (
          <div style={{ marginBottom: '48px' }}>
            <div style={{
              fontFamily: "'Courier New', monospace",
              fontSize: '10px',
              color: 'var(--text-faint)',
              textTransform: 'uppercase',
              marginBottom: '24px'
            }}>
              SOURCES
            </div>
            
            <div style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '8px'
            }}>
              {report.sources.map((source, index) => (
                <a
                  key={index}
                  href={source.url || source.link || source.href || '#'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="source-tag"
                  style={{
                    display: 'inline-block',
                    padding: '4px 8px',
                    background: 'var(--bg-white)',
                    border: '0.5px solid var(--border)',
                    borderRadius: '4px',
                    fontFamily: "'Courier New', monospace",
                    fontSize: '10px',
                    color: 'var(--text-primary)',
                    textDecoration: 'none'
                  }}
                >
                  {getDomainFromUrl(source.url || source.link || source.href)}
                </a>
              ))}
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div style={{
          display: 'flex',
          gap: '16px',
          justifyContent: 'center'
        }}>
          <button
            onClick={handleCopyReport}
            className="button-scale"
            style={{
              padding: '7px 16px',
              border: 'none',
              borderRadius: '2px',
              background: 'var(--text-primary)',
              color: 'var(--bg-white)',
              fontFamily: "'Courier New', monospace",
              fontSize: '12px',
              fontWeight: 'bold',
              cursor: 'pointer'
            }}
          >
            {copied ? 'COPIED' : 'COPY REPORT'}
          </button>
          <button
            onClick={onNewResearch}
            className="button-scale"
            style={{
              padding: '7px 16px',
              border: '0.5px solid var(--border)',
              borderRadius: '2px',
              background: 'var(--bg-white)',
              color: 'var(--text-primary)',
              fontFamily: "'Courier New', monospace",
              fontSize: '12px',
              fontWeight: 'bold',
              cursor: 'pointer'
            }}
          >
            NEW RESEARCH
          </button>
        </div>
      </div>
    </div>
  );
}
