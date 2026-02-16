import PageHeader from '../components/layout/PageHeader'
import PartnerForm from '../components/forms/PartnerForm'

const partnerBenefits = {
  venue: [
    'Premium exposure to the DMV music community',
    'Professional video content featuring your space',
    'Social media promotion and tagging',
    'Association with quality underground music',
    'Potential recurring session bookings',
  ],
  sponsor: [
    'Brand visibility in all session content',
    'Logo placement in video intros/outros',
    'Social media mentions and stories',
    'Access to engaged music audience',
    'Custom branded content opportunities',
  ],
  media: [
    'Exclusive behind-the-scenes access',
    'Early access to session releases',
    'Cross-promotion opportunities',
    'Interview and feature opportunities',
    'Joint content creation',
  ],
}

export default function PartnersPage() {
  return (
    <div className="min-h-screen bg-[#050505] grid-bg pt-20 md:pt-12">
      <div className="max-w-7xl mx-auto px-6">
        <PageHeader
          sectionNumber="01"
          sectionLabel="PARTNERS"
          title="Work With Us"
          subtitle="We're always looking for venues, sponsors, and media partners who share our vision for showcasing DMV talent."
        />

        <div className="grid lg:grid-cols-3 gap-8 pb-24">
          {/* Form Column */}
          <div className="lg:col-span-2">
            <PartnerForm />
          </div>

          {/* Info Column */}
          <div className="space-y-6">
            {/* Venue Partners */}
            <div className="border border-[#1A1A1A] bg-[#0A0A0A]">
              <div className="border-b border-[#1A1A1A] px-4 py-3">
                <span className="font-mono text-xs uppercase tracking-tight text-white">
                  VENUE_PARTNERS
                </span>
              </div>
              <div className="p-6">
                <p className="text-sm text-[#888] mb-4">
                  Have a unique space in DC, Maryland, or Virginia? We're looking for:
                </p>
                <ul className="space-y-2 font-mono text-xs text-[#888] uppercase">
                  {partnerBenefits.venue.map((benefit, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-[#E21D1D]">→</span>
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Sponsors */}
            <div className="border border-[#1A1A1A] bg-[#0A0A0A]">
              <div className="border-b border-[#1A1A1A] px-4 py-3">
                <span className="font-mono text-xs uppercase tracking-tight text-white">
                  BRAND_SPONSORS
                </span>
              </div>
              <div className="p-6">
                <p className="text-sm text-[#888] mb-4">
                  Reach an engaged audience of music lovers:
                </p>
                <ul className="space-y-2 font-mono text-xs text-[#888] uppercase">
                  {partnerBenefits.sponsor.map((benefit, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-[#E21D1D]">→</span>
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Media */}
            <div className="border border-[#1A1A1A] bg-[#0A0A0A]">
              <div className="border-b border-[#1A1A1A] px-4 py-3">
                <span className="font-mono text-xs uppercase tracking-tight text-white">
                  MEDIA_PARTNERS
                </span>
              </div>
              <div className="p-6">
                <p className="text-sm text-[#888] mb-4">
                  Music blogs, podcasts, and publications:
                </p>
                <ul className="space-y-2 font-mono text-xs text-[#888] uppercase">
                  {partnerBenefits.media.map((benefit, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-[#E21D1D]">→</span>
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Current Partners */}
            <div className="border border-[#E21D1D] bg-[#0A0A0A]">
              <div className="border-b border-[#1A1A1A] px-4 py-3 flex items-center justify-between">
                <span className="font-mono text-xs uppercase tracking-tight text-white">
                  CURRENT_PARTNERS
                </span>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-[#E21D1D]" />
                  <span className="font-mono text-[10px] uppercase text-[#888]">ACTIVE</span>
                </div>
              </div>
              <div className="p-6 text-center">
                <p className="font-mono text-xs text-[#888] uppercase">
                  Partner logos coming soon
                </p>
              </div>
            </div>

            {/* Direct Contact */}
            <div className="border border-[#1A1A1A] bg-[#0A0A0A] p-6">
              <div className="font-mono text-xs uppercase tracking-tight text-[#888] mb-4">
                DIRECT_CONTACT
              </div>
              <p className="text-sm text-[#888] mb-4">
                Prefer to reach out directly?
              </p>
              <a
                href="mailto:partners@dmvdjsessions.com"
                className="inline-block border border-white/20 px-4 py-2 bg-transparent text-white font-mono text-xs uppercase tracking-tight hover:border-[#E21D1D] hover:text-[#E21D1D] transition-all duration-75"
              >
                partners@dmvdjsessions.com
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
