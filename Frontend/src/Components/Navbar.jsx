import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../images/logo.png';

function Navbar() {
  // State to control the menu visibility
  const [menuOpen, setMenuOpen] = useState(false);

  // Toggle menu open/close
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  // Close the menu when a link is clicked
  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <nav className='nav'>
      <Link to='/' className='logo'>
        <img src={logo} alt='Logo' />
      </Link>
      
      {/* Menu toggle checkbox */}
      <input 
        className='menu-btn' 
        type='checkbox' 
        id='menu-btn' 
        checked={menuOpen} 
        onChange={toggleMenu} 
      />
      
      {/* Burger Icon */}
      <label className='menu-icon' htmlFor='menu-btn'>
        <span className='nav-icon'></span>
      </label>
      
      {/* Menu */}
      <ul className={`menu ${menuOpen ? 'active' : ''}`}>
        <li><Link to='/' onClick={closeMenu}>Home</Link></li>
        <li><Link to='/features' onClick={closeMenu}>Features</Link></li>
        <li><Link to='/offer' onClick={closeMenu}>Offer</Link></li>
        <li><Link to='/contact' onClick={closeMenu}>Contact</Link></li>
        <li><Link to='/login' onClick={closeMenu}>LOG IN</Link></li>
        <li><Link to='/signup' onClick={closeMenu}>SIGN UP</Link></li>
      </ul>
    </nav>
  );
}

export default Navbar;
