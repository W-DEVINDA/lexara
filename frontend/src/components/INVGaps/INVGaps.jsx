import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import './INVGaps.css';

function INVGaps() {
  const [expandedGaps, setExpandedGaps] = useState({});

  const toggleGapExpansion = (gapId) => {
    setExpandedGaps(prev => ({
      ...prev,
      [gapId]: !prev[gapId]
    }));
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.35 }}
      className="evidence-gaps-section"
    >
      <h2 className="section-title-main">Evidence Gaps</h2>
      <p className="section-description-sub">Areas requiring additional investigation to strengthen the prosecution case</p>

      <div className="gaps-layout">
        <div className="gap-card critical">
          <div className="gap-header">
            <div className="gap-priority critical-badge">Critical Priority</div>
            <div className="gap-impact">High Impact on Case Outcome</div>
          </div>
          <h3 className="gap-title">Ahmad's Personal Financial Records & Asset Declarations</h3>
          <p className="gap-description">
            Personal bank statements, tax returns, and asset declarations would show lifestyle inconsistent with declared income and prove he benefited from laundering operations. Essential for establishing motive and demonstrating unexplained wealth.
          </p>
          
          <button 
            className="gap-expand-btn"
            onClick={() => toggleGapExpansion('gap1')}
          >
            <span>{expandedGaps['gap1'] ? 'Hide Details' : 'Show Details'}</span>
            <ChevronDown 
              size={16} 
              style={{ 
                transform: expandedGaps['gap1'] ? 'rotate(180deg)' : 'rotate(0deg)',
                transition: 'transform 0.3s ease'
              }} 
            />
          </button>
          
          <AnimatePresence>
            {expandedGaps['gap1'] && (
              <motion.div
                initial={{ maxHeight: 0, opacity: 0 }}
                animate={{ maxHeight: 500, opacity: 1 }}
                exit={{ maxHeight: 0, opacity: 0 }}
                transition={{ duration: 0.35, ease: "easeInOut" }}
                style={{ overflow: 'hidden' }}
                className="gap-details"
              >
                <div className="gap-detail-row">
                  <span className="gap-label">Required Documents:</span>
                  <span className="gap-value">Bank statements (2022-2024), Tax returns (2020-2023), LHDN declarations</span>
                </div>
                <div className="gap-detail-row">
                  <span className="gap-label">Acquisition Method:</span>
                  <span className="gap-value">Court order for financial institution records, warrant for residence search</span>
                </div>
                <div className="gap-detail-row">
                  <span className="gap-label">Expected Timeline:</span>
                  <span className="gap-value">2-3 weeks upon court order approval</span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="gap-card high">
          <div className="gap-header">
            <div className="gap-priority high-badge">High Priority</div>
            <div className="gap-impact">Significant Case Enhancement</div>
          </div>
          <h3 className="gap-title">Direct Testimony from Offshore Gambling Operators</h3>
          <p className="gap-description">
            Would provide direct evidence of illegal gambling operations and Ahmad's role as money launderer. Statements from operators would definitively establish the unlawful origin of funds and Ahmad's knowledge of their criminal nature.
          </p>
          
          <button 
            className="gap-expand-btn"
            onClick={() => toggleGapExpansion('gap2')}
          >
            <span>{expandedGaps['gap2'] ? 'Hide Details' : 'Show Details'}</span>
            <ChevronDown 
              size={16} 
              style={{ 
                transform: expandedGaps['gap2'] ? 'rotate(180deg)' : 'rotate(0deg)',
                transition: 'transform 0.3s ease'
              }} 
            />
          </button>
          
          <AnimatePresence>
            {expandedGaps['gap2'] && (
              <motion.div
                initial={{ maxHeight: 0, opacity: 0 }}
                animate={{ maxHeight: 500, opacity: 1 }}
                exit={{ maxHeight: 0, opacity: 0 }}
                transition={{ duration: 0.35, ease: "easeInOut" }}
                style={{ overflow: 'hidden' }}
                className="gap-details"
              >
                <div className="gap-detail-row">
                  <span className="gap-label">Target Witnesses:</span>
                  <span className="gap-value">3 BVI shell company operators, 2 payment processors</span>
                </div>
                <div className="gap-detail-row">
                  <span className="gap-label">Jurisdiction Challenges:</span>
                  <span className="gap-value">BVI, Singapore - Requires MLAT (Mutual Legal Assistance Treaty)</span>
                </div>
                <div className="gap-detail-row">
                  <span className="gap-label">Alternative Evidence:</span>
                  <span className="gap-value">Europol intelligence reports, Interpol red notices if applicable</span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="gap-card high">
          <div className="gap-header">
            <div className="gap-priority high-badge">High Priority</div>
            <div className="gap-impact">Digital Evidence Strengthening</div>
          </div>
          <h3 className="gap-title">Computer & Digital Device Forensics from Residence</h3>
          <p className="gap-description">
            Personal computers, laptops, and mobile devices may contain additional communications, financial planning documents, and evidence of money laundering methodology. Search warrant for residence would yield crucial digital evidence.
          </p>
          
          <button 
            className="gap-expand-btn"
            onClick={() => toggleGapExpansion('gap3')}
          >
            <span>{expandedGaps['gap3'] ? 'Hide Details' : 'Show Details'}</span>
            <ChevronDown 
              size={16} 
              style={{ 
                transform: expandedGaps['gap3'] ? 'rotate(180deg)' : 'rotate(0deg)',
                transition: 'transform 0.3s ease'
              }} 
            />
          </button>
          
          <AnimatePresence>
            {expandedGaps['gap3'] && (
              <motion.div
                initial={{ maxHeight: 0, opacity: 0 }}
                animate={{ maxHeight: 500, opacity: 1 }}
                exit={{ maxHeight: 0, opacity: 0 }}
                transition={{ duration: 0.35, ease: "easeInOut" }}
                style={{ overflow: 'hidden' }}
                className="gap-details"
              >
                <div className="gap-detail-row">
                  <span className="gap-label">Expected Devices:</span>
                  <span className="gap-value">2-3 computers, 2-4 mobile phones, external storage devices</span>
                </div>
                <div className="gap-detail-row">
                  <span className="gap-label">Forensic Analysis:</span>
                  <span className="gap-value">Deleted files recovery, encrypted data, browser history, cloud storage access</span>
                </div>
                <div className="gap-detail-row">
                  <span className="gap-label">Legal Requirement:</span>
                  <span className="gap-value">Section 116 AMLA search warrant from High Court</span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="gaps-small-row">
          <div className="gap-small-card moderate">
            <div className="gap-small-priority moderate-badge">Moderate</div>
            <h4 className="gap-small-title">Family Member Testimonies</h4>
            <p className="gap-small-desc">Statements from family whose accounts received funds would establish knowledge of source</p>
          </div>

          <div className="gap-small-card moderate">
            <div className="gap-small-priority moderate-badge">Moderate</div>
            <h4 className="gap-small-title">Bank Negara STR Reports</h4>
            <p className="gap-small-desc">Suspicious Transaction Reports filed by banks would strengthen case</p>
          </div>

          <div className="gap-small-card high">
            <div className="gap-small-priority high-badge">High</div>
            <h4 className="gap-small-title">Expert Forensic Accounting</h4>
            <p className="gap-small-desc">Comprehensive analysis tracing every ringgit with court-ready visualization</p>
          </div>
        </div>
      </div>
    </motion.section>
  );
}

export default INVGaps;