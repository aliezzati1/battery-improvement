import React, { useMemo, useRef } from 'react'
import { ComposedChart, Line, Area, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, ReferenceLine, Cell } from 'recharts'
import '../Chart.css'

function ActivityChart({ data, cursorTime, onCursorUpdate }) {
  const chartRef = useRef(null)

  // Calculate dynamic max values
  const maxPrice = useMemo(() => {
    const max = Math.max(...data.map(d => d.spotPrice))
    if (max === 0) return 200
    const magnitude = Math.pow(10, Math.floor(Math.log10(max)))
    const normalized = max / magnitude
    let niceMax
    if (normalized <= 1) niceMax = magnitude
    else if (normalized <= 2) niceMax = 2 * magnitude
    else if (normalized <= 5) niceMax = 5 * magnitude
    else niceMax = 10 * magnitude
    return Math.max(50, niceMax)
  }, [data])

  const maxActivity = useMemo(() => {
    const max = Math.max(...data.map(d => Math.abs(d.batteryActivity)))
    return Math.max(4, Math.ceil(max))
  }, [data])

  const handleChartInteraction = (e) => {
    if (!chartRef.current || !onCursorUpdate) return
    
    try {
      if (e && e.stopPropagation) {
        e.stopPropagation()
      }
      const chartContainer = chartRef.current
      if (!chartContainer) return
      
      const rect = chartContainer.getBoundingClientRect()
      if (!rect) return
      
      const clientX = (e && e.touches && e.touches.length > 0) ? e.touches[0].clientX : (e && e.clientX ? e.clientX : 0)
      if (!clientX) return
      
      const x = clientX - rect.left
      const chartWidth = rect.width - 60 // Account for margins
      
      if (x < 30 || x > chartWidth + 30) {
        if (onCursorUpdate) onCursorUpdate(null)
        return
      }
      
      const relativeX = x - 30
      const hour = (relativeX / chartWidth) * 24
      const clampedHour = Math.max(0, Math.min(23, Math.floor(hour)))
      
      if (onCursorUpdate) onCursorUpdate(clampedHour)
    } catch (error) {
      console.error('Error in handleChartInteraction:', error)
    }
  }

  return (
    <div 
      className="chart-container-overlayed"
      ref={chartRef}
      onMouseMove={(e) => {
        if (e) {
          e.stopPropagation()
          handleChartInteraction(e)
        }
      }}
      onMouseLeave={() => {
        try {
          if (onCursorUpdate) onCursorUpdate(null)
        } catch (error) {
          console.error('Error in onMouseLeave:', error)
        }
      }}
    >
      <ResponsiveContainer width="100%" height={300}>
        <ComposedChart
          data={data}
          margin={{ top: 20, right: 30, left: 20, bottom: 40 }}
        >
          <defs>
            <linearGradient id="activityPriceGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#009a33" stopOpacity={0.2} />
              <stop offset="50%" stopColor="#ffd700" stopOpacity={0.2} />
              <stop offset="100%" stopColor="#ff5722" stopOpacity={0.2} />
            </linearGradient>
          </defs>
          <CartesianGrid 
            strokeDasharray="0" 
            stroke="#f2efec" 
            vertical={false}
          />
          <XAxis
            dataKey="time"
            tick={{ fill: '#353230', fontSize: 12, fontFamily: 'Inter', letterSpacing: '-0.06px' }}
            tickFormatter={(value) => {
              const hour = parseInt(value)
              if (hour === 2 || hour === 6 || hour === 10 || hour === 14 || hour === 18 || hour === 22) {
                return String(hour).padStart(2, '0')
              }
              return ''
            }}
            axisLine={false}
            tickLine={false}
            interval={0}
          />
          <YAxis
            yAxisId="price"
            orientation="left"
            domain={[0, maxPrice]}
            tick={{ fill: '#353230', fontSize: 12, fontFamily: 'Inter', letterSpacing: '-0.06px' }}
            tickFormatter={(value) => {
              if (value === 0 || value === maxPrice) return String(value)
              return ''
            }}
            axisLine={false}
            tickLine={false}
            width={26}
            label={{ 
              value: 'öre/kWh', 
              angle: -90, 
              position: 'insideLeft', 
              offset: -5,
              style: { 
                textAnchor: 'middle', 
                fill: '#353230', 
                fontSize: 12, 
                fontFamily: 'Inter',
                letterSpacing: '-0.06px'
              } 
            }}
          />
          <YAxis
            yAxisId="activity"
            orientation="right"
            domain={[-maxActivity, maxActivity]}
            tick={{ fill: '#353230', fontSize: 12, fontFamily: 'Inter', letterSpacing: '-0.06px' }}
            tickFormatter={(value) => {
              if (value === 0) return '0'
              if (value === maxActivity) return String(maxActivity)
              if (value === -maxActivity) return String(-maxActivity)
              return ''
            }}
            axisLine={false}
            tickLine={false}
            width={22}
            label={{ 
              value: 'kWh', 
              angle: 90, 
              position: 'insideRight', 
              offset: -5,
              style: { 
                textAnchor: 'middle', 
                fill: '#353230', 
                fontSize: 12, 
                fontFamily: 'Inter',
                letterSpacing: '-0.06px'
              } 
            }}
          />
          <ReferenceLine 
            yAxisId="activity" 
            y={0} 
            stroke="#353230" 
            strokeWidth={1} 
          />
          <Area
            yAxisId="price"
            type="stepAfter"
            dataKey="spotPrice"
            fill="url(#activityPriceGradient)"
            stroke="none"
            isAnimationActive={false}
            baseLine={0}
          />
          <Line
            yAxisId="price"
            type="stepAfter"
            dataKey="spotPrice"
            stroke="#ff9800"
            strokeWidth={2}
            dot={false}
            isAnimationActive={false}
          />
          <Bar
            yAxisId="activity"
            dataKey="batteryActivity"
            baseValue={0}
            radius={[1, 1, 1, 1]}
            isAnimationActive={false}
            barSize={7}
          >
            {data.map((entry, index) => {
              const fill = entry.batteryActivity >= 0 ? '#009a33' : '#cdc8c2'
              return (
                <Cell key={`cell-${index}`} fill={fill} />
              )
            })}
          </Bar>
          {cursorTime !== null && (
            <ReferenceLine
              x={String(cursorTime).padStart(2, '0')}
              stroke="#000000"
              strokeWidth={2}
              isFront={true}
              strokeDasharray="0"
            />
          )}
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  )
}

export default ActivityChart
