import React, { useEffect, useRef } from 'react'
import './HouseDiagram.css'

function HouseDiagram() {
  const canvasRef = useRef(null)
  const riveInstanceRef = useRef(null)

  useEffect(() => {
    if (!canvasRef.current) return

    // Wait for Rive to be available
    const initRive = () => {
      if (typeof window === 'undefined' || !window.rive) {
        setTimeout(initRive, 100)
        return
      }

      const rive = window.rive
      
      // Set canvas dimensions explicitly to avoid pixelation
      const canvas = canvasRef.current
      const container = canvas.parentElement
      const dpr = window.devicePixelRatio || 1
      
      // Set display size (CSS pixels)
      const displayWidth = container.clientWidth
      const displayHeight = container.clientHeight
      
      // Set actual size in memory (scaled for device pixel ratio)
      canvas.width = displayWidth * dpr
      canvas.height = displayHeight * dpr
      
      // Scale the context to account for device pixel ratio
      const ctx = canvas.getContext('2d')
      ctx.scale(dpr, dpr)
      
      // Now set the display size back
      canvas.style.width = displayWidth + 'px'
      canvas.style.height = displayHeight + 'px'

      // Load the Rive animation
      try {
        riveInstanceRef.current = new rive.Rive({
          src: '/house-animation.riv',
          canvas: canvas,
          autoplay: true,
          layout: new rive.Layout({
            fit: rive.Fit.contain,
            alignment: rive.Alignment.center,
          }),
          onLoad: () => {
            console.log('Rive animation loaded successfully')
          },
          onLoadError: (error) => {
            console.error('Rive animation error:', error)
          }
        })
      } catch (error) {
        console.error('Error initializing Rive:', error)
      }
    }

    initRive()

    // Cleanup
    return () => {
      if (riveInstanceRef.current) {
        try {
          riveInstanceRef.current.cleanup()
        } catch (e) {
          console.error('Error cleaning up Rive:', e)
        }
        riveInstanceRef.current = null
      }
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
