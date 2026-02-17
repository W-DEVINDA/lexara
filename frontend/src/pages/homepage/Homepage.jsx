import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import LeftSidebar from '../../components/LeftSidebar/LeftSidebar';
import ChatHistoryPanel from '../../components/ChatHistoryPanel/ChatHistoryPanel';
import ChatArea from '../../components/ChatArea/ChatArea';
import ResearchToolsPanel from '../../components/ResearchToolsPanel/ResearchToolsPanel';
import ResourceModal from '../../components/ResourceModal/ResourceModal';
import { researchContent } from './researchContent';
import { useLocation } from 'react-router-dom'; 
import './Homepage.css';

function Homepage() {
  const location = useLocation();
  const fromTransition = location.state?.smoothTransition;
  const [placeholderText, setPlaceholderText] = useState('Search across all ');
  const staticText = 'Search across all ';
  const categories = ['malaysian acts', 'leading cases', 'legal researches'];
  const [currentCategoryIndex, setCurrentCategoryIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isChatHistoryOpen, setIsChatHistoryOpen] = useState(true);
  const [isFirstEverChat, setIsFirstEverChat] = useState(true);
  
  // Modal state for Research Tools
  const [selectedResource, setSelectedResource] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Chat History Management
  const [conversations, setConversations] = useState([]);
  const [currentConversationId, setCurrentConversationId] = useState(null);
  
  // Track if we're loading an old conversation (to disable animations)
  const [isLoadingOldConversation, setIsLoadingOldConversation] = useState(false);
  
  // Current chat states
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: "Hello! I'm your Lexara...Your Legal Assistant. How may I help you today?",
      isInitial: true,
      timestamp: Date.now()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Initialize with first conversation
  useEffect(() => {
    const initialConversation = {
      id: Date.now(),
      title: 'New Conversation',
      messages: [
        {
          role: 'assistant',
          content: "Hello! I'm your Lexara...Your Legal Assistant. How may I help you today?",
          isInitial: true,
          timestamp: Date.now()
        }
      ],
      timestamp: new Date().toISOString(),
      lastUpdated: new Date().toISOString()
    };
    
    setConversations([initialConversation]);
    setCurrentConversationId(initialConversation.id);
    setIsFirstEverChat(false);
  }, []);

  // Generate meaningful title using AI
  const generateConversationTitle = async (userMessage) => {
    try {
      const response = await fetch('http://localhost:5000/api/generate-title', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: userMessage }),
      });

      if (response.ok) {
        const data = await response.json();
        return data.title || userMessage.substring(0, 30) + '...';
      }
    } catch (error) {
      console.error('Error generating title:', error);
    }
    
    return userMessage.substring(0, 30) + (userMessage.length > 30 ? '...' : '');
  };

  // Save current conversation whenever messages change
  useEffect(() => {
    if (currentConversationId && messages.length > 0 && !isLoadingOldConversation) {
      setConversations(prev => prev.map(conv => {
        if (conv.id === currentConversationId) {
          return {
            ...conv,
            messages: [...messages],
            lastUpdated: new Date().toISOString()
          };
        }
        return conv;
      }));
    }
  }, [messages, currentConversationId, isLoadingOldConversation]);

  // Typing animation effect
  useEffect(() => {
    let timeout;
    const currentCategory = categories[currentCategoryIndex];
    
    if (currentText.length < currentCategory.length) {
      timeout = setTimeout(() => {
        setCurrentText(currentCategory.slice(0, currentText.length + 1));
      }, 80); 
    } else {
      timeout = setTimeout(() => {
        setCurrentText('');
        setCurrentCategoryIndex((prev) => (prev + 1) % categories.length);
      }, 2800); 
    }

    setPlaceholderText(staticText + currentText);

    return () => clearTimeout(timeout);
  }, [currentText, currentCategoryIndex]);

  const toggleChatHistory = () => {
    setIsChatHistoryOpen(!isChatHistoryOpen);
  };

  // Create new chat
  const handleNewChat = () => {
    const newConversation = {
      id: Date.now(),
      title: 'New Conversation',
      messages: [
        {
          role: 'assistant',
          content: isFirstEverChat 
            ? "Hello! I'm your Lexara...Your Legal Assistant. How may I help you today?"
            : "Hi! How may I assist you today",
          isInitial: true,
          timestamp: Date.now()
        }
      ],
      timestamp: new Date().toISOString(),
      lastUpdated: new Date().toISOString()
    };
    
    setConversations(prev => [newConversation, ...prev]);
    setCurrentConversationId(newConversation.id);
    setIsLoadingOldConversation(false);
    setMessages(newConversation.messages);
    setInputMessage('');
    setIsFirstEverChat(false);
  };

  // Delete conversation
  const handleDeleteConversation = (conversationId, e) => {
    e.stopPropagation();
    
    setConversations(prev => {
      const filtered = prev.filter(conv => conv.id !== conversationId);
      
      if (conversationId === currentConversationId) {
        if (filtered.length > 0) {
          setCurrentConversationId(filtered[0].id);
          setIsLoadingOldConversation(true);
          setMessages([...filtered[0].messages]);
        } else {
          const newConv = {
            id: Date.now(),
            title: 'New Conversation',
            messages: [
              {
                role: 'assistant',
                content: "Hi! How may I assist you today",
                isInitial: true,
                timestamp: Date.now()
              }
            ],
            timestamp: new Date().toISOString(),
            lastUpdated: new Date().toISOString()
          };
          setCurrentConversationId(newConv.id);
          setIsLoadingOldConversation(false);
          setMessages(newConv.messages);
          return [newConv];
        }
      }
      
      return filtered;
    });
  };

  // Switch to existing conversation
  const handleSelectConversation = (conversationId) => {
    const conversation = conversations.find(conv => conv.id === conversationId);
    if (conversation) {
      setCurrentConversationId(conversationId);
      setIsLoadingOldConversation(true);
      setMessages([...conversation.messages]);
    }
  };

  // Group conversations by date
  const groupConversationsByDate = () => {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    
    const groups = {
      today: [],
      yesterday: [],
      older: []
    };
    
    conversations.forEach(conv => {
      const convDate = new Date(conv.lastUpdated);
      const convDateOnly = new Date(convDate.getFullYear(), convDate.getMonth(), convDate.getDate());
      
      if (convDateOnly.getTime() === today.getTime()) {
        groups.today.push(conv);
      } else if (convDateOnly.getTime() === yesterday.getTime()) {
        groups.yesterday.push(conv);
      } else {
        groups.older.push(conv);
      }
    });
    
    return groups;
  };

  // Format timestamp
  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    
    if (diffMins < 60) {
      return `${diffMins} ${diffMins === 1 ? 'minute' : 'minutes'} ago`;
    } else if (diffHours < 24) {
      return `${diffHours} ${diffHours === 1 ? 'hour' : 'hours'} ago`;
    } else {
      return date.toLocaleDateString();
    }
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return;

    const userMessage = inputMessage.trim();
    setInputMessage('');

    const newMessages = [...messages, { 
      role: 'user', 
      content: userMessage,
      timestamp: Date.now()
    }];
    setMessages(newMessages);
    setIsLoading(true);
    setIsLoadingOldConversation(false);

    const currentConv = conversations.find(c => c.id === currentConversationId);
    if (currentConv && currentConv.title === 'New Conversation') {
      const title = await generateConversationTitle(userMessage);
      setConversations(prev => prev.map(conv => 
        conv.id === currentConversationId ? { ...conv, title } : conv
      ));
    }

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

      if (!response.ok) {
        throw new Error('Failed to get response from server');
      }

      const data = await response.json();

      setMessages([...newMessages, { 
        role: 'assistant', 
        content: data.reply,
        isInitial: false,
        timestamp: Date.now()
      }]);

    } catch (error) {
      console.error('Error sending message:', error);
      setMessages([...newMessages, { 
        role: 'assistant', 
        content: 'I apologize, but I encountered an error. Please try again.',
        isInitial: false,
        timestamp: Date.now()
      }]);
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

  // Handle resource click
  const handleResourceClick = (resourceKey) => {
    setSelectedResource(researchContent[resourceKey]);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedResource(null), 300);
  };

return (
  <motion.div 
    className="homepage"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.25, ease: "easeOut" }}
  >
    <header className="top-panel">
        <div className="logo-section">
          <div className="logo-box">
            <span className="logo-letter">L</span>
          </div>
          <div className="logo-text">
            <div className="brand-name">
              <span className="gruppo">LE</span>
              <span className="bruno">x</span>
              <span className="gruppo">ARA</span>
            </div>
            <div className="tagline">Legal Research</div>
          </div>
        </div>

        <div className="search-container">
          <svg className="search-icon" width="21" height="23" viewBox="0 0 21 23" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M18.375 20.125L14.5775 15.9658" stroke="#314158" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M9.625 18.2083C13.491 18.2083 16.625 14.7758 16.625 10.5417C16.625 6.30748 13.491 2.875 9.625 2.875C5.75901 2.875 2.625 6.30748 2.625 10.5417C2.625 14.7758 5.75901 18.2083 9.625 18.2083Z" stroke="#314158" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <motion.input 
            type="text" 
            className="search-input" 
            placeholder={placeholderText}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          />
        </div>

        <div className="user-section">
          <div className="user-info">
            <div className="user-name">Ahmad Rahman</div>
            <div className="user-plan">Professional plan</div>
          </div>
          <div className="user-avatar">
            <span className="avatar-letter">A</span>
          </div>
          <svg className="notification-bell" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M15 6.66667C15 5.34058 14.4732 4.06881 13.5355 3.13113C12.5979 2.19345 11.3261 1.66667 10 1.66667C8.67392 1.66667 7.40215 2.19345 6.46447 3.13113C5.52678 4.06881 5 5.34058 5 6.66667C5 12.5 2.5 14.1667 2.5 14.1667H17.5C17.5 14.1667 15 12.5 15 6.66667Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M11.4417 17.5C11.2952 17.7526 11.0849 17.9622 10.8319 18.1079C10.5789 18.2537 10.292 18.3304 10 18.3304C9.70802 18.3304 9.42113 18.2537 9.16814 18.1079C8.91515 17.9622 8.70484 17.7526 8.55835 17.5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      </header>

      <div className="main-content">
        <LeftSidebar toggleChatHistory={toggleChatHistory} />

        <ChatHistoryPanel
          isOpen={isChatHistoryOpen}
          conversations={conversations}
          currentConversationId={currentConversationId}
          onNewChat={handleNewChat}
          onSelectConversation={handleSelectConversation}
          onDeleteConversation={handleDeleteConversation}
          groupConversationsByDate={groupConversationsByDate}
          formatTimestamp={formatTimestamp}
        />

        <ChatArea
          messages={messages}
          inputMessage={inputMessage}
          isLoading={isLoading}
          isLoadingOldConversation={isLoadingOldConversation}
          isChatHistoryOpen={isChatHistoryOpen}
          onInputChange={(e) => setInputMessage(e.target.value)}
          onSendMessage={handleSendMessage}
          onKeyPress={handleKeyPress}
        />

        <ResearchToolsPanel onResourceClick={handleResourceClick} />
      </div>

      <ResourceModal
        isOpen={isModalOpen}
        resource={selectedResource}
        onClose={closeModal}
      />
    </motion.div>
  );
}

export default Homepage;