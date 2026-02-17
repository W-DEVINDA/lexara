import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './LegalIssues.css';

const LegalIssues = () => {
  const [expandedLegalIssues, setExpandedLegalIssues] = useState({
    issue1: false,
    issue2: false,
    issue3: false,
  });

  const toggleLegalIssue = (id) => {
    setExpandedLegalIssues(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const issues = [
    {
      id: 'issue1',
      title: 'Proving Intent and Knowledge in Multi-Jurisdictional Transactions',
      difficulty: 'High Difficulty',
      difficultyClass: 'difficulty-high',
      summary: 'Establishing defendant\'s actual knowledge that funds were proceeds of crime, especially given complex offshore routing through multiple jurisdictions with varying disclosure requirements.',
      challenge: 'While banking records show clear fund movement, proving the defendant knew these were proceeds of unlawful activity requires demonstrating mens rea (guilty mind). Defense may argue legitimate business transactions or claim ignorance of the funds\' illicit origin. The multi-jurisdictional nature complicates this as defendant can claim reliance on foreign banking systems and advisors.',
      strategy: 'Build circumstantial evidence through email communications showing discussions of "structuring" and "avoiding detection." Use expert testimony on standard banking practices to demonstrate defendant\'s sophisticated financial knowledge. Establish pattern of conduct showing deliberate concealment efforts inconsistent with legitimate business. Reference PP v. Najib precedent on inferring knowledge from circumstantial evidence.'
    },
    {
      id: 'issue2',
      title: 'Chain of Custody for Digital Evidence',
      difficulty: 'Medium Difficulty',
      difficultyClass: 'difficulty-medium',
      summary: 'Ensuring admissibility of digital evidence including emails, encrypted messages, and cryptocurrency records while maintaining unbroken chain of custody and forensic integrity.',
      challenge: 'Defense will likely challenge authenticity and integrity of digital evidence, particularly decrypted messages and recovered emails. Any gap in chain of custody or failure to follow forensic imaging protocols could result in evidence exclusion. Cryptocurrency blockchain evidence requires establishing technical reliability and proper expert interpretation.',
      strategy: 'Engage certified digital forensics expert (EnCE/CISSP) for all evidence handling. Document every step of collection, imaging, and analysis with timestamps and hash verification. Ensure forensic imaging follows international standards (ISO/IEC 27037). Prepare expert witness to explain blockchain analysis methodology. Maintain parallel documentation showing continuous custody from seizure through court presentation.'
    },
    {
      id: 'issue3',
      title: 'Piercing Corporate Veil Across Multiple Shell Entities',
      difficulty: 'Medium Difficulty',
      difficultyClass: 'difficulty-medium',
      summary: 'Establishing direct liability by piercing through eight layers of shell companies with nominee directors across different jurisdictions to reach beneficial owner.',
      challenge: 'Malaysian courts generally respect corporate separate legal personality. Must prove shell companies were mere façades or alter egos established solely for fraudulent purposes. Defense will argue legitimate business reasons for corporate structure and nominee arrangements. Nominee directors may claim they acted independently, complicating attribution of control to defendant.',
      strategy: 'Rely on Arab-Malaysian Finance precedent establishing fraud exception to corporate veil. Present evidence showing: (1) companies had no genuine business operations, (2) defendant exercised complete control despite nominee directors, (3) corporate structure existed solely to conceal misappropriated funds. Obtain testimony from nominee directors acknowledging they were instructed by defendant and had no real decision-making authority. Use forensic accounting to show fund flow reveals true beneficial ownership despite corporate layering.'
    }
  ];

  return (
    <section className="legal-issues-section">
      <h2 className="section-title">Legal Issues</h2>

      {issues.map(issue => (
        <div key={issue.id} className="legal-issue-card">
          <div className="legal-issue-header">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="12" cy="12" r="10" stroke="#111827" strokeWidth="2"/>
              <path d="M12 8V12" stroke="#111827" strokeWidth="2" strokeLinecap="round"/>
              <circle cx="12" cy="16" r="1" fill="#111827"/>
            </svg>
            <div className="legal-issue-info">
              <h3 className="legal-issue-title">{issue.title}</h3>
            </div>
            <span className={`legal-issue-badge ${issue.difficultyClass}`}>{issue.difficulty}</span>
          </div>
          <p className="legal-issue-summary">{issue.summary}</p>
          <button className="toggle-details" onClick={() => toggleLegalIssue(issue.id)}>
            <svg 
              width="24" 
              height="26" 
              viewBox="0 0 24 26" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
              className={expandedLegalIssues[issue.id] ? 'chevron-up' : 'chevron-down'}
            >
              <path d="M11 4.57471L17 10.9578L23 4.57471" stroke="#4B5563" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span>{expandedLegalIssues[issue.id] ? 'Hide Details' : 'View Details'}</span>
          </button>
          <AnimatePresence>
            {expandedLegalIssues[issue.id] && (
              <motion.div
                className="legal-issue-details"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
              >
                <p className="legal-issue-challenge"><strong>Challenge:</strong> {issue.challenge}</p>
                <p className="legal-issue-strategy"><strong>Strategy:</strong> {issue.strategy}</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </section>
  );
};

export default LegalIssues;