import React, { useState } from 'react';

const POINT_EARNING_METHODS = [
  {
    id: 1,
    method: 'Submit Waste Reports',
    points: 10,
    description: 'Earn points for each verified waste report you submit',
    icon: 'fas fa-camera',
    color: '#28a745'
  },
  {
    id: 2,
    method: 'Complete Tutorial Courses',
    points: '15-40',
    description: 'Complete learning modules to earn bonus points',
    icon: 'fas fa-graduation-cap',
    color: '#17a2b8'
  },
  {
    id: 3,
    method: 'File Valid Complaints',
    points: 5,
    description: 'Get points when your complaints help improve services',
    icon: 'fas fa-exclamation-triangle',
    color: '#ffc107'
  },
  {
    id: 4,
    method: 'Community Participation',
    points: '20-50',
    description: 'Participate in cleanup drives and community events',
    icon: 'fas fa-users',
    color: '#6f42c1'
  },
  {
    id: 5,
    method: 'Referral Bonuses',
    points: 25,
    description: 'Invite friends and family to join the platform',
    icon: 'fas fa-user-plus',
    color: '#fd7e14'
  }
];

const REDEMPTION_OPTIONS = [
  {
    id: 1,
    title: 'Shop Discount',
    description: 'Use points to get discounts on eco-friendly products',
    pointsRequired: '1 Point = ₹1 Discount',
    icon: 'fas fa-percentage',
    color: '#28a745'
  },
  {
    id: 2,
    title: 'Tax Benefits',
    description: 'Redeem points for property tax discounts',
    pointsRequired: '500 Points = 5% Tax Discount',
    icon: 'fas fa-receipt',
    color: '#17a2b8'
  },
  {
    id: 3,
    title: 'Free Products',
    description: 'Exchange points for waste management supplies',
    pointsRequired: 'Varies by Product',
    icon: 'fas fa-gift',
    color: '#ffc107'
  },
  {
    id: 4,
    title: 'Certificates',
    description: 'Get eco-warrior certificates for achievements',
    pointsRequired: '200 Points per Certificate',
    icon: 'fas fa-certificate',
    color: '#6f42c1'
  }
];

const RECENT_TRANSACTIONS = [
  {
    id: 1,
    type: 'earned',
    description: 'Waste report submitted',
    points: 10,
    date: '2025-09-21',
    status: 'completed'
  },
  {
    id: 2,
    type: 'earned',
    description: 'Tutorial course completed',
    points: 25,
    date: '2025-09-20',
    status: 'completed'
  },
  {
    id: 3,
    type: 'redeemed',
    description: 'Shop discount applied',
    points: -50,
    date: '2025-09-19',
    status: 'completed'
  }
];

const Points = ({ user, onNavigate, userPoints }) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [showRedeemModal, setShowRedeemModal] = useState(false);
  const [selectedRedemption, setSelectedRedemption] = useState(null);

  const getUserTier = () => {
    if (userPoints >= 1000) return { name: 'Platinum', color: '#9c27b0', nextTier: null, progress: 100 };
    if (userPoints >= 500) return { name: 'Gold', color: '#ff9800', nextTier: 'Platinum (1000)', progress: ((userPoints - 500) / 500) * 100 };
    if (userPoints >= 200) return { name: 'Silver', color: '#607d8b', nextTier: 'Gold (500)', progress: ((userPoints - 200) / 300) * 100 };
    if (userPoints >= 50) return { name: 'Bronze', color: '#795548', nextTier: 'Silver (200)', progress: ((userPoints - 50) / 150) * 100 };
    return { name: 'Beginner', color: '#9e9e9e', nextTier: 'Bronze (50)', progress: (userPoints / 50) * 100 };
  };

  const userTier = getUserTier();

  const handleRedeem = (option) => {
    setSelectedRedemption(option);
    setShowRedeemModal(true);
  };

  const confirmRedemption = () => {
    if (selectedRedemption.id === 1) {
      // Redirect to shop for discount
      onNavigate('shop');
    } else {
      alert(`Redemption feature for "${selectedRedemption.title}" will be available soon. Your request has been noted.`);
    }
    setShowRedeemModal(false);
    setSelectedRedemption(null);
  };

  return (
    <div className="min-vh-100" style={{ backgroundColor: '#f8f9fa' }}>
      {/* Header */}
      <nav className="navbar navbar-dark shadow-sm" style={{ background: 'linear-gradient(135deg, #ffc107 0%, #ff8f00 100%)' }}>
        <div className="container">
          <button 
            className="btn btn-outline-light"
            onClick={() => onNavigate('dashboard')}
          >
            <i className="fas fa-arrow-left me-2"></i>Back to Dashboard
          </button>
          <h4 className="navbar-brand mb-0 mx-auto fw-bold">
            <i className="fas fa-coins me-2"></i>My Points
          </h4>
          <div className="text-light fw-bold">
            {userPoints} Points
          </div>
        </div>
      </nav>

      <div className="container py-4">
        {/* Points Overview Card */}
        <div className="row mb-4">
          <div className="col-12">
            <div className="card border-0 shadow-sm" style={{ borderRadius: '16px', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
              <div className="card-body p-4 text-white">
                <div className="row align-items-center">
                  <div className="col-md-8">
                    <div className="d-flex align-items-center mb-3">
                      <div 
                        className="me-4"
                        style={{
                          width: '80px',
                          height: '80px',
                          background: 'rgba(255,255,255,0.2)',
                          borderRadius: '20px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '2rem'
                        }}
                      >
                        <i className="fas fa-coins"></i>
                      </div>
                      <div>
                        <h2 className="fw-bold mb-1">{userPoints} Points</h2>
                        <div className="d-flex align-items-center">
                          <span 
                            className="badge px-3 py-2 me-2"
                            style={{ 
                              backgroundColor: `${userTier.color}40`,
                              color: 'white',
                              border: `1px solid ${userTier.color}`
                            }}
                          >
                            {userTier.name} Tier
                          </span>
                          {userTier.nextTier && (
                            <small className="opacity-75">Next: {userTier.nextTier}</small>
                          )}
                        </div>
                      </div>
                    </div>
                    
                    {userTier.nextTier && (
                      <div>
                        <div className="d-flex justify-content-between mb-2">
                          <span className="small">Progress to {userTier.nextTier}</span>
                          <span className="small">{Math.round(userTier.progress)}%</span>
                        </div>
                        <div className="progress" style={{ height: '6px', background: 'rgba(255,255,255,0.3)' }}>
                          <div 
                            className="progress-bar"
                            style={{ 
                              width: `${userTier.progress}%`,
                              background: 'rgba(255,255,255,0.8)'
                            }}
                          ></div>
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="col-md-4 text-center">
                    <button 
                      className="btn btn-light btn-lg fw-semibold mb-2"
                      onClick={() => onNavigate('shop')}
                      style={{ borderRadius: '25px' }}
                    >
                      <i className="fas fa-shopping-cart me-2"></i>
                      Redeem Points
                    </button>
                    <div className="small opacity-75">
                      1 Point = ₹1 Shop Discount
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="row mb-4">
          <div className="col-12">
            <div className="card border-0 shadow-sm" style={{ borderRadius: '16px' }}>
              <div className="card-body p-0">
                <nav className="nav nav-pills nav-fill">
                  {[
                    { id: 'overview', label: 'Overview', icon: 'fas fa-chart-line' },
                    { id: 'earn', label: 'How to Earn', icon: 'fas fa-plus-circle' },
                    { id: 'redeem', label: 'How to Redeem', icon: 'fas fa-gift' },
                    { id: 'history', label: 'Transaction History', icon: 'fas fa-history' }
                  ].map((tab) => (
                    <button 
                      key={tab.id}
                      className={`nav-link ${activeTab === tab.id ? 'active' : ''}`}
                      style={{ 
                        borderRadius: activeTab === tab.id ? '16px' : '0',
                        background: activeTab === tab.id ? '#ffc107' : 'transparent',
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

        {/* Tab Content */}
        <div className="row">
          <div className="col-12">
            {/* Overview Tab */}
            {activeTab === 'overview' && (
              <div className="row g-4">
                <div className="col-md-4">
                  <div className="card border-0 shadow-sm text-center" style={{ borderRadius: '16px' }}>
                    <div className="card-body p-4">
                      <i className="fas fa-wallet text-success fs-1 mb-3"></i>
                      <h5 className="fw-bold">{userPoints}</h5>
                      <p className="text-muted mb-0">Current Balance</p>
                    </div>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="card border-0 shadow-sm text-center" style={{ borderRadius: '16px' }}>
                    <div className="card-body p-4">
                      <i className="fas fa-arrow-up text-primary fs-1 mb-3"></i>
                      <h5 className="fw-bold">180</h5>
                      <p className="text-muted mb-0">Total Earned</p>
                    </div>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="card border-0 shadow-sm text-center" style={{ borderRadius: '16px' }}>
                    <div className="card-body p-4">
                      <i className="fas fa-arrow-down text-warning fs-1 mb-3"></i>
                      <h5 className="fw-bold">50</h5>
                      <p className="text-muted mb-0">Total Redeemed</p>
                    </div>
                  </div>
                </div>
                
                <div className="col-12">
                  <div className="card border-0 shadow-sm" style={{ borderRadius: '16px' }}>
                    <div className="card-body p-4">
                      <h6 className="fw-bold mb-3">
                        <i className="fas fa-chart-pie me-2 text-info"></i>
                        Points Breakdown
                      </h6>
                      <div className="row">
                        <div className="col-md-6">
                          <div className="mb-3">
                            <div className="d-flex justify-content-between mb-2">
                              <span>Waste Reports</span>
                              <span className="fw-bold text-success">+120 pts</span>
                            </div>
                            <div className="progress" style={{ height: '8px' }}>
                              <div className="progress-bar bg-success" style={{ width: '67%' }}></div>
                            </div>
                          </div>
                          <div className="mb-3">
                            <div className="d-flex justify-content-between mb-2">
                              <span>Tutorial Courses</span>
                              <span className="fw-bold text-info">+50 pts</span>
                            </div>
                            <div className="progress" style={{ height: '8px' }}>
                              <div className="progress-bar bg-info" style={{ width: '28%' }}></div>
                            </div>
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="mb-3">
                            <div className="d-flex justify-content-between mb-2">
                              <span>Valid Complaints</span>
                              <span className="fw-bold text-warning">+10 pts</span>
                            </div>
                            <div className="progress" style={{ height: '8px' }}>
                              <div className="progress-bar bg-warning" style={{ width: '5%' }}></div>
                            </div>
                          </div>
                          <div className="mb-3">
                            <div className="d-flex justify-content-between mb-2">
                              <span>Shop Discounts</span>
                              <span className="fw-bold text-danger">-50 pts</span>
                            </div>
                            <div className="progress" style={{ height: '8px' }}>
                              <div className="progress-bar bg-danger" style={{ width: '28%' }}></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* How to Earn Tab */}
            {activeTab === 'earn' && (
              <div className="card border-0 shadow-sm" style={{ borderRadius: '16px' }}>
                <div className="card-body p-4">
                  <h5 className="fw-bold mb-4 text-center">
                    <i className="fas fa-plus-circle me-2 text-success"></i>
                    Ways to Earn Points
                  </h5>
                  
                  <div className="row g-4">
                    {POINT_EARNING_METHODS.map((method) => (
                      <div key={method.id} className="col-md-6">
                        <div 
                          className="card h-100 border-0 shadow-sm"
                          style={{ borderRadius: '12px', borderLeft: `4px solid ${method.color}` }}
                        >
                          <div className="card-body p-4">
                            <div className="d-flex align-items-center mb-3">
                              <div 
                                className="me-3"
                                style={{
                                  width: '50px',
                                  height: '50px',
                                  background: `${method.color}20`,
                                  borderRadius: '12px',
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  color: method.color
                                }}
                              >
                                <i className={`${method.icon} fs-4`}></i>
                              </div>
                              <div>
                                <h6 className="fw-bold mb-1">{method.method}</h6>
                                <span className="badge" style={{ backgroundColor: `${method.color}20`, color: method.color }}>
                                  +{method.points} Points
                                </span>
                              </div>
                            </div>
                            <p className="text-muted mb-0">{method.description}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="text-center mt-4">
                    <div className="alert alert-success">
                      <i className="fas fa-lightbulb me-2"></i>
                      <strong>Pro Tip:</strong> Complete daily activities to maximize your point earnings!
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* How to Redeem Tab */}
            {activeTab === 'redeem' && (
              <div className="card border-0 shadow-sm" style={{ borderRadius: '16px' }}>
                <div className="card-body p-4">
                  <h5 className="fw-bold mb-4 text-center">
                    <i className="fas fa-gift me-2 text-warning"></i>
                    Redemption Options
                  </h5>
                  
                  <div className="row g-4">
                    {REDEMPTION_OPTIONS.map((option) => (
                      <div key={option.id} className="col-md-6">
                        <div 
                          className="card h-100 border-0 shadow-sm"
                          style={{ borderRadius: '12px' }}
                        >
                          <div className="card-body p-4">
                            <div className="d-flex align-items-center mb-3">
                              <div 
                                className="me-3"
                                style={{
                                  width: '50px',
                                  height: '50px',
                                  background: `${option.color}20`,
                                  borderRadius: '12px',
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  color: option.color
                                }}
                              >
                                <i className={`${option.icon} fs-4`}></i>
                              </div>
                              <div className="flex-grow-1">
                                <h6 className="fw-bold mb-1">{option.title}</h6>
                                <small className="text-muted">{option.pointsRequired}</small>
                              </div>
                            </div>
                            <p className="text-muted mb-3">{option.description}</p>
                            <button 
                              className="btn btn-sm w-100"
                              style={{ 
                                backgroundColor: `${option.color}20`,
                                color: option.color,
                                border: `1px solid ${option.color}`
                              }}
                              onClick={() => handleRedeem(option)}
                            >
                              <i className="fas fa-external-link-alt me-2"></i>
                              Redeem Now
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Transaction History Tab */}
            {activeTab === 'history' && (
              <div className="card border-0 shadow-sm" style={{ borderRadius: '16px' }}>
                <div className="card-body p-4">
                  <h5 className="fw-bold mb-4">
                    <i className="fas fa-history me-2 text-info"></i>
                    Transaction History
                  </h5>
                  
                  {RECENT_TRANSACTIONS.length === 0 ? (
                    <div className="text-center py-5">
                      <i className="fas fa-receipt text-muted fs-1 mb-3"></i>
                      <h6 className="text-muted">No Transactions Yet</h6>
                      <p className="text-muted">Your point transactions will appear here.</p>
                    </div>
                  ) : (
                    <div className="table-responsive">
                      <table className="table table-hover">
                        <thead className="table-light">
                          <tr>
                            <th>Date</th>
                            <th>Description</th>
                            <th>Points</th>
                            <th>Status</th>
                          </tr>
                        </thead>
                        <tbody>
                          {RECENT_TRANSACTIONS.map((transaction) => (
                            <tr key={transaction.id}>
                              <td>{new Date(transaction.date).toLocaleDateString()}</td>
                              <td>
                                <div className="d-flex align-items-center">
                                  <i className={`fas ${transaction.type === 'earned' ? 'fa-plus-circle text-success' : 'fa-minus-circle text-danger'} me-2`}></i>
                                  {transaction.description}
                                </div>
                              </td>
                              <td>
                                <span className={`fw-bold ${transaction.type === 'earned' ? 'text-success' : 'text-danger'}`}>
                                  {transaction.type === 'earned' ? '+' : ''}{transaction.points}
                                </span>
                              </td>
                              <td>
                                <span className="badge bg-success">
                                  <i className="fas fa-check me-1"></i>
                                  {transaction.status}
                                </span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Redemption Modal */}
      {showRedeemModal && selectedRedemption && (
        <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog">
            <div className="modal-content" style={{ borderRadius: '16px' }}>
              <div className="modal-header border-0">
                <h5 className="modal-title fw-bold">
                  <i className={`${selectedRedemption.icon} me-2`} style={{ color: selectedRedemption.color }}></i>
                  Redeem Points
                </h5>
                <button 
                  type="button" 
                  className="btn-close"
                  onClick={() => setShowRedeemModal(false)}
                ></button>
              </div>
              <div className="modal-body">
                <div className="text-center mb-4">
                  <div 
                    className="mx-auto mb-3"
                    style={{
                      width: '80px',
                      height: '80px',
                      background: `${selectedRedemption.color}20`,
                      borderRadius: '16px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: selectedRedemption.color
                    }}
                  >
                    <i className={`${selectedRedemption.icon} fs-1`}></i>
                  </div>
                  <h6 className="fw-bold">{selectedRedemption.title}</h6>
                  <p className="text-muted">{selectedRedemption.description}</p>
                  <div className="alert alert-info">
                    <strong>Requirement:</strong> {selectedRedemption.pointsRequired}
                  </div>
                </div>
              </div>
              <div className="modal-footer border-0">
                <button 
                  type="button" 
                  className="btn btn-secondary"
                  onClick={() => setShowRedeemModal(false)}
                >
                  Cancel
                </button>
                <button 
                  type="button" 
                  className="btn btn-primary"
                  onClick={confirmRedemption}
                >
                  <i className="fas fa-check me-2"></i>
                  Confirm Redemption
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Points;
