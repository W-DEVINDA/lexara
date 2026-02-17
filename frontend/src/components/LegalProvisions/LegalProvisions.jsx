import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './LegalProvisions.css';

const LegalProvisions = () => {
  const [expandedProvisions, setExpandedProvisions] = useState({
    provision1: false,
    provision2: false,
    provision3: false,
  });

  const toggleProvision = (id) => {
    setExpandedProvisions(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const provisions = [
    {
      id: 'provision1',
      code: 'Anti-Money Laundering Act 2001, Section 4',
      title: 'Money Laundering Offence',
      badge: 'Primary Charge',
      badgeClass: 'badge-primary',
      summary: 'Engaging in transactions involving proceeds of unlawful activity. Maximum penalty: 15 years imprisonment and fine up to RM5 million.',
      details: 'Under AMLA Section 4, any person who engages in, or attempts to engage in, or abets the commission of money laundering commits an offence. The prosecution must prove: (1) the property involved constitutes proceeds of unlawful activity, (2) the defendant knew or had reason to believe it was proceeds of crime, and (3) the defendant engaged in transactions to conceal or disguise the nature, source, location, or movement of those proceeds. The extensive banking records and email evidence in this case clearly establish all three elements, with funds systematically moved through multiple accounts specifically to obscure their fraudulent origin.'
    },
    {
      id: 'provision2',
      code: 'Penal Code Section 409',
      title: 'Criminal Breach of Trust by Public Servant or Agent',
      badge: 'Critical',
      badgeClass: 'badge-critical',
      summary: 'Defendant held position of trust as company director and systematically misappropriated company funds. Penalty: up to 20 years imprisonment and fine.',
      details: 'Section 409 of the Penal Code addresses criminal breach of trust by persons in positions of special responsibility. As a director of a publicly-listed company, the defendant was entrusted with dominion over corporate assets and owed fiduciary duties to shareholders. The evidence demonstrates systematic dishonest misappropriation of funds through unauthorized transfers to shell companies under his control. This breach of trust is aggravated by the defendant\'s senior position and the substantial amount involved, warranting enhanced penalties under this provision.'
    },
    {
      id: 'provision3',
      code: 'Companies Act 2016, Section 539',
      title: 'Fraudulent Conduct of Business',
      badge: 'Very Strong',
      badgeClass: 'badge-very-strong',
      summary: 'Company affairs conducted fraudulently to defraud creditors and shareholders. Shell companies created specifically to facilitate fund diversion.',
      details: 'The Companies Act 2016 Section 539 criminalizes carrying on business with intent to defraud creditors, shareholders, or any other person. The defendant established multiple shell companies with nominee directors for the sole purpose of receiving misappropriated funds and obscuring their true destination. This elaborate corporate structure, combined with false accounting entries and fabricated invoices, demonstrates clear fraudulent intent. The provision allows for both criminal penalties and civil remedies including piercing the corporate veil to recover assets hidden within the shell company structure.'
    }
  ];

  return (
    <section className="legal-provisions-section">
      <h2 className="section-title">Applicable Legal Provisions</h2>

      {provisions.map(provision => (
        <div key={provision.id} className="provision-card">
          <div className="provision-header">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 3V21" stroke="#111827" strokeWidth="2" strokeLinecap="round"/>
              <path d="M3 7H21" stroke="#111827" strokeWidth="2" strokeLinecap="round"/>
              <path d="M6 7L6 13M4 13L8 13L6.5 16C6.5 17 5.5 17 5.5 16L4 13Z" stroke="#111827" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M18 7L18 13M16 13L20 13L18.5 16C18.5 17 17.5 17 17.5 16L16 13Z" stroke="#111827" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M7 21H17" stroke="#111827" strokeWidth="2" strokeLinecap="round"/>
            </svg>
            <div className="provision-info">
              <p className="provision-code">{provision.code}</p>
              <h3 className="provision-title">{provision.title}</h3>
            </div>
            <span className={`provision-badge ${provision.badgeClass}`}>{provision.badge}</span>
          </div>
          <p className="provision-summary">{provision.summary}</p>
          <button className="toggle-details" onClick={() => toggleProvision(provision.id)}>
            <svg 
              width="24" 
              height="26" 
              viewBox="0 0 24 26" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
              className={expandedProvisions[provision.id] ? 'chevron-up' : 'chevron-down'}
            >
              <path d="M11 4.57471L17 10.9578L23 4.57471" stroke="#4B5563" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span>{expandedProvisions[provision.id] ? 'Hide Details' : 'View Details'}</span>
          </button>
          <AnimatePresence>
            {expandedProvisions[provision.id] && (
              <motion.p 
                className="provision-details"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
              >
                {provision.details}
              </motion.p>
            )}
          </AnimatePresence>
        </div>
      ))}
    </section>
  );
};

export default LegalProvisions;