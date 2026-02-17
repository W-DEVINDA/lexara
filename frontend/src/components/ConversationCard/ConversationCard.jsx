import './ConversationCard.css';

function ConversationCard({ 
  conversation, 
  isActive, 
  isHovered, 
  onSelect, 
  onDelete, 
  onMouseEnter, 
  onMouseLeave,
  formatTimestamp 
}) {
  return (
    <div 
      className={`cc-conversation-card ${isActive ? 'cc-active' : ''}`}
      onClick={() => onSelect(conversation.id)}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div className="cc-conversation-card-content">
        <div>
          <div className="cc-conversation-title">{conversation.title}</div>
          <div className="cc-conversation-meta">
            {formatTimestamp(conversation.timestamp)}. {conversation.messages.length} messages
          </div>
        </div>
        {isHovered && (
          <button 
            className="cc-delete-conversation-btn"
            onClick={(e) => onDelete(conversation.id, e)}
            title="Delete conversation"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 4L4 12M4 4L12 12" stroke="#B2BDCB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        )}
      </div>
    </div>
  );
}

export default ConversationCard;