import { useState } from 'react'

function NewsletterSignup({ variant = 'default' }) {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState('idle') // idle, loading, success, error

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!email) return

    setStatus('loading')

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // In production, integrate with email service (Mailchimp, ConvertKit, etc.)
    setStatus('success')
    setEmail('')
  }

  if (status === 'success') {
    return (
      <div className="text-center animate-fade-in">
        <p className="text-white font-medium mb-2">You're in.</p>
        <p className="text-[#888] text-sm">Watch your inbox for exclusive drops.</p>
      </div>
    )
  }

  const isCompact = variant === 'compact'

  return (
    <div className="flex justify-center w-full">
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row items-stretch gap-3">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="your@email.com"
          required
          className="w-64 px-4 py-3 bg-[#141414] border border-[#1C1C1C] text-white placeholder:text-[#444] focus:outline-none focus:border-white transition-colors text-sm"
        />
        <button
          type="submit"
          disabled={status === 'loading'}
          className="btn-hover px-6 py-3 bg-white text-black text-sm font-medium uppercase tracking-wide hover:bg-[#E5E5E5] disabled:opacity-50 disabled:cursor-not-allowed transition-colors whitespace-nowrap"
        >
          {status === 'loading' ? 'Joining...' : 'Join List'}
        </button>
      </form>
    </div>
  )
}

export default NewsletterSignup
