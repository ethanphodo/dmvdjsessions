import { useState, useEffect, useRef, useMemo } from 'react'
import { useScroll, useTransform, useSpring, useMotionValue } from 'framer-motion'

/**
 * Hook for kinetic typography that reacts to scroll position
 * Returns values for font-weight variation and italic slant based on scroll
 */
export function useKineticTypography(options = {}) {
  const {
    minWeight = 400,
    maxWeight = 900,
    minSlant = 0,
    maxSlant = -12,
    scrollRange = 300,
  } = options

  const [style, setStyle] = useState({
    fontWeight: minWeight,
    fontStyle: 'normal',
    fontVariationSettings: `'wght' ${minWeight}, 'slnt' ${minSlant}`,
    transform: 'skewX(0deg)',
    letterSpacing: '-0.05em',
  })

  const elementRef = useRef(null)

  useEffect(() => {
    const handleScroll = () => {
      if (!elementRef.current) return

      const rect = elementRef.current.getBoundingClientRect()
      const viewportHeight = window.innerHeight
      const elementCenter = rect.top + rect.height / 2
      const progress = Math.max(0, Math.min(1, (viewportHeight - elementCenter) / scrollRange))

      const weight = minWeight + (maxWeight - minWeight) * progress
      const slant = minSlant + (maxSlant - minSlant) * progress
      const skew = -slant * 0.3
      const tracking = -0.05 - (progress * 0.02)

      setStyle({
        fontWeight: Math.round(weight),
        fontStyle: slant < -2 ? 'italic' : 'normal',
        fontVariationSettings: `'wght' ${Math.round(weight)}, 'slnt' ${slant.toFixed(1)}`,
        transform: `skewX(${skew.toFixed(1)}deg)`,
        letterSpacing: `${tracking.toFixed(3)}em`,
      })
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()

    return () => window.removeEventListener('scroll', handleScroll)
  }, [minWeight, maxWeight, minSlant, maxSlant, scrollRange])

  return { style, ref: elementRef }
}

/**
 * Advanced scrubbing typography hook using Framer Motion
 * Creates smooth, spring-based scroll-linked animations
 */
export function useScrubTypography(options = {}) {
  const {
    // Weight scrubbing (400 → 900)
    minWeight = 400,
    maxWeight = 900,
    // Skew scrubbing (-8deg when scrolled)
    minSkew = 0,
    maxSkew = -8,
    // Letter spacing scrubbing
    minTracking = -0.02,
    maxTracking = -0.06,
    // Y offset for parallax
    minY = 0,
    maxY = -50,
    // Scroll range relative to element
    offsetStart = 'start end',
    offsetEnd = 'end start',
    // Spring config for smoothness
    springConfig = { stiffness: 100, damping: 30, mass: 1 },
  } = options

  const elementRef = useRef(null)

  const { scrollYProgress } = useScroll({
    target: elementRef,
    offset: [offsetStart, offsetEnd],
  })

  // Create spring-smoothed values
  const smoothProgress = useSpring(scrollYProgress, springConfig)

  // Transform scroll progress to style values
  const fontWeight = useTransform(smoothProgress, [0, 1], [minWeight, maxWeight])
  const skewX = useTransform(smoothProgress, [0, 1], [minSkew, maxSkew])
  const letterSpacing = useTransform(smoothProgress, [0, 1], [minTracking, maxTracking])
  const y = useTransform(smoothProgress, [0, 1], [minY, maxY])
  const opacity = useTransform(smoothProgress, [0, 0.2, 0.8, 1], [0.6, 1, 1, 0.6])

  return {
    ref: elementRef,
    style: {
      fontWeight,
      skewX,
      letterSpacing,
      y,
      opacity,
    },
    progress: smoothProgress,
  }
}

/**
 * Hook for character-by-character scrubbing animation
 * Each character animates with a staggered delay based on scroll
 */
export function useCharacterScrub(text, options = {}) {
  const {
    staggerAmount = 0.02, // Delay between characters
    minWeight = 400,
    maxWeight = 900,
  } = options

  const characters = useMemo(() => text.split(''), [text])
  const containerRef = useRef(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  })

  // Create individual progress values for each character
  const characterStyles = useMemo(() => {
    return characters.map((char, index) => {
      const start = index * staggerAmount
      const end = start + (1 - staggerAmount * (characters.length - 1))

      return {
        char,
        index,
        inputRange: [start, Math.min(end, 1)],
      }
    })
  }, [characters, staggerAmount])

  return {
    ref: containerRef,
    characters: characterStyles,
    scrollProgress: scrollYProgress,
    config: { minWeight, maxWeight },
  }
}

/**
 * Hook for scroll-velocity-based typography effects
 * Text weight/style changes based on how fast the user scrolls
 */
export function useVelocityTypography(options = {}) {
  const {
    baseWeight = 500,
    maxWeightDelta = 400, // How much weight can change
    baseskew = 0,
    maxSkewDelta = 12,
    damping = 0.95, // How quickly effects decay
  } = options

  const [style, setStyle] = useState({
    fontWeight: baseWeight,
    transform: `skewX(${baseskew}deg)`,
  })

  const lastScrollY = useRef(0)
  const velocity = useRef(0)
  const rafId = useRef(null)

  useEffect(() => {
    let lastTime = performance.now()

    const updateVelocity = () => {
      const currentTime = performance.now()
      const deltaTime = (currentTime - lastTime) / 1000
      lastTime = currentTime

      const currentScrollY = window.scrollY
      const scrollDelta = currentScrollY - lastScrollY.current
      lastScrollY.current = currentScrollY

      // Calculate velocity (pixels per second)
      const instantVelocity = Math.abs(scrollDelta / deltaTime)

      // Smooth velocity with damping
      velocity.current = velocity.current * damping + instantVelocity * (1 - damping)

      // Normalize velocity (0-1 range, capped at 2000px/s)
      const normalizedVelocity = Math.min(velocity.current / 2000, 1)

      // Calculate weight based on velocity
      const weight = baseWeight + normalizedVelocity * maxWeightDelta
      const skew = baseskew + (scrollDelta > 0 ? 1 : -1) * normalizedVelocity * maxSkewDelta

      setStyle({
        fontWeight: Math.round(weight),
        transform: `skewX(${skew.toFixed(2)}deg)`,
      })

      rafId.current = requestAnimationFrame(updateVelocity)
    }

    rafId.current = requestAnimationFrame(updateVelocity)

    return () => {
      if (rafId.current) {
        cancelAnimationFrame(rafId.current)
      }
    }
  }, [baseWeight, maxWeightDelta, baseskew, maxSkewDelta, damping])

  return { style }
}

/**
 * Hook for staggered text reveal on scroll
 */
export function useTextReveal(threshold = 0.2) {
  const [isRevealed, setIsRevealed] = useState(false)
  const elementRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsRevealed(true)
          observer.disconnect()
        }
      },
      { threshold }
    )

    if (elementRef.current) {
      observer.observe(elementRef.current)
    }

    return () => observer.disconnect()
  }, [threshold])

  return { isRevealed, ref: elementRef }
}

export default useKineticTypography
