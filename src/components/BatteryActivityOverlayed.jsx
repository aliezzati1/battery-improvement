import React, { useState, useMemo } from 'react'
import StatusBar from './StatusBar'
import { generateMockDataForDay } from '../utils/mockData'
import ActivityChart from './charts/overlayed/ActivityChart'
import RevenueChart from './charts/overlayed/RevenueChart'
import './BatteryActivityOverlayed.css'

function BatteryActivityOverlayed({ onBack }) {
  const [selectedDay, setSelectedDay] = useState(0)
  const [activeTab, setActiveTab] = useState('activity') // 'activity' or 'revenue'
  const [cursorTime, setCursorTime] = useState(null)

  // Generate last 30 days
  const days = Array.from({ length: 30 }, (_, i) => {
    const date = new Date()
    date.setDate(date.getDate() - (29 - i))
    return {
      day: date.getDate(),
      month: date.toLocaleString('default', { month: 'short' }),
      fullDate: date,
    }
  })

  // Get data for selected day
  const dayData = generateMockDataForDay(selectedDay)

  // Calculate summary metrics based on cursorTime or find hour with activity
  const currentTimeIndex = useMemo(() => {
    if (cursorTime !== null) return cursorTime
    
    // Find hours with charging and discharging activity
    let maxChargingHour = -1
    let maxChargingValue = 0
    let maxDischargingHour = -1
    let maxDischargingValue = 0
    
    dayData.forEach((d, index) => {
      const activity = d.batteryActivity
      if (activity > 0 && activity > maxChargingValue) {
        maxChargingValue = activity
        maxChargingHour = index
      } else if (activity < 0 && Math.abs(activity) > maxDischargingValue) {
        maxDischargingValue = Math.abs(activity)
        maxDischargingHour = index
      }
    })
    
    // Prioritize showing charging activity if it exists (since charging bars are often more visible)
    // This ensures "Charged" shows a value when green bars are visible
    if (maxChargingHour >= 0) {
      return maxChargingHour
    }
    // Fall back to discharging if no charging exists
    if (maxDischargingHour >= 0) {
      return maxDischargingHour
    }
    // Default to hour 0 if no activity
    return 0
  }, [cursorTime, dayData])
  
  // Get data for the selected time window - ensure consistency
  const currentData = dayData[currentTimeIndex] || dayData[0]
  
  // Calculate charged/discharged values directly from chart data for the selected hour
  // This ensures summary metrics always match what's visible in the chart
  const chargedValue = useMemo(() => {
    const activity = currentData.batteryActivity
    // Charged = positive battery activity, or 0 if negative/zero
    return activity > 0 ? activity : 0
  }, [currentData])
  
  const dischargedValue = useMemo(() => {
    const activity = currentData.batteryActivity
    // Discharged = absolute value of negative battery activity, or 0 if positive/zero
    return activity < 0 ? Math.abs(activity) : 0
  }, [currentData])

  // Format time range (e.g., "09:00-09:30")
  const formatTimeRange = (hour) => {
    const start = String(hour).padStart(2, '0') + ':00'
    const end = String(hour).padStart(2, '0') + ':30'
    return `${start}-${end}`
  }

  const handleDaySelect = (index) => {
    setSelectedDay(index)
    setCursorTime(null) // Reset cursor when changing day
  }

  const handleCursorUpdate = (time) => {
    setCursorTime(time)
  }

  return (
    <div className="battery-activity-overlayed">
      <div className="battery-activity-header">
        <div className="status-nav-container">
          <StatusBar />
          <div className="nav-bar-custom">
            <div className="nav-left" onClick={onBack}>
              <svg className="arrow-left-icon" width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M15 18L9 12L15 6" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <div className="nav-center">
              <span className="nav-title">Battery activity</span>
            </div>
            <div className="nav-right">
              <svg className="question-icon" width="24" height="24" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="10" stroke="black" strokeWidth="2"/>
                <path d="M9 9C9 7.34315 10.3431 6 12 6C13.6569 6 15 7.34315 15 9C15 10.6569 13.6569 12 12 12V14" stroke="black" strokeWidth="2" strokeLinecap="round"/>
                <path d="M12 18H12.01" stroke="black" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </div>
          </div>
        </div>
      </div>

      <div className="battery-activity-content">
        <div className="time-scope">
          <p className="time-scope-text">Last 30 days ({days[0].month}-{days[29].month})</p>
        </div>

        <div className="day-selector">
          {days.map((day, index) => (
            <button
              key={index}
              className={`day-button ${selectedDay === index ? 'active' : ''}`}
              onClick={() => handleDaySelect(index)}
            >
              {day.day}
            </button>
          ))}
        </div>

        {/* Summary Metrics */}
        <div className="summary-metrics">
          {activeTab === 'activity' ? (
            <>
              <div className="metric-large">
                <div className="metric-value-large">
                  <span className="value">{currentData.spotPrice.toFixed(1).replace('.', ',')}</span>
                  <span className="unit"> öre/kWh</span>
                </div>
                <p className="metric-label">{formatTimeRange(currentTimeIndex)}</p>
              </div>
              <div className="metrics-row">
                <div className="metric-small">
                  <div className="metric-indicator charged"></div>
                  <div className="metric-content">
                    <span className="metric-value">{chargedValue > 0 ? chargedValue.toFixed(1).replace('.', ',') : '0'}</span>
                    <span className="metric-unit"> kWh</span>
                    <p className="metric-label-small">Charged</p>
                  </div>
                </div>
                <div className="metric-small">
                  <div className="metric-indicator discharged"></div>
                  <div className="metric-content">
                    <span className="metric-value">{dischargedValue > 0 ? dischargedValue.toFixed(1).replace('.', ',') : '0'}</span>
                    <span className="metric-unit"> kWh</span>
                    <p className="metric-label-small">Discharged</p>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="metric-large">
                <div className="metric-value-large">
                  <span className="value">{currentData.soc}</span>
                  <span className="unit"> %</span>
                </div>
                <p className="metric-label">{formatTimeRange(currentTimeIndex)}</p>
              </div>
              <div className="metrics-row">
              <div className="metric-small">
                <div className="metric-indicator earned"></div>
                <div className="metric-content">
                  <span className="metric-value">{currentData.revenue > 0 ? currentData.revenue.toFixed(0) : '0'}</span>
                  <span className="metric-unit"> kr</span>
                  <p className="metric-label-small">Earned</p>
                </div>
              </div>
              </div>
            </>
          )}
        </div>

        {/* Chart Area */}
        <div className="chart-area">
          {activeTab === 'activity' ? (
            <ActivityChart 
              data={dayData} 
              cursorTime={cursorTime}
              onCursorUpdate={handleCursorUpdate}
            />
          ) : (
            <RevenueChart 
              data={dayData} 
              cursorTime={cursorTime}
              onCursorUpdate={handleCursorUpdate}
            />
          )}
        </div>

        {/* Tab Control */}
        <div className="tab-control">
          <button
            className={`tab-button ${activeTab === 'activity' ? 'active' : ''}`}
            onClick={() => setActiveTab('activity')}
          >
            Activity
          </button>
          <button
            className={`tab-button ${activeTab === 'revenue' ? 'active' : ''}`}
            onClick={() => setActiveTab('revenue')}
          >
            Revenue
          </button>
        </div>
      </div>
    </div>
  )
}

export default BatteryActivityOverlayed
