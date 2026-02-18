import { useState, FormEvent, ChangeEvent } from 'react'
import { motion } from 'framer-motion'
import SEO from '../components/SEO'

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

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    // Simulate API submission
    await new Promise(resolve => setTimeout(resolve, 1500))
    setIsSubmitting(false)
    setIsSubmitted(true)
  }

  const resetForm = () => {
    setFormData(initialFormData)
    setIsSubmitted(false)
  }

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-black pt-28">
        <SEO
          title="Application Submitted | DMV DJ Sessions"
          description="Your application has been submitted to DMV DJ Sessions."
        />
        <div className="container-narrow section-padding text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <p className="text-xs tracking-[0.2em] text-[#666] uppercase mb-4">Application Received</p>
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-6">We've Got Your Submission</h1>
            <p className="text-[#666] mb-8 max-w-md mx-auto">
              We review every application personally. If your sound fits the vision, we'll reach out within 2 weeks.
            </p>
            <button
              onClick={resetForm}
              className="text-[#666] hover:text-white transition-colors text-sm uppercase tracking-[0.1em]"
            >
              Submit Another Application
            </button>
          </motion.div>
        </div>
      </div>
    )
  }

  const inputClasses = "w-full px-4 py-4 bg-[#0A0A0A] border border-[#222] text-white placeholder:text-[#444] focus:outline-none focus:border-white transition-colors"
  const labelClasses = "block text-xs font-medium uppercase tracking-[0.15em] text-[#666] mb-3"
  const sectionClasses = "border-t border-[#1A1A1A] pt-12"

  return (
    <div className="min-h-screen bg-black pt-28 pb-24">
      <SEO
        title="Apply | DMV DJ Sessions"
        description="Apply to be featured on DMV DJ Sessions. We provide the cinema. You provide the energy."
      />

      {/* Header */}
      <div className="container-narrow text-center mb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <p className="text-xs tracking-[0.2em] text-[#666] uppercase mb-6">
            DMV DJ Sessions: Artist Application
          </p>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 tracking-tight">
            The Sound of the DMV, Documented.
          </h1>
          <p className="text-[#666] max-w-lg mx-auto leading-relaxed">
            We provide the cinema. You provide the energy. No professional footage required—just a distinct sonic identity.
          </p>
        </motion.div>
      </div>

      {/* Form */}
      <div className="container-form">
        <form onSubmit={handleSubmit} className="space-y-12">

          {/* Section 1: The Basics */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <h2 className="text-sm font-bold uppercase tracking-[0.15em] text-white mb-8">
              Section 1: The Basics
              <span className="text-[#666] font-normal ml-2">(Identity)</span>
            </h2>

            <div className="space-y-6">
              <div>
                <label htmlFor="legalName" className={labelClasses}>
                  Legal Name <span className="text-red-500">*</span>
                </label>
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
                <label htmlFor="artistAlias" className={labelClasses}>
                  Artist Alias <span className="text-red-500">*</span>
                </label>
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
                <label htmlFor="primaryGenres" className={labelClasses}>
                  Primary Genre(s) <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="primaryGenres"
                  name="primaryGenres"
                  value={formData.primaryGenres}
                  onChange={handleChange}
                  placeholder="e.g., Deep House, GhettoTech, Minimal, Amapiano"
                  required
                  className={inputClasses}
                />
              </div>

              <div>
                <label htmlFor="location" className={labelClasses}>
                  Location <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="location"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  placeholder="Must be DMV-based or frequent flyer"
                  required
                  className={inputClasses}
                />
              </div>

              <div>
                <label htmlFor="socialHandle" className={labelClasses}>
                  Social Handle (@)
                </label>
                <input
                  type="text"
                  id="socialHandle"
                  name="socialHandle"
                  value={formData.socialHandle}
                  onChange={handleChange}
                  placeholder="Instagram/TikTok—we're looking for aesthetic potential, not follower count"
                  className={inputClasses}
                />
              </div>
            </div>
          </motion.section>

          {/* Section 2: The Raw Signal */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className={sectionClasses}
          >
            <h2 className="text-sm font-bold uppercase tracking-[0.15em] text-white mb-8">
              Section 2: The "Raw Signal"
              <span className="text-[#666] font-normal ml-2">(Musicality)</span>
            </h2>

            <div className="space-y-6">
              <div>
                <label htmlFor="mixLink" className={labelClasses}>
                  The Sound <span className="text-red-500">*</span>
                </label>
                <p className="text-[#444] text-sm mb-3">
                  Provide a link to a recent mix (SoundCloud/Mixcloud). Min 30 minutes.
                </p>
                <input
                  type="url"
                  id="mixLink"
                  name="mixLink"
                  value={formData.mixLink}
                  onChange={handleChange}
                  placeholder="https://soundcloud.com/..."
                  required
                  className={inputClasses}
                />
              </div>

              <div className="p-6 border border-[#222] bg-[#0A0A0A]">
                <label className={labelClasses}>
                  The "Vibe Check" (Phone Video)
                </label>
                <p className="text-[#666] text-sm mb-4 leading-relaxed">
                  Upload a 2-3 minute video of you behind the decks. This can be filmed on a phone in your bedroom or at a basement party.
                </p>
                <p className="text-[#444] text-xs mb-4 italic">
                  What we look for: We aren't looking for lighting or camera quality; we are looking for physical presence, hand technique, and track selection.
                </p>
                <div className="border-2 border-dashed border-[#333] p-8 text-center hover:border-[#444] transition-colors cursor-pointer">
                  <input
                    type="file"
                    accept="video/*"
                    className="hidden"
                    id="vibeCheckVideo"
                  />
                  <label htmlFor="vibeCheckVideo" className="cursor-pointer">
                    <svg className="w-8 h-8 mx-auto mb-3 text-[#444]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                    </svg>
                    <p className="text-[#666] text-sm">Click to upload or drag and drop</p>
                    <p className="text-[#444] text-xs mt-1">Max 500MB</p>
                  </label>
                </div>
              </div>
            </div>
          </motion.section>

          {/* Section 3: The Curation */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className={sectionClasses}
          >
            <h2 className="text-sm font-bold uppercase tracking-[0.15em] text-white mb-8">
              Section 3: The Curation
              <span className="text-[#666] font-normal ml-2">(Intentionality)</span>
            </h2>

            <div className="space-y-6">
              <div>
                <label htmlFor="openingTrack" className={labelClasses}>
                  The "Opening Statement" <span className="text-red-500">*</span>
                </label>
                <p className="text-[#444] text-sm mb-3">
                  If you had the first 10 minutes of a 4 AM warehouse set, what is the first track you drop?
                </p>
                <input
                  type="text"
                  id="openingTrack"
                  name="openingTrack"
                  value={formData.openingTrack}
                  onChange={handleChange}
                  placeholder="Artist - Track Name"
                  required
                  className={inputClasses}
                />
              </div>

              <div>
                <label htmlFor="theStory" className={labelClasses}>
                  The Story <span className="text-red-500">*</span>
                </label>
                <p className="text-[#444] text-sm mb-3">
                  In 2 sentences, what "feeling" are you trying to leave the crowd with?
                </p>
                <textarea
                  id="theStory"
                  name="theStory"
                  value={formData.theStory}
                  onChange={handleChange}
                  rows={3}
                  placeholder='e.g., "Industrial grit mixed with soulful vocals" or "High-speed hypnotic energy"'
                  required
                  className={`${inputClasses} resize-none`}
                />
              </div>
            </div>
          </motion.section>

          {/* Section 4: The Ecosystem */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className={sectionClasses}
          >
            <h2 className="text-sm font-bold uppercase tracking-[0.15em] text-white mb-8">
              Section 4: The Ecosystem
              <span className="text-[#666] font-normal ml-2">(Vouching)</span>
            </h2>

            <div className="space-y-6">
              <div>
                <label htmlFor="innerCircle" className={labelClasses}>
                  The Inner Circle
                </label>
                <p className="text-[#444] text-sm mb-3">
                  List 2-3 local DJs, dancers, or creators who can vouch for your energy in a room.
                </p>
                <textarea
                  id="innerCircle"
                  name="innerCircle"
                  value={formData.innerCircle}
                  onChange={handleChange}
                  rows={3}
                  placeholder="Names and their roles/handles"
                  className={`${inputClasses} resize-none`}
                />
              </div>

              <div>
                <label className={labelClasses}>
                  The Crowd <span className="text-red-500">*</span>
                </label>
                <p className="text-[#444] text-sm mb-4">
                  Can you bring 5-10 people who embody the "Dancers &gt; Talkers" rule to fill your booth?
                </p>
                <div className="flex gap-4">
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
                    <span className={`w-5 h-5 border-2 rounded-full flex items-center justify-center transition-colors ${
                      formData.canBringCrowd === 'yes' ? 'border-white' : 'border-[#333] group-hover:border-[#444]'
                    }`}>
                      {formData.canBringCrowd === 'yes' && (
                        <span className="w-2.5 h-2.5 bg-white rounded-full" />
                      )}
                    </span>
                    <span className={`text-sm uppercase tracking-[0.1em] transition-colors ${
                      formData.canBringCrowd === 'yes' ? 'text-white' : 'text-[#666] group-hover:text-white'
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
                    <span className={`w-5 h-5 border-2 rounded-full flex items-center justify-center transition-colors ${
                      formData.canBringCrowd === 'no' ? 'border-white' : 'border-[#333] group-hover:border-[#444]'
                    }`}>
                      {formData.canBringCrowd === 'no' && (
                        <span className="w-2.5 h-2.5 bg-white rounded-full" />
                      )}
                    </span>
                    <span className={`text-sm uppercase tracking-[0.1em] transition-colors ${
                      formData.canBringCrowd === 'no' ? 'text-white' : 'text-[#666] group-hover:text-white'
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
            className="pt-8"
          >
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-4 bg-white text-black text-sm font-medium uppercase tracking-[0.1em] hover:bg-[#E8E4E0] disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
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
                  Submitting...
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
