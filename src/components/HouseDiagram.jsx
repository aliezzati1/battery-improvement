import React from 'react'
import './HouseDiagram.css'

function HouseDiagram() {
  return (
    <div className="house-diagram">
      <div className="house-image-container">
        <img 
          src="/House.png" 
          alt="House energy diagram" 
          className="house-image"
        />
      </div>
    </div>
  )
}

export default HouseDiagram
