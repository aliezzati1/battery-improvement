import React from 'react'
import { ComposedChart, Line, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, ReferenceLine, Legend } from 'recharts'
import './PerformanceCard.css'

function PerformanceCard({ onClick }) {
  // Sample data for 24 hours (hourly data points)
  // Based on the design: charging at low prices (early morning), discharging at high prices (midday)
  const data = [
    { time: '00', price: 50, battery: 0 },
    { time: '01', price: 45, battery: 0 },
    { time: '02', price: 40, battery: 0 },
    { time: '03', price: 35, battery: 0.5 },
    { time: '04', price: 30, battery: 1.5 },
    { time: '05', price: 25, battery: 2.5 },
    { time: '06', price: 30, battery: 1.5 },
    { time: '07', price: 50, battery: 0 },
    { time: '08', price: 80, battery: 0 },
    { time: '09', price: 110, battery: 0 },
    { time: '10', price: 140, battery: 0 },
    { time: '11', price: 170, battery: 0 },
    { time: '12', price: 190, battery: -1 },
    { time: '13', price: 195, battery: -3.5 },
    { time: '14', price: 190, battery: -2.5 },
    { time: '15', price: 180, battery: -1.5 },
    { time: '16', price: 160, battery: -0.5 },
    { time: '17', price: 130, battery: 0 },
    { time: '18', price: 100, battery: 0 },
    { time: '19', price: 70, battery: 0 },
    { time: '20', price: 50, battery: 0 },
    { time: '21', price: 45, battery: 0 },
    { time: '22', price: 40, battery: 0 },
    { time: '23', price: 35, battery: 0 },
  ]

  // Function to get color based on price (green -> yellow -> orange -> red)
  const getPriceColor = (price) => {
    if (price < 50) return '#009a33' // Green
    if (price < 100) return '#ffd700' // Yellow
    if (price < 150) return '#ff9800' // Orange
    return '#ff5722' // Red
  }

  // Create gradient stops for area fill
  const getGradientId = (price) => {
    const color = getPriceColor(price)
    return `gradient-${color.replace('#', '')}`
  }

  return (
    <div className="performance-card" onClick={onClick}>
      <div className="performance-header">
        <div className="performance-title-section">
          <h3 className="performance-title">Yesterday's performance</h3>
          <p className="performance-subtitle">Avg. spot price vs. battery activities</p>
        </div>
        <svg className="chevron-icon" width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M9 18L15 12L9 6" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>
      <div className="performance-chart">
        <ResponsiveContainer width="100%" height={280}>
          <ComposedChart
            data={data}
            margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
          >
            <defs>
              <linearGradient id="priceGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#009a33" stopOpacity={0.3} />
                <stop offset="50%" stopColor="#ffd700" stopOpacity={0.3} />
                <stop offset="100%" stopColor="#ff5722" stopOpacity={0.3} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="0" stroke="#f2efec" vertical={false} />
            <XAxis
              dataKey="time"
              tick={{ fill: '#353230', fontSize: 12, fontFamily: 'Inter' }}
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
              orientation="left"
              domain={[0, 200]}
              tick={{ fill: '#353230', fontSize: 12, fontFamily: 'Inter' }}
              tickFormatter={(value) => value === 0 || value === 200 ? String(value) : ''}
              axisLine={false}
              tickLine={false}
              label={{ value: 'öre/kWh', angle: -90, position: 'insideLeft', style: { textAnchor: 'middle', fill: '#353230', fontSize: 12, fontFamily: 'Inter' } }}
            />
            <YAxis
              yAxisId="battery"
              orientation="right"
              domain={[-4, 4]}
              tick={{ fill: '#353230', fontSize: 12, fontFamily: 'Inter' }}
              tickFormatter={(value) => {
                if (value === 0 || value === 4 || value === -4) return String(value)
                if (value === 2 || value === -2) return ''
                return ''
              }}
              axisLine={false}
              tickLine={false}
              label={{ value: 'kWh', angle: 90, position: 'insideRight', style: { textAnchor: 'middle', fill: '#353230', fontSize: 12, fontFamily: 'Inter' } }}
            />
            <ReferenceLine yAxisId="battery" y={0} stroke="#353230" strokeWidth={1} />
            <Area
              yAxisId="price"
              type="stepAfter"
              dataKey="price"
              fill="url(#priceGradient)"
              stroke="none"
              isAnimationActive={false}
            />
            <Line
              yAxisId="price"
              type="stepAfter"
              dataKey="price"
              stroke="#ff9800"
              strokeWidth={2}
              dot={false}
              isAnimationActive={false}
            />
            <Bar
              yAxisId="battery"
              dataKey="battery"
              fill={(entry) => entry.battery > 0 ? '#009a33' : '#cdc8c2'}
              radius={[1, 1, 0, 0]}
              isAnimationActive={false}
            />
            <Legend
              content={({ payload }) => (
                <div className="chart-legend">
                  {payload && payload.map((entry, index) => {
                    if (entry.dataKey === 'battery') {
                      return (
                        <React.Fragment key={index}>
                          <div className="legend-item">
                            <div className="legend-dot charged"></div>
                            <span>Charged</span>
                          </div>
                          <div className="legend-item">
                            <div className="legend-dot discharged"></div>
                            <span>Discharged</span>
                          </div>
                        </React.Fragment>
                      )
                    }
                    return null
                  })}
                </div>
              )}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

export default PerformanceCard
