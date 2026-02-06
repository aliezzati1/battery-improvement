import React, { useState } from 'react'
import BatteryDetail from './components/BatteryDetail'
import BatteryPerformance from './components/BatteryPerformance'
import BatteryActivityOverlayed from './components/BatteryActivityOverlayed'
import ChartSelectionModal from './components/ChartSelectionModal'
import './App.css'

function App() {
  const [currentScreen, setCurrentScreen] = useState('detail')
  const [showModal, setShowModal] = useState(false)

  const handlePerformanceClick = () => {
    setShowModal(true)
  }

  const handleBack = () => {
    setCurrentScreen('detail')
  }

  const handleSelectSeparated = () => {
    setCurrentScreen('performance-separated')
  }

  const handleSelectOverlayed = () => {
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
