import React from 'react'
import './HouseDiagram.css'

function HouseDiagram() {
  return (
    <div className="house-diagram">
      <div className="house-image-container">
        <img 
          src="./House.png" 
          alt="House energy diagram" 
          className="house-image"
          onError={(e) => {
            console.error('Failed to load House.png, trying alternative paths')
            // Try alternative paths
            e.target.src = '/House.png'
            if (e.target.src.includes('House.png')) {
              e.target.src = './public/House.png'
            }
          }}
        />
      </div>
    </div>
  )
}

export default HouseDiagram
