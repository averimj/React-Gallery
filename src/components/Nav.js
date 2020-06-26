import React from 'react';
import { Link } from 'react-router-dom';

const Nav = () => (
  <nav class="main-nav">
    <ul>
      <li><Link to='#'>Cats</Link></li>
      <li><Link to='#'>Dogs</Link></li>
      <li><Link to='#'>Computers</Link></li>
      </ul>
  </nav>
)

export default Nav;
