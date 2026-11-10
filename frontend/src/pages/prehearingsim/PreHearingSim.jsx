import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import './PreHearingSim.css';


function TypewriterText({ text, speed = 30, startDelay = 0, onComplete }) {
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
      }, currentIndex === 0 ? startDelay : speed);

      return () => clearTimeout(timeout);
    } else if (currentIndex === text.length && onComplete) {
      onComplete();
    }
  }, [currentIndex, text, speed, startDelay, onComplete]);

  return <span>{displayText}</span>;
}

const CONVERSATION_DATA = [
  {
    role: 'defense',
    message: 'Your Honor, the prosecution has failed to establish that my client had actual knowledge these funds were proceeds of crime. The use of offshore entities is standard business practice, not evidence of criminal intent under AMLA Section 4.'
  },
  {
    role: 'plaintiff',
    message: 'Standard business practice doesn\'t involve eight shell companies with nominee directors. PP v. Najib establishes that circumstantial evidence proves knowledge - and we have 247 emails discussing "structuring transactions" and "avoiding detection."'
  },
  {
    role: 'defense',
    message: 'Those emails are taken out of context, Your Honor. "Structuring" refers to legal tax optimization. The prosecution must prove beyond reasonable doubt that my client knew these were criminal proceeds - the chain of custody for digital evidence is fundamentally flawed.'
  },
  {
    role: 'plaintiff',
    message: 'The chain of custody is impeccable. Our forensic expert, Ahmad bin Hassan, is CISSP and EnCE certified, followed ISO/IEC 27037 standards. The blockchain analysis clearly traces RM 31.2 million through these exact shell companies to my client\'s personal accounts.'
  },
  {
    role: 'defense',
    message: 'Blockchain analysis is circumstantial at best. These cryptocurrency transactions could have been conducted by anyone with access to those wallets. The prosecution cannot definitively link my client to those specific transactions without biometric or documentary proof.'
  },
  {
    role: 'plaintiff',
    message: 'We have documentary proof - 187 falsified invoices bearing your client\'s digital signature, authorized from his IP address. The pattern analysis shows transactions consistently occurred during his working hours, from devices registered to him.'
  },
  {
    role: 'defense',
    message: 'IP addresses can be spoofed, Your Honor. Digital signatures can be compromised. What the prosecution lacks is direct evidence of criminal intent. My client believed these were legitimate business transactions approved by the board.'
  },
  {
    role: 'plaintiff',
    message: 'The board never approved these transactions - we have sworn testimony from six board members. Your client systematically bypassed board oversight, used nominee directors he personally appointed, and encrypted communications reveal he knew these funds were embezzled.'
  },
  {
    role: 'defense',
    message: 'Encrypted communications are subject to interpretation. The prosecution cherry-picks phrases while ignoring exculpatory context. Furthermore, the recovery of 73.6% of alleged proceeds undermines the prosecution\'s claim of systematic criminal intent.'
  },
  {
    role: 'plaintiff',
    message: 'Recovery doesn\'t negate guilt - it demonstrates our thorough investigation. RM 11.15 million remains hidden in BVI accounts your client controls. The systematic nature, the concealment efforts, the falsified records - this is textbook money laundering under Section 4 of AMLA 2001, Your Honor.'
  }
];

function PreHearingSim() {
  const [showHeader, setShowHeader] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [messages, setMessages] = useState([]);
  const [isSimulating, setIsSimulating] = useState(false);
  const [summaryPoints, setSummaryPoints] = useState([]);
  const [isLoadingSummary, setIsLoadingSummary] = useState(false);
  const containerRef = useRef(null);
  const chatMessagesRef = useRef(null);
  const summaryContentRef = useRef(null);
  const [scrollTimeout, setScrollTimeout] = useState(null);
  const simulationStartedRef = useRef(false);
  const [finalSummary, setFinalSummary] = useState('');
  const [showFinalSummary, setShowFinalSummary] = useState(false);
  const [isTypingFinalSummary, setIsTypingFinalSummary] = useState(false);
  const navigate = useNavigate();
  const [isNavigating, setIsNavigating] = useState(false);


  useEffect(() => {
    if (chatMessagesRef.current) {
      chatMessagesRef.current.scrollTop = chatMessagesRef.current.scrollHeight;
    }
  }, [messages]);

 
  useEffect(() => {
    if (!simulationStartedRef.current) {
      simulationStartedRef.current = true;
      startSimulation();
    }
  }, []);

  const generateSummary = (messageIndex) => {

  setIsLoadingSummary(true);
  

  setTimeout(() => {
    setIsLoadingSummary(false);
    

    const summaries = [
      "Defense argues offshore entities are standard business practice",
      "Prosecution cites PP v. Najib for circumstantial evidence standard",
      "Defense questions chain of custody for digital evidence",
      "Prosecution establishes expert credentials (CISSP/EnCE certified)",
      "Defense challenges blockchain analysis reliability",
      "Prosecution presents 187 falsified invoices with digital signatures",
      "Defense argues IP addresses can be spoofed",
      "Prosecution confirms board never approved transactions",
      "Defense notes 73.6% recovery undermines intent claim",
      "Prosecution identifies RM 11.15M still hidden in BVI accounts"
    ];
    
    if (messageIndex < summaries.length) {
      setSummaryPoints(prev => [...prev, summaries[messageIndex]]);
    }
    
    
    if (messageIndex === summaries.length - 1) {
      setTimeout(() => {
        setShowFinalSummary(true);
        setIsTypingFinalSummary(true);
        const fullSummary = "The defense strategy centers on challenging the prosecution's evidence quality and the defendant's knowledge of criminal activity, emphasizing reasonable doubt and procedural flaws. The prosecution counters with robust forensic evidence, expert testimony, and documented patterns of deception spanning 187 transactions. The case hinges on whether circumstantial evidence and systematic behavior patterns sufficiently prove criminal intent under AMLA Section 4.";
        setFinalSummary(fullSummary);
      }, 2000);
    }
  }, 1500);
};
const handleNavigateNext = () => {
  setIsNavigating(true);
  setTimeout(() => {
    navigate('/pre-hearing', { state: { smoothTransition: true } });
  }, 250);
};

const handleNavigateBack = () => {
  setIsNavigating(true);
  setTimeout(() => {
    navigate('/case-analysis', { state: { smoothTransition: true } });
  }, 250);
};

const handleNavigateHome = () => {
  setIsNavigating(true);
  setTimeout(() => {
    navigate('/', { state: { smoothTransition: true } });
  }, 250);
};
  const startSimulation = () => {
    setIsSimulating(true);
    setMessages([]);
    setSummaryPoints([]); 
    

    CONVERSATION_DATA.forEach((msg, index) => {
      setTimeout(() => {
        setMessages(prev => {
         
          const exists = prev.some((m, i) => i === index && m.message === msg.message);
          if (exists) return prev;
          return [...prev, msg];
        });
        
        
        setTimeout(() => {
          generateSummary(index);
        }, 3000);
        
        
        if (index === CONVERSATION_DATA.length - 1) {
          setTimeout(() => setIsSimulating(false), 1000);
        }
      }, index * 6000); 
    });
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
            if (scrollTimeout) {
              clearTimeout(scrollTimeout);
              setScrollTimeout(null);
            }
            setShowHeader(true);
            setLastScrollY(currentScrollY);
            ticking = false;
            return;
          }
          
          if (scrollTimeout) {
            clearTimeout(scrollTimeout);
          }
          
          if (currentScrollY < lastScrollY) {
            setShowHeader(true);
            
            const timeout = setTimeout(() => {
              if (container.scrollTop >= 10) {
                setShowHeader(false);
              }
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
      if (scrollTimeout) {
        clearTimeout(scrollTimeout);
      }
    };
  }, [lastScrollY, scrollTimeout]);
useEffect(() => {
  if (summaryContentRef.current && showFinalSummary && isTypingFinalSummary) {
    const scrollInterval = setInterval(() => {
      summaryContentRef.current.scrollTop = summaryContentRef.current.scrollHeight;
    }, 100);
    
    return () => clearInterval(scrollInterval);
  } else if (summaryContentRef.current && !showFinalSummary) {
    summaryContentRef.current.scrollTop = summaryContentRef.current.scrollHeight;
  }
}, [summaryPoints, finalSummary, showFinalSummary, isTypingFinalSummary]);
  return (
  <motion.div 
    ref={containerRef} 
    className="phs-pre-hearing-container"
    initial={{ opacity: 0 }}
    animate={{ 
      opacity: isNavigating ? 0 : 1
    }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.25, ease: "easeOut" }}
  >
      <div className={`phs-header-pre-hearing ${showHeader ? 'phs-header-visible' : 'phs-header-hidden'}`}>
        <div className="phs-top-panel">
          <div className="phs-top-panel-border"></div>
          
          <div className="phs-logo-background" onClick={handleNavigateHome} style={{ cursor: 'pointer' }}></div>
<div className="phs-logo-letter" onClick={handleNavigateHome} style={{ cursor: 'pointer' }}>L</div>

<div className="phs-brand-name" onClick={handleNavigateHome} style={{ cursor: 'pointer' }}>
  <span className="phs-brand-le">LEGAL</span>
  <span className="phs-brand-x">x</span>
  
</div>

<div className="phs-brand-tagline" onClick={handleNavigateHome} style={{ cursor: 'pointer' }}>Legal Research</div>
          
          <div className="phs-page-title">Pre Hearing Simulation</div>
          
          <div className="phs-page-subtitle">
            Observe Strategy in Action - Watch how arguments unfold between prosecution and defense counsel
          </div>
          
          <div className="phs-user-section">
            <div className="phs-user-name">USER NAME</div>
            <div className="phs-user-plan">Basic plan</div>
            <svg className="phs-user-avatar-gradient" width="32" height="30" viewBox="0 0 32 30" fill="none" xmlns="http://www.w3.org/2000/svg">
              <ellipse cx="16" cy="15" rx="16" ry="15" fill="url(#paint0_linear_317_191)"/>
              <defs>
                <linearGradient id="paint0_linear_317_191" x1="16" y1="0" x2="16" y2="30" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#155DFC"/>
                  <stop offset="1" stopColor="#0D3796"/>
                </linearGradient>
              </defs>
            </svg>
            <svg className="phs-user-avatar-bg" width="34" height="33" viewBox="0 0 34 33" fill="none" xmlns="http://www.w3.org/2000/svg">
              <ellipse cx="17" cy="16.5" rx="17" ry="16.5" fill="white"/>
            </svg>
            <div className="phs-user-avatar-initial">A</div>
          </div>
        </div>
      </div>

      <div className="phs-content-wrapper">
        <div className="phs-main-chat-container">
          <div className="phs-chat-background">
            <div className="phs-chat-messages-scroll" ref={chatMessagesRef}>
              {messages.map((msg, index) => (
                <div key={`msg-${index}`} className="phs-message-container">
                  {msg.role === 'defense' ? (
                    <div className="phs-defense-message-wrapper">
                      <div className="phs-counsel-label-wrapper">
                        <div className="phs-avatar-container" style={{ position: 'relative' }}>
                          <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ display: 'block' }}>
                            <circle cx="20" cy="20" r="20" fill="black"/>
                          </svg>
                          <svg className="phs-avatar-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{
                            position: 'absolute',
                            left: '50%',
                            top: '50%',
                            transform: 'translate(-50%, -50%)'
                          }}>
                            <path d="M12 8V4H8"/>
                            <rect width="16" height="12" x="4" y="8" rx="2"/>
                            <path d="M2 14h2"/>
                            <path d="M20 14h2"/>
                            <path d="M15 13v2"/>
                            <path d="M9 13v2"/>
                          </svg>
                        </div>
                        <div className="phs-counsel-label">Defense Counsel</div>
                      </div>
                      <div className="phs-message-content-wrapper">
                        <div className="phs-bubble phs-defense-bubble">
                          <TypewriterText text={msg.message} speed={10} />
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="phs-plaintiff-message-wrapper">
                      <div className="phs-counsel-label-wrapper">
                        <div className="phs-counsel-label phs-plaintiff-counsel">Plaintiff Counsel</div>
                        <div className="phs-avatar-container" style={{ position: 'relative' }}>
                          <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ display: 'block' }}>
                            <circle cx="20" cy="20" r="20" fill="black"/>
                          </svg>
                          <svg className="phs-avatar-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{
                            position: 'absolute',
                            left: '50%',
                            top: '50%',
                            transform: 'translate(-50%, -50%)'
                          }}>
                            <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/>
                            <circle cx="12" cy="7" r="4"/>
                          </svg>
                        </div>
                      </div>
                      <div className="phs-message-content-wrapper phs-plaintiff-content">
                        <div className="phs-bubble phs-plaintiff-bubble">
                          <TypewriterText text={msg.message} speed={10} />
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="phs-side-panel">
          <svg className="phs-panel-indicator-first" width="10" height="11" viewBox="0 0 10 11" fill="none" xmlns="http://www.w3.org/2000/svg">
            <ellipse cx="5" cy="5.5" rx="5" ry="5.5" fill="white"/>
          </svg>
          <div className="phs-panel-title-first">Argument Summary</div>
          <div className="phs-panel-box-first"></div>
          <div className="phs-panel-content-first" ref={summaryContentRef}>
  {isLoadingSummary && (
    <div className="phs-summary-loading">
      <div className="phs-skeleton-line"></div>
      <div className="phs-skeleton-line"></div>
      <div className="phs-skeleton-line"></div>
      <div className="phs-skeleton-line"></div>
    </div>
  )}
  
  {!isLoadingSummary && summaryPoints.length === 0 && (
    <span style={{ color: '#999', fontStyle: 'italic' }}>
      Summary will appear as the conversation progresses...
    </span>
  )}
  
  {!isLoadingSummary && summaryPoints.map((point, index) => (
    <div key={index} className="phs-summary-point">
      {point}
    </div>
  ))}
  
{showFinalSummary && (
    <div className="phs-final-summary">
      <TypewriterText 
        text={finalSummary} 
        speed={15} 
        onComplete={() => setIsTypingFinalSummary(false)}
      />
    </div>
  )}
</div>
        </div>
      </div>

      <div className="phs-navigation-buttons">
        <button onClick={handleNavigateBack} className="phs-back-button">
          <svg width="18" height="19" viewBox="0 0 18 19" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="0.5" y="0.5" width="17" height="18" stroke="black"/>
            <path d="M9 15.0417L3.75 9.50001L9 3.95834" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M14.25 9.5H3.75" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <span>Back</span>
        </button>

        <button onClick={handleNavigateNext} className="phs-next-button">
          <span>Next</span>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M5 12H19" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M12 5L19 12L12 19" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>
    </motion.div>
  );
}

export default PreHearingSim;