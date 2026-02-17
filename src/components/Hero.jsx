import { Link } from 'react-router-dom'
import { motion, useScroll, useTransform } from 'framer-motion'
import MagneticButton from './ui/MagneticButton'
import { useKineticTypography } from '../hooks/useKineticTypography'

function Hero() {
  const { style: kineticStyle, ref: headlineRef } = useKineticTypography({
    minWeight: 700,
    maxWeight: 900,
    minSlant: 0,
    maxSlant: -8,
    scrollRange: 400,
  })
  return (
    <section className="relative min-h-screen w-full bg-black flex items-center justify-center overflow-hidden">
      {/* Gradient Accents */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 -left-1/4 w-1/2 h-1/2 bg-[#D6A756]/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 -right-1/4 w-1/2 h-1/2 bg-[#8B1E2D]/10 rounded-full blur-[120px]" />
      </div>

      {/* Content */}
      <div className="relative container-main py-32 md:py-40 lg:py-48 text-center">
        {/* Label - Technical Mono */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="font-technical text-[9px] md:text-[10px] tracking-super-wide text-[#D6A756] uppercase mb-6"
        >
          Curated Sessions // DMV
        </motion.p>

        {/* Headline - Display Font with True Italic */}
        <motion.h1
          ref={headlineRef}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="font-display text-5xl md:text-7xl lg:text-8xl uppercase leading-[0.9] mb-6 md:mb-8 kinetic-text tracking-ultra-tight"
          style={{
            fontWeight: kineticStyle.fontWeight,
            transform: kineticStyle.transform,
            fontStyle: 'italic',
          }}
        >
          Where the Next Wave
          <br />
          <span className="text-white/80">Plays First.</span>
        </motion.h1>

        {/* Subtext */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-base md:text-lg text-gray-500 mb-12 md:mb-14 max-w-xl mx-auto"
        >
          High-quality DJ sessions spotlighting the rising talent of Washington DC, Maryland, and Virginia.
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
            className="group inline-flex items-center justify-center px-8 py-4 bg-white text-black text-xs font-bold italic uppercase tracking-wide-caps hover:bg-[#D6A756] transition-colors duration-300"
          >
            Submit a Set
            <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
          <Link
            to="/sessions"
            className="inline-flex items-center justify-center px-8 py-4 border border-white/20 text-white text-xs font-bold italic uppercase tracking-wide-caps hover:border-white hover:bg-white/5 transition-all duration-300"
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
            className="w-5 h-8 border border-white/20 rounded-full flex items-start justify-center p-1"
          >
            <div className="w-1 h-2 bg-white/40 rounded-full" />
          </motion.div>
        </motion.div>
      </div>

      {/* Bottom line */}
      <div className="absolute bottom-0 left-0 right-0 divider" />
    </section>
  )
}

export default Hero
