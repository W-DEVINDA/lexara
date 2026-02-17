import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, Scale, CheckCircle2, AlertCircle } from 'lucide-react';
import './EvidenceSummary.css';

const EvidenceSummary = () => {
  const [expandedEvidence, setExpandedEvidence] = useState({
    documentary: false,
    digital: false,
    expert: false,
    physical: false,
  });

  const toggleEvidence = (id) => {
    setExpandedEvidence(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const evidenceData = {
    documentary: {
      title: 'Documentary Evidence - Detailed Inventory',
      isAuthentic: true,
      evidenceActCompliant: true,
      items: [
        {
          title: 'Banking Transaction Records',
          text: 'Complete trail of 187 suspicious transfers totaling RM 42.35 million across 5 Malaysian banks, with detailed transaction dates, amounts, and recipient accounts clearly documented.',
          docId: 'BNK-2024-MY-8841',
          status: 'Court-ready',
          isAuthentic: true,
          evidenceActCompliant: true,
          evidenceActSection: 'Section 63 - Primary Evidence',
          verificationMethod: 'Bank-certified copies with official seals',
          verifiedBy: 'Bank Negara Malaysia',
          verificationDate: '15 Nov 2024'
        },
        {
          title: 'Shell Company Documents',
          text: 'Incorporation papers revealing nominee director structures, including SSM registration documents, directorship declarations, and beneficial ownership information for 8 shell companies.',
          docId: 'SSM-2022-15847',
          status: 'Verified',
          isAuthentic: true,
          evidenceActCompliant: true,
          evidenceActSection: 'Section 76 - Public Documents',
          verificationMethod: 'SSM official records verification',
          verifiedBy: 'Suruhanjaya Syarikat Malaysia',
          verificationDate: '22 Nov 2024'
        },
        {
          title: 'Falsified Invoices',
          text: '43 fraudulent invoices used to justify fund transfers, with forensic document analysis confirming backdating, altered amounts, and fabricated vendor information.',
          docId: 'INV-FRAUD-2024',
          status: 'Forensically verified',
          isAuthentic: true,
          evidenceActCompliant: true,
          evidenceActSection: 'Section 45 - Expert Opinion',
          verificationMethod: 'Forensic document examination',
          verifiedBy: 'Department of Chemistry Malaysia',
          verificationDate: '08 Dec 2024'
        },
        {
          title: 'Board Meeting Minutes',
          text: 'Records showing unauthorized transaction approvals, with discrepancies between official minutes and actual board decisions documented through witness statements.',
          docId: 'BRD-MIN-2022-2023',
          status: 'Complete',
          isAuthentic: true,
          evidenceActCompliant: true,
          evidenceActSection: 'Section 63 - Primary Evidence',
          verificationMethod: 'Original document custody chain',
          verifiedBy: 'Company Secretary certification',
          verificationDate: '18 Nov 2024'
        }
      ]
    },
    digital: {
      title: 'Digital Evidence - Detailed Inventory',
      isAuthentic: true,
      evidenceActCompliant: true,
      items: [
        {
          title: 'Email Communications',
          text: '247 emails discussing fund structuring and offshore transfers, recovered from defendant\'s corporate email account and personal Gmail, showing clear intent and coordination with co-conspirators.',
          docId: 'EMAIL-001 through EMAIL-247',
          status: 'Forensically extracted',
          isAuthentic: true,
          evidenceActCompliant: true,
          evidenceActSection: 'Section 90A - Computer Output',
          verificationMethod: 'Digital forensic hash verification (SHA-256)',
          verifiedBy: 'CyberSecurity Malaysia',
          verificationDate: '25 Nov 2024'
        },
        {
          title: 'Encrypted Messages',
          text: 'Decrypted WhatsApp and Telegram conversations revealing criminal intent, including discussions of money laundering techniques and strategies to evade detection.',
          docId: 'ENC-MSG-2024',
          status: 'Decrypted and verified',
          isAuthentic: true,
          evidenceActCompliant: true,
          evidenceActSection: 'Section 90A - Computer Output',
          verificationMethod: 'Court-authorized decryption with chain of custody',
          verifiedBy: 'Royal Malaysia Police Cyber Crime Unit',
          verificationDate: '02 Dec 2024'
        },
        {
          title: 'Server Access Logs',
          text: 'Digital footprint showing unauthorized system access to financial databases, with timestamps correlating to suspicious transaction dates and IP address tracking to defendant\'s devices.',
          docId: 'LOG-SRV-2024',
          status: 'Complete audit trail',
          isAuthentic: true,
          evidenceActCompliant: true,
          evidenceActSection: 'Section 90A - Computer Output',
          verificationMethod: 'Server log authentication with cryptographic signatures',
          verifiedBy: 'IT Security Audit Team',
          verificationDate: '10 Dec 2024'
        },
        {
          title: 'Cryptocurrency Records',
          text: 'Blockchain analysis of Bitcoin and Ethereum transactions totaling approximately USD 3.2 million, traced from company accounts through multiple exchanges to defendant\'s personal wallets.',
          docId: 'CRYPTO-TRC-2024',
          status: 'Blockchain verified',
          isAuthentic: true,
          evidenceActCompliant: true,
          evidenceActSection: 'Section 90A - Computer Output',
          verificationMethod: 'Blockchain immutable record verification',
          verifiedBy: 'Chainalysis Certified Examiner',
          verificationDate: '12 Dec 2024'
        }
      ]
    },
    expert: {
      title: 'Expert Testimony - Detailed Inventory',
      isAuthentic: true,
      evidenceActCompliant: true,
      items: [
        {
          title: 'Forensic Accountant Report',
          text: 'Comprehensive 150-page audit by certified forensic accountant tracing funds through multiple jurisdictions including Malaysia, Singapore, Hong Kong, and British Virgin Islands, with complete money trail reconstruction.',
          docId: 'Dr. Sarah Chen, CPA, CFE',
          status: 'FA-MY-2024-09',
          isAuthentic: true,
          evidenceActCompliant: true,
          evidenceActSection: 'Section 45 - Expert Opinion',
          verificationMethod: 'Expert credentials verified, report peer-reviewed',
          verifiedBy: 'Malaysian Institute of Accountants',
          verificationDate: '20 Nov 2024'
        },
        {
          title: 'Digital Forensics Analysis',
          text: 'Expert analysis of electronic evidence with full chain of custody certification, including hard drive imaging, email recovery, and metadata analysis confirming document creation dates and author attribution.',
          docId: 'Ahmad bin Hassan, CISSP, EnCE',
          status: 'DIG-FOR-2024-12',
          isAuthentic: true,
          evidenceActCompliant: true,
          evidenceActSection: 'Section 45 - Expert Opinion',
          verificationMethod: 'ISO 17025 accredited laboratory procedures',
          verifiedBy: 'Department of Standards Malaysia',
          verificationDate: '28 Nov 2024'
        },
        {
          title: 'Banking Compliance Specialist Opinion',
          text: 'Expert testimony on anti-money laundering violations, detailing how transactions structured to evade reporting requirements violated Bank Negara Malaysia regulations and international AML standards.',
          docId: 'Tan Sri Lim Wei Kang, Former BNM Director',
          status: 'BNK-COMP-2024',
          isAuthentic: true,
          evidenceActCompliant: true,
          evidenceActSection: 'Section 45 - Expert Opinion',
          verificationMethod: 'Expert qualification verification and court acceptance',
          verifiedBy: 'Bank Negara Malaysia',
          verificationDate: '05 Dec 2024'
        },
        {
          title: 'Corporate Law Expert Assessment',
          text: 'Analysis of nominee director arrangements and beneficial ownership structures, explaining how corporate veil should be pierced given fraudulent purpose of shell company establishment.',
          docId: 'Professor Dr. Zainul Abidin, Corporate Law Specialist',
          status: 'CORP-LAW-2024',
          isAuthentic: true,
          evidenceActCompliant: true,
          evidenceActSection: 'Section 45 - Expert Opinion',
          verificationMethod: 'Academic credentials and court expert registry verification',
          verifiedBy: 'Malaysian Bar Council',
          verificationDate: '14 Dec 2024'
        }
      ]
    },
    physical: {
      title: 'Physical Evidence - Detailed Inventory',
      isAuthentic: true,
      evidenceActCompliant: true,
      items: [
        {
          title: 'Company Seals and Stamps',
          text: 'Original company seals from 8 shell companies seized from defendant\'s office, used to authenticate fraudulent documents and banking applications without proper board authorization.',
          docId: 'PHYS-SEAL-001 to 008',
          status: 'Seized and catalogued',
          isAuthentic: true,
          evidenceActCompliant: true,
          evidenceActSection: 'Section 63 - Primary Evidence',
          verificationMethod: 'Physical custody with photographic documentation',
          verifiedBy: 'Royal Malaysia Police Evidence Room',
          verificationDate: '16 Nov 2024'
        },
        {
          title: 'Seized Hard Drives',
          text: '7 external hard drives containing financial records, communications, and encrypted files recovered from defendant\'s home office and corporate premises, totaling 4.2 TB of data.',
          docId: 'HDD-001 through HDD-007',
          status: 'Forensically imaged',
          isAuthentic: true,
          evidenceActCompliant: true,
          evidenceActSection: 'Section 63 & 90A - Primary Evidence & Computer Output',
          verificationMethod: 'Forensic write-block imaging with MD5/SHA-256 hashing',
          verifiedBy: 'CyberSecurity Malaysia Forensic Lab',
          verificationDate: '23 Nov 2024'
        },
        {
          title: 'Handwritten Notes',
          text: 'Defendant\'s personal notebooks detailing transaction structures, account numbers, and amounts to be transferred, with handwriting analysis confirming authenticity and matching known samples.',
          docId: 'NOTE-2024-001 to 003',
          status: 'Handwriting verified',
          isAuthentic: true,
          evidenceActCompliant: true,
          evidenceActSection: 'Section 45 & 47 - Expert Opinion & Handwriting',
          verificationMethod: 'Forensic handwriting analysis',
          verifiedBy: 'Department of Chemistry Malaysia',
          verificationDate: '30 Nov 2024'
        },
        {
          title: 'Original Bank Documents',
          text: 'Account opening forms with forged signatures, including applications for offshore accounts in Singapore and Hong Kong, with forensic document examination confirming signature forgery.',
          docId: 'BANK-DOC-2024',
          status: 'Forensic analysis complete',
          isAuthentic: true,
          evidenceActCompliant: true,
          evidenceActSection: 'Section 45 & 67 - Expert Opinion & Signature Verification',
          verificationMethod: 'Comparative signature analysis and ink dating',
          verifiedBy: 'Department of Chemistry Malaysia',
          verificationDate: '07 Dec 2024'
        }
      ]
    }
  };

  const renderModalContent = (type) => {
    const data = evidenceData[type];
    if (!data) return null;

    return (
      <div className="cae-evidence-modal-content">
        {data.items.map((item, index) => (
          <div key={index} className="cae-evidence-modal-item">
            <div className="cae-evidence-modal-item-header">
              <h4 className="cae-evidence-modal-item-title">{item.title}</h4>
              <div className="cae-evidence-verification-badges">
                <div className={`cae-verification-badge ${item.isAuthentic ? 'cae-verified' : 'cae-unverified'}`}>
                  {item.isAuthentic ? (
                    <ShieldCheck size={14} strokeWidth={2.5} />
                  ) : (
                    <AlertCircle size={14} strokeWidth={2.5} />
                  )}
                  <span>{item.isAuthentic ? 'Authentic' : 'Unverified'}</span>
                </div>
                <div className={`cae-verification-badge ${item.evidenceActCompliant ? 'cae-compliant' : 'cae-non-compliant'}`}>
                  {item.evidenceActCompliant ? (
                    <Scale size={14} strokeWidth={2.5} />
                  ) : (
                    <AlertCircle size={14} strokeWidth={2.5} />
                  )}
                  <span>{item.evidenceActCompliant ? 'Act Compliant' : 'Non-Compliant'}</span>
                </div>
              </div>
            </div>
            <p className="cae-evidence-modal-item-text">{item.text}</p>
            
            <div className="cae-evidence-verification-details">
              <div className="cae-verification-detail-row">
                <div className="cae-verification-detail-item">
                  <Scale size={16} strokeWidth={2} />
                  <div>
                    <span className="cae-verification-label">Evidence Act 1950</span>
                    <span className="cae-verification-value">{item.evidenceActSection}</span>
                  </div>
                </div>
              </div>
              <div className="cae-verification-detail-row">
                <div className="cae-verification-detail-item">
                  <CheckCircle2 size={16} strokeWidth={2} />
                  <div>
                    <span className="cae-verification-label">Verification Method</span>
                    <span className="cae-verification-value">{item.verificationMethod}</span>
                  </div>
                </div>
              </div>
              <div className="cae-verification-detail-row-split">
                <div className="cae-verification-detail-item">
                  <ShieldCheck size={16} strokeWidth={2} />
                  <div>
                    <span className="cae-verification-label">Verified By</span>
                    <span className="cae-verification-value">{item.verifiedBy}</span>
                  </div>
                </div>
                <div className="cae-verification-detail-item">
                  <CheckCircle2 size={16} strokeWidth={2} />
                  <div>
                    <span className="cae-verification-label">Verification Date</span>
                    <span className="cae-verification-value">{item.verificationDate}</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="cae-evidence-modal-item-meta">
              <span><strong>{type === 'expert' ? 'Expert:' : 'Document ID:'}</strong> {item.docId}</span>
              <span><strong>{type === 'expert' ? 'Report ID:' : 'Status:'}</strong> {item.status}</span>
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <>
      <section className="cae-evidence-section">
        <h2 className="cae-section-title">Evidence Summary</h2>

        <div className="cae-evidence-grid">
          <div className="cae-evidence-card">
            <div className="cae-evidence-card-header">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M14 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V8L14 2Z" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M14 2V8H20" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M16 13H8" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M16 17H8" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M10 9H8" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <div className="cae-evidence-card-header-content">
                <h3 className="cae-evidence-card-title">
                  <span className="cae-evidence-link" onClick={() => toggleEvidence('documentary')}>
                    Documentary Evidence
                  </span>
                </h3>
              </div>
            </div>
            <p className="cae-evidence-card-description">
              Complete banking transaction records, shell company documents, falsified invoices, and board meeting minutes showing unauthorized approvals.
            </p>
          </div>

          <div className="cae-evidence-card">
            <div className="cae-evidence-card-header">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="2" y="3" width="20" height="14" rx="2" stroke="#FFFFFF" strokeWidth="2"/>
                <path d="M8 21H16" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round"/>
                <path d="M12 17V21" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round"/>
                <path d="M7 7L10 10L7 13" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M12 13H17" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round"/>
              </svg>
              <div className="cae-evidence-card-header-content">
                <h3 className="cae-evidence-card-title">
                  <span className="cae-evidence-link" onClick={() => toggleEvidence('digital')}>
                    Digital Evidence
                  </span>
                </h3>
              </div>
            </div>
            <p className="cae-evidence-card-description">
              Email communications discussing fund structuring, encrypted messages, server access logs, and cryptocurrency transaction records with blockchain analysis.
            </p>
          </div>

          <div className="cae-evidence-card">
            <div className="cae-evidence-card-header">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M17 21V19C17 17.9391 16.5786 16.9217 15.8284 16.1716C15.0783 15.4214 14.0609 15 13 15H5C3.93913 15 2.92172 15.4214 2.17157 16.1716C1.42143 16.9217 1 17.9391 1 19V21" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <circle cx="9" cy="7" r="4" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M23 21V19C22.9993 18.1137 22.7044 17.2528 22.1614 16.5523C21.6184 15.8519 20.8581 15.3516 20 15.13" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M16 3.13C16.8604 3.35031 17.623 3.85071 18.1676 4.55232C18.7122 5.25392 19.0078 6.11683 19.0078 7.005C19.0078 7.89318 18.7122 8.75608 18.1676 9.45769C17.623 10.1593 16.8604 10.6597 16 10.88" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <div className="cae-evidence-card-header-content">
                <h3 className="cae-evidence-card-title">
                  <span className="cae-evidence-link" onClick={() => toggleEvidence('expert')}>
                    Expert Testimony
                  </span>
                </h3>
              </div>
            </div>
            <p className="cae-evidence-card-description">
              Forensic accountant reports, digital forensics analysis, banking compliance specialist opinions, and corporate law expert assessments of nominee arrangements.
            </p>
          </div>

          <div className="cae-evidence-card">
            <div className="cae-evidence-card-header">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M21 16V8C20.9996 7.64927 20.9071 7.30481 20.7315 7.00116C20.556 6.69751 20.3037 6.44536 20 6.27L13 2.27C12.696 2.09446 12.3511 2.00205 12 2.00205C11.6489 2.00205 11.304 2.09446 11 2.27L4 6.27C3.69626 6.44536 3.44398 6.69751 3.26846 7.00116C3.09294 7.30481 3.00036 7.64927 3 8V16C3.00036 16.3507 3.09294 16.6952 3.26846 16.9988C3.44398 17.3025 3.69626 17.5546 4 17.73L11 21.73C11.304 21.9055 11.6489 21.9979 12 21.9979C12.3511 21.9979 12.696 21.9055 13 21.73L20 17.73C20.3037 17.5546 20.556 17.3025 20.7315 16.9988C20.9071 16.6952 20.9996 16.3507 21 16Z" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M3.27 6.96L12 12.01L20.73 6.96" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M12 22.08V12" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <div className="cae-evidence-card-header-content">
                <h3 className="cae-evidence-card-title">
                  <span className="cae-evidence-link" onClick={() => toggleEvidence('physical')}>
                    Physical Evidence
                  </span>
                </h3>
              </div>
            </div>
            <p className="cae-evidence-card-description">
              Company seals and stamps, seized hard drives with financial records, handwritten transaction notes, and original bank documents with forged signatures.
            </p>
          </div>
        </div>
      </section>

      {/* Evidence Modal */}
      <AnimatePresence>
        {(expandedEvidence.documentary || expandedEvidence.digital || expandedEvidence.expert || expandedEvidence.physical) && (
          <>
            <motion.div 
              className="cae-evidence-modal-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setExpandedEvidence({ documentary: false, digital: false, expert: false, physical: false })}
            />
            <motion.div 
              className="cae-evidence-modal"
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ duration: 0.3 }}
            >
              <div className="cae-evidence-modal-header">
                <h3 className="cae-evidence-modal-title">
                  {expandedEvidence.documentary && evidenceData.documentary.title}
                  {expandedEvidence.digital && evidenceData.digital.title}
                  {expandedEvidence.expert && evidenceData.expert.title}
                  {expandedEvidence.physical && evidenceData.physical.title}
                </h3>
                <button 
                  className="cae-evidence-modal-close"
                  onClick={() => setExpandedEvidence({ documentary: false, digital: false, expert: false, physical: false })}
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M18 6L6 18" stroke="#111827" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M6 6L18 18" stroke="#111827" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
              </div>
              <div className="cae-evidence-modal-body">
                {expandedEvidence.documentary && renderModalContent('documentary')}
                {expandedEvidence.digital && renderModalContent('digital')}
                {expandedEvidence.expert && renderModalContent('expert')}
                {expandedEvidence.physical && renderModalContent('physical')}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default EvidenceSummary;