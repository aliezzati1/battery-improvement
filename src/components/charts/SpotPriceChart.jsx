import React, { useMemo } from 'react'
import { ComposedChart, Line, Area, XAxis, YAxis, CartesianGrid, ResponsiveContainer, ReferenceLine } from 'recharts'
import './Chart.css'

function SpotPriceChart({ data, cursorTime, onCursorStart, onCursorMove, onCursorEnd }) {
  // Calculate dynamic max value from data
  const maxPrice = useMemo(() => {
    const max = Math.max(...data.map(d => d.spotPrice))
    if (max === 0) return 200 // Default
    // Round up to nearest nice number
    const magnitude = Math.pow(10, Math.floor(Math.log10(max)))
    const normalized = max / magnitude
    let niceMax
    if (normalized <= 1) niceMax = magnitude
    else if (normalized <= 2) niceMax = 2 * magnitude
    else if (normalized <= 5) niceMax = 5 * magnitude
    else niceMax = 10 * magnitude
    return Math.max(50, niceMax) // Minimum of 50
  }, [data])

  return (
    <div className="chart-container">
      <div
        className="chart-overlay"
        onPointerDown={onCursorStart}
        onPointerMove={onCursorMove}
        onPointerUp={onCursorEnd}
        onPointerLeave={onCursorEnd}
        onPointerCancel={onCursorEnd}
      />
      <ResponsiveContainer width="100%" height={160}>
        <ComposedChart
          data={data}
          margin={{ top: 10, right: 30, left: 0, bottom: 20 }}
        >
          <defs>
            <linearGradient id="spotPriceGradient" x1="0" y1="0" x2="0" y2="1">
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
            orientation="right"
            domain={[0, maxPrice]}
            tick={{ fill: '#353230', fontSize: 12, fontFamily: 'Inter', letterSpacing: '-0.06px' }}
            tickFormatter={(value) => {
              const step = maxPrice / 2
              if (value === 0 || value === step || value === maxPrice) return String(Math.round(value))
              return ''
            }}
            axisLine={false}
            tickLine={false}
            width={24}
          />
          <Area
            yAxisId="price"
            type="stepAfter"
            dataKey="spotPrice"
            fill="url(#spotPriceGradient)"
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

export default SpotPriceChart
