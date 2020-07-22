import React from 'react';
import { NavLink } from 'react-router-dom';

const Nav = () => (
  <div className='nav-container'>
    <nav className="main-nav">
      <ul>
        <li><NavLink to='/fruit'>Fruit</NavLink></li>
        <li><NavLink to='/snow'>Snow</NavLink></li>
        <li><NavLink to='/fighter_jets'>Planes</NavLink></li>
        <li><NavLink to='/dolphines'>Dolphins</NavLink></li>
      </ul>
    </nav>
  </div>
);

export default Nav;
