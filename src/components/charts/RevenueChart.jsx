import React, { useMemo } from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Cell, ReferenceLine } from 'recharts'
import './Chart.css'

function RevenueChart({ data, cursorTime, onCursorStart, onCursorMove, onCursorEnd }) {
  // Calculate dynamic max value from data
  const maxRevenue = useMemo(() => {
    const max = Math.max(...data.map(d => d.revenue))
    if (max === 0) return 10 // Default if no revenue
    // Round up to nearest nice number (5, 10, 20, 30, 50, etc.)
    const magnitude = Math.pow(10, Math.floor(Math.log10(max)))
    const normalized = max / magnitude
    let niceMax
    if (normalized <= 1) niceMax = magnitude
    else if (normalized <= 2) niceMax = 2 * magnitude
    else if (normalized <= 5) niceMax = 5 * magnitude
    else niceMax = 10 * magnitude
    return Math.max(10, niceMax) // Minimum of 10
  }, [data])

  // Calculate tick values for evenly distributed gridlines
  const tickValues = useMemo(() => {
    const ticks = [0]
    if (maxRevenue > 0) {
      const step = maxRevenue / 2
      ticks.push(step, maxRevenue)
    }
    return ticks
  }, [maxRevenue])

  return (
    <div 
      className="chart-container"
      onMouseDown={onCursorStart}
      onMouseMove={onCursorMove}
      onMouseUp={onCursorEnd}
      onMouseLeave={onCursorEnd}
      onTouchStart={onCursorStart}
      onTouchMove={onCursorMove}
      onTouchEnd={onCursorEnd}
      style={{ touchAction: 'none', userSelect: 'none', WebkitUserSelect: 'none' }}
    >
      <ResponsiveContainer width="100%" height={160}>
        <BarChart
          data={data}
          margin={{ top: 10, right: 30, left: 0, bottom: 20 }}
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
            yAxisId="revenue"
            orientation="right"
            domain={[0, maxRevenue]}
            tick={{ fill: '#353230', fontSize: 12, fontFamily: 'Inter', letterSpacing: '-0.06px' }}
            tickFormatter={(value) => {
              if (tickValues.includes(value)) return String(Math.round(value))
              return ''
            }}
            axisLine={false}
            tickLine={false}
            width={24}
          />
          <Bar
            yAxisId="revenue"
            dataKey="revenue"
            radius={[1, 1, 0, 0]}
            isAnimationActive={false}
            barSize={7}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.revenue > 0 ? '#009a33' : 'transparent'} />
            ))}
          </Bar>
          {cursorTime !== null && (
            <ReferenceLine
              x={String(cursorTime).padStart(2, '0')}
              stroke="#000000"
              strokeWidth={1}
              isFront={true}
            />
          )}
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

export default RevenueChart
