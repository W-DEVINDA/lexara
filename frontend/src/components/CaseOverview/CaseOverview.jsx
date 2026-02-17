import React from 'react';
import './CaseOverview.css';

const CaseOverview = () => {
  return (
    <section className="case-overview-section">
      <h2 className="section-title">Case Overview</h2>
      <div className="case-overview-card">
        <div className="overview-column">
          <h3 className="overview-heading">Case Identification</h3>
          <p className="overview-text">
            <strong>Case Number:</strong> WA-44-1124-2024<br />
            <strong>Filing Date:</strong> November 8, 2024<br />
            <strong>Court:</strong> High Court of Kuala Lumpur<br />
            <strong>Presiding Judge:</strong> Yang Arif Dato' Mohd Nazlan Mohd Ghazali<br />
            <strong>Case Status:</strong> Pre-trial proceedings
          </p>
          <h3 className="overview-heading">Parties Involved</h3>
          <p className="overview-text">
            <strong>Prosecution:</strong> Attorney General's Chambers (Financial Crime Division)<br />
            <strong>Defendant:</strong> Dato' Richard Lim Kah Weng<br />
            <strong>Co-Defendants:</strong> 3 corporate entities, 2 individual accomplices<br />
            <strong>Defense Counsel:</strong> Messrs. Shafee & Partners
          </p>

          <h3 className="overview-heading">Case Type & Classification</h3>
          <p className="overview-text">
            <strong>Primary Charges:</strong> Money Laundering (AMLA 2001)<br />
            <strong>Secondary Charges:</strong> Corporate Fraud, Criminal Breach of Trust<br />
          </p>
        </div>

        <div className="overview-column">
          <h3 className="overview-heading">Financial Details</h3>
          <p className="overview-text">
            <strong>Total Amount:</strong> RM 42,350,000<br />
            <strong>Period:</strong> January 2022 - June 2023<br />
            <strong>Number of Transactions:</strong> 187 suspicious transfers<br />
            <strong>Jurisdictions Involved:</strong> Malaysia, Singapore, Hong Kong, BVI<br />
            <strong>Frozen Assets:</strong> RM 31,200,000
          </p>

          <h3 className="overview-heading">Key Allegations</h3>
          <p className="overview-text">
            Defendant allegedly orchestrated systematic scheme to siphon funds from publicly-listed company through shell corporations. Funds routed through multiple offshore accounts with layered transactions designed to obscure origin. Evidence includes banking records, email communications, and forensic accounting analysis establishing clear paper trail from source to destination accounts.
          </p>
        </div>
      </div>
    </section>
  );
};

export default CaseOverview;