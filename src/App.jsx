import React, { useState, useEffect } from 'react'
import BatteryDetail from './components/BatteryDetail'
import BatteryPerformance from './components/BatteryPerformance'
import BatteryActivityOverlayed from './components/BatteryActivityOverlayed'
import ChartSelectionModal from './components/ChartSelectionModal'
import './App.css'

function App() {
  const [currentScreen, setCurrentScreen] = useState('detail')
  const [showModal, setShowModal] = useState(false)

  // Scroll to top when navigating to detail pages
  useEffect(() => {
    if (currentScreen === 'performance-separated' || currentScreen === 'performance-overlayed') {
      window.scrollTo(0, 0)
      // Also scroll the document element for better compatibility
      document.documentElement.scrollTop = 0
      document.body.scrollTop = 0
    }
  }, [currentScreen])

  const handlePerformanceClick = () => {
    setShowModal(true)
  }

  const handleBack = () => {
    setCurrentScreen('detail')
    // Also scroll to top when going back
    window.scrollTo(0, 0)
    document.documentElement.scrollTop = 0
    document.body.scrollTop = 0
  }

  const handleSelectSeparated = () => {
    setShowModal(false)
    setCurrentScreen('performance-separated')
  }

  const handleSelectOverlayed = () => {
    setShowModal(false)
    setCurrentScreen('performance-overlayed')
  }

  return (
    <div className="app">
      {currentScreen === 'detail' && (
        <BatteryDetail onPerformanceClick={handlePerformanceClick} />
      )}
      {currentScreen === 'performance-separated' && (
        <BatteryPerformance onBack={handleBack} />
      )}
      {currentScreen === 'performance-overlayed' && (
        <BatteryActivityOverlayed onBack={handleBack} />
      )}
      <ChartSelectionModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onSelectSeparated={handleSelectSeparated}
        onSelectOverlayed={handleSelectOverlayed}
      />
    </div>
  )
}

export default App
