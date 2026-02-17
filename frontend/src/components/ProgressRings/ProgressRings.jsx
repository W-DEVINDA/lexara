import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import './ProgressRings.css';


const ProgressRing = ({ percentage, delay = 0, hasAnimated, color, gradientId }) => {
  const radius = 65;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference * (1 - percentage / 100);
  const strokeWidth = 18;

  return (
    <svg width="174" height="174" viewBox="0 0 174 174" className="progress-ring">
      <defs>
        <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={color} stopOpacity="0.8" />
          <stop offset="100%" stopColor={color} stopOpacity="1" />
        </linearGradient>
      </defs>
      {/* Background circle */}
      <circle
        cx="87"
        cy="87"
        r={radius}
        fill="none"
        stroke="#F5F5F5"
        strokeWidth={strokeWidth}
      />
      {/* Progress circle with round end */}
      <motion.circle
        cx="87"
        cy="87"
        r={radius}
        fill="none"
        stroke={`url(#${gradientId})`}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        style={{
          transform: 'rotate(-90deg)',
          transformOrigin: '50% 50%',
        }}
        initial={{
          strokeDasharray: circumference,
          strokeDashoffset: circumference,
        }}
        animate={!hasAnimated ? {
          strokeDashoffset: offset,
        } : {
          strokeDasharray: circumference,
          strokeDashoffset: offset,
        }}
        transition={{
          duration: hasAnimated ? 0 : 1.8,
          delay: hasAnimated ? 0 : delay,
          ease: [0.25, 0.1, 0.25, 1],
        }}
      />
      {/* Flat cap at the start position (top) */}
      <rect
        x={87 - strokeWidth / 2}
        y={87 - radius - strokeWidth / 2}
        width={strokeWidth}
        height={strokeWidth}
        fill={`url(#${gradientId})`}
      />
    </svg>
  );
};

const ProgressRings = () => {
  const [hasAnimated, setHasAnimated] = useState(false);
  const [countedValues, setCountedValues] = useState({ val1: 0, val2: 0, val3: 0 });

  useEffect(() => {
    const timer = setTimeout(() => {
      setHasAnimated(true);
    }, 2500);
    
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (hasAnimated) return;

    const duration = 1800;
    const targets = { val1: 84, val2: 62, val3: 49 };
    const startTime = Date.now() + 500;

    const animate = () => {
      const now = Date.now();
      const elapsed = now - startTime;
      
      if (elapsed < 0) {
        requestAnimationFrame(animate);
        return;
      }

      const progress = Math.min(elapsed / duration, 1);
      const easeOut = 1 - Math.pow(1 - progress, 3);

      setCountedValues({
        val1: Math.round(easeOut * targets.val1),
        val2: Math.round(easeOut * targets.val2),
        val3: Math.round(easeOut * targets.val3),
      });

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [hasAnimated]);

  return (
    <section className="progress-rings-section">
      <div className="progress-rings-header">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M16 7H22V13" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M22 7L13.5 15.5L8.5 10.5L2 17" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        <h2 className="progress-rings-title">Strong prosecution case with comprehensive evidence trail</h2>
      </div>
      <p className="progress-rings-label">Case Strength Analysis</p>

      <div className="metrics-container">
        <motion.div 
          className="metric-item"
          initial={!hasAnimated ? { opacity: 0, y: 40 } : { opacity: 1, y: 0 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: hasAnimated ? 0 : 0.8, delay: hasAnimated ? 0 : 0.2, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="circular-progress">
            <svg width="154" height="143" viewBox="0 0 154 143" className="progress-blur">
              <ellipse cx="77" cy="71.5" rx="78.3567" ry="72.1142" fill="white"/>
            </svg>
            <ProgressRing percentage={84} delay={0.3} hasAnimated={hasAnimated} color="#027900" gradientId="greenGradient" />
            <motion.div 
              className="progress-value"
              initial={!hasAnimated ? { opacity: 0, scale: 0.5 } : { opacity: 1, scale: 1 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: hasAnimated ? 0 : 0.5, delay: hasAnimated ? 0 : 0.8 }}
            >
              {countedValues.val1}%
            </motion.div>
          </div>
          <h3 className="metric-title">Evidence Completeness</h3>
          <p className="metric-description">Comprehensive documentation with expert analysis</p>
        </motion.div>

        <motion.div 
          className="metric-item"
          initial={!hasAnimated ? { opacity: 0, y: 40 } : { opacity: 1, y: 0 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: hasAnimated ? 0 : 0.8, delay: hasAnimated ? 0 : 0.4, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="circular-progress">
            <svg width="154" height="147" viewBox="0 0 154 147" className="progress-blur">
              <ellipse cx="77" cy="73.5" rx="76.8912" ry="73.5229" fill="white"/>
            </svg>
            <ProgressRing percentage={62} delay={0.5} hasAnimated={hasAnimated} color="#FFD400" gradientId="yellowGradient" />
            <motion.div 
              className="progress-value"
              initial={!hasAnimated ? { opacity: 0, scale: 0.5 } : { opacity: 1, scale: 1 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: hasAnimated ? 0 : 0.5, delay: hasAnimated ? 0 : 1 }}
            >
              {countedValues.val2}%
            </motion.div>
          </div>
          <h3 className="metric-title">Asset Recovery Rate</h3>
          <p className="metric-description">Significant funds traceable and recoverable</p>
        </motion.div>

        <motion.div 
          className="metric-item"
          initial={!hasAnimated ? { opacity: 0, y: 40 } : { opacity: 1, y: 0 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: hasAnimated ? 0 : 0.8, delay: hasAnimated ? 0 : 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="circular-progress">
            <svg width="154" height="143" viewBox="0 0 154 143" className="progress-blur">
              <ellipse cx="77" cy="71.5" rx="78.3567" ry="72.1142" fill="white"/>
            </svg>
            <ProgressRing percentage={49} delay={0.7} hasAnimated={hasAnimated} color="#BD0000" gradientId="redGradient" />
            <motion.div 
              className="progress-value"
              initial={!hasAnimated ? { opacity: 0, scale: 0.5 } : { opacity: 1, scale: 1 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: hasAnimated ? 0 : 0.5, delay: hasAnimated ? 0 : 1.2 }}
            >
              {countedValues.val3}%
            </motion.div>
          </div>
          <h3 className="metric-title">Defense Weakness</h3>
          <p className="metric-description">Limited counter-evidence and weak alibis</p>
        </motion.div>
      </div>
    </section>
  );
};

export default ProgressRings;