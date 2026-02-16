import { Link } from 'react-router-dom'

function ApplyCTA() {
  return (
    <section id="apply" className="bg-[#050505] grid-bg">
      {/* Double Line Divider */}
      <div className="syber-divider" />

      <div className="max-w-7xl mx-auto px-6 py-24">
        {/* Section Label */}
        <div className="font-mono text-xs uppercase tracking-tight text-[#888] mb-8">
          [ 04 ] APPLY
        </div>

        {/* Application Card */}
        <div className="border border-[#1A1A1A] bg-[#0A0A0A] max-w-2xl">
          {/* Card Header */}
          <div className="border-b border-[#1A1A1A] px-6 py-4 flex items-center justify-between">
            <span className="font-mono text-xs uppercase tracking-tight text-white">
              DJ_APPLICATION
            </span>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-[#E21D1D] blink" />
              <span className="font-mono text-xs uppercase text-[#888]">OPEN</span>
            </div>
          </div>

          {/* Card Content */}
          <div className="p-6 md:p-8">
            <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tighter mb-6 text-white italic">
              Are You Next?
            </h2>

            <div className="space-y-4 mb-8">
              <p className="text-sm text-[#888]">
                We're looking for DMV DJs who bring the heat.
              </p>
              <div className="font-mono text-xs text-[#888] uppercase leading-relaxed">
                GENRES_ACCEPTED:
                <br />
                → House
                <br />
                → Deep House
                <br />
                → Tech House
                <br />
                → Afro House
              </div>
              <p className="text-sm text-[#888]">
                If you've got the vibe, we want to hear from you.
              </p>
            </div>

            {/* Action Buttons - Syber Style */}
            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                to="/apply"
                className="border border-white/20 px-6 py-3 bg-white text-black font-mono text-xs uppercase tracking-tight hover:bg-[#E21D1D] hover:border-[#E21D1D] hover:text-white transition-all duration-75 text-center"
              >
                Submit Application // [01]
              </Link>
              <a
                href="mailto:apply@dmvdjsessions.com"
                className="border border-white/20 px-6 py-3 bg-transparent text-white font-mono text-xs uppercase tracking-tight hover:border-[#E21D1D] hover:text-[#E21D1D] transition-all duration-75 text-center"
              >
                Contact Direct
              </a>
            </div>
          </div>

          {/* Card Footer */}
          <div className="border-t border-[#1A1A1A] px-6 py-3 font-mono text-xs text-[#888] uppercase">
            Response time: 48-72 hours
          </div>
        </div>
      </div>
    </section>
  )
}

export default ApplyCTA
