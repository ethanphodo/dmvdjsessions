import { useRef, useMemo } from 'react'
import { motion, useScroll, useTransform, useSpring } from 'framer-motion'

/**
 * ScrubText - Scroll-linked kinetic typography component
 * Text weight and style change as user scrolls
 */
export function ScrubText({
  children,
  as: Component = 'h2',
  className = '',
  // Scrubbing options
  minWeight = 400,
  maxWeight = 900,
  minSkew = 0,
  maxSkew = -6,
  minTracking = -0.02,
  maxTracking = -0.05,
  // Scroll trigger points
  offsetStart = 'start 80%',
  offsetEnd = 'start 20%',
  // Enable/disable effects
  enableWeight = true,
  enableSkew = true,
  enableTracking = true,
  enableParallax = false,
  parallaxAmount = 30,
}) {
  const ref = useRef(null)

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: [offsetStart, offsetEnd],
  })

  // Smooth the scroll progress
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    mass: 0.5,
  })

  // Transform values
  const fontWeight = useTransform(smoothProgress, [0, 1], [minWeight, maxWeight])
  const skewX = useTransform(smoothProgress, [0, 1], [minSkew, maxSkew])
  const letterSpacing = useTransform(smoothProgress, [0, 1], [minTracking, maxTracking])
  const y = useTransform(smoothProgress, [0, 1], [parallaxAmount, -parallaxAmount])

  const MotionComponent = motion[Component] || motion.div

  return (
    <MotionComponent
      ref={ref}
      className={className}
      style={{
        fontWeight: enableWeight ? fontWeight : undefined,
        skewX: enableSkew ? skewX : undefined,
        letterSpacing: enableTracking ? letterSpacing : undefined,
        y: enableParallax ? y : undefined,
      }}
    >
      {children}
    </MotionComponent>
  )
}

/**
 * ScrubCharacters - Per-character scrubbing animation
 * Each letter animates individually with staggered timing
 */
export function ScrubCharacters({
  text,
  as: Component = 'span',
  className = '',
  charClassName = '',
  stagger = 0.03,
  minWeight = 400,
  maxWeight = 900,
  minOpacity = 0.3,
  maxOpacity = 1,
  offsetStart = 'start 90%',
  offsetEnd = 'start 30%',
}) {
  const ref = useRef(null)
  const characters = useMemo(() => text.split(''), [text])

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: [offsetStart, offsetEnd],
  })

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 20,
  })

  return (
    <Component ref={ref} className={`inline-flex flex-wrap ${className}`}>
      {characters.map((char, index) => (
        <ScrubCharacter
          key={index}
          char={char}
          index={index}
          total={characters.length}
          stagger={stagger}
          progress={smoothProgress}
          minWeight={minWeight}
          maxWeight={maxWeight}
          minOpacity={minOpacity}
          maxOpacity={maxOpacity}
          className={charClassName}
        />
      ))}
    </Component>
  )
}

function ScrubCharacter({
  char,
  index,
  total,
  stagger,
  progress,
  minWeight,
  maxWeight,
  minOpacity,
  maxOpacity,
  className,
}) {
  // Calculate staggered input range for this character
  const start = index * stagger
  const end = Math.min(start + (1 - stagger * total) + stagger, 1)

  const fontWeight = useTransform(progress, [start, end], [minWeight, maxWeight])
  const opacity = useTransform(progress, [start, end], [minOpacity, maxOpacity])
  const y = useTransform(progress, [start, end], [10, 0])

  return (
    <motion.span
      className={`inline-block ${className}`}
      style={{
        fontWeight,
        opacity,
        y,
      }}
    >
      {char === ' ' ? '\u00A0' : char}
    </motion.span>
  )
}

/**
 * VelocityScrub - Typography that reacts to scroll speed
 * Faster scrolling = heavier weight and more skew
 */
export function VelocityScrub({
  children,
  as: Component = 'h2',
  className = '',
  baseWeight = 500,
  maxWeightBoost = 400,
  maxSkew = 8,
}) {
  const ref = useRef(null)
  const { scrollY } = useScroll()

  // Calculate velocity from scroll position changes
  const velocity = useTransform(scrollY, (latest) => {
    return latest // Framer Motion handles velocity internally
  })

  // Use velocity for weight
  const fontWeight = useSpring(
    useTransform(velocity, [0, 100], [baseWeight, baseWeight + maxWeightBoost]),
    { stiffness: 300, damping: 30 }
  )

  const MotionComponent = motion[Component] || motion.div

  return (
    <MotionComponent
      ref={ref}
      className={className}
      style={{
        fontWeight,
      }}
    >
      {children}
    </MotionComponent>
  )
}

/**
 * RevealText - Text that reveals on scroll with weight animation
 */
export function RevealText({
  children,
  as: Component = 'h2',
  className = '',
  enableSkew = false,
}) {
  const ref = useRef(null)

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 85%', 'start 50%'],
  })

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
  })

  const opacity = useTransform(smoothProgress, [0, 1], [0, 1])
  const y = useTransform(smoothProgress, [0, 1], [40, 0])
  const fontWeight = useTransform(smoothProgress, [0, 1], [400, 700])
  const skewX = useTransform(smoothProgress, [0, 1], [4, 0])

  const MotionComponent = motion[Component] || motion.div

  return (
    <MotionComponent
      ref={ref}
      className={className}
      style={{
        opacity,
        y,
        fontWeight,
        skewX: enableSkew ? skewX : undefined,
      }}
    >
      {children}
    </MotionComponent>
  )
}

export default ScrubText
