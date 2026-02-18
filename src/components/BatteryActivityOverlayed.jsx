import React, { useState, useMemo, useCallback } from 'react'
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

  // Get data for selected day - memoized so it doesn't regenerate on hover
  const dayData = useMemo(() => generateMockDataForDay(selectedDay), [selectedDay])

  // Calculate daily totals and averages
  const dailyMetrics = useMemo(() => {
    // Calculate average spot price for the day
    const avgSpotPrice = dayData.reduce((sum, d) => sum + d.spotPrice, 0) / dayData.length
    
    // Calculate total charged (sum of all positive batteryActivity values)
    const totalCharged = dayData.reduce((sum, d) => {
      return sum + (d.batteryActivity > 0 ? d.batteryActivity : 0)
    }, 0)
    
    // Calculate total discharged (sum of absolute values of all negative batteryActivity values)
    const totalDischarged = dayData.reduce((sum, d) => {
      return sum + (d.batteryActivity < 0 ? Math.abs(d.batteryActivity) : 0)
    }, 0)
    
    return {
      avgSpotPrice,
      totalCharged,
      totalDischarged
    }
  }, [dayData])
  
  // If cursorTime is set, use that hour's data; otherwise use daily averages
  const currentTimeIndex = cursorTime !== null ? cursorTime : null
  const currentData = currentTimeIndex !== null ? dayData[currentTimeIndex] : null

  // Format time range - show daily average or specific hour
  const formatTimeRange = () => {
    if (currentTimeIndex !== null) {
      const start = String(currentTimeIndex).padStart(2, '0') + ':00'
      const end = String(currentTimeIndex).padStart(2, '0') + ':30'
      return `${start}-${end}`
    }
    return '00:00-24:00'
  }
  
  // Use daily totals for charged/discharged, or specific hour if cursor is active
  const chargedValue = useMemo(() => {
    if (currentData !== null) {
      return currentData.batteryActivity > 0 ? currentData.batteryActivity : 0
    }
    return dailyMetrics.totalCharged
  }, [currentData, dailyMetrics])
  
  const dischargedValue = useMemo(() => {
    if (currentData !== null) {
      return currentData.batteryActivity < 0 ? Math.abs(currentData.batteryActivity) : 0
    }
    return dailyMetrics.totalDischarged
  }, [currentData, dailyMetrics])
  
  const spotPriceValue = useMemo(() => {
    if (currentData !== null) {
      return currentData.spotPrice
    }
    return dailyMetrics.avgSpotPrice
  }, [currentData, dailyMetrics])

  const handleDaySelect = (index) => {
    setSelectedDay(index)
    setCursorTime(null) // Reset cursor when changing day
  }

  // Scrubbing handlers
  const handleChartMouseMove = useCallback((e) => {
    if (e && e.activeLabel !== undefined && e.activeLabel !== null) {
      setCursorTime(parseInt(e.activeLabel))
    }
  }, [])

  const handleChartMouseLeave = useCallback(() => {
    setCursorTime(null)
  }, [])

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
                  <span className="value">{spotPriceValue.toFixed(1).replace('.', ',')}</span>
                  <span className="unit"> öre/kWh</span>
                </div>
                <p className="metric-label">{cursorTime !== null ? formatTimeRange() : 'Avg. spot price'}</p>
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
                  <span className="value">{spotPriceValue.toFixed(1).replace('.', ',')}</span>
                  <span className="unit"> öre/kWh</span>
                </div>
                <p className="metric-label">{cursorTime !== null ? formatTimeRange() : 'Avg. spot price'}</p>
              </div>
              <div className="metrics-row">
                <div className="metric-small">
                  <div className="metric-indicator soc-line"></div>
                  <div className="metric-content">
                    <span className="metric-value">
                      {currentData !== null 
                        ? currentData.soc 
                        : Math.round(dayData.reduce((sum, d) => sum + d.soc, 0) / dayData.length)
                      }
                    </span>
                    <span className="metric-unit"> %</span>
                    <p className="metric-label-small">Avg. SOC</p>
                  </div>
                </div>
                <div className="metric-small">
                  <div className="metric-indicator earned"></div>
                  <div className="metric-content">
                    <span className="metric-value">
                      {currentData !== null
                        ? (currentData.revenue > 0 ? currentData.revenue.toFixed(0) : '0')
                        : dayData.reduce((sum, d) => sum + d.revenue, 0).toFixed(0)
                      }
                    </span>
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
              onChartMouseMove={handleChartMouseMove}
              onChartMouseLeave={handleChartMouseLeave}
            />
          ) : (
            <RevenueChart 
              data={dayData} 
              cursorTime={cursorTime}
              onChartMouseMove={handleChartMouseMove}
              onChartMouseLeave={handleChartMouseLeave}
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
