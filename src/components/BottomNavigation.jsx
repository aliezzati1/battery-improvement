import React from 'react'
import './BottomNavigation.css'

function BottomNavigation() {
  return (
    <div className="bottom-navigation">
      <div className="nav-item">
        <svg className="nav-icon" width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M3 9L12 2L21 9V20C21 20.5304 20.7893 21.0391 20.4142 21.4142C20.0391 21.7893 19.5304 22 19 22H5C4.46957 22 3.96086 21.7893 3.58579 21.4142C3.21071 21.0391 3 20.5304 3 20V9Z" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M9 22V12H15V22" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        <span className="nav-label">Hem</span>
      </div>
      <div className="nav-item">
        <svg className="nav-icon" width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M3 3V21H21" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M7 16L12 11L16 15L21 10" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M21 10H16V15" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        <span className="nav-label">Insikter</span>
      </div>
      <div className="nav-item active">
        <svg className="nav-icon" width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M13 2L3 14H12L11 22L21 10H12L13 2Z" fill="black"/>
        </svg>
        <span className="nav-label">Enheter</span>
      </div>
      <div className="nav-item">
        <svg className="nav-icon" width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M20 21V19C20 17.9391 19.5786 16.9217 18.8284 16.1716C18.0783 15.4214 17.0609 15 16 15H8C6.93913 15 5.92172 15.4214 5.17157 16.1716C4.42143 16.9217 4 17.9391 4 19V21" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <circle cx="12" cy="7" r="4" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        <span className="nav-label">Profil</span>
      </div>
    </div>
  )
}

export default BottomNavigation
