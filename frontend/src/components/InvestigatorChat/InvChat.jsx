import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Minimize2, Maximize2 } from 'lucide-react';
import { motion } from 'framer-motion';
import './InvChat.css';

function InvChat() {
  const [isOpen, setIsOpen] = useState(false);
const [isMinimized, setIsMinimized] = useState(true);
const [position, setPosition] = useState({ x: 0, y: 0 });
const [isDragging, setIsDragging] = useState(false);
const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
const [isResizing, setIsResizing] = useState(false);
const [resizeDirection, setResizeDirection] = useState(null);
const [dimensions, setDimensions] = useState({ width: window.innerWidth * 0.9, height: window.innerHeight * 0.9 });
const [resizeStart, setResizeStart] = useState({ x: 0, y: 0, width: 0, height: 0 });
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: "Hello! I'm LEXARA. How can I help you with the investigator report ?"
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const messagesEndRef = useRef(null);

  const [typingText, setTypingText] = useState('');
  const [isTypingEffect, setIsTypingEffect] = useState(false);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);


  const handleSendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return;

    const userMessage = inputMessage.trim();
    setInputMessage('');

    // Add user message to chat
    const newMessages = [
      ...messages,
      { role: 'user', content: userMessage }
    ];
    setMessages(newMessages);
    setIsLoading(true);

    try {
      const response = await fetch('http://localhost:5000/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: userMessage,
          conversationHistory: messages
        }),
      });

      const data = await response.json();

      if (data.success && data.reply) {
        const fullText = data.reply;
        setIsTypingEffect(true);
        setTypingText('');
        
        let currentIndex = 0;
        const typingInterval = setInterval(() => {
          if (currentIndex <= fullText.length) {
            setTypingText(fullText.slice(0, currentIndex));
            currentIndex++;
          } else {
            clearInterval(typingInterval);
            setMessages([
              ...newMessages,
              { role: 'assistant', content: fullText }
            ]);
            setIsTypingEffect(false);
            setTypingText('');
          }
        }, 20); // Speed of typing (lower = faster)
      } else {
        throw new Error('Failed to get response');
      }
    } catch (error) {
      console.error('Chat error:', error);
      setMessages([
        ...newMessages,
        { 
          role: 'assistant', 
          content: "I apologize, but I'm having trouble connecting right now. Please try again in a moment." 
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };
const handleMouseDown = (e) => {
  if (e.target.closest('.lexara-invchat-header') && !e.target.closest('.lexara-resize-handle')) {
    setIsDragging(true);
    setDragStart({
      x: e.clientX - position.x,
      y: e.clientY - position.y
    });
  }
};

const handleMouseMove = (e) => {
  if (isDragging) {
    setPosition({
      x: e.clientX - dragStart.x,
      y: e.clientY - dragStart.y
    });
  }
};

const handleMouseUp = () => {
  setIsDragging(false);
};
const handleResizeStart = (e, direction) => {
  e.stopPropagation();
  setIsResizing(true);
  setResizeDirection(direction);
  setResizeStart({
    x: e.clientX,
    y: e.clientY,
    width: dimensions.width,
    height: dimensions.height
  });
};

const handleResizeMove = (e) => {
  if (!isResizing) return;

  const deltaX = e.clientX - resizeStart.x;
  const deltaY = e.clientY - resizeStart.y;

  let newWidth = dimensions.width;
  let newHeight = dimensions.height;
  let newPosX = position.x;
  let newPosY = position.y;

  if (resizeDirection.includes('e')) {
    newWidth = Math.max(400, resizeStart.width + deltaX);
  }
  if (resizeDirection.includes('w')) {
    newWidth = Math.max(400, resizeStart.width - deltaX);
    newPosX = position.x + deltaX;
  }
  if (resizeDirection.includes('s')) {
    newHeight = Math.max(400, resizeStart.height + deltaY);
  }
  if (resizeDirection.includes('n')) {
    newHeight = Math.max(400, resizeStart.height - deltaY);
    newPosY = position.y + deltaY;
  }

  setDimensions({ width: newWidth, height: newHeight });
  setPosition({ x: newPosX, y: newPosY });
};

const handleResizeEnd = () => {
  setIsResizing(false);
  setResizeDirection(null);
};
useEffect(() => {
  if (isDragging) {
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }
}, [isDragging, dragStart, position]);

useEffect(() => {
  if (isResizing) {
    document.addEventListener('mousemove', handleResizeMove);
    document.addEventListener('mouseup', handleResizeEnd);
    return () => {
      document.removeEventListener('mousemove', handleResizeMove);
      document.removeEventListener('mouseup', handleResizeEnd);
    };
  }
}, [isResizing, resizeStart, resizeDirection, dimensions, position]);
  return (
    <>
      {/* Floating Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="lexara-invchat-floating-btn"
          aria-label="Open chat"
        >
          <MessageSquare size={24} />
        </button>
      )}

      
         {/* Chat Window */}
{isOpen && (
<div 
  className={`lexara-invchat-window ${isMinimized ? 'minimized' : 'maximized'}`}
  style={!isMinimized ? {
    width: `${dimensions.width}px`,
    height: `${dimensions.height}px`,
    left: `50%`,
    top: `50%`,
    transform: `translate(calc(-50% + ${position.x}px), calc(-50% + ${position.y}px))`
  } : {}}
  onMouseDown={handleMouseDown}
>
    {/* Header */}
    <div className="lexara-invchat-header">
      <div className="lexara-invchat-header-info">
        <div className="lexara-invchat-avatar">L</div>
        <div>
          <div className="lexara-invchat-title">
            <span className="lexara-gruppo">LE</span>
            <span className="lexara-bruno">x</span>
            <span className="lexara-gruppo">ARA</span>
          </div>
          <div className="lexara-invchat-subtitle">Legal Assistant</div>
        </div>
      </div>
      <div className="lexara-invchat-header-controls">
      <button
  onClick={() => {
    setIsMinimized(!isMinimized);
    if (isMinimized) {
      // When maximizing, reset position and dimensions to 90% of screen
      setPosition({ x: 0, y: 0 });
      setDimensions({ 
        width: window.innerWidth * 0.9, 
        height: window.innerHeight * 0.9 
      });
    }
  }}
  className="lexara-invchat-minimize-btn"
  aria-label={isMinimized ? "Maximize chat" : "Minimize chat"}
  title={isMinimized ? "Maximize" : "Minimize"}
>
  {isMinimized ? <Maximize2 size={18} /> : <Minimize2 size={18} />}
</button>
        <button
          onClick={() => setIsOpen(false)}
          className="lexara-invchat-close-btn"
          aria-label="Close chat"
        >
          <X size={20} />
        </button>
      </div>
    </div>

          {/* Messages */}
          <div className="lexara-invchat-messages">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`lexara-invchat-message ${message.role === 'user' ? 'lexara-user-message' : 'lexara-assistant-message'}`}
              >
                <div className="lexara-message-content">
                  {message.content}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="lexara-invchat-message lexara-assistant-message">
                <div className="lexara-message-content lexara-typing-indicator">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
            )}
            {isTypingEffect && (
              <motion.div
                className="lexara-invchat-message lexara-assistant-message"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
              >
                <div className="lexara-message-content">
                  {typingText}
                </div>
              </motion.div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="lexara-invchat-input-container">
            <textarea
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type your investigation query..."
              className="lexara-invchat-input"
              rows="1"
              disabled={isLoading}
            />
            <button
              onClick={handleSendMessage}
              className="lexara-invchat-send-btn"
              disabled={!inputMessage.trim() || isLoading}
            >
              <Send size={20} />
            </button>
          </div>
          {!isMinimized && (
  <>
    <div className="lexara-resize-handle lexara-resize-n" onMouseDown={(e) => handleResizeStart(e, 'n')} />
    <div className="lexara-resize-handle lexara-resize-s" onMouseDown={(e) => handleResizeStart(e, 's')} />
    <div className="lexara-resize-handle lexara-resize-e" onMouseDown={(e) => handleResizeStart(e, 'e')} />
    <div className="lexara-resize-handle lexara-resize-w" onMouseDown={(e) => handleResizeStart(e, 'w')} />
    <div className="lexara-resize-handle lexara-resize-ne" onMouseDown={(e) => handleResizeStart(e, 'ne')} />
    <div className="lexara-resize-handle lexara-resize-nw" onMouseDown={(e) => handleResizeStart(e, 'nw')} />
    <div className="lexara-resize-handle lexara-resize-se" onMouseDown={(e) => handleResizeStart(e, 'se')} />
    <div className="lexara-resize-handle lexara-resize-sw" onMouseDown={(e) => handleResizeStart(e, 'sw')} />
  </>
)}
        </div>
      )}
    </>
  );
}

export default InvChat;