import React from 'react';
import Sidenav from './Sidenav';
import MobileSidenav from './MobileSidenav';

const SidenavContainer = () => (
  <div className="app-sidenav-container">
    <MobileSidenav />
    <Sidenav />
  </div>
)

export default SidenavContainer;