import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './ResearchToolsPanel.css';

function ResearchToolsPanel({ onResourceClick }) {
  const [expandedSections, setExpandedSections] = useState({
    quickReferences: false,
    legalGuides: false,
    usefulResources: false
  });

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  return (
    <div className="rtp-research-tools-panel">
      <h2 className="rtp-panel-title">Research Tools</h2>
      
      <div className="rtp-tools-section">
        <div className="rtp-section-title" onClick={() => toggleSection('quickReferences')}>
          <motion.span
            className="rtp-section-icon"
            animate={{ rotate: expandedSections.quickReferences ? 0 : -90 }}
            transition={{ duration: 0.3 }}
          >
            +
          </motion.span>
          QUICK REFERENCES
        </div>
        <AnimatePresence>
          {expandedSections.quickReferences && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              style={{ overflow: "hidden" }}
            >
              <div className="rtp-tool-link" onClick={() => onResourceClick('employment-act')}>Employment Act 2024 Update</div>
              <div className="rtp-tool-link" onClick={() => onResourceClick('digital-tax')}>Digital Services Tax Rules</div>
              <div className="rtp-tool-link" onClick={() => onResourceClick('companies-act')}>Companies Amendment Act 24</div>
              <div className="rtp-tool-link" onClick={() => onResourceClick('evidence-act')}>Malaysian Evidence Act 1950</div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="rtp-tools-section">
        <div className="rtp-section-title" onClick={() => toggleSection('legalGuides')}>
          <motion.span
            className="rtp-section-icon"
            animate={{ rotate: expandedSections.legalGuides ? 0 : -90 }}
            transition={{ duration: 0.3 }}
          >
            +
          </motion.span>
          LEGAL GUIDES
        </div>
        <AnimatePresence>
          {expandedSections.legalGuides && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              style={{ overflow: "hidden" }}
            >
              <div className="rtp-tool-link" onClick={() => onResourceClick('starting-business')}>Starting Business Malaysia</div>
              <div className="rtp-tool-link" onClick={() => onResourceClick('property-transfer')}>Property Transfer Process</div>
              <div className="rtp-tool-link" onClick={() => onResourceClick('employment-essentials')}>Employment Law Essentials</div>
              <div className="rtp-tool-link" onClick={() => onResourceClick('ip-law')}>Intellectual Property Law</div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="rtp-tools-section">
        <div className="rtp-section-title" onClick={() => toggleSection('usefulResources')}>
          <motion.span
            className="rtp-section-icon"
            animate={{ rotate: expandedSections.usefulResources ? 0 : -90 }}
            transition={{ duration: 0.3 }}
          >
            +
          </motion.span>
          USEFUL RESOURCES
        </div>
        <AnimatePresence>
          {expandedSections.usefulResources && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              style={{ overflow: "hidden" }}
            >
              <div className="rtp-tool-link" onClick={() => onResourceClick('malaysian-bar')}>Malaysian Bar Council Hub</div>
              <div className="rtp-tool-link" onClick={() => onResourceClick('legal-aid')}>Legal Aid Centre Services</div>
              <div className="rtp-tool-link" onClick={() => onResourceClick('law-reform')}>Law Reform Commission Info</div>
              <div className="rtp-tool-link" onClick={() => onResourceClick('court-filing')}>Court Filing & Procedures</div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default ResearchToolsPanel;