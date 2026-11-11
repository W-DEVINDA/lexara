import { useState, useEffect, useRef } from 'react';
import { ChevronRight, Upload, Mic, Search, ArrowLeft, Save, FileBarChart2, Bell, X, FileText, Building2, Briefcase, Home, Globe } from 'lucide-react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import './PreInvestigator.css';
import AnalyzingAnimation from '../../components/AnalyzingAnimation/AnalyzingAnimation';

function PreInvestigator() {
  const navigate = useNavigate();
  const [caseDescription, setCaseDescription] = useState('');
  const [caseDetailsFiles, setCaseDetailsFiles] = useState([]);
  const [isRecording, setIsRecording] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [fileToDelete, setFileToDelete] = useState(null);
  const containerRef = useRef(null);
  const [showHeader, setShowHeader] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [scrollTimeout, setScrollTimeout] = useState(null);
  const [isNavigating, setIsNavigating] = useState(false);
  const [showAnalyzing, setShowAnalyzing] = useState(false);

  const handleNavigateHome = () => {
    setIsNavigating(true);
    setTimeout(() => {
      navigate('/', { state: { smoothTransition: true } });
    }, 330);
  };

  const handleAnalyzeCase = () => {
    setShowAnalyzing(true);
    
    // Wait 10 seconds for the animation, then navigate
    setTimeout(() => {
      setIsNavigating(true);
      setTimeout(() => {
        navigate('/investigator-report', { 
          state: { 
            smoothTransition: true,
            caseDescription,
            caseDetailsFiles
          } 
        });
      }, 250);
    }, 10000);
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
    };
  }, [lastScrollY, scrollTimeout]);

  const handleCaseDetailsFileUpload = (e) => {
    const files = Array.from(e.target.files);
    setCaseDetailsFiles(prev => [...prev, ...files]);
  };

  const initiateDeleteCaseDetailsFile = (index) => {
    setFileToDelete({ index: index, type: 'caseDetails' });
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    if (fileToDelete) {
      if (fileToDelete.type === 'caseDetails') {
        setCaseDetailsFiles(prev => prev.filter((_, index) => index !== fileToDelete.index));
      }
      setShowDeleteModal(false);
      setFileToDelete(null);
    }
  };

  const cancelDelete = () => {
    setShowDeleteModal(false);
    setFileToDelete(null);
  };

  const toggleRecording = () => {
    setIsRecording(!isRecording);
  };

  return (
    <motion.div
      ref={containerRef}
      initial={{ opacity: 0 }}
      animate={{ 
        opacity: isNavigating ? 0 : 1
      }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className="pre-investigator-container"
    >
      <header className={`investigator-header-fixed ${!showHeader ? 'hidden' : ''}`}>
        <div className="investigator-header-panel">
          <div onClick={handleNavigateHome} className="investigator-logo-section">
            <div className="investigator-logo-box">
              <span className="investigator-logo-letter">L</span>
            </div>
            <div className="investigator-logo-text">
              <div className="investigator-brand-name">
                <span className="gruppo">LEGAL</span>
                <span className="bruno">x</span>
                
              </div>
              <div className="investigator-tagline">Legal Research</div>
            </div>
          </div>
          <div className="investigator-page-title">Investigator Report</div>
          <div className="investigator-page-subtitle">Establish the legal foundation of your investigation</div>
          <div className="investigator-user-section">
            <div className="investigator-user-info">
              <div className="investigator-user-name">USER NAME</div>
              <div className="investigator-user-plan">Basic plan</div>
            </div>
            <div className="investigator-user-avatar">
              <span className="investigator-avatar-letter">A</span>
            </div>
            <Bell className="investigator-notification-bell" size={16} color="white" />
          </div>
        </div>
      </header>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="pre-investigator-content"
      >
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="investigator-section-header-wrapper"
        >
          <div className="investigator-section-header">
            <h2 className="investigator-section-title">Case facts & details</h2>
            <p className="investigator-section-subtitle">Provide the known facts, observations and investigative notes related to the case</p>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="investigator-case-details-section"
        >
          <div className="investigator-case-description-wrapper">
            <textarea
              className="investigator-case-description-input"
              placeholder="Describe case details..."
              value={caseDescription}
              onChange={(e) => setCaseDescription(e.target.value)}
            />
            
            <div className="investigator-textarea-actions">
              <input
                type="file"
                id="investigator-case-details-file-upload"
                className="investigator-file-upload-input"
                multiple
                accept=".pdf,.doc,.docx"
                onChange={handleCaseDetailsFileUpload}
              />
              <motion.label
                htmlFor="investigator-case-details-file-upload"
                className="investigator-file-upload-label"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Upload size={20} color="#45556C" />
              </motion.label>

              <motion.button
                onClick={toggleRecording}
                className="investigator-mic-button"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Mic size={24} color={isRecording ? "#FF4444" : "#45556C"} />
                {isRecording && (
                  <motion.div
                    style={{
                      position: 'absolute',
                      width: '40px',
                      height: '40px',
                      border: '1px solid #FF4444',
                      borderRadius: '50%',
                      pointerEvents: 'none'
                    }}
                    initial={{ scale: 1, opacity: 0.8 }}
                    animate={{ scale: 1.5, opacity: 0 }}
                    transition={{ duration: 1, repeat: Infinity }}
                  />
                )}
              </motion.button>
            </div>
          </div>

          {caseDetailsFiles.length > 0 && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              transition={{ duration: 0.3 }}
              className="investigator-uploaded-files-list"
            >
              {caseDetailsFiles.map((file, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.2 }}
                  className="investigator-file-chip"
                >
                  <span className="investigator-file-chip-name">
                    {file.name.length > 15 ? file.name.substring(0, 15) + '...' : file.name}
                  </span>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => initiateDeleteCaseDetailsFile(index)}
                    className="investigator-file-chip-remove"
                  >
                    <X size={14} color="#666" />
                  </motion.button>
                </motion.div>
              ))}
            </motion.div>
          )}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="investigator-action-buttons"
        >
          <motion.button
            onClick={handleNavigateHome}
            whileHover={{ scale: 1.05, background: '#FFF', color: '#000' }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="investigator-btn-back"
          >
            <ArrowLeft size={18} />
            <span>Back</span>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05, background: '#FFF', color: '#000' }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="investigator-btn-save-draft"
          >
            <Save size={18} />
            <span>Save Draft</span>
          </motion.button>

          <motion.button
            onClick={handleAnalyzeCase}
            whileHover={{ scale: 1.05, background: '#FFF', color: '#000' }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="investigator-btn-analyze"
          >
            <FileBarChart2 size={18} />
            <span>Analyze Case</span>
          </motion.button>
        </motion.div>
      </motion.div>

      {showDeleteModal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="investigator-delete-modal-overlay"
          onClick={cancelDelete}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
            className="investigator-delete-modal"
          >
            <h3 className="investigator-delete-modal-title">Delete Document?</h3>
            <p className="investigator-delete-modal-text">
              Are you sure you want to delete this document? This action cannot be undone.
            </p>
            <div className="investigator-delete-modal-actions">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={cancelDelete}
                className="investigator-btn-cancel"
              >
                Cancel
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={confirmDelete}
                className="investigator-btn-delete"
              >
                Delete
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      )}

      
      
      {showAnalyzing && <AnalyzingAnimation />}
    </motion.div>
  );
}

export default PreInvestigator;