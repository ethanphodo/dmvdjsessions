import { useState } from 'react'
import { isValidEmail } from '../../utils/helpers'
import Button from '../ui/Button'

export default function NewsletterForm({ className = '' }) {
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    if (!email) {
      setError('Email is required')
      return
    }

    if (!isValidEmail(email)) {
      setError('Please enter a valid email')
      return
    }

    setIsSubmitting(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    console.log('Newsletter signup:', email)
    setIsSubmitted(true)
    setIsSubmitting(false)
  }

  if (isSubmitted) {
    return (
      <div className={`border border-[#E21D1D] bg-[#0A0A0A] p-6 text-center ${className}`}>
        <div className="flex items-center justify-center gap-2 mb-2">
          <span className="w-2 h-2 bg-[#E21D1D]" />
          <span className="font-mono text-xs uppercase text-white">SUBSCRIBED</span>
        </div>
        <p className="font-mono text-xs text-[#888]">
          You'll receive updates on new sessions and events.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className={className}>
      <div className="border border-[#1A1A1A] bg-[#0A0A0A] p-6">
        <div className="font-mono text-xs uppercase tracking-tight text-[#888] mb-4">
          NEWSLETTER
        </div>
        <p className="text-sm text-[#888] mb-4">
          Get notified when new sessions drop and upcoming events.
        </p>
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="flex-1">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              className={`
                w-full px-4 py-3
                bg-[#050505] border border-[#1A1A1A]
                text-white text-sm font-mono
                placeholder:text-[#888]/50
                focus:outline-none focus:border-[#E21D1D]
                transition-colors duration-75
                ${error ? 'border-[#E21D1D]' : ''}
              `}
            />
          </div>
          <Button type="submit" loading={isSubmitting} disabled={isSubmitting}>
            Subscribe
          </Button>
        </div>
        {error && (
          <p className="font-mono text-xs text-[#E21D1D] uppercase mt-2">
            {error}
          </p>
        )}
      </div>
    </form>
  )
}
