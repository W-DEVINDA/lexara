import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import './AnalyzingAnimation.css';

const AnalyzingAnimation = () => {
  const navigate = useNavigate();
const [dots, setDots] = useState('');
const [scanPosition, setScanPosition] = useState(0);
const [shimmerPosition, setShimmerPosition] = useState(0);

  useEffect(() => {
  // Dots animation
  const dotsInterval = setInterval(() => {
    setDots(prev => {
      if (prev === '...') return '';
      return prev + '.';
    });
  }, 300);

  // Scanning line animation
  let direction = 1;
  let position = 0;
  const scanInterval = setInterval(() => {
    position += direction * 2;
    if (position >= 100) {
      direction = -1;
      position = 100;
    } else if (position <= 0) {
      direction = 1;
      position = 0;
    }
    setScanPosition(position);
  }, 20);

  // Shimmer animation
  let shimmerDir = 1;
  let shimmerPos = 0;
  const shimmerInterval = setInterval(() => {
    shimmerPos += shimmerDir * 2;
    if (shimmerPos >= 100) {
      shimmerDir = -1;
      shimmerPos = 100;
    } else if (shimmerPos <= 0) {
      shimmerDir = 1;
      shimmerPos = 0;
    }
    setShimmerPosition(shimmerPos);
  }, 20);

  return () => {
    clearInterval(dotsInterval);
    clearInterval(scanInterval);
    clearInterval(shimmerInterval);
  };
}, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="analyzing-overlay"
    >
      {/* Background Grid */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.03 }}
        transition={{ duration: 0.5 }}
        className="analyzing-background-grid"
      />

      {/* Scanning Line */}
      <div 
        className="analyzing-scanning-line"
        style={{ top: `${scanPosition}%` }}
      />

      {/* Main Content */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="analyzing-content"
      >
        {/* Analyzing Text */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
          className="analyzing-text"
        >
          <span>Analyzing</span>
          <span className="analyzing-dots">{dots}</span>
        </motion.div>

        {/* Progress Bar */}
       <motion.div
  initial={{ opacity: 0, width: 0 }}
  animate={{ opacity: 1, width: '300px' }}
  transition={{ duration: 0.4, delay: 0.3 }}
  className="analyzing-progress-bar"
>
  <div 
    className="analyzing-progress-shimmer"
    style={{ left: `${shimmerPosition}%`, transform: 'translateX(-50%)' }}
  />
</motion.div>
        {/* Subtext */}
        <div className="analyzing-subtext">
          Processing your case data
        </div>
      </motion.div>

      {/* Corner Decorations */}
      <div className="analyzing-corner analyzing-corner-tl" />
      <div className="analyzing-corner analyzing-corner-tr" />
      <div className="analyzing-corner analyzing-corner-bl" />
      <div className="analyzing-corner analyzing-corner-br" />
    </motion.div>
  );
};

export default AnalyzingAnimation;