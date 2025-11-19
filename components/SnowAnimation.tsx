'use client'

import { useEffect, useRef } from 'react'

export default function SnowAnimation() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)

    // Snowflake class
    class Snowflake {
      x: number
      y: number
      radius: number
      speed: number
      opacity: number
      wind: number
      canvasWidth: number
      canvasHeight: number

      constructor(canvasWidth: number, canvasHeight: number) {
        this.canvasWidth = canvasWidth
        this.canvasHeight = canvasHeight
        this.x = Math.random() * canvasWidth
        this.y = Math.random() * canvasHeight
        this.radius = Math.random() * 3 + 1
        this.speed = Math.random() * 2 + 0.5
        this.opacity = Math.random() * 0.5 + 0.3
        this.wind = Math.random() * 0.5 - 0.25
      }

      update() {
        this.y += this.speed
        this.x += this.wind

        // Reset if snowflake goes off screen
        if (this.y > this.canvasHeight) {
          this.y = 0
          this.x = Math.random() * this.canvasWidth
        }
        if (this.x > this.canvasWidth) {
          this.x = 0
        }
        if (this.x < 0) {
          this.x = this.canvasWidth
        }
      }

      draw(context: CanvasRenderingContext2D) {
        context.beginPath()
        context.arc(this.x, this.y, this.radius, 0, Math.PI * 2)
        context.fillStyle = `rgba(255, 255, 255, ${this.opacity})`
        context.fill()
      }
    }

    // Create snowflakes
    const snowflakes: Snowflake[] = []
    const snowflakeCount = Math.min(100, Math.floor((canvas.width * canvas.height) / 15000))

    for (let i = 0; i < snowflakeCount; i++) {
      snowflakes.push(new Snowflake(canvas.width, canvas.height))
    }

    // Animation loop
    let animationId: number
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      snowflakes.forEach((snowflake) => {
        snowflake.update()
        snowflake.draw(ctx)
      })

      animationId = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener('resize', resizeCanvas)
      cancelAnimationFrame(animationId)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-[1]"
      style={{ background: 'transparent' }}
    />
  )
}

