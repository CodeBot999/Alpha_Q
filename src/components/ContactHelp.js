import React, { useState } from 'react';

const EMERGENCY_CONTACTS = [
  {
    id: 1,
    department: 'GVMC Emergency Helpline',
    phone: '+91-891-2748000',
    email: 'emergency@gvmc.gov.in',
    hours: '24/7',
    icon: 'fas fa-phone-alt',
    color: '#dc3545'
  },
  {
    id: 2,
    department: 'Waste Management Division',
    phone: '+91-891-2748100',
    email: 'waste@gvmc.gov.in',
    hours: '6:00 AM - 10:00 PM',
    icon: 'fas fa-recycle',
    color: '#28a745'
  },
  {
    id: 3,
    department: 'Complaint Registration',
    phone: '+91-891-2748200',
    email: 'complaints@gvmc.gov.in',
    hours: '9:00 AM - 6:00 PM',
    icon: 'fas fa-exclamation-triangle',
    color: '#ffc107'
  },
  {
    id: 4,
    department: 'Technical Support',
    phone: '+91-891-2748300',
    email: 'support@gvmc.gov.in',
    hours: '9:00 AM - 9:00 PM',
    icon: 'fas fa-headset',
    color: '#17a2b8'
  }
];

const FAQ_ITEMS = [
  {
    id: 1,
    question: 'How do I report waste on the street?',
    answer: 'Use the "Scan & Report" feature to take a photo of the waste, select the location, and submit your report. You will earn points for each verified report.'
  },
  {
    id: 2,
    question: 'What types of complaints can I file?',
    answer: 'You can file complaints about collection delays, missed pickups, worker issues, bin overflow, street littering, improper segregation, vehicle problems, and other waste management related issues.'
  },
  {
    id: 3,
    question: 'How do I earn and redeem points?',
    answer: 'Earn points by submitting waste reports, completing tutorial courses, and participating in community activities. Redeem points in the shop for eco-friendly products or government tax discounts.'
  },
  {
    id: 4,
    question: 'How long does it take to resolve complaints?',
    answer: 'Most complaints are acknowledged within 24 hours. Resolution time depends on the complexity and priority of the issue, typically ranging from 2-7 business days.'
  },
  {
    id: 5,
    question: 'Can I track the status of my reports and complaints?',
    answer: 'Yes, you can track all your submissions in the respective history sections. You will receive notifications when the status changes.'
  },
  {
    id: 6,
    question: 'What should I do for hazardous waste disposal?',
    answer: 'Contact our Waste Management Division directly for hazardous waste. Do not dispose of batteries, chemicals, or medical waste in regular bins. Special collection services are available.'
  }
];

const ContactHelp = ({ onNavigate }) => {
  const [activeTab, setActiveTab] = useState('contacts');
  const [helpQuery, setHelpQuery] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    category: 'general'
  });
  const [expandedFaq, setExpandedFaq] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setHelpQuery(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmitQuery = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));

    // TODO: Send to GVMC support system
    console.log('Help query submitted:', helpQuery);

    alert('Your help query has been submitted successfully! We will respond within 24 hours.');
    
    // Reset form
    setHelpQuery({
      name: '',
      email: '',
      subject: '',
      message: '',
      category: 'general'
    });
    setIsSubmitting(false);
  };

  const toggleFaq = (faqId) => {
    setExpandedFaq(expandedFaq === faqId ? null : faqId);
  };

  return (
    <div className="min-vh-100" style={{ backgroundColor: '#f8f9fa' }}>
      {/* Header */}
      <nav className="navbar navbar-dark shadow-sm" style={{ background: 'linear-gradient(135deg, #6f42c1 0%, #5a32a3 100%)' }}>
        <div className="container">
          <button 
            className="btn btn-outline-light"
            onClick={() => onNavigate('dashboard')}
          >
            <i className="fas fa-arrow-left me-2"></i>Back to Dashboard
          </button>
          <h4 className="navbar-brand mb-0 mx-auto fw-bold">
            <i className="fas fa-headset me-2"></i>Help & Support
          </h4>
          <div></div>
        </div>
      </nav>

      <div className="container py-4">
        {/* Tab Navigation */}
        <div className="row mb-4">
          <div className="col-12">
            <div className="card border-0 shadow-sm" style={{ borderRadius: '16px' }}>
              <div className="card-body p-0">
                <nav className="nav nav-pills nav-fill">
                  {[
                    { id: 'contacts', label: 'Emergency Contacts', icon: 'fas fa-phone-alt' },
                    { id: 'faq', label: 'Frequently Asked Questions', icon: 'fas fa-question-circle' },
                    { id: 'help', label: 'Submit Help Query', icon: 'fas fa-paper-plane' }
                  ].map((tab) => (
                    <button 
                      key={tab.id}
                      className={`nav-link ${activeTab === tab.id ? 'active' : ''}`}
                      style={{ 
                        borderRadius: activeTab === tab.id ? '16px' : '0',
                        background: activeTab === tab.id ? '#6f42c1' : 'transparent',
                        color: activeTab === tab.id ? 'white' : '#6c757d',
                        border: 'none',
                        padding: '15px'
                      }}
                      onClick={() => setActiveTab(tab.id)}
                    >
                      <i className={`${tab.icon} me-2`}></i>
                      <span className="d-none d-md-inline">{tab.label}</span>
                    </button>
                  ))}
                </nav>
              </div>
            </div>
          </div>
        </div>

        {/* Emergency Contacts Tab */}
        {activeTab === 'contacts' && (
          <div className="row">
            <div className="col-12">
              <div className="card border-0 shadow-sm" style={{ borderRadius: '16px' }}>
                <div className="card-body p-4">
                  <h5 className="fw-bold mb-4 text-center">
                    <i className="fas fa-phone-alt me-2 text-danger"></i>
                    GVMC Emergency Contacts
                  </h5>
                  
                  <div className="row g-4">
                    {EMERGENCY_CONTACTS.map((contact) => (
                      <div key={contact.id} className="col-md-6">
                        <div 
                          className="card h-100 border-0 shadow-sm"
                          style={{ borderRadius: '12px', borderLeft: `4px solid ${contact.color}` }}
                        >
                          <div className="card-body p-4">
                            <div className="d-flex align-items-center mb-3">
                              <div 
                                className="me-3"
                                style={{
                                  width: '50px',
                                  height: '50px',
                                  background: `${contact.color}20`,
                                  borderRadius: '12px',
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  color: contact.color
                                }}
                              >
                                <i className={`${contact.icon} fs-4`}></i>
                              </div>
                              <div>
                                <h6 className="fw-bold mb-1">{contact.department}</h6>
                                <small className="text-muted">{contact.hours}</small>
                              </div>
                            </div>
                            
                            <div className="mb-3">
                              <div className="d-flex align-items-center mb-2">
                                <i className="fas fa-phone text-muted me-2"></i>
                                <a href={`tel:${contact.phone}`} className="text-decoration-none fw-semibold">
                                  {contact.phone}
                                </a>
                              </div>
                              <div className="d-flex align-items-center">
                                <i className="fas fa-envelope text-muted me-2"></i>
                                <a href={`mailto:${contact.email}`} className="text-decoration-none">
                                  {contact.email}
                                </a>
                              </div>
                            </div>
                            
                            <div className="d-flex gap-2">
                              <button 
                                className="btn btn-sm flex-fill"
                                style={{ 
                                  backgroundColor: `${contact.color}20`,
                                  color: contact.color,
                                  border: `1px solid ${contact.color}`
                                }}
                                onClick={() => window.open(`tel:${contact.phone}`)}
                              >
                                <i className="fas fa-phone me-1"></i>Call
                              </button>
                              <button 
                                className="btn btn-outline-secondary btn-sm flex-fill"
                                onClick={() => window.open(`mailto:${contact.email}`)}
                              >
                                <i className="fas fa-envelope me-1"></i>Email
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="alert alert-info mt-4" role="alert">
                    <i className="fas fa-info-circle me-2"></i>
                    <strong>Note:</strong> For life-threatening emergencies, please dial <strong>108</strong> (Ambulance) or <strong>100</strong> (Police).
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* FAQ Tab */}
        {activeTab === 'faq' && (
          <div className="row">
            <div className="col-12">
              <div className="card border-0 shadow-sm" style={{ borderRadius: '16px' }}>
                <div className="card-body p-4">
                  <h5 className="fw-bold mb-4 text-center">
                    <i className="fas fa-question-circle me-2 text-info"></i>
                    Frequently Asked Questions
                  </h5>
                  
                  <div className="accordion" id="faqAccordion">
                    {FAQ_ITEMS.map((faq) => (
                      <div key={faq.id} className="accordion-item border-0 mb-3" style={{ borderRadius: '12px', overflow: 'hidden', boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }}>
                        <h2 className="accordion-header">
                          <button 
                            className={`accordion-button fw-semibold ${expandedFaq !== faq.id ? 'collapsed' : ''}`}
                            type="button"
                            onClick={() => toggleFaq(faq.id)}
                            style={{ 
                              backgroundColor: expandedFaq === faq.id ? '#6f42c1' : 'white',
                              color: expandedFaq === faq.id ? 'white' : '#333',
                              border: 'none'
                            }}
                          >
                            <i className="fas fa-question-circle me-3"></i>
                            {faq.question}
                          </button>
                        </h2>
                        <div className={`accordion-collapse collapse ${expandedFaq === faq.id ? 'show' : ''}`}>
                          <div className="accordion-body">
                            <i className="fas fa-lightbulb text-warning me-2"></i>
                            {faq.answer}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Help Query Tab */}
        {activeTab === 'help' && (
          <div className="row">
            <div className="col-lg-8 mx-auto">
              <div className="card border-0 shadow-sm" style={{ borderRadius: '16px' }}>
                <div className="card-body p-4">
                  <h5 className="fw-bold mb-4 text-center">
                    <i className="fas fa-paper-plane me-2 text-success"></i>
                    Submit Help Query
                  </h5>
                  
                  <form onSubmit={handleSubmitQuery}>
                    <div className="row mb-3">
                      <div className="col-md-6">
                        <label className="form-label fw-semibold">
                          <i className="fas fa-user me-2"></i>Your Name *
                        </label>
                        <input 
                          type="text"
                          name="name"
                          className="form-control"
                          placeholder="Enter your full name"
                          value={helpQuery.name}
                          onChange={handleInputChange}
                          required
                          style={{ borderRadius: '10px' }}
                        />
                      </div>
                      <div className="col-md-6">
                        <label className="form-label fw-semibold">
                          <i className="fas fa-envelope me-2"></i>Email Address *
                        </label>
                        <input 
                          type="email"
                          name="email"
                          className="form-control"
                          placeholder="Enter your email"
                          value={helpQuery.email}
                          onChange={handleInputChange}
                          required
                          style={{ borderRadius: '10px' }}
                        />
                      </div>
                    </div>
                    
                    <div className="row mb-3">
                      <div className="col-md-6">
                        <label className="form-label fw-semibold">
                          <i className="fas fa-folder me-2"></i>Category
                        </label>
                        <select 
                          name="category"
                          className="form-select"
                          value={helpQuery.category}
                          onChange={handleInputChange}
                          style={{ borderRadius: '10px' }}
                        >
                          <option value="general">General Inquiry</option>
                          <option value="technical">Technical Support</option>
                          <option value="complaint">Complaint Related</option>
                          <option value="account">Account Issues</option>
                          <option value="billing">Billing & Payments</option>
                          <option value="other">Other</option>
                        </select>
                      </div>
                      <div className="col-md-6">
                        <label className="form-label fw-semibold">
                          <i className="fas fa-heading me-2"></i>Subject *
                        </label>
                        <input 
                          type="text"
                          name="subject"
                          className="form-control"
                          placeholder="Brief subject of your query"
                          value={helpQuery.subject}
                          onChange={handleInputChange}
                          required
                          style={{ borderRadius: '10px' }}
                        />
                      </div>
                    </div>
                    
                    <div className="mb-4">
                      <label className="form-label fw-semibold">
                        <i className="fas fa-comment-alt me-2"></i>Message *
                      </label>
                      <textarea 
                        name="message"
                        className="form-control"
                        rows="5"
                        placeholder="Describe your query in detail..."
                        value={helpQuery.message}
                        onChange={handleInputChange}
                        required
                        style={{ borderRadius: '10px' }}
                      />
                    </div>
                    
                    <div className="d-grid">
                      <button 
                        type="submit" 
                        className="btn btn-success btn-lg fw-semibold"
                        disabled={isSubmitting}
                        style={{ borderRadius: '25px' }}
                      >
                        {isSubmitting ? (
                          <>
                            <span className="spinner-border spinner-border-sm me-2"></span>
                            Sending Query...
                          </>
                        ) : (
                          <>
                            <i className="fas fa-paper-plane me-2"></i>
                            Send Help Query
                          </>
                        )}
                      </button>
                    </div>
                  </form>
                  
                  <div className="alert alert-success mt-4" role="alert">
                    <i className="fas fa-clock me-2"></i>
                    <strong>Response Time:</strong> We typically respond to help queries within 24 hours during business days.
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ContactHelp;
