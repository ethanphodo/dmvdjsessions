import { useState } from 'react'

export default function ApplyPage() {
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSubmitting(true)
    // Simulate submission
    await new Promise((resolve) => setTimeout(resolve, 1500))
    setSubmitting(false)
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="min-h-screen bg-black pt-24 md:pt-20">
        <div className="max-w-xl mx-auto px-6 section-padding text-center">
          <p className="text-sm font-medium uppercase tracking-wide text-[#666] mb-6 animate-fade-in">
            Submitted
          </p>
          <h1
            className="text-responsive-2xl font-bold uppercase tracking-tight mb-6 animate-fade-in"
            style={{ animationDelay: '0.1s' }}
          >
            We Got It.
          </h1>
          <p
            className="text-[#888] text-lg animate-fade-in"
            style={{ animationDelay: '0.2s' }}
          >
            We'll review your submission and reach out if it's a fit.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black pt-24 md:pt-20">
      <div className="max-w-xl mx-auto px-6 section-padding">
        {/* Header */}
        <h1 className="text-responsive-2xl font-bold uppercase tracking-tight mb-4 animate-fade-in">
          Play First.
        </h1>
        <p
          className="text-[#888] text-lg mb-12 animate-fade-in"
          style={{ animationDelay: '0.1s' }}
        >
          We curate emerging DJs across the DMV.<br />
          Submit your mix and tell us your sound.
        </p>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="space-y-6 animate-fade-in"
          style={{ animationDelay: '0.2s' }}
        >
          <div>
            <label className="block text-sm font-medium uppercase tracking-wide text-[#666] mb-2">
              DJ Name
            </label>
            <input
              type="text"
              name="djName"
              required
              className="w-full px-4 py-3 bg-[#0A0A0A] border border-[#1A1A1A] text-white focus:outline-none focus:border-white transition-colors"
            />
          </div>

          <div>
            <label className="block text-sm font-medium uppercase tracking-wide text-[#666] mb-2">
              Genre
            </label>
            <input
              type="text"
              name="genre"
              required
              placeholder="House, Afrobeats, Amapiano, Techno..."
              className="w-full px-4 py-3 bg-[#0A0A0A] border border-[#1A1A1A] text-white placeholder:text-[#444] focus:outline-none focus:border-white transition-colors"
            />
          </div>

          <div>
            <label className="block text-sm font-medium uppercase tracking-wide text-[#666] mb-2">
              Instagram
            </label>
            <input
              type="text"
              name="instagram"
              placeholder="@handle"
              className="w-full px-4 py-3 bg-[#0A0A0A] border border-[#1A1A1A] text-white placeholder:text-[#444] focus:outline-none focus:border-white transition-colors"
            />
          </div>

          <div>
            <label className="block text-sm font-medium uppercase tracking-wide text-[#666] mb-2">
              SoundCloud / Mix Link
            </label>
            <input
              type="url"
              name="mixLink"
              required
              placeholder="https://"
              className="w-full px-4 py-3 bg-[#0A0A0A] border border-[#1A1A1A] text-white placeholder:text-[#444] focus:outline-none focus:border-white transition-colors"
            />
          </div>

          <div>
            <label className="block text-sm font-medium uppercase tracking-wide text-[#666] mb-2">
              Tell Us About Your Sound
            </label>
            <textarea
              name="description"
              rows={4}
              className="w-full px-4 py-3 bg-[#0A0A0A] border border-[#1A1A1A] text-white focus:outline-none focus:border-white transition-colors resize-none"
            />
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="btn-hover w-full py-4 bg-white text-black text-sm font-medium uppercase tracking-wide hover:bg-[#E5E5E5] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {submitting ? 'Submitting...' : 'Submit'}
          </button>
        </form>
      </div>
    </div>
  )
}
