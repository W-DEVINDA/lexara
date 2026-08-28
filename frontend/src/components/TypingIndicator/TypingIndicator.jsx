import { motion } from 'framer-motion';
import './TypingIndicator.css';

function TypingIndicator() {
  return (
    <motion.div
      className="mb-message mb-lexara-message"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
    >
      <motion.div
        className="mb-message-avatar"
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: "spring", stiffness: 200, damping: 15 }}
      >
        <span>L</span>
      </motion.div>
      
      <div className="mb-message-content">
        <div className="mb-message-sender">LEGALX</div>
        <div className="mb-message-bubble mb-lexara-bubble">
          <div className="ti-typing-indicator">
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default TypingIndicator;