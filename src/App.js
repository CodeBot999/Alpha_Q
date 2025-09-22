import React, { useState, useEffect } from 'react';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import ScanUpload from './components/ScanUpload';
import Tutorials from './components/Tutorials';
import Shop from './components/Shop';
import Complaints from './components/Complaints';
import Profile from './components/Profile';
import ContactHelp from './components/ContactHelp';
import HowToUse from './components/HowToUse';
import Points from './components/Points';

// Bootstrap and FontAwesome CSS injection
const injectCSS = () => {
  const bootstrapLink = document.createElement('link');
  bootstrapLink.href = 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css';
  bootstrapLink.rel = 'stylesheet';
  
  const fontAwesome = document.createElement('link');
  fontAwesome.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css';
  fontAwesome.rel = 'stylesheet';
  
  document.head.appendChild(bootstrapLink);
  document.head.appendChild(fontAwesome);
};

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [userReports, setUserReports] = useState([]);
  const [userComplaints, setUserComplaints] = useState([]);
  const [userPoints, setUserPoints] = useState(0);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    injectCSS();
    
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
      const user = JSON.parse(savedUser);
      setCurrentUser(user);
      loadUserData(user.id);
    }
  }, []);

  const loadUserData = (userId) => {
    const reports = JSON.parse(localStorage.getItem(`reports_${userId}`)) || [];
    const complaints = JSON.parse(localStorage.getItem(`complaints_${userId}`)) || [];
    const points = parseInt(localStorage.getItem(`points_${userId}`)) || 0;
    
    setUserReports(reports);
    setUserComplaints(complaints);
    setUserPoints(points);
  };

  const saveUserData = (userId, type, data) => {
    localStorage.setItem(`${type}_${userId}`, JSON.stringify(data));
  };

  const handleLogin = (user) => {
    setCurrentUser(user);
    localStorage.setItem('currentUser', JSON.stringify(user));
    loadUserData(user.id);
    setCurrentPage('dashboard');
  };

  const handleLogout = () => {
    setCurrentUser(null);
    localStorage.removeItem('currentUser');
    setCurrentPage('dashboard');
    setUserReports([]);
    setUserComplaints([]);
    setUserPoints(0);
    setCart([]);
  };

  if (!currentUser) {
    return <Login onLogin={handleLogin} />;
  }

  const renderPage = () => {
    const commonProps = {
      user: currentUser,
      onNavigate: setCurrentPage,
      onLogout: handleLogout
    };

    switch (currentPage) {
      case 'dashboard':
        return <Dashboard {...commonProps} userReports={userReports} userComplaints={userComplaints} userPoints={userPoints} />;
      case 'scan-upload':
        return <ScanUpload {...commonProps} userReports={userReports} setUserReports={setUserReports} userPoints={userPoints} setUserPoints={setUserPoints} saveUserData={saveUserData} />;
      case 'tutorials':
        return <Tutorials {...commonProps} userPoints={userPoints} setUserPoints={setUserPoints} saveUserData={saveUserData} />;
      case 'shop':
        return <Shop {...commonProps} cart={cart} setCart={setCart} userPoints={userPoints} />;
      case 'complaints':
        return <Complaints {...commonProps} userComplaints={userComplaints} setUserComplaints={setUserComplaints} saveUserData={saveUserData} />;
      case 'profile':
        return <Profile {...commonProps} userReports={userReports} userComplaints={userComplaints} userPoints={userPoints} />;
      case 'contact-help':
        return <ContactHelp {...commonProps} />;
      case 'how-to-use':
        return <HowToUse {...commonProps} />;
      case 'points':
        return <Points {...commonProps} userPoints={userPoints} />;
      default:
        return <Dashboard {...commonProps} userReports={userReports} userComplaints={userComplaints} userPoints={userPoints} />;
    }
  };

  return <div className="App">{renderPage()}</div>;
}

export default App;
