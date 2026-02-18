import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import SEO from '../components/SEO'

interface Event {
  id: string
  name: string
  date: string
  time: string
  location: string
  status: 'available' | 'limited' | 'sold_out'
  posterStyle: string
}

const EVENTS: Event[] = [
  {
    id: 'dmv-001',
    name: 'DMV: 001',
    date: '03.15.26',
    time: '22:00',
    location: 'DC Warehouse',
    status: 'available',
    posterStyle: 'linear-gradient(180deg, #1a1a1a 0%, #0a0a0a 50%, #151515 100%)',
  },
  {
    id: 'dmv-002',
    name: 'DMV: 002',
    date: '04.12.26',
    time: '21:00',
    location: 'Baltimore Loft',
    status: 'limited',
    posterStyle: 'linear-gradient(135deg, #0d0d0d 0%, #1a1a1a 50%, #0a0a0a 100%)',
  },
  {
    id: 'dmv-003',
    name: 'DMV: 003',
    date: '05.24.26',
    time: '23:00',
    location: 'Arlington Studio',
    status: 'available',
    posterStyle: 'linear-gradient(180deg, #151515 0%, #0a0a0a 100%)',
  },
  {
    id: 'dmv-004',
    name: 'DMV: 004',
    date: '06.07.26',
    time: '22:00',
    location: 'TBA',
    status: 'available',
    posterStyle: 'linear-gradient(225deg, #1a1a1a 0%, #0d0d0d 50%, #151515 100%)',
  },
]

export default function EventsPage() {
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null)
  const [artistCode, setArtistCode] = useState('')
  const [codeError, setCodeError] = useState(false)
  const [isValidating, setIsValidating] = useState(false)

  const handleRetrieveAccess = (event: Event) => {
    if (event.status === 'sold_out') return
    setSelectedEvent(event)
    setArtistCode('')
    setCodeError(false)
  }

  const handleCodeSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!artistCode.trim()) return

    setIsValidating(true)
    setCodeError(false)

    // Simulate validation
    await new Promise(resolve => setTimeout(resolve, 800))

    // For now, no valid codes - trigger shake animation
    setCodeError(true)
    setIsValidating(false)
  }

  const closeModal = () => {
    setSelectedEvent(null)
    setArtistCode('')
    setCodeError(false)
  }

  const getStatusBadge = (status: Event['status']) => {
    switch (status) {
      case 'sold_out':
        return (
          <span className="absolute top-4 right-4 z-10 px-3 py-1.5 bg-[#1a1a1a] border border-[#333] text-[#666] text-[10px] uppercase tracking-[0.15em] font-medium">
            Sold Out
          </span>
        )
      case 'limited':
        return (
          <span className="absolute top-4 right-4 z-10 px-3 py-1.5 bg-[#8B7355] text-[#050505] text-[10px] uppercase tracking-[0.15em] font-medium">
            Limited
          </span>
        )
      default:
        return null
    }
  }

  // Shake animation for invalid code
  const shakeAnimation = {
    x: codeError ? [0, -10, 10, -10, 10, 0] : 0,
    transition: { duration: 0.4 }
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#050505', paddingTop: '12vh', paddingBottom: '15vh' }}>
      <SEO
        title="Events | DMV DJ Sessions"
        description="Exclusive underground events across Washington DC, Maryland, and Virginia. Artist code required for access."
      />

      {/* Header */}
      <div className="w-full max-w-[1400px] mx-auto px-6 md:px-12 mb-[8vh]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-[#F2F0ED] tracking-tighter mb-6">
            DMV: <span className="text-[#999591]">EVENTS</span>
          </h1>
          <p className="text-[#4A4845] text-xs uppercase tracking-[0.25em] font-mono max-w-2xl mx-auto text-center">
            Free entry with artist access code — Retrieve your ticket below
          </p>
        </motion.div>
      </div>

      {/* Events Grid - Fluid with auto-fit */}
      <div className="w-full max-w-[1400px] mx-auto px-6 md:px-12">
        <div
          className="grid gap-8"
          style={{
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          }}
        >
          {EVENTS.map((event, index) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="group"
            >
              {/* Poster - 2:3 Aspect Ratio with Hover Zoom */}
              <div
                className="relative aspect-[2/3] mb-5 overflow-hidden cursor-pointer"
                onClick={() => handleRetrieveAccess(event)}
              >
                {/* Background */}
                <div
                  className="absolute inset-0 transition-transform duration-500 ease-out group-hover:scale-105"
                  style={{ background: event.posterStyle }}
                />

                {/* Grain/Noise Overlay */}
                <div
                  className="absolute inset-0 opacity-50 mix-blend-overlay pointer-events-none"
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
                  }}
                />

                {/* Abstract Industrial Lines */}
                <div className="absolute inset-0 flex items-center justify-center opacity-30">
                  <div className="w-[120%] h-px bg-gradient-to-r from-transparent via-[#444] to-transparent rotate-12" />
                </div>
                <div className="absolute inset-0 flex items-center justify-center opacity-20">
                  <div className="w-px h-[120%] bg-gradient-to-b from-transparent via-[#333] to-transparent -rotate-12" />
                </div>

                {/* DMV Logo Mark */}
                <div className="absolute top-6 left-6 z-10">
                  <div className="text-[#F2F0ED]/20 text-[10px] font-bold tracking-[0.3em] uppercase">
                    DMV DJ Sessions
                  </div>
                </div>

                {/* Event Info Overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 via-black/40 to-transparent">
                  <p className="text-[10px] tracking-[0.3em] text-[#666] uppercase mb-2 font-mono">
                    {event.date} // {event.time}
                  </p>
                  <h3 className="text-3xl md:text-4xl font-black text-[#F2F0ED] tracking-tight">
                    {event.name}
                  </h3>
                </div>

                {/* Status Badge */}
                {getStatusBadge(event.status)}

                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-[#8B7355]/0 group-hover:bg-[#8B7355]/10 transition-colors duration-300 pointer-events-none" />
              </div>

              {/* Event Metadata */}
              <div className="space-y-4">
                <div className="flex items-center justify-between font-mono text-[#4A4845] text-xs tracking-wider">
                  <span>{event.date} // {event.time}</span>
                  <span className="uppercase">{event.location}</span>
                </div>

                {/* CTA Button with Bronze Glow */}
                <button
                  onClick={() => handleRetrieveAccess(event)}
                  disabled={event.status === 'sold_out'}
                  className={`w-full py-4 text-xs font-medium uppercase tracking-[0.15em] transition-all duration-300 border ${
                    event.status === 'sold_out'
                      ? 'border-[#222] text-[#444] cursor-not-allowed'
                      : 'border-[#333] text-[#F2F0ED] hover:border-[#8B7355] hover:shadow-[0_0_20px_rgba(139,115,85,0.3)] hover:bg-[#F2F0ED] hover:text-[#050505]'
                  }`}
                >
                  {event.status === 'sold_out' ? 'Sold Out' : 'Retrieve Access'}
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Artist Code Modal */}
      <AnimatePresence>
        {selectedEvent && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeModal}
              className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md"
            />

            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-6"
            >
              <div
                className="relative w-full max-w-md p-10 border border-[#222]"
                style={{ backgroundColor: '#0a0a0a' }}
              >
                {/* Close Button */}
                <button
                  onClick={closeModal}
                  className="absolute top-5 right-5 p-2 text-[#666] hover:text-[#F2F0ED] transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>

                {/* Modal Header */}
                <div className="text-center mb-10">
                  <p className="text-[10px] tracking-[0.3em] text-[#4A4845] uppercase mb-4 font-mono">
                    {selectedEvent.date} // {selectedEvent.time}
                  </p>
                  <h2 className="text-3xl md:text-4xl font-black text-[#F2F0ED] tracking-tight mb-3">
                    {selectedEvent.name}
                  </h2>
                  <p className="text-[#666] text-sm font-mono uppercase tracking-wider">
                    {selectedEvent.location}
                  </p>
                </div>

                {/* Code Input with Shake Animation */}
                <form onSubmit={handleCodeSubmit} className="space-y-5">
                  <div>
                    <label className="block text-[10px] tracking-[0.25em] text-[#4A4845] uppercase mb-4 text-center font-mono">
                      Input Artist Key
                    </label>
                    <motion.div animate={shakeAnimation}>
                      <input
                        type="text"
                        value={artistCode}
                        onChange={(e) => {
                          setArtistCode(e.target.value.toUpperCase())
                          setCodeError(false)
                        }}
                        placeholder="ARTIST-KEY-2026"
                        autoFocus
                        className={`w-full px-5 py-4 bg-[#121212] border text-[#F2F0ED] text-center placeholder:text-[#333] focus:outline-none transition-colors tracking-[0.15em] uppercase font-mono ${
                          codeError ? 'border-[#8B7355]' : 'border-[#222] focus:border-[#F2F0ED]'
                        }`}
                      />
                    </motion.div>
                  </div>

                  {codeError && (
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-[#8B7355] text-xs text-center tracking-wide font-mono"
                    >
                      Invalid key. Contact artist for access.
                    </motion.p>
                  )}

                  <button
                    type="submit"
                    disabled={isValidating || !artistCode.trim()}
                    className="w-full py-4 bg-[#F2F0ED] text-[#050505] text-xs font-bold uppercase tracking-[0.15em] hover:bg-[#8B7355] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isValidating ? 'Validating...' : 'Retrieve Ticket'}
                  </button>
                </form>

                {/* Help Text */}
                <div className="mt-10 pt-6 border-t border-[#1a1a1a] text-center">
                  <p className="text-[#4A4845] text-[11px] font-mono tracking-wide leading-relaxed">
                    Keys are distributed through our artist network.
                    <br />
                    <span className="text-[#666]">No key? You know someone who does.</span>
                  </p>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}
