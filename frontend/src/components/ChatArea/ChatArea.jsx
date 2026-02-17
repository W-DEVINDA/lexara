import { useRef, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import MessageBubble from '../MessageBubble/MessageBubble';
import TypingIndicator from '../TypingIndicator/TypingIndicator';
import './ChatArea.css';

function ChatArea({ 
  messages, 
  inputMessage, 
  isLoading, 
  isLoadingOldConversation,
  isChatHistoryOpen,
  onInputChange, 
  onSendMessage, 
  onKeyPress 
}) {
  const messagesEndRef = useRef(null);

  
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className={`ca-chat-area${!isChatHistoryOpen ? ' ca-expanded' : ''}`}>
      <div className="ca-chat-header">LEXARA</div>
      
      <div className="ca-chat-messages">
        <AnimatePresence mode="sync">
          {messages.map((message, index) => (
            <MessageBubble 
              key={message.timestamp || index}
              message={message} 
              index={index}
              disableAnimation={isLoadingOldConversation}
            />
          ))}
          
          {isLoading && <TypingIndicator />}
        </AnimatePresence>
        <div ref={messagesEndRef} />
      </div>

      <div className="ca-chat-input-container">
        <input 
          type="text" 
          className="ca-chat-input" 
          placeholder="Type your legal question here..."
          value={inputMessage}
          onChange={onInputChange}
          onKeyPress={onKeyPress}
          disabled={isLoading}
        />
        <button 
          className="ca-send-btn" 
          onClick={onSendMessage}
          disabled={isLoading || !inputMessage.trim()}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M14.536 21.686C14.574 21.7807 14.6401 21.8615 14.7253 21.9175C14.8106 21.9736 14.9109 22.0022 15.0129 21.9996C15.1149 21.997 15.2136 21.9633 15.2959 21.9029C15.3781 21.8426 15.44 21.7585 15.473 21.662L21.973 2.662C22.0051 2.57339 22.0112 2.4775 21.9907 2.38555C21.9702 2.2936 21.9239 2.20939 21.8573 2.14277C21.7907 2.07616 21.7064 2.02989 21.6145 2.00939C21.5225 1.98888 21.4267 1.99499 21.338 2.027L2.33805 8.527C2.24155 8.56009 2.15747 8.62191 2.09712 8.70417C2.03677 8.78642 2.00302 8.88517 2.00041 8.98715C1.9978 9.08914 2.02644 9.18949 2.08251 9.27472C2.13857 9.35996 2.21937 9.426 2.31405 9.46399L10.2441 12.644C10.4947 12.7444 10.7225 12.8945 10.9136 13.0852C11.1047 13.276 11.2552 13.5035 11.356 13.754L14.536 21.686Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>
    </div>
  );
}

export default ChatArea;