import { useState } from 'react'
import { useFormValidation } from '../../hooks/useFormValidation'
import { GENRES, LOCATIONS } from '../../utils/constants'
import Input from '../ui/Input'
import Select from '../ui/Select'
import Textarea from '../ui/Textarea'
import Button from '../ui/Button'

const initialValues = {
  name: '',
  email: '',
  djName: '',
  location: '',
  genre: '',
  experience: '',
  bio: '',
  soundcloudUrl: '',
  instagramUrl: '',
  mixcloudUrl: '',
  message: '',
}

const validationRules = {
  name: {
    required: true,
    requiredMessage: 'Name is required',
    minLength: 2,
    minLengthMessage: 'Name must be at least 2 characters',
  },
  email: {
    required: true,
    requiredMessage: 'Email is required',
    email: true,
    emailMessage: 'Please enter a valid email',
  },
  djName: {
    required: true,
    requiredMessage: 'DJ name is required',
  },
  location: {
    required: true,
    requiredMessage: 'Please select your location',
  },
  genre: {
    required: true,
    requiredMessage: 'Please select your primary genre',
  },
  bio: {
    required: true,
    requiredMessage: 'Bio is required',
    minLength: 50,
    minLengthMessage: 'Bio must be at least 50 characters',
    maxLength: 500,
    maxLengthMessage: 'Bio must be under 500 characters',
  },
  soundcloudUrl: {
    url: true,
    urlMessage: 'Please enter a valid URL',
  },
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
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))
    console.log('Form submitted:', data)
    // In production, this would send to your backend
  }

  const onFormSubmit = (e) => {
    e.preventDefault()
    setSubmitError(null)
    handleSubmit(onSubmit)
  }

  if (isSubmitted) {
    return (
      <div className="border border-[#E21D1D] bg-[#0A0A0A] p-8 text-center">
        <div className="w-16 h-16 mx-auto mb-6 border border-[#E21D1D] flex items-center justify-center">
          <svg className="w-8 h-8 text-[#E21D1D]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-2xl font-black uppercase tracking-tighter text-white mb-4 italic">
          Application Received
        </h3>
        <p className="font-mono text-sm text-[#888] mb-6">
          We'll review your submission and get back to you within 48-72 hours.
        </p>
        <Button onClick={resetForm} variant="secondary">
          Submit Another
        </Button>
      </div>
    )
  }

  return (
    <form onSubmit={onFormSubmit} className="space-y-6">
      {/* Personal Info */}
      <div className="border border-[#1A1A1A] bg-[#0A0A0A] p-6">
        <div className="font-mono text-xs uppercase tracking-tight text-[#888] mb-6">
          PERSONAL_INFO
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          <Input
            label="Full Name"
            name="name"
            value={values.name}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.name && errors.name}
            required
            placeholder="Your name"
          />
          <Input
            label="Email"
            name="email"
            type="email"
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.email && errors.email}
            required
            placeholder="your@email.com"
          />
        </div>
      </div>

      {/* DJ Info */}
      <div className="border border-[#1A1A1A] bg-[#0A0A0A] p-6">
        <div className="font-mono text-xs uppercase tracking-tight text-[#888] mb-6">
          DJ_INFO
        </div>
        <div className="grid md:grid-cols-2 gap-4 mb-4">
          <Input
            label="DJ Name"
            name="djName"
            value={values.djName}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.djName && errors.djName}
            required
            placeholder="Your DJ name"
          />
          <Select
            label="Location"
            name="location"
            value={values.location}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.location && errors.location}
            options={LOCATIONS}
            required
            placeholder="Select region"
          />
        </div>
        <div className="grid md:grid-cols-2 gap-4 mb-4">
          <Select
            label="Primary Genre"
            name="genre"
            value={values.genre}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.genre && errors.genre}
            options={GENRES}
            required
            placeholder="Select genre"
          />
          <Input
            label="Years of Experience"
            name="experience"
            value={values.experience}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="e.g., 5 years"
          />
        </div>
        <Textarea
          label="Bio"
          name="bio"
          value={values.bio}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.bio && errors.bio}
          required
          rows={4}
          maxLength={500}
          placeholder="Tell us about yourself and your sound..."
        />
      </div>

      {/* Social Links */}
      <div className="border border-[#1A1A1A] bg-[#0A0A0A] p-6">
        <div className="font-mono text-xs uppercase tracking-tight text-[#888] mb-6">
          SOCIAL_LINKS
        </div>
        <div className="grid md:grid-cols-2 gap-4 mb-4">
          <Input
            label="SoundCloud URL"
            name="soundcloudUrl"
            value={values.soundcloudUrl}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.soundcloudUrl && errors.soundcloudUrl}
            placeholder="https://soundcloud.com/..."
          />
          <Input
            label="Mixcloud URL"
            name="mixcloudUrl"
            value={values.mixcloudUrl}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="https://mixcloud.com/..."
          />
        </div>
        <Input
          label="Instagram URL"
          name="instagramUrl"
          value={values.instagramUrl}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="https://instagram.com/..."
        />
      </div>

      {/* Additional Message */}
      <div className="border border-[#1A1A1A] bg-[#0A0A0A] p-6">
        <div className="font-mono text-xs uppercase tracking-tight text-[#888] mb-6">
          ADDITIONAL_INFO
        </div>
        <Textarea
          label="Message (Optional)"
          name="message"
          value={values.message}
          onChange={handleChange}
          onBlur={handleBlur}
          rows={3}
          placeholder="Anything else you'd like us to know..."
        />
      </div>

      {/* Submit */}
      {submitError && (
        <div className="border border-[#E21D1D] bg-[#E21D1D]/10 p-4">
          <p className="font-mono text-xs text-[#E21D1D] uppercase">
            {submitError}
          </p>
        </div>
      )}

      <div className="flex flex-col sm:flex-row gap-4">
        <Button type="submit" loading={isSubmitting} disabled={isSubmitting}>
          Submit Application
        </Button>
        <Button type="button" variant="secondary" onClick={resetForm}>
          Reset Form
        </Button>
      </div>
    </form>
  )
}
