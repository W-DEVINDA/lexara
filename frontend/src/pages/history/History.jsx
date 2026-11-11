import { motion, useMotionValue, animate } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './History.css';

function History() {
  const navigate = useNavigate();
  const [showHeader, setShowHeader] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [scrollTimeout, setScrollTimeout] = useState(null);
  const containerRef = useRef(null);
  const activeCasesSectionRef = useRef(null);
  const [isNavigating, setIsNavigating] = useState(false);
  

  const [activeCases, setActiveCases] = useState([
    { id: 'case1', name: "Public Prosecutor v. Dato' Richard Lim Kah Weng", number: "WA-44-1124-2024", type: "Financial Crime", court: "High Court of Kuala Lumpur" },
    { id: 'case2', name: "Employment Dispute- Wrongful Termination", number: "HC-2024-1234", type: "Contract Breach", court: "High Court KL" },
    { id: 'case3', name: "Intellectual Property Infrigement Case", number: "HC-2024-1234", type: "Contract Breach", court: "High Court KL" }
  ]);
  
  const [completedCases, setCompletedCases] = useState([
    { id: 'completed1', name: "Rafhan Sdn Bhd vs Lowtech Corporation", number: "HC-2024-1234", type: "Contract Breach", court: "High Court KL" },
    { id: 'completed2', name: "Employment Dispute- Wrongful Termination", number: "HC-2024-1234", type: "Contract Breach", court: "High Court KL" }
  ]);
  
  const [deletedCases, setDeletedCases] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [caseToDelete, setCaseToDelete] = useState(null);


  const activeCount = useMotionValue(0);
  const completedCount = useMotionValue(0);
  const winRateValue = useMotionValue(0);


  const [displayActiveCount, setDisplayActiveCount] = useState(0);
  const [displayCompletedCount, setDisplayCompletedCount] = useState(0);
  const [displayWinRate, setDisplayWinRate] = useState(0);


  useEffect(() => {
    const targetActive = activeCases.length;
    const targetCompleted = completedCases.length;
    const totalCases = targetActive + targetCompleted;
    const targetWinRate = totalCases > 0 ? Math.round((targetCompleted / totalCases) * 100) : 0;


    const controlsActive = animate(activeCount, targetActive, {
      duration: 1.5,
      ease: "easeOut",
      onUpdate: (latest) => setDisplayActiveCount(Math.round(latest))
    });


    const controlsCompleted = animate(completedCount, targetCompleted, {
      duration: 1.5,
      ease: "easeOut",
      onUpdate: (latest) => setDisplayCompletedCount(Math.round(latest))
    });

    const controlsWinRate = animate(winRateValue, targetWinRate, {
      duration: 1.5,
      ease: "easeOut",
      onUpdate: (latest) => setDisplayWinRate(Math.round(latest))
    });

    return () => {
      controlsActive.stop();
      controlsCompleted.stop();
      controlsWinRate.stop();
    };
  }, [activeCases.length, completedCases.length]);

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


  const handleComplete = (caseId) => {
    const caseToComplete = activeCases.find(c => c.id === caseId);
    if (caseToComplete) {
      setActiveCases(activeCases.filter(c => c.id !== caseId));
      setCompletedCases([...completedCases, caseToComplete]);
    }
  };


  const handleMoveToActive = (caseId) => {
    const caseToActivate = completedCases.find(c => c.id === caseId);
    if (caseToActivate) {
      setCompletedCases(completedCases.filter(c => c.id !== caseId));
      setActiveCases([...activeCases, caseToActivate]);
      
      // Scroll to active cases section
      setTimeout(() => {
        activeCasesSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    }
  };


  const handleDelete = (caseId) => {
    setCaseToDelete(caseId);
    setShowDeleteModal(true);
  };


  const confirmDelete = () => {
    if (caseToDelete) {

      setActiveCases(activeCases.filter(c => c.id !== caseToDelete));

      setCompletedCases(completedCases.filter(c => c.id !== caseToDelete));

      setDeletedCases([...deletedCases, caseToDelete]);
    }
    setShowDeleteModal(false);
    setCaseToDelete(null);
  };


  const cancelDelete = () => {
    setShowDeleteModal(false);
    setCaseToDelete(null);
  };


  const totalCases = activeCases.length + completedCases.length;
  const winRate = totalCases > 0 ? Math.round((completedCases.length / totalCases) * 100) : 0;


  const handleNavigateHome = () => {
    setIsNavigating(true);
    setTimeout(() => {
      navigate('/', { state: { smoothTransition: true } });
    }, 250);
  };

 
  const handleDetailsClick = (caseId) => {
    if (caseId === 'case1') {
      setIsNavigating(true);
      setTimeout(() => {
        navigate('/case-summary', { state: { smoothTransition: true } });
      }, 250);
    }
  };

  return (
    <motion.div 
      ref={containerRef}
      className="hist-history-page"
      initial={{ opacity: 0 }}
      animate={{ opacity: isNavigating ? 0 : 1 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
    >
      {/* Header Section */}
      <header className={`hist-header-case-analysis ${!showHeader ? 'hist-header-hidden' : ''}`}>
        <div className="hist-top-panel">
          <div className="hist-logo-section" onClick={handleNavigateHome}>
            <div className="hist-logo-box">
              <span className="hist-logo-letter">L</span>
            </div>
            <div className="hist-logo-text">
              <div className="hist-brand-name">
                <span className="hist-gruppo">LE</span>
                <span className="hist-gruppo">GAL</span>
                <span className="hist-bruno">x</span>
              </div>
              <div className="hist-tagline">Legal Research</div>
            </div>
          </div>

          <div className="hist-page-title-section">
            <h1 className="hist-page-title">Your Cases</h1>
            <p className="hist-page-subtitle">Manage & track all legal cases in one place</p>
          </div>

          <div className="hist-user-section">
            <div className="hist-user-info">
              <div className="hist-user-name">USER NAME</div>
              <div className="hist-user-plan">Basic plan</div>
            </div>
            <div className="hist-user-avatar">
              <span className="hist-avatar-letter">A</span>
            </div>
          </div>
        </div>
      </header>

      {/* Cases History Info Section */}
      <div className="hist-cases-history-info">
        {/* Stats Cards - Dynamic */}
        <div className="hist-stats-cards">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="hist-stat-card hist-active-card"
          >
            <div className="hist-stat-number">{displayActiveCount}</div>
            <div className="hist-stat-label">Active Cases</div>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="hist-stat-card hist-completed-card"
          >
            <div className="hist-stat-number">{displayCompletedCount}</div>
            <div className="hist-stat-label">Completed</div>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="hist-stat-card hist-win-rate-card"
          >
            <div className="hist-stat-number">{displayWinRate}%</div>
            <div className="hist-stat-label">Win Rate</div>
          </motion.div>
        </div>

        {/* Search Bar and New Case Button Container */}
        <div className="hist-search-and-button-container">
          <div className="hist-search-bar">
            <svg className="hist-search-icon" width="21" height="23" viewBox="0 0 21 23" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M18.375 20.125L14.5775 15.9658" stroke="#314158" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M9.625 18.2083C13.491 18.2083 16.625 14.7758 16.625 10.5417C16.625 6.30748 13.491 2.875 9.625 2.875C5.75901 2.875 2.625 6.30748 2.625 10.5417C2.625 14.7758 5.75901 18.2083 9.625 18.2083Z" stroke="#314158" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <input 
              type="text" 
              placeholder="Search cases by Name,Case Number or Client..."
              className="hist-search-input"
            />
          </div>
          <button className="hist-new-case-btn" onClick={() => navigate('/legal-desk')}>
            <svg width="15" height="14" viewBox="0 0 15 14" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M3.125 7H11.875" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M7.5 2.91669V11.0834" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span>New Case</span>
          </button>
        </div>
      </div>

      {/* Active Cases Section */}
      <div className="hist-active-cases-section" ref={activeCasesSectionRef}>
        <h2 className="hist-section-title">Active Cases</h2>
        
        {activeCases.map((caseData) => (
          <div key={caseData.id} className="hist-case-card hist-active-case">
            <div className="hist-card-hover-controls">
              <input 
                type="checkbox" 
                className="hist-complete-checkbox"
                onChange={() => handleComplete(caseData.id)}
              />
              <button className="hist-delete-icon" onClick={() => handleDelete(caseData.id)}>
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M2.5 5H17.5M8.333 9.167V14.167M11.667 9.167V14.167M3.333 5L4.167 16.667C4.167 17.125 4.35 17.5 4.717 17.8C5.083 18.1 5.5 18.333 6.667 18.333H13.333C14.5 18.333 14.917 18.1 15.283 17.8C15.65 17.5 15.833 17.125 15.833 16.667L16.667 5M7.5 5V3.333C7.5 2.875 7.683 2.5 8.05 2.2C8.417 1.9 8.833 1.667 10 1.667H10C11.167 1.667 11.583 1.9 11.95 2.2C12.317 2.5 12.5 2.875 12.5 3.333V5" stroke="#FF0000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>
            <h3 className="hist-case-name">{caseData.name}</h3>
            <div className="hist-case-details">
              <span className="hist-case-info">Case No: {caseData.number}</span>
              <span className="hist-case-info">{caseData.type}</span>
              <span className="hist-case-info">{caseData.court}</span>
            </div>
            <div className="hist-case-actions">
              <button 
  className="hist-continue-btn hist-active" 
  onClick={() => {
    if (caseData.id === 'case1') {
      setIsNavigating(true);
      setTimeout(() => {
        navigate('/pre-hearingcont', { state: { smoothTransition: true } });
      }, 250);
    }
  }}
>
  Continue
</button>
              <button 
                className="hist-details-btn" 
                onClick={() => handleDetailsClick(caseData.id)}
              >
                Details
              </button>
            </div>
          </div>
        ))}

        {activeCases.length === 0 && (
          <div className="hist-no-cases-message">
            <p>No active cases at the moment.</p>
          </div>
        )}
      </div>

      {/* Recently Completed Cases Section */}
      <div className="hist-completed-cases-section">
        <h2 className="hist-section-title">Recently Completed Cases</h2>
        
        {completedCases.map((caseData) => (
          <div key={caseData.id} className="hist-case-card hist-completed-case">
            <div className="hist-card-hover-controls">
              <button className="hist-delete-icon" onClick={() => handleDelete(caseData.id)}>
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M2.5 5H17.5M8.333 9.167V14.167M11.667 9.167V14.167M3.333 5L4.167 16.667C4.167 17.125 4.35 17.5 4.717 17.8C5.083 18.1 5.5 18.333 6.667 18.333H13.333C14.5 18.333 14.917 18.1 15.283 17.8C15.65 17.5 15.833 17.125 15.833 16.667L16.667 5M7.5 5V3.333C7.5 2.875 7.683 2.5 8.05 2.2C8.417 1.9 8.833 1.667 10 1.667H10C11.167 1.667 11.583 1.9 11.95 2.2C12.317 2.5 12.5 2.875 12.5 3.333V5" stroke="#FF0000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>
            <h3 className="hist-case-name">{caseData.name}</h3>
            <div className="hist-case-details">
              <span className="hist-case-info">Case No: {caseData.number}</span>
              <span className="hist-case-info">{caseData.type}</span>
              <span className="hist-case-info">{caseData.court}</span>
            </div>
            <div className="hist-case-actions">
              <button 
                className="hist-continue-btn hist-completed" 
                onClick={() => handleMoveToActive(caseData.id)}
              >
                Continue
              </button>
              <button 
                className="hist-details-btn" 
                onClick={() => handleDetailsClick(caseData.id)}
              >
                Details
              </button>
            </div>
          </div>
        ))}

        {completedCases.length === 0 && (
          <div className="hist-no-cases-message">
            <p>No completed cases yet.</p>
          </div>
        )}
      </div>

      {/* Bottom Buttons */}
      <div className="hist-bottom-buttons">
       <button className="hist-back-btn" onClick={() => {
  setIsNavigating(true);
  setTimeout(() => {
    navigate('/', { state: { smoothTransition: true } });
  }, 250);
}}>
          <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M19.0449 12.0712L5.04497 12.0187" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M12.0186 19.0449L5.04494 12.0187L12.0712 5.045" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <span>Back</span>
        </button>
      </div>

      {/* Bottom Gradient */}
     

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="hist-modal-overlay">
          <div className="hist-modal-content">
            <h3 className="hist-modal-title">Delete Case</h3>
            <p className="hist-modal-text">Are you sure you want to delete this case? This action cannot be undone.</p>
            <div className="hist-modal-buttons">
              <button className="hist-modal-btn hist-cancel-btn" onClick={cancelDelete}>Cancel</button>
              <button className="hist-modal-btn hist-delete-btn" onClick={confirmDelete}>Delete</button>
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
}

export default History;