import React, { useMemo, useRef } from 'react'
import { ComposedChart, Line, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, ReferenceLine, Cell } from 'recharts'
import '../Chart.css'

function RevenueChart({ data, cursorTime, onCursorUpdate }) {
  const chartRef = useRef(null)

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
      const chartWidth = rect.width - 60
      
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
            yAxisId="soc"
            orientation="right"
            domain={[0, 100]}
            tick={{ fill: '#353230', fontSize: 12, fontFamily: 'Inter', letterSpacing: '-0.06px' }}
            tickFormatter={(value) => {
              if (value === 0 || value === 50 || value === 100) return String(value)
              return ''
            }}
            axisLine={false}
            tickLine={false}
            width={26}
            label={{ 
              value: '%', 
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
          <Line
            yAxisId="soc"
            type="stepAfter"
            dataKey="soc"
            stroke="#353230"
            strokeWidth={2}
            dot={false}
            isAnimationActive={false}
          />
          <Bar
            yAxisId="soc"
            dataKey="revenue"
            baseValue={0}
            radius={[1, 1, 0, 0]}
            isAnimationActive={false}
            barSize={2}
          >
            {data.map((entry, index) => (
              <Cell 
                key={`cell-${index}`} 
                fill={entry.revenue > 0 ? '#b2ffbf' : 'transparent'} 
                opacity={entry.revenue > 0 ? 0.6 : 0}
              />
            ))}
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

export default RevenueChart
