import { motion } from 'framer-motion';
import TypewriterText from '../TypewriterText/TypewriterText';
import './MessageBubble.css';

function MessageBubble({ message, index, disableAnimation }) {
  const isUser = message.role === 'user';
  const isInitial = message.isInitial;

  if (disableAnimation) {
    return (
      <div className={`mb-message ${isUser ? 'mb-user-message' : 'mb-legalx-message'}`}>
        {!isUser && (
          <div className="mb-message-avatar">
            <span>L</span>
          </div>
        )}
        
        <div className="mb-message-content">
          <div className="mb-message-sender">
            {isUser ? 'YOU' : 'LEGALX'}
          </div>
          
          <div className={`mb-message-bubble ${isUser ? 'mb-user-bubble' : 'mb-legalx-bubble'}`}>
            {message.content}
          </div>
        </div>
        
        {isUser && (
          <div className="mb-message-avatar">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M19 21V19C19 17.9391 18.5786 16.9217 17.8284 16.1716C17.0783 15.4214 16.0609 15 15 15H9C7.93913 15 6.92172 15.4214 6.17157 16.1716C5.42143 16.9217 5 17.9391 5 19V21" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M12 11C14.2091 11 16 9.20914 16 7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7C8 9.20914 9.79086 11 12 11Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        )}
      </div>
    );
  }

  const initialGreetingVariants = {
    hidden: { 
      scale: 0,
      opacity: 0,
      y: 20
    },
    visible: {
      scale: 1,
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 15,
        delay: 0.2
      }
    }
  };

  const lexaraResponseVariants = {
    hidden: { 
      x: -50,
      opacity: 0,
      scale: 0.9
    },
    visible: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 150,
        damping: 20
      }
    }
  };

  return (
    <motion.div
      variants={!isUser ? (isInitial ? initialGreetingVariants : lexaraResponseVariants) : undefined}
      initial={!isUser ? "hidden" : undefined}
      animate={!isUser ? "visible" : undefined}
      className={`mb-message ${isUser ? 'mb-user-message' : 'mb-legalx-message'}`}
    >
      {!isUser && (
        <motion.div
          className="mb-message-avatar"
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ 
            type: "spring",
            stiffness: 200,
            damping: 15,
            delay: isInitial ? 0.3 : 0.1
          }}
        >
          <span>L</span>
        </motion.div>
      )}
      
      <div className="mb-message-content">
        <motion.div
          className="mb-message-sender"
          initial={!isUser ? { opacity: 0, y: -10 } : undefined}
          animate={!isUser ? { opacity: 1, y: 0 } : undefined}
          transition={!isUser ? { delay: isInitial ? 0.5 : 0.2 } : undefined}
        >
          {isUser ? 'YOU' : 'LEGALX'}
        </motion.div>
        
        <motion.div
          className={`mb-message-bubble ${isUser ? 'mb-user-bubble' : 'mb-lexara-bubble'}`}
          initial={!isUser ? { opacity: 0 } : undefined}
          animate={!isUser ? { opacity: 1 } : undefined}
          transition={!isUser ? { delay: isInitial ? 0.6 : 0.3 } : undefined}
        >
          {!isUser ? (
            <TypewriterText 
              text={message.content} 
              speed={10}
              startDelay={100}
            />
          ) : (
            message.content
          )}
        </motion.div>
      </div>
      
      {isUser && (
        <div className="mb-message-avatar">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M19 21V19C19 17.9391 18.5786 16.9217 17.8284 16.1716C17.0783 15.4214 16.0609 15 15 15H9C7.93913 15 6.92172 15.4214 6.17157 16.1716C5.42143 16.9217 5 17.9391 5 19V21" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M12 11C14.2091 11 16 9.20914 16 7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7C8 9.20914 9.79086 11 12 11Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      )}
    </motion.div>
  );
}

export default MessageBubble;