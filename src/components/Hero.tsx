import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, useScroll, useTransform, useSpring } from 'framer-motion'

function Hero() {
  const containerRef = useRef<HTMLElement>(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  })

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    mass: 0.5,
  })

  // Scroll-linked transforms
  const headlineY = useTransform(smoothProgress, [0, 1], [0, -100])
  const headlineOpacity = useTransform(smoothProgress, [0, 0.4, 0.8], [1, 1, 0])
  const headlineWeight = useTransform(smoothProgress, [0, 0.5], [500, 700])

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen w-full bg-black flex items-center justify-center overflow-hidden"
    >
      {/* Content */}
      <motion.div
        className="relative container-main py-32 md:py-40 lg:py-48 text-center flex flex-col items-center justify-center"
        style={{ y: headlineY, opacity: headlineOpacity }}
      >
        {/* Label */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-xs tracking-widest text-[#6B6865] uppercase mb-8 text-center w-full"
        >
          DMV DJ Sessions
        </motion.p>

        {/* Headline with scroll-linked weight */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl md:text-6xl lg:text-7xl uppercase leading-[0.95] mb-8 tracking-tight text-center w-full"
          style={{ fontWeight: headlineWeight }}
        >
          Where the next wave
          <br />
          <span className="text-[#6B6865]">plays first.</span>
        </motion.h1>

        {/* Subtext */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-base md:text-lg text-[#6B6865] mb-12 text-center w-full"
        >
          Curated DJ sessions from Washington DC, Maryland, and Virginia.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full"
        >
          <Link
            to="/submit"
            className="group inline-flex items-center justify-center px-8 py-4 bg-[#E8E4E0] text-[#0A0A0A] text-sm font-medium tracking-wide hover:bg-white transition-colors"
          >
            Submit a Set
            <svg
              className="w-4 h-4 ml-3 group-hover:translate-x-1 transition-transform"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
          <a
            href="#sessions"
            className="inline-flex items-center justify-center px-8 py-4 border border-[#6B6865] text-[#C4C0BC] text-sm tracking-wide hover:border-[#E8E4E0] hover:text-[#E8E4E0] transition-colors"
          >
            Watch Sessions
          </a>
        </motion.div>

      </motion.div>

      {/* Scroll indicator - positioned relative to section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.6 }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2"
        aria-hidden="true"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          className="w-5 h-8 border border-white/20 rounded-full flex items-start justify-center p-1"
        >
          <motion.div
            className="w-1 h-2 bg-white/40 rounded-full"
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
          />
        </motion.div>
      </motion.div>

      {/* Bottom line */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-white/5" aria-hidden="true" />
    </section>
  )
}

export default Hero
