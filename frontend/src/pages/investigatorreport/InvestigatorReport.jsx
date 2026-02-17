import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import './InvestigatorReport.css';


import INVBasicInformation from '../../components/INVBasicInformation/INVBasicInformation';
import INVSuspectInformation from '../../components/INVSuspectInformation/INVSuspectInformation';
import INVCriminalAnalysis from '../../components/INVCriminalAnalysis/INVCriminalAnalysis';
import INVProvisions from '../../components/INVProvisions/INVProvisions';
import INVEvidence from '../../components/INVEvidence/INVEvidence';
import INVSteps from '../../components/INVSteps/INVSteps';
import INVGaps from '../../components/INVGaps/INVGaps';
import INVTimeline from '../../components/INVTimeline/INVTimeline';
import INVReport from '../../components/INVReport/INVReport';
import InvChat from '../../components/InvestigatorChat/InvChat';

function InvestigatorReport() {
  const navigate = useNavigate();
  const containerRef = useRef(null);
  const [showHeader, setShowHeader] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [scrollTimeout, setScrollTimeout] = useState(null);
  const [isNavigating, setIsNavigating] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

const handleNavigateBack = () => {
  setIsNavigating(true);
  setTimeout(() => {
    navigate('/pre-investigator', { state: { smoothTransition: true } });
  }, 250);
};

const handleNavigateHome = () => {
  setIsNavigating(true);
  setTimeout(() => {
    navigate('/', { state: { smoothTransition: true } });
  }, 250);
};

  
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);


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
      initial={{ opacity: 0 }}
      animate={{ opacity: isNavigating ? 0 : 1 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className="investigator-report-container"
    >
      {/* Header */}
      <header className={`investigator-report-header ${!showHeader ? 'header-hidden' : ''}`}>
        <div className="investigator-report-header-panel">
         <div className="investigator-report-logo-section" onClick={handleNavigateHome}>
            <div className="investigator-report-logo-box">
              <span className="investigator-report-logo-letter">L</span>
            </div>
            <div className="investigator-report-logo-text">
              <div className="investigator-report-brand-name">
                <span className="gruppo">LE</span>
                <span className="bruno">x</span>
                <span className="gruppo">ARA</span>
              </div>
              <div className="investigator-report-tagline">Legal Research</div>
            </div>
          </div>
          <div className="investigator-report-page-title">Investigator Report</div>
          <div className="investigator-report-page-subtitle">Complete Automated Investigation Analysis</div>
          <div className="investigator-report-user-section">
            <div className="investigator-report-user-info">
              <div className="investigator-report-user-name">Ahmad Rahman</div>
              <div className="investigator-report-user-plan">Professional plan</div>
            </div>
            <div className="investigator-report-user-avatar">
              <span className="investigator-report-avatar-letter">A</span>
            </div>
          </div>
        </div>
      </header>

      <div className="investigator-report-content">
        {/* Component 1: Basic Information */}
        <INVBasicInformation isLoading={isLoading} />

        {/* Component 2: Suspect Information */}
        <INVSuspectInformation isLoading={isLoading} />

        {/* Component 3: Criminal Analysis */}
        <INVCriminalAnalysis />

        {/* Component 4: Legal Provisions */}
        <INVProvisions />

        {/* Component 5: Evidence */}
        <INVEvidence />

        {/* Component 6: Investigation Steps */}
        <INVSteps />

        {/* Component 7: Evidence Gaps */}
        <INVGaps />

        {/* Component 8: Timeline */}
        <INVTimeline />

        {/* Component 9: Report Assessment */}
        <INVReport />

        {/* Navigation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.45 }}
          className="investigator-report-navigation"
        >
          <motion.button
            onClick={handleNavigateBack}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="investigator-report-btn-back"
          >
            <ArrowLeft size={16} />
            <span>Back</span>
          </motion.button>

          <motion.button
  onClick={handleNavigateHome}
  whileHover={{ scale: 1.05 }}
  whileTap={{ scale: 0.95 }}
  className="investigator-report-btn-next"
>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M3 9L12 2L21 9V20C21 20.5304 20.7893 21.0391 20.4142 21.4142C20.0391 21.7893 19.5304 22 19 22H5C4.46957 22 3.96086 21.7893 3.58579 21.4142C3.21071 21.0391 3 20.5304 3 20V9Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M9 22V12H15V22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span>Home</span>
          </motion.button>
        </motion.div>
      </div>

      <div className="investigator-report-footer-gradient"></div>
      <InvChat />
    </motion.div>
  );
}

export default InvestigatorReport;