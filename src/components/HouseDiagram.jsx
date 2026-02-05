import React, { useEffect, useRef, useState } from 'react'
import './HouseDiagram.css'

function HouseDiagram() {
  const canvasRef = useRef(null)
  const riveInstanceRef = useRef(null)
  const [error, setError] = useState(null)
  const timeoutRef = useRef(null)

  useEffect(() => {
    if (!canvasRef.current) return

    let attempts = 0
    const maxAttempts = 50 // 5 seconds max wait

    // Wait for Rive to be available
    const initRive = () => {
      attempts++
      
      // Check if Rive is available (try multiple possible global names)
      const rive = window.rive || window.Rive || window.riveApp
      
      if (!rive && attempts < maxAttempts) {
        timeoutRef.current = setTimeout(initRive, 100)
        return
      }

      if (!rive) {
        console.error('Rive library not loaded after timeout')
        setError('Rive animation failed to load')
        return
      }

      try {
        const canvas = canvasRef.current
        const container = canvas.parentElement
        
        if (!container) {
          setError('Container not found')
          return
        }

        const dpr = window.devicePixelRatio || 1
        
        // Set display size (CSS pixels)
        const displayWidth = container.clientWidth || 393
        const displayHeight = container.clientHeight || 344
        
        // Set actual size in memory (scaled for device pixel ratio)
        canvas.width = displayWidth * dpr
        canvas.height = displayHeight * dpr
        
        // Scale the context to account for device pixel ratio
        const ctx = canvas.getContext('2d')
        if (ctx) {
          ctx.scale(dpr, dpr)
        }
        
        // Set the display size
        canvas.style.width = displayWidth + 'px'
        canvas.style.height = displayHeight + 'px'

        // Try different Rive API patterns
        let riveInstance = null
        
        // Pattern 1: rive.Rive
        if (rive.Rive) {
          riveInstance = new rive.Rive({
            src: '/house-animation.riv',
            canvas: canvas,
            autoplay: true,
            onLoad: () => {
              console.log('Rive animation loaded successfully')
              setError(null)
            },
            onLoadError: (err) => {
              console.error('Rive animation error:', err)
              setError('Failed to load animation file')
            }
          })
        }
        // Pattern 2: rive directly
        else if (typeof rive === 'function') {
          riveInstance = new rive({
            src: '/house-animation.riv',
            canvas: canvas,
            autoplay: true,
            onLoad: () => {
              console.log('Rive animation loaded successfully')
              setError(null)
            },
            onLoadError: (err) => {
              console.error('Rive animation error:', err)
              setError('Failed to load animation file')
            }
          })
        } else {
          console.error('Unknown Rive API structure:', rive)
          setError('Rive API not recognized')
          return
        }

        riveInstanceRef.current = riveInstance
      } catch (error) {
        console.error('Error initializing Rive:', error)
        setError('Error initializing animation: ' + error.message)
      }
    }

    // Small delay to ensure DOM is ready
    const timer = setTimeout(initRive, 100)

    // Cleanup
    return () => {
      clearTimeout(timer)
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
      if (riveInstanceRef.current) {
        try {
          if (riveInstanceRef.current.cleanup) {
            riveInstanceRef.current.cleanup()
          } else if (riveInstanceRef.current.destroy) {
            riveInstanceRef.current.destroy()
          }
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
        {error && (
          <div style={{ 
            position: 'absolute', 
            top: '50%', 
            left: '50%', 
            transform: 'translate(-50%, -50%)',
            color: '#999',
            fontSize: '14px',
            textAlign: 'center'
          }}>
            {error}
          </div>
        )}
      </div>
    </div>
  )
}

export default HouseDiagram
