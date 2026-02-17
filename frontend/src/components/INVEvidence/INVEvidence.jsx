import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import './INVEvidence.css';

function INVEvidence() {
  const [expandedEvidence, setExpandedEvidence] = useState({});

  const evidenceDetailsData = {
    banking: {
      title: "Banking Transaction Records",
      strength: "Critical",
      type: "Documentary Evidence",
      description: "Required to establish the flow of funds from illegal sources to the accused's accounts. Must demonstrate the pattern of receiving offshore transfers and subsequent cash withdrawals.",
      details: [
        "Complete transaction history showing all incoming transfers from identified offshore entities",
        "Detailed records of 187+ suspicious transactions over the investigation period",
        "SWIFT MT103 messages proving international wire transfers from shell companies",
        "Timestamps correlating deposits with immediate withdrawal patterns (24-48 hours)",
        "Account statements certified by financial institutions with proper authentication"
      ],
      probativeValue: "Essential to prove actus reus (criminal act) by establishing the physical movement of proceeds through the accused's accounts. Creates an irrefutable paper trail connecting illegal offshore sources to the accused.",
      chainOfCustody: "Must be obtained via court order under Section 116 AMLA. Requires bank compliance officer certification and digital forensic hash verification to ensure admissibility.",
      legalAdmissibility: "Admissible under Section 90A of the Evidence Act 1950 as business records. Certified copies with official bank seals satisfy documentary evidence requirements for prosecution."
    },
    swift: {
      title: "International Wire Transfer Documentation",
      strength: "Critical",
      type: "International Banking Records",
      description: "Required to prove the foreign origin of funds and establish connection to known illegal gambling operations. SWIFT records are essential for demonstrating cross-border money laundering.",
      details: [
        "MT103 payment messages containing full sender and beneficiary details",
        "Documentation from originating banks in British Virgin Islands",
        "Proof of beneficial ownership of sending shell companies",
        "Regular transfer patterns (every 7-10 days) indicating systematic operation",
        "Total documented transfers of RM 8.5 million across multiple transactions"
      ],
      probativeValue: "Proves international dimension of the crime and links funds to known illegal gambling networks. SWIFT authentication provides independent verification that cannot be disputed.",
      chainOfCustody: "Requires Mutual Legal Assistance Treaty (MLAT) request to BVI authorities and cooperation through Europol. Must be certified by SWIFT network administrators.",
      legalAdmissibility: "Admissible as foreign business records under Section 90A Evidence Act. MLAT ensures proper authentication and chain of custody for international evidence."
    },
    cctv: {
      title: "CCTV Surveillance Footage",
      strength: "Important",
      type: "Visual Evidence",
      description: "Required to demonstrate consciousness of guilt through deliberate identity concealment. Visual evidence corroborates banking records and proves physical presence during withdrawals.",
      details: [
        "Minimum 47 video recordings showing the accused making cash withdrawals",
        "Clear footage capturing use of disguises (caps, sunglasses, masks)",
        "Coverage from multiple Bank Muamalat branches across Klang Valley",
        "Timestamped recordings correlating exactly with transaction records",
        "Continuous chain of custody from bank security systems"
      ],
      probativeValue: "Demonstrates guilty knowledge (mens rea) through suspicious behavior patterns. The use of disguises indicates awareness of criminal activity and intent to avoid identification.",
      chainOfCustody: "Original recordings must be secured from bank security systems with proper documentation. Copies made in presence of bank officers and security personnel to maintain integrity.",
      legalAdmissibility: "Admissible under Sections 7 and 8 of the Evidence Act as relevant facts showing conduct and state of mind. Requires forensic video analyst certification for authentication."
    },
    phone: {
      title: "Phone Communications & Digital Records",
      strength: "Critical",
      type: "Digital Communications Evidence",
      description: "Required to establish mens rea (guilty knowledge) through incriminating conversations. Digital communications using coded language prove awareness of criminal nature of funds.",
      details: [
        "Forensically extracted data from all mobile devices used by accused",
        "Call logs showing 127+ communications with overseas gambling operators",
        "WhatsApp messages containing coded references to money laundering ('cleaning', 'washing')",
        "Evidence of discussions regarding '10% commission for services'",
        "Contact identification linking phone numbers to known criminal networks"
      ],
      probativeValue: "Establishes criminal intent and knowledge that funds were proceeds of crime. The use of money laundering terminology demonstrates deliberate participation in illegal activity.",
      chainOfCustody: "Phones must be seized under proper search warrant. Forensic extraction by MCMC-certified laboratory with complete chain of custody documentation maintained.",
      legalAdmissibility: "Admissible under Computer Evidence provisions (Sections 90A-90C Evidence Act). Forensic extraction report by certified examiner authenticates digital evidence."
    },
    shell: {
      title: "Shell Company Corporate Documentation",
      strength: "Important",
      type: "Corporate Records",
      description: "Required to prove deliberate creation of complex layering structure to obscure fund origins. Corporate records demonstrate sophisticated money laundering methodology.",
      details: [
        "Registration documents for all 3 BVI shell companies involved",
        "Proof that companies share same registered address (virtual office)",
        "Documentation showing use of nominee directors with no actual involvement",
        "Evidence of no legitimate business licenses or operational permits",
        "Incorporation timeline showing companies formed shortly before first transfer"
      ],
      probativeValue: "Proves intentional creation of layering mechanism to distance funds from illegal source. Demonstrates sophisticated knowledge of money laundering techniques.",
      chainOfCustody: "Obtained through MLAT request to BVI Financial Investigation Agency. Requires official certified copies with apostille for international authentication.",
      legalAdmissibility: "Foreign corporate documents admissible under Section 90A Evidence Act. Apostille certification satisfies authentication requirements for foreign business records."
    },
    business: {
      title: "Business Investigation & Verification Report",
      strength: "Critical",
      type: "Investigation Report",
      description: "Required to prove that Stellar Solutions Sdn Bhd is a shell entity with no legitimate business purpose. Eliminates any defense of lawful business operations.",
      details: [
        "Physical site inspection report showing registered address is vacant lot",
        "SSM (Companies Commission) records showing no business activity filings",
        "KWSP/SOCSO records confirming zero registered employees",
        "LHDN records showing no tax returns filed since incorporation",
        "Municipal records showing no business licenses or permits obtained"
      ],
      probativeValue: "Eliminates any possible defense of legitimate business activity. Proves the company exists solely as a vehicle for money laundering with no genuine commercial purpose.",
      chainOfCustody: "Investigation conducted by Commercial Crime Investigation Department officers. Official report signed by investigating officer with supporting photographic evidence.",
      legalAdmissibility: "Admissible as expert evidence under Section 45 Evidence Act. Official investigation reports satisfy procedural requirements for prosecution evidence."
    },
    nominee: {
      title: "Nominee Transfer Documentation & Family Account Records",
      strength: "Critical",
      type: "Banking & Relationship Evidence",
      description: "Required to prove systematic layering technique and use of family members as nominees to distance accused from proceeds. Demonstrates deliberate distribution pattern.",
      details: [
        "Complete banking records for all 4 family member accounts receiving funds",
        "Timeline showing transfers within 24-48 hours of receiving offshore funds",
        "Breakdown: RM 1.8M (wife), RM 1.5M (brother), RM 1.5M (son), RM 1.4M (daughter)",
        "Proof of no legitimate business relationships justifying transfers",
        "Statements from family members claiming ignorance of fund sources"
      ],
      probativeValue: "Proves sophisticated layering technique to obscure money trail. Pattern of immediate distribution to family nominees demonstrates systematic money laundering operation.",
      chainOfCustody: "Obtained via court orders to multiple financial institutions. Bank statements must be certified by respective bank compliance officers.",
      legalAdmissibility: "Admissible as business records under Section 90A Evidence Act. Pattern evidence relevant under Section 14 to demonstrate systematic criminal conduct."
    }
  };

  const toggleEvidenceExpansion = (evidenceId) => {
    setExpandedEvidence(prev => ({
      ...prev,
      [evidenceId]: !prev[evidenceId]
    }));
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="available-evidence-section"
    >
      <h2 className="section-title-main">Required Evidence</h2>
      <p className="section-description-sub">Essential evidence needed to prove the accused's guilt beyond reasonable doubt</p>

      <div className="evidence-expandable-list">
        {['banking', 'swift', 'cctv', 'phone', 'shell', 'business', 'nominee'].map((evidenceKey, index) => (
          <div key={evidenceKey} className="evidence-expandable-card">
            <div 
              className="evidence-card-header"
              onClick={() => toggleEvidenceExpansion(evidenceKey)}
            >
              <div className="evidence-header-left">
                <span className="evidence-number-badge">
                  {index + 1}
                </span>
                <h4 className="evidence-card-title">{evidenceDetailsData[evidenceKey].title}</h4>
              </div>
              <ChevronDown 
                size={20} 
                className="evidence-chevron"
                style={{ 
                  transform: expandedEvidence[evidenceKey] ? 'rotate(180deg)' : 'rotate(0deg)',
                  transition: 'transform 0.3s ease'
                }} 
              />
            </div>
            
            <div className="evidence-card-type">{evidenceDetailsData[evidenceKey].type}</div>
            <p className="evidence-card-description">{evidenceDetailsData[evidenceKey].description}</p>
            
            <AnimatePresence>
              {expandedEvidence[evidenceKey] && (
                <motion.div
                  initial={{ maxHeight: 0, opacity: 0 }}
                  animate={{ maxHeight: 2000, opacity: 1 }}
                  exit={{ maxHeight: 0, opacity: 0 }}
                  transition={{ duration: 0.35, ease: "easeInOut" }}
                  style={{ overflow: 'hidden' }}
                  className="evidence-expanded-content"
                >
                  <div className="evidence-detail-section">
                    <h5 className="evidence-detail-heading">Key Details Required</h5>
                    <ul className="evidence-detail-list">
                      {evidenceDetailsData[evidenceKey].details.map((detail, idx) => (
                        <li key={idx}>{detail}</li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="evidence-detail-section">
                    <h5 className="evidence-detail-heading">Probative Value</h5>
                    <p className="evidence-detail-text evidence-highlight">{evidenceDetailsData[evidenceKey].probativeValue}</p>
                  </div>
                  
                  <div className="evidence-detail-section">
                    <h5 className="evidence-detail-heading">Chain of Custody Requirements</h5>
                    <p className="evidence-detail-text">{evidenceDetailsData[evidenceKey].chainOfCustody}</p>
                  </div>
                  
                  <div className="evidence-detail-section">
                    <h5 className="evidence-detail-heading">Legal Admissibility</h5>
                    <p className="evidence-detail-text evidence-legal">{evidenceDetailsData[evidenceKey].legalAdmissibility}</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </motion.section>
  );
}

export default INVEvidence;