import { useState } from 'react'

const ROLE_OPTIONS = [
  { value: '', label: 'Select your role' },
  { value: 'dancer', label: 'Dancer' },
  { value: 'photographer', label: 'Photographer' },
  { value: 'creative', label: 'Creative' },
  { value: 'music-lover', label: 'Music Lover' },
]

export default function WaitlistForm() {
  const [email, setEmail] = useState('')
  const [role, setRole] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [error, setError] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)

    if (!email || !role) {
      setError('Please fill in all fields')
      return
    }

    setIsSubmitting(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))
      console.log('Waitlist submission:', { email, role })
      setIsSubmitted(true)
    } catch (err) {
      setError('Something went wrong. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isSubmitted) {
    return (
      <div className="text-center py-4">
        <div className="w-12 h-12 mx-auto mb-4 bg-[#E8E4E0] rounded-full flex items-center justify-center">
          <svg className="w-6 h-6 text-[#0A0A0A]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <p className="text-white font-medium">You're on the list.</p>
        <p className="text-gray-500 text-sm mt-1">We'll be in touch.</p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-2xl mx-auto">
      <div className="flex flex-col sm:flex-row gap-3">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          className="flex-1 px-4 py-3 bg-[#1C1C1C] border border-white/10 text-white text-sm placeholder:text-gray-600 focus:outline-none focus:border-white/30 transition-colors"
          required
        />
        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className={`px-4 py-3 bg-[#1C1C1C] border border-white/10 text-sm focus:outline-none focus:border-white/30 transition-colors min-w-[160px] ${
            !role ? 'text-gray-600' : 'text-white'
          }`}
          required
        >
          {ROLE_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <button
          type="submit"
          disabled={isSubmitting}
          className="px-6 py-3 bg-[#E8E4E0] text-[#0A0A0A] text-sm font-medium hover:bg-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors whitespace-nowrap"
        >
          {isSubmitting ? 'Joining...' : 'Request Access'}
        </button>
      </div>
      {error && (
        <p className="text-sm text-red-500 mt-2">{error}</p>
      )}
    </form>
  )
}
