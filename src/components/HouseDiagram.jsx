import React, { useEffect, useRef } from 'react'
import './HouseDiagram.css'

function HouseDiagram() {
  const canvasRef = useRef(null)
  const riveInstanceRef = useRef(null)

  useEffect(() => {
    if (!canvasRef.current) return

    // Check if Rive is loaded
    if (typeof window !== 'undefined' && window.rive) {
      const rive = window.rive
      
      // Load the Rive file
      new rive.Rive({
        src: '/house-animation.riv',
        canvas: canvasRef.current,
        autoplay: true,
        onLoad: () => {
          console.log('Rive animation loaded')
        },
        onLoadError: (error) => {
          console.error('Rive animation error:', error)
        }
      })
    } else {
      // Fallback: wait for Rive to load
      const checkRive = setInterval(() => {
        if (typeof window !== 'undefined' && window.rive) {
          clearInterval(checkRive)
          const rive = window.rive
          new rive.Rive({
            src: '/house-animation.riv',
            canvas: canvasRef.current,
            autoplay: true,
          })
        }
      }, 100)

      return () => clearInterval(checkRive)
    }
  }, [])

  return (
    <div className="house-diagram">
      <div className="house-animation-container">
        <canvas ref={canvasRef} className="house-rive-animation" />
      </div>
    </div>
  )
}

export default HouseDiagram
