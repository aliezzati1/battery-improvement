import React, { useState, useCallback, useRef, useEffect } from 'react'
import StatusBar from './StatusBar'
import NavigationBar from './NavigationBar'
import SpotPriceChart from './charts/SpotPriceChart'
import BatterySOCChart from './charts/BatterySOCChart'
import RevenueChart from './charts/RevenueChart'
import BatteryActivityChart from './charts/BatteryActivityChart'
import { generateMockDataForDay } from '../utils/mockData'
import './BatteryPerformance.css'

function BatteryPerformance({ onBack }) {
  const [selectedDay, setSelectedDay] = useState(0) // 0 = today, 1 = yesterday, etc.
  const [chartOrder, setChartOrder] = useState([
    { id: 'spot-price', component: SpotPriceChart, title: 'Avg. spot price', subtitle: '(öre/kWh)' },
    { id: 'battery-soc', component: BatterySOCChart, title: 'Battery SOC', subtitle: '(%)' },
    { id: 'revenue', component: RevenueChart, title: 'Revenue times', subtitle: '(kr)' },
    { id: 'battery-activity', component: BatteryActivityChart, title: 'Battery activity', subtitle: '(kWh)' },
  ])
  const [draggedIndex, setDraggedIndex] = useState(null)
  const [cursorTime, setCursorTime] = useState(null) // Time string e.g. "14" for the vertical line
  const chartsContainerRef = useRef(null)

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

  const handleDaySelect = (index) => {
    setSelectedDay(index)
  }

  const handleDragStart = (e, index) => {
    try {
      if (e.dataTransfer) {
        e.dataTransfer.effectAllowed = 'move'
      }
      setDraggedIndex(index)
    } catch (error) {
      console.error('Error in handleDragStart:', error)
    }
  }

  const handleDragOver = (e, index) => {
    try {
      e.preventDefault()
      if (e.dataTransfer) {
        e.dataTransfer.dropEffect = 'move'
      }
      if (draggedIndex === null || draggedIndex === index) return

      const newOrder = [...chartOrder]
      const draggedItem = newOrder[draggedIndex]
      newOrder.splice(draggedIndex, 1)
      newOrder.splice(index, 0, draggedItem)
      setChartOrder(newOrder)
      setDraggedIndex(index)
    } catch (error) {
      console.error('Error in handleDragOver:', error)
    }
  }

  const handleDragEnd = () => {
    setDraggedIndex(null)
  }

  // Synchronized cursor/scrubbing across all charts
  const handleChartMouseMove = useCallback((e) => {
    if (e && e.activeLabel !== undefined && e.activeLabel !== null) {
      setCursorTime(e.activeLabel)
    }
  }, [])

  const handleChartMouseLeave = useCallback(() => {
    setCursorTime(null)
  }, [])

  // Touch scrubbing support for mobile
  useEffect(() => {
    const el = chartsContainerRef.current
    if (!el) return

    let startPos = null
    let decided = false
    let scrubbing = false

    const getTimeFromX = (clientX) => {
      const wrapper = el.querySelector('.recharts-wrapper')
      if (!wrapper) return null
      const rect = wrapper.getBoundingClientRect()
      const plotLeft = rect.left
      const plotRight = rect.right - 30 // right margin
      const plotWidth = plotRight - plotLeft
      const relX = clientX - plotLeft
      const fraction = Math.max(0, Math.min(1, relX / plotWidth))
      const hour = Math.round(fraction * 23)
      return String(hour).padStart(2, '0')
    }

    const onTouchStart = (e) => {
      if (e.touches.length !== 1) return
      startPos = { x: e.touches[0].clientX, y: e.touches[0].clientY }
      decided = false
      scrubbing = false
    }

    const onTouchMove = (e) => {
      const touch = e.touches[0]
      if (!touch || !startPos) return

      if (!decided) {
        const dx = Math.abs(touch.clientX - startPos.x)
        const dy = Math.abs(touch.clientY - startPos.y)
        if (dx + dy > 10) {
          decided = true
          scrubbing = dx > dy // horizontal = scrub, vertical = scroll
        }
        if (!decided) return
      }

      if (scrubbing) {
        e.preventDefault()
        const time = getTimeFromX(touch.clientX)
        if (time !== null) setCursorTime(time)
      }
    }

    const onTouchEnd = () => {
      if (scrubbing) setCursorTime(null)
      scrubbing = false
      decided = false
      startPos = null
    }

    el.addEventListener('touchstart', onTouchStart, { passive: true })
    el.addEventListener('touchmove', onTouchMove, { passive: false })
    el.addEventListener('touchend', onTouchEnd, { passive: true })

    return () => {
      el.removeEventListener('touchstart', onTouchStart)
      el.removeEventListener('touchmove', onTouchMove)
      el.removeEventListener('touchend', onTouchEnd)
    }
  }, [])

  return (
    <div className="battery-performance">
      <div className="battery-performance-header">
        <div className="status-nav-container">
          <StatusBar />
          <div className="nav-bar-custom">
            <div className="nav-left" onClick={onBack}>
              <svg className="arrow-left-icon" width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M15 18L9 12L15 6" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <div className="nav-center">
              <span className="nav-title">Battery performance</span>
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

      <div className="battery-performance-content">
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

        <div 
          className="charts-container"
          ref={chartsContainerRef}
          onMouseLeave={handleChartMouseLeave}
        >
          {chartOrder.map((chart, index) => {
            const ChartComponent = chart.component
            return (
              <div
                key={chart.id}
                className={`chart-wrapper ${draggedIndex === index ? 'dragging' : ''}`}
                draggable={typeof window !== 'undefined' && 'ontouchstart' in window ? false : true}
                onDragStart={(e) => handleDragStart(e, index)}
                onDragOver={(e) => handleDragOver(e, index)}
                onDragEnd={handleDragEnd}
              >
                <div className="chart-header">
                  <div className="chart-title-section">
                    <h3 className="chart-title">{chart.title}</h3>
                    <span className="chart-subtitle">{chart.subtitle}</span>
                  </div>
                  <div 
                    className="drag-handle" 
                    draggable
                    onDragStart={(e) => {
                      e.stopPropagation()
                      handleDragStart(e, index)
                    }}
                  >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                      <path d="M9 5H11V7H9V5Z" fill="black"/>
                      <path d="M9 9H11V11H9V9Z" fill="black"/>
                      <path d="M9 13H11V15H9V13Z" fill="black"/>
                      <path d="M13 5H15V7H13V5Z" fill="black"/>
                      <path d="M13 9H15V11H13V9Z" fill="black"/>
                      <path d="M13 13H15V15H13V13Z" fill="black"/>
                    </svg>
                  </div>
                </div>
                <ChartComponent 
                  data={dayData} 
                  cursorTime={cursorTime}
                  onChartMouseMove={handleChartMouseMove}
                  onChartMouseLeave={handleChartMouseLeave}
                />
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default BatteryPerformance
