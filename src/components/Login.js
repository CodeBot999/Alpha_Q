import React, { useState } from 'react';

const DEMO_USERS = [
  {
    id: 'user001',
    username: 'citizen1',
    password: 'demo123',
    name: 'Rajesh Kumar',
    email: 'rajesh@gvmc.gov.in',
    phone: '+91 98765 43210',
    address: 'MVP Colony, Visakhapatnam',
    zone: 'Zone-1'
  },
  {
    id: 'user002',
    username: 'citizen2',
    password: 'demo123',
    name: 'Priya Sharma',
    email: 'priya@gvmc.gov.in',
    phone: '+91 98765 43211',
    address: 'Gajuwaka, Visakhapatnam',
    zone: 'Zone-2'
  },
  {
    id: 'user003',
    username: 'citizen3',
    password: 'demo123',
    name: 'Amit Patel',
    email: 'amit@gvmc.gov.in',
    phone: '+91 98765 43212',
    address: 'Beach Road, Visakhapatnam',
    zone: 'Zone-3'
  }
];

const Login = ({ onLogin }) => {
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCredentials(prev => ({ ...prev, [name]: value }));
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    setTimeout(() => {
      const user = DEMO_USERS.find(u => 
        u.username === credentials.username && u.password === credentials.password
      );
      
      if (user) {
        onLogin(user);
      } else {
        setError('Invalid credentials. Please check username and password.');
      }
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="min-vh-100 d-flex align-items-center justify-content-center" 
         style={{
           background: 'linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)',
           fontFamily: 'Inter, system-ui, sans-serif'
         }}>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-6 col-lg-4">
            <div className="card shadow-lg border-0" style={{ borderRadius: '16px' }}>
              <div className="card-body p-5">
                {/* Government Header */}
                <div className="text-center mb-4">
                  <div className="mb-3">
                    <div 
                      style={{
                        width: '80px',
                        height: '80px',
                        background: 'linear-gradient(135deg, #28a745, #20c997)',
                        borderRadius: '16px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        margin: '0 auto',
                        fontSize: '2rem',
                        color: 'white',
                        boxShadow: '0 8px 24px rgba(40, 167, 69, 0.3)'
                      }}
                    >
                      <i className="fas fa-building"></i>
                    </div>
                  </div>
                  <h2 className="fw-bold text-dark mb-1">GVMC Portal</h2>
                  <p className="text-muted">Waste Management System</p>
                  <small className="text-muted">Greater Visakhapatnam Municipal Corporation</small>
                </div>

                {/* Login Form */}
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label className="form-label fw-semibold text-dark">
                      <i className="fas fa-user me-2"></i>Username
                    </label>
                    <input
                      type="text"
                      name="username"
                      className="form-control form-control-lg"
                      placeholder="Enter your username"
                      value={credentials.username}
                      onChange={handleInputChange}
                      required
                      style={{ borderRadius: '10px', border: '2px solid #e9ecef' }}
                    />
                  </div>
                  
                  <div className="mb-4">
                    <label className="form-label fw-semibold text-dark">
                      <i className="fas fa-lock me-2"></i>Password
                    </label>
                    <input
                      type="password"
                      name="password"
                      className="form-control form-control-lg"
                      placeholder="Enter your password"
                      value={credentials.password}
                      onChange={handleInputChange}
                      required
                      style={{ borderRadius: '10px', border: '2px solid #e9ecef' }}
                    />
                  </div>

                  {error && (
                    <div className="alert alert-danger" role="alert">
                      <i className="fas fa-exclamation-triangle me-2"></i>
                      {error}
                    </div>
                  )}

                  <button 
                    type="submit" 
                    className="btn btn-primary w-100 btn-lg fw-semibold"
                    disabled={loading}
                    style={{ 
                      borderRadius: '10px',
                      background: 'linear-gradient(135deg, #007bff, #0056b3)',
                      border: 'none',
                      padding: '12px'
                    }}
                  >
                    {loading ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2"></span>
                        Signing In...
                      </>
                    ) : (
                      <>
                        <i className="fas fa-sign-in-alt me-2"></i>
                        Sign In to Portal
                      </>
                    )}
                  </button>
                </form>

                {/* Demo Credentials */}
                <div className="mt-4 p-3 bg-light rounded" style={{ borderRadius: '10px' }}>
                  <h6 className="fw-bold text-dark mb-2">
                    <i className="fas fa-info-circle me-2"></i>Demo Credentials
                  </h6>
                  <small className="text-muted d-block">Username: citizen1, citizen2, or citizen3</small>
                  <small className="text-muted d-block">Password: demo123</small>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
