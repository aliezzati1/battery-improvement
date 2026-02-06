import React, { useMemo } from 'react'
import { ComposedChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Cell, ReferenceLine } from 'recharts'
import './Chart.css'

function BatteryActivityChart({ data }) {
  // Calculate dynamic domain based on data
  const maxAbs = useMemo(() => {
    const max = Math.max(...data.map(d => Math.abs(d.batteryActivity)))
    // Round up to nearest 0.5, with minimum of 4
    return Math.max(4, Math.ceil(max * 2) / 2)
  }, [data])

  // Transform data: positive values go up from 0, negative go down from 0
  const transformedData = data.map(d => ({
    ...d,
    chargingValue: d.batteryActivity >= 0 ? d.batteryActivity : 0,
    dischargingValue: d.batteryActivity < 0 ? Math.abs(d.batteryActivity) : 0,
    isPositive: d.batteryActivity >= 0,
  }))

  return (
    <div className="chart-container">
      <div className="chart-legend-top">
        <div className="legend-item">
          <div className="legend-dot charged"></div>
          <span>Charge</span>
        </div>
        <div className="legend-item">
          <div className="legend-dot discharged"></div>
          <span>Discharge</span>
        </div>
      </div>
      <ResponsiveContainer width="100%" height={200}>
        <ComposedChart
          data={transformedData}
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
            yAxisId="activity"
            orientation="right"
            domain={[-maxAbs, maxAbs]}
            tick={{ fill: '#353230', fontSize: 12, fontFamily: 'Inter', letterSpacing: '-0.06px' }}
            tickFormatter={(value) => {
              if (value === 0) return '0'
              if (value === maxAbs) return String(maxAbs)
              if (value === -maxAbs) return String(-maxAbs)
              return ''
            }}
            axisLine={false}
            tickLine={false}
            width={24}
          />
          <ReferenceLine 
            yAxisId="activity" 
            y={0} 
            stroke="#353230" 
            strokeWidth={1} 
          />
          {/* Charging bars (green, upward from 0) */}
          <Bar
            yAxisId="activity"
            dataKey="chargingValue"
            baseValue={0}
            radius={[1, 1, 0, 0]}
            isAnimationActive={false}
            barSize={7}
          >
            {transformedData.map((entry, index) => (
              <Cell key={`charge-${index}`} fill={entry.chargingValue > 0 ? '#009a33' : 'transparent'} />
            ))}
          </Bar>
          {/* Discharging bars (gray, downward from 0) */}
          <Bar
            yAxisId="activity"
            dataKey="dischargingValue"
            baseValue={0}
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
    </div>
  )
}

export default BatteryActivityChart
