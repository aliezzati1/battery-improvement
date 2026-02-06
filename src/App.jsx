import React, { useState } from 'react'
import BatteryDetail from './components/BatteryDetail'
import BatteryPerformance from './components/BatteryPerformance'
import './App.css'

function App() {
  const [currentScreen, setCurrentScreen] = useState('detail')

  const handlePerformanceClick = () => {
    setCurrentScreen('performance')
  }

  const handleBack = () => {
    setCurrentScreen('detail')
  }

  return (
    <div className="app">
      {currentScreen === 'detail' ? (
        <BatteryDetail onPerformanceClick={handlePerformanceClick} />
      ) : (
        <BatteryPerformance onBack={handleBack} />
      )}
    </div>
  )
}

export default App
