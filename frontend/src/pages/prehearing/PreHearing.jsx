import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import './PreHearing.css';


function TypewriterText({ text, speed = 30, onComplete }) {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    setDisplayText('');
    setCurrentIndex(0);
  }, [text]);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayText(prev => prev + text[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, speed);
      return () => clearTimeout(timeout);
    } else if (currentIndex === text.length && onComplete) {
      onComplete();
    }
  }, [currentIndex, text, speed, onComplete]);

  return <span>{displayText}</span>;
}


const ROUND_TOPICS = [
  { id: 1, title: "Round 1", subtitle: "" },
  { id: 2, title: "Round 2", subtitle: "" },
  { id: 3, title: "Round 3", subtitle: "" },
  { id: 4, title: "Round 4", subtitle: "" }
];

function PreHearing() {
  const [showHeader, setShowHeader] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [scrollTimeout, setScrollTimeout] = useState(null);
  

  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [lastMessageId, setLastMessageId] = useState(null);
  const [currentRound, setCurrentRound] = useState(ROUND_TOPICS[0]);
const [completedRounds, setCompletedRounds] = useState([{ id: 1, title: "Round 1", subtitle: "" }]);
const [roundTopics, setRoundTopics] = useState({});
const [roundConversations, setRoundConversations] = useState({});
const [roundStrategies, setRoundStrategies] = useState({});
const [roundCitations, setRoundCitations] = useState({});

  const [strategyPoints, setStrategyPoints] = useState([]);
  const [citationPoints, setCitationPoints] = useState([]);
  const [isLoadingStrategy, setIsLoadingStrategy] = useState(false);
  const [isLoadingCitation, setIsLoadingCitation] = useState(false);
  

  const [showRoleSwitch, setShowRoleSwitch] = useState(false);
  const [selectedRole, setSelectedRole] = useState('plaintiff');
  const [showRoundsPanel, setShowRoundsPanel] = useState(false);
  const [showSummaryPanel, setShowSummaryPanel] = useState(false);
  const [showSummaryPopup, setShowSummaryPopup] = useState(false);
const [selectedSummaryRound, setSelectedSummaryRound] = useState(null);
const [roundSummary, setRoundSummary] = useState('');
const [isLoadingSummary, setIsLoadingSummary] = useState(false);
const navigate = useNavigate();
const [isNavigating, setIsNavigating] = useState(false);

const handleNavigateHome = () => {
  setIsNavigating(true);
  setTimeout(() => {
    navigate('/', { state: { smoothTransition: true } });
  }, 250);
};

const handleNavigateBack = () => {
  setIsNavigating(true);
  setTimeout(() => {
    navigate('/pre-hearingsim', { state: { smoothTransition: true } });
  }, 250);
};
  
  

  const containerRef = useRef(null);
  const chatMessagesRef = useRef(null);
  const textareaRef = useRef(null);
  const strategyContentRef = useRef(null);
  const citationContentRef = useRef(null);


useEffect(() => {
  const initialMessage = selectedRole === 'plaintiff' 
    ? {
        role: 'defense',
        content: 'Your Honor, we are ready to proceed. The prosecution may begin their opening statement regarding the charges under AMLA Section 4.',
        timestamp: Date.now()
      }
    : {
        role: 'plaintiff',
        content: 'Your Honor, the prosecution is ready to present our case regarding the alleged violations under AMLA Section 4.',
        timestamp: Date.now()
      };
  

  if (!roundConversations[currentRound.id]) {
    setMessages([initialMessage]);
    setLastMessageId(initialMessage.timestamp); 
    setRoundConversations(prev => ({
      ...prev,
      [currentRound.id]: [initialMessage]
    }));
  }
}, [selectedRole]);


  useEffect(() => {
    if (chatMessagesRef.current) {
      chatMessagesRef.current.scrollTop = chatMessagesRef.current.scrollHeight;
    }
  }, [messages]);


  const handleTextareaInput = (e) => {
    e.target.style.height = 'auto';
    e.target.style.height = e.target.scrollHeight + 'px';
    setInputValue(e.target.value);
  };


  const handleSendMessage = async () => {
    if (!inputValue.trim() || isTyping) return;

    const userMessage = {
  role: selectedRole === 'plaintiff' ? 'plaintiff' : 'defense',
  content: inputValue.trim(),
  timestamp: Date.now()
};

  
setMessages(prev => {
  const updatedMessages = [...prev, userMessage];
  setRoundConversations(prevConv => ({
    ...prevConv,
    [currentRound.id]: updatedMessages
  }));
  return updatedMessages;
});
    const currentInputValue = inputValue.trim();
    setInputValue('');
    setIsTyping(true);

   
    if (!currentRound.subtitle && messages.length === 1) {

      const content = currentInputValue.toLowerCase();
      let generatedTopic = "";
      
      if (content.includes("mens rea") || content.includes("intent") || content.includes("knowledge")) {
        generatedTopic = "Intent & Knowledge (Mens Rea)";
      } else if (content.includes("digital") || content.includes("evidence") || content.includes("custody") || content.includes("chain")) {
        generatedTopic = "Digital Evidence Chain of Custody";
      } else if (content.includes("corporate") || content.includes("veil") || content.includes("piercing")) {
        generatedTopic = "Corporate Veil Piercing";
      } else if (content.includes("injunction") || content.includes("mareva") || content.includes("freezing")) {
        generatedTopic = "Mareva Injunction Defense";
      } else if (content.includes("fraud") || content.includes("misrepresentation")) {
        generatedTopic = "Fraud & Misrepresentation";
      } else if (content.includes("breach") || content.includes("contract")) {
        generatedTopic = "Breach of Contract";
      } else if (content.includes("negligence") || content.includes("duty of care")) {
        generatedTopic = "Negligence & Duty of Care";
      } else {
        
        const words = currentInputValue.split(' ').slice(0, 6).join(' ');
        generatedTopic = words.length > 50 ? words.substring(0, 50) + "..." : words;
      }
      
      const updatedRound = { ...currentRound, subtitle: generatedTopic };
      setCurrentRound(updatedRound);
      setCompletedRounds(prev => 
        prev.map(r => r.id === currentRound.id ? updatedRound : r)
      );
    }

  
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
    }

    try {
    
     const apiEndpoint = selectedRole === 'plaintiff' 
  ? 'http://localhost:5000/api/defense-counsel'
  : 'http://localhost:5000/api/plaintiff-counsel';

const response = await fetch(apiEndpoint, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    message: userMessage.content,
    conversationHistory: messages.map(m => ({ role: m.role, content: m.content })),
    roundTopic: currentRound.subtitle
  })
});

      const data = await response.json();

     if (data.success) {
  const aiMessage = {
    role: selectedRole === 'plaintiff' ? 'defense' : 'plaintiff',
    content: data.reply,
    timestamp: Date.now()
  };

  
  setMessages(prev => {
  const updatedMessages = [...prev, aiMessage];
  // Save conversation to current round
  setRoundConversations(prevConv => ({
    ...prevConv,
    [currentRound.id]: updatedMessages
  }));
  return updatedMessages;
});

setLastMessageId(aiMessage.timestamp); 
      


const conversationLength = messages.length + 2; 
if (conversationLength >= 5 && conversationLength % 4 === 1) { 
  setTimeout(() => analyzeAndUpdateStrategy([...messages, userMessage, aiMessage]), 1000);
}
      }
    } catch (error) {
  console.error('Error:', error);
  const errorMessage = {
    role: selectedRole === 'plaintiff' ? 'defense' : 'plaintiff',
    content: 'Your Honor, I request a brief recess. Technical difficulties.',
    timestamp: Date.now()
  };
  setMessages(prev => [...prev, errorMessage]);
} finally {
  setIsTyping(false);
}
  };

  // Analyze conversation and update strategy
  const analyzeAndUpdateStrategy = async (currentMessages) => {
    if (currentMessages.length < 3) return; // Need at least initial + 1 exchange

    try {
      const response = await fetch('http://localhost:5000/api/analyze-strategy', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          conversationHistory: currentMessages.map(m => ({ role: m.role, content: m.content })),
          roundTopic: currentRound.subtitle
        })
      });

      const analysis = await response.json();

      if (analysis.hasSignificantPoint) {
        // Update strategy
        if (analysis.strategyUpdate) {
  setIsLoadingStrategy(true);
  setTimeout(() => {
    setIsLoadingStrategy(false);
    setStrategyPoints(prev => {
      const updated = [...prev, analysis.strategyUpdate];
      // Save to current round
      setRoundStrategies(prevStrat => ({
        ...prevStrat,
        [currentRound.id]: updated
      }));
      return updated;
    });
  }, 1500);
}

        // Update citations
      if (analysis.citationUpdate) {
  setIsLoadingCitation(true);
  setTimeout(() => {
    setIsLoadingCitation(false);
    setCitationPoints(prev => {
      const updated = [...prev, analysis.citationUpdate];
      // Save to current round
      setRoundCitations(prevCit => ({
        ...prevCit,
        [currentRound.id]: updated
      }));
      return updated;
    });
  }, 1800);
}
      }
    } catch (error) {
      console.error('Strategy analysis error:', error);
    }
  };
  // Generate summary for a round
const generateRoundSummary = async (round) => {
  if (!roundConversations[round.id] || roundConversations[round.id].length <= 1) {
    return "No conversation yet in this round.";
  }

  setIsLoadingSummary(true);
  
  try {
    const response = await fetch('http://localhost:5000/api/generate-summary', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        conversationHistory: roundConversations[round.id].map(m => ({ 
          role: m.role, 
          content: m.content 
        })),
        roundTopic: round.subtitle || 'General Discussion'
      })
    });

    const data = await response.json();
    
    if (data.success) {
      return data.summary;
    } else {
      return "Unable to generate summary at this time.";
    }
  } catch (error) {
    console.error('Summary generation error:', error);
    return "Unable to generate summary at this time.";
  } finally {
    setIsLoadingSummary(false);
  }
};


const handleSummaryClick = async (round) => {
  setSelectedSummaryRound(round);
  setShowSummaryPopup(true);
  setShowSummaryPanel(false);
  
  const summary = await generateRoundSummary(round);
  setRoundSummary(summary);
};


  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };


const handleNewRound = () => {
  const nextRoundIndex = completedRounds.length;
  if (nextRoundIndex < 4) {
    const nextRound = { 
      id: nextRoundIndex + 1, 
      title: `Round ${nextRoundIndex + 1}`, 
      subtitle: "" 
    };
    setCompletedRounds([...completedRounds, nextRound]);
    setCurrentRound(nextRound);
    
    const initialMessage = selectedRole === 'plaintiff'
      ? {
          role: 'defense',
          content: 'Your Honor, we are ready to proceed. The prosecution may begin their opening statement.',
          timestamp: Date.now()
        }
      : {
          role: 'plaintiff',
          content: 'Your Honor, the prosecution is ready to present our case.',
          timestamp: Date.now()
        };
    
    setMessages([initialMessage]);
    setLastMessageId(initialMessage.timestamp); // Enable typing animation
    setRoundConversations(prev => ({
      ...prev,
      [nextRound.id]: [initialMessage]
    }));
    setStrategyPoints([]);
    setCitationPoints([]);
  }
  setShowRoundsPanel(false);
};


const handleRoundSelect = (round) => {
  setCurrentRound(round);
  setLastMessageId(null); 
  

  if (roundConversations[round.id]) {
    setMessages(roundConversations[round.id]);
  } else {
    const initialMessage = selectedRole === 'plaintiff'
      ? {
          role: 'defense',
          content: `Your Honor, we are ready to address the matter of ${round.subtitle || 'this case'}. The prosecution may proceed.`,
          timestamp: Date.now()
        }
      : {
          role: 'plaintiff',
          content: `Your Honor, the prosecution is ready to present our case regarding ${round.subtitle || 'this matter'}.`,
          timestamp: Date.now()
        };
    setMessages([initialMessage]);
    setRoundConversations(prev => ({
      ...prev,
      [round.id]: [initialMessage]
    }));
  }
  

  setStrategyPoints(roundStrategies[round.id] || []);
  setCitationPoints(roundCitations[round.id] || []);
  setShowRoundsPanel(false);
};


  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const currentScrollY = container.scrollTop;
          
          if (currentScrollY < 10) {
            if (scrollTimeout) clearTimeout(scrollTimeout);
            setShowHeader(true);
            setLastScrollY(currentScrollY);
            ticking = false;
            return;
          }
          
          if (scrollTimeout) clearTimeout(scrollTimeout);
          
          if (currentScrollY < lastScrollY) {
            setShowHeader(true);
            const timeout = setTimeout(() => {
              if (container.scrollTop >= 10) setShowHeader(false);
            }, 1400);
            setScrollTimeout(timeout);
          } else {
            setShowHeader(false);
          }
          
          setLastScrollY(currentScrollY);
          ticking = false;
        });
        ticking = true;
      }
    };

    container.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      container.removeEventListener('scroll', handleScroll);
      if (scrollTimeout) clearTimeout(scrollTimeout);
    };
  }, [lastScrollY, scrollTimeout]);


  useEffect(() => {
    const handleClickOutside = (event) => {
      if (showRoleSwitch && !event.target.closest('.shuffle-icon-wrapper')) {
        setShowRoleSwitch(false);
      }
      if (showRoundsPanel === 'clicked' && !event.target.closest('.chevron-wrapper')) {
        setShowRoundsPanel(false);
      }
      if (showSummaryPanel === 'clicked' && !event.target.closest('.chevron-wrapper-bottom')) {
        setShowSummaryPanel(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showRoleSwitch, showRoundsPanel, showSummaryPanel]);


  useEffect(() => {
    if (strategyContentRef.current) {
      strategyContentRef.current.scrollTop = strategyContentRef.current.scrollHeight;
    }
  }, [strategyPoints, isLoadingStrategy]);


  useEffect(() => {
    if (citationContentRef.current) {
      citationContentRef.current.scrollTop = citationContentRef.current.scrollHeight;
    }
  }, [citationPoints, isLoadingCitation]);

return (
   <motion.div 
  ref={containerRef} 
  className="pre-hearing-container"
  initial={{ opacity: 0 }}
  animate={{ 
    opacity: isNavigating ? 0 : 1
  }}
  exit={{ opacity: 0 }}
  transition={{ duration: 0.25, ease: "easeOut" }}
>
      {/* Header */}
      <div className={`header-pre-hearing ${showHeader ? 'header-visible' : 'header-hidden'}`}>
        <div className="top-panel">
          <div className="top-panel-border"></div>
          <div onClick={handleNavigateHome} style={{ cursor: 'pointer' }}>
  <div className="logo-background" onClick={handleNavigateHome} style={{ cursor: 'pointer' }}></div>
<div className="logo-letter" onClick={handleNavigateHome} style={{ cursor: 'pointer' }}>L</div>

<div className="brand-name" onClick={handleNavigateHome} style={{ cursor: 'pointer' }}>
  <span className="brand-le">LEGAL</span>
  <span className="brand-x">x</span>
 
</div>

<div className="brand-tagline" onClick={handleNavigateHome} style={{ cursor: 'pointer' }}>Legal Research</div>
</div>
          <div className="page-title">Pre Hearing Preparation</div>
          <div className="page-subtitle">
            Observe Strategy in Action - Watch how arguments unfold between prosecution and defense counsel
          </div>
          
          <div className="user-section">
            <div className="user-name">USER NAME</div>
            <div className="user-plan">Basic plan</div>
            <svg className="user-avatar-gradient" width="32" height="30" viewBox="0 0 32 30" fill="none">
              <ellipse cx="16" cy="15" rx="16" ry="15" fill="url(#paint0_linear_317_191)"/>
              <defs>
                <linearGradient id="paint0_linear_317_191" x1="16" y1="0" x2="16" y2="30" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#155DFC"/>
                  <stop offset="1" stopColor="#0D3796"/>
                </linearGradient>
              </defs>
            </svg>
            <svg className="user-avatar-bg" width="34" height="33" viewBox="0 0 34 33" fill="none">
              <ellipse cx="17" cy="16.5" rx="17" ry="16.5" fill="white"/>
            </svg>
            <div className="user-avatar-initial">A</div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="content-wrapper">
        {/* Left Chevrons */}
        <div className="chevrons-container">
          {/* Rounds Panel */}
          <div 
            className="chevron-wrapper"
            onMouseEnter={() => !showRoundsPanel && setShowRoundsPanel('hover')}
            onMouseLeave={() => showRoundsPanel === 'hover' && setShowRoundsPanel(false)}
          >
            <svg 
              className="left-chevron-top" 
              width="24" 
              height="24" 
              viewBox="0 0 24 24" 
              fill="none"
              onClick={() => setShowRoundsPanel(showRoundsPanel === 'clicked' ? false : 'clicked')}
              style={{ cursor: 'pointer' }}
            >
              <path d="M9 18L15 12L9 6" stroke="#A19494" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>

            {showRoundsPanel && (
              <div className="rounds-panel">
                <button className="start-new-round-btn" onClick={handleNewRound}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10"/>
                    <path d="M12 8v8M8 12h8"/>
                  </svg>
                  Start New Round
                </button>

                <div className="rounds-list">
                  {completedRounds.map(round => (
                    <div 
                      key={round.id} 
                      className="round-item"
                      onClick={() => handleRoundSelect(round)}
                      style={{ cursor: 'pointer' }}
                    >
                      <div className="round-title">{round.title}</div>
                      <div className="round-subtitle">{round.subtitle}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Summary Panel */}
          <div 
            className="chevron-wrapper chevron-wrapper-bottom"
            onMouseEnter={() => !showSummaryPanel && setShowSummaryPanel('hover')}
            onMouseLeave={() => showSummaryPanel === 'hover' && setShowSummaryPanel(false)}
          >
            <svg 
              className="left-chevron-bottom" 
              width="24" 
              height="24" 
              viewBox="0 0 24 24" 
              fill="none"
              onClick={() => setShowSummaryPanel(showSummaryPanel === 'clicked' ? false : 'clicked')}
              style={{ cursor: 'pointer' }}
            >
              <path d="M9 18L15 12L9 6" stroke="#A19494" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>

{showSummaryPanel && (
  <div className="summary-panel">
    <div className="summary-panel-title">View Summaries</div>
    <div className="rounds-list">
      {completedRounds.map(round => (
        <div 
          key={round.id} 
          className="round-item"
          onClick={() => handleSummaryClick(round)}
          style={{ cursor: 'pointer' }}
        >
          <div className="round-title">{round.title}</div>
          <div className="round-subtitle">{round.subtitle || 'No topic yet'}</div>
        </div>
      ))}
    </div>
  </div>
)}
          </div>
        </div>

        {/* Chat Container */}
        <div className="main-chat-container">
          <div className="chat-background">
            <div className="chat-messages-container" ref={chatMessagesRef}>
              {messages.map((msg, index) => (
                <div key={index} className={`message-wrapper ${
  (selectedRole === 'plaintiff' && msg.role === 'plaintiff') || 
  (selectedRole === 'defendant' && msg.role === 'defense')
    ? 'plaintiff-message-wrapper' 
    : 'defense-message-wrapper'
}`}>
                <div className="message-header">
  {(selectedRole === 'plaintiff' && msg.role === 'defense') || (selectedRole === 'defendant' && msg.role === 'plaintiff') ? (
    <>
      <div className="avatar-container">
        <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
          <circle cx="20" cy="20" r="20" fill="black"/>
        </svg>
        <svg className="avatar-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
          <path d="M12 8V4H8"/>
          <rect width="16" height="12" x="4" y="8" rx="2"/>
          <path d="M2 14h2"/>
          <path d="M20 14h2"/>
          <path d="M15 13v2"/>
          <path d="M9 13v2"/>
        </svg>
      </div>
      <div className="message-label">
        {selectedRole === 'plaintiff' ? 'Defense Counsel' : 'Plaintiff Counsel'}
      </div>
    </>
  ) : (
    <>
      <div className="message-label">
        You ({selectedRole === 'plaintiff' ? 'Plaintiff Counsel' : 'Defense Counsel'})
      </div>
      <div className="avatar-container">
        <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
          <circle cx="20" cy="20" r="20" fill="black"/>
        </svg>
        <svg className="avatar-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
          <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/>
          <circle cx="12" cy="7" r="4"/>
        </svg>
      </div>
    </>
  )}
</div>
  <div className={`message-bubble ${
  (selectedRole === 'plaintiff' && msg.role === 'plaintiff') || 
  (selectedRole === 'defendant' && msg.role === 'defense')
    ? 'plaintiff-bubble' 
    : 'defense-bubble'
}`}>
  {msg.timestamp === lastMessageId && index === messages.length - 1 && 
   ((selectedRole === 'plaintiff' && msg.role === 'defense') || 
    (selectedRole === 'defendant' && msg.role === 'plaintiff')) ? (
    <TypewriterText text={msg.content} speed={20} />
  ) : (
    msg.content
  )}
</div>
                </div>
              ))}
              {isTyping && (
                <div className="typing-indicator">
                  <span></span><span></span><span></span>
                </div>
              )}
            </div>
               {/* Role Switch Icon */}
            <div className="shuffle-icon-wrapper">
              <svg 
                className="shuffle-icon" 
                width="23" 
                height="21" 
                viewBox="0 0 23 21" 
                fill="none"
                onClick={() => setShowRoleSwitch(!showRoleSwitch)}
              >
                <path d="M7.66683 2.625L3.8335 6.125L7.66683 9.625" stroke="#545454" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M3.8335 6.125H19.1668" stroke="#545454" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M15.3335 18.375L19.1668 14.875L15.3335 11.375" stroke="#545454" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M19.1668 14.875H3.8335" stroke="#545454" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>

              {showRoleSwitch && (
                <div className="role-switch-card">
                  <div className="role-switch-title">Switch Roles</div>
                  
                  <div className="role-options">
                   <button
  onClick={() => { 
    if (selectedRole !== 'plaintiff') {
      setSelectedRole('plaintiff');
      setMessages([{
        role: 'defense',
        content: 'Your Honor, we are ready to proceed. The prosecution may begin their opening statement regarding the charges under AMLA Section 4.',
        timestamp: Date.now()
      }]);
      setStrategyPoints([]);
      setCitationPoints([]);
    }
    setShowRoleSwitch(false);
  }}
  className={`role-button ${selectedRole === 'plaintiff' ? 'active' : ''}`}
>
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/>
                        <circle cx="12" cy="7" r="4"/>
                      </svg>
                      Plaintiff
                    </button>

                    <button
  onClick={() => { 
    if (selectedRole !== 'defendant') {
      setSelectedRole('defendant');
      setMessages([{
        role: 'plaintiff',
        content: 'Your Honor, the prosecution is ready to present our case regarding the alleged violations under AMLA Section 4.',
        timestamp: Date.now()
      }]);
      setStrategyPoints([]);
      setCitationPoints([]);
    }
    setShowRoleSwitch(false);
  }}
  className={`role-button ${selectedRole === 'defendant' ? 'active' : ''}`}
>
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/>
                        <circle cx="12" cy="7" r="4"/>
                      </svg>
                      Defendant
                    </button>
                  </div>
                </div>
              )}
            </div>

           {/* Input Area */}
            <div className="input-container">
              <textarea 
                ref={textareaRef}
                className="chat-input" 
                placeholder="Type your argument here..."
                rows="1"
                value={inputValue}
                onInput={handleTextareaInput}
                onKeyPress={handleKeyPress}
                disabled={isTyping}
              />
            </div>

            <button className="mic-button">
              <svg width="24" height="28" viewBox="0 0 24 28" fill="none">
                <path d="M12 22.1344V25.6293" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M19 11.6497V13.9796C19 16.1424 18.2625 18.2166 16.9497 19.7459C15.637 21.2752 13.8565 22.1344 12 22.1344C10.1435 22.1344 8.36301 21.2752 7.05025 19.7459C5.7375 18.2166 5 16.1424 5 13.9796V11.6497" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M15 5.82483C15 3.89465 13.6569 2.32993 12 2.32993C10.3431 2.32993 9 3.89465 9 5.82483V13.9796C9 15.9098 10.3431 17.4745 12 17.4745C13.6569 17.4745 15 15.9098 15 13.9796V5.82483Z" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>

            <button className="send-button" onClick={handleSendMessage} disabled={isTyping || !inputValue.trim()}>
              <svg width="23" height="24" viewBox="0 0 23 24" fill="none">
                <path d="M13.9305 21.0529C13.9669 21.1448 14.0302 21.2233 14.1119 21.2777C14.1935 21.3321 14.2897 21.3599 14.3874 21.3574C14.4852 21.3548 14.5798 21.3221 14.6586 21.2635C14.7375 21.2049 14.7967 21.1233 14.8284 21.0296L21.0576 2.58428C21.0883 2.49826 21.0941 2.40517 21.0745 2.3159C21.0548 2.22664 21.0105 2.14488 20.9466 2.08021C20.8828 2.01554 20.8021 1.97063 20.714 1.95072C20.6259 1.93082 20.534 1.93675 20.4491 1.96781L2.24072 8.27806C2.14824 8.31019 2.06767 8.3702 2.00983 8.45006C1.95199 8.52991 1.91965 8.62577 1.91715 8.72478C1.91465 8.82379 1.9421 8.92121 1.99583 9.00395C2.04956 9.0867 2.12698 9.15082 2.21772 9.1877L9.81731 12.2749C10.0575 12.3723 10.2758 12.518 10.459 12.7032C10.6421 12.8884 10.7864 13.1093 10.883 13.3525L13.9305 21.0529Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
        </div>

        {/* Right Side Panels */}
        <div className="side-panel">
          {/* Strategy Panel */}
          <svg className="panel-indicator-first" width="10" height="11" viewBox="0 0 10 11" fill="none">
            <ellipse cx="5" cy="5.5" rx="5" ry="5.5" fill="white"/>
          </svg>
          <div className="panel-title-first">Strategy for this round</div>
          <div className="panel-box-first"></div>
          <div className="panel-content-first" ref={strategyContentRef}>
            {isLoadingStrategy && (
              <div className="summary-loading">
                <div className="skeleton-line"></div>
                <div className="skeleton-line"></div>
                <div className="skeleton-line"></div>
              </div>
            )}
            {!isLoadingStrategy && strategyPoints.length === 0 && (
              <span style={{ color: '#999', fontStyle: 'italic' }}>
                Strategy points will appear as the conversation progresses...
              </span>
            )}
            {!isLoadingStrategy && strategyPoints.map((point, index) => (
              <div key={index} className="strategy-point">
                {index + 1}. {point}
              </div>
            ))}
          </div>

          {/* Citations Panel */}
          <svg className="panel-indicator-second" width="10" height="11" viewBox="0 0 10 11" fill="none" style={{ top: '248px' }}>
            <ellipse cx="5" cy="5.5" rx="5" ry="5.5" fill="white"/>
          </svg>
          <div className="panel-title-second">Suggested Citations</div>
          <div className="panel-box-second"></div>
          <div className="panel-content-second panel-scrollable" ref={citationContentRef}>
            {isLoadingCitation && (
              <div className="summary-loading">
                <div className="skeleton-line"></div>
                <div className="skeleton-line"></div>
              </div>
            )}
            {!isLoadingCitation && citationPoints.length === 0 && (
                <span style={{ color: '#999', fontStyle: 'italic' }}>
                  Citations will appear as the conversation progresses...
                </span>
              )}
              {!isLoadingCitation && citationPoints.map((point, index) => (
                <div key={index} className="citation-point">
                  <span className="citation-link">{point}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Navigation Buttons */}
        <div className="navigation-buttons">
          <button onClick={handleNavigateBack} className="back-button">
            <svg width="18" height="19" viewBox="0 0 18 19" fill="none">
              <rect x="0.5" y="0.5" width="17" height="18" stroke="black"/>
              <path d="M9 15.0417L3.75 9.50001L9 3.95834" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M14.25 9.5H3.75" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span>Back</span>
          </button>

          <button onClick={handleNavigateHome} className="next-button">
 <svg width="10" height="10" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M3 9L12 2L21 9V20C21 20.5304 20.7893 21.0391 20.4142 21.4142C20.0391 21.7893 19.5304 22 19 22H5C4.46957 22 3.96086 21.7893 3.58579 21.4142C3.21071 21.0391 3 20.5304 3 20V9Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M9 22V12H15V22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
  <span>Home</span>
</button>
          
        </div>
        {/* Summary Popup */}
      {showSummaryPopup && (
        <div className="summary-popup-overlay" onClick={() => setShowSummaryPopup(false)}>
          <div className="summary-popup-content" onClick={(e) => e.stopPropagation()}>
            <div className="summary-popup-header">
              <h3>{selectedSummaryRound?.title} Summary</h3>
              <button 
                className="summary-close-btn"
                onClick={() => setShowSummaryPopup(false)}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </div>
            
            <div className="summary-popup-topic">
              <strong>Topic:</strong> {selectedSummaryRound?.subtitle || 'General Discussion'}
            </div>
            
            <div className="summary-popup-body">
              {isLoadingSummary ? (
                <div className="summary-loading">
                  <div className="skeleton-line"></div>
                  <div className="skeleton-line"></div>
                  <div className="skeleton-line"></div>
                  <div className="skeleton-line"></div>
                </div>
              ) : (
                <p>{roundSummary}</p>
              )}
            </div>
          </div>
        </div>
      )}
      </motion.div>
  );
}

export default PreHearing;