import { useEffect, useRef } from 'react'

/**
 * Penrose Snowflake Tiling Background Component
 * Uses L-system to generate Penrose snowflake pattern
 * Based on Processing example: https://processing.org/examples/penrosesnowflake.html
 */
export function PenroseTiling({ 
  opacity = 1,
  strokeColor = 'rgba(230, 240, 240, 1)',
  strokeWidth = 1
}) {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const dpr = window.devicePixelRatio || 1

    const renderPattern = () => {
      const width = window.innerWidth* dpr
      const height = window.innerHeight* dpr
      
      // Set canvas internal size accounting for device pixel ratio
      canvas.width = width 
      canvas.height = height
      
      // Set CSS size to actual display size, and apply a CSS scale of 0.5
      canvas.style.width = `${width/dpr}px`
      canvas.style.height = `${height/dpr}px`
      canvas.style.transformOrigin = 'top left'

      // Always reacquire a fresh context after size changes
      const ctx = canvas.getContext('2d')

      // Scale all drawing operations to dpr (so stroke widths etc are sharp)
      ctx.setTransform(1, 0, 0, 1, 0, 0)  // reset transform
      ctx.scale(dpr, dpr)

      ctx.clearRect(0, 0, width, height)
      ctx.strokeStyle = strokeColor
      ctx.lineWidth = strokeWidth
      
      // Calculate base size to fill entire screen
      // Use diagonal distance to ensure pattern reaches all corners
      // Account for 2x scale, so we need pattern to extend at least diagonal/2 from center
      const diagonal = Math.sqrt(width * width + height * height)
      const baseSize = diagonal * 1.2
      const penrose = new PenroseSnowflakeLSystem(baseSize)
      penrose.simulate(5)
      
      // Render a single pattern centered on the canvas
      ctx.save()
      ctx.translate(width / 2, height / 2)
      ctx.scale(.5,.5)
      penrose.render(ctx)
      ctx.restore()
    }

    renderPattern()

    // Handle resize
    const handleResize = () => {
      renderPattern()
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [strokeColor, strokeWidth, opacity])

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        pointerEvents: 'none',
        zIndex: 0,
        opacity: opacity,
        transformOrigin: 'center center'
      }}
    />
  )
}

class PenroseSnowflakeLSystem {
  constructor(baseSize) {
    this.steps = 0
    this.axiom = "F3-F3-F3-F3-F"
    this.ruleF = "F3-F3-F45-F++F3-F"
    this.startLength = baseSize
    this.theta = (18 * Math.PI) / 180.0 // 18 degrees in radians
    this.reset()
  }

  simulate(gen) {
    while (this.getAge() < gen) {
      this.iterate()
    }
  }

  reset() {
    this.production = this.axiom
    this.drawLength = this.startLength
    this.generations = 0
  }

  getAge() {
    return this.generations
  }

  iterate() {
    let newProduction = ""

    for (let i = 0; i < this.production.length; ++i) {
      let step = this.production.charAt(i)
      if (step == "F") {
        newProduction = newProduction + this.ruleF
      } else {
        // Keep all other characters (including numbers, +, -, [, ])
        newProduction = newProduction + step
      }
    }

    this.drawLength = this.drawLength * 0.4
    this.generations++
    this.production = newProduction
  }

  render(ctx) {
    // Stack for push/pop operations
    const stack = []
    
    // Current state - start at center of pattern
    let x = 0
    let y = 0
    let angle = 0
    let repeats = 1

    // Render all steps
    for (let i = 0; i < this.production.length; ++i) {
      let step = this.production.charAt(i)

      if (step == "F") {
        // Draw forward (repeat if needed)
        for (let j = 0; j < repeats; j++) {
          const newX = x + this.drawLength * Math.sin(angle)
          const newY = y - this.drawLength * Math.cos(angle)
          
          ctx.beginPath()
          ctx.moveTo(x, y)
          ctx.lineTo(newX, newY)
          ctx.stroke()
          
          x = newX
          y = newY
        }
        repeats = 1
      } else if (step == "+") {
        // Rotate right (repeat if needed)
        for (let j = 0; j < repeats; j++) {
          angle += this.theta
        }
        repeats = 1
      } else if (step == "-") {
        // Rotate left (repeat if needed)
        for (let j = 0; j < repeats; j++) {
          angle -= this.theta
        }
        repeats = 1
      } else if (step == "[") {
        // Push state
        stack.push({ x, y, angle })
      } else if (step == "]") {
        // Pop state
        if (stack.length > 0) {
          const state = stack.pop()
          x = state.x
          y = state.y
          angle = state.angle
        }
      } else if (step >= "0" && step <= "9") {
        // Handle numeric characters for repeats
        repeats += parseInt(step)
      }
    }
  }
}
