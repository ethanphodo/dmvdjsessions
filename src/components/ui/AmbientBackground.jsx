import { useEffect, useRef } from 'react'
import { useAmbientAnimation } from '../../hooks/useAudioReactive'

/**
 * Audio-reactive ambient background with animated noise and mesh gradients
 * Provides subtle, organic movement that responds to optional audio input
 */
function AmbientBackground({ audioData = null, className = '' }) {
  const ambientValues = useAmbientAnimation(1)
  const canvasRef = useRef(null)
  const animationRef = useRef(null)

  // Combine ambient animation with audio data if available
  const intensity = audioData
    ? ambientValues.noiseIntensity + audioData.bass * 0.02
    : ambientValues.noiseIntensity

  const gradientPulse = audioData
    ? 1 + audioData.overall * 0.1
    : ambientValues.pulseScale

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    let frame = 0

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    const drawNoise = () => {
      const imageData = ctx.createImageData(canvas.width, canvas.height)
      const data = imageData.data

      for (let i = 0; i < data.length; i += 4) {
        const noise = Math.random() * 255
        data[i] = noise // R
        data[i + 1] = noise // G
        data[i + 2] = noise // B
        data[i + 3] = intensity * 255 * 1.5 // Alpha (opacity based on intensity)
      }

      ctx.putImageData(imageData, 0, 0)
    }

    const animate = () => {
      frame++
      // Only update noise every 3 frames for performance
      if (frame % 3 === 0) {
        drawNoise()
      }
      animationRef.current = requestAnimationFrame(animate)
    }

    resize()
    window.addEventListener('resize', resize)
    animate()

    return () => {
      window.removeEventListener('resize', resize)
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [intensity])

  return (
    <>
      {/* Animated mesh gradient */}
      <div
        className={`fixed inset-0 z-[-2] overflow-hidden ${className}`}
        style={{
          transform: `scale(${gradientPulse})`,
          transition: 'transform 0.3s ease-out',
        }}
      >
        <div
          className="absolute top-[-50%] left-[-50%] w-[200%] h-[200%]"
          style={{
            background: `
              radial-gradient(circle at 20% 80%, rgba(214, 167, 86, ${0.08 * gradientPulse}) 0%, transparent 40%),
              radial-gradient(circle at 80% 20%, rgba(139, 30, 45, ${0.06 * gradientPulse}) 0%, transparent 40%),
              radial-gradient(circle at 40% 40%, rgba(127, 175, 212, ${0.05 * gradientPulse}) 0%, transparent 30%)
            `,
            animation: 'meshMove 20s ease-in-out infinite',
            transform: `translate(${ambientValues.gradientOffset}px, ${ambientValues.gradientOffset * 0.5}px)`,
          }}
        />
      </div>

      {/* Dynamic noise canvas overlay */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 z-[9998] pointer-events-none mix-blend-overlay"
        style={{ opacity: 0.4 }}
      />
    </>
  )
}

export default AmbientBackground
