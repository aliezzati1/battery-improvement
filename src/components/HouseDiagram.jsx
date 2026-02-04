import React from 'react'
import { useRive } from 'rive-react'
import './HouseDiagram.css'

function HouseDiagram() {
  const { RiveComponent } = useRive({
    src: '/house-animation.riv',
    autoplay: true,
  })

  return (
    <div className="house-diagram">
      <div className="house-animation-container">
        <RiveComponent className="house-rive-animation" />
      </div>
    </div>
  )
}

export default HouseDiagram
