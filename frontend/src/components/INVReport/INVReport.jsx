import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Activity, CheckCircle, Briefcase, FileText, Download, ChevronLeft, ChevronRight } from 'lucide-react';
import { jsPDF } from 'jspdf';
import './INVReport.css';

function INVReport() {
  const [currentMetricIndex, setCurrentMetricIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const assessmentRef = useRef(null);
  const [hasAssessmentAnimated, setHasAssessmentAnimated] = useState(false);
  const [assessmentStrength, setAssessmentStrength] = useState(0);

  const metricsData = [
    {
      icon: <CheckCircle size={20} />,
      value: '6/6',
      label: 'Evidence Categories',
      description: 'All major evidence types documented'
    },
    {
      icon: <FileText size={20} />,
      value: '4/4',
      label: 'Legal Elements',
      description: 'All offence elements satisfied'
    },
    {
      icon: <Activity size={20} />,
      value: '6',
      label: 'Evidence Gaps',
      description: 'Areas requiring additional investigation'
    },
    {
      icon: <Activity size={20} />,
      value: '187',
      label: 'Transactions',
      description: 'Total suspicious transactions documented'
    }
  ];

  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setCurrentMetricIndex((prev) => (prev + 1) % metricsData.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [isPaused, metricsData.length]);

  useEffect(() => {
    if (hasAssessmentAnimated) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAssessmentAnimated) {
            setHasAssessmentAnimated(true);
            observer.disconnect();
            
            let strength = 0;
            const strengthInterval = setInterval(() => {
              strength += 1;
              if (strength >= 78) {
                setAssessmentStrength(78);
                clearInterval(strengthInterval);
              } else {
                setAssessmentStrength(strength);
              }
            }, 20);
          }
        });
      },
      { threshold: 0.3 }
    );

    if (assessmentRef.current) {
      observer.observe(assessmentRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [hasAssessmentAnimated]);

  const nextMetric = () => {
    setCurrentMetricIndex((prev) => (prev + 1) % metricsData.length);
  };

  const prevMetric = () => {
    setCurrentMetricIndex((prev) => (prev - 1 + metricsData.length) % metricsData.length);
  };

  const handleGenerateReport = () => {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    const margin = 20;
    const maxWidth = pageWidth - 2 * margin;
    let yPosition = 20;

    const addText = (text, fontSize = 10, isBold = false, align = 'left') => {
      doc.setFontSize(fontSize);
      doc.setFont('helvetica', isBold ? 'bold' : 'normal');
      
      const lines = doc.splitTextToSize(text, maxWidth);
      
      lines.forEach(line => {
        if (yPosition > pageHeight - 20) {
          doc.addPage();
          yPosition = 20;
        }
        
        let xPosition = margin;
        if (align === 'center') {
          xPosition = pageWidth / 2;
        }
        
        doc.text(line, xPosition, yPosition, { align: align });
        yPosition += fontSize * 0.5;
      });
      
      yPosition += 3;
    };

    const addLine = () => {
      doc.line(margin, yPosition, pageWidth - margin, yPosition);
      yPosition += 5;
    };

    const addSpace = (space = 5) => {
      yPosition += space;
    };

    // Header
    doc.setFontSize(16);
    doc.setFont('helvetica', 'bold');
    doc.text('POLIS DIRAJA MALAYSIA', pageWidth / 2, yPosition, { align: 'center' });
    yPosition += 8;
    doc.setFontSize(14);
    doc.text('ROYAL MALAYSIA POLICE', pageWidth / 2, yPosition, { align: 'center' });
    yPosition += 10;
    
    doc.setFontSize(18);
    doc.text('INVESTIGATOR REPORT', pageWidth / 2, yPosition, { align: 'center' });
    yPosition += 10;
    
    addLine();
    addSpace();

    // Case Information
    addText('CASE REFERENCE: ML-2024-KL-08841', 11, true);
    addText('OFFENCE TYPE: Money Laundering', 11, true);
    addText('INVESTIGATION PERIOD: January 2026 - June 2026', 11, true);
    addSpace(5);
    addLine();
    addSpace();

    // Suspect Information
    addText('SUSPECT INFORMATION', 14, true, 'left');
    addLine();
    addSpace();
    
    addText('PRIMARY SUSPECT:', 11, true);
    addText('Name: Encik Ahmad bin Hassan');
    addText('IC Number: 750512-10-5234');
    addText('Age: 49 years');
    addText('Nationality: Malaysian');
    addText('Occupation: Business Owner');
    addSpace();

    addText('BUSINESS ENTITY:', 11, true);
    addText('Company: Stellar Solutions Sdn Bhd');
    addText('Registration No: 201801024567');
    addText('Status: Active (Fake/Shell Company)');
    addText('Director: Ahmad bin Hassan');
    addText('Address: No physical premises');
    addSpace();

    addText('CONTACT INFORMATION:', 11, true);
    addText('Primary Phone: +60 12-345 6789');
    addText('Secondary Phone: +60 19-876 5432');
    addText('Email: ahmad.hassan@stellarsol.com');
    addSpace(5);
    addLine();
    addSpace();

    // Case Summary
    addText('CASE SUMMARY', 14, true);
    addLine();
    addSpace();
    
    addText('Total Amount Involved: RM 8,500,000.00', 11, true);
    addText('Total Transactions: 187', 11, true);
    addText('Jurisdictions Involved: 4 (Malaysia, British Virgin Islands, Singapore, Hong Kong)', 11, true);
    addText('Investigation Period: January 2026 - June 2026', 11, true);
    addSpace(5);
    addLine();
    addSpace();

    // Add more sections as needed...
    addText('CONCLUSION', 14, true);
    addLine();
    addSpace();

    addText('Based on the comprehensive investigation conducted, there exists SUFFICIENT EVIDENCE to proceed with criminal charges against Encik Ahmad bin Hassan under Section 4(1)(b) of the Anti-Money Laundering, Anti-Terrorism Financing and Proceeds of Unlawful Activities Act 2001.');
    addSpace();
    addText('Recommendation: PROCEED TO PROSECUTION', 12, true);
    addSpace(10);

    // Sign-off
    addLine();
    const currentDate = new Date().toLocaleDateString('en-GB');
    addText(`REPORT PREPARED BY:`, 11, true);
    addText('Investigating Officer: ASP Rahman bin Abdullah');
    addText('Badge Number: 12345');
    addText('Department: Commercial Crime Investigation Department');
    addText(`Date: ${currentDate}`);

    // Save the PDF
    doc.save(`Investigator_Report_ML-2024-KL-08841_${new Date().toISOString().split('T')[0]}.pdf`);
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
      className="report-assessment-section"
    >
      <h2 className="section-title-main">Investigator Report Assessment</h2>

      <div className="assessment-dashboard">
        {/* Top Metrics Row */}
        <div className="metrics-row-top">
          <div className="metric-primary-card" ref={assessmentRef}>
            <div className="metric-icon-circle">
              <Activity size={24} />
            </div>
            <div className="metric-main-content">
              <div className="metric-large-value">{assessmentStrength}%</div>
              <div className="metric-large-label">Case Strength</div>
              <div className="metric-large-sublabel">Evidence Adequacy Level</div>
            </div>
            <div className="metric-strength-bar"></div>
          </div>

          <div 
            className="metric-carousel-card"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            <button onClick={prevMetric} className="carousel-nav-btn left">
              <ChevronLeft size={16} />
            </button>
            
            <motion.div
              key={currentMetricIndex}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.3 }}
              className="carousel-content"
            >
              <div className="carousel-icon">
                {metricsData[currentMetricIndex].icon}
              </div>
              <div className="carousel-value">{metricsData[currentMetricIndex].value}</div>
              <div className="carousel-label">{metricsData[currentMetricIndex].label}</div>
              <div className="carousel-desc">{metricsData[currentMetricIndex].description}</div>
            </motion.div>

            <button onClick={nextMetric} className="carousel-nav-btn right">
              <ChevronRight size={16} />
            </button>

            <div className="carousel-indicators">
              {metricsData.map((_, index) => (
                <div
                  key={index}
                  className={`indicator-dot ${index === currentMetricIndex ? 'active' : ''}`}
                  onClick={() => setCurrentMetricIndex(index)}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Assessment Grid */}
        <div className="assessment-grid-main">
          <div className="assessment-panel-left">
            <div className="assessment-header-section">
              <h3 className="assessment-main-title">Case Viability Assessment</h3>
              
              <div className="confidence-bar-section">
                <div className="confidence-labels-row">
                  <span>Weak</span>
                  <span>Moderate</span>
                  <span>Strong</span>
                  <span>Compelling</span>
                </div>
                <div className="confidence-bar-wrapper">
                  <motion.div 
                    className="confidence-bar-fill"
                    initial={{ width: 0 }}
                    animate={{ width: `${assessmentStrength}%` }}
                    transition={{ duration: 0.02 }}
                  />
                  <div className="confidence-marker" style={{ left: `${assessmentStrength}%` }}>
                    <div className="marker-circle"></div>
                    <div className="marker-value">{assessmentStrength}%</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="conclusion-panel">
              <div className="conclusion-icon-circle">
                <CheckCircle size={20} />
              </div>
              <div>
                <h4 className="conclusion-title-text">Sufficient Evidence for Prosecution</h4>
                <p className="conclusion-para">
                  Current evidence portfolio is sufficient to proceed with charges under Section 4, AMLA 2001. The case demonstrates strong foundational evidence including comprehensive banking records, digital communications, CCTV documentation, and circumstantial evidence establishing both actus reus and mens rea elements.
                </p>
                <p className="conclusion-para">
                  However, obtaining the identified evidence gaps - particularly personal financial records, digital forensics from residence, and offshore operator testimony - would substantially strengthen the prosecution's position and increase conviction probability from strong to compelling.
                </p>
              </div>
            </div>

            <div className="factors-panel">
              <h4 className="factors-title">Strength Factors</h4>
              <div className="factors-grid-layout">
                <div className="factor-item positive">
                  <div className="factor-sign">+</div>
                  <div>
                    <div className="factor-name">Banking Evidence</div>
                    <div className="factor-detail">Complete transaction trail with timestamps</div>
                  </div>
                </div>

                <div className="factor-item positive">
                  <div className="factor-sign">+</div>
                  <div>
                    <div className="factor-name">Pattern Evidence</div>
                    <div className="factor-detail">47 repetitions demonstrate systematic behavior</div>
                  </div>
                </div>

                <div className="factor-item positive">
                  <div className="factor-sign">+</div>
                  <div>
                    <div className="factor-name">Communications</div>
                    <div className="factor-detail">Coded language establishes knowledge</div>
                  </div>
                </div>

                <div className="factor-item negative">
                  <div className="factor-sign">−</div>
                  <div>
                    <div className="factor-name">Witness Testimony</div>
                    <div className="factor-detail">Lack of direct testimony from operators</div>
                  </div>
                </div>

                <div className="factor-item negative">
                  <div className="factor-sign">−</div>
                  <div>
                    <div className="factor-name">Personal Records</div>
                    <div className="factor-detail">Missing financial records showing wealth</div>
                  </div>
                </div>

                <div className="factor-item positive">
                  <div className="factor-sign">+</div>
                  <div>
                    <div className="factor-name">CCTV Evidence</div>
                    <div className="factor-detail">Visual proof of disguised withdrawals</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="assessment-panel-right">
            <div className="recommendation-card">
              <div className="card-header-icon">
                <Briefcase size={16} />
                <h4 className="card-title-small">Prosecution Recommendation</h4>
              </div>
              
              <div className="recommendation-status-box">
                <div className="status-check">✓</div>
                <div className="status-label">Proceed with Charges</div>
              </div>

              <div className="recommendation-details-list">
                <div className="rec-detail">
                  <span className="rec-label-text">Primary Charge</span>
                  <span className="rec-value-text">Section 4(1) AMLA</span>
                </div>
                <div className="rec-detail">
                  <span className="rec-label-text">Estimated Timeline</span>
                  <span className="rec-value-text">6-8 weeks to trial</span>
                </div>
                <div className="rec-detail">
                  <span className="rec-label-text">Conviction Probability</span>
                  <span className="rec-value-text">Strong (75-85%)</span>
                </div>
              </div>
            </div>

            <div className="next-steps-card">
              <div className="card-header-icon">
                <FileText size={16} />
                <h4 className="card-title-small">Immediate Actions</h4>
              </div>

              <div className="steps-list">
                <div className="step-row">
                  <div className="step-num-circle">1</div>
                  <span className="step-text-small">File court application for residence search warrant</span>
                </div>
                <div className="step-row">
                  <div className="step-num-circle">2</div>
                  <span className="step-text-small">Request MLAT for offshore operator testimony</span>
                </div>
                <div className="step-row">
                  <div className="step-num-circle">3</div>
                  <span className="step-text-small">Engage forensic accountant for money trail analysis</span>
                </div>
                <div className="step-row">
                  <div className="step-num-circle">4</div>
                  <span className="step-text-small">Compile formal investigator report for AG Chambers</span>
                </div>
              </div>
            </div>

            <div className="generate-card">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleGenerateReport}
                className="btn-generate-main"
              >
                <Download size={16} />
                <span>Generate Full Report</span>
              </motion.button>
              <p className="generate-desc-text">
                Comprehensive PDF report including all evidence documentation, legal analysis, and case recommendations
              </p>
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
}

export default INVReport;