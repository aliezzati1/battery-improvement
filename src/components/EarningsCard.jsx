import React from 'react'
import './EarningsCard.css'

function EarningsCard() {
  return (
    <div className="earnings-card">
      <div className="earnings-header">
        <div className="earnings-title">
          <span className="title-main">Earnings & Savings</span>
          <span className="title-month"> May 2025</span>
        </div>
        <svg className="chevron-icon" width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M9 18L15 12L9 6" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>
      <div className="earnings-content">
        <div className="earnings-chart">
          <svg className="chart-svg" width="81" height="81" viewBox="0 0 81 81">
            <circle cx="40.5" cy="40.5" r="38" fill="none" stroke="#009a33" strokeWidth="6" strokeDasharray="220 30" strokeDashoffset="0" transform="rotate(-90 40.5 40.5)"/>
            <circle cx="40.5" cy="40.5" r="38" fill="none" stroke="#ffd700" strokeWidth="6" strokeDasharray="30 220" strokeDashoffset="-220" transform="rotate(-90 40.5 40.5)"/>
            <text x="40.5" y="40" textAnchor="middle" className="chart-value">1 478</text>
            <text x="40.5" y="55" textAnchor="middle" className="chart-currency">kr</text>
          </svg>
        </div>
        <div className="earnings-legend">
          <div className="legend-item">
            <div className="legend-dot earnings-dot"></div>
            <span className="legend-label">Earnings</span>
            <div className="legend-value">
              <span className="value-number">1 025</span>
              <span className="value-currency"> SEK</span>
            </div>
          </div>
          <div className="legend-item">
            <div className="legend-dot savings-dot"></div>
            <span className="legend-label">Savings</span>
            <div className="legend-value">
              <span className="value-number">453</span>
              <span className="value-currency"> SEK</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EarningsCard
