import React from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Cell } from 'recharts'
import './Chart.css'

function RevenueChart({ data }) {
  return (
    <div className="chart-container">
      <ResponsiveContainer width="100%" height={200}>
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
            domain={[0, 30]}
            tick={{ fill: '#353230', fontSize: 12, fontFamily: 'Inter', letterSpacing: '-0.06px' }}
            tickFormatter={(value) => {
              if (value === 0 || value === 15 || value === 30) return String(value)
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
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

export default RevenueChart
