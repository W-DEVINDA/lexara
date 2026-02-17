import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, X, Edit, Plus, AlertCircle } from 'lucide-react';
import './INVSteps.css';

function INVSteps() {
  const [expandedPhases, setExpandedPhases] = useState({});
  const [checkedSteps, setCheckedSteps] = useState({});
  const [phaseDiaryEntries, setPhaseDiaryEntries] = useState({});
  const [phaseDiaryText, setPhaseDiaryText] = useState({});
  const [deletedSteps, setDeletedSteps] = useState({});
  const [hoveredStep, setHoveredStep] = useState(null);
  const [editingStep, setEditingStep] = useState(null);
  const [editedStepData, setEditedStepData] = useState({});
  const [newCards, setNewCards] = useState({});
  const [phaseSteps, setPhaseSteps] = useState({});
  const [deleteConfirmModal, setDeleteConfirmModal] = useState({ show: false, stepId: null });

  const investigationStepsData = {
    phase1: {
      phase: "Phase 1",
      title: "Initial Evidence Collection & Preservation",
      description: "Secure all primary evidence sources and establish proper chain of custody",
      timeline: "Week 1-2",
      priority: "Critical",
      steps: [
        {
          id: "step_1_1",
          title: "Obtain Court Orders for Banking Records",
          description: "Apply for court orders under Section 116 AMLA to access all banking records of Stellar Solutions Sdn Bhd and related accounts",
          requirements: ["Draft court application", "Prepare supporting affidavit", "Submit to High Court", "Obtain signed court order"],
          responsible: "Investigating Officer / Legal Unit",
          deadline: "3-5 working days"
        },
        {
          id: "step_1_2",
          title: "Secure CCTV Footage from Bank Branches",
          description: "Request and secure all CCTV recordings from Bank Muamalat branches showing the accused making withdrawals",
          requirements: ["Identify all relevant branch locations", "Submit official request to bank security", "Verify video quality and timestamps", "Create forensic copies with hash verification"],
          responsible: "Investigating Officer",
          deadline: "7 working days"
        },
        {
          id: "step_1_3",
          title: "Seize Mobile Phones and Digital Devices",
          description: "Execute search warrant to seize all mobile phones and computing devices used by the accused",
          requirements: ["Obtain search warrant from magistrate", "Conduct surprise raid at residence", "Document all seized items", "Maintain strict chain of custody"],
          responsible: "Raiding Team / Digital Forensics Unit",
          deadline: "Immediate upon warrant approval"
        },
        {
          id: "step_1_4",
          title: "Secure Physical Business Premises Documentation",
          description: "Conduct site inspection of registered business address and document the lack of genuine operations",
          requirements: ["Visit registered address with photographer", "Interview landlord/building management", "Obtain SSM business records", "Document findings in official report"],
          responsible: "Investigation Team",
          deadline: "5 working days"
        }
      ]
    },
    phase2: {
      phase: "Phase 2",
      title: "Forensic Analysis & Documentation",
      description: "Conduct detailed forensic examination of all collected evidence",
      timeline: "Week 3-5",
      priority: "Critical",
      steps: [
        {
          id: "step_2_1",
          title: "Forensic Extraction of Mobile Phone Data",
          description: "Extract all data from seized mobile phones including call logs, messages, and app data using MCMC-certified forensic tools",
          requirements: ["Send devices to certified forensic lab", "Use approved extraction software", "Document extraction process", "Generate forensic reports with digital signatures"],
          responsible: "Digital Forensics Unit",
          deadline: "14 working days"
        },
        {
          id: "step_2_2",
          title: "Banking Transaction Analysis",
          description: "Conduct comprehensive analysis of all banking transactions to identify patterns, layering techniques, and fund flows",
          requirements: ["Create transaction flowcharts", "Identify all source and destination accounts", "Calculate total amounts moved", "Document withdrawal patterns"],
          responsible: "Financial Crimes Analyst",
          deadline: "10 working days"
        },
        {
          id: "step_2_3",
          title: "CCTV Footage Authentication & Analysis",
          description: "Verify authenticity of CCTV footage and identify the accused in all recordings",
          requirements: ["Forensic video analysis by certified expert", "Timestamp verification", "Facial recognition analysis", "Prepare video exhibits with annotations"],
          responsible: "Forensic Video Analyst",
          deadline: "7 working days"
        },
        {
          id: "step_2_4",
          title: "Engage Forensic Accountant",
          description: "Hire expert forensic accountant to trace complete money trail and prepare court-ready financial analysis",
          requirements: ["Select qualified forensic accountant", "Provide all financial records", "Request detailed money flow analysis", "Obtain expert witness statement"],
          responsible: "Investigating Officer / Finance Unit",
          deadline: "21 working days"
        }
      ]
    },
    phase3: {
      phase: "Phase 3",
      title: "International Cooperation & Shell Company Investigation",
      description: "Obtain evidence from foreign jurisdictions and investigate offshore shell companies",
      timeline: "Week 4-8",
      priority: "High",
      steps: [
        {
          id: "step_3_1",
          title: "Submit MLAT Request to BVI Authorities",
          description: "Request Mutual Legal Assistance from British Virgin Islands for shell company documentation and beneficial ownership records",
          requirements: ["Prepare MLAT request letter", "Submit through Attorney General's Chambers", "Follow up with BVI Financial Investigation Agency", "Receive and authenticate documents"],
          responsible: "International Cooperation Unit / AG Chambers",
          deadline: "30-60 working days"
        },
        {
          id: "step_3_2",
          title: "Coordinate with Europol for SWIFT Records",
          description: "Request SWIFT transaction records and originating bank details through Europol cooperation channels",
          requirements: ["Submit formal request to Europol liaison", "Specify required MT103 message details", "Obtain certified copies", "Verify authentication"],
          responsible: "International Liaison Officer",
          deadline: "30-45 working days"
        },
        {
          id: "step_3_3",
          title: "Investigate Offshore Gambling Operations",
          description: "Gather intelligence on illegal gambling operations linked to BVI shell companies",
          requirements: ["Request Interpol intelligence reports", "Coordinate with Singapore and Hong Kong authorities", "Obtain operator statements if possible", "Document criminal network connections"],
          responsible: "Intelligence Unit",
          deadline: "45 working days"
        },
        {
          id: "step_3_4",
          title: "Verify Shell Company Nominee Directors",
          description: "Investigate and document nominee directors of BVI shell companies to prove lack of genuine business",
          requirements: ["Request background checks on listed directors", "Obtain incorporation documents", "Prove shared virtual office address", "Document lack of business licenses"],
          responsible: "Corporate Crimes Unit",
          deadline: "21 working days"
        }
      ]
    },
    phase4: {
      phase: "Phase 4",
      title: "Witness Statements & Family Member Investigation",
      description: "Interview key witnesses and investigate family members who received transferred funds",
      timeline: "Week 6-9",
      priority: "High",
      steps: [
        {
          id: "step_4_1",
          title: "Interview Family Members as Witnesses",
          description: "Record formal statements from wife, brother, son, and daughter who received funds in their accounts",
          requirements: ["Issue witness summons", "Conduct recorded interviews under caution", "Question about source of funds", "Document claims of ignorance"],
          responsible: "Investigating Officer",
          deadline: "14 working days"
        },
        {
          id: "step_4_2",
          title: "Obtain Bank Staff Statements",
          description: "Interview bank officers who handled transactions and can testify about suspicious activity",
          requirements: ["Identify relevant bank staff", "Record statements about transaction patterns", "Obtain compliance officer testimony", "Document bank's STR filing (if any)"],
          responsible: "Investigating Officer",
          deadline: "10 working days"
        },
        {
          id: "step_4_3",
          title: "Interview Business Premises Landlord/Neighbors",
          description: "Obtain statements confirming that Stellar Solutions had no actual business operations at registered address",
          requirements: ["Locate property owner", "Interview neighbors/building management", "Obtain written statements", "Photograph vacant premises"],
          responsible: "Investigation Team",
          deadline: "7 working days"
        },
        {
          id: "step_4_4",
          title: "Investigate Family Members' Financial Background",
          description: "Examine financial history of family members to prove they had no legitimate source for large deposits",
          requirements: ["Obtain income tax records with consent or court order", "Review employment history", "Check business registrations", "Document inability to explain funds"],
          responsible: "Financial Investigation Unit",
          deadline: "14 working days"
        }
      ]
    },
    phase5: {
      phase: "Phase 5",
      title: "Asset Tracing & Freezing Orders",
      description: "Identify and freeze all assets representing proceeds of crime",
      timeline: "Week 8-10",
      priority: "Important",
      steps: [
        {
          id: "step_5_1",
          title: "Trace All Assets Purchased with Proceeds",
          description: "Identify properties, vehicles, investments, and other assets acquired using laundered funds",
          requirements: ["Search land registry records", "Check JPJ vehicle registrations", "Investigate investment accounts", "Document asset purchase dates and amounts"],
          responsible: "Asset Recovery Unit",
          deadline: "14 working days"
        },
        {
          id: "step_5_2",
          title: "Apply for Freezing Orders",
          description: "Obtain court orders to freeze all identified assets under Section 44 AMLA",
          requirements: ["Prepare freezing order applications", "Submit to High Court", "Serve orders on relevant institutions", "Monitor compliance"],
          responsible: "Legal Unit / Asset Recovery",
          deadline: "7 working days"
        },
        {
          id: "step_5_3",
          title: "Freeze All Related Bank Accounts",
          description: "Freeze remaining balances in all accounts belonging to accused and family members",
          requirements: ["Identify all related accounts", "Obtain court freezing orders", "Serve orders on all banks", "Obtain frozen balance confirmations"],
          responsible: "Asset Recovery Unit",
          deadline: "5 working days"
        },
        {
          id: "step_5_4",
          title: "Calculate Total Proceeds and Assets",
          description: "Prepare comprehensive calculation of total proceeds laundered and assets available for forfeiture",
          requirements: ["Sum all transactions", "Value all frozen assets", "Prepare forfeiture calculation", "Document in official report"],
          responsible: "Financial Analyst",
          deadline: "10 working days"
        }
      ]
    },
    phase6: {
      phase: "Phase 6",
      title: "Case Compilation & Prosecution Preparation",
      description: "Compile complete investigation file and prepare for prosecution",
      timeline: "Week 10-12",
      priority: "Critical",
      steps: [
        {
          id: "step_6_1",
          title: "Compile Complete Investigation Paper",
          description: "Prepare comprehensive IP (Investigation Paper) containing all evidence, statements, and legal analysis",
          requirements: ["Organize all documentary evidence", "Include all witness statements", "Attach expert reports", "Prepare case summary and legal opinion"],
          responsible: "Investigating Officer",
          deadline: "14 working days"
        },
        {
          id: "step_6_2",
          title: "Obtain Legal Advice from DPP",
          description: "Submit investigation file to Deputy Public Prosecutor for legal review and charging advice",
          requirements: ["Schedule meeting with DPP", "Present case summary", "Address legal queries", "Obtain charging recommendations"],
          responsible: "Senior Investigating Officer",
          deadline: "7 working days"
        },
        {
          id: "step_6_3",
          title: "Prepare Charge Sheet and Supporting Documents",
          description: "Draft formal charge sheet under Section 4(1)(b) AMLA and prepare all prosecution exhibits",
          requirements: ["Draft charge sheet with particulars", "Prepare exhibit list", "Label and organize all physical evidence", "Create prosecution bundle"],
          responsible: "Legal Unit / IO",
          deadline: "7 working days"
        },
        {
          id: "step_6_4",
          title: "Coordinate Arrest and Remand Application",
          description: "Plan tactical arrest of accused and prepare remand application",
          requirements: ["Brief arrest team on case", "Prepare remand application", "Coordinate with court for mention date", "Execute arrest warrant"],
          responsible: "Raiding Team / IO",
          deadline: "3 working days"
        },
        {
          id: "step_6_5",
          title: "Brief Prosecution Team",
          description: "Conduct comprehensive briefing with DPP and prosecution team on all evidence and witnesses",
          requirements: ["Prepare prosecution brief", "Explain evidence links", "Identify key witnesses", "Discuss defense strategies"],
          responsible: "Senior Investigating Officer",
          deadline: "5 working days"
        },
        {
          id: "step_6_6",
          title: "Submit Case to AG Chambers for Prosecution",
          description: "Forward complete investigation file to Attorney General's Chambers for prosecution decision",
          requirements: ["Finalize investigation paper", "Obtain supervisor approval", "Submit to AG Chambers", "Await prosecution directive"],
          responsible: "Department Head / OCCI",
          deadline: "7 working days"
        }
      ]
    }
  };

  useEffect(() => {
    setPhaseSteps(investigationStepsData);
  }, []);

  const togglePhaseExpansion = (phaseId) => {
    setExpandedPhases(prev => ({
      ...prev,
      [phaseId]: !prev[phaseId]
    }));
  };

  const toggleStepCheck = (stepId) => {
    setCheckedSteps(prev => ({
      ...prev,
      [stepId]: !prev[stepId]
    }));
  };

  const handlePhaseDiaryChange = (phaseKey, value) => {
    setPhaseDiaryText(prev => ({
      ...prev,
      [phaseKey]: value
    }));
  };

  const savePhaseDiaryEntry = (phaseKey) => {
    setPhaseDiaryEntries(prev => ({
      ...prev,
      [phaseKey]: phaseDiaryText[phaseKey] || ''
    }));
  };

  const handleDeleteStep = (stepId) => {
    setDeleteConfirmModal({ show: true, stepId: stepId });
  };

  const confirmDeleteStep = () => {
    if (deleteConfirmModal.stepId) {
      setDeletedSteps(prev => ({
        ...prev,
        [deleteConfirmModal.stepId]: true
      }));
    }
    setDeleteConfirmModal({ show: false, stepId: null });
  };

  const cancelDeleteStep = () => {
    setDeleteConfirmModal({ show: false, stepId: null });
  };

  const handleEditStep = (stepId, step) => {
    setEditingStep(stepId);
    setEditedStepData(prev => ({
      ...prev,
      [stepId]: {
        title: step.title,
        description: step.description,
        requirements: [...step.requirements],
        responsible: step.responsible,
        deadline: step.deadline
      }
    }));
  };

  const handleStepFieldChange = (stepId, field, value) => {
    setEditedStepData(prev => ({
      ...prev,
      [stepId]: {
        ...prev[stepId],
        [field]: value
      }
    }));
  };

  const handleRequirementChange = (stepId, index, value) => {
    setEditedStepData(prev => ({
      ...prev,
      [stepId]: {
        ...prev[stepId],
        requirements: prev[stepId].requirements.map((req, idx) => 
          idx === index ? value : req
        )
      }
    }));
  };

  const handleSaveStep = (phaseKey, stepId) => {
    const updatedPhaseData = { ...investigationStepsData[phaseKey] };
    const stepIndex = updatedPhaseData.steps.findIndex(s => s.id === stepId);
    
    if (stepIndex !== -1 && editedStepData[stepId]) {
      updatedPhaseData.steps[stepIndex] = {
        ...updatedPhaseData.steps[stepIndex],
        ...editedStepData[stepId]
      };
    }
    
    setEditingStep(null);
  };

  const handleSaveNewCard = (phaseKey, stepId) => {
    const cardData = editedStepData[stepId];
    if (!cardData || !cardData.title || cardData.title.trim() === '') {
      setNewCards(prev => ({
        ...prev,
        [phaseKey]: prev[phaseKey].filter(card => card.id !== stepId)
      }));
      setEditedStepData(prev => {
        const newData = { ...prev };
        delete newData[stepId];
        return newData;
      });
      return;
    }
    
    const finalStep = {
      id: stepId,
      title: cardData.title || '',
      description: cardData.description || '',
      requirements: cardData.requirements || [''],
      responsible: cardData.responsible || '',
      deadline: cardData.deadline || ''
    };
    
    setPhaseSteps(prev => ({
      ...prev,
      [phaseKey]: {
        ...prev[phaseKey],
        steps: [...prev[phaseKey].steps, finalStep]
      }
    }));
    
    setNewCards(prev => ({
      ...prev,
      [phaseKey]: prev[phaseKey].filter(card => card.id !== stepId)
    }));
    
    setEditedStepData(prev => {
      const newData = { ...prev };
      delete newData[stepId];
      return newData;
    });
    
    setEditingStep(null);
  };

  const handleAddNewCard = (phaseKey) => {
    const newCardId = `new_card_${Date.now()}`;
    const newCard = {
      id: newCardId,
      title: '',
      description: '',
      requirements: [''],
      responsible: '',
      deadline: '',
      isNew: true
    };
    
    setNewCards(prev => ({
      ...prev,
      [phaseKey]: [...(prev[phaseKey] || []), newCard]
    }));
    
    setEditingStep(newCardId);
    setEditedStepData(prev => ({
      ...prev,
      [newCardId]: newCard
    }));
  };

  return (
    <>
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.35 }}
        className="investigation-steps-section"
      >
        <div className="investigation-steps-header">
          <div>
            <h2 className="section-title-main">Investigation Steps</h2>
            <p className="section-description-sub">Systematic approach to gathering required evidence and building the prosecution case</p>
          </div>
          <div className="investigation-steps-progress">
            <span className="progress-text">
              {Object.values(checkedSteps).filter(Boolean).length} / {
                Object.values(investigationStepsData).reduce((total, phase) => total + phase.steps.length, 0)
              } Completed
            </span>
            <div className="progress-bar-container">
              <div 
                className="progress-bar-fill"
                style={{ 
                  width: `${(Object.values(checkedSteps).filter(Boolean).length / 
                    Object.values(investigationStepsData).reduce((total, phase) => total + phase.steps.length, 0)) * 100}%`
                }}
              />
            </div>
          </div>
        </div>

        <div className="investigation-phases-container">
          {Object.entries(phaseSteps).map(([phaseKey, phaseData]) => (
            <div key={phaseKey} className="investigation-phase-card">
              <div 
                className="phase-card-header"
                onClick={() => togglePhaseExpansion(phaseKey)}
              >
                <div className="phase-header-left">
                  <div className="phase-title-group">
                    <h3 className="phase-title">{phaseData.title}</h3>
                    <p className="phase-description">{phaseData.description}</p>
                  </div>
                </div>
                <div className="phase-header-right">
                  <div className="phase-meta-group">
                    <span className="phase-number-badge">
                      {phaseData.phase}
                    </span>
                    <span className="phase-timeline">{phaseData.timeline}</span>
                  </div>
                  <ChevronDown 
                    size={20} 
                    className="phase-chevron"
                    style={{ 
                      transform: expandedPhases[phaseKey] ? 'rotate(180deg)' : 'rotate(0deg)',
                      transition: 'transform 0.3s ease'
                    }} 
                  />
                </div>
              </div>

              <AnimatePresence>
                {expandedPhases[phaseKey] && (
                  <motion.div
                    initial={{ maxHeight: 0, opacity: 0 }}
                    animate={{ maxHeight: 5000, opacity: 1 }}
                    exit={{ maxHeight: 0, opacity: 0 }}
                    transition={{ duration: 0.4, ease: "easeInOut" }}
                    style={{ overflow: 'hidden' }}
                    className="phase-steps-content"
                  >
                    <div className="steps-grid">
                      {phaseData.steps.map((step, index) => (
                        <React.Fragment key={step.id}>
                          {index === 1 && (
                            <button
                              className="add-step-button"
                              onClick={() => handleAddNewCard(phaseKey)}
                              title="Add new investigation step"
                            >
                              <Plus size={18} />
                            </button>
                          )}
                          {!deletedSteps[step.id] && (
                            <div 
                              className={`step-card ${checkedSteps[step.id] ? 'checked' : ''}`}
                              onMouseEnter={() => setHoveredStep(step.id)}
                              onMouseLeave={() => setHoveredStep(null)}
                              onBlur={(e) => {
                                if (!e.currentTarget.contains(e.relatedTarget)) {
                                  handleSaveNewCard(phaseKey, step.id);
                                }
                              }}
                              tabIndex={0}
                            >
                              <div className="step-card-header">
                                <span className="step-number">{index + 1}</span>
                                {editingStep === step.id ? (
                                  <input
                                    type="text"
                                    className="step-title-input"
                                    value={editedStepData[step.id]?.title || step.title}
                                    onChange={(e) => handleStepFieldChange(step.id, 'title', e.target.value)}
                                    onKeyDown={(e) => {
                                      if (e.key === 'Enter') {
                                        e.preventDefault();
                                        handleSaveStep(phaseKey, step.id);
                                      }
                                    }}
                                  />
                                ) : (
                                  <h4 className="step-title">{editedStepData[step.id]?.title || step.title}</h4>
                                )}
                                {hoveredStep === step.id && editingStep !== step.id && (
                                  <div className="step-action-buttons">
                                    <input
                                      type="checkbox"
                                      className="step-checkbox"
                                      checked={checkedSteps[step.id] || false}
                                      onChange={() => toggleStepCheck(step.id)}
                                      title="Mark as accepted"
                                    />
                                    <button
                                      className="step-delete-btn"
                                      onClick={() => handleDeleteStep(step.id)}
                                      title="Delete step"
                                    >
                                      <X size={14} />
                                    </button>
                                  </div>
                                )}
                                {hoveredStep === step.id && editingStep === step.id && (
                                  <div className="step-action-buttons">
                                    <button
                                      className="step-edit-btn"
                                      onClick={() => handleSaveStep(phaseKey, step.id)}
                                      title="Save step"
                                      style={{ background: '#16A34A' }}
                                    >
                                      ✓
                                    </button>
                                    <button
                                      className="step-delete-btn"
                                      onClick={() => setEditingStep(null)}
                                      title="Cancel"
                                    >
                                      <X size={14} />
                                    </button>
                                  </div>
                                )}
                              </div>
                              
                              {editingStep === step.id ? (
                                <textarea
                                  className="step-description-input"
                                  value={editedStepData[step.id]?.description || step.description}
                                  onChange={(e) => handleStepFieldChange(step.id, 'description', e.target.value)}
                                  rows={4}
                                />
                              ) : (
                                <p className="step-description">{editedStepData[step.id]?.description || step.description}</p>
                              )}

                              <div className="step-detail-section">
                                <h5 className="step-detail-heading">Requirements:</h5>
                                {editingStep === step.id ? (
                                  <textarea
                                    className="step-requirements-textarea"
                                    value={(editedStepData[step.id]?.requirements || step.requirements).join('\n')}
                                    onChange={(e) => handleStepFieldChange(step.id, 'requirements', e.target.value.split('\n'))}
                                    rows={6}
                                    placeholder="Enter requirements (one per line)"
                                  />
                                ) : (
                                  <ul className="step-requirements-list">
                                    {(editedStepData[step.id]?.requirements || step.requirements).map((req, idx) => (
                                      <li key={idx}>{req}</li>
                                    ))}
                                  </ul>
                                )}
                              </div>

                              {hoveredStep === step.id && editingStep !== step.id && (
                                <button
                                  className="step-edit-btn-bottom"
                                  onClick={() => handleEditStep(step.id, step)}
                                  title="Edit step"
                                >
                                  <Edit size={16} />
                                </button>
                              )}

                              <div className="step-footer">
                                <div className="step-footer-info">
                                  <div className="step-info-item">
                                    <span className="step-info-label">Responsible:</span>
                                    {editingStep === step.id ? (
                                      <input
                                        type="text"
                                        className="step-info-input"
                                        value={editedStepData[step.id]?.responsible || step.responsible}
                                        onChange={(e) => handleStepFieldChange(step.id, 'responsible', e.target.value)}
                                      />
                                    ) : (
                                      <span className="step-info-value">{editedStepData[step.id]?.responsible || step.responsible}</span>
                                    )}
                                  </div>
                                  <div className="step-info-item">
                                    <span className="step-info-label">Deadline:</span>
                                    {editingStep === step.id ? (
                                      <input
                                        type="text"
                                        className="step-info-input"
                                        value={editedStepData[step.id]?.deadline || step.deadline}
                                        onChange={(e) => handleStepFieldChange(step.id, 'deadline', e.target.value)}
                                      />
                                    ) : (
                                      <span className="step-info-value">{editedStepData[step.id]?.deadline || step.deadline}</span>
                                    )}
                                  </div>
                                </div>
                              </div>
                            </div>
                          )}
                        </React.Fragment>
                      ))}

                      {newCards[phaseKey]?.filter(step => !deletedSteps[step.id]).map((step, index) => (
                        <div 
                          key={step.id} 
                          className="step-card"
                          onMouseEnter={() => setHoveredStep(step.id)}
                          onMouseLeave={() => setHoveredStep(null)}
                          tabIndex={-1}
                        >
                          <div className="step-card-header">
                            <span className="step-number">{phaseData.steps.length + index + 1}</span>
                            <input
                              type="text"
                              className="step-title-input"
                              placeholder="Enter step title..."
                              value={editedStepData[step.id]?.title || ''}
                              onChange={(e) => handleStepFieldChange(step.id, 'title', e.target.value)}
                              onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                  e.preventDefault();
                                  handleSaveNewCard(phaseKey, step.id);
                                }
                              }}
                              autoFocus
                            />
                            {hoveredStep === step.id && (
                              <div className="step-action-buttons">
                                <button
                                  className="step-edit-btn"
                                  onClick={() => handleSaveNewCard(phaseKey, step.id)}
                                  title="Save step"
                                  style={{ background: '#16A34A' }}
                                >
                                  ✓
                                </button>
                                <button
                                  className="step-delete-btn"
                                  onClick={() => handleDeleteStep(step.id)}
                                  title="Delete step"
                                >
                                  <X size={14} />
                                </button>
                              </div>
                            )}
                          </div>
                          
                          <textarea
                            className="step-description-input"
                            placeholder="Enter step description..."
                            value={editedStepData[step.id]?.description || ''}
                            onChange={(e) => handleStepFieldChange(step.id, 'description', e.target.value)}
                            onKeyDown={(e) => {
                              if (e.key === 'Enter' && e.ctrlKey) {
                                e.preventDefault();
                                handleSaveNewCard(phaseKey, step.id);
                              }
                            }}
                            rows={4}
                          />
                          
                          <div className="step-detail-section">
                            <h5 className="step-detail-heading">Requirements:</h5>
                            <div className="step-requirements-edit">
                              {(editedStepData[step.id]?.requirements || ['']).map((req, idx) => (
                                <input
                                  key={idx}
                                  type="text"
                                  className="step-requirement-input"
                                  placeholder="Enter requirement..."
                                  value={req}
                                  onChange={(e) => handleRequirementChange(step.id, idx, e.target.value)}
                                />
                              ))}
                            </div>
                          </div>
                          
                          <div className="step-footer">
                            <div className="step-footer-info">
                              <div className="step-info-item">
                                <span className="step-info-label">Responsible:</span>
                                <input
                                  type="text"
                                  className="step-info-input"
                                  placeholder="Enter responsible party..."
                                  value={editedStepData[step.id]?.responsible || ''}
                                  onChange={(e) => handleStepFieldChange(step.id, 'responsible', e.target.value)}
                                />
                              </div>
                              <div className="step-info-item">
                                <span className="step-info-label">Deadline:</span>
                                <input
                                  type="text"
                                  className="step-info-input"
                                  placeholder="Enter deadline..."
                                  value={editedStepData[step.id]?.deadline || ''}
                                  onChange={(e) => handleStepFieldChange(step.id, 'deadline', e.target.value)}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="phase-diary-container">
                      <h5 className="phase-diary-title">Investigator Diary</h5>
                      <textarea
                        className="phase-diary-input"
                        placeholder="Add your investigation notes, observations, progress updates, or any relevant information for this phase..."
                        value={phaseDiaryText[phaseKey] !== undefined ? phaseDiaryText[phaseKey] : (phaseDiaryEntries[phaseKey] || '')}
                        onChange={(e) => handlePhaseDiaryChange(phaseKey, e.target.value)}
                        rows={10}
                      />
                      <button 
                        className={`phase-diary-save-btn ${
                          (phaseDiaryText[phaseKey] !== undefined && phaseDiaryText[phaseKey] !== phaseDiaryEntries[phaseKey]) 
                            ? 'active' 
                            : 'disabled'
                        }`}
                        onClick={() => savePhaseDiaryEntry(phaseKey)}
                        disabled={!(phaseDiaryText[phaseKey] !== undefined && phaseDiaryText[phaseKey] !== phaseDiaryEntries[phaseKey])}
                      >
                        Save Entry
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </motion.section>

      {/* Delete Confirmation Modal */}
      <AnimatePresence>
        {deleteConfirmModal.show && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="delete-confirm-overlay"
            onClick={cancelDeleteStep}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", duration: 0.3 }}
              className="delete-confirm-modal"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="delete-confirm-icon">
                <AlertCircle />
              </div>
              <h3 className="delete-confirm-title">Delete Investigation Step?</h3>
              <p className="delete-confirm-message">
                Are you sure you want to delete this step? This action cannot be undone.
              </p>
              <div className="delete-confirm-buttons">
                <button
                  className="delete-confirm-btn delete-cancel-btn"
                  onClick={cancelDeleteStep}
                >
                  Cancel
                </button>
                <button
                  className="delete-confirm-btn delete-confirm-btn-red"
                  onClick={confirmDeleteStep}
                >
                  Delete
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default INVSteps;