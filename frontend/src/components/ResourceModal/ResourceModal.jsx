import { motion, AnimatePresence } from 'framer-motion';
import './ResourceModal.css';

function ResourceModal({ isOpen, resource, onClose }) {
  return (
    <AnimatePresence>
      {isOpen && resource && (
        <motion.div
          className="modal-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="modal-content"
            initial={{ scale: 0.8, opacity: 0, y: 50 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: 50 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-header">
              <div>
                <div className="modal-category">{resource.category}</div>
                <h2 className="modal-title">{resource.title}</h2>
              </div>
              <button className="modal-close" onClick={onClose}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>
            <div 
              className="modal-body" 
              dangerouslySetInnerHTML={{ __html: resource.content }}
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default ResourceModal;