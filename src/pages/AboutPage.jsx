import { useRef } from 'react'
import { motion, useScroll, useTransform, useSpring } from 'framer-motion'
import { Link } from 'react-router-dom'
import SEO from '../components/SEO'
import { ScrubText, RevealText } from '../components/ui/ScrubText'

// Live metadata stats
const PULSE_DATA = {
  sessions: 72,
  minutes: 4200,
  collective: 'DMV Local Collective',
  established: 2024,
}

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
    color: '#D6A756',
    vibe: 'Controlled lighting. Focused sound. Pure performance.',
    image: '/images/studio-session.jpg',
  },
  {
    name: 'Warehouse',
    location: 'Maryland',
    color: '#8B1E2D',
    vibe: 'Industrial energy. Dark textures. Harder sounds.',
    image: '/images/warehouse-session.jpg',
  },
  {
    name: 'Rooftop',
    location: 'Virginia',
    color: '#7FAFD4',
    vibe: 'Golden hour. Open air. Elevated atmosphere.',
    image: '/images/rooftop-session.jpg',
  },
]

export default function AboutPage() {
  const heroRef = useRef(null)

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  })

  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  const heroScale = useTransform(scrollYProgress, [0, 0.5], [1, 1.1])
  const heroY = useTransform(scrollYProgress, [0, 0.5], [0, 100])

  return (
    <div className="min-h-screen bg-black">
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
      >
        {/* Video/Image Background with Grain */}
        <motion.div
          className="absolute inset-0 z-0"
          style={{ scale: heroScale, opacity: heroOpacity }}
        >
          {/* Gradient overlay for depth */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black z-10" />

          {/* Grainy texture overlay */}
          <div className="absolute inset-0 z-20 opacity-40 mix-blend-overlay bg-[url('data:image/svg+xml,%3Csvg viewBox=%220 0 256 256%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noise%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.8%22 numOctaves=%224%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noise)%22/%3E%3C/svg%3E')]" />

          {/* Background gradient (placeholder for video) */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#0a0a0a] via-[#111] to-black">
            <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-[#D6A756]/5 rounded-full blur-[150px]" />
            <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-[#8B1E2D]/5 rounded-full blur-[150px]" />
          </div>
        </motion.div>

        {/* Hero Content */}
        <motion.div
          className="relative z-30 container-main text-center px-6"
          style={{ y: heroY, opacity: heroOpacity }}
        >
          {/* Technical Label */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="font-technical text-[9px] tracking-super-wide text-[#D6A756] uppercase mb-8"
          >
            Est. {PULSE_DATA.established} // {PULSE_DATA.collective}
          </motion.p>

          {/* Mission Statement */}
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="font-display font-black italic text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl uppercase tracking-ultra-tight leading-[0.85] mb-8"
          >
            Redefining
            <br />
            <span className="text-white/70">the Sound of</span>
            <br />
            <span className="text-[#D6A756]">the District.</span>
          </motion.h1>

          {/* Subline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-gray-500 text-lg md:text-xl max-w-2xl mx-auto"
          >
            Capturing the sonic evolution of the DMV through high-fidelity live broadcasts.
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
              className="flex flex-col items-center gap-2"
            >
              <span className="font-technical text-[9px] tracking-super-wide text-gray-600 uppercase">
                Scroll
              </span>
              <div className="w-px h-12 bg-gradient-to-b from-white/20 to-transparent" />
            </motion.div>
          </motion.div>
        </motion.div>
      </section>

      {/* ============================================
          SECTION B: THE PULSE (Live Metadata)
          ============================================ */}
      <section className="py-16 border-y border-white/10 bg-black/50 backdrop-blur-xl">
        <div className="container-main">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
            <PulseItem label="Sessions Recorded" value={PULSE_DATA.sessions} suffix="+" />
            <PulseItem label="Minutes of Audio" value={`${(PULSE_DATA.minutes / 1000).toFixed(1)}k`} />
            <PulseItem label="DMV Artists" value="32" suffix="+" />
            <PulseItem label="Series Active" value="3" />
          </div>
        </div>
      </section>

      {/* ============================================
          SECTION C: THE PILLARS
          ============================================ */}
      <section className="py-32 md:py-40 bg-black">
        <div className="container-main">
          {/* Section Label */}
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="font-technical text-[9px] tracking-super-wide text-gray-600 uppercase mb-16"
          >
            Core Principles
          </motion.p>

          {/* Pillars Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16 border-t border-white/10 pt-12">
            {PILLARS.map((pillar, index) => (
              <motion.div
                key={pillar.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group"
              >
                <p className="font-technical text-[#D6A756] text-[10px] mb-6 tracking-super-wide">
                  {pillar.id} // CORE
                </p>
                <h3 className="font-display font-bold italic text-2xl md:text-3xl uppercase tracking-ultra-tight mb-4 group-hover:text-[#D6A756] transition-colors duration-300">
                  {pillar.title}
                </h3>
                <p className="text-gray-500 leading-relaxed">
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
      <section className="py-32 md:py-40 bg-[#0A0A0A] relative overflow-hidden">
        {/* Subtle gradient accent */}
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-[#D6A756]/5 to-transparent" />

        <div className="container-narrow relative z-10">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="font-technical text-[9px] tracking-super-wide text-gray-600 uppercase mb-16 text-center"
          >
            Our Philosophy
          </motion.p>

          <div className="space-y-8 md:space-y-12 text-center">
            {[
              { text: 'Curated over chaotic.', highlight: false },
              { text: 'Minimal over loud.', highlight: false },
              { text: 'Cinematic over casual.', highlight: false },
              { text: 'Performance over personality.', highlight: true },
            ].map((item, i) => (
              <RevealText
                key={i}
                as="p"
                className={`text-3xl md:text-4xl lg:text-5xl uppercase tracking-ultra-tight ${
                  item.highlight ? 'text-white' : 'text-gray-600'
                }`}
              >
                {item.text}
              </RevealText>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================
          SECTION E: SERIES (Horizontal Scroll)
          ============================================ */}
      <section className="py-32 md:py-40 bg-black">
        <div className="container-main mb-12">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="font-technical text-[9px] tracking-super-wide text-gray-600 uppercase"
          >
            The Series
          </motion.p>
        </div>

        {/* Horizontal Scroll Container */}
        <div className="overflow-x-auto scrollbar-hide">
          <div className="flex gap-6 px-6 md:px-12 pb-8" style={{ width: 'max-content' }}>
            {SERIES.map((series, index) => (
              <motion.div
                key={series.name}
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group relative w-[85vw] md:w-[500px] flex-shrink-0"
              >
                {/* Series Card */}
                <div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-[#111] border border-white/10">
                  {/* Color Accent Bar */}
                  <div
                    className="absolute top-0 left-0 right-0 h-1 z-10"
                    style={{ backgroundColor: series.color }}
                  />

                  {/* Gradient Background (placeholder for image) */}
                  <div
                    className="absolute inset-0 opacity-20"
                    style={{
                      background: `radial-gradient(circle at 30% 70%, ${series.color}40 0%, transparent 60%)`,
                    }}
                  />

                  {/* Content Overlay */}
                  <div className="absolute inset-0 flex flex-col justify-end p-8 bg-gradient-to-t from-black/90 via-black/50 to-transparent">
                    <p className="font-technical text-[10px] tracking-super-wide uppercase mb-2" style={{ color: series.color }}>
                      {series.location}
                    </p>
                    <h3 className="font-display font-bold italic text-3xl md:text-4xl uppercase tracking-ultra-tight mb-3 group-hover:translate-x-2 transition-transform">
                      {series.name}
                    </h3>
                    <p className="text-gray-500 text-sm">
                      {series.vibe}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Scroll hint */}
        <div className="container-main mt-6">
          <p className="font-technical text-[9px] tracking-super-wide text-gray-700 uppercase flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
            Scroll to explore
          </p>
        </div>
      </section>

      {/* ============================================
          SECTION F: THE TEAM / COLLECTIVE
          ============================================ */}
      <section className="py-32 md:py-40 bg-[#0A0A0A] border-t border-white/10">
        <div className="container-narrow text-center">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="font-technical text-[9px] tracking-super-wide text-gray-600 uppercase mb-8"
          >
            The Collective
          </motion.p>

          <ScrubText
            as="h2"
            className="text-4xl md:text-5xl lg:text-6xl uppercase tracking-ultra-tight mb-8"
            minWeight={500}
            maxWeight={900}
          >
            Built by DJs,
            <br />
            <span className="text-gray-600">for DJs.</span>
          </ScrubText>

          <p className="text-gray-500 text-lg md:text-xl max-w-2xl mx-auto mb-12">
            A collective of artists, engineers, and producers united by one mission:
            to give the DMV underground the platform it deserves.
          </p>

          <Link
            to="/submit"
            className="inline-flex items-center gap-3 px-8 py-4 bg-white text-black font-display font-bold italic text-sm uppercase tracking-wide-caps hover:bg-[#D6A756] transition-colors"
          >
            Join the Collective
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </section>

      {/* ============================================
          SECTION G: CONTACT
          ============================================ */}
      <section className="py-32 md:py-40 bg-black border-t border-white/10">
        <div className="container-narrow text-center">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="font-technical text-[9px] tracking-super-wide text-gray-600 uppercase mb-8"
          >
            Get in Touch
          </motion.p>

          <a
            href="mailto:hello@dmvdjsessions.com"
            className="font-display font-bold italic text-3xl md:text-4xl lg:text-5xl uppercase tracking-ultra-tight text-white hover:text-[#D6A756] transition-colors"
          >
            hello@dmvdjsessions.com
          </a>

          <div className="flex justify-center gap-12 mt-12">
            <a
              href="https://instagram.com/dmvdjsessions"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col items-center gap-2"
            >
              <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center group-hover:border-[#D6A756] group-hover:bg-[#D6A756]/10 transition-all">
                <svg className="w-5 h-5 text-white group-hover:text-[#D6A756] transition-colors" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </div>
              <span className="font-technical text-[9px] tracking-super-wide text-gray-600 uppercase group-hover:text-[#D6A756] transition-colors">
                Instagram
              </span>
            </a>

            <a
              href="https://youtube.com/@dmvdjsessions"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col items-center gap-2"
            >
              <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center group-hover:border-[#D6A756] group-hover:bg-[#D6A756]/10 transition-all">
                <svg className="w-5 h-5 text-white group-hover:text-[#D6A756] transition-colors" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
              </div>
              <span className="font-technical text-[9px] tracking-super-wide text-gray-600 uppercase group-hover:text-[#D6A756] transition-colors">
                YouTube
              </span>
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}

// Pulse item component for live metadata
function PulseItem({ label, value, suffix = '' }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="text-center"
    >
      <p className="font-display font-bold italic text-3xl md:text-4xl text-white mb-2">
        {value}{suffix}
      </p>
      <p className="font-technical text-[9px] tracking-super-wide text-gray-600 uppercase">
        {label}
      </p>
    </motion.div>
  )
}
