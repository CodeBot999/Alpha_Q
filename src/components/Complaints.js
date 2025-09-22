import React, { useState } from 'react';

const COMPLAINT_CATEGORIES = [
  'Collection Delay',
  'Missed Pickup',
  'Worker Issues',
  'Bin Overflow',
  'Street Littering',
  'Improper Segregation',
  'Vehicle Problems',
  'Other'
];

const PRIORITY_LEVELS = [
  { value: 'low', label: 'Low Priority', color: '#28a745' },
  { value: 'medium', label: 'Medium Priority', color: '#ffc107' },
  { value: 'high', label: 'High Priority', color: '#dc3545' }
];

const Complaints = ({ user, onNavigate, userComplaints, setUserComplaints, saveUserData }) => {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    category: '',
    priority: 'medium',
    subject: '',
    description: '',
    location: '',
    phone: user.phone
  });
  const [attachedImage, setAttachedImage] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const generateComplaintId = () => {
    return 'CMP' + Date.now().toString().slice(-6);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setAttachedImage(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.category || !formData.subject || !formData.description) {
      alert('Please fill all required fields');
      return;
    }

    setIsSubmitting(true);

    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 2000));

    const newComplaint = {
      id: Date.now(),
      complaintId: generateComplaintId(),
      ...formData,
      image: attachedImage,
      status: 'submitted',
      submittedAt: new Date().toISOString(),
      userId: user.id,
      userName: user.name
    };

    const updatedComplaints = [newComplaint, ...userComplaints];
    setUserComplaints(updatedComplaints);
    saveUserData(user.id, 'complaints', updatedComplaints);

    // TODO: Send to GVMC worker website
    // await sendComplaintToWorkerSite(newComplaint);

    // Reset form
    setFormData({
      category: '',
      priority: 'medium',
      subject: '',
      description: '',
      location: '',
      phone: user.phone
    });
    setAttachedImage(null);
    setShowForm(false);
    setIsSubmitting(false);

    alert('Complaint submitted successfully! We will respond within 24 hours.');
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'submitted': return '#17a2b8';
      case 'in-progress': return '#ffc107';
      case 'resolved': return '#28a745';
      case 'rejected': return '#dc3545';
      default: return '#6c757d';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'submitted': return 'fas fa-clock';
      case 'in-progress': return 'fas fa-spinner';
      case 'resolved': return 'fas fa-check-circle';
      case 'rejected': return 'fas fa-times-circle';
      default: return 'fas fa-question-circle';
    }
  };

  return (
    <div className="min-vh-100" style={{ backgroundColor: '#f8f9fa' }}>
      {/* Header */}
      <nav className="navbar navbar-dark shadow-sm" style={{ background: 'linear-gradient(135deg, #dc3545 0%, #c82333 100%)' }}>
        <div className="container">
          <button 
            className="btn btn-outline-light"
            onClick={() => onNavigate('dashboard')}
          >
            <i className="fas fa-arrow-left me-2"></i>Back to Dashboard
          </button>
          <h4 className="navbar-brand mb-0 mx-auto fw-bold">
            <i className="fas fa-exclamation-triangle me-2"></i>File Complaint
          </h4>
          <button 
            className="btn btn-outline-light"
            onClick={() => setShowForm(!showForm)}
          >
            <i className={`fas ${showForm ? 'fa-times' : 'fa-plus'} me-2`}></i>
            {showForm ? 'Cancel' : 'New'}
          </button>
        </div>
      </nav>

      <div className="container py-4">
        {/* New Complaint Form */}
        {showForm && (
          <div className="row mb-4">
            <div className="col-lg-8 mx-auto">
              <div className="card border-0 shadow-sm" style={{ borderRadius: '16px' }}>
                <div className="card-body p-4">
                  <h5 className="fw-bold mb-4 text-center">
                    <i className="fas fa-file-alt me-2 text-danger"></i>
                    Submit New Complaint
                  </h5>

                  <form onSubmit={handleSubmit}>
                    {/* Category and Priority */}
                    <div className="row mb-3">
                      <div className="col-md-6">
                        <label className="form-label fw-semibold">
                          <i className="fas fa-list me-2"></i>Complaint Category *
                        </label>
                        <select 
                          name="category"
                          className="form-select"
                          value={formData.category}
                          onChange={handleInputChange}
                          required
                          style={{ borderRadius: '10px' }}
                        >
                          <option value="">Select Category</option>
                          {COMPLAINT_CATEGORIES.map((category) => (
                            <option key={category} value={category}>{category}</option>
                          ))}
                        </select>
                      </div>
                      <div className="col-md-6">
                        <label className="form-label fw-semibold">
                          <i className="fas fa-flag me-2"></i>Priority Level
                        </label>
                        <select 
                          name="priority"
                          className="form-select"
                          value={formData.priority}
                          onChange={handleInputChange}
                          style={{ borderRadius: '10px' }}
                        >
                          {PRIORITY_LEVELS.map((level) => (
                            <option key={level.value} value={level.value}>{level.label}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    {/* Subject */}
                    <div className="mb-3">
                      <label className="form-label fw-semibold">
                        <i className="fas fa-heading me-2"></i>Subject *
                      </label>
                      <input 
                        type="text"
                        name="subject"
                        className="form-control"
                        placeholder="Brief description of your complaint"
                        value={formData.subject}
                        onChange={handleInputChange}
                        required
                        style={{ borderRadius: '10px' }}
                      />
                    </div>

                    {/* Description */}
                    <div className="mb-3">
                      <label className="form-label fw-semibold">
                        <i className="fas fa-comment-alt me-2"></i>Detailed Description *
                      </label>
                      <textarea 
                        name="description"
                        className="form-control"
                        rows="4"
                        placeholder="Provide detailed information about your complaint..."
                        value={formData.description}
                        onChange={handleInputChange}
                        required
                        style={{ borderRadius: '10px' }}
                      />
                    </div>

                    {/* Location and Phone */}
                    <div className="row mb-3">
                      <div className="col-md-6">
                        <label className="form-label fw-semibold">
                          <i className="fas fa-map-marker-alt me-2"></i>Location
                        </label>
                        <input 
                          type="text"
                          name="location"
                          className="form-control"
                          placeholder="Specific location or address"
                          value={formData.location}
                          onChange={handleInputChange}
                          style={{ borderRadius: '10px' }}
                        />
                      </div>
                      <div className="col-md-6">
                        <label className="form-label fw-semibold">
                          <i className="fas fa-phone me-2"></i>Contact Phone
                        </label>
                        <input 
                          type="tel"
                          name="phone"
                          className="form-control"
                          placeholder="Your phone number"
                          value={formData.phone}
                          onChange={handleInputChange}
                          style={{ borderRadius: '10px' }}
                        />
                      </div>
                    </div>

                    {/* Image Upload */}
                    <div className="mb-4">
                      <label className="form-label fw-semibold">
                        <i className="fas fa-camera me-2"></i>Attach Photo (Optional)
                      </label>
                      {!attachedImage ? (
                        <div 
                          className="border-2 border-dashed rounded p-4 text-center"
                          style={{ 
                            borderColor: '#dc3545',
                            backgroundColor: '#f8f9fa',
                            cursor: 'pointer'
                          }}
                          onClick={() => document.getElementById('imageInput').click()}
                        >
                          <i className="fas fa-cloud-upload-alt text-danger fs-2 mb-2"></i>
                          <h6 className="fw-bold text-danger">Click to Upload Photo</h6>
                          <p className="text-muted mb-0">Upload evidence to support your complaint</p>
                        </div>
                      ) : (
                        <div className="position-relative">
                          <img 
                            src={attachedImage} 
                            alt="Attached" 
                            className="img-fluid rounded shadow"
                            style={{ width: '100%', maxHeight: '200px', objectFit: 'cover' }}
                          />
                          <button 
                            type="button"
                            className="btn btn-danger btn-sm position-absolute top-0 end-0 m-2"
                            onClick={() => setAttachedImage(null)}
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
                      />
                    </div>

                    {/* Submit Button */}
                    <div className="d-grid">
                      <button 
                        type="submit" 
                        className="btn btn-danger btn-lg fw-semibold"
                        disabled={isSubmitting}
                        style={{ borderRadius: '25px' }}
                      >
                        {isSubmitting ? (
                          <>
                            <span className="spinner-border spinner-border-sm me-2"></span>
                            Submitting Complaint...
                          </>
                        ) : (
                          <>
                            <i className="fas fa-paper-plane me-2"></i>
                            Submit Complaint
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

        {/* Complaints History */}
        <div className="row">
          <div className="col-12">
            <div className="card border-0 shadow-sm" style={{ borderRadius: '16px' }}>
              <div className="card-body p-4">
                <h5 className="fw-bold mb-4">
                  <i className="fas fa-history me-2"></i>
                  Your Complaints ({userComplaints.length})
                </h5>

                {userComplaints.length === 0 ? (
                  <div className="text-center py-5">
                    <i className="fas fa-clipboard-list text-muted fs-1 mb-3"></i>
                    <h6 className="text-muted">No Complaints Filed</h6>
                    <p className="text-muted">You haven't filed any complaints yet.</p>
                    <button 
                      className="btn btn-danger"
                      onClick={() => setShowForm(true)}
                      style={{ borderRadius: '25px' }}
                    >
                      <i className="fas fa-plus me-2"></i>
                      File First Complaint
                    </button>
                  </div>
                ) : (
                  <div className="row g-3">
                    {userComplaints.map((complaint) => (
                      <div key={complaint.id} className="col-12">
                        <div 
                          className="card border-0 shadow-sm h-100"
                          style={{ borderRadius: '12px', borderLeft: `4px solid ${getStatusColor(complaint.status)}` }}
                        >
                          <div className="card-body p-3">
                            <div className="row align-items-center">
                              <div className="col-md-8">
                                <div className="d-flex align-items-center mb-2">
                                  <h6 className="fw-bold mb-0 me-2">{complaint.subject}</h6>
                                  <span className="badge bg-secondary">#{complaint.complaintId}</span>
                                </div>
                                <p className="text-muted mb-2 small">{complaint.description}</p>
                                <div className="d-flex flex-wrap gap-2">
                                  <small className="text-muted">
                                    <i className="fas fa-folder me-1"></i>
                                    {complaint.category}
                                  </small>
                                  <small className="text-muted">
                                    <i className="fas fa-clock me-1"></i>
                                    {new Date(complaint.submittedAt).toLocaleString()}
                                  </small>
                                  {complaint.location && (
                                    <small className="text-muted">
                                      <i className="fas fa-map-marker-alt me-1"></i>
                                      {complaint.location}
                                    </small>
                                  )}
                                </div>
                              </div>
                              <div className="col-md-4 text-end">
                                <span 
                                  className="badge fs-6 px-3 py-2"
                                  style={{ 
                                    backgroundColor: `${getStatusColor(complaint.status)}20`,
                                    color: getStatusColor(complaint.status)
                                  }}
                                >
                                  <i className={`${getStatusIcon(complaint.status)} me-1`}></i>
                                  {complaint.status === 'submitted' ? 'Under Review' :
                                   complaint.status === 'in-progress' ? 'In Progress' :
                                   complaint.status === 'resolved' ? 'Resolved' : 'Rejected'}
                                </span>
                                <div className="mt-2">
                                  <span 
                                    className="badge"
                                    style={{ 
                                      backgroundColor: PRIORITY_LEVELS.find(p => p.value === complaint.priority)?.color + '20',
                                      color: PRIORITY_LEVELS.find(p => p.value === complaint.priority)?.color
                                    }}
                                  >
                                    {PRIORITY_LEVELS.find(p => p.value === complaint.priority)?.label}
                                  </span>
                                </div>
                              </div>
                            </div>
                            {complaint.image && (
                              <div className="mt-3">
                                <img 
                                  src={complaint.image} 
                                  alt="Complaint evidence" 
                                  className="img-thumbnail"
                                  style={{ maxWidth: '150px', maxHeight: '100px', objectFit: 'cover' }}
                                />
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Complaints;
