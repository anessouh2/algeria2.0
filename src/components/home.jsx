import "../styles/home.css";
import { useState, useEffect } from 'react';
import api from '../api';

export default function Home({ onGoShop, onGoSignin, isLoggedIn, onGoFarmer }) {
  const [backendStatus, setBackendStatus] = useState('checking');

  useEffect(() => {
    const checkBackendConnection = async () => {
      try {
        // Simple OPTIONS request to check if backend is alive
        await api.options('/auth/login/', { timeout: 3000 });
        setBackendStatus('connected');
      } catch (err) {
        if (err.response) {
          // Backend responded (even with 405 error), so it's connected
          setBackendStatus('connected');
        } else if (err.code === 'ERR_NETWORK' || err.message.includes('Network Error')) {
          setBackendStatus('disconnected');
        } else {
          // Any other response means backend is running
          setBackendStatus('connected');
        }
      }
    };

    checkBackendConnection();
    // Check every 10 seconds
    const interval = setInterval(checkBackendConnection, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="home" id="home">
      <header className="head">
        <div className="logo">
          <button className="logo-btn">Agrisync</button>
        </div>
        <ul>
          <li>
            <a href="#home">Home</a>
          </li>
          <li>
            <a href="#about">About Us</a>
          </li>
          <li>
            <a href="#features">Features</a>
          </li>
          <li>
            <a href="#contact">Contact</a>
          </li>
          <li>
            <a
              href="#shop"
              onClick={(e) => {
                e.preventDefault()
                onGoShop && onGoShop()
              }}
            >
              Shop
            </a>
          </li>
        </ul>
        <div className="signup">
          <div className="backend-status">
            <span className={`status-indicator ${backendStatus}`}></span>
            <span className="status-text">
              {backendStatus === 'checking' ? 'Checking...' : 
               backendStatus === 'connected' ? 'Connected' : 'Disconnected'}
            </span>
          </div>
          <button className="signup-btn" onClick={isLoggedIn ? onGoFarmer : onGoSignin}>
            {isLoggedIn ? 'Dashboard' : 'Sign in'}
          </button>
        </div>
      </header>
      <div className="heroo">
        <div className="content">
          <h1 className="title">
            Fairer food,
            <br />
            From Ground to Table.
          </h1>
          <p className="description">
            Empowering farmers with a direct marketplace and giving buyers the
            story behind their food. Every purchase supports a local farm and
            comes with a verifiable journey
          </p>
        </div>
      </div>
    </section>
  );
}
