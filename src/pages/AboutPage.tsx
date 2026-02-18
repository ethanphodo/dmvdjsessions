import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import SEO from '../components/SEO'
import coverPhoto from '../assets/djsessionscoverphoto.jpg'

export default function AboutPage() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: '#050505' }}>
      <SEO
        title="About | DMV DJ Sessions"
        description="DMV DJ Sessions documents the sonic evolution of Washington DC, Maryland, and Virginia through cinematic DJ sessions."
      />

      {/* Hero Image - Short strip */}
      <section className="relative h-[280px] md:h-[380px] overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={coverPhoto}
            alt="DMV DJ Sessions"
            className="w-full h-full object-cover grayscale"
            style={{ objectPosition: 'center 30%' }}
          />
        </div>
        {/* Bottom fade to black */}
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(to bottom, transparent 0%, transparent 60%, #050505 100%)',
          }}
        />
      </section>

      {/* About Content */}
      <section className="min-h-[calc(100vh-280px)] md:min-h-[calc(100vh-380px)] flex items-center justify-center" style={{ backgroundColor: '#050505' }}>
        <div className="w-full max-w-3xl mx-auto px-6 text-center flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#F2F0ED] mb-10 tracking-tight">
              ABOUT US
            </h1>

            <div className="space-y-6 text-[#999591] text-xs md:text-sm leading-relaxed tracking-[0.08em] uppercase">
              <p>
                DMV DJ Sessions is a new platform dedicated to documenting the underground electronic music scene across Washington DC, Maryland, and Virginia through cinematic live recordings and curated events.
              </p>

              <p>
                We're building something for the selectors who move the needle—the DJs, producers, and tastemakers who define the sound of our region. We believe in{' '}
                <span className="text-[#A68B6A]">dancers over talkers</span>,{' '}
                <span className="text-[#A68B6A]">curated over chaotic</span>, and{' '}
                <span className="text-[#A68B6A]">performance over personality</span>.
              </p>

              <p>
                First sessions coming soon. Applications now open for DJs across the DMV who want to be part of the movement.
              </p>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-12">
              <Link
                to="/apply"
                className="w-full sm:w-auto inline-flex items-center justify-center px-16 py-4 border border-[#F2F0ED] text-[#F2F0ED] text-xs font-medium uppercase tracking-[0.15em] hover:bg-[#F2F0ED] hover:text-[#050505] transition-all"
              >
                Apply
              </Link>
              <Link
                to="/partners"
                className="w-full sm:w-auto inline-flex items-center justify-center px-16 py-4 bg-[#F2F0ED] text-[#050505] text-xs font-medium uppercase tracking-[0.15em] hover:bg-[#999591] transition-all"
              >
                Partner With Us
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
