import { useState } from 'react'
import { useFormValidation } from '../../hooks/useFormValidation'
import { GENRES, LOCATIONS } from '../../utils/constants'

const initialValues = {
  name: '',
  email: '',
  djName: '',
  location: '',
  genre: '',
  bio: '',
  mixLink: '',
  instagram: '',
  vibeWords: '',
}

const validationRules = {
  name: { required: true, requiredMessage: 'Required' },
  email: { required: true, email: true, emailMessage: 'Invalid email' },
  djName: { required: true, requiredMessage: 'Required' },
  location: { required: true, requiredMessage: 'Required' },
  genre: { required: true, requiredMessage: 'Required' },
  mixLink: { required: true, requiredMessage: 'Required' },
}

export default function TalentForm() {
  const [submitError, setSubmitError] = useState(null)

  const {
    values,
    errors,
    touched,
    isSubmitting,
    isSubmitted,
    handleChange,
    handleBlur,
    handleSubmit,
    resetForm,
  } = useFormValidation(initialValues, validationRules)

  const onSubmit = async (data) => {
    await new Promise((resolve) => setTimeout(resolve, 1500))
    console.log('Form submitted:', data)
  }

  const onFormSubmit = (e) => {
    e.preventDefault()
    setSubmitError(null)
    handleSubmit(onSubmit)
  }

  if (isSubmitted) {
    return (
      <div className="bg-[#141414] p-12 text-center">
        <div className="w-16 h-16 mx-auto mb-6 bg-[#E8E4E0] rounded-full flex items-center justify-center">
          <svg className="w-8 h-8 text-[#0A0A0A]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-2xl font-bold text-white mb-2">
          Application Received
        </h3>
        <p className="text-[#6B6865] mb-8">
          We'll review your submission and get back to you within 48-72 hours.
        </p>
        <button
          onClick={resetForm}
          className="text-[#E8E4E0] hover:text-white transition-colors"
        >
          Submit Another
        </button>
      </div>
    )
  }

  const inputClass = (field) => `
    w-full px-4 py-3 bg-[#1C1C1C] border-none text-white text-sm
    placeholder:text-[#4A4845] focus:outline-none focus:ring-2 focus:ring-[#E8E4E0]
    rounded-sm transition-all
    ${touched[field] && errors[field] ? 'ring-2 ring-[#E8E4E0]' : ''}
  `

  return (
    <form onSubmit={onFormSubmit} className="space-y-8">
      {/* Basic Info */}
      <div className="bg-[#141414] p-6 md:p-8">
        <h3 className="text-lg font-bold text-white mb-6">Basic Info</h3>
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <input
              name="name"
              value={values.name}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Your Name *"
              className={inputClass('name')}
            />
            {touched.name && errors.name && (
              <p className="text-xs text-[#E8E4E0] mt-1">{errors.name}</p>
            )}
          </div>
          <div>
            <input
              name="email"
              type="email"
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Email *"
              className={inputClass('email')}
            />
            {touched.email && errors.email && (
              <p className="text-xs text-[#E8E4E0] mt-1">{errors.email}</p>
            )}
          </div>
        </div>
      </div>

      {/* DJ Info */}
      <div className="bg-[#141414] p-6 md:p-8">
        <h3 className="text-lg font-bold text-white mb-6">DJ Info</h3>
        <div className="grid md:grid-cols-2 gap-4 mb-4">
          <div>
            <input
              name="djName"
              value={values.djName}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="DJ Name *"
              className={inputClass('djName')}
            />
            {touched.djName && errors.djName && (
              <p className="text-xs text-[#E8E4E0] mt-1">{errors.djName}</p>
            )}
          </div>
          <div>
            <select
              name="location"
              value={values.location}
              onChange={handleChange}
              onBlur={handleBlur}
              className={`${inputClass('location')} ${!values.location ? 'text-[#4A4845]' : ''}`}
            >
              <option value="">Location *</option>
              {LOCATIONS.map((loc) => (
                <option key={loc.value} value={loc.value}>{loc.label}</option>
              ))}
            </select>
            {touched.location && errors.location && (
              <p className="text-xs text-[#E8E4E0] mt-1">{errors.location}</p>
            )}
          </div>
        </div>
        <div>
          <select
            name="genre"
            value={values.genre}
            onChange={handleChange}
            onBlur={handleBlur}
            className={`${inputClass('genre')} ${!values.genre ? 'text-[#4A4845]' : ''}`}
          >
            <option value="">Primary Genre *</option>
            {GENRES.map((g) => (
              <option key={g.value} value={g.value}>{g.label}</option>
            ))}
          </select>
          {touched.genre && errors.genre && (
            <p className="text-xs text-[#E8E4E0] mt-1">{errors.genre}</p>
          )}
        </div>
      </div>

      {/* Links */}
      <div className="bg-[#141414] p-6 md:p-8">
        <h3 className="text-lg font-bold text-white mb-6">Your Mix</h3>
        <div className="space-y-4">
          <div>
            <input
              name="mixLink"
              value={values.mixLink}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="SoundCloud / Mixcloud Link *"
              className={inputClass('mixLink')}
            />
            {touched.mixLink && errors.mixLink && (
              <p className="text-xs text-[#E8E4E0] mt-1">{errors.mixLink}</p>
            )}
          </div>
          <input
            name="instagram"
            value={values.instagram}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="Instagram (optional)"
            className={inputClass('instagram')}
          />
        </div>
      </div>

      {/* Bio & Vibe */}
      <div className="bg-[#141414] p-6 md:p-8">
        <h3 className="text-lg font-bold text-white mb-6">About You</h3>
        <div className="space-y-4">
          <textarea
            name="bio"
            value={values.bio}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="Tell us about your sound (optional)"
            rows={4}
            className={`${inputClass('bio')} resize-none`}
          />
          <div>
            <label className="block text-sm text-gray-400 mb-2">
              In three words, describe the energy of your 3 AM set.
            </label>
            <input
              name="vibeWords"
              value={values.vibeWords}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="e.g., Dark, Hypnotic, Relentless"
              className={inputClass('vibeWords')}
            />
          </div>
        </div>
      </div>

      {/* Submit */}
      {submitError && (
        <p className="text-sm text-[#E8E4E0]">{submitError}</p>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full py-4 bg-[#E8E4E0] text-[#0A0A0A] font-medium hover:bg-white hover:text-black disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-150"
      >
        {isSubmitting ? 'Submitting...' : 'Submit Application'}
      </button>
    </form>
  )
}
