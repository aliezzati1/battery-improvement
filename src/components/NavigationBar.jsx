import React from 'react'
import './NavigationBar.css'

function NavigationBar() {
  return (
    <div className="navigation-bar">
      <div className="nav-left">
        <svg className="arrow-left-icon" width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M15 18L9 12L15 6" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>
      <div className="nav-center">
        <span className="nav-title">Pixii Home</span>
      </div>
      <div className="nav-right">
        <svg className="notification-icon" width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M18 8A6 6 0 0 0 6 8C6 11.09 4.5 13.5 3 16H21C19.5 13.5 18 11.09 18 8Z" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M13.73 21C13.5542 21.3031 13.3019 21.5547 12.9982 21.7295C12.6946 21.9044 12.3504 21.9965 12 21.9965C11.6496 21.9965 11.3054 21.9044 11.0018 21.7295C10.6982 21.5547 10.4458 21.3031 10.27 21" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>
    </div>
  )
}

export default NavigationBar
