import { Link } from 'react-router-dom'

function Hero() {
  return (
    <section className="relative min-h-screen w-full bg-black pt-20 md:pt-12 flex items-center">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-black to-[#0A0A0A]" />

      {/* Subtle grid overlay */}
      <div className="absolute inset-0 opacity-20">
        <div className="w-full h-full" style={{
          backgroundImage: 'radial-gradient(#1A1A1A 1px, transparent 1px)',
          backgroundSize: '32px 32px'
        }} />
      </div>

      {/* Main Content */}
      <div className="relative max-w-7xl mx-auto px-6 py-24 md:py-32">
        {/* Headline */}
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-black uppercase tracking-tighter leading-[0.85] mb-8 text-white">
          The Sound
          <br />
          <span className="text-[#E21D1D]">of The Capital</span>
        </h1>

        <p className="text-lg md:text-xl text-[#888] max-w-lg mb-12">
          Intimate sessions with DMV's finest house music selectors.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4">
          <Link
            to="/watch"
            className="inline-flex items-center justify-center px-8 py-4 bg-[#E21D1D] text-white font-mono text-sm uppercase tracking-tight hover:bg-white hover:text-black transition-all duration-150"
          >
            Watch Sessions
          </Link>
          <Link
            to="/apply"
            className="inline-flex items-center justify-center px-8 py-4 border border-white/30 text-white font-mono text-sm uppercase tracking-tight hover:border-[#E21D1D] hover:text-[#E21D1D] transition-all duration-150"
          >
            Apply to Play
          </Link>
        </div>

        {/* Stats */}
        <div className="mt-20 flex gap-12">
          <div>
            <div className="text-3xl md:text-4xl font-black text-white">8</div>
            <div className="font-mono text-xs text-[#888] uppercase mt-1">Sessions</div>
          </div>
          <div>
            <div className="text-3xl md:text-4xl font-black text-white">50K+</div>
            <div className="font-mono text-xs text-[#888] uppercase mt-1">Views</div>
          </div>
          <div>
            <div className="text-3xl md:text-4xl font-black text-white">DMV</div>
            <div className="font-mono text-xs text-[#888] uppercase mt-1">DC • MD • VA</div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
        <div className="w-px h-12 bg-gradient-to-b from-transparent to-[#E21D1D]" />
      </div>
    </section>
  )
}

export default Hero
