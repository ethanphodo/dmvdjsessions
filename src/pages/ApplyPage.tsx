import { useState, FormEvent, ChangeEvent } from 'react'
import { motion } from 'framer-motion'
import SEO from '../components/SEO'
import { submitDJApplication } from '../lib/supabase'

interface FormData {
  // Section 1: The Basics
  legalName: string
  artistAlias: string
  primaryGenres: string
  location: string
  socialHandle: string
  // Section 2: The Raw Signal
  mixLink: string
  // Section 3: The Curation
  openingTrack: string
  theStory: string
  // Section 4: The Ecosystem
  innerCircle: string
  canBringCrowd: string
}

const initialFormData: FormData = {
  legalName: '',
  artistAlias: '',
  primaryGenres: '',
  location: '',
  socialHandle: '',
  mixLink: '',
  openingTrack: '',
  theStory: '',
  innerCircle: '',
  canBringCrowd: '',
}

export default function ApplyPage() {
  const [formData, setFormData] = useState<FormData>(initialFormData)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const [submitError, setSubmitError] = useState<string | null>(null)

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitError(null)

    try {
      await submitDJApplication({
        legal_name: formData.legalName,
        artist_alias: formData.artistAlias,
        primary_genres: formData.primaryGenres,
        location: formData.location,
        social_handle: formData.socialHandle || undefined,
        mix_link: formData.mixLink,
        opening_track: formData.openingTrack,
        the_story: formData.theStory,
        inner_circle: formData.innerCircle || undefined,
        can_bring_crowd: formData.canBringCrowd,
      })
      setIsSubmitted(true)
    } catch (error) {
      console.error('Submission error:', error)
      setSubmitError('Something went wrong. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const resetForm = () => {
    setFormData(initialFormData)
    setIsSubmitted(false)
  }

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-black pt-32">
        <SEO
          title="Application Submitted | DMV DJ Sessions"
          description="Your application has been submitted to DMV DJ Sessions."
        />
        <div className="container-narrow section-padding text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <p className="text-[10px] tracking-[0.3em] text-[#999591] uppercase mb-6">Application Received</p>
            <h1 className="text-3xl md:text-4xl font-bold text-[#F2F0ED] mb-8 tracking-tight">We've Got Your Submission</h1>
            <p className="text-[#999591]/80 mb-12 max-w-md mx-auto leading-relaxed">
              We review every application personally. If your sound fits the vision, we'll reach out within 2 weeks.
            </p>
            <button
              onClick={resetForm}
              className="text-[#999591]/80 hover:text-[#F2F0ED] transition-colors text-xs uppercase tracking-[0.15em]"
            >
              Submit Another Application
            </button>
          </motion.div>
        </div>
      </div>
    )
  }

  const inputClasses = "w-full px-5 py-4 bg-[#121212] border border-[#222] text-[#F2F0ED] placeholder:text-[#999591]/50 focus:outline-none focus:border-[#F2F0ED] transition-colors tracking-[0.02em]"
  const labelClasses = "block text-[11px] font-medium uppercase tracking-[0.2em] text-[#999591] mb-6"

  return (
    <div className="min-h-screen flex flex-col items-center" style={{ backgroundColor: '#050505', paddingTop: '10vh', paddingBottom: '15vh' }}>
      <SEO
        title="Apply | DMV DJ Sessions"
        description="Apply to be featured on DMV DJ Sessions. We provide the cinema. You provide the energy."
      />

      {/* Header */}
      <div className="w-full max-w-[720px] mx-auto px-6 text-center mb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#F2F0ED] mb-8 tracking-tight">
            DJ Application
          </h1>
          <p className="text-[#C4C0BC] w-full leading-relaxed text-base text-center" style={{ marginBottom: '64px', lineHeight: '1.6' }}>
            Apply to be featured on DMV DJ Sessions. We provide the cinema, you provide the energy. No professional footage required—just a distinct sonic identity.
          </p>
        </motion.div>
      </div>

      {/* Form */}
      <div className="w-full max-w-[720px] mx-auto px-6">
        <form onSubmit={handleSubmit} className="space-y-24">

          {/* Section 1: The Basics */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <div className="mb-10">
              <h2 className="text-sm font-medium uppercase tracking-[0.15em] text-[#F2F0ED] mb-2">
                The Basics
              </h2>
              <p className="text-[11px] uppercase tracking-[0.2em] text-[#999591]/60">Identity</p>
            </div>

            <div className="space-y-8">
              <div>
                <label htmlFor="legalName" className={labelClasses}>Legal Name</label>
                <input
                  type="text"
                  id="legalName"
                  name="legalName"
                  value={formData.legalName}
                  onChange={handleChange}
                  required
                  className={inputClasses}
                />
              </div>

              <div>
                <label htmlFor="artistAlias" className={labelClasses}>Artist Alias</label>
                <input
                  type="text"
                  id="artistAlias"
                  name="artistAlias"
                  value={formData.artistAlias}
                  onChange={handleChange}
                  required
                  className={inputClasses}
                />
              </div>

              <div>
                <label htmlFor="primaryGenres" className={labelClasses}>Primary Genre(s)</label>
                <input
                  type="text"
                  id="primaryGenres"
                  name="primaryGenres"
                  value={formData.primaryGenres}
                  onChange={handleChange}
                  placeholder="Deep House, GhettoTech, Minimal, Amapiano..."
                  required
                  className={inputClasses}
                />
              </div>

              <div>
                <label htmlFor="location" className={labelClasses}>Location</label>
                <input
                  type="text"
                  id="location"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  placeholder="DMV-based or frequent flyer"
                  required
                  className={inputClasses}
                />
              </div>

              <div>
                <label htmlFor="socialHandle" className={labelClasses}>
                  Social Handle <span className="text-[#999591]/60 font-normal">(Optional)</span>
                </label>
                <input
                  type="text"
                  id="socialHandle"
                  name="socialHandle"
                  value={formData.socialHandle}
                  onChange={handleChange}
                  placeholder="@username"
                  className={inputClasses}
                />
                <p className="mt-3 text-[11px] text-[#999591]/60 tracking-wide">
                  We're looking for aesthetic potential, not follower count.
                </p>
              </div>
            </div>
          </motion.section>

          {/* Divider */}
          <div className="h-px bg-[#222]" />

          {/* Section 2: The Raw Signal */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="mb-10">
              <h2 className="text-sm font-medium uppercase tracking-[0.15em] text-[#F2F0ED] mb-2">
                The Raw Signal
              </h2>
              <p className="text-[11px] uppercase tracking-[0.2em] text-[#999591]/60">Musicality</p>
            </div>

            <div className="space-y-10">
              <div>
                <label htmlFor="mixLink" className={labelClasses}>The Sound</label>
                <p className="text-[#999591]/60 text-sm mb-4 leading-relaxed">
                  Link to a recent mix. Minimum 30 minutes.
                </p>
                <input
                  type="url"
                  id="mixLink"
                  name="mixLink"
                  value={formData.mixLink}
                  onChange={handleChange}
                  placeholder="soundcloud.com/... or mixcloud.com/..."
                  required
                  className={inputClasses}
                />
              </div>

              <div>
                <label className={labelClasses}>
                  The Vibe Check <span className="text-[#999591]/60 font-normal">(Optional)</span>
                </label>
                <p className="text-[#999591]/60 text-sm mb-6 leading-relaxed">
                  2-3 minute video of you behind the decks. Phone quality is fine—we're watching your hands, not your camera.
                </p>
                <div className="border border-dashed border-[#222] p-10 text-center hover:border-[#333] transition-colors cursor-pointer group">
                  <input
                    type="file"
                    accept="video/*"
                    className="hidden"
                    id="vibeCheckVideo"
                  />
                  <label htmlFor="vibeCheckVideo" className="cursor-pointer block">
                    <svg className="w-6 h-6 mx-auto mb-4 text-[#999591]/40 group-hover:text-[#999591]/80 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                    </svg>
                    <p className="text-[#999591]/60 text-sm group-hover:text-[#999591] transition-colors">Drop file or click to upload</p>
                    <p className="text-[#999591]/40 text-xs mt-2">Max 500MB</p>
                  </label>
                </div>
              </div>
            </div>
          </motion.section>

          {/* Divider */}
          <div className="h-px bg-[#222]" />

          {/* Section 3: The Curation */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <div className="mb-10">
              <h2 className="text-sm font-medium uppercase tracking-[0.15em] text-[#F2F0ED] mb-2">
                The Curation
              </h2>
              <p className="text-[11px] uppercase tracking-[0.2em] text-[#999591]/60">Intentionality</p>
            </div>

            <div className="space-y-10">
              <div>
                <label htmlFor="openingTrack" className={labelClasses}>The Opening Statement</label>
                <p className="text-[#999591]/60 text-sm mb-4 leading-relaxed">
                  First 10 minutes of a 4 AM warehouse set. What track do you drop?
                </p>
                <input
                  type="text"
                  id="openingTrack"
                  name="openingTrack"
                  value={formData.openingTrack}
                  onChange={handleChange}
                  placeholder="Artist — Track Name"
                  required
                  className={inputClasses}
                />
              </div>

              <div>
                <label htmlFor="theStory" className={labelClasses}>The Story</label>
                <p className="text-[#999591]/60 text-sm mb-4 leading-relaxed">
                  In two sentences, what feeling are you leaving the crowd with?
                </p>
                <textarea
                  id="theStory"
                  name="theStory"
                  value={formData.theStory}
                  onChange={handleChange}
                  rows={3}
                  placeholder="Industrial grit with soulful vocals... High-speed hypnotic energy..."
                  required
                  className={`${inputClasses} resize-none`}
                />
              </div>
            </div>
          </motion.section>

          {/* Divider */}
          <div className="h-px bg-[#222]" />

          {/* Section 4: The Ecosystem */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <div className="mb-10">
              <h2 className="text-sm font-medium uppercase tracking-[0.15em] text-[#F2F0ED] mb-2">
                The Ecosystem
              </h2>
              <p className="text-[11px] uppercase tracking-[0.2em] text-[#999591]/60">Vouching</p>
            </div>

            <div className="space-y-10">
              <div>
                <label htmlFor="innerCircle" className={labelClasses}>
                  The Inner Circle <span className="text-[#999591]/60 font-normal">(Optional)</span>
                </label>
                <p className="text-[#999591]/60 text-sm mb-4 leading-relaxed">
                  2-3 local DJs, dancers, or creators who can vouch for your energy.
                </p>
                <textarea
                  id="innerCircle"
                  name="innerCircle"
                  value={formData.innerCircle}
                  onChange={handleChange}
                  rows={3}
                  placeholder="Names and handles..."
                  className={`${inputClasses} resize-none`}
                />
              </div>

              <div>
                <label className={labelClasses}>The Crowd</label>
                <p className="text-[#999591]/60 text-sm mb-6 leading-relaxed">
                  Can you bring 5-10 people who embody "Dancers &gt; Talkers"?
                </p>
                <div className="flex gap-6">
                  <label className="flex items-center gap-3 cursor-pointer group">
                    <input
                      type="radio"
                      name="canBringCrowd"
                      value="yes"
                      checked={formData.canBringCrowd === 'yes'}
                      onChange={handleChange}
                      required
                      className="sr-only"
                    />
                    <span className={`w-4 h-4 border rounded-full flex items-center justify-center transition-all ${
                      formData.canBringCrowd === 'yes'
                        ? 'border-white'
                        : 'border-[#333] group-hover:border-white/40'
                    }`}>
                      {formData.canBringCrowd === 'yes' && (
                        <span className="w-2 h-2 bg-white rounded-full" />
                      )}
                    </span>
                    <span className={`text-sm tracking-[0.05em] transition-colors ${
                      formData.canBringCrowd === 'yes' ? 'text-[#F2F0ED]' : 'text-[#999591]/80 group-hover:text-[#F2F0ED]/60'
                    }`}>
                      Yes
                    </span>
                  </label>
                  <label className="flex items-center gap-3 cursor-pointer group">
                    <input
                      type="radio"
                      name="canBringCrowd"
                      value="no"
                      checked={formData.canBringCrowd === 'no'}
                      onChange={handleChange}
                      className="sr-only"
                    />
                    <span className={`w-4 h-4 border rounded-full flex items-center justify-center transition-all ${
                      formData.canBringCrowd === 'no'
                        ? 'border-white'
                        : 'border-[#333] group-hover:border-white/40'
                    }`}>
                      {formData.canBringCrowd === 'no' && (
                        <span className="w-2 h-2 bg-white rounded-full" />
                      )}
                    </span>
                    <span className={`text-sm tracking-[0.05em] transition-colors ${
                      formData.canBringCrowd === 'no' ? 'text-[#F2F0ED]' : 'text-[#999591]/80 group-hover:text-[#F2F0ED]/60'
                    }`}>
                      No
                    </span>
                  </label>
                </div>
              </div>
            </div>
          </motion.section>

          {/* Submit */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="pt-12"
          >
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-5 rounded-full text-[#050505] text-xs font-medium uppercase tracking-[0.2em] hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-3"
              style={{ background: 'linear-gradient(135deg, #A68B6A 0%, #8B7355 100%)' }}
            >
              {isSubmitting ? (
                <>
                  <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                      fill="none"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  Submitting
                </>
              ) : (
                'Submit Application'
              )}
            </button>
          </motion.div>
        </form>
      </div>
    </div>
  )
}
