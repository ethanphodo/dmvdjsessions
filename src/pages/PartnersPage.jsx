import { motion } from 'framer-motion'
import PartnerForm from '../components/forms/PartnerForm'
import SEO from '../components/SEO'

// Icons for value proposition cards
const VenueIcon = () => (
  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
  </svg>
)

const SponsorIcon = () => (
  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
  </svg>
)

const MediaIcon = () => (
  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
  </svg>
)

const valueProps = [
  {
    id: 'venue',
    icon: VenueIcon,
    title: 'Venues',
    description: 'Your space, captured cinematically. Premium content you own.',
    benefits: ['Professional video featuring your space', 'Global audience exposure', 'Recurring session opportunities'],
  },
  {
    id: 'sponsor',
    icon: SponsorIcon,
    title: 'Sponsors',
    description: 'Get in front of the tastemakers shaping the culture.',
    benefits: ['Brand placement in all content', 'Logo in video intros/outros', 'Direct access to DMV music scene'],
  },
  {
    id: 'media',
    icon: MediaIcon,
    title: 'Media',
    description: 'Tell the story with us. First access to everything.',
    benefits: ['Exclusive behind-the-scenes', 'Early session releases', 'Co-branded content opportunities'],
  },
]

export default function PartnersPage() {
  return (
    <div className="min-h-screen pt-28 bg-white dark:bg-black">
      <SEO
        title="Partners | DMV DJ Sessions"
        description="Partner with DMV DJ Sessions. We work with venues, sponsors, and media partners who share our vision for showcasing DMV talent."
        keywords="DJ partnerships, venue partnerships, music sponsors, DMV music, Washington DC events"
      />

      <div className="container-main">
        {/* Header */}
        <div className="pt-8 md:pt-16 pb-12 md:pb-16">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-xs tracking-widest text-[#6B6865] uppercase mb-6"
          >
            Partners
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight text-black dark:text-[#E8E4E0] mb-4"
          >
            Work With Us
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-[#6B6865] max-w-xl text-base"
          >
            We partner with venues, sponsors, and media who share our vision for showcasing DMV talent.
          </motion.p>
        </div>

        {/* Value Proposition Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="grid md:grid-cols-3 gap-6 mb-16"
        >
          {valueProps.map((prop, index) => (
            <motion.div
              key={prop.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + index * 0.1 }}
              className="p-6 bg-[#F5F5F5] dark:bg-[#141414] border border-[#E0E0E0] dark:border-[#333] hover:border-[#999] dark:hover:border-[#555] transition-colors"
            >
              {/* Icon */}
              <div className="w-14 h-14 border border-black dark:border-[#E8E4E0] flex items-center justify-center mb-5 text-black dark:text-[#E8E4E0]">
                <prop.icon />
              </div>

              {/* Title */}
              <h3 className="text-lg font-semibold text-black dark:text-[#E8E4E0] mb-2 tracking-tight">
                {prop.title}
              </h3>

              {/* Description */}
              <p className="text-sm text-[#555] dark:text-[#6B6865] mb-4">
                {prop.description}
              </p>

              {/* Benefits */}
              <ul className="space-y-2">
                {prop.benefits.map((benefit, i) => (
                  <li key={i} className="flex items-start gap-2 text-xs text-[#555] dark:text-[#6B6865]">
                    <span className="text-black dark:text-[#E8E4E0] mt-0.5">+</span>
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>

        {/* Form Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="max-w-2xl mx-auto pb-24"
        >
          {/* Section Label */}
          <div className="text-center mb-8">
            <p className="text-xs tracking-widest text-[#6B6865] uppercase mb-3">
              Get Started
            </p>
            <h2 className="text-2xl font-semibold text-black dark:text-[#E8E4E0] tracking-tight">
              Tell us about your partnership
            </h2>
          </div>

          <PartnerForm />

          {/* Direct Contact */}
          <div className="mt-12 text-center border-t border-[#E0E0E0] dark:border-[#1C1C1C] pt-8">
            <p className="text-sm text-[#6B6865] mb-3">
              Prefer to reach out directly?
            </p>
            <a
              href="mailto:partners@dmvdjsessions.com"
              className="inline-flex items-center gap-2 text-black dark:text-[#E8E4E0] hover:opacity-70 transition-opacity text-sm"
            >
              partners@dmvdjsessions.com
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
