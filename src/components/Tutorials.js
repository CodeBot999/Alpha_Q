import React, { useState } from 'react';

const TUTORIAL_COURSES = [
  {
    id: 1,
    title: 'Waste Segregation at Home',
    description: 'Learn how to properly separate wet, dry, and hazardous waste',
    duration: '15 min',
    points: 20,
    difficulty: 'Beginner',
    icon: 'fas fa-home',
    category: 'Segregation'
  },
  {
    id: 2,
    title: 'Composting Made Simple',
    description: 'Create nutrient-rich compost from kitchen waste',
    duration: '25 min',
    points: 30,
    difficulty: 'Intermediate',
    icon: 'fas fa-seedling',
    category: 'Composting'
  },
  {
    id: 3,
    title: 'Plastic Waste Reduction',
    description: 'Practical tips to reduce plastic usage in daily life',
    duration: '20 min',
    points: 25,
    difficulty: 'Beginner',
    icon: 'fas fa-recycle',
    category: 'Reduction'
  },
  {
    id: 4,
    title: 'Understanding GVMC Workers',
    description: 'Appreciate the hard work of waste management professionals',
    duration: '18 min',
    points: 15,
    difficulty: 'Beginner',
    icon: 'fas fa-users',
    category: 'Awareness'
  },
  {
    id: 5,
    title: 'Hygiene in Waste Management',
    description: 'Maintain cleanliness while handling waste',
    duration: '12 min',
    points: 20,
    difficulty: 'Beginner',
    icon: 'fas fa-hand-sparkles',
    category: 'Hygiene'
  },
  {
    id: 6,
    title: 'Community Clean-up Drive',
    description: 'Organize and participate in neighborhood cleaning',
    duration: '30 min',
    points: 40,
    difficulty: 'Advanced',
    icon: 'fas fa-hands-helping',
    category: 'Community'
  }
];

const Tutorials = ({ user, onNavigate, userPoints, setUserPoints, saveUserData }) => {
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [completedCourses, setCompletedCourses] = useState(
    JSON.parse(localStorage.getItem(`completed_courses_${user.id}`)) || []
  );

  const handleCourseComplete = (courseId, points) => {
    if (!completedCourses.includes(courseId)) {
      const newCompletedCourses = [...completedCourses, courseId];
      const newPoints = userPoints + points;
      
      setCompletedCourses(newCompletedCourses);
      setUserPoints(newPoints);
      
      localStorage.setItem(`completed_courses_${user.id}`, JSON.stringify(newCompletedCourses));
      saveUserData(user.id, 'points', newPoints);
      
      alert(`Congratulations! Course completed. You earned ${points} points!`);
      setSelectedCourse(null);
    }
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Beginner': return '#28a745';
      case 'Intermediate': return '#ffc107';
      case 'Advanced': return '#dc3545';
      default: return '#6c757d';
    }
  };

  const getCategoryColor = (category) => {
    const colors = {
      'Segregation': '#007bff',
      'Composting': '#28a745',
      'Reduction': '#fd7e14',
      'Awareness': '#6f42c1',
      'Hygiene': '#17a2b8',
      'Community': '#e83e8c'
    };
    return colors[category] || '#6c757d';
  };

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
            <i className="fas fa-graduation-cap me-2"></i>Learn & Earn
          </h4>
          <div className="text-light">
            <i className="fas fa-coins me-1"></i>{userPoints} Points
          </div>
        </div>
      </nav>

      <div className="container py-4">
        {!selectedCourse ? (
          <>
            {/* Course Overview */}
            <div className="row mb-4">
              <div className="col-12">
                <div className="card border-0 shadow-sm" style={{ borderRadius: '16px', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
                  <div className="card-body p-4 text-white text-center">
                    <h2 className="fw-bold mb-2">Waste Management Learning Center</h2>
                    <p className="mb-3 opacity-90">Complete courses to earn points and become an environmental champion!</p>
                    <div className="row">
                      <div className="col-4">
                        <div className="fw-bold fs-4">{TUTORIAL_COURSES.length}</div>
                        <small className="opacity-75">Available Courses</small>
                      </div>
                      <div className="col-4">
                        <div className="fw-bold fs-4">{completedCourses.length}</div>
                        <small className="opacity-75">Completed</small>
                      </div>
                      <div className="col-4">
                        <div className="fw-bold fs-4">{TUTORIAL_COURSES.reduce((sum, course) => sum + course.points, 0)}</div>
                        <small className="opacity-75">Total Points</small>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Courses Grid */}
            <div className="row g-4">
              {TUTORIAL_COURSES.map((course) => {
                const isCompleted = completedCourses.includes(course.id);
                return (
                  <div key={course.id} className="col-md-6 col-lg-4">
                    <div 
                      className={`card h-100 border-0 shadow-sm ${isCompleted ? 'bg-light' : ''}`}
                      style={{ 
                        borderRadius: '16px',
                        cursor: 'pointer',
                        transition: 'all 0.3s ease',
                        opacity: isCompleted ? 0.8 : 1
                      }}
                      onClick={() => setSelectedCourse(course)}
                      onMouseEnter={(e) => {
                        if (!isCompleted) {
                          e.currentTarget.style.transform = 'translateY(-5px)';
                          e.currentTarget.style.boxShadow = '0 10px 30px rgba(0,0,0,0.15)';
                        }
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'translateY(0)';
                        e.currentTarget.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
                      }}
                    >
                      <div className="card-body p-4">
                        <div className="d-flex justify-content-between align-items-start mb-3">
                          <div 
                            className="p-3 rounded-3"
                            style={{
                              background: `${getCategoryColor(course.category)}20`,
                              color: getCategoryColor(course.category)
                            }}
                          >
                            <i className={`${course.icon} fs-4`}></i>
                          </div>
                          {isCompleted && (
                            <div className="text-success">
                              <i className="fas fa-check-circle fs-4"></i>
                            </div>
                          )}
                        </div>
                        
                        <h5 className="fw-bold mb-2">{course.title}</h5>
                        <p className="text-muted mb-3 small">{course.description}</p>
                        
                        <div className="row g-2 mb-3">
                          <div className="col-6">
                            <div className="d-flex align-items-center">
                              <i className="fas fa-clock text-muted me-2"></i>
                              <small className="text-muted">{course.duration}</small>
                            </div>
                          </div>
                          <div className="col-6">
                            <div className="d-flex align-items-center">
                              <i className="fas fa-coins text-warning me-2"></i>
                              <small className="fw-semibold">{course.points} Points</small>
                            </div>
                          </div>
                        </div>
                        
                        <div className="d-flex justify-content-between align-items-center">
                          <span 
                            className="badge px-3 py-2"
                            style={{ 
                              backgroundColor: `${getDifficultyColor(course.difficulty)}20`,
                              color: getDifficultyColor(course.difficulty)
                            }}
                          >
                            {course.difficulty}
                          </span>
                          <span 
                            className="badge px-3 py-2"
                            style={{ 
                              backgroundColor: `${getCategoryColor(course.category)}20`,
                              color: getCategoryColor(course.category)
                            }}
                          >
                            {course.category}
                          </span>
                        </div>
                        
                        {isCompleted && (
                          <div className="mt-3 text-center">
                            <small className="text-success fw-semibold">
                              <i className="fas fa-trophy me-1"></i>Course Completed!
                            </small>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        ) : (
          /* Course Detail View */
          <div className="row">
            <div className="col-lg-8 mx-auto">
              <div className="card border-0 shadow-sm" style={{ borderRadius: '16px' }}>
                <div className="card-body p-0">
                  {/* Course Header */}
                  <div 
                    className="p-4 text-white rounded-top"
                    style={{ background: `linear-gradient(135deg, ${getCategoryColor(selectedCourse.category)}, ${getCategoryColor(selectedCourse.category)}cc)` }}
                  >
                    <button 
                      className="btn btn-outline-light btn-sm mb-3"
                      onClick={() => setSelectedCourse(null)}
                    >
                      <i className="fas fa-arrow-left me-2"></i>Back to Courses
                    </button>
                    
                    <div className="d-flex align-items-center mb-3">
                      <div className="me-3">
                        <i className={`${selectedCourse.icon} fs-1`}></i>
                      </div>
                      <div>
                        <h3 className="fw-bold mb-1">{selectedCourse.title}</h3>
                        <p className="mb-2 opacity-90">{selectedCourse.description}</p>
                        <div className="d-flex gap-3">
                          <small><i className="fas fa-clock me-1"></i>{selectedCourse.duration}</small>
                          <small><i className="fas fa-coins me-1"></i>{selectedCourse.points} Points</small>
                          <small><i className="fas fa-signal me-1"></i>{selectedCourse.difficulty}</small>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Course Content */}
                  <div className="p-4">
                    <div className="text-center py-5">
                      <div 
                        className="mb-4 mx-auto"
                        style={{
                          width: '120px',
                          height: '120px',
                          background: '#f8f9fa',
                          borderRadius: '16px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          border: '2px dashed #dee2e6'
                        }}
                      >
                        <i className="fas fa-video fs-1 text-muted"></i>
                      </div>
                      <h5 className="fw-bold mb-3">Video Content</h5>
                      <p className="text-muted mb-4">
                        Educational video content for "{selectedCourse.title}" will be uploaded soon.
                        <br />Our team is preparing high-quality learning materials for you.
                      </p>
                      <div className="alert alert-info">
                        <i className="fas fa-info-circle me-2"></i>
                        <strong>Coming Soon:</strong> Interactive video lessons, quizzes, and practical demonstrations.
                      </div>
                    </div>

                    {/* Course Outline */}
                    <div className="mb-4">
                      <h6 className="fw-bold mb-3">Course Outline:</h6>
                      <div className="list-group list-group-flush">
                        <div className="list-group-item border-0 px-0">
                          <i className="fas fa-play-circle text-success me-2"></i>
                          Introduction and Overview (3 min)
                        </div>
                        <div className="list-group-item border-0 px-0">
                          <i className="fas fa-play-circle text-success me-2"></i>
                          Practical Demonstrations (8 min)
                        </div>
                        <div className="list-group-item border-0 px-0">
                          <i className="fas fa-play-circle text-success me-2"></i>
                          Tips and Best Practices (3 min)
                        </div>
                        <div className="list-group-item border-0 px-0">
                          <i className="fas fa-check-circle text-success me-2"></i>
                          Knowledge Assessment (1 min)
                        </div>
                      </div>
                    </div>

                    {/* Action Button */}
                    <div className="text-center">
                      {completedCourses.includes(selectedCourse.id) ? (
                        <div className="alert alert-success">
                          <i className="fas fa-trophy me-2"></i>
                          <strong>Congratulations!</strong> You have already completed this course.
                        </div>
                      ) : (
                        <button 
                          className="btn btn-success btn-lg fw-semibold"
                          onClick={() => handleCourseComplete(selectedCourse.id, selectedCourse.points)}
                          style={{ borderRadius: '25px' }}
                        >
                          <i className="fas fa-graduation-cap me-2"></i>
                          Mark as Complete & Earn {selectedCourse.points} Points
                        </button>
                      )}
                    </div>
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

export default Tutorials;
