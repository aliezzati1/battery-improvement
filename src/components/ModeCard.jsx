import React from 'react'
import './ModeCard.css'

function ModeCard() {
  return (
    <div className="mode-card">
      <div className="mode-content">
        <div className="mode-text">
          <p className="mode-label">Mode</p>
          <p className="mode-value">Greenely mode</p>
        </div>
        <svg className="chevron-icon" width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M9 18L15 12L9 6" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>
    </div>
  )
}

export default ModeCard
