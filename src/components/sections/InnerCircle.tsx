import { motion } from 'framer-motion'
import { useState, FormEvent } from 'react'
import { submitNewsletterSignup } from '../../lib/supabase'

const ROLES = [
  { value: 'dj', label: 'DJ' },
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

  const [submitError, setSubmitError] = useState<string | null>(null)

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (!email || !role) return

    setIsSubmitting(true)
    setSubmitError(null)

    try {
      await submitNewsletterSignup(email, role)
      setIsSubmitted(true)
      setEmail('')
      setRole('')
    } catch (error) {
      console.error('Signup error:', error)
      setSubmitError('Something went wrong. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section id="inner-circle" className="section-padding" style={{ backgroundColor: 'var(--charcoal)' }}>
      <div className="container-narrow flex flex-col items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center w-full"
        >
          <p className="text-xs tracking-[0.2em] text-[#666] uppercase mb-6">
            The Family
          </p>

          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-4 tracking-tight">
            Join the Movement
          </h2>

          <div className="space-y-1 max-w-2xl mx-auto mb-10">
            <p className="text-[#666] leading-relaxed">
              DJs, dancers, photographers, creatives, music lovers — everyone's welcome. Sign up to stay in the loop and learn how you can be a part of the family.
            </p>
          </div>

          {isSubmitted ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center"
            >
              <p className="text-white mb-2">You're in.</p>
              <p className="text-[#666] text-sm">We'll keep you posted on upcoming sessions and events.</p>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col items-center gap-3">
              {submitError && (
                <p className="text-red-400 text-sm mb-2">{submitError}</p>
              )}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                required
                className="w-full sm:w-auto sm:min-w-[200px] px-4 py-3 bg-black border border-[#333] text-white text-sm placeholder:text-[#666] focus:outline-none focus:border-white transition-colors text-center sm:text-left"
              />
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                required
                className="w-full sm:w-auto px-4 py-3 pr-10 bg-black border border-[#333] text-white text-sm focus:outline-none focus:border-white transition-colors appearance-none sm:min-w-[140px] text-center sm:text-left"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%23666'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`,
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
                className="w-full sm:w-auto px-6 py-3 bg-white text-black text-sm font-medium uppercase tracking-[0.1em] hover:bg-[#E8E4E0] disabled:opacity-50 transition-colors whitespace-nowrap"
              >
                {isSubmitting ? '...' : 'Join Us'}
              </button>
              </div>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  )
}
