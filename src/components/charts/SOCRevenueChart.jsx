import React from 'react'
import { ComposedChart, Line, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Cell } from 'recharts'
import './Chart.css'

function SOCRevenueChart({ data }) {
  // Transform data to include revenue periods as full-height bars
  const chartData = data.map(item => ({
    ...item,
    revenueBar: item.revenue > 0 ? 100 : 0, // Full height bar when revenue exists
  }))

  return (
    <div className="soc-revenue-chart-container">
      <h3 className="chart-title">Battery SOC vs. revenue times</h3>
      <div className="chart-container">
        <div style={{ position: 'relative' }}>
          <p style={{ 
            position: 'absolute', 
            top: 0, 
            left: 0, 
            fontFamily: 'Inter', 
            fontSize: 12, 
            color: '#353230', 
            letterSpacing: '-0.06px',
            margin: 0,
            zIndex: 10
          }}>%</p>
          <ResponsiveContainer width="100%" height={200}>
            <ComposedChart
              data={chartData}
              margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
            >
              <CartesianGrid 
                strokeDasharray="0" 
                stroke="#f2efec" 
                vertical={false}
                horizontal={true}
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
                orientation="left"
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
            {/* Revenue bars - full height vertical bars (rendered first so line appears on top) */}
            <Bar
              yAxisId="soc"
              dataKey="revenueBar"
              fill="#b2ffbf"
              isAnimationActive={false}
              barSize={6}
            >
              {chartData.map((entry, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={entry.revenue > 0 ? '#b2ffbf' : 'transparent'} 
                  opacity={entry.revenue > 0 ? 0.7 : 0}
                />
              ))}
            </Bar>
            {/* SOC line - rendered last so it appears on top */}
            <Line
              yAxisId="soc"
              type="stepAfter"
              dataKey="soc"
              stroke="#353230"
              strokeWidth={2}
              dot={false}
              isAnimationActive={false}
            />
          </ComposedChart>
        </ResponsiveContainer>
        </div>
        <div className="chart-legend" style={{ justifyContent: 'center' }}>
          <div className="legend-item">
            <div className="legend-dot earned-money"></div>
            <span>Earned money</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SOCRevenueChart
