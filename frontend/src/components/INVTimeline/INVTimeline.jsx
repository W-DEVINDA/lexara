import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Activity } from 'lucide-react';
import './INVTimeline.css';

function INVTimeline() {
  const [activeTimelineIndex, setActiveTimelineIndex] = useState(0);
  const summaryRef = useRef(null);
  const [hasAnimated, setHasAnimated] = useState(false);
  const [animatedStats, setAnimatedStats] = useState({
    events: 0,
    months: 0,
    amount: 0
  });

  const timelineEvents = [
    {
      id: 1,
      date: "January 15, 2024",
      title: "Initial Offshore Transfer",
      description: "First suspicious wire transfer of RM 450,000 received from BVI shell company 'Pacific Holdings Ltd' into Stellar Solutions Sdn Bhd account.",
      location: "Bank Muamalat, Kuala Lumpur",
      type: "financial",
      significance: "high"
    },
    {
      id: 2,
      date: "January 17, 2024",
      title: "First Cash Withdrawal Pattern",
      description: "Ahmad made 3 consecutive cash withdrawals totaling RM 135,000 while wearing disguise (cap and sunglasses). CCTV footage captured suspicious behavior.",
      location: "Bank Muamalat, KLCC Branch",
      type: "withdrawal",
      significance: "high"
    },
    {
      id: 3,
      date: "January 19, 2024",
      title: "Fund Distribution to Family",
      description: "RM 180,000 transferred to wife's personal account within 48 hours of offshore deposit. Pattern repeated throughout investigation period.",
      location: "Multiple bank transfers",
      type: "transfer",
      significance: "critical"
    },
    {
      id: 4,
      date: "February 8, 2024",
      title: "Second Offshore Transfer Wave",
      description: "RM 520,000 received from second BVI entity 'Global Ventures International'. Same pattern of rapid cash withdrawals followed.",
      location: "Bank Muamalat, Kuala Lumpur",
      type: "financial",
      significance: "high"
    },
    {
      id: 5,
      date: "February 10-12, 2024",
      title: "Structured Withdrawal Series",
      description: "5 withdrawals over 3 days, each below RM 50,000 threshold. Clear structuring pattern to avoid reporting requirements.",
      location: "Multiple Bank Muamalat branches",
      type: "withdrawal",
      significance: "critical"
    },
    {
      id: 6,
      date: "March 3, 2024",
      title: "Business Registration Anomaly Detected",
      description: "Investigation reveals Stellar Solutions Sdn Bhd has no physical premises, employees, or legitimate business operations despite active banking.",
      location: "SSM Records Check",
      type: "investigation",
      significance: "critical"
    },
    {
      id: 7,
      date: "March 15, 2024",
      title: "Third Offshore Transfer",
      description: "RM 380,000 from third BVI shell company 'Meridian Capital Services'. Total offshore receipts now exceed RM 3.5 million.",
      location: "Bank Muamalat, Kuala Lumpur",
      type: "financial",
      significance: "high"
    },
    {
      id: 8,
      date: "April 5, 2024",
      title: "Peak Withdrawal Activity",
      description: "Ahmad made 8 withdrawals in single week, totaling RM 340,000. Enhanced disguise measures noted including face mask and different clothing.",
      location: "5 different branches across Klang Valley",
      type: "withdrawal",
      significance: "high"
    },
    {
      id: 9,
      date: "April 20, 2024",
      title: "Coded Communications Intercepted",
      description: "Phone surveillance reveals conversations using money laundering terminology ('cleaning', 'washing', '10% commission for services').",
      location: "Digital surveillance",
      type: "communication",
      significance: "critical"
    },
    {
      id: 10,
      date: "May 10, 2024",
      title: "Large-Scale Family Distribution",
      description: "RM 1.2 million distributed to all 4 family member accounts within 72 hours. Largest single distribution event.",
      location: "Multiple bank transfers",
      type: "transfer",
      significance: "critical"
    },
    {
      id: 11,
      date: "May 25, 2024",
      title: "International Link Confirmed",
      description: "MLAT response from BVI confirms all three shell companies linked to illegal offshore gambling operations. Beneficial ownership obscured.",
      location: "International cooperation",
      type: "investigation",
      significance: "critical"
    },
    {
      id: 12,
      date: "June 15, 2024",
      title: "Final Offshore Transfer",
      description: "Last recorded transfer of RM 425,000. Total documented offshore receipts reach RM 8.5 million over 6-month investigation period.",
      location: "Bank Muamalat, Kuala Lumpur",
      type: "financial",
      significance: "high"
    },
    {
      id: 13,
      date: "June 18, 2024",
      title: "Case Compilation Complete",
      description: "All evidence gathered. Investigation paper prepared with 187 documented suspicious transactions. Recommendation for prosecution under Section 4(1)(b) AMLA.",
      location: "CCID Headquarters",
      type: "investigation",
      significance: "critical"
    }
  ];

  useEffect(() => {
    if (hasAnimated) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated) {
            setHasAnimated(true);
            observer.disconnect();
            
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

            let monthsCount = 0;
            const monthsInterval = setInterval(() => {
              monthsCount += 0.15;
              if (monthsCount >= 6) {
                setAnimatedStats(prev => ({ ...prev, months: 6 }));
                clearInterval(monthsInterval);
              } else {
                setAnimatedStats(prev => ({ ...prev, months: Math.floor(monthsCount) }));
              }
            }, 120);

            let amountCount = 0;
            const amountInterval = setInterval(() => {
              amountCount += 0.15;
              if (amountCount >= 8.5) {
                setAnimatedStats(prev => ({ ...prev, amount: 8.5 }));
                clearInterval(amountInterval);
              } else {
                setAnimatedStats(prev => ({ ...prev, amount: amountCount.toFixed(1) }));
              }
            }, 40);
          }
        });
      },
      { threshold: 0.3 }
    );

    if (summaryRef.current) {
      observer.observe(summaryRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [hasAnimated]);

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.38 }}
      className="timeline-section"
    >
      <h2 className="section-title-main">Timeline of Events</h2>
      <p className="section-description-sub">Chronological sequence of key events, transactions, and investigation milestones</p>

      <div className="timeline-container">
        <div className="timeline-main-line"></div>
        
        <div className="timeline-events-grid">
          {timelineEvents.map((event, index) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`timeline-event-wrapper ${index % 2 === 0 ? 'timeline-left' : 'timeline-right'}`}
              onClick={() => setActiveTimelineIndex(index)}
            >
              <div className={`timeline-event-card ${activeTimelineIndex === index ? 'active' : ''} timeline-${event.type}`}>
                <div className="timeline-event-header">
                </div>
                
                <div className="timeline-date">{event.date}</div>
                <h4 className="timeline-event-title">{event.title}</h4>
                <p className="timeline-event-description">{event.description}</p>
                
                <div className="timeline-event-footer">
                  <div className="timeline-location">
                    <MapPin size={14} />
                    <span>{event.location}</span>
                  </div>
                </div>
                
                <div className={`timeline-node timeline-node-${event.type}`}>
                  <div className="timeline-node-inner"></div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="timeline-summary-box" ref={summaryRef}>
          <div className="timeline-summary-header">
            <Activity size={20} />
            <h4>Investigation Period Summary</h4>
          </div>
          <div className="timeline-summary-stats">
            <div className="timeline-stat">
              <span className="timeline-stat-value">{animatedStats.events}</span>
              <span className="timeline-stat-label">Total Events</span>
            </div>
            <div className="timeline-stat">
              <span className="timeline-stat-value">{animatedStats.months} months</span>
              <span className="timeline-stat-label">Duration</span>
            </div>
            <div className="timeline-stat">
              <span className="timeline-stat-value">RM {animatedStats.amount}M</span>
              <span className="timeline-stat-label">Total Traced</span>
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
}

export default INVTimeline;