import React from 'react';
import MenuOnlySidenav from './MenuOnlySidenav';
import MobileSidenav from './MobileSidenav';

const SidenavContainer = () => (
  <div className="app-sidenav-container">
    <MobileSidenav />
    <MenuOnlySidenav />
  </div>
)

export default SidenavContainer;