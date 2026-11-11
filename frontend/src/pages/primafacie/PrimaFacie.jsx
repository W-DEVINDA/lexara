import { useState, useEffect, useRef } from 'react';
import { ChevronRight, Upload, Mic, Search, ArrowLeft, Save, FileBarChart2, Bell, X,FileText,Building2,Briefcase,Home,Globe} from 'lucide-react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import './PrimaFacie.css';
import AnalyzingAnimation from '../../components/AnalyzingAnimation/AnalyzingAnimation';

function PrimaFacie() {
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
    
   
    setTimeout(() => {
      setIsNavigating(true);
      setTimeout(() => {
        navigate('/case-analysis', { 
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
      className="prima-facie-container"
    >
      <header className={`header-fixed ${!showHeader ? 'hidden' : ''}`}>
        <div className="header-panel">
          <div onClick={handleNavigateHome} className="logo-section">
            <div className="logo-box">
              <span className="logo-letter">L</span>
            </div>
            <div className="logo-text">
              <div className="brand-name">
                <span className="gruppo">LEGAL</span>
                <span className="bruno">x</span>
                
              </div>
              <div className="tagline">Legal Research</div>
            </div>
          </div>
          <div className="page-title">Prima Facie Case Analaysis</div>
          <div className="page-subtitle">Build Your Case Foundation</div>
          <div className="user-section">
            <div className="user-info">
              <div className="user-name">USER NAME</div>
              <div className="user-plan">Basic plan</div>
            </div>
            <div className="user-avatar">
              <span className="avatar-letter">A</span>
            </div>
            <Bell className="notification-bell" size={16} color="white" />
          </div>
        </div>
      </header>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="prima-facie-content"
      >
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="section-header-wrapper"
        >
          <div className="section-header">
            <h2 className="section-title">Case facts & details</h2>
            <p className="section-subtitle">Let's analyze your case to find the most relevant precedents and legal provisions</p>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="case-details-section"
        >
          <div className="case-description-wrapper">
            <textarea
              className="case-description-input"
              placeholder="Describe case details..."
              value={caseDescription}
              onChange={(e) => setCaseDescription(e.target.value)}
            />
            
            <div className="textarea-actions">
              <input
                type="file"
                id="case-details-file-upload"
                className="file-upload-input"
                multiple
                accept=".pdf,.doc,.docx"
                onChange={handleCaseDetailsFileUpload}
              />
              <motion.label
                htmlFor="case-details-file-upload"
                className="file-upload-label"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Upload size={20} color="#45556C" />
              </motion.label>

              <motion.button
                onClick={toggleRecording}
                className="mic-button"
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
              className="uploaded-files-list"
            >
              {caseDetailsFiles.map((file, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.2 }}
                  className="file-chip"
                >
                  <span className="file-chip-name">
                    {file.name.length > 15 ? file.name.substring(0, 15) + '...' : file.name}
                  </span>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => initiateDeleteCaseDetailsFile(index)}
                    className="file-chip-remove"
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
          className="action-buttons"
        >
          <motion.button
            onClick={handleNavigateHome}
            whileHover={{ scale: 1.05, background: '#FFF', color: '#000' }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="btn-back"
          >
            <ArrowLeft size={18} />
            <span>Back</span>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05, background: '#FFF', color: '#000' }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="btn-save-draft"
          >
            <Save size={18} />
            <span>Save Draft</span>
          </motion.button>

          <motion.button
            onClick={handleAnalyzeCase}
            whileHover={{ scale: 1.05, background: '#FFF', color: '#000' }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="btn-analyze"
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
          className="delete-modal-overlay"
          onClick={cancelDelete}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
            className="delete-modal"
          >
            <h3 className="delete-modal-title">Delete Document?</h3>
            <p className="delete-modal-text">
              Are you sure you want to delete this document? This action cannot be undone.
            </p>
            <div className="delete-modal-actions">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={cancelDelete}
                className="btn-cancel"
              >
                Cancel
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={confirmDelete}
                className="btn-delete"
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

export default PrimaFacie;