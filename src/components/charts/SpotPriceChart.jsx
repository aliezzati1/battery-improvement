import React from 'react'
import { ComposedChart, Line, Area, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts'
import './Chart.css'

function SpotPriceChart({ data }) {
  return (
    <div className="chart-container">
      <ResponsiveContainer width="100%" height={200}>
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
            domain={[0, 200]}
            tick={{ fill: '#353230', fontSize: 12, fontFamily: 'Inter', letterSpacing: '-0.06px' }}
            tickFormatter={(value) => {
              if (value === 0 || value === 100 || value === 200) return String(value)
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
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  )
}

export default SpotPriceChart
