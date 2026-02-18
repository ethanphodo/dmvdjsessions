import { useState, FormEvent, ChangeEvent } from 'react'
import { motion } from 'framer-motion'
import SEO from '../components/SEO'

interface FormData {
  companyName: string
  partnerType: string
  website: string
  contactName: string
  email: string
  phone: string
  message: string
}

const initialFormData: FormData = {
  companyName: '',
  partnerType: '',
  website: '',
  contactName: '',
  email: '',
  phone: '',
  message: '',
}

const partnerTypes = [
  { value: 'venue', label: 'Venue / Space' },
  { value: 'sponsor', label: 'Brand Sponsor' },
  { value: 'media', label: 'Media Partner' },
  { value: 'production', label: 'Production / Equipment' },
  { value: 'other', label: 'Other' },
]

export default function PartnersPage() {
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
    await new Promise(resolve => setTimeout(resolve, 1500))
    setIsSubmitting(false)
    setIsSubmitted(true)
  }

  const resetForm = () => {
    setFormData(initialFormData)
    setIsSubmitted(false)
  }

  const inputClasses = "w-full px-5 py-4 bg-[#121212] border border-[#222] text-[#F2F0ED] placeholder:text-[#999591]/50 focus:outline-none focus:border-[#F2F0ED] transition-colors tracking-[0.02em]"
  const labelClasses = "block text-[11px] font-medium uppercase tracking-[0.2em] text-[#999591] mb-4"

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-[#050505] pt-32">
        <SEO
          title="Inquiry Submitted | DMV DJ Sessions"
          description="Your partnership inquiry has been submitted."
        />
        <div className="container-narrow section-padding text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <p className="text-[10px] tracking-[0.3em] text-[#999591] uppercase mb-6">Inquiry Received</p>
            <h1 className="text-3xl md:text-4xl font-bold text-[#F2F0ED] mb-8 tracking-tight">We'll Be In Touch</h1>
            <p className="text-[#999591]/80 mb-12 max-w-md mx-auto leading-relaxed">
              Our partnerships team will review your inquiry and respond within 3-5 business days.
            </p>
            <button
              onClick={resetForm}
              className="text-[#999591]/80 hover:text-[#F2F0ED] transition-colors text-xs uppercase tracking-[0.15em]"
            >
              Submit Another Inquiry
            </button>
          </motion.div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen pt-40 pb-40" style={{ backgroundColor: '#050505' }}>
      <SEO
        title="Partners | DMV DJ Sessions"
        description="Partner with DMV DJ Sessions. We work with venues, sponsors, and media partners who share our vision."
      />

      {/* Header */}
      <div className="container-narrow text-center mb-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <p className="text-[10px] tracking-[0.3em] text-[#999591] uppercase mb-8">
            Partnerships
          </p>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#F2F0ED] mb-6 tracking-tight leading-tight">
            Work With Us
          </h1>
          <p className="text-[#999591]/80 max-w-lg mx-auto leading-relaxed text-base">
            We partner with venues, sponsors, and media who share our vision for showcasing DMV talent.
          </p>
        </motion.div>
      </div>

      {/* Partnership Types */}
      <div className="container-main mb-32">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid md:grid-cols-3 gap-px bg-[#222]"
        >
          {/* Venues */}
          <div className="bg-[#050505] p-10">
            <p className="text-[10px] tracking-[0.3em] text-[#999591]/60 uppercase mb-6">01</p>
            <h3 className="text-lg font-medium text-[#F2F0ED] mb-3 tracking-tight">Venues</h3>
            <p className="text-[#999591]/80 text-sm leading-relaxed mb-8">
              Your space, captured cinematically. Premium content you own.
            </p>
            <div className="space-y-3">
              <p className="text-[#999591] text-xs flex items-start gap-3">
                <span className="text-[#999591]/40">+</span>
                Professional video featuring your space
              </p>
              <p className="text-[#999591] text-xs flex items-start gap-3">
                <span className="text-[#999591]/40">+</span>
                Global audience exposure
              </p>
              <p className="text-[#999591] text-xs flex items-start gap-3">
                <span className="text-[#999591]/40">+</span>
                Recurring session opportunities
              </p>
            </div>
          </div>

          {/* Sponsors */}
          <div className="bg-[#050505] p-10">
            <p className="text-[10px] tracking-[0.3em] text-[#999591]/60 uppercase mb-6">02</p>
            <h3 className="text-lg font-medium text-[#F2F0ED] mb-3 tracking-tight">Sponsors</h3>
            <p className="text-[#999591]/80 text-sm leading-relaxed mb-8">
              Get in front of the tastemakers shaping the culture.
            </p>
            <div className="space-y-3">
              <p className="text-[#999591] text-xs flex items-start gap-3">
                <span className="text-[#999591]/40">+</span>
                Brand placement in all content
              </p>
              <p className="text-[#999591] text-xs flex items-start gap-3">
                <span className="text-[#999591]/40">+</span>
                Logo in video intros/outros
              </p>
              <p className="text-[#999591] text-xs flex items-start gap-3">
                <span className="text-[#999591]/40">+</span>
                Direct access to DMV music scene
              </p>
            </div>
          </div>

          {/* Media */}
          <div className="bg-[#050505] p-10">
            <p className="text-[10px] tracking-[0.3em] text-[#999591]/60 uppercase mb-6">03</p>
            <h3 className="text-lg font-medium text-[#F2F0ED] mb-3 tracking-tight">Media</h3>
            <p className="text-[#999591]/80 text-sm leading-relaxed mb-8">
              Tell the story with us. First access to everything.
            </p>
            <div className="space-y-3">
              <p className="text-[#999591] text-xs flex items-start gap-3">
                <span className="text-[#999591]/40">+</span>
                Exclusive behind-the-scenes
              </p>
              <p className="text-[#999591] text-xs flex items-start gap-3">
                <span className="text-[#999591]/40">+</span>
                Early session releases
              </p>
              <p className="text-[#999591] text-xs flex items-start gap-3">
                <span className="text-[#999591]/40">+</span>
                Co-branded content opportunities
              </p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Form */}
      <div className="container-narrow">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="text-center mb-16">
            <p className="text-[10px] tracking-[0.3em] text-[#999591] uppercase mb-4">Get Started</p>
            <h2 className="text-2xl font-bold text-[#F2F0ED] tracking-tight">Tell Us About Your Partnership</h2>
          </div>

          <form onSubmit={handleSubmit} className="space-y-20">

            {/* Company Info */}
            <section>
              <div className="mb-10">
                <h3 className="text-sm font-medium uppercase tracking-[0.15em] text-[#F2F0ED] mb-2">
                  Company Info
                </h3>
                <p className="text-[11px] uppercase tracking-[0.2em] text-[#999591]/60">About Your Organization</p>
              </div>

              <div className="space-y-8">
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <label htmlFor="companyName" className={labelClasses}>Company Name</label>
                    <input
                      type="text"
                      id="companyName"
                      name="companyName"
                      value={formData.companyName}
                      onChange={handleChange}
                      required
                      className={inputClasses}
                    />
                  </div>
                  <div>
                    <label htmlFor="partnerType" className={labelClasses}>Partnership Type</label>
                    <select
                      id="partnerType"
                      name="partnerType"
                      value={formData.partnerType}
                      onChange={handleChange}
                      required
                      className={`${inputClasses} appearance-none`}
                      style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%23666'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='1' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`,
                        backgroundRepeat: 'no-repeat',
                        backgroundPosition: 'right 16px center',
                        backgroundSize: '16px',
                      }}
                    >
                      <option value="">Select type...</option>
                      {partnerTypes.map(type => (
                        <option key={type.value} value={type.value}>{type.label}</option>
                      ))}
                    </select>
                  </div>
                </div>
                <div>
                  <label htmlFor="website" className={labelClasses}>
                    Website <span className="text-[#999591]/60 font-normal">(Optional)</span>
                  </label>
                  <input
                    type="url"
                    id="website"
                    name="website"
                    value={formData.website}
                    onChange={handleChange}
                    placeholder="https://"
                    className={inputClasses}
                  />
                </div>
              </div>
            </section>

            {/* Divider */}
            <div className="h-px bg-[#222]" />

            {/* Contact Info */}
            <section>
              <div className="mb-10">
                <h3 className="text-sm font-medium uppercase tracking-[0.15em] text-[#F2F0ED] mb-2">
                  Contact Info
                </h3>
                <p className="text-[11px] uppercase tracking-[0.2em] text-[#999591]/60">Who Should We Reach</p>
              </div>

              <div className="space-y-8">
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <label htmlFor="contactName" className={labelClasses}>Your Name</label>
                    <input
                      type="text"
                      id="contactName"
                      name="contactName"
                      value={formData.contactName}
                      onChange={handleChange}
                      required
                      className={inputClasses}
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className={labelClasses}>Email</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className={inputClasses}
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="phone" className={labelClasses}>
                    Phone <span className="text-[#999591]/60 font-normal">(Optional)</span>
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+1 (555) 000-0000"
                    className={inputClasses}
                  />
                </div>
              </div>
            </section>

            {/* Divider */}
            <div className="h-px bg-[#222]" />

            {/* Partnership Details */}
            <section>
              <div className="mb-10">
                <h3 className="text-sm font-medium uppercase tracking-[0.15em] text-[#F2F0ED] mb-2">
                  Partnership Details
                </h3>
                <p className="text-[11px] uppercase tracking-[0.2em] text-[#999591]/60">The Opportunity</p>
              </div>

              <div>
                <label htmlFor="message" className={labelClasses}>Tell Us About The Opportunity</label>
                <p className="text-[#999591]/60 text-sm mb-4 leading-relaxed">
                  What are you looking to achieve? How can we work together?
                </p>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={5}
                  required
                  className={`${inputClasses} resize-none`}
                />
              </div>
            </section>

            {/* Submit */}
            <div className="pt-8">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-5 rounded-full text-[#050505] text-xs font-medium uppercase tracking-[0.2em] hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-3"
                style={{ background: 'linear-gradient(135deg, #A68B6A 0%, #8B7355 100%)' }}
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Submitting
                  </>
                ) : (
                  'Submit Inquiry'
                )}
              </button>
            </div>
          </form>

          {/* Direct Contact */}
          <div className="mt-20 text-center">
            <div className="h-px bg-[#222] mb-12" />
            <p className="text-[#999591]/60 text-sm mb-4">Prefer to reach out directly?</p>
            <a
              href="mailto:partners@dmvdjsessions.com"
              className="inline-flex items-center gap-3 text-[#F2F0ED]/60 hover:text-[#F2F0ED] transition-colors text-sm tracking-[0.05em]"
            >
              partners@dmvdjsessions.com
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
