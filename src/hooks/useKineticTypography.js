import { useState, useEffect, useRef } from 'react'

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
    scrollRange = 300, // pixels of scroll to complete animation
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

      // Calculate progress based on element position
      // Progress goes from 0 (element at bottom of viewport) to 1 (element scrolled past)
      const elementCenter = rect.top + rect.height / 2
      const progress = Math.max(0, Math.min(1, (viewportHeight - elementCenter) / scrollRange))

      // Interpolate values
      const weight = minWeight + (maxWeight - minWeight) * progress
      const slant = minSlant + (maxSlant - minSlant) * progress
      const skew = -slant * 0.3 // Subtle skew effect
      const tracking = -0.05 - (progress * 0.02) // Tighten tracking on scroll

      setStyle({
        fontWeight: Math.round(weight),
        fontStyle: slant < -2 ? 'italic' : 'normal',
        fontVariationSettings: `'wght' ${Math.round(weight)}, 'slnt' ${slant.toFixed(1)}`,
        transform: `skewX(${skew.toFixed(1)}deg)`,
        letterSpacing: `${tracking.toFixed(3)}em`,
      })
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll() // Initial call

    return () => window.removeEventListener('scroll', handleScroll)
  }, [minWeight, maxWeight, minSlant, maxSlant, scrollRange])

  return { style, ref: elementRef }
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
