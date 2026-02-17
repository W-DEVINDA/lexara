import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './CasePrecedents.css';

const CasePrecedents = () => {
  const [expandedPrecedents, setExpandedPrecedents] = useState({
    precedent1: false,
    precedent2: false,
    precedent3: false,
  });

  const togglePrecedent = (id) => {
    setExpandedPrecedents(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const precedents = [
    {
      id: 'precedent1',
      title: 'Public Prosecutor v. Dato\' Seri Najib Razak [2020] MLJU 1945',
      court: 'High Court of Kuala Lumpur',
      award: 'Conviction: 12 years imprisonment + RM 210 million fine',
      description: 'Landmark decision on abuse of position and money laundering. Establishes standards for proving knowledge and intent in complex financial fraud cases.',
      details: 'This precedent-setting case established critical principles for prosecuting high-level financial crime in Malaysia. The court held that circumstantial evidence and pattern of conduct can establish knowledge and intent even without direct admission. The judgment emphasized that persons in positions of authority cannot claim ignorance of suspicious transactions flowing through accounts under their control. This case provides strong support for using banking records, email communications, and expert forensic analysis to prove the defendant\'s knowledge that funds were proceeds of unlawful activity.'
    },
    {
      id: 'precedent2',
      title: 'PP v. Ong Teik Kwong [2017] 4 MLJ 525',
      court: 'Federal Court of Malaysia',
      award: 'Conviction: Asset forfeiture RM 35 million',
      description: 'Defines standards for asset forfeiture under AMLA. Court approved extensive asset freezing and recovery from offshore accounts.',
      details: 'The Federal Court in this case established comprehensive guidelines for tracing and recovering laundered assets across multiple jurisdictions. The court held that assets transferred to offshore accounts or held through nominee arrangements remain subject to forfeiture if proven to be proceeds of unlawful activity. This precedent is particularly relevant to our case given the defendant\'s use of Singapore and Hong Kong accounts. The judgment confirms that Malaysian courts can order asset freezing and recovery even when funds are held overseas, providing strong legal basis for our Mareva injunction application.'
    },
    {
      id: 'precedent3',
      title: 'Arab-Malaysian Finance Bhd v. Taman Ihsan Jaya Sdn Bhd [2008] 5 MLJ 631',
      court: 'Court of Appeal',
      award: 'Civil Remedy: Corporate veil pierced',
      description: 'Establishes when courts will pierce corporate veil in fraud cases. Shell companies used to defraud creditors provide grounds for disregarding separate legal personality.',
      details: 'This Court of Appeal decision provides the legal framework for piercing the corporate veil when companies are used as instruments of fraud. The court held that where corporate structures are established solely to evade legal obligations or perpetrate fraud, courts will disregard the separate legal personality and hold beneficial owners personally liable. In our case, the defendant created multiple shell companies with nominee directors specifically to receive and conceal misappropriated funds. This precedent supports treating all entities as alter egos of the defendant for asset recovery purposes, allowing us to pursue assets held in the shell companies\' names.'
    }
  ];

  return (
    <section className="case-precedents-section">
      <h2 className="section-title">Relevant Case Precedents</h2>

      {precedents.map(precedent => (
        <div key={precedent.id} className="precedent-card">
          <div className="precedent-header">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M11.1 22H6C5.46957 22 4.96086 21.7893 4.58579 21.4142C4.21071 21.0391 4 20.5304 4 20V4.00001C4 3.46957 4.21071 2.96087 4.58579 2.58579C4.96086 2.21072 5.46957 2.00001 6 2.00001H14C14.3169 1.99923 14.6308 2.06122 14.9236 2.18239C15.2164 2.30357 15.4823 2.48153 15.706 2.70601L19.295 6.29401C19.5193 6.51776 19.6971 6.78371 19.8181 7.07652C19.9391 7.36932 20.0009 7.68319 20 8.00001V11.25" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M14 2V7C14 7.26522 14.1054 7.51957 14.2929 7.70711C14.4804 7.89464 14.7348 8 15 8H20" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M21.0001 22.0001L18.1201 19.1201" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M16 20C17.6569 20 19 18.6569 19 17C19 15.3431 17.6569 14 16 14C14.3431 14 13 15.3431 13 17C13 18.6569 14.3431 20 16 20Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <div className="precedent-info">
              <h3 className="precedent-title">{precedent.title}</h3>
              <p className="precedent-court">{precedent.court}</p>
              <span className="precedent-award">{precedent.award}</span>
            </div>
          </div>
          <p className="precedent-description">{precedent.description}</p>
          <button className="toggle-details" onClick={() => togglePrecedent(precedent.id)}>
            <svg 
              width="24" 
              height="26" 
              viewBox="0 0 24 26" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
              className={expandedPrecedents[precedent.id] ? 'chevron-up' : 'chevron-down'}
            >
              <path d="M11 4.57471L17 10.9578L23 4.57471" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span>{expandedPrecedents[precedent.id] ? 'Hide Details' : 'View Details'}</span>
          </button>
          <AnimatePresence>
            {expandedPrecedents[precedent.id] && (
              <motion.p 
                className="precedent-details"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
              >
                {precedent.details}
              </motion.p>
            )}
          </AnimatePresence>
        </div>
      ))}
    </section>
  );
};

export default CasePrecedents;