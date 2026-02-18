import { useEffect, useRef, useState, useCallback } from 'react'
import { useInView, useScroll, useTransform, type MotionValue } from 'framer-motion'

interface UseScrollRevealOptions {
  threshold?: number
  triggerOnce?: boolean
  rootMargin?: string
}

/**
 * Hook for scroll-triggered reveal animations
 */
export function useScrollReveal(options: UseScrollRevealOptions = {}) {
  const { threshold = 0.1, triggerOnce = true, rootMargin = '-50px' } = options
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, {
    amount: threshold,
    once: triggerOnce,
    margin: rootMargin as `${number}px`,
  })

  return { ref, isInView }
}

interface UseParallaxOptions {
  speed?: number
  direction?: 'up' | 'down'
}

/**
 * Hook for parallax scrolling effects
 */
export function useParallax(options: UseParallaxOptions = {}): {
  ref: React.RefObject<HTMLElement | null>
  y: MotionValue<number>
} {
  const { speed = 0.5, direction = 'up' } = options
  const ref = useRef<HTMLElement>(null)

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })

  const multiplier = direction === 'up' ? -1 : 1
  const y = useTransform(scrollYProgress, [0, 1], [0, 200 * speed * multiplier])

  return { ref, y }
}

interface UseScrollProgressOptions {
  offset?: ['start' | 'center' | 'end', 'start' | 'center' | 'end'][]
}

/**
 * Hook for tracking scroll progress of an element
 */
export function useScrollProgress(options: UseScrollProgressOptions = {}) {
  const { offset = [['start', 'end'], ['end', 'start']] } = options
  const ref = useRef<HTMLElement>(null)

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: offset.map((o) => o.join(' ')) as ['start end', 'end start'],
  })

  return { ref, progress: scrollYProgress }
}

interface UseStickyScrollOptions {
  start?: number
  end?: number
}

/**
 * Hook for sticky scroll behavior
 */
export function useStickyScroll(options: UseStickyScrollOptions = {}) {
  const { start = 0, end = 1 } = options
  const ref = useRef<HTMLElement>(null)
  const [isSticky, setIsSticky] = useState(false)

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end end'],
  })

  useEffect(() => {
    const unsubscribe = scrollYProgress.on('change', (value) => {
      setIsSticky(value >= start && value <= end)
    })

    return () => unsubscribe()
  }, [scrollYProgress, start, end])

  return { ref, isSticky, progress: scrollYProgress }
}

/**
 * Hook for fade-on-scroll effect
 */
export function useFadeOnScroll() {
  const ref = useRef<HTMLElement>(null)

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  })

  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1, 0.95])

  return { ref, opacity, scale }
}

/**
 * Hook for staggered reveal of child elements
 */
export function useStaggeredReveal<T extends HTMLElement>() {
  const containerRef = useRef<T>(null)
  const isInView = useInView(containerRef, {
    once: true,
    amount: 0.2,
  })

  const getStaggerDelay = useCallback((index: number, baseDelay = 0.05) => {
    return index * baseDelay
  }, [])

  return { containerRef, isInView, getStaggerDelay }
}

interface UseHorizontalScrollOptions {
  speed?: number
}

/**
 * Hook for horizontal scroll effect on vertical scroll
 */
export function useHorizontalScroll(options: UseHorizontalScrollOptions = {}) {
  const { speed = 1 } = options
  const ref = useRef<HTMLElement>(null)

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })

  const x = useTransform(scrollYProgress, [0, 1], ['0%', `${-100 * speed}%`])

  return { ref, x }
}

/**
 * Hook to check if user prefers reduced motion
 */
export function usePrefersReducedMotion(): boolean {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(() => {
    if (typeof window === 'undefined') return false
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches
  })

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')

    const handleChange = (event: MediaQueryListEvent) => {
      setPrefersReducedMotion(event.matches)
    }

    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [])

  return prefersReducedMotion
}

export default useScrollReveal
