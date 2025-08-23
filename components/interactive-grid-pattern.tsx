"use client"

import React, { useEffect, useRef, useState } from 'react'

interface InteractiveGridPatternProps {
  className?: string
  gridSize?: number
  strokeWidth?: number
  fadeDistance?: number
}

export default function InteractiveGridPattern({
  className = "",
  gridSize = 50,
  strokeWidth = 1,
  fadeDistance = 300,
}: InteractiveGridPatternProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })

  useEffect(() => {
    const updateDimensions = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      })
    }

    updateDimensions()
    window.addEventListener('resize', updateDimensions)
    return () => window.removeEventListener('resize', updateDimensions)
  }, [])

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    canvas.width = dimensions.width
    canvas.height = dimensions.height

    // Clear canvas
    ctx.clearRect(0, 0, dimensions.width, dimensions.height)

    // Draw grid
    const drawGrid = () => {
      ctx.strokeStyle = 'rgba(21, 128, 61, 0.15)' // Darker green with slightly higher opacity
      ctx.lineWidth = strokeWidth

      // Vertical lines
      for (let x = 0; x <= dimensions.width; x += gridSize) {
        const distance = Math.abs(x - mousePosition.x)
        const opacity = Math.max(0, 1 - distance / fadeDistance)
        
        ctx.strokeStyle = `rgba(21, 128, 61, ${0.15 + opacity * 0.8})`
        ctx.beginPath()
        ctx.moveTo(x, 0)
        ctx.lineTo(x, dimensions.height)
        ctx.stroke()
      }

      // Horizontal lines
      for (let y = 0; y <= dimensions.height; y += gridSize) {
        const distance = Math.abs(y - mousePosition.y)
        const opacity = Math.max(0, 1 - distance / fadeDistance)
        
        ctx.strokeStyle = `rgba(21, 128, 61, ${0.15 + opacity * 0.8})`
        ctx.beginPath()
        ctx.moveTo(0, y)
        ctx.lineTo(dimensions.width, y)
        ctx.stroke()
      }

      // Draw intersection points with enhanced visibility near mouse
      ctx.fillStyle = 'rgba(21, 128, 61, 0.4)'
      for (let x = 0; x <= dimensions.width; x += gridSize) {
        for (let y = 0; y <= dimensions.height; y += gridSize) {
          const distance = Math.sqrt(
            Math.pow(x - mousePosition.x, 2) + Math.pow(y - mousePosition.y, 2)
          )
          const opacity = Math.max(0, 1 - distance / fadeDistance)
          
          if (opacity > 0.05) {
            const pointSize = 2 + opacity * 3 // Larger points when closer to mouse
            ctx.fillStyle = `rgba(21, 128, 61, ${opacity * 0.9})`
            ctx.beginPath()
            ctx.arc(x, y, pointSize, 0, Math.PI * 2)
            ctx.fill()
            
            // Add a bright center for very close points
            if (opacity > 0.5) {
              ctx.fillStyle = `rgba(34, 197, 94, ${opacity * 0.8})`
              ctx.beginPath()
              ctx.arc(x, y, pointSize * 0.5, 0, Math.PI * 2)
              ctx.fill()
            }
          }
        }
      }

      // Add a pronounced glow effect around the mouse
      const gradient = ctx.createRadialGradient(
        mousePosition.x, mousePosition.y, 0,
        mousePosition.x, mousePosition.y, fadeDistance
      )
      gradient.addColorStop(0, 'rgba(21, 128, 61, 0.15)')
      gradient.addColorStop(0.3, 'rgba(21, 128, 61, 0.08)')
      gradient.addColorStop(0.6, 'rgba(21, 128, 61, 0.03)')
      gradient.addColorStop(1, 'rgba(21, 128, 61, 0)')
      
      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, dimensions.width, dimensions.height)
      
      // Add an inner bright glow for more intensity
      const innerGradient = ctx.createRadialGradient(
        mousePosition.x, mousePosition.y, 0,
        mousePosition.x, mousePosition.y, fadeDistance * 0.4
      )
      innerGradient.addColorStop(0, 'rgba(34, 197, 94, 0.12)')
      innerGradient.addColorStop(0.5, 'rgba(34, 197, 94, 0.04)')
      innerGradient.addColorStop(1, 'rgba(34, 197, 94, 0)')
      
      ctx.fillStyle = innerGradient
      ctx.fillRect(0, 0, dimensions.width, dimensions.height)
    }

    drawGrid()
  }, [mousePosition, dimensions, gridSize, strokeWidth, fadeDistance])

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 pointer-events-none ${className}`}
      style={{ 
        background: 'linear-gradient(135deg, rgba(21, 128, 61, 0.03) 0%, rgba(15, 118, 110, 0.02) 100%)'
      }}
    />
  )
}
