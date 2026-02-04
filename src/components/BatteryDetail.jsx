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

function BatteryDetail() {
  const handlePerformanceClick = () => {
    // Placeholder for navigation to performance detail screen
    console.log('Navigate to performance detail screen')
    // You can implement routing here later
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
