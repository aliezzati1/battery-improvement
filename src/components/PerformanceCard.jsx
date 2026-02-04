import React from 'react'
import './PerformanceCard.css'

function PerformanceCard({ onClick }) {
  return (
    <div className="performance-card" onClick={onClick}>
      <div className="performance-header">
        <div className="performance-title-section">
          <h3 className="performance-title">Yesterday's performance</h3>
          <p className="performance-subtitle">Avg. spot price vs. battery activities</p>
        </div>
        <svg className="chevron-icon" width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M9 18L15 12L9 6" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>
      <div className="performance-chart">
        <div className="chart-container">
          <svg className="chart-svg" width="361" height="223" viewBox="0 0 361 223">
            {/* Grid lines */}
            <line x1="45" y1="42" x2="325" y2="42" stroke="#f2efec" strokeWidth="1"/>
            <line x1="45" y1="80" x2="325" y2="80" stroke="#f2efec" strokeWidth="1"/>
            <line x1="45" y1="118" x2="325" y2="118" stroke="#f2efec" strokeWidth="1"/>
            <line x1="45" y1="156" x2="325" y2="156" stroke="#f2efec" strokeWidth="1"/>
            <line x1="45" y1="194" x2="325" y2="194" stroke="#353230" strokeWidth="1"/>
            
            {/* Y-axis labels (left) */}
            <text x="16" y="50" className="chart-label">200</text>
            <text x="16" y="88" className="chart-label">0</text>
            <text x="16" y="126" className="chart-label">0</text>
            <text x="16" y="164" className="chart-label">-200</text>
            <text x="16" y="202" className="chart-label">-200</text>
            
            {/* Y-axis labels (right) */}
            <text x="325" y="50" className="chart-label-right">4</text>
            <text x="325" y="88" className="chart-label-right">2</text>
            <text x="325" y="126" className="chart-label-right">0</text>
            <text x="325" y="164" className="chart-label-right">-2</text>
            <text x="325" y="202" className="chart-label-right">-4</text>
            
            {/* Axis labels */}
            <text x="16" y="30" className="axis-label">öre/kWh</text>
            <text x="325" y="30" className="axis-label-right">kWh</text>
            
            {/* Charged bars (green, going up) */}
            <rect x="89" y="138" width="7" height="34" fill="#009a33" rx="1"/>
            <rect x="107" y="146" width="7" height="26" fill="#009a33" rx="1"/>
            <rect x="98" y="130" width="7" height="44" fill="#009a33" rx="1"/>
            
            {/* Discharged bars (grey, going down) */}
            <rect x="181" y="194" width="7" height="40" fill="#cdc8c2" rx="1"/>
            <rect x="191" y="194" width="7" height="53" fill="#cdc8c2" rx="1"/>
            <rect x="201" y="194" width="7" height="29" fill="#cdc8c2" rx="1"/>
            <rect x="211" y="194" width="7" height="15" fill="#cdc8c2" rx="1"/>
            
            {/* Price line (stepped line from yellow to orange to red) */}
            <polyline 
              points="45,88 89,88 98,80 107,80 116,72 125,72 134,64 143,64 152,56 161,56 170,48 179,48 188,40 197,40 206,32 215,32 224,24 233,24 242,16 251,16 260,8 269,8 278,0 287,0 296,8 305,8 314,16 325,16" 
              fill="none" 
              stroke="#ff9800" 
              strokeWidth="2"
            />
            
            {/* X-axis labels */}
            <text x="65" y="220" className="chart-label-bottom">02</text>
            <text x="105" y="220" className="chart-label-bottom">06</text>
            <text x="145" y="220" className="chart-label-bottom">10</text>
            <text x="185" y="220" className="chart-label-bottom">14</text>
            <text x="225" y="220" className="chart-label-bottom">18</text>
            <text x="265" y="220" className="chart-label-bottom">22</text>
            
            {/* Legend */}
            <g transform="translate(180, 240)">
              <circle cx="0" cy="0" r="6" fill="#009a33"/>
              <text x="12" y="4" className="legend-text">Charged</text>
              <circle cx="80" cy="0" r="6" fill="#cdc8c2"/>
              <text x="92" y="4" className="legend-text">Discharged</text>
            </g>
          </svg>
        </div>
      </div>
    </div>
  )
}

export default PerformanceCard
