import { useState } from 'react'
import { useFormValidation } from '../../hooks/useFormValidation'

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

// Custom Input with light/dark mode support
function FormInput({ label, name, type = 'text', value, onChange, onBlur, error, required, placeholder }) {
  return (
    <div className="space-y-2">
      <label htmlFor={name} className="block text-sm text-[#333] dark:text-[#C4C0BC]">
        {label}
        {required && <span className="text-red-500 dark:text-[#E8E4E0] ml-1">*</span>}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        placeholder={placeholder}
        className={`
          w-full px-4 py-3
          bg-white dark:bg-[#0A0A0A]
          border border-[#CCC] dark:border-[#444]
          text-black dark:text-white text-sm
          placeholder:text-[#999] dark:placeholder:text-[#666]
          focus:outline-none focus:border-black dark:focus:border-[#E8E4E0]
          transition-colors
          ${error ? 'border-red-500' : ''}
        `}
      />
      {error && (
        <p className="text-xs text-red-500">{error}</p>
      )}
    </div>
  )
}

// Custom Select with light/dark mode support
function FormSelect({ label, name, value, onChange, onBlur, error, required, options, placeholder }) {
  return (
    <div className="space-y-2">
      <label htmlFor={name} className="block text-sm text-[#333] dark:text-[#C4C0BC]">
        {label}
        {required && <span className="text-red-500 dark:text-[#E8E4E0] ml-1">*</span>}
      </label>
      <select
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        className={`
          w-full px-4 py-3
          bg-white dark:bg-[#0A0A0A]
          border border-[#CCC] dark:border-[#444]
          text-black dark:text-white text-sm
          focus:outline-none focus:border-black dark:focus:border-[#E8E4E0]
          transition-colors appearance-none
          ${!value ? 'text-[#999] dark:text-[#666]' : ''}
          ${error ? 'border-red-500' : ''}
        `}
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%23666'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`,
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'right 12px center',
          backgroundSize: '16px',
        }}
      >
        <option value="">{placeholder}</option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      {error && (
        <p className="text-xs text-red-500">{error}</p>
      )}
    </div>
  )
}

// Custom Textarea with light/dark mode support
function FormTextarea({ label, name, value, onChange, onBlur, error, required, rows = 4 }) {
  return (
    <div className="space-y-2">
      <label htmlFor={name} className="block text-sm text-[#333] dark:text-[#C4C0BC]">
        {label}
        {required && <span className="text-red-500 dark:text-[#E8E4E0] ml-1">*</span>}
      </label>
      <textarea
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        rows={rows}
        className={`
          w-full px-4 py-3
          bg-white dark:bg-[#0A0A0A]
          border border-[#CCC] dark:border-[#444]
          text-black dark:text-white text-sm
          placeholder:text-[#999] dark:placeholder:text-[#666]
          focus:outline-none focus:border-black dark:focus:border-[#E8E4E0]
          transition-colors resize-none
          ${error ? 'border-red-500' : ''}
        `}
      />
      {error && (
        <p className="text-xs text-red-500">{error}</p>
      )}
    </div>
  )
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
      <div className="p-8 text-center bg-[#F5F5F5] dark:bg-[#111] border border-black dark:border-[#E8E4E0]">
        <div className="w-16 h-16 mx-auto mb-6 border border-black dark:border-[#E8E4E0] flex items-center justify-center">
          <svg className="w-8 h-8 text-black dark:text-[#E8E4E0]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-xl font-semibold text-black dark:text-[#E8E4E0] mb-3">
          Inquiry Received
        </h3>
        <p className="text-sm text-[#555] dark:text-[#6B6865] mb-6">
          Our partnerships team will review your inquiry and respond within 3-5 business days.
        </p>
        <button
          onClick={resetForm}
          className="text-sm text-[#555] dark:text-[#6B6865] hover:text-black dark:hover:text-[#E8E4E0] transition-colors"
        >
          Submit another inquiry
        </button>
      </div>
    )
  }

  return (
    <form onSubmit={onFormSubmit} className="space-y-6">
      {/* Company Info Section */}
      <div className="p-6 bg-[#F5F5F5] dark:bg-[#111] border border-[#E0E0E0] dark:border-[#333]">
        <p className="font-mono text-xs uppercase tracking-wider text-[#666] dark:text-[#6B6865] mb-6">
          Company Info
        </p>
        <div className="grid md:grid-cols-2 gap-4">
          <FormInput
            label="Company Name"
            name="companyName"
            value={values.companyName}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.companyName && errors.companyName}
            required
            placeholder="Your company"
          />
          <FormSelect
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
        <div className="mt-4">
          <FormInput
            label="Website"
            name="website"
            value={values.website}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="https://yourcompany.com"
          />
        </div>
      </div>

      {/* Contact Info Section */}
      <div className="p-6 bg-[#F5F5F5] dark:bg-[#111] border border-[#E0E0E0] dark:border-[#333]">
        <p className="font-mono text-xs uppercase tracking-wider text-[#666] dark:text-[#6B6865] mb-6">
          Contact Info
        </p>
        <div className="grid md:grid-cols-2 gap-4">
          <FormInput
            label="Your Name"
            name="contactName"
            value={values.contactName}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.contactName && errors.contactName}
            required
            placeholder="Full name"
          />
          <FormInput
            label="Email"
            name="email"
            type="email"
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.email && errors.email}
            required
            placeholder="you@company.com"
          />
        </div>
        <div className="mt-4">
          <FormInput
            label="Phone (Optional)"
            name="phone"
            type="tel"
            value={values.phone}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="+1 (555) 000-0000"
          />
        </div>
      </div>

      {/* Message Section */}
      <div className="p-6 bg-[#F5F5F5] dark:bg-[#111] border border-[#E0E0E0] dark:border-[#333]">
        <p className="font-mono text-xs uppercase tracking-wider text-[#666] dark:text-[#6B6865] mb-6">
          Partnership Details
        </p>
        <FormTextarea
          label="Tell us about the opportunity"
          name="message"
          value={values.message}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.message && errors.message}
          required
          rows={5}
        />
        <p className="text-xs text-[#999] dark:text-[#4A4845] mt-2">
          What are you looking to achieve? How can we work together?
        </p>
      </div>

      {/* Error Display */}
      {submitError && (
        <div className="border border-red-500 bg-red-50 dark:bg-red-500/10 p-4">
          <p className="text-sm text-red-600 dark:text-red-400">{submitError}</p>
        </div>
      )}

      {/* Submit Button */}
      <div className="flex flex-col sm:flex-row gap-3">
        <button
          type="submit"
          disabled={isSubmitting}
          className="flex-1 py-4 bg-black dark:bg-[#E8E4E0] text-white dark:text-[#0A0A0A] text-sm font-medium uppercase tracking-wide hover:bg-[#333] dark:hover:bg-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
        >
          {isSubmitting ? (
            <>
              <span className="w-4 h-4 border-2 border-white dark:border-[#0A0A0A] border-t-transparent rounded-full animate-spin" />
              Processing...
            </>
          ) : (
            'Submit Inquiry'
          )}
        </button>
        <button
          type="button"
          onClick={resetForm}
          className="py-4 px-6 text-[#666] dark:text-[#6B6865] text-sm hover:text-black dark:hover:text-[#C4C0BC] transition-colors"
        >
          Reset
        </button>
      </div>
    </form>
  )
}
