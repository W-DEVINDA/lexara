import React, { useState, useEffect, useRef } from 'react';
import { Hash, ShieldAlert, Calendar, DollarSign, Activity, MapPin } from 'lucide-react';
import { motion } from 'framer-motion';
import './INVBasicInformation.css';

function INVBasicInformation({ isLoading }) {
  const summaryRef = useRef(null);
  const [hasAnimated, setHasAnimated] = useState(false);
 const [animatedStats, setAnimatedStats] = useState({
    events: 0,
    months: 0,
    amount: 0,
    jurisdictions: 0
  });

  useEffect(() => {
    // Start animation when loading finishes
    if (isLoading || hasAnimated) return;

    const timer = setTimeout(() => {
      setHasAnimated(true);
      
      let eventsCount = 0;
      const eventsInterval = setInterval(() => {
        eventsCount += 3;
        if (eventsCount >= 187) {
          setAnimatedStats(prev => ({ ...prev, events: 187 }));
          clearInterval(eventsInterval);
        } else {
          setAnimatedStats(prev => ({ ...prev, events: eventsCount }));
        }
      }, 25);

      let jurisdictionsCount = 0;
      const jurisdictionsInterval = setInterval(() => {
        jurisdictionsCount += 0.1;
        if (jurisdictionsCount >= 4) {
          setAnimatedStats(prev => ({ ...prev, jurisdictions: 4 }));
          clearInterval(jurisdictionsInterval);
        } else {
          setAnimatedStats(prev => ({ ...prev, jurisdictions: Math.floor(jurisdictionsCount) }));
        }
      }, 150);

      let amountCount = 0;
      const amountInterval = setInterval(() => {
        amountCount += 0.15;
        if (amountCount >= 8.5) {
          setAnimatedStats(prev => ({ ...prev, amount: 8.5 }));
          clearInterval(amountInterval);
        } else {
          setAnimatedStats(prev => ({ ...prev, amount: parseFloat(amountCount.toFixed(1)) }));
        }
      }, 40);
    }, 100);

    return () => {
      clearTimeout(timer);
    };
  }, [isLoading, hasAnimated]);
  const CaseSummarySkeleton = () => (
    <div className="skeleton-case-summary">
      <div className="skeleton-info-grid">
        {[1, 2, 3].map((i) => (
          <div key={i} className="skeleton-info-item">
            <div className="skeleton skeleton-icon"></div>
            <div className="skeleton-text-group">
              <div className="skeleton skeleton-label"></div>
              <div className="skeleton skeleton-value"></div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="skeleton-stats-row">
        {[1, 2, 3].map((i) => (
          <React.Fragment key={i}>
            <div className="skeleton-stat">
              <div className="skeleton skeleton-stat-icon"></div>
              <div>
                <div className="skeleton skeleton-stat-value"></div>
                <div className="skeleton skeleton-stat-label"></div>
              </div>
            </div>
            {i < 3 && <div className="stat-divider"></div>}
          </React.Fragment>
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
      >
        <CaseSummarySkeleton />
      </motion.div>
    );
  }

  return (
    <motion.div
      ref={summaryRef}
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.8, ease: [0.25, 0.1, 0.25, 1], delay: 0.4 }}
      className="case-summary-header"
    >
      <div className="case-summary-background"></div>
      <div className="case-summary-main">
        <div className="case-info-item">
          <Hash size={18} />
          <div>
            <div className="case-label">Case Reference</div>
            <div className="case-value">ML-2024-KL-08841</div>
          </div>
        </div>
        <div className="case-info-item">
          <ShieldAlert size={18} />
          <div>
            <div className="case-label">Offence Type</div>
            <div className="case-value">Money Laundering</div>
          </div>
        </div>
        <div className="case-info-item">
          <Calendar size={18} />
          <div>
            <div className="case-label">Investigation Period</div>
            <div className="case-value">Jan 2026 - Jun 2026</div>
          </div>
        </div>
      </div>
      
<div className="case-summary-stats">
        <div className="stat-item">
          <DollarSign size={20} />
          <div>
            <div className="stat-value">RM 8.5M</div>
            <div className="stat-label">Total Amount</div>
          </div>
        </div>
        <div className="stat-divider"></div>
        <div className="stat-item">
          <Activity size={20} />
          <div>
            <div className="stat-value">187</div>
            <div className="stat-label">Transactions</div>
          </div>
        </div>
        <div className="stat-divider"></div>
        <div className="stat-item">
          <MapPin size={20} />
          <div>
            <div className="stat-value">4</div>
            <div className="stat-label">Jurisdictions</div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default INVBasicInformation;