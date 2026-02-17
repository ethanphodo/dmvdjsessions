import { useState, useEffect, useRef, useCallback } from 'react'

/**
 * Hook for audio-reactive visuals using Web Audio API
 * Can be connected to an audio element or used standalone for ambient effects
 */
export function useAudioReactive(audioElement = null) {
  const [audioData, setAudioData] = useState({
    bass: 0,
    mid: 0,
    treble: 0,
    overall: 0,
  })

  const audioContextRef = useRef(null)
  const analyserRef = useRef(null)
  const dataArrayRef = useRef(null)
  const sourceRef = useRef(null)
  const animationRef = useRef(null)

  const connect = useCallback((element) => {
    if (!element || audioContextRef.current) return

    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext
      audioContextRef.current = new AudioContext()
      analyserRef.current = audioContextRef.current.createAnalyser()
      analyserRef.current.fftSize = 256

      sourceRef.current = audioContextRef.current.createMediaElementSource(element)
      sourceRef.current.connect(analyserRef.current)
      analyserRef.current.connect(audioContextRef.current.destination)

      dataArrayRef.current = new Uint8Array(analyserRef.current.frequencyBinCount)

      const analyze = () => {
        if (!analyserRef.current) return

        analyserRef.current.getByteFrequencyData(dataArrayRef.current)

        const bufferLength = dataArrayRef.current.length
        const bassRange = Math.floor(bufferLength * 0.1)
        const midRange = Math.floor(bufferLength * 0.5)

        // Calculate frequency bands
        let bassSum = 0, midSum = 0, trebleSum = 0

        for (let i = 0; i < bassRange; i++) {
          bassSum += dataArrayRef.current[i]
        }
        for (let i = bassRange; i < midRange; i++) {
          midSum += dataArrayRef.current[i]
        }
        for (let i = midRange; i < bufferLength; i++) {
          trebleSum += dataArrayRef.current[i]
        }

        const bass = bassSum / bassRange / 255
        const mid = midSum / (midRange - bassRange) / 255
        const treble = trebleSum / (bufferLength - midRange) / 255
        const overall = (bass + mid + treble) / 3

        setAudioData({ bass, mid, treble, overall })
        animationRef.current = requestAnimationFrame(analyze)
      }

      analyze()
    } catch (error) {
      console.warn('Web Audio API not supported:', error)
    }
  }, [])

  const disconnect = useCallback(() => {
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current)
    }
    if (audioContextRef.current) {
      audioContextRef.current.close()
      audioContextRef.current = null
    }
  }, [])

  useEffect(() => {
    if (audioElement) {
      connect(audioElement)
    }
    return disconnect
  }, [audioElement, connect, disconnect])

  return { audioData, connect, disconnect }
}

/**
 * Hook for ambient noise animation (without audio input)
 * Creates subtle, organic movement for backgrounds
 */
export function useAmbientAnimation(speed = 1) {
  const [values, setValues] = useState({
    noiseIntensity: 0.015,
    gradientOffset: 0,
    pulseScale: 1,
  })

  const animationRef = useRef(null)
  const startTimeRef = useRef(Date.now())

  useEffect(() => {
    const animate = () => {
      const elapsed = (Date.now() - startTimeRef.current) / 1000

      // Organic sine-based animations
      const noiseIntensity = 0.015 + Math.sin(elapsed * 0.5 * speed) * 0.005
      const gradientOffset = Math.sin(elapsed * 0.3 * speed) * 10
      const pulseScale = 1 + Math.sin(elapsed * 0.8 * speed) * 0.02

      setValues({ noiseIntensity, gradientOffset, pulseScale })
      animationRef.current = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [speed])

  return values
}

export default useAudioReactive
