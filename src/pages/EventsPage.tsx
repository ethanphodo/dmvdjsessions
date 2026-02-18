import { useState } from 'react'
import { motion } from 'framer-motion'
import SEO from '../components/SEO'

export default function EventsPage() {
  const [artistCode, setArtistCode] = useState('')
  const [email, setEmail] = useState('')
  const [codeError, setCodeError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [rsvpSubmitted, setRsvpSubmitted] = useState(false)

  const handleCodeSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setCodeError('')

    // For now, no valid codes - all codes show error
    if (artistCode.trim()) {
      setCodeError('Invalid artist code. Contact your connection for access.')
    }
  }

  const handleRsvpSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return

    setIsSubmitting(true)
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    setIsSubmitting(false)
    setRsvpSubmitted(true)
    setEmail('')
  }

  return (
    <div className="min-h-screen flex flex-col items-center" style={{ backgroundColor: '#050505', paddingTop: '10vh', paddingBottom: '15vh' }}>
      <SEO
        title="Events | DMV DJ Sessions"
        description="Exclusive events across Washington DC, Maryland, and Virginia. Artist code required for access."
      />

      <div className="w-full max-w-[720px] mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#F2F0ED] tracking-tight mb-4">
            DMV DJ SESSIONS: <span className="text-[#999591]">EVENTS</span>
          </h1>
          <p className="text-[#C4C0BC] leading-relaxed text-base" style={{ lineHeight: '1.6' }}>
            Our events are invite-only experiences for the DMV underground community.
          </p>
        </motion.div>

        {/* Artist Code Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-16"
        >
          <div className="border border-[#222] p-8 md:p-10">
            <h2 className="text-sm font-medium uppercase tracking-[0.15em] text-[#F2F0ED] mb-2 text-center">
              Artist Access
            </h2>
            <p className="text-[11px] uppercase tracking-[0.2em] text-[#999591]/60 mb-8 text-center">
              Enter your code to view upcoming events
            </p>

            <form onSubmit={handleCodeSubmit} className="space-y-4">
              <input
                type="text"
                value={artistCode}
                onChange={(e) => setArtistCode(e.target.value.toUpperCase())}
                placeholder="ARTIST CODE"
                className="w-full px-5 py-4 bg-[#121212] border border-[#222] text-[#F2F0ED] text-center placeholder:text-[#999591]/50 focus:outline-none focus:border-[#F2F0ED] transition-colors tracking-[0.15em] uppercase"
              />
              {codeError && (
                <p className="text-[#A68B6A] text-xs text-center tracking-wide">
                  {codeError}
                </p>
              )}
              <button
                type="submit"
                className="w-full py-4 bg-[#F2F0ED] text-[#050505] text-xs font-medium uppercase tracking-[0.15em] hover:bg-[#C4C0BC] transition-colors"
              >
                Access Events
              </button>
            </form>

            <p className="text-[#999591]/60 text-xs text-center mt-6 leading-relaxed">
              Don't have a code? Codes are distributed through our artist network.
            </p>
          </div>
        </motion.div>

        {/* Divider */}
        <div className="h-px bg-[#222] mb-16" />

        {/* RSVP Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-center"
        >
          <h2 className="text-sm font-medium uppercase tracking-[0.15em] text-[#F2F0ED] mb-2">
            Stay in the Loop
          </h2>
          <p className="text-[11px] uppercase tracking-[0.2em] text-[#999591]/60 mb-8">
            Get notified when events drop
          </p>

          {rsvpSubmitted ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <p className="text-[#F2F0ED] mb-2">You're on the list.</p>
              <p className="text-[#999591]/60 text-sm">We'll reach out when something's happening.</p>
            </motion.div>
          ) : (
            <form onSubmit={handleRsvpSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                required
                className="flex-1 px-5 py-4 bg-[#121212] border border-[#222] text-[#F2F0ED] text-center sm:text-left placeholder:text-[#999591]/50 focus:outline-none focus:border-[#F2F0ED] transition-colors"
              />
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-8 py-4 border border-[#333] text-[#F2F0ED] text-xs font-medium uppercase tracking-[0.15em] hover:border-[#F2F0ED] hover:bg-[#F2F0ED] hover:text-[#050505] transition-all disabled:opacity-50"
              >
                {isSubmitting ? '...' : 'RSVP'}
              </button>
            </form>
          )}
        </motion.div>

        {/* Coming Soon Placeholder */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-20 text-center"
        >
          <p className="text-[#999591]/40 text-xs uppercase tracking-[0.2em]">
            First events launching soon
          </p>
        </motion.div>
      </div>
    </div>
  )
}
