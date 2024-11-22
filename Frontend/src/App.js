import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './Components/Navbar';
import Home from './Components/HomeContent';
import Feature from './Components/Feature';
import Offer from './Components/Offer';
import About from './Components/About';
import Contact from './Components/Contact';
import Login from './Components/Login';
import Signup from './Components/Signup';
import PasswordRecovery from './Components/PasswordRecovery';
import Footer from './Components/Footer';
import Sidebar from './Components/Backend/Sidebar';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const location = useLocation();

  // Check for token in localStorage to determine if user is logged in
  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token); // Sets isLoggedIn to true if a token exists
  }, [location.pathname]);

  // Show Navbar and Footer on all routes except '/sidebar'
  const showNavbarAndFooter = location.pathname !== '/sidebar';

  return (
    <>
      {showNavbarAndFooter && <Navbar />}
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/features" element={<Feature />} />
          <Route path="/offer" element={<Offer />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/password-recovery" element={<PasswordRecovery />} />
          <Route path="/sidebar" element={<Sidebar />} />
        </Routes>
      </div>
      {showNavbarAndFooter && <Footer />}
    </>
  );
};

// Wrap App component with BrowserRouter
export default () => (
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
