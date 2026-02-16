import React, { useMemo } from 'react'
import { ComposedChart, Line, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Cell } from 'recharts'
import './Chart.css'

// Custom bar shape that allows varying widths
const CustomBar = (props) => {
  const { x, y, width, height, payload } = props
  
  if (!payload || !payload.revenueBar || payload.revenueBar === 0) {
    return null
  }
  
  const barWidth = payload.barWidth || 6
  
  // Since revenueBar = 100 and domain is [0, 100], 
  // y is the top position (value 100) and height is the full chart height (100 to 0)
  return (
    <rect
      x={x - barWidth / 2}
      y={y}
      width={barWidth}
      height={height}
      fill="#b2ffbf"
      opacity={0.7}
    />
  )
}

function SOCRevenueChart({ data }) {
  // Transform data to include revenue periods with varying widths
  const chartData = useMemo(() => {
    // Create a seeded random function for consistent randomness per data point
    const seededRandom = (seed) => {
      const x = Math.sin(seed) * 10000
      return x - Math.floor(x)
    }
    
    return data.map((item, index) => {
      if (item.revenue > 0) {
        // Generate varied bar widths: 2px to 9px
        // Use the time and index as seed for consistent randomness
        const seed = parseInt(item.time) * 7 + index * 3
        const randomValue = seededRandom(seed)
        
        // Create varied widths: 2, 3, 4, 5, 6, 7, 8, 9px
        // Weight towards smaller widths (2-6px) more common, larger (7-9px) less common
        let barWidth
        if (randomValue < 0.3) {
          barWidth = 2 + Math.floor(randomValue * 3) // 2-4px
        } else if (randomValue < 0.7) {
          barWidth = 4 + Math.floor((randomValue - 0.3) * 3) // 4-6px
        } else {
          barWidth = 6 + Math.floor((randomValue - 0.7) * 3) // 6-9px
        }
        
        return {
          ...item,
          revenueBar: 100,
          barWidth: barWidth,
        }
      }
      
      return {
        ...item,
        revenueBar: 0,
        barWidth: 0,
      }
    })
  }, [data])

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
            {/* Revenue bars - full height vertical bars with varying widths */}
            <Bar
              yAxisId="soc"
              dataKey="revenueBar"
              shape={<CustomBar />}
              isAnimationActive={false}
            >
              {chartData.map((entry, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  payload={{ ...entry, barWidth: entry.barWidth }}
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
