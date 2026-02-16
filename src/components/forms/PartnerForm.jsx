import { useState } from 'react'
import { useFormValidation } from '../../hooks/useFormValidation'
import Input from '../ui/Input'
import Select from '../ui/Select'
import Textarea from '../ui/Textarea'
import Button from '../ui/Button'

const partnerTypes = [
  { value: 'venue', label: 'Venue / Space' },
  { value: 'sponsor', label: 'Brand Sponsor' },
  { value: 'media', label: 'Media Partner' },
  { value: 'production', label: 'Production / Equipment' },
  { value: 'other', label: 'Other' },
]

const initialValues = {
  companyName: '',
  contactName: '',
  email: '',
  phone: '',
  partnerType: '',
  website: '',
  message: '',
}

const validationRules = {
  companyName: {
    required: true,
    requiredMessage: 'Company name is required',
  },
  contactName: {
    required: true,
    requiredMessage: 'Contact name is required',
  },
  email: {
    required: true,
    requiredMessage: 'Email is required',
    email: true,
    emailMessage: 'Please enter a valid email',
  },
  partnerType: {
    required: true,
    requiredMessage: 'Please select a partnership type',
  },
  message: {
    required: true,
    requiredMessage: 'Please tell us about the partnership opportunity',
    minLength: 50,
    minLengthMessage: 'Message must be at least 50 characters',
  },
}

export default function PartnerForm() {
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
    console.log('Partner form submitted:', data)
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
          Inquiry Received
        </h3>
        <p className="font-mono text-sm text-[#888] mb-6">
          Our partnerships team will review your inquiry and respond within 3-5 business days.
        </p>
        <Button onClick={resetForm} variant="secondary">
          Submit Another
        </Button>
      </div>
    )
  }

  return (
    <form onSubmit={onFormSubmit} className="space-y-6">
      {/* Company Info */}
      <div className="border border-[#1A1A1A] bg-[#0A0A0A] p-6">
        <div className="font-mono text-xs uppercase tracking-tight text-[#888] mb-6">
          COMPANY_INFO
        </div>
        <div className="grid md:grid-cols-2 gap-4 mb-4">
          <Input
            label="Company Name"
            name="companyName"
            value={values.companyName}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.companyName && errors.companyName}
            required
            placeholder="Your company"
          />
          <Select
            label="Partnership Type"
            name="partnerType"
            value={values.partnerType}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.partnerType && errors.partnerType}
            options={partnerTypes}
            required
            placeholder="Select type"
          />
        </div>
        <Input
          label="Website"
          name="website"
          value={values.website}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="https://yourcompany.com"
        />
      </div>

      {/* Contact Info */}
      <div className="border border-[#1A1A1A] bg-[#0A0A0A] p-6">
        <div className="font-mono text-xs uppercase tracking-tight text-[#888] mb-6">
          CONTACT_INFO
        </div>
        <div className="grid md:grid-cols-2 gap-4 mb-4">
          <Input
            label="Contact Name"
            name="contactName"
            value={values.contactName}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.contactName && errors.contactName}
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
        <Input
          label="Phone (Optional)"
          name="phone"
          type="tel"
          value={values.phone}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="+1 (555) 000-0000"
        />
      </div>

      {/* Message */}
      <div className="border border-[#1A1A1A] bg-[#0A0A0A] p-6">
        <div className="font-mono text-xs uppercase tracking-tight text-[#888] mb-6">
          PARTNERSHIP_DETAILS
        </div>
        <Textarea
          label="Tell Us About the Partnership"
          name="message"
          value={values.message}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.message && errors.message}
          required
          rows={5}
          placeholder="Describe your partnership opportunity, what you're looking to achieve, and how we can work together..."
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
          Submit Inquiry
        </Button>
        <Button type="button" variant="secondary" onClick={resetForm}>
          Reset Form
        </Button>
      </div>
    </form>
  )
}
