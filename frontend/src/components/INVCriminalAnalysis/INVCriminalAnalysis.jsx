import React from 'react';
import { motion } from 'framer-motion';
import { Scale, ShieldAlert, FileText, CheckCircle } from 'lucide-react';
import './INVCriminalAnalysis.css';

function INVCriminalAnalysis() {
  return (
    <motion.section 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="criminal-elements-section"
    >
      <h2 className="section-title-main">Criminal Elements Analysis</h2>
      
      {/* Action Card - Full Width */}
      <div className="criminal-element-full-card">
        <div className="element-top-bar">
          <div className="element-bar-left">
            <Scale size={16} strokeWidth={2.5} />
            <div>
              <h3 className="element-title-bar">Action (Actus Reus)</h3>
              <p className="element-subtitle-bar">Physical acts constituting the criminal offence</p>
            </div>
          </div>
          <div className="element-type-badge">Criminal Conduct</div>
        </div>

        <div className="element-main-content">
          <div className="element-text-section">
            <h4 className="element-section-heading">Observable Criminal Conduct</h4>
            <div className="conduct-list">
              <div className="conduct-item">Bank records show the suspect, Encik Ahmad bin Hassan, received RM8.5 million in his company account 'Stellar Solutions Sdn Bhd' over a six-month period from January to June 2024. The funds originated from three shell companies registered in the British Virgin Islands.</div>
              <div className="conduct-item">Within 24-48 hours of each deposit, Ahmad withdrew large cash amounts (RM50,000-RM150,000) or transferred funds to multiple personal accounts belonging to family members. CCTV footage from Bank Muamalat shows Ahmad making frequent cash withdrawals while dressed in disguise.</div>
              <div className="conduct-item">Business registration checks reveal Stellar Solutions has no legitimate business operations, employees, or office premises.</div>
            </div>
          </div>

          <div className="evidence-flow-timeline">
            <h4 className="element-section-heading">Evidence Flow & Connection Analysis</h4>
            <div className="flow-steps-horizontal">
              <div className="flow-step-h">
                <div className="step-number-h">1</div>
                <div className="step-content-h">
                  <div className="step-title-h step-title-highlight">Offshore Transfer</div>
                  <div className="step-desc-h">RM8.5M from BVI shell companies</div>
                </div>
              </div>

              <div className="flow-connector-h">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>

              <div className="flow-step-h">
                <div className="step-number-h">2</div>
                <div className="step-content-h">
                  <div className="step-title-h step-title-highlight">Disguised Withdrawals</div>
                  <div className="step-desc-h">47 cash withdrawals in disguise</div>
                </div>
              </div>

              <div className="flow-connector-h">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>

              <div className="flow-step-h">
                <div className="step-number-h">3</div>
                <div className="step-content-h">
                  <div className="step-title-h step-title-highlight">Fund Dispersal</div>
                  <div className="step-desc-h">RM6.2M to family accounts</div>
                </div>
              </div>

              <div className="flow-connector-h">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>

              <div className="flow-step-h flow-final-h">
                <div className="step-number-h">✓</div>
                <div className="step-content-h">
                  <div className="step-title-h step-title-highlight">Systematic Layering</div>
                  <div className="step-desc-h">Pattern obscures money trail</div>
                </div>
              </div>
            </div>
          </div>

          <div className="proves-section">
            <div className="proves-header">
              <FileText size={14} strokeWidth={2.5} />
              <span>What This Proves</span>
            </div>
            <div className="proves-list">
              <div className="proves-item">▸ Engagement in transactions involving proceeds of unlawful activities</div>
              <div className="proves-item">▸ Deliberate layering and structuring of funds to conceal origins</div>
              <div className="proves-item">▸ Use of shell companies and nominees to distance from illegal proceeds</div>
              <div className="proves-item">▸ Consciousness of guilt via disguises and rapid fund movement</div>
            </div>
          </div>
        </div>
      </div>

      {/* Intent Card - Full Width */}
      <div className="criminal-element-full-card">
        <div className="element-top-bar">
          <div className="element-bar-left">
            <ShieldAlert size={16} strokeWidth={2.5} />
            <div>
              <h3 className="element-title-bar">Intent (Mens Rea)</h3>
              <p className="element-subtitle-bar">Mental state and criminal knowledge</p>
            </div>
          </div>
          <div className="element-type-badge">Criminal Mind</div>
        </div>

        <div className="element-main-content">
          <div className="element-text-section">
            <h4 className="element-section-heading">Demonstrated Criminal Knowledge</h4>
            <div className="conduct-list">
              <div className="conduct-item">Ahmad's systematic pattern of receiving foreign funds, immediately dispersing them through cash withdrawals and transfers to family accounts, combined with the absence of legitimate business activity, demonstrates deliberate intent to conceal the illegal origin of the money.</div>
              <div className="conduct-item">His use of disguises during bank visits and the employment of shell companies shows knowledge that the funds were proceeds of crime. Phone records reveal conversations with overseas contacts discussing 'cleaning operations' and '10% commission for services'.</div>
            </div>
          </div>

          <div className="intent-indicators-section">
            <h4 className="element-section-heading">Indicators of Guilty Mind (Mens Rea)</h4>
            <div className="intent-grid">
              <div className="intent-card">
                <div className="intent-num">01</div>
                <div className="intent-title">Identity Concealment</div>
                <div className="intent-desc">Wore caps, sunglasses, masks during 47 bank visits to avoid CCTV identification</div>
              </div>

              <div className="intent-card">
                <div className="intent-num">02</div>
                <div className="intent-title">Coded Language</div>
                <div className="intent-desc">Used terms like "cleaning" and "washing" in phone conversations with foreign operators</div>
              </div>

              <div className="intent-card">
                <div className="intent-num">03</div>
                <div className="intent-title">Shell Structure</div>
                <div className="intent-desc">Created fake business with no operations solely to receive and legitimize illegal funds</div>
              </div>

              <div className="intent-card">
                <div className="intent-num">04</div>
                <div className="intent-title">Rapid Dispersal</div>
                <div className="intent-desc">Moved funds within 24-48 hours consistently to avoid detection and scrutiny</div>
              </div>
            </div>
          </div>

          <div className="proves-section">
            <div className="proves-header">
              <CheckCircle size={14} strokeWidth={2.5} />
              <span>Legal Conclusion</span>
            </div>
            <div className="conclusion-text">
              <mark className="highlight-red"><strong>Mens Rea Established:</strong></mark> <mark className="highlight-text">Ahmad knowingly engaged in money laundering with full awareness that funds were proceeds of unlawful activities. The systematic nature, use of multiple layers, and attempts at concealment demonstrate purposeful criminal intent rather than negligence or innocent conduct.</mark>
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
}

export default INVCriminalAnalysis;