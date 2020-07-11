import React from 'react';
import { NavLink } from 'react-router-dom';

const Nav = () => (
  <div className='nav-container'>
    <nav className="main-nav">
      <ul>
        <li><NavLink exact to='/'>Photo</NavLink></li>
        <li><NavLink to='/cats'>Cats</NavLink></li>
        <li><NavLink to='/dogs'>Dogs</NavLink></li>
        <li><NavLink to='/computers'>Computers</NavLink></li>
      </ul>
    </nav>
  </div>
);

export default Nav;
