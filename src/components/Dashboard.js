import React from 'react';

const Dashboard = ({ user, onNavigate, userReports, userComplaints, userPoints }) => {
  const tiles = [
    {
      id: 'scan-upload',
      title: 'Scan & Report',
      subtitle: 'Report waste issues',
      icon: 'fas fa-camera',
      color: '#28a745',
      description: 'Take photo and report waste on streets'
    },
    {
      id: 'tutorials',
      title: 'Learn & Earn',
      subtitle: 'Waste management courses',
      icon: 'fas fa-graduation-cap',
      color: '#17a2b8',
      description: 'Complete tutorials to earn points'
    },
    {
      id: 'shop',
      title: 'Waste Shop',
      subtitle: 'Buy eco-friendly products',
      icon: 'fas fa-shopping-cart',
      color: '#fd7e14',
      description: 'Purchase waste management supplies'
    },
    {
      id: 'complaints',
      title: 'File Complaint',
      subtitle: 'Report service issues',
      icon: 'fas fa-exclamation-triangle',
      color: '#dc3545',
      description: 'Submit complaints to GVMC'
    },
    {
      id: 'points',
      title: 'My Points',
      subtitle: `${userPoints} points available`,
      icon: 'fas fa-coins',
      color: '#ffc107',
      description: 'View and redeem reward points'
    },
    {
      id: 'contact-help',
      title: 'Help & Support',
      subtitle: 'Get assistance',
      icon: 'fas fa-headset',
      color: '#6f42c1',
      description: 'Emergency contacts and help'
    }
  ];

  return (
    <div className="min-vh-100" style={{ backgroundColor: '#f8f9fa' }}>
      {/* Government Header */}
      <nav className="navbar navbar-expand-lg shadow-sm" 
           style={{ 
             background: 'linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)',
             padding: '1rem 0'
           }}>
        <div className="container">
          <div className="navbar-brand d-flex align-items-center text-white">
            <div 
              style={{
                width: '50px',
                height: '50px',
                background: 'rgba(255,255,255,0.2)',
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginRight: '15px'
              }}
            >
              <i className="fas fa-recycle fs-4"></i>
            </div>
            <div>
              <h4 className="mb-0 fw-bold">ALPHA-Q</h4>
              <small className="opacity-75">Greater Visakhapatnam Municipal Corporation</small>
            </div>
          </div>
          
          {/* Search Bar */}
          <div className="d-none d-lg-block mx-4" style={{ width: '300px' }}>
            <div className="input-group">
              <input 
                type="text" 
                className="form-control" 
                placeholder="Search services..."
                style={{ borderRadius: '25px 0 0 25px' }}
                disabled
              />
              <button className="btn btn-light" type="button" style={{ borderRadius: '0 25px 25px 0' }}>
                <i className="fas fa-search"></i>
              </button>
            </div>
          </div>

          {/* User Profile */}
          <div className="navbar-nav">
            <div className="nav-item dropdown">
              <button 
                className="btn btn-outline-light d-flex align-items-center"
                onClick={() => onNavigate('profile')}
                style={{ borderRadius: '25px' }}
              >
                <div 
                  style={{
                    width: '35px',
                    height: '35px',
                    background: 'rgba(255,255,255,0.2)',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginRight: '10px'
                  }}
                >
                  <i className="fas fa-user"></i>
                </div>
                <div className="text-start d-none d-md-block">
                  <div className="fw-semibold" style={{ fontSize: '14px' }}>{user.name}</div>
                  <div className="opacity-75" style={{ fontSize: '12px' }}>{user.zone}</div>
                </div>
                <i className="fas fa-chevron-down ms-2"></i>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="container py-5">
        {/* Welcome Section */}
        <div className="row mb-5">
          <div className="col-12">
            <div className="card border-0 shadow-sm" style={{ borderRadius: '16px', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
              <div className="card-body p-4 text-white">
                <div className="row align-items-center">
                  <div className="col-md-8">
                    <h2 className="fw-bold mb-2">Welcome, {user.name}!</h2>
                    <p className="mb-3 opacity-90">Help make Visakhapatnam cleaner and greener. Every small action counts!</p>
                    <button 
                      className="btn btn-light fw-semibold"
                      onClick={() => onNavigate('how-to-use')}
                      style={{ borderRadius: '25px' }}
                    >
                      <i className="fas fa-play-circle me-2"></i>
                      How to Use Portal
                    </button>
                  </div>
                  <div className="col-md-4 text-center">
                    <div className="row">
                      <div className="col-4">
                        <div className="fw-bold fs-4">{userReports.length}</div>
                        <small className="opacity-75">Reports</small>
                      </div>
                      <div className="col-4">
                        <div className="fw-bold fs-4">{userPoints}</div>
                        <small className="opacity-75">Points</small>
                      </div>
                      <div className="col-4">
                        <div className="fw-bold fs-4">{userComplaints.length}</div>
                        <small className="opacity-75">Complaints</small>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Service Tiles */}
        <div className="row g-4">
          {tiles.map((tile) => (
            <div key={tile.id} className="col-md-6 col-lg-4">
              <div 
                className="card h-100 border-0 shadow-sm"
                style={{ 
                  borderRadius: '16px',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease'
                }}
                onClick={() => onNavigate(tile.id)}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-5px)';
                  e.currentTarget.style.boxShadow = '0 10px 30px rgba(0,0,0,0.15)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
                }}
              >
                <div className="card-body p-4 text-center">
                  <div 
                    className="mb-3 mx-auto"
                    style={{
                      width: '80px',
                      height: '80px',
                      background: `linear-gradient(135deg, ${tile.color}, ${tile.color}dd)`,
                      borderRadius: '16px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'white',
                      fontSize: '2rem'
                    }}
                  >
                    <i className={tile.icon}></i>
                  </div>
                  <h5 className="fw-bold text-dark mb-2">{tile.title}</h5>
                  <p className="text-muted mb-2">{tile.subtitle}</p>
                  <small className="text-muted">{tile.description}</small>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Quick Stats */}
        <div className="row mt-5">
          <div className="col-12">
            <h4 className="fw-bold mb-4">Your Impact Dashboard</h4>
          </div>
          <div className="col-md-3 col-sm-6 mb-3">
            <div className="card border-0 bg-success text-white" style={{ borderRadius: '12px' }}>
              <div className="card-body text-center">
                <i className="fas fa-camera fs-2 mb-2"></i>
                <h3 className="fw-bold">{userReports.length}</h3>
                <small>Waste Reports Submitted</small>
              </div>
            </div>
          </div>
          <div className="col-md-3 col-sm-6 mb-3">
            <div className="card border-0 bg-warning text-white" style={{ borderRadius: '12px' }}>
              <div className="card-body text-center">
                <i className="fas fa-coins fs-2 mb-2"></i>
                <h3 className="fw-bold">{userPoints}</h3>
                <small>Reward Points Earned</small>
              </div>
            </div>
          </div>
          <div className="col-md-3 col-sm-6 mb-3">
            <div className="card border-0 bg-info text-white" style={{ borderRadius: '12px' }}>
              <div className="card-body text-center">
                <i className="fas fa-exclamation-triangle fs-2 mb-2"></i>
                <h3 className="fw-bold">{userComplaints.length}</h3>
                <small>Complaints Filed</small>
              </div>
            </div>
          </div>
          <div className="col-md-3 col-sm-6 mb-3">
            <div className="card border-0 bg-primary text-white" style={{ borderRadius: '12px' }}>
              <div className="card-body text-center">
                <i className="fas fa-trophy fs-2 mb-2"></i>
                <h3 className="fw-bold">
                  {userPoints > 100 ? 'Gold' : userPoints > 50 ? 'Silver' : 'Bronze'}
                </h3>
                <small>Citizen Status</small>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
