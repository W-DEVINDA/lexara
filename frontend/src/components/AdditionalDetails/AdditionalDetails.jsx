import React, { useState } from 'react';
import './AdditionalDetails.css';

const AdditionalDetails = () => {
  const [flippedCards, setFlippedCards] = useState({});

  const toggleCardFlip = (cardType) => {
    setFlippedCards(prev => ({
      ...prev,
      [cardType]: !prev[cardType]
    }));
  };

  const getModalContent = (cardType) => {
    const modalData = {
      'financial': {
        title: 'Financial Overview - Detailed Breakdown',
        content: [
          {
            category: 'Total Financial Loss',
            amount: 'RM 42,350,000',
            details: '187 suspicious transactions over 18-month period (Jan 2022 - Jun 2023). Funds systematically transferred from publicly-listed company to shell corporations across multiple jurisdictions.',
            breakdown: 'Domestic transfers: RM 28.5M | Offshore transfers: RM 13.85M'
          },
          {
            category: 'Asset Recovery Status',
            amount: 'RM 31,200,000 (73.6%)',
            details: 'Successfully frozen assets in Malaysian, Singapore, and Hong Kong accounts. Recovery rate significantly higher than typical money laundering cases due to swift action and comprehensive forensic tracing.',
            breakdown: 'Malaysia: RM 18.2M | Singapore: RM 9.8M | Hong Kong: RM 3.2M'
          },
          {
            category: 'Outstanding/Unrecovered',
            amount: 'RM 11,150,000 (26.4%)',
            details: 'Remaining funds traced to British Virgin Islands and cryptocurrency wallets. Recovery efforts ongoing through mutual legal assistance treaties and blockchain analysis.',
            breakdown: 'BVI accounts: RM 7.9M | Cryptocurrency: ~USD 3.2M'
          },
          {
            category: 'Potential Fines & Penalties',
            amount: 'Up to RM 5,000,000',
            details: 'Under AMLA 2001, court may impose fine up to RM 5 million in addition to imprisonment. Prosecution will seek maximum penalty given systematic nature and substantial amount involved.',
            breakdown: 'Statutory maximum under Section 4, AMLA 2001'
          },
          {
            category: 'Restitution Sought',
            amount: 'RM 42,350,000 + Interest',
            details: 'Full restitution to affected company and shareholders. Includes interest calculated from date of misappropriation. Civil proceedings may follow criminal conviction for additional damages.',
            breakdown: 'Principal: RM 42.35M | Estimated interest: RM 4.8M'
          }
        ]
      },
      'recommendations': {
        title: 'AI-Generated Recommendations - Strategic Plan',
        content: [
          {
            priority: 'Critical',
            category: 'Asset Recovery',
            recommendation: 'File immediate application for Mareva injunction',
            rationale: 'Defendant has significant assets overseas. Swift action required to freeze accounts in Singapore and Hong Kong before dissipation.',
            timeline: 'Within 48 hours',
            assignedTo: 'Lead counsel + Asset recovery specialist'
          },
          {
            priority: 'Critical',
            category: 'Evidence Preservation',
            recommendation: 'Secure Anton Piller order for defendant\'s business premises',
            rationale: 'Risk of document destruction is high. Need court order for search and seizure of electronic records and physical documents.',
            timeline: 'Within 1 week',
            assignedTo: 'Litigation team'
          },
          {
            priority: 'High',
            category: 'Expert Witnesses',
            recommendation: 'Engage forensic technology expert for digital evidence analysis',
            rationale: 'Cryptocurrency transactions and encrypted communications require specialized expertise for court presentation.',
            timeline: 'Next 2 weeks',
            assignedTo: 'Technical evidence coordinator'
          },
          {
            priority: 'High',
            category: 'Regulatory Coordination',
            recommendation: 'Coordinate with Bank Negara Malaysia and Securities Commission',
            rationale: 'Regulatory bodies may provide additional evidence and support civil recovery efforts parallel to criminal prosecution.',
            timeline: 'Ongoing',
            assignedTo: 'Regulatory liaison'
          }
        ]
      },
      'risks': {
        title: 'Risk Analysis - Comprehensive Assessment',
        content: [
          {
            risk: 'Asset Dissipation and Flight Risk',
            level: 'High',
            description: 'Defendant has dual citizenship and significant overseas assets. High risk of transferring remaining funds and fleeing jurisdiction.',
            mitigation: 'Immediate Mareva injunction. Coordinate with immigration authorities. Seek passport surrender order.',
            probability: '65% - Defendant has means and motive',
            impact: 'Critical - Could result in total asset loss and inability to enforce judgment'
          },
          {
            risk: 'Complex Jurisdictional Issues',
            level: 'High',
            description: 'Funds passed through multiple jurisdictions with varying cooperation levels. Some assets in non-treaty countries.',
            mitigation: 'Engage international asset recovery specialists. Pursue mutual legal assistance treaties. Consider civil recovery in each jurisdiction.',
            probability: '75% - Already identified multi-jurisdictional assets',
            impact: 'High - May significantly delay and complicate recovery'
          },
          {
            risk: 'Digital Evidence Integrity Challenges',
            level: 'Medium',
            description: 'Defense may challenge chain of custody for electronic evidence and cryptocurrency transaction records.',
            mitigation: 'Ensure forensic imaging follows international standards. Engage certified digital forensics experts. Document every step meticulously.',
            probability: '50% - Standard defense strategy in financial crime cases',
            impact: 'Moderate - Could exclude key evidence if not properly handled'
          },
          {
            risk: 'Corporate Veil Piercing Difficulties',
            level: 'Medium',
            description: 'Multiple layers of shell companies may complicate establishing direct liability and beneficial ownership.',
            mitigation: 'Thorough corporate structure analysis. Use nominee director testimony. Trace ultimate beneficial ownership through all layers.',
            probability: '60% - Complex corporate structures already identified',
            impact: 'Moderate - May reduce recoverable amount or complicate enforcement'
          }
        ]
      }
    };

    return modalData[cardType];
  };

  const renderCardBack = (cardType) => {
    const content = getModalContent(cardType);
    if (!content) return null;

    if (cardType === 'financial') {
      return (
        <div className="card-back-content">
          <div className="card-back-header">
            <h3 className="card-back-title">{content.title}</h3>
            <svg 
              className="card-back-button" 
              width="24" 
              height="24" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="white"
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
              xmlns="http://www.w3.org/2000/svg"
              onClick={() => toggleCardFlip(cardType)}
            >
              <path d="M9 14 4 9l5-5"/>
              <path d="M4 9h10.5a5.5 5.5 0 0 1 5.5 5.5a5.5 5.5 0 0 1-5.5 5.5H11"/>
            </svg>
          </div>
          <div className="card-back-body">
            <div className="modal-content-wrapper">
              {content.content.map((item, index) => (
                <div key={index} className="modal-evidence-item">
                  <div className="modal-evidence-header">
                    <span className="modal-evidence-type">{item.category}</span>
                    <span className="modal-evidence-status">{item.amount}</span>
                  </div>
                  <div className="modal-evidence-details">{item.details}</div>
                  <div className="modal-info-row">
                    <div className="modal-label">Breakdown:</div>
                    <div className="modal-value modal-value-small">{item.breakdown}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      );
    }

    if (cardType === 'recommendations') {
      return (
        <div className="card-back-content">
          <div className="card-back-header">
            <h3 className="card-back-title">{content.title}</h3>
            <svg 
              className="card-back-button" 
              width="24" 
              height="24" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="white"
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
              xmlns="http://www.w3.org/2000/svg"
              onClick={() => toggleCardFlip(cardType)}
            >
              <path d="M9 14 4 9l5-5"/>
              <path d="M4 9h10.5a5.5 5.5 0 0 1 5.5 5.5a5.5 5.5 0 0 1-5.5 5.5H11"/>
            </svg>
          </div>
          <div className="card-back-body">
            <div className="modal-content-wrapper">
              {content.content.map((item, index) => (
                <div key={index} className="modal-recommendation-item">
                  <div className="modal-rec-header">
                    <span className={`modal-priority modal-priority-${item.priority.toLowerCase()}`}>
                      {item.priority}
                    </span>
                    <span className="modal-category">{item.category}</span>
                  </div>
                  <div className="modal-rec-title">{item.recommendation}</div>
                  <div className="modal-info-row modal-info-long">
                    <div className="modal-label">Rationale:</div>
                    <div className="modal-value">{item.rationale}</div>
                  </div>
                  <div className="modal-rec-footer">
                    <span><strong>Timeline:</strong> {item.timeline}</span>
                    <span><strong>Assigned:</strong> {item.assignedTo}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      );
    }

    if (cardType === 'risks') {
      return (
        <div className="card-back-content">
          <div className="card-back-header">
            <h3 className="card-back-title">{content.title}</h3>
            <svg 
              className="card-back-button" 
              width="24" 
              height="24" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="white"
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
              xmlns="http://www.w3.org/2000/svg"
              onClick={() => toggleCardFlip(cardType)}
            >
              <path d="M9 14 4 9l5-5"/>
              <path d="M4 9h10.5a5.5 5.5 0 0 1 5.5 5.5a5.5 5.5 0 0 1-5.5 5.5H11"/>
            </svg>
          </div>
          <div className="card-back-body">
            <div className="modal-content-wrapper">
              {content.content.map((item, index) => (
                <div key={index} className="modal-risk-item">
                  <div className="modal-risk-header">
                    <span className="modal-risk-title">{item.risk}</span>
                    <span className={`modal-risk-level modal-risk-${item.level.toLowerCase()}`}>
                      {item.level} Risk
                    </span>
                  </div>
                  <div className="modal-info-row modal-info-long">
                    <div className="modal-label">Description:</div>
                    <div className="modal-value">{item.description}</div>
                  </div>
                  <div className="modal-info-row modal-info-long">
                    <div className="modal-label">Mitigation:</div>
                    <div className="modal-value">{item.mitigation}</div>
                  </div>
                  <div className="modal-risk-footer">
                    <div><strong>Probability:</strong> {item.probability}</div>
                    <div><strong>Impact:</strong> {item.impact}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      );
    }

    return null;
  };

  return (
    <section className="flip-cards-section">
      <h2 className="section-title">Additional Case Details</h2>
      <div className="cards-container">
        {/* Financial Overview Card */}
        <div className={`card-flip-container ${flippedCards['financial'] ? 'flipped' : ''}`}>
          <div className="card-front">
            <div className="card">
              <div className="card-title">Financial Overview</div>
              <svg 
                className="external-link" 
                width="20" 
                height="20" 
                viewBox="0 0 24 23" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg" 
                onClick={() => toggleCardFlip('financial')}
              >
                <path d="M21 12.2996V17.9763C21 18.4781 20.7893 18.9594 20.4142 19.3143C20.0391 19.6692 19.5304 19.8685 19 19.8685H5C4.46957 19.8685 3.96086 19.6692 3.58579 19.3143C3.21071 18.9594 3 18.4781 3 17.9763V4.73062C3 4.22876 3.21071 3.74747 3.58579 3.3926C3.96086 3.03774 4.46957 2.83838 5 2.83838H11" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M21 2.83838L12 11.3535" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M15 2.83838H21V8.51509" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <div className="evidence-box box-filled">
                <div className="badge">Total Loss</div>
                <div className="evidence-status">RM 42.35 Million</div>
              </div>
              <div className="evidence-box box-outline">
                <div className="badge">Frozen Assets</div>
                <div className="evidence-status">RM 31.2M (73.6% recovery rate)</div>
              </div>
              <div className="evidence-box box-filled">
                <div className="badge">Potential Penalties</div>
                <div className="evidence-status">Up to RM 5M fine + restitution</div>
              </div>
            </div>
          </div>
          <div className="card-back">
            {renderCardBack('financial')}
          </div>
        </div>

        {/* Recommendations Card */}
        <div className={`card-flip-container ${flippedCards['recommendations'] ? 'flipped' : ''}`}>
          <div className="card-front">
            <div className="card">
              <div className="card-title">AI-Generated Recommendations</div>
              <svg 
                className="external-link" 
                width="20" 
                height="20" 
                viewBox="0 0 24 23" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg" 
                onClick={() => toggleCardFlip('recommendations')}
              >
                <path d="M21 12.2996V17.9763C21 18.4781 20.7893 18.9594 20.4142 19.3143C20.0391 19.6692 19.5304 19.8685 19 19.8685H5C4.46957 19.8685 3.96086 19.6692 3.58579 19.3143C3.21071 18.9594 3 18.4781 3 17.9763V4.73062C3 4.22876 3.21071 3.74747 3.58579 3.3926C3.96086 3.03774 4.46957 2.83838 5 2.83838H11" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M21 2.83838L12 11.3535" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M15 2.83838H21V8.51509" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <div className="recommendation-box box-filled">
                <div className="badge">Urgent Action</div>
                <div className="recommendation-text">File Mareva injunction within 48 hours to freeze offshore accounts before asset dissipation</div>
              </div>
              <div className="recommendation-box box-outline">
                <div className="badge">Evidence Preservation</div>
                <div className="recommendation-text">Secure Anton Piller order for search and seizure of digital records at defendant's premises</div>
              </div>
            </div>
          </div>
          <div className="card-back">
            {renderCardBack('recommendations')}
          </div>
        </div>

        {/* Risk Analysis Card */}
        <div className={`card-flip-container ${flippedCards['risks'] ? 'flipped' : ''}`}>
          <div className="card-front">
            <div className="card">
              <div className="card-title">Risk Analysis</div>
              <svg 
                className="external-link" 
                width="20" 
                height="20" 
                viewBox="0 0 24 23" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg" 
                onClick={() => toggleCardFlip('risks')}
              >
                <path d="M21 12.2996V17.9763C21 18.4781 20.7893 18.9594 20.4142 19.3143C20.0391 19.6692 19.5304 19.8685 19 19.8685H5C4.46957 19.8685 3.96086 19.6692 3.58579 19.3143C3.21071 18.9594 3 18.4781 3 17.9763V4.73062C3 4.22876 3.21071 3.74747 3.58579 3.3926C3.96086 3.03774 4.46957 2.83838 5 2.83838H11" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M21 2.83838L12 11.3535" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M15 2.83838H21V8.51509" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <div className="risk-box box-filled">
                <div className="badge">High Risk</div>
                <div className="risk-title">Asset dissipation and flight risk with dual citizenship</div>
              </div>
              <div className="risk-box box-outline">
                <div className="badge">High Risk</div>
                <div className="risk-title">Multi-jurisdictional asset recovery complications</div>
              </div>
              <div className="risk-box box-filled">
                <div className="badge">Medium Risk</div>
                <div className="risk-title">Digital evidence integrity and chain of custody challenges</div>
              </div>
            </div>
          </div>
          <div className="card-back">
            {renderCardBack('risks')}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AdditionalDetails;