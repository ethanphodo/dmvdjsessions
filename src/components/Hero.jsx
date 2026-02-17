import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, useScroll, useTransform, useSpring } from 'framer-motion'

function Hero() {
  const containerRef = useRef(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  })

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    mass: 0.5,
  })

  const headlineY = useTransform(smoothProgress, [0, 1], [0, -80])
  const headlineOpacity = useTransform(smoothProgress, [0, 0.4, 0.8], [1, 1, 0])

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen w-full bg-black flex items-center justify-center overflow-hidden"
    >
      {/* Content */}
      <motion.div
        className="relative container-main py-32 md:py-40 lg:py-48 text-center"
        style={{ y: headlineY, opacity: headlineOpacity }}
      >
        {/* Label */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-xs tracking-widest text-gray-500 uppercase mb-8"
        >
          DMV DJ Sessions
        </motion.p>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl md:text-6xl lg:text-7xl font-medium uppercase leading-[0.95] mb-8 tracking-tight"
        >
          Where the next wave
          <br />
          <span className="text-gray-500">plays first.</span>
        </motion.h1>

        {/* Subtext */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-base md:text-lg text-gray-600 mb-12 max-w-md mx-auto"
        >
          Curated DJ sessions from Washington DC, Maryland, and Virginia.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link
            to="/submit"
            className="inline-flex items-center justify-center px-6 py-3 bg-white text-black text-sm font-medium hover:bg-gray-200 transition-colors"
          >
            Submit a Set
          </Link>
          <Link
            to="/sessions"
            className="inline-flex items-center justify-center px-6 py-3 border border-white/20 text-white text-sm hover:border-white/40 transition-colors"
          >
            Watch Sessions
          </Link>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.6 }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="w-px h-12 bg-gradient-to-b from-white/20 to-transparent"
          />
        </motion.div>
      </motion.div>

      {/* Bottom line */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-white/5" />
    </section>
  )
}

export default Hero
