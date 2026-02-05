import React from 'react'
import { ComposedChart, Line, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Area, ReferenceLine, Cell } from 'recharts'
import './PerformanceCard.css'

function PerformanceCard({ onClick }) {
  // Sample data for 24 hours (hourly data points)
  // Based on the design: price starts at 0, stays at 0 until 06:00, then increases
  // Charging happens at low prices (early morning), discharging at high prices (midday)
  const data = [
    { time: '00', price: 0, battery: 0 },
    { time: '01', price: 0, battery: 0 },
    { time: '02', price: 0, battery: 0 },
    { time: '03', price: 0, battery: 1 },
    { time: '04', price: 0, battery: 1.5 },
    { time: '05', price: 0, battery: 1 },
    { time: '06', price: 20, battery: 0 },
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
    { time: '21', price: 40, battery: 0 },
    { time: '22', price: 30, battery: 0 },
    { time: '23', price: 20, battery: 0 },
  ]

  // Custom bar colors
  const getBarColor = (value) => {
    return value > 0 ? '#009a33' : '#cdc8c2'
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
            margin={{ top: 20, right: 30, left: 20, bottom: 40 }}
          >
            <defs>
              <linearGradient id="priceGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#009a33" stopOpacity={0.2} />
                <stop offset="30%" stopColor="#ffd700" stopOpacity={0.2} />
                <stop offset="70%" stopColor="#ff9800" stopOpacity={0.2} />
                <stop offset="100%" stopColor="#ff5722" stopOpacity={0.2} />
              </linearGradient>
            </defs>
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
              yAxisId="price"
              orientation="left"
              domain={[0, 200]}
              tick={{ fill: '#353230', fontSize: 12, fontFamily: 'Inter', letterSpacing: '-0.06px' }}
              tickFormatter={(value) => {
                if (value === 0 || value === 200) return String(value)
                return ''
              }}
              axisLine={false}
              tickLine={false}
              width={24}
              label={{ 
                value: 'öre/kWh', 
                angle: -90, 
                position: 'insideLeft', 
                offset: -5,
                style: { 
                  textAnchor: 'middle', 
                  fill: '#353230', 
                  fontSize: 12, 
                  fontFamily: 'Inter',
                  letterSpacing: '-0.06px'
                } 
              }}
            />
            <YAxis
              yAxisId="battery"
              orientation="right"
              domain={[-4, 4]}
              tick={{ fill: '#353230', fontSize: 12, fontFamily: 'Inter', letterSpacing: '-0.06px' }}
              tickFormatter={(value) => {
                if (value === 0 || value === 4 || value === -4) return String(value)
                return ''
              }}
              axisLine={false}
              tickLine={false}
              width={20}
              label={{ 
                value: 'kWh', 
                angle: 90, 
                position: 'insideRight', 
                offset: -5,
                style: { 
                  textAnchor: 'middle', 
                  fill: '#353230', 
                  fontSize: 12, 
                  fontFamily: 'Inter',
                  letterSpacing: '-0.06px'
                } 
              }}
            />
            <ReferenceLine 
              yAxisId="battery" 
              y={0} 
              stroke="#353230" 
              strokeWidth={1} 
            />
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
              radius={[1, 1, 0, 0]}
              isAnimationActive={false}
              barSize={7}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={getBarColor(entry.battery)} />
              ))}
            </Bar>
          </ComposedChart>
        </ResponsiveContainer>
        <div className="chart-legend">
          <div className="legend-item">
            <div className="legend-dot charged"></div>
            <span>Charged</span>
          </div>
          <div className="legend-item">
            <div className="legend-dot discharged"></div>
            <span>Discharged</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PerformanceCard
