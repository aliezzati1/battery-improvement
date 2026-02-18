import React from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, ReferenceLine } from 'recharts'
import './Chart.css'

function BatterySOCChart({ data, cursorTime, onCursorStart, onCursorMove, onCursorEnd }) {
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
        <LineChart
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
            width={24}
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
          {cursorTime !== null && (
            <ReferenceLine
              x={String(cursorTime).padStart(2, '0')}
              stroke="#000000"
              strokeWidth={2}
              isFront={true}
              strokeDasharray="0"
            />
          )}
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}

export default BatterySOCChart
