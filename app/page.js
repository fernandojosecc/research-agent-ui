'use client';

import { useState, useEffect } from 'react';
import Header from '../components/Header';
import ResearchForm from '../components/ResearchForm';
import ReportDisplay from '../components/ReportDisplay';
import Footer from '../components/Footer';

export default function Home() {
  const [report, setReport] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [pageLoaded, setPageLoaded] = useState(false);

  useEffect(() => {
    setPageLoaded(true);
  }, []);

  const handleResearch = async (topic, depth) => {
    setIsLoading(true);
    setReport(null);

    try {
      const baseUrl = process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, '') || 'http://localhost:8000';
      const response = await fetch(`${baseUrl}/research`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          topic: topic,
          depth: depth
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log("RAW RESPONSE:", JSON.stringify(data, null, 2));
      console.log("SOURCES ARRAY:", JSON.stringify(data.sources, null, 2));
      console.log("FIRST SOURCE:", JSON.stringify(data.sources?.[0], null, 2));
      setReport({
        ...data,
        timestamp: new Date().toISOString()
      });
    } catch (error) {
      console.error('Research failed:', error);
      alert('Research failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleNewResearch = () => {
    setReport(null);
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      background: 'var(--bg-page)',
      opacity: pageLoaded ? 1 : 0,
      transform: pageLoaded ? 'translateY(0)' : 'translateY(20px)',
      transition: 'all 0.6s ease-out'
    }}>
      <Header />
      
      <main style={{ flex: 1, padding: '0 1rem' }}>
        {!report ? (
          <ResearchForm 
            onResearch={handleResearch}
            isLoading={isLoading}
          />
        ) : (
          <ReportDisplay 
            report={report}
            onNewResearch={handleNewResearch}
          />
        )}
      </main>

      <Footer />
    </div>
  );
}
