import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Scale, CheckCircle } from 'lucide-react';
import './INVProvisions.css';

function INVProvisions() {
  const [selectedCharge, setSelectedCharge] = useState(null);
  const [showChargeModal, setShowChargeModal] = useState(false);

  const chargeDetailsData = {
    A: {
      letter: "A",
      code: "Section 4(1)(b) AMLA",
      title: "Acquiring, receiving, possessing, disguising, transferring proceeds",
      fullDescription: "This section criminalizes the act of acquiring, receiving, possessing, disguising, transferring, converting, exchanging, carrying, disposing, or removing from Malaysia any property that represents proceeds from unlawful activity.",
      elements: [
        "Property must constitute proceeds of unlawful activity",
        "Accused acquired, received, possessed, disguised, or transferred the property",
        "Knowledge or reason to believe property represents proceeds",
        "Intent to assist in avoiding legal consequences"
      ],
      penalties: "Imprisonment up to 15 years and fine of RM5 million or 5x proceeds value (whichever higher)",
      applicability: "Applies to Ahmad's receipt and transfer of funds from offshore gambling operations through multiple accounts."
    },
    B: {
      letter: "B",
      code: "Section 92 AMLA",
      title: "Structuring transactions to avoid reporting requirements",
      fullDescription: "No person shall structure any transaction with any reporting institution for the purpose of evading reporting requirements or record-keeping under this Act.",
      elements: [
        "Deliberate structuring of transactions",
        "Purpose to evade reporting thresholds",
        "Pattern of transactions below RM50,000",
        "Multiple transactions over short period"
      ],
      penalties: "Imprisonment up to 5 years or fine up to RM5 million or both",
      applicability: "Ahmad's 47 cash withdrawals were structured to stay below reporting thresholds, demonstrating deliberate evasion of STR requirements."
    },
    C: {
      letter: "C",
      code: "Section 137(1)(b) Financial Services Act 2013",
      title: "Providing false information to financial institution",
      fullDescription: "Any person who, in relation to any application, document or information submitted to a licensed person, makes a statement which is false or misleading in a material particular commits an offence.",
      elements: [
        "Statement made to financial institution",
        "Statement is false or misleading",
        "Material to the transaction or application",
        "Knowledge of falsity or reckless disregard"
      ],
      penalties: "Imprisonment up to 10 years or fine up to RM50 million or both",
      applicability: "Stellar Solutions Sdn Bhd's business registration contained false information about operations and business activities provided to Bank Muamalat."
    },
    D: {
      letter: "D",
      code: "Section 420 Penal Code",
      title: "Cheating - Fraudulent representations to bank",
      fullDescription: "Whoever cheats and thereby dishonestly induces the person deceived to deliver any property or to make, alter or destroy any valuable security, commits an offence.",
      elements: [
        "Deception or fraudulent representation",
        "Inducement to deliver property or service",
        "Dishonest intention from the beginning",
        "Actual delivery or action by deceived party"
      ],
      penalties: "Imprisonment between 1-10 years and liable to fine",
      applicability: "False representations about Stellar Solutions' legitimate business purpose to obtain banking services and process illicit funds."
    }
  };

  return (
    <>
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.25 }}
        className="legal-provisions-section"
      >
        <h2 className="section-title-main">Applicable Legal Provisions</h2>
        
        <div className="legal-black-card">
          <div className="legal-header-row">
            <div className="legal-icon-small">
              <Scale size={14} strokeWidth={2.5} />
            </div>
            <div className="legal-meta">
              <span className="legal-section">SECTION 4(1)</span>
              <span className="legal-act">AMLA 2001</span>
            </div>
            <div className="legal-primary-tag">Primary Charge</div>
          </div>

          <h3 className="legal-title-white">Anti-Money Laundering, Anti-Terrorism Financing and Proceeds of Unlawful Activities Act 2001</h3>
          
          <div className="legal-statute-box">
            Whoever engages in, or attempts to engage in, or abets the commission of, money laundering commits an offence and shall on conviction be liable to imprisonment for a term not exceeding fifteen years and shall also be liable to a fine of not less than five times the sum or value of the proceeds of an unlawful activity or instrumentalities of an offence at the time the offence was committed or RM5 million, whichever is the higher.
          </div>

          <div className="penalties-row-white">
            <div className="penalty-white-box">
              <div className="penalty-white-label">Imprisonment</div>
              <div className="penalty-white-value">Up to 15 Years</div>
            </div>
            <div className="penalty-white-divider"></div>
            <div className="penalty-white-box">
              <div className="penalty-white-label">Fine (Option A)</div>
              <div className="penalty-white-value">5× Proceeds</div>
            </div>
            <div className="penalty-white-divider"></div>
            <div className="penalty-white-box">
              <div className="penalty-white-label">Fine (Option B)</div>
              <div className="penalty-white-value">RM 5 Million</div>
            </div>
            <div className="penalty-white-divider"></div>
            <div className="penalty-white-box">
              <div className="penalty-white-label">Applied</div>
              <div className="penalty-white-value">Higher Amount</div>
            </div>
          </div>

          <div className="elements-white-section">
            <h4 className="white-section-heading">Elements of the Offence</h4>
            <div className="elements-white-grid">
              <div className="element-white-card">
                <div className="element-white-check"><CheckCircle size={14} strokeWidth={2.5} /></div>
                <div className="element-white-num">01</div>
                <h5 className="element-white-title">Property Constitutes Proceeds</h5>
                <p className="element-white-desc">Property involved must be proceeds of unlawful activity</p>
                <div className="element-white-satisfied">✓ Funds traced to illegal gambling operations</div>
              </div>

              <div className="element-white-card">
                <div className="element-white-check"><CheckCircle size={14} strokeWidth={2.5} /></div>
                <div className="element-white-num">02</div>
                <h5 className="element-white-title">Engagement in Transactions</h5>
                <p className="element-white-desc">Accused engaged in transaction or series of transactions</p>
                <div className="element-white-satisfied">✓ Multiple deposits, withdrawals documented</div>
              </div>

              <div className="element-white-card">
                <div className="element-white-check"><CheckCircle size={14} strokeWidth={2.5} /></div>
                <div className="element-white-num">03</div>
                <h5 className="element-white-title">Purpose to Conceal</h5>
                <p className="element-white-desc">Intent to disguise nature, source, or location of proceeds</p>
                <div className="element-white-satisfied">✓ Shell companies, rapid dispersal confirmed</div>
              </div>

              <div className="element-white-card">
                <div className="element-white-check"><CheckCircle size={14} strokeWidth={2.5} /></div>
                <div className="element-white-num">04</div>
                <h5 className="element-white-title">Knowledge or Belief</h5>
                <p className="element-white-desc">Accused knew or had reason to believe property was proceeds</p>
                <div className="element-white-satisfied">✓ Phone records, behavior, fake business</div>
              </div>
            </div>
          </div>

          <div className="additional-white-section">
            <h4 className="white-section-heading">Additional Potential Charges</h4>
            <div className="charges-white-grid">
              {['A', 'B', 'C', 'D'].map((letter) => (
                <div 
                  key={letter}
                  className="charge-white-card clickable-charge"
                  onClick={() => {
                    setSelectedCharge(letter);
                    setShowChargeModal(true);
                  }}
                >
                  <span className="charge-white-letter">{letter}</span>
                  <div>
                    <div className="charge-white-code">{chargeDetailsData[letter].code}</div>
                    <div className="charge-white-text">{chargeDetailsData[letter].title}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.section>

      {/* Charge Details Modal */}
      <AnimatePresence>
        {showChargeModal && selectedCharge && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="charge-modal-overlay"
            onClick={() => setShowChargeModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", duration: 0.3 }}
              className="charge-modal-content"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="charge-modal-header">
                <div className="charge-modal-header-content">
                  <div className="charge-modal-letter">{chargeDetailsData[selectedCharge].letter}</div>
                  <div className="charge-modal-header-text">
                    <h3 className="charge-modal-title">{chargeDetailsData[selectedCharge].code}</h3>
                    <p className="charge-modal-subtitle">{chargeDetailsData[selectedCharge].title}</p>
                  </div>
                </div>
                <button 
                  className="charge-modal-close"
                  onClick={() => setShowChargeModal(false)}
                >
                  ×
                </button>
              </div>
              
              <div className="charge-modal-section">
                <h4 className="charge-modal-section-title">Full Description</h4>
                <p className="charge-modal-text">{chargeDetailsData[selectedCharge].fullDescription}</p>
              </div>
              
              <div className="charge-modal-section">
                <h4 className="charge-modal-section-title">Elements of Offence</h4>
                <ul className="charge-modal-list">
                  {chargeDetailsData[selectedCharge].elements.map((element, idx) => (
                    <li key={idx}>{element}</li>
                  ))}
                </ul>
              </div>
              
              <div className="charge-modal-section">
                <h4 className="charge-modal-section-title">Penalties</h4>
                <p className="charge-modal-text charge-modal-penalties">{chargeDetailsData[selectedCharge].penalties}</p>
              </div>
              
              <div className="charge-modal-section">
                <h4 className="charge-modal-section-title">Applicability to Case</h4>
                <p className="charge-modal-text">{chargeDetailsData[selectedCharge].applicability}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default INVProvisions;