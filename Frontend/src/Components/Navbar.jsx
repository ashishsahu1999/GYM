

import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../images/logo.png';

function Navbar() {
  return (
    <nav className='nav'>
      <Link to='/' className='logo'>
        <img src={logo} alt='Logo' />
      </Link>
      <input className='menu-btn' type='checkbox' id='menu-btn' />
      <label className='menu-icon' htmlFor='menu-btn'>
        <span className='nav-icon'></span>
      </label>
      <ul className='menu'>
        <li><Link to='/' >Home</Link></li>
        <li><Link to='/features'>Features</Link></li>
        <li><Link to='/offer'>Offer</Link></li>
        <li><Link to='/about'>About</Link></li>
        <li><Link to='/contact'>Contact</Link></li>
        <li><Link to='/login'>LOG IN</Link></li>
        <li><Link to='/signup'>SIGN UP</Link></li>
      </ul>
    </nav>
  );
}

export default Navbar;

