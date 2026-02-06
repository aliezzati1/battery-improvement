import React from 'react'
import { ComposedChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Cell, ReferenceLine } from 'recharts'
import './Chart.css'

function BatteryActivityChart({ data }) {
  // Transform data for display: use absolute scale 0-240 where 120 is zero
  // Positive values (charging) go from 120 to 240
  // Negative values (discharging) go from 120 to 0
  const transformedData = data.map(d => {
    const absValue = Math.abs(d.batteryActivity)
    const scaledValue = absValue * 30 // Scale to fit 0-120 range (4 kWh max = 120)
    
    return {
      ...d,
      // For positive: bar goes from 120 upward
      // For negative: bar goes from 120 downward
      chargingValue: d.batteryActivity >= 0 ? scaledValue : 0,
      dischargingValue: d.batteryActivity < 0 ? scaledValue : 0,
      baseValue: 120,
      isPositive: d.batteryActivity >= 0,
    }
  })

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
                // Map: 0 -> -4, 120 -> 0, 240 -> +4
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
          {/* Charging bars (green, upward from 120) */}
          <Bar
            yAxisId="activity"
            dataKey="chargingValue"
            baseValue={120}
            radius={[1, 1, 0, 0]}
            isAnimationActive={false}
            barSize={7}
          >
            {transformedData.map((entry, index) => (
              <Cell key={`charge-${index}`} fill={entry.chargingValue > 0 ? '#009a33' : 'transparent'} />
            ))}
          </Bar>
          {/* Discharging bars (gray, downward from 120) */}
          <Bar
            yAxisId="activity"
            dataKey="dischargingValue"
            baseValue={120}
            radius={[0, 0, 1, 1]}
            isAnimationActive={false}
            barSize={7}
          >
            {transformedData.map((entry, index) => (
              <Cell key={`discharge-${index}`} fill={entry.dischargingValue > 0 ? '#cdc8c2' : 'transparent'} />
            ))}
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
