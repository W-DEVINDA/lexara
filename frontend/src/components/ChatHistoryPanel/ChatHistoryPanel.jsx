import { useState } from 'react';
import { motion } from 'framer-motion';
import ConversationCard from '../ConversationCard/ConversationCard';
import './ChatHistoryPanel.css';

function ChatHistoryPanel({ 
  isOpen, 
  conversations, 
  currentConversationId,
  onNewChat,
  onSelectConversation,
  onDeleteConversation,
  groupConversationsByDate,
  formatTimestamp
}) {
  const [isPlusHovered, setIsPlusHovered] = useState(false);
  const [hoveredConversationId, setHoveredConversationId] = useState(null);

  const groupedConversations = groupConversationsByDate();

  return (
    <div 
      className={`chp-chat-history-panel${!isOpen ? ' chp-closed' : ''}`}
      style={{
        width: isOpen ? '287px' : '0',
        padding: isOpen ? '12px 14px' : '0',
        opacity: isOpen ? 1 : 0,
        borderRight: isOpen ? '1px solid #314158' : 'none',
        transition: 'all 0.4s ease',
        overflow: 'hidden'
      }}
    >
      <div className="chp-panel-header">
        <h2 className="chp-panel-title">Chat History</h2>
        <button 
          className="chp-new-chat-btn"
          onMouseEnter={() => setIsPlusHovered(true)}
          onMouseLeave={() => setIsPlusHovered(false)}
          onClick={onNewChat}
        >
          <motion.span
            className="chp-plus-sign"
            animate={{ rotate: isPlusHovered ? 360 : 0 }}
            transition={{ 
              duration: 1.0,
              repeat: isPlusHovered ? Infinity : 0,
              ease: "linear"
            }}
          >
            +
          </motion.span>
          <span>New Chat</span>
        </button>
      </div>
      <div className="chp-divider"></div>
      <div className="chp-recent-label">Recent Conversations</div>
      
      {groupedConversations.today.length > 0 && (
        <div className="chp-conversation-section">
          <div className="chp-section-label">TODAY</div>
          {groupedConversations.today.map(conv => (
            <ConversationCard
              key={conv.id}
              conversation={conv}
              isActive={currentConversationId === conv.id}
              isHovered={hoveredConversationId === conv.id}
              onSelect={onSelectConversation}
              onDelete={onDeleteConversation}
              onMouseEnter={() => setHoveredConversationId(conv.id)}
              onMouseLeave={() => setHoveredConversationId(null)}
              formatTimestamp={formatTimestamp}
            />
          ))}
        </div>
      )}

      {groupedConversations.yesterday.length > 0 && (
        <div className="chp-conversation-section">
          <div className="chp-section-label">YESTERDAY</div>
          {groupedConversations.yesterday.map(conv => (
            <ConversationCard
              key={conv.id}
              conversation={conv}
              isActive={currentConversationId === conv.id}
              isHovered={hoveredConversationId === conv.id}
              onSelect={onSelectConversation}
              onDelete={onDeleteConversation}
              onMouseEnter={() => setHoveredConversationId(conv.id)}
              onMouseLeave={() => setHoveredConversationId(null)}
              formatTimestamp={formatTimestamp}
            />
          ))}
        </div>
      )}

      {groupedConversations.older.length > 0 && (
        <div className="chp-conversation-section">
          <div className="chp-section-label">OLDER</div>
          {groupedConversations.older.map(conv => (
            <ConversationCard
              key={conv.id}
              conversation={conv}
              isActive={currentConversationId === conv.id}
              isHovered={hoveredConversationId === conv.id}
              onSelect={onSelectConversation}
              onDelete={onDeleteConversation}
              onMouseEnter={() => setHoveredConversationId(conv.id)}
              onMouseLeave={() => setHoveredConversationId(null)}
              formatTimestamp={formatTimestamp}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default ChatHistoryPanel;