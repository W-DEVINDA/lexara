import { motion } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './CaseSummary.css';

function CaseSummary() {
  const [showHeader, setShowHeader] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [scrollTimeout, setScrollTimeout] = useState(null);
  const containerRef = useRef(null);
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [selectedEvidence, setSelectedEvidence] = useState(null);
  const [isNavigating, setIsNavigating] = useState(false);
  const [isLoadingProgress, setIsLoadingProgress] = useState(true);
  const [precedentIndex, setPrecedentIndex] = useState(0);

  const handlePrecedentNext = () => {
    if (precedentIndex < 2) {
      setPrecedentIndex(precedentIndex + 1);
    }
  };

  const handlePrecedentPrev = () => {
    if (precedentIndex > 0) {
      setPrecedentIndex(precedentIndex - 1);
    }
  };

  const [casesIndex, setCasesIndex] = useState(0);

  const handleCasesNext = () => {
    if (casesIndex < 2) {
      setCasesIndex(casesIndex + 1);
    }
  };

  const handleCasesPrev = () => {
    if (casesIndex > 0) {
      setCasesIndex(casesIndex - 1);
    }
  };

  const handleEvidenceClick = (e, evidenceTitle, evidenceDetails) => {
    e.preventDefault();
    setSelectedEvidence({ title: evidenceTitle, details: evidenceDetails });
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedEvidence(null);
  };
const CourtProgressSkeleton = () => (
  <div className="cs-court-progress-skeleton">
    <div className="cs-skeleton-card">
      <div className="cs-skeleton cs-skeleton-title"></div>
      
      <div className="cs-skeleton-section">
        <div className="cs-skeleton cs-skeleton-heading"></div>
        <div className="cs-skeleton cs-skeleton-line"></div>
        <div className="cs-skeleton cs-skeleton-line"></div>
        <div className="cs-skeleton cs-skeleton-line"></div>
        <div className="cs-skeleton cs-skeleton-line cs-skeleton-line-short"></div>
      </div>

      <div className="cs-skeleton-event">
        <div className="cs-skeleton cs-skeleton-bullet"></div>
        <div className="cs-skeleton-event-text">
          <div className="cs-skeleton cs-skeleton-event-heading"></div>
          <div className="cs-skeleton cs-skeleton-event-date"></div>
        </div>
      </div>
    </div>

    <div className="cs-skeleton-cards-grid">
      {[1, 2, 3].map((i) => (
        <div key={i} className="cs-skeleton-info-card">
          <div className="cs-skeleton cs-skeleton-card-header"></div>
          <div className="cs-skeleton-card-content">
            <div className="cs-skeleton cs-skeleton-text-line"></div>
            <div className="cs-skeleton cs-skeleton-text-line"></div>
            <div className="cs-skeleton cs-skeleton-text-line"></div>
            <div className="cs-skeleton cs-skeleton-text-line cs-skeleton-text-short"></div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

useEffect(() => {

  const timer = setTimeout(() => {
    setIsLoadingProgress(false);
  }, 1500);

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
      className="cs-case-summary-page"
      initial={{ opacity: 0 }}
      animate={{ opacity: isNavigating ? 0 : 1 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
    >
      {/* Header Section */}
      <header className={`cs-header-case-analysis ${!showHeader ? 'cs-header-hidden' : ''}`}>
        <div className="cs-top-panel">
         <div className="cs-logo-section" onClick={() => {
  setIsNavigating(true);
  setTimeout(() => {
    navigate('/', { state: { smoothTransition: true } });
  }, 250);
}}>
            <div className="cs-logo-box">
              <span className="cs-logo-letter">L</span>
            </div>
            <div className="cs-logo-text">
              <div className="cs-brand-name">
                <span className="cs-gruppo">LE</span>
                <span className="cs-gruppo">GAL</span>
                <span className="cs-bruno">x</span>
              </div>
              <div className="cs-tagline">Legal Research</div>
            </div>
          </div>

          <div className="cs-page-title-section">
            <h1 className="cs-page-title">Case Summary</h1>
            <p className="cs-page-subtitle">Overview of your case in detail</p>
          </div>

          <div className="cs-user-section">
            <div className="cs-user-info">
              <div className="cs-user-name">USER NAME</div>
              <div className="cs-user-plan">Basic plan</div>
            </div>
            <div className="cs-user-avatar">
              <span className="cs-avatar-letter">A</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="cs-main-content">
        {/* Current Court Progress Section */}
      {/* Current Court Progress Section */}
<section className="cs-section cs-court-progress">
  <div className="cs-section-header">
    <svg className="cs-expand-icon" width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path d="M9 18L15 12L9 6" stroke="#FFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
    <h2 className="cs-section-title">Current Court Progress</h2>
  </div>

  {isLoadingProgress ? (
    <CourtProgressSkeleton />
  ) : (
    <>
      <div className="cs-white-card">
        <h3 className="cs-stage-title">Current Stage: Pre-trial Proceedings</h3>
        
        <div className="cs-progress-content">
          <h4 className="cs-content-heading">What is happening now?</h4>
          <p className="cs-content-text">
            The case is currently in the pre-trial proceedings stage before the High Court of Kuala Lumpur. The prosecution has completed the filing of charges under the Anti-Money Laundering, Anti-Terrorism Financing and Proceeds of Unlawful Activities Act (AMLA) 2001, along with secondary charges of corporate fraud and criminal breach of trust. The defendant, represented by Messrs. Shafee & Partners, has entered a plea of not guilty to all charges. Asset freezing orders have been successfully executed, securing RM 31.2 million of the alleged RM 42.35 million involved in the transactions. Both parties are currently engaged in discovery proceedings, with the prosecution preparing to present forensic accounting evidence and banking records documenting 187 suspicious transactions across multiple jurisdictions. The defense is expected to challenge the sufficiency of evidence linking the defendant directly to the alleged money laundering scheme.
          </p>
        </div>

        <div className="cs-next-event">
          <span className="cs-event-bullet"></span>
          <div>
            <h4 className="cs-content-heading">Next Scheduled Event</h4>
            <p className="cs-event-date">Case Management Conference - 25 Mar 2026, 10:00 AM</p>
          </div>
        </div>
      </div>

      {/* Three Info Cards */}
      <div className="cs-info-cards-grid">
        <div className="cs-info-card">
          <div className="cs-card-header">
            <h3 className="cs-card-title">Basic Case Information</h3>
          </div>
          <div className="cs-card-body">
            <p><strong>Case Name: </strong>Public Prosecutor v. Dato' Richard Lim Kah Weng</p>
            <p><strong>Case Number: </strong>WA-44-1124-2024</p>
            <p><strong>Filed Date: </strong>8 November 2024</p>
            <p><strong>Court: </strong>High Court of Kuala Lumpur</p>
            <p><strong>Judge: </strong>Yang Arif Dato' Mohd Nazlan Mohd Ghazali</p>
            <p><strong>Priority: </strong>High Priority (Financial Crime)</p>
            <p><strong>Case Status: </strong>Pre-trial proceedings</p>
          </div>
        </div>

        <div className="cs-info-card">
          <div className="cs-card-header">
            <h3 className="cs-card-title">Case Parties</h3>
          </div>
          <div className="cs-card-body">
            <p><strong>Prosecution: </strong>Attorney General's Chambers</p>
            <p><strong>Division: </strong>Financial Crime Division</p>
            <p><strong>Lead Prosecutor: </strong>Senior Federal Counsel</p>
            
            <h4 className="cs-defendant-title">Defendant</h4>
            <p><strong>Primary Defendant: </strong>Dato' Richard Lim Kah Weng</p>
            <p><strong>Co-Defendants: </strong>3 Corporate Entities, 2 Individual Accomplices</p>
            <p><strong>Legal Representative: </strong>Messrs. Shafee & Partners</p>
            <p><strong>Defense Counsel: </strong>Senior Counsel Muhammad Shafee Abdullah</p>
          </div>
        </div>

        <div className="cs-info-card">
          <div className="cs-card-header">
            <h3 className="cs-card-title">Case Timeline & Events</h3>
          </div>
          <div className="cs-card-body">
            <p><strong>Investigation Period: </strong>January 2022 - June 2023 (18 months)</p>
            <p><strong>Charges Filed: </strong>8 November 2024</p>
            <p><strong>First Appearance: </strong>15 November 2024</p>
            <p><strong>Asset Freeze Order: </strong>Executed 20 November 2024</p>
            <p><strong>Plea Entered: </strong>Not Guilty - 22 November 2024</p>
            <p><strong>Upcoming Dates: </strong>Case Management Conference (25 Feb 2025)</p>
            <p><strong>Trial Scheduled: </strong>To be determined at CMC</p>
          </div>
        </div>
      </div>
    </>
  )}
</section>

        {/* Key Facts Section */}
        <section className="cs-section cs-key-facts">
          <h2 className="cs-section-title">Key Facts of the Case</h2>
          <div className="cs-white-card">
            <div className="cs-fact-item">
              <h4 className="cs-fact-heading">Case Background</h4>
              <p className="cs-fact-text">
                This case involves a complex money laundering and corporate fraud scheme orchestrated between January 2022 and June 2023. Dato' Richard Lim Kah Weng allegedly masterminded a systematic operation to siphon RM 42.35 million from a publicly-listed company through an intricate network of shell corporations. The scheme involved 187 suspicious transfers across multiple jurisdictions including Malaysia, Singapore, Hong Kong, and the British Virgin Islands. The funds were routed through layered transactions specifically designed to obscure their origin and ultimate destination. The investigation was conducted by the Financial Crime Division of the Attorney General's Chambers in coordination with international law enforcement agencies and financial intelligence units.
              </p>
            </div>

            <div className="cs-fact-item">
              <h4 className="cs-fact-heading">Prosecution's Case</h4>
              <p className="cs-fact-text">
                The prosecution alleges that the defendant systematically violated the Anti-Money Laundering, Anti-Terrorism Financing and Proceeds of Unlawful Activities Act (AMLA) 2001 through a deliberate scheme to launder proceeds of corporate fraud. The case is supported by comprehensive forensic accounting analysis that establishes a clear paper trail from source accounts at the publicly-listed company to destination accounts controlled by the defendant and co-conspirators. Banking records document 187 transactions flowing through shell corporations in multiple jurisdictions. Email communications and digital evidence allegedly show the defendant's direct involvement in orchestrating the transfers and directing the creation of corporate vehicles used to conceal the funds. The prosecution has secured RM 31.2 million through asset freezing orders, representing a 62% recovery rate. Expert witnesses will testify to the sophisticated layering techniques employed to disguise the illicit origin of the funds.
              </p>
            </div>

            <div className="cs-fact-item">
              <h4 className="cs-fact-heading">Defense Position</h4>
              <p className="cs-fact-text">
                The defense, led by prominent counsel Messrs. Shafee & Partners, has entered a plea of not guilty to all charges. While specific defense strategies have not been fully disclosed during pre-trial proceedings, the defense is expected to challenge the prosecution's evidence on several fronts. Anticipated defense arguments include questioning the sufficiency of evidence directly linking the defendant to the alleged money laundering activities, challenging the chain of custody and authenticity of digital evidence, asserting legitimate business purposes for the corporate transactions, and potentially arguing lack of knowledge or criminal intent regarding any improper transfers. The defense may also challenge the multi-jurisdictional evidence gathering process and seek to exclude certain evidence on procedural grounds. The defense's 49% weakness rating in the case analysis suggests limited counter-evidence available to refute the prosecution's comprehensive documentary trail.
              </p>
            </div>
          </div>
        </section>

        {/* Case Evidence Section */}
        <section className="cs-section cs-evidence">
          <h2 className="cs-section-title">Case Evidence</h2>
          <div className="cs-white-card">
            <ul className="cs-evidence-list">
              <li><a href="#" onClick={(e) => handleEvidenceClick(e, 'Banking Records and Transaction Documentation', `Evidence Reference: BR-2022-2023-COMPLETE

Period Covered: 1 January 2022 - 30 June 2023
Total Transactions Documented: 187 suspicious transfers
Total Amount Involved: RM 42,350,000
Jurisdictions: Malaysia, Singapore, Hong Kong, British Virgin Islands

Comprehensive Banking Documentation:

The prosecution has compiled exhaustive banking records from multiple financial institutions across four jurisdictions, documenting every stage of the alleged money laundering operation. These records form the backbone of the prosecution's case and establish a clear audit trail from source to destination.

Source Account Analysis:
- Primary Source: Corporate accounts at publicly-listed company (Malaysian banks)
- Initial withdrawal patterns: Multiple transfers ranging from RM 50,000 to RM 2,500,000
- Frequency: 2-3 transfers per week during peak periods (March-May 2022)
- Authorization records showing defendant's signature on key transfer instructions
- Unusual transaction patterns flagged by bank compliance systems

Intermediary Accounts (Shell Corporations):
The funds moved through a sophisticated network of shell company accounts:

First Layer (Malaysian Entities):
- Meridian Holdings Sdn Bhd - 47 transactions (RM 12.8 million)
- Pacific Trade Solutions Sdn Bhd - 39 transactions (RM 9.3 million)
- Goldcrest Investments Sdn Bhd - 28 transactions (RM 7.1 million)

Second Layer (Singapore Entities):
- Horizon Capital Pte Ltd - 31 transactions (RM 8.4 million)
- Apex Trading Group Pte Ltd - 22 transactions (RM 4.9 million)

Third Layer (Hong Kong & BVI):
- Dragon Phoenix Limited (HK) - 12 transactions (RM 5.2 million)
- Global Ventures Corp (BVI) - 8 final destination transfers (RM 4.65 million)

Transaction Pattern Analysis:
Forensic banking analysis reveals systematic layering techniques:
- Rapid movement of funds (typically 24-72 hours between layers)
- Consistent fractioning of amounts to avoid reporting thresholds
- Use of multiple currencies (MYR, SGD, USD, HKD) to complicate tracing
- Weekend and holiday timing to exploit gaps in monitoring systems
- Structured deposits just below regulatory reporting requirements

Final Destination Accounts:
- Personal accounts traced to defendant and family members: RM 8.9 million
- Luxury property purchases (Singapore, London): RM 12.3 million
- High-value asset acquisitions: RM 6.5 million
- Offshore investment vehicles: RM 3.5 million
- Frozen/untraced funds: RM 11.15 million

Supporting Documentation:
- SWIFT messages and wire transfer confirmations
- Bank compliance reports and suspicious activity reports (SARs)
- Account opening documents showing beneficial ownership
- Signature verification records
- Video evidence from ATM/branch transactions where available
- Digital banking access logs and IP address tracking

International Cooperation Evidence:
- Mutual Legal Assistance Treaty (MLAT) requests and responses
- Financial Intelligence Unit reports from Singapore, Hong Kong
- Interpol financial crime alerts and coordination records
- Banking regulator cooperation documents

This comprehensive banking evidence establishes the movement of funds through multiple layers of transactions specifically designed to obscure their illicit origin, demonstrating the systematic nature of the alleged money laundering operation and the defendant's central role in orchestrating these transfers.`)}>+ Banking Records and Transaction Documentation (187 Transactions)</a></li>
              
              <li><a href="#" onClick={(e) => handleEvidenceClick(e, 'Forensic Accounting Analysis Report', `Evidence Reference: FAR-2024-PROSECUTION

Expert Witness: Dr. Lim Siew Ling, CPA, CFE
Firm: Ernst & Young Forensic & Integrity Services
Report Date: 15 September 2024
Pages: 347 pages with 89 exhibits

Executive Summary of Forensic Analysis:

This comprehensive forensic accounting report was commissioned by the Attorney General's Chambers to trace the flow of funds and establish the money laundering methodology employed in this case. The analysis was conducted by Dr. Lim Siew Ling, a certified forensic accountant with 23 years of experience in financial crime investigation and money laundering cases.

Methodology:
The forensic investigation employed industry-standard techniques including:
- Transaction flow analysis across multiple jurisdictions
- Link analysis to identify relationships between entities and individuals
- Timeline reconstruction of fund movements
- Beneficial ownership tracing through corporate structures
- Pattern recognition analysis using specialized software
- Currency conversion and reconciliation across jurisdictions
- Asset tracing to identify final destinations of laundered funds

Key Findings:

1. SOURCE OF FUNDS ANALYSIS
The report conclusively traces RM 42.35 million to fraudulent extraction from the publicly-listed company through:
- Fictitious vendor payments: RM 18.7 million
- Inflated contract amounts: RM 12.4 million
- Unauthorized management fees: RM 8.2 million
- Fraudulent consulting agreements: RM 3.05 million

Each transaction was authorized using the defendant's executive authority and signing privileges within the company.

2. LAYERING SCHEME ANALYSIS
The report identifies a sophisticated three-tier layering structure:

Tier 1 - Domestic Transfers (Malaysia):
- Funds transferred to 3 Malaysian shell companies
- All companies incorporated within 6 months of scheme commencement
- Common beneficial ownership traced to defendant's associates
- Minimal legitimate business activity documented
- Rapid transfer of funds (average holding period: 3.2 days)

Tier 2 - Regional Distribution (Singapore):
- Secondary transfers to Singapore entities
- Use of trade finance instruments to justify transfers
- Fictitious invoices and purchase orders created
- Currency conversions to complicate tracing
- Average holding period: 5.7 days before onward transfer

Tier 3 - Offshore Placement (Hong Kong/BVI):
- Final layer using offshore entities with nominee directors
- Integration into seemingly legitimate investment structures
- Purchase of high-value assets in third-party names
- Use of bearer shares and trust arrangements
- Substantial funds remain frozen in these accounts

3. CORPORATE STRUCTURE ANALYSIS
The report documents the creation and control of shell entities:
- 8 companies incorporated specifically for this scheme
- Timeline showing incorporation within 2-6 months of first transfers
- Common corporate service providers across jurisdictions
- Defendant identified as ultimate beneficial owner through:
  * Signature analysis on incorporation documents
  * Power of attorney grants
  * Email communications directing company formations
  * Payment of incorporation fees from defendant-controlled accounts

4. FINANCIAL RED FLAGS IDENTIFIED
The analysis highlights 47 distinct red flags indicating money laundering:
- Transactions inconsistent with legitimate business purpose
- Rapid movement of funds without economic rationale
- Use of multiple jurisdictions without business justification
- Structured transactions to avoid reporting requirements
- Commingling of funds from multiple sources
- Lack of supporting documentation for purported business activities
- Unusual patterns of cash withdrawals following electronic transfers

5. ASSET TRACING RESULTS
Final destination analysis of the RM 42.35 million:
- Luxury properties (Singapore, London, Kuala Lumpur): RM 18.7 million
- High-end vehicles and collectibles: RM 3.4 million
- Offshore investment accounts: RM 8.9 million
- Personal bank accounts (frozen): RM 6.8 million
- Cash withdrawals (untraced): RM 2.3 million
- Currently frozen under court orders: RM 31.2 million
- Remainder: dissipated or under investigation

6. COMPARATIVE ANALYSIS
The report includes comparative analysis with known money laundering typologies:
- Scheme exhibits 23 of 25 common money laundering indicators
- Sophistication level rated as "Advanced" on FATF scale
- Use of professional facilitators and corporate service providers
- International dimension indicating pre-planned layering strategy

Expert Opinion:
Dr. Lim concludes with high degree of certainty (95%+ confidence level) that:
- The transactions represent deliberate money laundering activity
- The layering was specifically designed to obscure fund origins
- The defendant exercised control over the entire scheme
- The corporate structures served no legitimate business purpose
- The fund movements are inconsistent with any lawful explanation

Supporting Documentation Appendices:
- Appendix A: Transaction flow diagrams (visual representation)
- Appendix B: Corporate ownership charts
- Appendix C: Timeline of key events
- Appendix D: Currency conversion schedules
- Appendix E: Bank statement excerpts (redacted)
- Appendix F: Expert's CV and qualifications
- Appendix G: Methodology and standards applied
- Appendix H: Summary of interviews conducted

This forensic accounting report provides the technical foundation for the prosecution's case, translating complex financial transactions into clear evidence of systematic money laundering and establishing the defendant's central role in orchestrating the scheme.`)}>+ Forensic Accounting Analysis Report (347 pages)</a></li>
              
              <li><a href="#" onClick={(e) => handleEvidenceClick(e, 'Email Communications and Digital Evidence', `Evidence Reference: DIG-EVID-2024-001

Collection Period: January 2022 - June 2023
Total Items Seized: 12,847 emails, 3,219 documents, 847 instant messages
Relevant Items Identified: 389 evidentiary emails, 127 key documents
Forensic Analysis: Completed by Malaysian Cyber Security Agency
Chain of Custody: Maintained per Evidence Act 1950 requirements

Digital Evidence Summary:

The prosecution has obtained extensive digital evidence through lawful search warrants executed at the defendant's office, residence, and through cooperation with email service providers and cloud storage platforms. All digital evidence has been forensically preserved and analyzed by certified digital forensic experts to ensure admissibility and reliability.

1. EMAIL CORRESPONDENCE CATEGORIES

A. Corporate Transaction Instructions (94 emails)
Direct emails from defendant's corporate account (rlim@[company].com) to finance personnel, containing explicit instructions for fund transfers:

Sample Email Extract 1 (12 March 2022):
From: Richard Lim
To: Finance Department
Subject: Urgent - Vendor Payment Processing
"Process immediate payment of RM 2.3M to Meridian Holdings for consulting services. Use account details I sent separately. This is time-sensitive for the Singapore project. Ensure transfer completed by COB today."

Sample Email Extract 2 (8 May 2022):
From: Richard Lim
To: CFO
Subject: Management Fees - Pacific Trade
"Approve the RM 1.8M management fee to Pacific Trade Solutions as discussed. These are legitimate operational expenses for our regional expansion. I've already secured board approval verbally."

Analysis Note: Forensic examination reveals these purported "vendors" had no prior relationship with the company and provided no actual services.

B. Shell Company Coordination (73 emails)
Communications with corporate service providers regarding shell entity setup:

Sample Email Extract 3 (15 January 2022):
From: Richard Lim (personal email)
To: Singapore Corporate Services
Subject: New Company Setup - Urgent
"Need to establish 2 new Singapore entities ASAP. Require nominee directors as discussed. I'll handle beneficial ownership documentation separately. Privacy is essential for competitive reasons."

Sample Email Extract 4 (22 January 2022):
From: Richard Lim
To: Hong Kong Formation Agent
Subject: BVI Company Requirements
"Proceeding with BVI company formation. Use bearer shares structure. I'll transfer incorporation fees from my personal account. Keep all correspondence confidential."

C. Transfer Coordination with Associates (51 emails)
Direct communications with co-defendants regarding fund movements:

Sample Email Extract 5 (3 April 2022):
From: Richard Lim
To: [Co-Defendant 1]
Subject: Funds Received?
"Confirm you received the transfer to Apex Trading. Next step is moving to the HK account within 48 hours as planned. Delete this email after reading."

Sample Email Extract 6 (17 May 2022):
From: Richard Lim
To: [Co-Defendant 2]
Subject: (No Subject)
"The money is in Horizon Capital now. Break it into smaller amounts before the next transfer. Use the schedule we discussed. Don't put anything in writing about this."

D. Asset Acquisition Communications (41 emails)
Emails regarding purchase of luxury assets using laundered funds:

Sample Email Extract 7 (8 June 2022):
From: Richard Lim
To: Singapore Property Agent
Subject: Orchard Road Property
"Proceeding with the SGD 8.5M purchase. Funds will come from Horizon Capital Pte Ltd. Use that company name for all documentation, not my personal name."

2. INSTANT MESSAGING EVIDENCE (WhatsApp, Telegram)

The investigation recovered encrypted messaging communications through device seizures and cloud backups:

Message Thread 1 (15 March 2022 - WhatsApp):
Defendant: "First batch cleared. 2.3M moved smoothly."
Co-Defendant 1: "Confirmed received in Singapore account."
Defendant: "Good. Wait 3 days then move to next layer."

Message Thread 2 (2 May 2022 - Telegram):
Defendant: "We need to accelerate. Audit coming in July."
Co-Defendant 2: "How much more to move?"
Defendant: "Another 8M at minimum. Then we pause operations."

3. DOCUMENT METADATA ANALYSIS

Forensic examination of document metadata reveals:
- Invoice documents created AFTER purported service dates
- Multiple invoices created in batch on single dates using templates
- Documents created on defendant's personal computer
- Original file names revealing true nature (e.g., "fake_invoice_template.docx")
- GPS data from photos showing defendant at locations coordinating transfers

4. CLOUD STORAGE EVIDENCE

Seized from defendant's personal Dropbox and Google Drive accounts:
- Spreadsheets tracking all 187 transactions with notes
- Corporate formation documents for shell companies
- Scanned copies of bank statements from offshore accounts
- Photographs of luxury purchases made with laundered funds
- PDF files containing instructions to corporate service providers

Key Spreadsheet Extract (Transaction_Tracker.xlsx):
Columns: Date | Source | Amount | Shell Co | Destination | Status | Notes
Row example: "15-Mar-22 | Main Account | 2.3M | Meridian | Singapore Acct | Complete | RL approved"

5. DIGITAL FORENSICS FINDINGS

Technical analysis by certified forensic experts established:
- No evidence of account compromise or unauthorized access
- All transactions originated from devices owned/controlled by defendant
- IP addresses trace to defendant's office and residence
- Login timestamps correspond to defendant's known whereabouts
- Deleted emails recovered through forensic techniques
- Digital signatures authenticate defendant as sender

6. AUTHENTICATION AND ADMISSIBILITY

All digital evidence has been:
- Forensically imaged using write-blocking technology
- Hash values calculated and verified to ensure integrity
- Chain of custody documented from seizure to presentation
- Analyzed by certified digital forensic examiners
- Prepared for presentation in compliance with Evidence Act 1950 Section 90A (Computer Evidence)

Expert Witness:
- Name: En. Ahmad Zaki bin Hassan
- Credentials: Certified Information Systems Security Professional (CISSP), EnCE
- Agency: Malaysian Cyber Security Agency
- Role: Will testify to authenticity, methodology, and findings

7. DAMAGING ADMISSIONS

Several emails contain admissions highly damaging to the defense:
- Explicit instructions to "keep transactions confidential"
- References to "moving money quickly before anyone notices"
- Instructions to delete communications
- Acknowledgment of using shell companies to hide ownership
- Discussion of timing to "avoid audit detection"

This comprehensive digital evidence establishes the defendant's direct knowledge, active participation, and controlling role in the money laundering scheme. The communications demonstrate deliberate concealment efforts and conscious awareness of the illicit nature of the transactions.`)}>+ Email Communications and Digital Evidence (12,847 items)</a></li>
              
              <li><a href="#" onClick={(e) => handleEvidenceClick(e, 'Corporate Documents and Shell Company Records', `Evidence Reference: CORP-DOC-2024-ML

Documents Collected: 1,247 corporate formation and governance documents
Jurisdictions: Malaysia, Singapore, Hong Kong, British Virgin Islands
Analysis Period: 2021-2023 (including pre-scheme incorporation)
Source: Companies Commission of Malaysia, ACRA Singapore, Companies Registry HK, BVI FSC

Corporate Structure Evidence:

This evidence category encompasses all corporate documentation related to the eight shell companies allegedly created and controlled by the defendant to facilitate the money laundering operation. The documentation establishes beneficial ownership, control mechanisms, and the deliberate creation of these entities for the specific purpose of obscuring fund origins.

MALAYSIAN ENTITIES:

1. MERIDIAN HOLDINGS SDN BHD
Company Registration: 202201234567-K
Date of Incorporation: 18 January 2022
Registered Address: Serviced office, Kuala Lumpur
Paid-up Capital: RM 100,000
Directors: 2 nominee directors (local residents)
Shareholders: Nominee shareholders holding shares in trust

Key Evidence:
- Incorporation documents show defendant paid all formation fees
- Bank account opening forms signed by defendant as "authorized representative"
- Power of Attorney granting defendant complete control over company affairs
- Corporate bank account linked to defendant's personal email for notifications
- No evidence of any legitimate business operations
- Only activity: receiving and transferring funds (47 transactions, RM 12.8M)
- Office address is serviced office with no physical presence
- Nominee directors admit in statements they never exercised any actual control
- Email evidence shows defendant directed all company activities

2. PACIFIC TRADE SOLUTIONS SDN BHD
Company Registration: 202202345678-K
Date of Incorporation: 3 February 2022
Similar structure and indicators as Meridian Holdings
Transaction volume: 39 transfers totaling RM 9.3M

3. GOLDCREST INVESTMENTS SDN BHD
Company Registration: 202203456789-K
Date of Incorporation: 15 March 2022
Transaction volume: 28 transfers totaling RM 7.1M

Common Patterns Across Malaysian Entities:
- All incorporated within 60 days of each other
- Same corporate service provider used for all three
- Identical registered address (serviced office)
- Same nominee director appearing in multiple companies
- Formation fees paid from defendant's personal accounts
- Bank accounts opened within days of incorporation
- First transactions occurred within 2 weeks of bank account opening
- No employees, no office space, no business premises
- No tax filings reflecting actual business operations
- Annual returns filed showing minimal legitimate activity

SINGAPORE ENTITIES:

4. HORIZON CAPITAL PTE LTD
Company Registration: 202212345A
Date of Incorporation: 12 March 2022
Registered Address: Nominee company address, Singapore
Paid-up Capital: SGD 1

Key Evidence:
- Application documents submitted through Singapore corporate service provider
- Defendant listed as ultimate beneficial owner in ACRA filings
- Bank account opening in Singapore with defendant as authorized signatory
- Email trail showing defendant directing company formation
- Nominee directors provided by corporate service provider
- Company description: "Investment holdings" - no actual investments made
- Only bank account activity: receiving and transferring funds
- Transaction volume: 31 transfers (RM 8.4M)

5. APEX TRADING GROUP PTE LTD
Company Registration: 202223456B
Date of Incorporation: 25 March 2022
Similar control structure to Horizon Capital
Transaction volume: 22 transfers (RM 4.9M)

Singapore Entity Indicators:
- Both incorporated within 2 weeks of each other
- Same corporate service provider
- Nominee directors who admit no actual involvement
- Defendant identified in beneficial ownership declarations
- Bank accounts opened at same Singapore bank
- Coordinated timing with Malaysian entity fund transfers
- No evidence of legitimate trading or investment activity

HONG KONG ENTITY:

6. DRAGON PHOENIX LIMITED
Company Registration: 12345678
Date of Incorporation: 8 April 2022
Registered Address: Corporate service provider address, Hong Kong

Key Evidence:
- Company formation documents signed by defendant's representative
- Bank account in Hong Kong showing defendant as beneficial owner
- Power of Attorney granting defendant complete authority
- Transaction volume: 12 transfers (RM 5.2M)
- No business premises, employees, or legitimate operations
- Funds received from Singapore entities, transferred to BVI entity

BRITISH VIRGIN ISLANDS ENTITY:

7. GLOBAL VENTURES CORP
Company Registration: BVI 2134567
Date of Incorporation: 22 April 2022
Structure: International Business Company (IBC)

Key Evidence:
- Bearer share structure (since reformed, now registered shares)
- Defendant identified as ultimate beneficial owner in bank CDD
- Nominee director services provided by BVI corporate service provider
- Bank account opened in Switzerland with defendant's authorization
- Transaction volume: 8 final destination transfers (RM 4.65M)
- Highest level of opacity in corporate structure
- Email evidence shows defendant directing formation and transfers
- No legitimate business purpose or operations

ADDITIONAL CORPORATE ENTITIES (Co-Defendants):

8. [Additional entity controlled by Co-Defendant 1]
9. [Additional entity controlled by Co-Defendant 2]

These entities served as intermediary vehicles in the layering process.

BENEFICIAL OWNERSHIP ANALYSIS:

Corporate structure analysis establishes defendant's control through:

1. Financial Control:
- Defendant paid incorporation fees for all entities
- Bank account opening deposits traced to defendant
- Defendant listed as authorized signatory on corporate bank accounts
- Ongoing operating expenses paid from defendant-controlled accounts

2. Operational Control:
- Email evidence shows defendant issuing instructions to all entities
- Power of Attorney documents granting defendant complete authority
- Defendant directed all significant transactions
- Nominee directors confirm they acted solely on defendant's instructions

3. Legal Control:
- Defendant identified as ultimate beneficial owner in banking due diligence
- Beneficial ownership registers show defendant as controlling party
- Legal agreements grant defendant decision-making authority
- Corporate resolutions drafted and executed per defendant's instructions

TIMING ANALYSIS:

Critical timeline showing deliberate creation of infrastructure:
- November 2021: First discussions about fund extraction (per digital evidence)
- January-April 2022: Systematic incorporation of all 8 entities across 4 jurisdictions
- Late January 2022: Bank accounts opened for newly formed companies
- Early February 2022: First suspicious transactions commence
- February-June 2023: Peak transaction period (187 transfers)
- July 2023: Operations cease abruptly (audit concerns per emails)

EXPERT ANALYSIS:

Corporate forensic expert Dr. Tan Wei Ming (Corporate Fraud Specialist) provides analysis:
- "The corporate structure exhibits all hallmarks of deliberate money laundering infrastructure"
- "The timing of entity formation immediately preceding suspicious transactions eliminates coincidence"
- "The absence of any legitimate business operations across all eight entities is highly probative"
- "The use of multiple jurisdictions and nominee arrangements demonstrates sophisticated concealment efforts"
- "The common beneficial ownership and coordinated activities establish a unified scheme"

CORPORATE GOVERNANCE VIOLATIONS:

Documentation reveals systematic violations:
- Nominee directors admitting they exercised no independent judgment
- No legitimate board meetings or corporate governance
- Corporate records falsified to show non-existent business activities
- Misrepresentation to banks regarding nature of business
- Violation of corporate law requirements across multiple jurisdictions

This corporate evidence establishes that the defendant deliberately created a multi-jurisdictional network of shell companies for the specific purpose of layering and concealing the proceeds of corporate fraud, demonstrating premeditation and sophisticated money laundering methodology.`)}>+ Corporate Documents and Shell Company Records (1,247 documents)</a></li>
              
              <li><a href="#" onClick={(e) => handleEvidenceClick(e, 'Asset Tracing and Recovery Documentation', `Evidence Reference: ASSET-TRACE-2024

Total Assets Identified: RM 42.35 million
Assets Frozen/Recovered: RM 31.2 million (62% recovery rate)
Outstanding/Dissipated: RM 11.15 million
Jurisdictions: Malaysia, Singapore, United Kingdom, Switzerland

Asset Tracing Evidence:

This evidence category documents the comprehensive asset tracing investigation conducted to identify the final destination of laundered funds and secure their recovery through legal proceedings. The investigation employed international cooperation mechanisms and specialized asset tracing techniques.

FROZEN ASSETS - BREAKDOWN BY CATEGORY:

1. REAL PROPERTY (Total: RM 18.7 million frozen)

Malaysia:
a) Luxury Condominium - Kuala Lumpur
   - Location: The Four Seasons Residences, KLCC
   - Purchase Price: RM 12.5 million
   - Purchase Date: 15 June 2022
   - Registered Owner: Global Ventures Corp (BVI)
   - Beneficial Owner: Traced to defendant
   - Evidence: Purchase funds traced directly from shell company account
   - Status: Freezing order obtained 20 November 2024

Singapore:
b) Orchard Road Penthouse
   - Location: Boulevard Vue, Orchard Road
   - Purchase Price: SGD 8.5 million (approx RM 28.4 million)
   - Purchase Date: 2 July 2022
   - Registered Owner: Horizon Capital Pte Ltd
   - Evidence: Email trail showing defendant directing purchase
   - Status: Mareva injunction obtained through Singapore courts
   
   Note: This property is valued separately; RM 18.7M represents combined property holdings

2. BANK ACCOUNTS (Total: RM 6.8 million frozen)

Malaysian Bank Accounts:
- Account 1 (Maybank): RM 2.3 million - Personal account
- Account 2 (CIMB): RM 1.8 million - Joint account with spouse
- Account 3 (Public Bank): RM 890,000 - Business account

Singapore Bank Accounts:
- DBS Bank: SGD 1.2 million (RM 4.0 million)
- UOB Bank: SGD 450,000 (RM 1.5 million)

Status: All accounts frozen under Section 44 AMLA 2001

3. INVESTMENT ACCOUNTS (Total: RM 8.9 million frozen)

Switzerland:
- Swiss Private Bank Account: CHF 2.1 million (RM 10.5 million)
- Registered to: Global Ventures Corp
- Freezing Mechanism: Mutual Legal Assistance request executed
- Status: Funds frozen pending forfeiture proceedings

Hong Kong:
- Securities Account (HSBC): HKD 3.8 million (RM 2.4 million)
- Cryptocurrency Holdings: Estimated RM 1.2 million (Bitcoin, Ethereum)
- Status: Freezing orders obtained through Hong Kong courts

4. LUXURY VEHICLES (Total: RM 2.4 million identified)

a) Rolls-Royce Phantom
   - Purchase Price: RM 2.8 million
   - Purchase Date: March 2022
   - Evidence: Payment traced to Pacific Trade Solutions account
   - Status: Vehicle seized and held by authorities

b) Ferrari 488 GTB
   - Purchase Price: RM 1.8 million
   - Purchase Date: May 2022
   - Status: Seized under seizure warrant

c) Lamborghini Urus
   - Purchase Price: RM 1.3 million
   - Status: Located and frozen

Note: Combined vehicle value RM 5.9M; RM 2.4M represents depreciated seizure value

5. LUXURY GOODS AND COLLECTIBLES (Total: RM 600,000 seized)

Items seized from defendant's residences:
- Luxury watches (Patek Philippe, Rolex, Audemars Piguet): RM 380,000
- Designer jewelry: RM 140,000
- Art pieces: RM 80,000

Evidence: Purchase receipts match timing and amounts of suspicious transactions

DISSIPATED/UNTRACED ASSETS (RM 11.15 million):

Investigation continues for:
1. Cash withdrawals: RM 2.3 million
   - Multiple ATM and counter withdrawals
   - Limited traceability once converted to cash
   - Investigation ongoing into possible hidden assets

2. Third-party transfers: RM 3.4 million
   - Transfers to individuals not yet charged
   - Investigation ongoing into potential accomplices
   - Some funds may have been dissipated through gambling/entertainment

3. Additional luxury purchases: RM 2.8 million
   - Travel expenses (private jets, luxury hotels)
   - Entertainment and lifestyle expenses
   - Gifts to associates and family members

4. Unidentified destinations: RM 2.65 million
   - Tracing investigation incomplete
   - May involve additional offshore structures
   - Subject of ongoing international cooperation requests

ASSET RECOVERY MECHANISMS EMPLOYED:

1. Domestic Freezing Orders (Malaysia):
   - Section 44 AMLA 2001: Seizure of movable property
   - Section 50 AMLA 2001: Restraint of immovable property
   - Orders obtained from High Court on ex parte basis
   - Executed by Royal Malaysian Police Commercial Crime Investigation Department

2. International Cooperation:
   - Mutual Legal Assistance Treaties (MLAT) with Singapore, Hong Kong, Switzerland
   - Direct cooperation with foreign Financial Intelligence Units
   - Interpol asset recovery notices
   - Egmont Group information sharing

3. Civil Forfeiture Proceedings:
   - Separate civil proceedings initiated for asset forfeiture
   - Burden of proof: Balance of probabilities
   - Targets assets regardless of criminal conviction outcome
   - Proceedings running parallel to criminal prosecution

EXPERT ASSET TRACING TESTIMONY:

Expert Witness: Ms. Sarah Tan (Certified Fraud Examiner, Asset Recovery Specialist)
Firm: Kroll Associates

Key Findings in Expert Report:
- "The asset acquisition pattern directly correlates with the suspicious transaction timeline"
- "Purchase prices and transaction amounts show deliberate conversion of illicit proceeds"
- "The use of shell companies as purchasing entities demonstrates concealment intent"
- "The rapid accumulation of luxury assets inconsistent with legitimate income"
- "Total traced assets of RM 42.35M accounts for entirety of alleged proceeds"

DEFENDANT'S DECLARED INCOME vs. ASSET ACQUISITION:

Comparative Analysis:
- Defendant's declared annual income (2019-2021): RM 800,000 - RM 1.2M per year
- Total asset acquisitions (2022-2023): RM 42.35M
- Income tax filings show no legitimate source for luxury purchases
- Unexplained wealth: RM 39M+ discrepancy

This evidence supports inference that assets represent proceeds of crime.

SIGNIFICANCE OF RECOVERY RATE:

The 62% recovery rate (RM 31.2M of RM 42.35M) is considered excellent for money laundering cases:
- Demonstrates effectiveness of prompt investigation and freezing action
- Higher than typical international recovery rates (30-40%)
- Attributed to quick identification and multi-jurisdictional cooperation
- Remaining 38% subject to ongoing tracing efforts

FORFEITURE PROSPECTS:

Legal analysis indicates strong prospects for successful forfeiture:
- Clear nexus established between criminal proceeds and acquired assets
- Burden of proof requirements likely to be met
- International cooperation secured for enforcement
- Minimal risk of third-party claims on frozen assets

This comprehensive asset tracing evidence demonstrates the complete lifecycle of the money laundering operation: from extraction of criminal proceeds, through layering in shell companies, to integration via luxury asset purchases, providing powerful corroboration of the prosecution's case and securing substantial recovery for victims.`)}>+ Asset Tracing and Recovery Documentation</a></li>
            </ul>
          </div>
        </section>

        {/* Legal Precedents Section */}
        <section className="cs-section cs-precedents">
          <div className="cs-precedents-header">
            <h2 className="cs-section-title">Legal Precedents Applied</h2>
          </div>

          {precedentIndex > 0 && (
            <button className="cs-carousel-btn cs-carousel-btn-left" onClick={handlePrecedentPrev}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M15 18L9 12L15 6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          )}

          {precedentIndex < 2 && (
            <button className="cs-carousel-btn cs-carousel-btn-right" onClick={handlePrecedentNext}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M9 18L15 12L9 6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          )}

          <div className="cs-precedents-wrapper">
            <div className="cs-precedents-grid" style={{ transform: `translateX(-${precedentIndex * 390}px)` }}>
              <div className="cs-precedent-card">
                <h3 className="cs-precedent-title">Anti-Money Laundering, Anti-Terrorism Financing and Proceeds of Unlawful Activities Act 2001 (AMLA)</h3>
                <p className="cs-precedent-desc">
                  Primary statutory framework for money laundering offenses, asset freezing, and forfeiture proceedings in Malaysia
                </p>
                <button className="cs-view-btn">
                  <span>View Details</span>
                  <svg width="20" height="24" viewBox="0 0 20 24" fill="none">
                    <path d="M15 8L18.3333 12L15 16" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M1.66663 12H18.3333" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
              </div>

              <div className="cs-precedent-card">
                <h3 className="cs-precedent-title">Penal Code - Section 405, 406, 409 (Criminal Breach of Trust)</h3>
                <p className="cs-precedent-desc">
                  Provisions relating to criminal breach of trust by person in fiduciary capacity and corporate officers
                </p>
                <button className="cs-view-btn">
                  <span>View Details</span>
                  <svg width="20" height="24" viewBox="0 0 20 24" fill="none">
                    <path d="M15 8L18.3333 12L15 16" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M1.66669 12H18.3334" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
              </div>

              <div className="cs-precedent-card">
                <h3 className="cs-precedent-title">Companies Act 2016 - Corporate Fraud Provisions</h3>
                <p className="cs-precedent-desc">
                  Statutory duties of directors, fraudulent trading, and misappropriation of company assets by corporate officers
                </p>
                <button className="cs-view-btn">
                  <span>View Details</span>
                  <svg width="20" height="24" viewBox="0 0 20 24" fill="none">
                    <path d="M15 8L18.3333 12L15 16" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M1.66666 12H18.3333" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
              </div>

              <div className="cs-precedent-card">
                <h3 className="cs-precedent-title">Evidence Act 1950 - Section 90A (Computer Evidence)</h3>
                <p className="cs-precedent-desc">
                  Admissibility of electronic evidence, digital documents, and computer-generated records in criminal proceedings
                </p>
                <button className="cs-view-btn">
                  <span>View Details</span>
                  <svg width="20" height="24" viewBox="0 0 20 24" fill="none">
                    <path d="M15 8L18.3333 12L15 16" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M1.66666 12H18.3333" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
              </div>

              <div className="cs-precedent-card">
                <h3 className="cs-precedent-title">Mutual Assistance in Criminal Matters Act 2002</h3>
                <p className="cs-precedent-desc">
                  Framework for international cooperation in evidence gathering, asset recovery, and cross-border investigations
                </p>
                <button className="cs-view-btn">
                  <span>View Details</span>
                  <svg width="20" height="24" viewBox="0 0 20 24" fill="none">
                    <path d="M15 8L18.3333 12L15 16" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M1.66666 12H18.3333" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Relevant Cases Section */}
        <section className="cs-section cs-relevant-cases">
          <div className="cs-cases-header">
            <h2 className="cs-section-title">Relevant Case Precedents</h2>
          </div>

          {casesIndex > 0 && (
            <button className="cs-carousel-btn cs-carousel-btn-cases-left" onClick={handleCasesPrev}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M15 18L9 12L15 6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          )}

          {casesIndex < 2 && (
            <button className="cs-carousel-btn cs-carousel-btn-cases-right" onClick={handleCasesNext}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M9 18L15 12L9 6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          )}

          <div className="cs-cases-container">
            <div className="cs-cases-wrapper">
              <div className="cs-cases-grid" style={{ transform: `translateX(-${casesIndex * 640}px)` }}>
                <div className="cs-case-card">
                  <a href="#" className="cs-external-icon" onClick={(e) => { e.preventDefault(); window.open('https://example.com/case-details', '_blank'); }}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h6"/>
                      <path d="m21 3-9 9"/>
                      <path d="M15 3h6v6"/>
                    </svg>
                  </a>
                  <h3 className="cs-case-title">PP v. Dato' Seri Najib Razak [2020] (1MDB Case)</h3>
                  <p className="cs-case-desc">
                    Landmark money laundering prosecution involving systematic abuse of position and complex international transactions
                    <br /><br />
                    Relevance: 92% | Federal Court
                  </p>
                </div>

                <div className="cs-case-card">
                  <a href="#" className="cs-external-icon" onClick={(e) => { e.preventDefault(); window.open('https://example.com/case-details', '_blank'); }}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h6"/>
                      <path d="m21 3-9 9"/>
                      <path d="M15 3h6v6"/>
                    </svg>
                  </a>
                  <h3 className="cs-case-title">Nik Faisal Ariff Kamil v. PP [2021]</h3>
                  <p className="cs-case-desc">
                    Shell company creation and layering of illicit funds. Corporate criminal liability and beneficial ownership
                    <br /><br />
                    Relevance: 88% | Court of Appeal
                  </p>
                </div>

                <div className="cs-case-card">
                  <a href="#" className="cs-external-icon" onClick={(e) => { e.preventDefault(); window.open('https://example.com/case-details', '_blank'); }}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h6"/>
                      <path d="m21 3-9 9"/>
                      <path d="M15 3h6v6"/>
                    </svg>
                  </a>
                  <h3 className="cs-case-title">PP v. Lim Guan Eng [2018] (Tunnel Project)</h3>
                  <p className="cs-case-desc">
                    Abuse of fiduciary position and criminal breach of trust. Standards for corporate fraud prosecution
                    <br /><br />
                    Relevance: 79% | Sessions Court
                  </p>
                </div>

                <div className="cs-case-card">
                  <a href="#" className="cs-external-icon" onClick={(e) => { e.preventDefault(); window.open('https://example.com/case-details', '_blank'); }}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h6"/>
                      <path d="m21 3-9 9"/>
                      <path d="M15 3h6v6"/>
                    </svg>
                  </a>
                  <h3 className="cs-case-title">PP v. Jho Low [2019] (in absentia proceedings)</h3>
                  <p className="cs-case-desc">
                    Multi-jurisdictional money laundering through complex corporate structures. Asset recovery mechanisms
                    <br /><br />
                    Relevance: 90% | High Court
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Bottom Buttons */}
        <div className="cs-bottom-buttons">
          <button className="cs-back-btn" onClick={() => {
  setIsNavigating(true);
  setTimeout(() => {
    navigate('/previous-cases', { state: { smoothTransition: true } });
  }, 250);
}}>
            <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M19.0449 12.0712L5.04497 12.0187" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M12.0186 19.0449L5.04494 12.0187L12.0712 5.045" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span>Back</span>
          </button>
        </div>
      </div>

      {/* Evidence Modal */}
      {showModal && selectedEvidence && (
        <div className="cs-modal-overlay" onClick={closeModal}>
          <div className="cs-modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="cs-modal-header">
              <h3 className="cs-modal-title">{selectedEvidence.title}</h3>
              <button className="cs-modal-close" onClick={closeModal}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M18 6L6 18M6 6L18 18" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>
            <div className="cs-modal-body">
              <p>{selectedEvidence.details}</p>
            </div>
            <div className="cs-modal-footer">
              <button className="cs-modal-btn" onClick={closeModal}>Close</button>
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
}

export default CaseSummary;