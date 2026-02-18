import { motion } from 'framer-motion'
import { useState } from 'react'

const ROLES = [
  { value: 'dancer', label: 'Dancer' },
  { value: 'photographer', label: 'Photographer' },
  { value: 'creative', label: 'Creative' },
  { value: 'music-lover', label: 'Music Lover' },
]

export default function InnerCircle() {
  const [email, setEmail] = useState('')
  const [role, setRole] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!email || !role) return

    setIsSubmitting(true)
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    setIsSubmitting(false)
    setIsSubmitted(true)
    setEmail('')
    setRole('')
  }

  return (
    <section id="inner-circle" className="section-padding" style={{ backgroundColor: 'var(--charcoal)' }}>
      <div className="container-narrow">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <p className="text-xs tracking-widest text-[#6B6865] uppercase mb-6">
            The Inner Circle
          </p>

          <h2 className="text-2xl md:text-3xl lg:text-4xl font-medium text-[#E8E4E0] mb-4 tracking-tight">
            Request an invite
          </h2>

          <p className="text-[#6B6865] mb-8 max-w-lg mx-auto leading-relaxed">
            Our sessions are invite-only. Dancers, photographers, and creatives—request access to be in the room.
          </p>

          {isSubmitted ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center"
            >
              <p className="text-[#E8E4E0] mb-2">Request received.</p>
              <p className="text-[#6B6865] text-sm">We'll reach out when there's a session that fits.</p>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row items-center justify-center gap-3 max-w-lg mx-auto">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                required
                className="w-full sm:w-auto sm:min-w-[200px] px-4 py-3 bg-[#0A0A0A] border border-[#333] text-white text-sm placeholder:text-[#6B6865] focus:outline-none focus:border-[#E8E4E0] transition-colors"
              />
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                required
                className="w-full sm:w-auto px-4 py-3 bg-[#0A0A0A] border border-[#333] text-white text-sm focus:outline-none focus:border-[#E8E4E0] transition-colors appearance-none sm:min-w-[140px]"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%236B6865'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`,
                  backgroundRepeat: 'no-repeat',
                  backgroundPosition: 'right 10px center',
                  backgroundSize: '14px',
                }}
              >
                <option value="" disabled>I'm a...</option>
                {ROLES.map((r) => (
                  <option key={r.value} value={r.value}>{r.label}</option>
                ))}
              </select>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full sm:w-auto px-6 py-3 bg-[#E8E4E0] text-[#0A0A0A] text-sm font-medium uppercase tracking-wide hover:bg-white disabled:opacity-50 transition-colors whitespace-nowrap"
              >
                {isSubmitting ? '...' : 'Request Access'}
              </button>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  )
}
