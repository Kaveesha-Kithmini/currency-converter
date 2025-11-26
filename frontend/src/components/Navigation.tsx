import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './Navigation.css';

const Navigation: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className="nav-bar">
      <button
        className={`nav-button ${location.pathname === '/' ? 'active' : ''}`}
        onClick={() => navigate('/')}
      >
        Convert
      </button>
      <button
        className={`nav-button ${location.pathname === '/send' ? 'active' : ''}`}
        onClick={() => navigate('/send')}
      >
        Send
      </button>
      <button
        className={`nav-button ${location.pathname === '/charts' ? 'active' : ''}`}
        onClick={() => navigate('/charts')}
      >
        Charts
      </button>
      <button
        className={`nav-button ${location.pathname === '/alerts' ? 'active' : ''}`}
        onClick={() => navigate('/alerts')}
      >
        Alerts
      </button>
    </div>
  );
};

export default Navigation; 