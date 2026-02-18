import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import SEO from '../components/SEO'

export default function AboutPage() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: '#050505' }}>
      <SEO
        title="About | DMV DJ Sessions"
        description="DMV DJ Sessions documents the sonic evolution of Washington DC, Maryland, and Virginia through cinematic DJ sessions."
      />

      {/* Hero Image */}
      <section className="relative h-[60vh] md:h-[70vh] overflow-hidden">
        {/* Placeholder gradient - replace with actual image */}
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f0f23 100%)',
          }}
        />
        {/* Overlay gradient */}
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(to bottom, transparent 0%, transparent 50%, #050505 100%)',
          }}
        />
        {/* Stage lights effect */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-0 left-1/4 w-32 h-96 bg-gradient-to-b from-green-500/40 to-transparent blur-3xl" />
          <div className="absolute top-0 right-1/4 w-32 h-96 bg-gradient-to-b from-green-400/30 to-transparent blur-3xl" />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-80 bg-gradient-to-b from-white/20 to-transparent blur-2xl" />
        </div>
      </section>

      {/* About Content */}
      <section className="py-20 md:py-32" style={{ backgroundColor: '#121212' }}>
        <div className="container-narrow text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#F2F0ED] mb-12 tracking-tight">
              ABOUT US
            </h1>

            <div className="space-y-8 text-[#999591] text-sm md:text-base leading-relaxed tracking-wide uppercase">
              <p>
                Founded in Washington DC in 2024, DMV DJ Sessions has quickly become a recognized platform championing underground electronic music through cinematic live recordings and curated events.
              </p>

              <p>
                Born from a desire to give DMV selectors the visual platform they deserve, we document the sonic evolution of DC, Maryland, and Virginia—one session at a time.
              </p>

              <p>
                DMV DJ Sessions stands as a melting pot of genres and cultures, where house, techno, amapiano, and experimental sounds converge. We believe in{' '}
                <span className="text-[#A68B6A]">dancers over talkers</span>,{' '}
                <span className="text-[#A68B6A]">curated over chaotic</span>, and{' '}
                <span className="text-[#A68B6A]">performance over personality</span>.
              </p>

              <p>
                Every session is filmed in 4K with multi-angle coverage and professional audio capture. We're not just recording sets—we're creating a visual archive of the DMV underground.
              </p>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-16">
              <Link
                to="/apply"
                className="inline-flex items-center justify-center px-10 py-4 rounded-full text-[#050505] text-xs font-medium uppercase tracking-[0.2em] hover:opacity-90 transition-all"
                style={{ background: 'linear-gradient(135deg, #A68B6A 0%, #8B7355 100%)' }}
              >
                Submit a Set
              </Link>
              <Link
                to="/partners"
                className="inline-flex items-center justify-center px-10 py-4 rounded-full border border-[#333] text-[#999591] text-xs font-medium uppercase tracking-[0.2em] hover:border-[#F2F0ED] hover:text-[#F2F0ED] transition-all"
              >
                Partner With Us
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 border-y border-[#222]" style={{ backgroundColor: '#050505' }}>
        <div className="container-main">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
            <div className="text-center">
              <p className="text-3xl md:text-4xl font-bold text-[#F2F0ED] mb-2">50+</p>
              <p className="text-[10px] uppercase tracking-[0.2em] text-[#999591]">Sessions Filmed</p>
            </div>
            <div className="text-center">
              <p className="text-3xl md:text-4xl font-bold text-[#F2F0ED] mb-2">100+</p>
              <p className="text-[10px] uppercase tracking-[0.2em] text-[#999591]">Hours of Content</p>
            </div>
            <div className="text-center">
              <p className="text-3xl md:text-4xl font-bold text-[#F2F0ED] mb-2">30+</p>
              <p className="text-[10px] uppercase tracking-[0.2em] text-[#999591]">Artists Featured</p>
            </div>
            <div className="text-center">
              <p className="text-3xl md:text-4xl font-bold text-[#F2F0ED] mb-2">3</p>
              <p className="text-[10px] uppercase tracking-[0.2em] text-[#999591]">Series Running</p>
            </div>
          </div>
        </div>
      </section>

      {/* The Series */}
      <section className="py-20 md:py-32" style={{ backgroundColor: '#050505' }}>
        <div className="container-narrow">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <p className="text-[10px] tracking-[0.3em] text-[#999591] uppercase mb-12 text-center">
              The Series
            </p>

            <div className="space-y-16">
              {/* Studio */}
              <div className="flex items-start gap-6">
                <div className="w-1 h-20 rounded-full flex-shrink-0" style={{ backgroundColor: '#F2F0ED' }} />
                <div>
                  <p className="text-[10px] tracking-[0.2em] text-[#999591]/60 uppercase mb-2">Washington, DC</p>
                  <h3 className="text-xl md:text-2xl font-medium text-[#F2F0ED] mb-2">Studio Sessions</h3>
                  <p className="text-[#999591]/80">Controlled lighting. Focused sound. Pure performance.</p>
                </div>
              </div>

              {/* Warehouse */}
              <div className="flex items-start gap-6">
                <div className="w-1 h-20 rounded-full flex-shrink-0" style={{ backgroundColor: '#A68B6A' }} />
                <div>
                  <p className="text-[10px] tracking-[0.2em] text-[#999591]/60 uppercase mb-2">Maryland</p>
                  <h3 className="text-xl md:text-2xl font-medium text-[#F2F0ED] mb-2">Warehouse Series</h3>
                  <p className="text-[#999591]/80">Industrial energy. Dark textures. Harder sounds.</p>
                </div>
              </div>

              {/* Rooftop */}
              <div className="flex items-start gap-6">
                <div className="w-1 h-20 rounded-full flex-shrink-0" style={{ backgroundColor: '#999591' }} />
                <div>
                  <p className="text-[10px] tracking-[0.2em] text-[#999591]/60 uppercase mb-2">Virginia</p>
                  <h3 className="text-xl md:text-2xl font-medium text-[#F2F0ED] mb-2">Rooftop Sessions</h3>
                  <p className="text-[#999591]/80">Golden hour. Open air. Elevated atmosphere.</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Contact */}
      <section className="py-20 md:py-32 border-t border-[#222]" style={{ backgroundColor: '#050505' }}>
        <div className="container-narrow text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <p className="text-[10px] tracking-[0.3em] text-[#999591] uppercase mb-8">
              Get In Touch
            </p>

            <a
              href="mailto:hello@dmvdjsessions.com"
              className="text-2xl md:text-3xl font-medium text-[#F2F0ED] hover:text-[#A68B6A] transition-colors"
            >
              hello@dmvdjsessions.com
            </a>

            <div className="flex items-center justify-center gap-8 mt-12">
              <a
                href="https://instagram.com/dmvdjsessions"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#999591]/60 hover:text-[#F2F0ED] transition-colors"
                aria-label="Instagram"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>
              <a
                href="https://tiktok.com/@dmvdjsessions"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#999591]/60 hover:text-[#F2F0ED] transition-colors"
                aria-label="TikTok"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
                </svg>
              </a>
              <a
                href="https://youtube.com/@dmvdjsessions"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#999591]/60 hover:text-[#F2F0ED] transition-colors"
                aria-label="YouTube"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
