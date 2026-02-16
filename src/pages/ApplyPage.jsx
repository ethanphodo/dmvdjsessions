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
        <div className="max-w-xl mx-auto px-6 py-24 md:py-32 text-center">
          <p className="text-sm font-medium uppercase tracking-wide text-[#666] mb-6">
            Submitted
          </p>
          <h1 className="text-3xl md:text-4xl font-bold uppercase tracking-tight mb-6">
            We Got It.
          </h1>
          <p className="text-[#888]">
            We'll review your submission and reach out if it's a fit.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black pt-24 md:pt-20">
      <div className="max-w-xl mx-auto px-6 py-24 md:py-32">
        {/* Header */}
        <h1 className="text-3xl md:text-4xl font-bold uppercase tracking-tight mb-4">
          Play First.
        </h1>
        <p className="text-[#888] mb-12">
          We curate emerging DJs across the DMV.<br />
          Submit your mix and tell us your sound.
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium uppercase tracking-wide text-[#666] mb-2">
              DJ Name
            </label>
            <input
              type="text"
              name="djName"
              required
              className="w-full px-4 py-3 bg-[#0A0A0A] border border-[#1A1A1A] text-white focus:outline-none focus:border-[#333] transition-colors"
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
              className="w-full px-4 py-3 bg-[#0A0A0A] border border-[#1A1A1A] text-white placeholder:text-[#333] focus:outline-none focus:border-[#333] transition-colors"
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
              className="w-full px-4 py-3 bg-[#0A0A0A] border border-[#1A1A1A] text-white placeholder:text-[#333] focus:outline-none focus:border-[#333] transition-colors"
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
              className="w-full px-4 py-3 bg-[#0A0A0A] border border-[#1A1A1A] text-white placeholder:text-[#333] focus:outline-none focus:border-[#333] transition-colors"
            />
          </div>

          <div>
            <label className="block text-sm font-medium uppercase tracking-wide text-[#666] mb-2">
              Tell Us About Your Sound
            </label>
            <textarea
              name="description"
              rows={4}
              className="w-full px-4 py-3 bg-[#0A0A0A] border border-[#1A1A1A] text-white focus:outline-none focus:border-[#333] transition-colors resize-none"
            />
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full py-4 bg-white text-black text-sm font-medium uppercase tracking-wide hover:bg-[#888] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {submitting ? 'Submitting...' : 'Submit'}
          </button>
        </form>
      </div>
    </div>
  )
}
