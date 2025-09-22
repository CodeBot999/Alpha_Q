import React, { useState } from 'react';

const TUTORIAL_SECTIONS = [
  {
    id: 1,
    title: 'Getting Started',
    icon: 'fas fa-play-circle',
    color: '#28a745',
    steps: [
      {
        step: 1,
        title: 'Create Your Account',
        description: 'Login using your credentials provided by GVMC to access the citizen portal.',
        tips: 'Keep your login credentials secure and contact support if you face any login issues.'
      },
      {
        step: 2,
        title: 'Complete Your Profile',
        description: 'Fill in your personal information, contact details, and verify your address for better service.',
        tips: 'Accurate information helps us provide location-specific waste management services.'
      },
      {
        step: 3,
        title: 'Explore the Dashboard',
        description: 'Familiarize yourself with the main dashboard and available features like reporting, shopping, and tutorials.',
        tips: 'Use the dashboard tiles to quickly navigate to different sections of the portal.'
      }
    ]
  },
  {
    id: 2,
    title: 'Reporting Waste Issues',
    icon: 'fas fa-camera',
    color: '#17a2b8',
    steps: [
      {
        step: 1,
        title: 'Access Scan & Report',
        description: 'Click on the "Scan & Report" tile from your dashboard to start reporting waste issues.',
        tips: 'Make sure you have camera permissions enabled for taking photos.'
      },
      {
        step: 2,
        title: 'Capture Clear Photos',
        description: 'Take clear, well-lit photos of the waste issue. Multiple angles help GVMC workers understand the problem better.',
        tips: 'Avoid blurry images and ensure the waste issue is clearly visible in the photo.'
      },
      {
        step: 3,
        title: 'Add Location & Description',
        description: 'Select the accurate location from the dropdown and provide a detailed description of the waste issue.',
        tips: 'Be specific about the location and type of waste to help workers prepare appropriate tools.'
      },
      {
        step: 4,
        title: 'Submit & Track',
        description: 'Submit your report and track its progress. You will earn 10 points for each verified report.',
        tips: 'Check the history section regularly to see updates on your submitted reports.'
      }
    ]
  },
  {
    id: 3,
    title: 'Filing Complaints',
    icon: 'fas fa-exclamation-triangle',
    color: '#dc3545',
    steps: [
      {
        step: 1,
        title: 'Choose Complaint Category',
        description: 'Select the appropriate category that best describes your complaint from the provided options.',
        tips: 'Choosing the right category helps route your complaint to the correct department.'
      },
      {
        step: 2,
        title: 'Set Priority Level',
        description: 'Indicate the urgency of your complaint using priority levels (Low, Medium, High).',
        tips: 'High priority should be reserved for urgent issues affecting public health or safety.'
      },
      {
        step: 3,
        title: 'Provide Details',
        description: 'Write a clear subject line and detailed description of your complaint with relevant information.',
        tips: 'Include specific dates, times, and locations to help us investigate your complaint effectively.'
      },
      {
        step: 4,
        title: 'Attach Evidence',
        description: 'Upload photos or documents that support your complaint if available.',
        tips: 'Visual evidence helps us understand and resolve your complaint faster.'
      }
    ]
  },
  {
    id: 4,
    title: 'Shopping for Eco Products',
    icon: 'fas fa-shopping-cart',
    color: '#fd7e14',
    steps: [
      {
        step: 1,
        title: 'Browse Products',
        description: 'Explore our catalog of eco-friendly waste management products including dustbins and bags.',
        tips: 'Use the search and filter options to quickly find products you need.'
      },
      {
        step: 2,
        title: 'Add to Cart',
        description: 'Select products and add them to your shopping cart. Review quantities and specifications.',
        tips: 'Check product descriptions and government subsidies available before purchasing.'
      },
      {
        step: 3,
        title: 'Choose Payment Method',
        description: 'Select between cash payment or redeem your earned points for discounts.',
        tips: 'Points provide 1:1 rupee discount. Combine points with cash for larger purchases.'
      },
      {
        step: 4,
        title: 'Complete Purchase',
        description: 'Review your order and complete the purchase. Track delivery through the portal.',
        tips: 'Keep your order confirmation number for tracking and support queries.'
      }
    ]
  },
  {
    id: 5,
    title: 'Earning & Using Points',
    icon: 'fas fa-coins',
    color: '#ffc107',
    steps: [
      {
        step: 1,
        title: 'Understand Point System',
        description: 'Learn how to earn points through various activities like reporting waste, completing tutorials, and filing valid complaints.',
        tips: 'Check the Points section regularly to see new earning opportunities.'
      },
      {
        step: 2,
        title: 'Complete Learning Modules',
        description: 'Take tutorial courses on waste segregation, composting, and environmental awareness to earn bonus points.',
        tips: 'Courses are designed for all education levels with simple, practical content.'
      },
      {
        step: 3,
        title: 'Redeem Points',
        description: 'Use earned points for shop discounts, tax benefits, certificates, and free products.',
        tips: 'Points never expire, so you can save them for larger redemptions.'
      },
      {
        step: 4,
        title: 'Track Your Progress',
        description: 'Monitor your point balance, transaction history, and tier status in the Points section.',
        tips: 'Higher tiers unlock additional benefits and exclusive redemption options.'
      }
    ]
  }
];

const HowToUse = ({ onNavigate }) => {
  const [activeSection, setActiveSection] = useState(null);
  const [currentStep, setCurrentStep] = useState(0);

  const handleSectionClick = (sectionId) => {
    if (activeSection === sectionId) {
      setActiveSection(null);
      setCurrentStep(0);
    } else {
      setActiveSection(sectionId);
      setCurrentStep(0);
    }
  };

  const selectedSection = TUTORIAL_SECTIONS.find(s => s.id === activeSection);

  return (
    <div className="min-vh-100" style={{ backgroundColor: '#f8f9fa' }}>
      {/* Header */}
      <nav className="navbar navbar-dark shadow-sm" style={{ background: 'linear-gradient(135deg, #17a2b8 0%, #138496 100%)' }}>
        <div className="container">
          <button 
            className="btn btn-outline-light"
            onClick={() => onNavigate('dashboard')}
          >
            <i className="fas fa-arrow-left me-2"></i>Back to Dashboard
          </button>
          <h4 className="navbar-brand mb-0 mx-auto fw-bold">
            <i className="fas fa-question-circle me-2"></i>How to Use Portal
          </h4>
          <div></div>
        </div>
      </nav>

      <div className="container py-4">
        {/* Introduction */}
        <div className="row mb-4">
          <div className="col-12">
            <div className="card border-0 shadow-sm" style={{ borderRadius: '16px', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
              <div className="card-body p-4 text-white text-center">
                <h2 className="fw-bold mb-2">Welcome to GVMC Waste Management Portal</h2>
                <p className="mb-3 opacity-90">
                  This comprehensive guide will help you navigate and use all features of our citizen portal effectively.
                  Learn how to report waste, file complaints, earn points, and contribute to a cleaner Visakhapatnam.
                </p>
                <div className="row justify-content-center">
                  <div className="col-auto">
                    <div className="d-flex gap-4">
                      <div className="text-center">
                        <i className="fas fa-users fs-3 mb-2"></i>
                        <div className="fw-bold">For All Citizens</div>
                        <small className="opacity-75">Easy to follow</small>
                      </div>
                      <div className="text-center">
                        <i className="fas fa-mobile-alt fs-3 mb-2"></i>
                        <div className="fw-bold">Mobile Friendly</div>
                        <small className="opacity-75">Use on any device</small>
                      </div>
                      <div className="text-center">
                        <i className="fas fa-clock fs-3 mb-2"></i>
                        <div className="fw-bold">Quick Learning</div>
                        <small className="opacity-75">5-10 minutes each</small>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tutorial Sections */}
        <div className="row">
          <div className="col-md-4">
            {/* Section Menu */}
            <div className="card border-0 shadow-sm sticky-top" style={{ borderRadius: '16px', top: '20px' }}>
              <div className="card-body p-3">
                <h6 className="fw-bold mb-3 text-center">
                  <i className="fas fa-list me-2"></i>Tutorial Sections
                </h6>
                <div className="list-group list-group-flush">
                  {TUTORIAL_SECTIONS.map((section) => (
                    <button
                      key={section.id}
                      className={`list-group-item list-group-item-action border-0 rounded mb-2 ${activeSection === section.id ? 'active' : ''}`}
                      style={{
                        backgroundColor: activeSection === section.id ? section.color : 'transparent',
                        color: activeSection === section.id ? 'white' : '#333',
                        border: `1px solid ${section.color}20`
                      }}
                      onClick={() => handleSectionClick(section.id)}
                    >
                      <div className="d-flex align-items-center">
                        <i className={`${section.icon} me-3`} style={{ color: activeSection === section.id ? 'white' : section.color }}></i>
                        <div className="flex-grow-1 text-start">
                          <div className="fw-semibold">{section.title}</div>
                          <small className={activeSection === section.id ? 'text-white-50' : 'text-muted'}>
                            {section.steps.length} steps
                          </small>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
                
                {/* Video Tutorial Button */}
                <div className="mt-4 text-center">
                  <button 
                    className="btn btn-outline-primary w-100"
                    style={{ borderRadius: '25px' }}
                    onClick={() => alert('Video tutorials will be uploaded soon!')}
                  >
                    <i className="fas fa-video me-2"></i>
                    Video Tutorials
                  </button>
                  <small className="text-muted d-block mt-2">
                    <i className="fas fa-info-circle me-1"></i>
                    Video content coming soon
                  </small>
                </div>
              </div>
            </div>
          </div>
          
          <div className="col-md-8">
            {!selectedSection ? (
              /* Default Content */
              <div className="card border-0 shadow-sm" style={{ borderRadius: '16px' }}>
                <div className="card-body p-4 text-center">
                  <i className="fas fa-arrow-left text-primary fs-1 mb-4"></i>
                  <h5 className="fw-bold mb-3">Select a Tutorial Section</h5>
                  <p className="text-muted mb-4">
                    Choose from the tutorial sections on the left to learn about specific features of the GVMC portal.
                    Each section provides step-by-step instructions with helpful tips.
                  </p>
                  
                  <div className="row g-4 mt-4">
                    {TUTORIAL_SECTIONS.slice(0, 3).map((section) => (
                      <div key={section.id} className="col-12">
                        <div 
                          className="p-3 rounded text-start"
                          style={{ backgroundColor: `${section.color}10`, border: `1px solid ${section.color}30` }}
                        >
                          <div className="d-flex align-items-center">
                            <i className={`${section.icon} fs-4 me-3`} style={{ color: section.color }}></i>
                            <div>
                              <div className="fw-semibold">{section.title}</div>
                              <small className="text-muted">{section.steps.length} easy steps to master this feature</small>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              /* Selected Section Content */
              <div className="card border-0 shadow-sm" style={{ borderRadius: '16px' }}>
                <div 
                  className="card-header border-0 text-white"
                  style={{ background: selectedSection.color, borderRadius: '16px 16px 0 0' }}
                >
                  <div className="d-flex align-items-center justify-content-between">
                    <div className="d-flex align-items-center">
                      <i className={`${selectedSection.icon} fs-4 me-3`}></i>
                      <div>
                        <h5 className="mb-0 fw-bold">{selectedSection.title}</h5>
                        <small className="opacity-75">{selectedSection.steps.length} Steps to Complete</small>
                      </div>
                    </div>
                    <div className="text-end">
                      <div className="fw-bold">Step {currentStep + 1}</div>
                      <small className="opacity-75">of {selectedSection.steps.length}</small>
                    </div>
                  </div>
                  
                  {/* Progress Bar */}
                  <div className="mt-3">
                    <div className="progress" style={{ height: '4px', background: 'rgba(255,255,255,0.3)' }}>
                      <div 
                        className="progress-bar"
                        style={{ 
                          width: `${((currentStep + 1) / selectedSection.steps.length) * 100}%`,
                          background: 'rgba(255,255,255,0.8)'
                        }}
                      ></div>
                    </div>
                  </div>
                </div>
                
                <div className="card-body p-4">
                  {/* Current Step Content */}
                  <div className="mb-4">
                    <div className="d-flex align-items-center mb-3">
                      <div 
                        className="me-3"
                        style={{
                          width: '50px',
                          height: '50px',
                          background: `${selectedSection.color}20`,
                          borderRadius: '12px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: selectedSection.color,
                          fontSize: '1.25rem',
                          fontWeight: 'bold'
                        }}
                      >
                        {selectedSection.steps[currentStep].step}
                      </div>
                      <div>
                        <h5 className="fw-bold mb-1">{selectedSection.steps[currentStep].title}</h5>
                        <small className="text-muted">Step {currentStep + 1} of {selectedSection.steps.length}</small>
                      </div>
                    </div>
                    
                    <div className="mb-3">
                      <p className="mb-3">{selectedSection.steps[currentStep].description}</p>
                    </div>
                    
                    <div className="alert alert-info">
                      <i className="fas fa-lightbulb me-2"></i>
                      <strong>Pro Tip:</strong> {selectedSection.steps[currentStep].tips}
                    </div>
                  </div>
                  
                  {/* Navigation Buttons */}
                  <div className="d-flex justify-content-between">
                    <button 
                      className="btn btn-outline-secondary"
                      onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
                      disabled={currentStep === 0}
                    >
                      <i className="fas fa-chevron-left me-2"></i>
                      Previous Step
                    </button>
                    
                    <div className="btn-group">
                      {selectedSection.steps.map((_, index) => (
                        <button
                          key={index}
                          className={`btn btn-sm ${currentStep === index ? 'btn-primary' : 'btn-outline-secondary'}`}
                          onClick={() => setCurrentStep(index)}
                        >
                          {index + 1}
                        </button>
                      ))}
                    </div>
                    
                    {currentStep < selectedSection.steps.length - 1 ? (
                      <button 
                        className="btn btn-primary"
                        onClick={() => setCurrentStep(currentStep + 1)}
                      >
                        Next Step
                        <i className="fas fa-chevron-right ms-2"></i>
                      </button>
                    ) : (
                      <button 
                        className="btn btn-success"
                        onClick={() => {
                          setActiveSection(null);
                          setCurrentStep(0);
                        }}
                      >
                        Complete
                        <i className="fas fa-check ms-2"></i>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            )}
            
            {/* Quick Actions */}
            <div className="row g-3 mt-4">
              <div className="col-md-6">
                <div className="card border-0 shadow-sm" style={{ borderRadius: '12px' }}>
                  <div className="card-body p-3 text-center">
                    <i className="fas fa-headset text-primary fs-3 mb-2"></i>
                    <h6 className="fw-bold mb-2">Need More Help?</h6>
                    <button 
                      className="btn btn-primary btn-sm"
                      onClick={() => onNavigate('contact-help')}
                    >
                      Contact Support
                    </button>
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="card border-0 shadow-sm" style={{ borderRadius: '12px' }}>
                  <div className="card-body p-3 text-center">
                    <i className="fas fa-graduation-cap text-success fs-3 mb-2"></i>
                    <h6 className="fw-bold mb-2">Learn & Earn</h6>
                    <button 
                      className="btn btn-success btn-sm"
                      onClick={() => onNavigate('tutorials')}
                    >
                      Start Tutorials
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HowToUse;
