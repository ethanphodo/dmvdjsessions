function About() {
  return (
    <section id="about" className="bg-[#050505] grid-bg">
      {/* Double Line Divider */}
      <div className="syber-divider" />

      <div className="max-w-7xl mx-auto px-6 py-24">
        {/* Section Label */}
        <div className="font-mono text-xs uppercase tracking-tight text-[#888] mb-8">
          [ 02 ] ABOUT
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Quote Card */}
          <div className="border border-[#1A1A1A] bg-[#0A0A0A] p-8">
            <div className="font-mono text-xs uppercase tracking-tight text-[#888] mb-6">
              MANIFESTO
            </div>
            <blockquote className="text-2xl md:text-3xl font-black uppercase tracking-tighter leading-tight text-white italic">
              Real sessions.
              <br />
              Real talent.
              <br />
              Real DMV.
            </blockquote>
          </div>

          {/* Description Card */}
          <div className="border border-[#1A1A1A] bg-[#0A0A0A] p-8">
            <div className="font-mono text-xs uppercase tracking-tight text-[#888] mb-6">
              MISSION
            </div>
            <p className="text-sm text-[#888] leading-relaxed mb-4">
              We're building something different. No gimmicks. No drama. Just
              great DJs playing great music in intimate spaces across DC,
              Maryland & Virginia.
            </p>
            <p className="text-sm text-[#888] leading-relaxed">
              Each session showcases one artist, one hour, one vibe. Raw,
              unfiltered, and real.
            </p>
          </div>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-3 mt-6">
          <div className="border border-[#1A1A1A] bg-[#0A0A0A] p-6 text-center border-r-0">
            <div className="font-mono text-xs uppercase tracking-tight text-[#888] mb-2">
              REGION_01
            </div>
            <div className="text-2xl font-black uppercase tracking-tighter text-white">DC</div>
            <div className="font-mono text-xs text-[#888] mt-1">Studios</div>
          </div>
          <div className="border border-[#1A1A1A] bg-[#0A0A0A] p-6 text-center border-r-0">
            <div className="font-mono text-xs uppercase tracking-tight text-[#888] mb-2">
              REGION_02
            </div>
            <div className="text-2xl font-black uppercase tracking-tighter text-white">MD</div>
            <div className="font-mono text-xs text-[#888] mt-1">Warehouses</div>
          </div>
          <div className="border border-[#1A1A1A] bg-[#0A0A0A] p-6 text-center">
            <div className="font-mono text-xs uppercase tracking-tight text-[#888] mb-2">
              REGION_03
            </div>
            <div className="text-2xl font-black uppercase tracking-tighter text-white">VA</div>
            <div className="font-mono text-xs text-[#888] mt-1">Rooftops</div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About
