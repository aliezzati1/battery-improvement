import React from 'react'
import './StatusBar.css'

function StatusBar() {
  return (
    <div className="status-bar">
      <div className="status-bar-content">
        <div className="status-bar-time">
          <span>12:00</span>
        </div>
        <div className="status-bar-icons">
          <div className="status-icon signal-icon"></div>
          <div className="status-icon wifi-icon"></div>
          <div className="status-icon battery-icon">
            <div className="battery-level"></div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default StatusBar
