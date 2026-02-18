import { useRef, useMemo } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Link } from 'react-router-dom'
import SEO from '../components/SEO'
import { getStats } from '../data/videos'
import { djs } from '../data/djs'
import { seriesData } from '../data/series'

// Core pillars
const PILLARS = [
  {
    id: '01',
    title: 'Curated Lineups',
    desc: 'Focusing on the selectors who move the needle in the DMV underground. Every artist is hand-picked for their unique sonic identity.',
  },
  {
    id: '02',
    title: 'Cinematic Visuals',
    desc: 'High-fidelity 4K multi-cam recording sessions designed for a global digital audience. Every frame is intentional.',
  },
  {
    id: '03',
    title: 'Warehouse Culture',
    desc: 'Preserving the raw, industrial energy of DC and Maryland nightlife. The venue becomes the instrument.',
  },
]

// Series data for horizontal scroll
const SERIES = [
  {
    name: 'Studio',
    location: 'Washington, DC',
    color: '#E8E4E0',
    vibe: 'Controlled lighting. Focused sound. Pure performance.',
    image: '/images/studio-session.jpg',
  },
  {
    name: 'Warehouse',
    location: 'Maryland',
    color: '#8B7355',
    vibe: 'Industrial energy. Dark textures. Harder sounds.',
    image: '/images/warehouse-session.jpg',
  },
  {
    name: 'Rooftop',
    location: 'Virginia',
    color: '#C4C0BC',
    vibe: 'Golden hour. Open air. Elevated atmosphere.',
    image: '/images/rooftop-session.jpg',
  },
]

export default function AboutPage() {
  const heroRef = useRef(null)

  // Compute stats from actual data
  const stats = useMemo(() => {
    const videoStats = getStats()
    return {
      sessions: videoStats.sessions,
      hours: videoStats.totalHours,
      artists: djs.length,
      series: seriesData.length,
    }
  }, [])

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  })

  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  const heroScale = useTransform(scrollYProgress, [0, 0.5], [1, 1.1])
  const heroY = useTransform(scrollYProgress, [0, 0.5], [0, 100])

  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--black)' }}>
      <SEO
        title="About | DMV DJ Sessions"
        description="Capturing the sonic evolution of the DMV through high-fidelity live broadcasts. Curated sessions from Washington DC, Maryland, and Virginia's finest selectors."
        keywords="DMV DJ collective, Washington DC underground music, Maryland warehouse sessions, Virginia rooftop DJ sets"
      />

      {/* ============================================
          SECTION A: CINEMATIC HERO
          ============================================ */}
      <section
        ref={heroRef}
        className="relative h-screen flex items-center justify-center overflow-hidden"
        style={{ backgroundColor: 'var(--black)' }}
      >
        {/* Static background that doesn't fade */}
        <div className="absolute inset-0 z-0" style={{ background: 'linear-gradient(to bottom right, var(--charcoal), var(--dark-gray), var(--black))' }} />

        {/* Video/Image Background with Grain - fades on scroll */}
        <motion.div
          className="absolute inset-0 z-1"
          style={{ scale: heroScale, opacity: heroOpacity }}
        >
          {/* Gradient overlay for depth */}
          <div className="absolute inset-0 z-10" style={{ background: 'linear-gradient(to bottom, rgba(var(--black-rgb, 0,0,0), 0.6), rgba(var(--black-rgb, 0,0,0), 0.4), var(--black))' }} />

          {/* Grainy texture overlay */}
          <div className="absolute inset-0 z-20 opacity-20 mix-blend-overlay bg-[url('data:image/svg+xml,%3Csvg viewBox=%220 0 256 256%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noise%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.8%22 numOctaves=%224%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noise)%22/%3E%3C/svg%3E')]" />
        </motion.div>

        {/* Hero Content */}
        <motion.div
          className="relative z-30 container-main text-center px-6"
          style={{ y: heroY, opacity: heroOpacity }}
        >
          {/* Simple Label */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-xs tracking-widest text-gray-500 uppercase mb-8"
          >
            About
          </motion.p>

          {/* Mission Statement - Simplified */}
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="font-display font-bold text-4xl sm:text-5xl md:text-6xl lg:text-7xl uppercase tracking-tight leading-[0.9] mb-8"
          >
            Capturing the sound
            <br />
            <span className="text-gray-500">of the DMV.</span>
          </motion.h1>

          {/* Subline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-gray-600 text-base md:text-lg text-center"
          >
            High-fidelity sessions from Washington DC, Maryland, and Virginia.
          </motion.p>

          {/* Scroll Indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
            className="absolute bottom-12 left-1/2 -translate-x-1/2"
          >
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
              className="w-px h-12 bg-gradient-to-b from-white/20 to-transparent"
            />
          </motion.div>
        </motion.div>
      </section>

      {/* ============================================
          SECTION B: THE PULSE (Live Metadata)
          ============================================ */}
      <section className="py-12 border-y border-white/5">
        <div className="container-main">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
            <PulseItem label="Sessions" value={stats.sessions} suffix="+" />
            <PulseItem label="Hours" value={stats.hours} suffix="+" />
            <PulseItem label="Artists" value={stats.artists} suffix="+" />
            <PulseItem label="Series" value={stats.series} />
          </div>
        </div>
      </section>

      {/* ============================================
          SECTION C: THE PILLARS
          ============================================ */}
      <section className="py-24 md:py-32" style={{ backgroundColor: 'var(--black)' }}>
        <div className="container-narrow">
          {/* Section Label */}
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-xs tracking-widest text-gray-600 uppercase mb-12"
          >
            What We Do
          </motion.p>

          {/* Pillars Grid */}
          <div className="space-y-16">
            {PILLARS.map((pillar, index) => (
              <motion.div
                key={pillar.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
              >
                <p className="text-gray-600 text-sm mb-3">
                  {pillar.id}
                </p>
                <h3 className="text-xl md:text-2xl font-medium mb-3">
                  {pillar.title}
                </h3>
                <p className="text-gray-500 leading-relaxed max-w-xl">
                  {pillar.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================
          SECTION D: PHILOSOPHY
          ============================================ */}
      <section className="py-24 md:py-32 border-t border-white/5">
        <div className="container-narrow">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-xs tracking-widest text-gray-600 uppercase mb-12"
          >
            Philosophy
          </motion.p>

          <div className="space-y-6">
            {[
              'Curated over chaotic.',
              'Minimal over loud.',
              'Cinematic over casual.',
              'Performance over personality.',
            ].map((item, i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className={`text-xl md:text-2xl ${i === 3 ? 'text-white' : 'text-gray-600'}`}
              >
                {item}
              </motion.p>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================
          SECTION E: SERIES
          ============================================ */}
      <section className="py-24 md:py-32 border-t border-white/5">
        <div className="container-narrow">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-xs tracking-widest text-gray-600 uppercase mb-12"
          >
            The Series
          </motion.p>

          <div className="space-y-12">
            {SERIES.map((series, index) => (
              <motion.div
                key={series.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="group"
              >
                <div className="flex items-start gap-6">
                  <div
                    className="w-1 h-16 rounded-full flex-shrink-0 mt-1"
                    style={{ backgroundColor: series.color }}
                  />
                  <div>
                    <p className="text-xs text-gray-600 mb-2">{series.location}</p>
                    <h3 className="text-xl md:text-2xl font-medium mb-2">
                      {series.name}
                    </h3>
                    <p className="text-gray-500">
                      {series.vibe}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================
          SECTION F: THE TEAM / COLLECTIVE
          ============================================ */}
      <section className="py-24 md:py-32 border-t border-white/5">
        <div className="container-narrow">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-xs tracking-widest text-gray-600 uppercase mb-12"
          >
            The Collective
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-2xl md:text-3xl font-medium mb-6"
          >
            Built by DJs, for DJs.
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-gray-500 mb-10 max-w-lg"
          >
            A collective of artists, engineers, and producers giving the DMV underground the platform it deserves.
          </motion.p>

          <Link
            to="/submit"
            className="inline-flex items-center gap-2 text-sm text-white hover:text-gray-400 transition-colors"
          >
            Submit a set
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </section>

      {/* ============================================
          SECTION G: CONTACT
          ============================================ */}
      <section className="py-24 md:py-32 border-t border-white/5">
        <div className="container-narrow">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-xs tracking-widest text-gray-600 uppercase mb-12"
          >
            Contact
          </motion.p>

          <a
            href="mailto:hello@dmvdjsessions.com"
            className="text-xl md:text-2xl text-white hover:text-gray-400 transition-colors"
          >
            hello@dmvdjsessions.com
          </a>

          <div className="flex items-center gap-6 mt-10">
            <a
              href="https://instagram.com/dmvdjsessions"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-white transition-colors"
              aria-label="Instagram"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
              </svg>
            </a>

            <a
              href="https://youtube.com/@dmvdjsessions"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-white transition-colors"
              aria-label="YouTube"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
              </svg>
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}

function PulseItem({ label, value, suffix = '' }) {
  return (
    <div className="text-center">
      <p className="text-2xl md:text-3xl font-medium text-white mb-1">
        {value}{suffix}
      </p>
      <p className="text-xs text-gray-600">
        {label}
      </p>
    </div>
  )
}
