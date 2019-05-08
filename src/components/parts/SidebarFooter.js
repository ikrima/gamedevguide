import React from 'react'
import { Icon } from 'antd'

export default function SidebarFooter() {
  return (
    <div className="sidenav-footer">
      <a target="_blank" href="/" rel="noopener noreferrer">
        <Icon type="question-circle" />
        <span className="nav-text">
          <span>Help</span> & <span>Support</span>
        </span>
      </a>
    </div>
  )
}
