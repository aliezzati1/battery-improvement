import React from 'react'
import StatusBar from './StatusBar'
import NavigationBar from './NavigationBar'
import HouseDiagram from './HouseDiagram'
import ChargingStatusCard from './ChargingStatusCard'
import ModeCard from './ModeCard'
import EarningsCard from './EarningsCard'
import PerformanceCard from './PerformanceCard'
import BottomNavigation from './BottomNavigation'
import './BatteryDetail.css'

function BatteryDetail({ onPerformanceClick }) {
  const handlePerformanceClick = () => {
    if (onPerformanceClick) {
      onPerformanceClick()
    }
  }

  return (
    <div className="battery-detail">
      <div className="battery-detail-header">
        <div className="status-nav-container">
          <StatusBar />
          <NavigationBar />
        </div>
        <div className="house-container">
          <HouseDiagram />
        </div>
      </div>
      
      <div className="battery-detail-content">
        <ChargingStatusCard />
        <ModeCard />
        <EarningsCard />
        <PerformanceCard onClick={handlePerformanceClick} />
      </div>
      
      <BottomNavigation />
    </div>
  )
}

export default BatteryDetail
