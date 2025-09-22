import React, { useState } from 'react';

const LANGUAGES = [
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'te', name: 'Telugu', flag: '🇮🇳' },
  { code: 'hi', name: 'Hindi', flag: '🇮🇳' }
];

const ACHIEVEMENTS = [
  { id: 1, name: 'First Reporter', description: 'Submitted your first waste report', icon: '🏆', unlocked: true },
  { id: 2, name: 'Eco Warrior', description: 'Completed 5 tutorial courses', icon: '🛡️', unlocked: false },
  { id: 3, name: 'Green Champion', description: 'Earned 100+ points', icon: '🌟', unlocked: false },
  { id: 4, name: 'Community Helper', description: 'Filed helpful complaints', icon: '🤝', unlocked: true },
  { id: 5, name: 'Shopping Expert', description: 'Made your first purchase', icon: '🛍️', unlocked: false }
];

const Profile = ({ user, onNavigate, onLogout, userReports, userComplaints, userPoints }) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    name: user.name,
    email: user.email,
    phone: user.phone,
    address: user.address
  });

  const handleLogout = () => {
    if (window.confirm('Are you sure you want to logout?')) {
      onLogout();
    }
  };

  const handleSaveProfile = () => {
    // In a real app, this would update the user data via API
    alert('Profile updated successfully!');
    setIsEditing(false);
  };

  const getUserLevel = () => {
    if (userPoints >= 500) return { name: 'Eco Legend', color: '#9c27b0', icon: '👑' };
    if (userPoints >= 200) return { name: 'Green Champion', color: '#4caf50', icon: '🏆' };
    if (userPoints >= 100) return { name: 'Eco Warrior', color: '#ff9800', icon: '🛡️' };
    if (userPoints >= 50) return { name: 'Environment Friend', color: '#2196f3', icon: '🌱' };
    return { name: 'Eco Beginner', color: '#9e9e9e', icon: '🌿' };
  };

  const userLevel = getUserLevel();
  const unlockedAchievements = ACHIEVEMENTS.filter(a => a.unlocked).length;

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
            <i className="fas fa-user me-2"></i>My Profile
          </h4>
          <button 
            className="btn btn-outline-light"
            onClick={handleLogout}
          >
            <i className="fas fa-sign-out-alt me-2"></i>Logout
          </button>
        </div>
      </nav>

      <div className="container py-4">
        {/* Profile Header */}
        <div className="row mb-4">
          <div className="col-12">
            <div className="card border-0 shadow-sm" style={{ borderRadius: '16px', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
              <div className="card-body p-4 text-white">
                <div className="row align-items-center">
                  <div className="col-md-8">
                    <div className="d-flex align-items-center">
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
                        <i className="fas fa-user"></i>
                      </div>
                      <div>
                        <h3 className="fw-bold mb-1">{user.name}</h3>
                        <p className="mb-2 opacity-90">{user.email}</p>
                        <div className="d-flex align-items-center">
                          <span 
                            className="badge px-3 py-2 me-2"
                            style={{ 
                              backgroundColor: `${userLevel.color}40`,
                              color: 'white',
                              border: `1px solid ${userLevel.color}`
                            }}
                          >
                            {userLevel.icon} {userLevel.name}
                          </span>
                          <small className="opacity-75">{user.zone}</small>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="row text-center">
                      <div className="col-4">
                        <div className="fw-bold fs-4">{userPoints}</div>
                        <small className="opacity-75">Points</small>
                      </div>
                      <div className="col-4">
                        <div className="fw-bold fs-4">{userReports.length}</div>
                        <small className="opacity-75">Reports</small>
                      </div>
                      <div className="col-4">
                        <div className="fw-bold fs-4">{unlockedAchievements}</div>
                        <small className="opacity-75">Achievements</small>
                      </div>
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
                    { id: 'personal', label: 'Personal Info', icon: 'fas fa-user-edit' },
                    { id: 'activity', label: 'Recent Activity', icon: 'fas fa-history' },
                    { id: 'achievements', label: 'Achievements', icon: 'fas fa-trophy' },
                    { id: 'settings', label: 'Settings', icon: 'fas fa-cog' }
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

        {/* Tab Content */}
        <div className="row">
          <div className="col-12">
            {/* Overview Tab */}
            {activeTab === 'overview' && (
              <div className="row g-4">
                <div className="col-md-6">
                  <div className="card border-0 shadow-sm h-100" style={{ borderRadius: '16px' }}>
                    <div className="card-body p-4">
                      <h6 className="fw-bold mb-3">
                        <i className="fas fa-chart-bar me-2 text-primary"></i>
                        Activity Summary
                      </h6>
                      <div className="row g-3">
                        <div className="col-6">
                          <div className="text-center p-3 bg-light rounded">
                            <i className="fas fa-camera text-success fs-2 mb-2"></i>
                            <h5 className="fw-bold mb-0">{userReports.length}</h5>
                            <small className="text-muted">Waste Reports</small>
                          </div>
                        </div>
                        <div className="col-6">
                          <div className="text-center p-3 bg-light rounded">
                            <i className="fas fa-exclamation-triangle text-warning fs-2 mb-2"></i>
                            <h5 className="fw-bold mb-0">{userComplaints.length}</h5>
                            <small className="text-muted">Complaints Filed</small>
                          </div>
                        </div>
                        <div className="col-6">
                          <div className="text-center p-3 bg-light rounded">
                            <i className="fas fa-coins text-warning fs-2 mb-2"></i>
                            <h5 className="fw-bold mb-0">{userPoints}</h5>
                            <small className="text-muted">Total Points</small>
                          </div>
                        </div>
                        <div className="col-6">
                          <div className="text-center p-3 bg-light rounded">
                            <i className="fas fa-trophy text-warning fs-2 mb-2"></i>
                            <h5 className="fw-bold mb-0">{unlockedAchievements}</h5>
                            <small className="text-muted">Achievements</small>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="card border-0 shadow-sm h-100" style={{ borderRadius: '16px' }}>
                    <div className="card-body p-4">
                      <h6 className="fw-bold mb-3">
                        <i className="fas fa-target me-2 text-success"></i>
                        Impact Dashboard
                      </h6>
                      <div className="mb-3">
                        <div className="d-flex justify-content-between mb-2">
                          <span>Environmental Impact</span>
                          <span className="fw-bold text-success">75%</span>
                        </div>
                        <div className="progress" style={{ height: '8px' }}>
                          <div className="progress-bar bg-success" style={{ width: '75%' }}></div>
                        </div>
                        <small className="text-muted">Great work! You're making a difference.</small>
                      </div>
                      <div className="mb-3">
                        <div className="d-flex justify-content-between mb-2">
                          <span>Community Engagement</span>
                          <span className="fw-bold text-primary">60%</span>
                        </div>
                        <div className="progress" style={{ height: '8px' }}>
                          <div className="progress-bar bg-primary" style={{ width: '60%' }}></div>
                        </div>
                        <small className="text-muted">Keep participating in community activities.</small>
                      </div>
                      <div className="mb-3">
                        <div className="d-flex justify-content-between mb-2">
                          <span>Learning Progress</span>
                          <span className="fw-bold text-warning">45%</span>
                        </div>
                        <div className="progress" style={{ height: '8px' }}>
                          <div className="progress-bar bg-warning" style={{ width: '45%' }}></div>
                        </div>
                        <small className="text-muted">Complete more tutorials to earn points.</small>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Personal Info Tab */}
            {activeTab === 'personal' && (
              <div className="card border-0 shadow-sm" style={{ borderRadius: '16px' }}>
                <div className="card-body p-4">
                  <div className="d-flex justify-content-between align-items-center mb-4">
                    <h6 className="fw-bold mb-0">
                      <i className="fas fa-user-edit me-2 text-primary"></i>
                      Personal Information
                    </h6>
                    <button 
                      className="btn btn-primary btn-sm"
                      onClick={() => setIsEditing(!isEditing)}
                    >
                      <i className={`fas ${isEditing ? 'fa-times' : 'fa-edit'} me-2`}></i>
                      {isEditing ? 'Cancel' : 'Edit'}
                    </button>
                  </div>

                  {isEditing ? (
                    <div className="row g-3">
                      <div className="col-md-6">
                        <label className="form-label fw-semibold">Full Name</label>
                        <input 
                          type="text" 
                          className="form-control"
                          value={editData.name}
                          onChange={(e) => setEditData({...editData, name: e.target.value})}
                          style={{ borderRadius: '10px' }}
                        />
                      </div>
                      <div className="col-md-6">
                        <label className="form-label fw-semibold">Email Address</label>
                        <input 
                          type="email" 
                          className="form-control"
                          value={editData.email}
                          onChange={(e) => setEditData({...editData, email: e.target.value})}
                          style={{ borderRadius: '10px' }}
                        />
                      </div>
                      <div className="col-md-6">
                        <label className="form-label fw-semibold">Phone Number</label>
                        <input 
                          type="tel" 
                          className="form-control"
                          value={editData.phone}
                          onChange={(e) => setEditData({...editData, phone: e.target.value})}
                          style={{ borderRadius: '10px' }}
                        />
                      </div>
                      <div className="col-md-6">
                        <label className="form-label fw-semibold">Zone</label>
                        <input 
                          type="text" 
                          className="form-control"
                          value={user.zone}
                          disabled
                          style={{ borderRadius: '10px' }}
                        />
                      </div>
                      <div className="col-12">
                        <label className="form-label fw-semibold">Address</label>
                        <textarea 
                          className="form-control"
                          rows="3"
                          value={editData.address}
                          onChange={(e) => setEditData({...editData, address: e.target.value})}
                          style={{ borderRadius: '10px' }}
                        />
                      </div>
                      <div className="col-12">
                        <button 
                          className="btn btn-success me-2"
                          onClick={handleSaveProfile}
                        >
                          <i className="fas fa-save me-2"></i>Save Changes
                        </button>
                        <button 
                          className="btn btn-secondary"
                          onClick={() => setIsEditing(false)}
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="row g-4">
                      <div className="col-md-6">
                        <div className="mb-3">
                          <label className="form-label text-muted small">FULL NAME</label>
                          <div className="fw-semibold">{user.name}</div>
                        </div>
                        <div className="mb-3">
                          <label className="form-label text-muted small">PHONE NUMBER</label>
                          <div className="fw-semibold">{user.phone}</div>
                        </div>
                        <div className="mb-3">
                          <label className="form-label text-muted small">USER ID</label>
                          <div className="fw-semibold">{user.id}</div>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="mb-3">
                          <label className="form-label text-muted small">EMAIL ADDRESS</label>
                          <div className="fw-semibold">{user.email}</div>
                        </div>
                        <div className="mb-3">
                          <label className="form-label text-muted small">ZONE</label>
                          <div className="fw-semibold">{user.zone}</div>
                        </div>
                        <div className="mb-3">
                          <label className="form-label text-muted small">MEMBER SINCE</label>
                          <div className="fw-semibold">January 2024</div>
                        </div>
                      </div>
                      <div className="col-12">
                        <div className="mb-3">
                          <label className="form-label text-muted small">ADDRESS</label>
                          <div className="fw-semibold">{user.address}</div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Recent Activity Tab */}
            {activeTab === 'activity' && (
              <div className="card border-0 shadow-sm" style={{ borderRadius: '16px' }}>
                <div className="card-body p-4">
                  <h6 className="fw-bold mb-4">
                    <i className="fas fa-history me-2 text-info"></i>
                    Recent Activity
                  </h6>

                  {userReports.length === 0 && userComplaints.length === 0 ? (
                    <div className="text-center py-5">
                      <i className="fas fa-clock text-muted fs-1 mb-3"></i>
                      <h6 className="text-muted">No Recent Activity</h6>
                      <p className="text-muted">Your activities will appear here once you start using the portal.</p>
                    </div>
                  ) : (
                    <div className="timeline">
                      {/* Recent Reports */}
                      {userReports.slice(0, 5).map((report) => (
                        <div key={`report-${report.id}`} className="d-flex mb-3">
                          <div className="flex-shrink-0 me-3">
                            <div 
                              className="rounded-circle d-flex align-items-center justify-content-center"
                              style={{ width: '40px', height: '40px', background: '#28a745' }}
                            >
                              <i className="fas fa-camera text-white"></i>
                            </div>
                          </div>
                          <div className="flex-grow-1">
                            <div className="fw-semibold">Waste Report Submitted</div>
                            <small className="text-muted d-block">Ticket #{report.ticketId} - {report.location}</small>
                            <small className="text-muted">{new Date(report.submittedAt).toLocaleString()}</small>
                          </div>
                        </div>
                      ))}

                      {/* Recent Complaints */}
                      {userComplaints.slice(0, 5).map((complaint) => (
                        <div key={`complaint-${complaint.id}`} className="d-flex mb-3">
                          <div className="flex-shrink-0 me-3">
                            <div 
                              className="rounded-circle d-flex align-items-center justify-content-center"
                              style={{ width: '40px', height: '40px', background: '#dc3545' }}
                            >
                              <i className="fas fa-exclamation-triangle text-white"></i>
                            </div>
                          </div>
                          <div className="flex-grow-1">
                            <div className="fw-semibold">Complaint Filed</div>
                            <small className="text-muted d-block">#{complaint.complaintId} - {complaint.category}</small>
                            <small className="text-muted">{new Date(complaint.submittedAt).toLocaleString()}</small>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Achievements Tab */}
            {activeTab === 'achievements' && (
              <div className="card border-0 shadow-sm" style={{ borderRadius: '16px' }}>
                <div className="card-body p-4">
                  <h6 className="fw-bold mb-4">
                    <i className="fas fa-trophy me-2 text-warning"></i>
                    Achievements ({unlockedAchievements}/{ACHIEVEMENTS.length})
                  </h6>

                  <div className="row g-3">
                    {ACHIEVEMENTS.map((achievement) => (
                      <div key={achievement.id} className="col-md-6">
                        <div 
                          className={`card h-100 ${achievement.unlocked ? 'border-warning' : 'border-light'}`}
                          style={{ 
                            borderRadius: '12px',
                            opacity: achievement.unlocked ? 1 : 0.6
                          }}
                        >
                          <div className="card-body p-3">
                            <div className="d-flex align-items-center">
                              <div className="me-3 fs-2">
                                {achievement.unlocked ? achievement.icon : '🔒'}
                              </div>
                              <div className="flex-grow-1">
                                <h6 className="fw-bold mb-1">{achievement.name}</h6>
                                <small className="text-muted">{achievement.description}</small>
                                {achievement.unlocked && (
                                  <div className="mt-1">
                                    <span className="badge bg-success">
                                      <i className="fas fa-check me-1"></i>Unlocked
                                    </span>
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Settings Tab */}
            {activeTab === 'settings' && (
              <div className="row g-4">
                <div className="col-md-6">
                  <div className="card border-0 shadow-sm" style={{ borderRadius: '16px' }}>
                    <div className="card-body p-4">
                      <h6 className="fw-bold mb-3">
                        <i className="fas fa-language me-2 text-primary"></i>
                        Language Preferences
                      </h6>
                      
                      <div className="mb-3">
                        <label className="form-label fw-semibold">Select Language</label>
                        <select 
                          className="form-select"
                          value={selectedLanguage}
                          onChange={(e) => setSelectedLanguage(e.target.value)}
                          style={{ borderRadius: '10px' }}
                        >
                          {LANGUAGES.map((lang) => (
                            <option key={lang.code} value={lang.code}>
                              {lang.flag} {lang.name}
                            </option>
                          ))}
                        </select>
                      </div>
                      
                      <button className="btn btn-primary btn-sm">
                        <i className="fas fa-save me-2"></i>Save Language
                      </button>
                    </div>
                  </div>
                </div>
                
                <div className="col-md-6">
                  <div className="card border-0 shadow-sm" style={{ borderRadius: '16px' }}>
                    <div className="card-body p-4">
                      <h6 className="fw-bold mb-3">
                        <i className="fas fa-bell me-2 text-warning"></i>
                        Notifications
                      </h6>
                      
                      <div className="form-check mb-3">
                        <input className="form-check-input" type="checkbox" id="emailNotif" defaultChecked />
                        <label className="form-check-label" htmlFor="emailNotif">
                          Email Notifications
                        </label>
                      </div>
                      
                      <div className="form-check mb-3">
                        <input className="form-check-input" type="checkbox" id="smsNotif" defaultChecked />
                        <label className="form-check-label" htmlFor="smsNotif">
                          SMS Alerts
                        </label>
                      </div>
                      
                      <div className="form-check mb-3">
                        <input className="form-check-input" type="checkbox" id="pushNotif" />
                        <label className="form-check-label" htmlFor="pushNotif">
                          Push Notifications
                        </label>
                      </div>
                      
                      <button className="btn btn-primary btn-sm">
                        <i className="fas fa-save me-2"></i>Update Preferences
                      </button>
                    </div>
                  </div>
                </div>
                
                <div className="col-12">
                  <div className="card border-0 shadow-sm border-danger" style={{ borderRadius: '16px' }}>
                    <div className="card-body p-4">
                      <h6 className="fw-bold mb-3 text-danger">
                        <i className="fas fa-sign-out-alt me-2"></i>
                        Account Actions
                      </h6>
                      
                      <div className="d-flex gap-2 flex-wrap">
                        <button 
                          className="btn btn-outline-danger"
                          onClick={handleLogout}
                        >
                          <i className="fas fa-sign-out-alt me-2"></i>
                          Logout from Account
                        </button>
                        
                        <button className="btn btn-outline-secondary">
                          <i className="fas fa-download me-2"></i>
                          Export My Data
                        </button>
                        
                        <button className="btn btn-outline-warning">
                          <i className="fas fa-exclamation-triangle me-2"></i>
                          Deactivate Account
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
