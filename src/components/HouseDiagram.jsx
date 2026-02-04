import React from 'react'
import './HouseDiagram.css'

function HouseDiagram() {
  return (
    <div className="house-diagram">
      <svg className="house-illustration" viewBox="0 0 393 344" preserveAspectRatio="xMidYMid meet">
        {/* House structure */}
        <rect x="150" y="180" width="100" height="80" fill="#353230" rx="4"/>
        <rect x="220" y="200" width="30" height="30" fill="#ffd700" rx="2"/>
        
        {/* Solar panels */}
        <rect x="160" y="120" width="25" height="12" fill="#1a365d" rx="2"/>
        <rect x="190" y="120" width="25" height="12" fill="#1a365d" rx="2"/>
        <rect x="220" y="120" width="25" height="12" fill="#1a365d" rx="2"/>
        <rect x="160" y="138" width="25" height="12" fill="#1a365d" rx="2"/>
        <rect x="190" y="138" width="25" height="12" fill="#1a365d" rx="2"/>
        <rect x="220" y="138" width="25" height="12" fill="#1a365d" rx="2"/>
        
        {/* Battery units */}
        <rect x="80" y="200" width="35" height="25" fill="#cdc8c2" rx="4"/>
        <rect x="80" y="230" width="35" height="25" fill="#cdc8c2" rx="4"/>
        
        {/* Energy flow lines */}
        {/* Grid to Battery/House */}
        <line x1="50" y1="220" x2="115" y2="220" stroke="#009a33" strokeWidth="3" markerEnd="url(#arrowhead)"/>
        <text x="30" y="210" className="energy-label">GRID</text>
        <text x="30" y="230" className="energy-value">10.2 kW</text>
        
        {/* Battery connection */}
        <line x1="115" y1="220" x2="115" y2="180" stroke="#009a33" strokeWidth="3" markerEnd="url(#arrowhead)"/>
        <text x="125" y="165" className="energy-label">BATTERY</text>
        <text x="125" y="185" className="energy-value">10.2 kW</text>
        <text x="125" y="200" className="energy-percent">45.2 %</text>
        
        {/* Solar to House */}
        <line x1="200" y1="150" x2="200" y2="180" stroke="#009a33" strokeWidth="3" markerEnd="url(#arrowhead)"/>
        <text x="210" y="135" className="energy-label">SOLAR</text>
        <text x="210" y="155" className="energy-value">10.2 kW</text>
        
        {/* Battery to House */}
        <line x1="115" y1="180" x2="200" y2="180" stroke="#009a33" strokeWidth="3" markerEnd="url(#arrowhead)"/>
        
        {/* House to Home */}
        <line x1="250" y1="220" x2="320" y2="220" stroke="#009a33" strokeWidth="3" markerEnd="url(#arrowhead)"/>
        <text x="330" y="215" className="energy-label">HOME</text>
        <text x="330" y="235" className="energy-value">10.2 kW</text>
        
        {/* Arrow marker definition */}
        <defs>
          <marker id="arrowhead" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
            <polygon points="0 0, 10 3, 0 6" fill="#009a33" />
          </marker>
        </defs>
      </svg>
    </div>
  )
}

export default HouseDiagram
