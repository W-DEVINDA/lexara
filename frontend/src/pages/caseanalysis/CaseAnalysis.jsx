import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import './CaseAnalysis.css';


import ProgressRings from '../../components/ProgressRings/ProgressRings';
import CaseOverview from '../../components/CaseOverview/CaseOverview';
import EvidenceSummary from '../../components/EvidenceSummary/EvidenceSummary';
import LegalIssues from '../../components/LegalIssues/LegalIssues';
import LegalProvisions from '../../components/LegalProvisions/LegalProvisions';
import CasePrecedents from '../../components/CasePrecedents/CasePrecedents';
import AdditionalDetails from '../../components/AdditionalDetails/AdditionalDetails';

const CaseAnalysis = () => {
  const navigate = useNavigate();
  const [showHeader, setShowHeader] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const containerRef = useRef(null);
  const [isNavigating, setIsNavigating] = useState(false);
  const [scrollTimeout, setScrollTimeout] = useState(null);

const handleBackToPrimaFacie = () => {
  setIsNavigating(true);
  setTimeout(() => {
    navigate('/legal-desk');
  }, 250);
};
const handleNavigateHome = () => {
  setIsNavigating(true);
  setTimeout(() => {
    navigate('/', { state: { smoothTransition: true } });
  }, 250);
};
const handleNavigateNext = () => {
  setIsNavigating(true);
  setTimeout(() => {
    navigate('/pre-hearingsim', { state: { smoothTransition: true } });
  }, 250);
};
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const currentScrollY = container.scrollTop;
          
          if (currentScrollY < 10) {
            if (scrollTimeout) {
              clearTimeout(scrollTimeout);
              setScrollTimeout(null);
            }
            setShowHeader(true);
            setLastScrollY(currentScrollY);
            ticking = false;
            return;
          }
          
          if (scrollTimeout) {
            clearTimeout(scrollTimeout);
          }
          
          if (currentScrollY < lastScrollY) {
            setShowHeader(true);
            
            const timeout = setTimeout(() => {
              if (container.scrollTop >= 10) {
                setShowHeader(false);
              }
            }, 1400);
            
            setScrollTimeout(timeout);
          } else {
            setShowHeader(false);
          }
          
          setLastScrollY(currentScrollY);
          ticking = false;
        });
        ticking = true;
      }
    };

    container.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      container.removeEventListener('scroll', handleScroll);
      if (scrollTimeout) {
        clearTimeout(scrollTimeout);
      }
    };
  }, [lastScrollY, scrollTimeout]);

return (
  <motion.div 
    ref={containerRef} 
    className="case-analysis"
    initial={{ opacity: 0 }}
    animate={{ 
      opacity: isNavigating ? 0 : 1
    }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.25, ease: "easeOut" }}
    style={{ width: '100%', height: 'calc(var(--vh, 1vh) * 100)' }}
  >
    <header className={`header ${showHeader ? 'header-visible' : 'header-hidden'}`}>
        <div className="top-panel">
          <div className="panel-background"></div>
          
        <div className="logo-container" onClick={handleNavigateHome} style={{ cursor: 'pointer' }}>
  <div className="logo-box"></div>
  <div className="logo-letter">L</div>
</div>

<div className="brand-name" onClick={handleNavigateHome} style={{ cursor: 'pointer' }}>
  <span className="brand-le">LEGAL</span>
  <span className="brand-x">x</span>
 
</div>

<div className="tagline" onClick={handleNavigateHome} style={{ cursor: 'pointer' }}>Legal Research</div>
          
          <div className="page-title">Public Prosecutor v. Dato' Richard Lim Kah Weng</div>
          <div className="page-subtitle">Money Laundering and Corporate Fraud Case</div>
          
          <div className="user-section">
            <div className="user-name">USER NAME</div>
            <div className="user-plan">Basic plan</div>
            <svg className="user-avatar-gradient" width="32" height="30" viewBox="0 0 32 30" fill="none" xmlns="http://www.w3.org/2000/svg">
              <ellipse cx="16" cy="15" rx="16" ry="15" fill="url(#paint0_linear_413_177)"/>
              <defs>
                <linearGradient id="paint0_linear_413_177" x1="16" y1="0" x2="16" y2="30" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#155DFC"/>
                  <stop offset="1" stopColor="#0D3796"/>
                </linearGradient>
              </defs>
            </svg>
            <svg className="user-avatar-white" width="34" height="33" viewBox="0 0 34 33" fill="none" xmlns="http://www.w3.org/2000/svg">
              <ellipse cx="17" cy="16.5" rx="17" ry="16.5" fill="white"/>
            </svg>
            <div className="user-initial">T</div>
          </div>
        </div>
      </header>

      <main className="main-content">
        <ProgressRings />
        <CaseOverview />
        <EvidenceSummary />
        <LegalIssues />
        <LegalProvisions />
        <CasePrecedents />
        <AdditionalDetails />

        <footer className="case-analysis-nav">
  <button onClick={handleBackToPrimaFacie} className="case-analysis-btn-back">
    <svg width="18" height="19" viewBox="0 0 18 19" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M9 15.0418L3.75 9.50016L9 3.9585" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M14.25 9.5H3.75" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
    <span>Back</span>
  </button>
          <button onClick={handleNavigateNext} className="case-analysis-btn-next">
            <span>Next</span>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M5 12H19" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M12 5L19 12L12 19" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </footer>
  </main>
    </motion.div>
  );
};

export default CaseAnalysis;