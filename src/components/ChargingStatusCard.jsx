import React from 'react'
import './ChargingStatusCard.css'

function ChargingStatusCard() {
  return (
    <div className="charging-status-card">
      <div className="charging-status-content">
        <div className="charging-status-text">
          <h3 className="charging-status-title">Your battery is charging</h3>
          <div className="charging-status-time">
            <svg className="clock-icon" width="24" height="24" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="10" stroke="#353230" strokeWidth="2"/>
              <path d="M12 6V12L16 14" stroke="#353230" strokeWidth="2" strokeLinecap="round"/>
            </svg>
            <span className="time-text">Next activity starts at</span>
            <span className="time-value">20.00</span>
          </div>
        </div>
        <div className="charging-status-icon">
          <div className="charge-icon-circle">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M13 2L3 14H12L11 22L21 10H12L13 2Z" fill="black"/>
            </svg>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ChargingStatusCard
