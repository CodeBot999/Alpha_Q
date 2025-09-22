import React, { useState } from 'react';

// Visakhapatnam locations
const LOCATIONS = [
  'MVP Colony', 'Maddilapalem', 'Dwaraka Nagar', 'Gajuwaka', 'Rushikonda',
  'Siripuram', 'Beach Road', 'Lawsons Bay', 'Steel Plant', 'Pendurthi',
  'Anakapalli', 'Bheemunipatnam', 'Vizag Port', 'Waltair', 'Jagadamba'
];

const ScanUpload = ({ user, onNavigate, userReports, setUserReports, userPoints, setUserPoints, saveUserData }) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [activeTab, setActiveTab] = useState('upload');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedImage(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const generateTicketId = () => {
    return 'WR' + Date.now().toString().slice(-6);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedImage || !description || !location) {
      alert('Please fill all required fields');
      return;
    }

    setIsSubmitting(true);

    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 2000));

    const newReport = {
      id: Date.now(),
      ticketId: generateTicketId(),
      image: selectedImage,
      description: description.trim(),
      location,
      status: 'submitted',
      submittedAt: new Date().toISOString(),
      userId: user.id,
      userName: user.name,
      userPhone: user.phone
    };

    const updatedReports = [newReport, ...userReports];
    const newPoints = userPoints + 10;
    
    setUserReports(updatedReports);
    setUserPoints(newPoints);
    saveUserData(user.id, 'reports', updatedReports);
    saveUserData(user.id, 'points', newPoints);

    // TODO: Send to worker website
    // await sendToWorkerWebsite(newReport);

    // Reset form
    setSelectedImage(null);
    setDescription('');
    setLocation('');
    setActiveTab('history');
    setIsSubmitting(false);

    alert('Report submitted successfully! You earned 10 points.');
  };

  const liveReports = userReports.filter(report => report.status === 'submitted' || report.status === 'in-progress');
  const pastReports = userReports.filter(report => report.status === 'completed' || report.status === 'rejected');

  return (
    <div className="min-vh-100" style={{ backgroundColor: '#f8f9fa' }}>
      {/* Header */}
      <nav className="navbar navbar-dark shadow-sm" style={{ background: 'linear-gradient(135deg, #28a745 0%, #20c997 100%)' }}>
        <div className="container">
          <button 
            className="btn btn-outline-light"
            onClick={() => onNavigate('dashboard')}
          >
            <i className="fas fa-arrow-left me-2"></i>Back to Dashboard
          </button>
          <h4 className="navbar-brand mb-0 mx-auto fw-bold">
            <i className="fas fa-camera me-2"></i>Scan & Report Waste
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
                  <button 
                    className={`nav-link ${activeTab === 'upload' ? 'active' : ''}`}
                    style={{ 
                      borderRadius: '16px 0 0 0',
                      background: activeTab === 'upload' ? '#28a745' : 'transparent',
                      color: activeTab === 'upload' ? 'white' : '#6c757d',
                      border: 'none',
                      padding: '15px'
                    }}
                    onClick={() => setActiveTab('upload')}
                  >
                    <i className="fas fa-camera me-2"></i>Upload Report
                  </button>
                  <button 
                    className={`nav-link ${activeTab === 'history' ? 'active' : ''}`}
                    style={{ 
                      borderRadius: '0 16px 0 0',
                      background: activeTab === 'history' ? '#28a745' : 'transparent',
                      color: activeTab === 'history' ? 'white' : '#6c757d',
                      border: 'none',
                      padding: '15px'
                    }}
                    onClick={() => setActiveTab('history')}
                  >
                    <i className="fas fa-history me-2"></i>History ({userReports.length})
                  </button>
                </nav>
              </div>
            </div>
          </div>
        </div>

        {/* Upload Form */}
        {activeTab === 'upload' && (
          <div className="row">
            <div className="col-lg-8 mx-auto">
              <div className="card border-0 shadow-sm" style={{ borderRadius: '16px' }}>
                <div className="card-body p-4">
                  <h5 className="fw-bold mb-4 text-center">
                    <i className="fas fa-upload me-2 text-success"></i>
                    Report Waste Issue
                  </h5>

                  <form onSubmit={handleSubmit}>
                    {/* Image Upload */}
                    <div className="mb-4">
                      <label className="form-label fw-semibold">
                        <i className="fas fa-camera me-2"></i>Take or Upload Photo *
                      </label>
                      {!selectedImage ? (
                        <div 
                          className="border-2 border-dashed rounded p-5 text-center"
                          style={{ 
                            borderColor: '#28a745',
                            backgroundColor: '#f8f9fa',
                            cursor: 'pointer'
                          }}
                          onClick={() => document.getElementById('imageInput').click()}
                        >
                          <i className="fas fa-camera-retro text-success fs-1 mb-3"></i>
                          <h6 className="fw-bold text-success">Click to Capture or Upload Photo</h6>
                          <p className="text-muted mb-0">Take a clear photo of the waste issue</p>
                        </div>
                      ) : (
                        <div className="position-relative">
                          <img 
                            src={selectedImage} 
                            alt="Selected" 
                            className="img-fluid rounded shadow"
                            style={{ width: '100%', maxHeight: '300px', objectFit: 'cover' }}
                          />
                          <button 
                            type="button"
                            className="btn btn-danger btn-sm position-absolute top-0 end-0 m-2"
                            onClick={() => setSelectedImage(null)}
                            style={{ borderRadius: '50%' }}
                          >
                            <i className="fas fa-times"></i>
                          </button>
                        </div>
                      )}
                      <input
                        id="imageInput"
                        type="file"
                        accept="image/*"
                        capture="camera"
                        onChange={handleImageUpload}
                        style={{ display: 'none' }}
                        required
                      />
                    </div>

                    {/* Description */}
                    <div className="mb-4">
                      <label className="form-label fw-semibold">
                        <i className="fas fa-comment-alt me-2"></i>Description *
                      </label>
                      <textarea
                        className="form-control"
                        rows="4"
                        placeholder="Describe the waste issue in detail..."
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                        style={{ borderRadius: '10px' }}
                      />
                    </div>

                    {/* Location */}
                    <div className="mb-4">
                      <label className="form-label fw-semibold">
                        <i className="fas fa-map-marker-alt me-2"></i>Location *
                      </label>
                      <select 
                        className="form-select"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        required
                        style={{ borderRadius: '10px' }}
                      >
                        <option value="">Select Location</option>
                        {LOCATIONS.map((loc) => (
                          <option key={loc} value={loc}>{loc}</option>
                        ))}
                      </select>
                    </div>

                    {/* Submit Button */}
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
                            Submitting Report...
                          </>
                        ) : (
                          <>
                            <i className="fas fa-paper-plane me-2"></i>
                            Submit Report (+10 Points)
                          </>
                        )}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* History Section */}
        {activeTab === 'history' && (
          <div className="row">
            <div className="col-12">
              {userReports.length === 0 ? (
                <div className="card border-0 shadow-sm" style={{ borderRadius: '16px' }}>
                  <div className="card-body text-center p-5">
                    <i className="fas fa-inbox text-muted fs-1 mb-3"></i>
                    <h5 className="text-muted">No Reports Yet</h5>
                    <p className="text-muted">You haven't submitted any waste reports yet.</p>
                    <button 
                      className="btn btn-success"
                      onClick={() => setActiveTab('upload')}
                      style={{ borderRadius: '25px' }}
                    >
                      <i className="fas fa-camera me-2"></i>
                      Submit First Report
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  {/* Live Reports */}
                  {liveReports.length > 0 && (
                    <div className="mb-4">
                      <h5 className="fw-bold mb-3">
                        <i className="fas fa-broadcast-tower me-2 text-danger"></i>
                        Live Reports ({liveReports.length})
                      </h5>
                      {liveReports.map((report) => (
                        <div key={report.id} className="card border-0 shadow-sm mb-3" style={{ borderRadius: '16px' }}>
                          <div className="card-body">
                            <div className="row align-items-center">
                              <div className="col-md-3">
                                <img 
                                  src={report.image} 
                                  alt="Report" 
                                  className="img-fluid rounded shadow-sm"
                                  style={{ height: '100px', width: '100%', objectFit: 'cover' }}
                                />
                              </div>
                              <div className="col-md-6">
                                <h6 className="fw-bold mb-2">Ticket ID: {report.ticketId}</h6>
                                <p className="text-muted mb-2">{report.description}</p>
                                <small className="text-muted">
                                  <i className="fas fa-map-marker-alt me-1"></i>{report.location}
                                  <br />
                                  <i className="fas fa-clock me-1"></i>{new Date(report.submittedAt).toLocaleString()}
                                </small>
                              </div>
                              <div className="col-md-3 text-end">
                                <span className={`badge fs-6 ${report.status === 'submitted' ? 'bg-warning' : 'bg-info'}`}>
                                  {report.status === 'submitted' ? 'Under Review' : 'In Progress'}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Past Reports */}
                  {pastReports.length > 0 && (
                    <div>
                      <h5 className="fw-bold mb-3">
                        <i className="fas fa-history me-2 text-success"></i>
                        Past Reports ({pastReports.length})
                      </h5>
                      {pastReports.map((report) => (
                        <div key={report.id} className="card border-0 shadow-sm mb-3" style={{ borderRadius: '16px' }}>
                          <div className="card-body">
                            <div className="row align-items-center">
                              <div className="col-md-3">
                                <img 
                                  src={report.image} 
                                  alt="Report" 
                                  className="img-fluid rounded shadow-sm"
                                  style={{ height: '100px', width: '100%', objectFit: 'cover' }}
                                />
                              </div>
                              <div className="col-md-6">
                                <h6 className="fw-bold mb-2">Ticket ID: {report.ticketId}</h6>
                                <p className="text-muted mb-2">{report.description}</p>
                                <small className="text-muted">
                                  <i className="fas fa-map-marker-alt me-1"></i>{report.location}
                                  <br />
                                  <i className="fas fa-clock me-1"></i>{new Date(report.submittedAt).toLocaleString()}
                                </small>
                              </div>
                              <div className="col-md-3 text-end">
                                <span className={`badge fs-6 ${report.status === 'completed' ? 'bg-success' : 'bg-danger'}`}>
                                  {report.status === 'completed' ? 'Resolved' : 'Rejected'}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ScanUpload;
