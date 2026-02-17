import React from 'react';
import { motion } from 'framer-motion';
import { Users, Building2, Phone, Mail } from 'lucide-react';
import './INVSuspectInformation.css';

function INVSuspectInformation({ isLoading }) {
  const SuspectInfoSkeleton = () => (
    <div>
      <h2 className="section-title-main">Suspect Information</h2>
      <div className="skeleton-suspect-grid">
        {[1, 2, 3].map((i) => (
          <div key={i} className="skeleton-suspect-card">
            <div className="skeleton-card-header">
              <div className="skeleton skeleton-icon"></div>
              <div className="skeleton skeleton-card-title"></div>
            </div>
            <div className="skeleton skeleton-name"></div>
            <div style={{ marginTop: '16px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div className="skeleton" style={{ height: '16px', width: '100%' }}></div>
              <div className="skeleton" style={{ height: '16px', width: '85%' }}></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  if (isLoading) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="suspect-info-section"
      >
        <SuspectInfoSkeleton />
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.8, ease: [0.25, 0.1, 0.25, 1], delay: 0.9 }}
      className="suspect-info-section"
    >
      <h2 className="section-title-main">Suspect Information</h2>
      <div className="suspect-cards-grid">
        <div className="suspect-card suspect-card-primary">
          <div className="suspect-card-header">
            <Users size={18} />
            <span>Primary Suspect</span>
          </div>
          <div className="suspect-details">
            <div className="suspect-name">Encik Ahmad bin Hassan</div>
            <div className="suspect-meta-grid">
              <div className="suspect-meta-item">
                <span className="meta-label">IC Number</span>
                <span className="meta-value">750512-10-5234</span>
              </div>
              <div className="suspect-meta-item">
                <span className="meta-label">Age</span>
                <span className="meta-value">49 years</span>
              </div>
              <div className="suspect-meta-item">
                <span className="meta-label">Nationality</span>
                <span className="meta-value">Malaysian</span>
              </div>
              <div className="suspect-meta-item">
                <span className="meta-label">Occupation</span>
                <span className="meta-value">Business Owner</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="suspect-card">
          <div className="suspect-card-header">
            <Building2 size={18} />
            <span>Business Entity</span>
          </div>
          <div className="suspect-details">
            <div className="suspect-name">Stellar Solutions Sdn Bhd</div>
            <div className="suspect-meta-grid">
              <div className="suspect-meta-item">
                <span className="meta-label">Registration No</span>
                <span className="meta-value">201801024567</span>
              </div>
              <div className="suspect-meta-item">
                <span className="meta-label">Status</span>
                <span className="meta-value">Active (Fake)</span>
              </div>
              <div className="suspect-meta-item">
                <span className="meta-label">Directors</span>
                <span className="meta-value">Ahmad bin Hassan</span>
              </div>
              <div className="suspect-meta-item">
                <span className="meta-label">Address</span>
                <span className="meta-value">No physical premises</span>
              </div>
            </div>
          </div>
        </div>

        <div className="suspect-card">
          <div className="suspect-card-header">
            <Phone size={18} />
            <span>Contact Information</span>
          </div>
          <div className="suspect-contact-details">
            <div className="contact-item">
              <Phone size={16} />
              <div>
                <div className="contact-label">Primary</div>
                <div className="contact-value">+60 12-345 6789</div>
              </div>
            </div>
            <div className="contact-item">
              <Phone size={16} />
              <div>
                <div className="contact-label">Secondary</div>
                <div className="contact-value">+60 19-876 5432</div>
              </div>
            </div>
            <div className="contact-item">
              <Mail size={16} />
              <div>
                <div className="contact-label">Email</div>
                <div className="contact-value">ahmad.hassan@stellarsol.com</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default INVSuspectInformation;