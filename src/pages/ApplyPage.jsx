import PageHeader from '../components/layout/PageHeader'
import TalentForm from '../components/forms/TalentForm'
import { GENRES } from '../utils/constants'

export default function ApplyPage() {
  return (
    <div className="min-h-screen bg-[#050505] grid-bg pt-12">
      <div className="max-w-7xl mx-auto px-6">
        <PageHeader
          sectionNumber="01"
          sectionLabel="APPLY"
          title="Join The Roster"
          subtitle="We're looking for DMV DJs who bring authentic energy and exceptional selections. If you've got the vibe, we want to hear from you."
        />

        <div className="grid lg:grid-cols-3 gap-8 pb-24">
          {/* Form Column */}
          <div className="lg:col-span-2">
            <TalentForm />
          </div>

          {/* Info Column */}
          <div className="space-y-6">
            {/* Requirements */}
            <div className="border border-[#1A1A1A] bg-[#0A0A0A]">
              <div className="border-b border-[#1A1A1A] px-4 py-3">
                <span className="font-mono text-xs uppercase tracking-tight text-white">
                  REQUIREMENTS
                </span>
              </div>
              <div className="p-6">
                <ul className="space-y-3 font-mono text-xs text-[#888] uppercase">
                  <li className="flex items-start gap-2">
                    <span className="text-[#E21D1D]">→</span>
                    <span>Based in DC, Maryland, or Virginia</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#E21D1D]">→</span>
                    <span>Active mix archive (SoundCloud/Mixcloud)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#E21D1D]">→</span>
                    <span>Minimum 2 years of DJing experience</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#E21D1D]">→</span>
                    <span>Professional demeanor & reliability</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Genres */}
            <div className="border border-[#1A1A1A] bg-[#0A0A0A]">
              <div className="border-b border-[#1A1A1A] px-4 py-3">
                <span className="font-mono text-xs uppercase tracking-tight text-white">
                  GENRES_ACCEPTED
                </span>
              </div>
              <div className="p-6">
                <div className="flex flex-wrap gap-2">
                  {GENRES.map((genre) => (
                    <span
                      key={genre.value}
                      className="px-2 py-1 border border-[#1A1A1A] font-mono text-[10px] text-[#888] uppercase"
                    >
                      {genre.label}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* What We Provide */}
            <div className="border border-[#1A1A1A] bg-[#0A0A0A]">
              <div className="border-b border-[#1A1A1A] px-4 py-3">
                <span className="font-mono text-xs uppercase tracking-tight text-white">
                  WHAT_WE_PROVIDE
                </span>
              </div>
              <div className="p-6">
                <ul className="space-y-3 font-mono text-xs text-[#888] uppercase">
                  <li className="flex items-start gap-2">
                    <span className="text-white">✓</span>
                    <span>Professional video production</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-white">✓</span>
                    <span>High-quality audio recording</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-white">✓</span>
                    <span>Promotion across our channels</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-white">✓</span>
                    <span>Unique venue access</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-white">✓</span>
                    <span>Content for your portfolio</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Contact */}
            <div className="border border-[#E21D1D] bg-[#0A0A0A]">
              <div className="border-b border-[#1A1A1A] px-4 py-3 flex items-center justify-between">
                <span className="font-mono text-xs uppercase tracking-tight text-white">
                  DIRECT_CONTACT
                </span>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-[#E21D1D] blink" />
                  <span className="font-mono text-[10px] uppercase text-[#888]">OPEN</span>
                </div>
              </div>
              <div className="p-6">
                <p className="text-sm text-[#888] mb-4">
                  Questions about the application process?
                </p>
                <a
                  href="mailto:apply@dmvdjsessions.com"
                  className="inline-block border border-white/20 px-4 py-2 bg-transparent text-white font-mono text-xs uppercase tracking-tight hover:border-[#E21D1D] hover:text-[#E21D1D] transition-all duration-75"
                >
                  apply@dmvdjsessions.com
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
