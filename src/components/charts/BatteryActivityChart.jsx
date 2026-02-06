import React from 'react'
import { ComposedChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Cell, ReferenceLine } from 'recharts'
import './Chart.css'

function BatteryActivityChart({ data }) {
  // Transform data: positive values for charging, negative for discharging
  // But we need to display them on a 0-240 scale where 0 is in the middle (120)
  const transformedData = data.map(d => ({
    ...d,
    // Map to 0-240 scale where 120 is zero
    // Positive values: 120 to 240, Negative values: 0 to 120
    displayValue: d.batteryActivity >= 0 
      ? 120 + (d.batteryActivity * 30) // Scale positive values
      : 120 + (d.batteryActivity * 30), // Scale negative values (will be < 120)
    baseValue: 120, // Zero line at middle
    isPositive: d.batteryActivity >= 0,
    absValue: Math.abs(d.batteryActivity),
  }))

  return (
    <div className="chart-container">
      <ResponsiveContainer width="100%" height={200}>
        <ComposedChart
          data={transformedData}
          margin={{ top: 10, right: 30, left: 0, bottom: 50 }}
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
            yAxisId="activity"
            orientation="right"
            domain={[0, 240]}
            tick={{ fill: '#353230', fontSize: 12, fontFamily: 'Inter', letterSpacing: '-0.06px' }}
            tickFormatter={(value) => {
              if (value === 0 || value === 120 || value === 240) {
                // Map back: 0 -> -4, 120 -> 0, 240 -> +4
                if (value === 120) return '0'
                if (value === 0) return '-4'
                if (value === 240) return '4'
              }
              return ''
            }}
            axisLine={false}
            tickLine={false}
            width={24}
          />
          <ReferenceLine 
            yAxisId="activity" 
            y={120} 
            stroke="#353230" 
            strokeWidth={1} 
          />
          <Bar
            yAxisId="activity"
            dataKey="displayValue"
            baseValue={120}
            radius={[1, 1, 0, 0]}
            isAnimationActive={false}
            barSize={7}
          >
            {transformedData.map((entry, index) => {
              const fill = entry.isPositive ? '#009a33' : '#cdc8c2'
              return (
                <Cell key={`cell-${index}`} fill={fill} />
              )
            })}
          </Bar>
        </ComposedChart>
      </ResponsiveContainer>
      <div className="chart-legend">
        <div className="legend-item">
          <div className="legend-dot charged"></div>
          <span>Charge</span>
        </div>
        <div className="legend-item">
          <div className="legend-dot discharged"></div>
          <span>Discharge</span>
        </div>
      </div>
    </div>
  )
}

export default BatteryActivityChart
