import { Link } from 'react-router-dom'

function Hero() {
  return (
    <section className="relative min-h-screen w-full bg-[#050505] grid-bg pt-12">
      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 pt-24 pb-16">
        {/* Section Label */}
        <div className="font-mono text-xs uppercase tracking-tight text-[#888] mb-8">
          [ 01 ] HERO
        </div>

        {/* Headline */}
        <div className="border border-[#1A1A1A] bg-[#0A0A0A] p-8 md:p-12 mb-6">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-black uppercase tracking-tighter leading-[0.9] mb-6 text-white italic">
            The Sound
            <br />
            of The Capital
          </h1>

          <p className="font-mono text-sm text-[#888] max-w-md">
            Intimate sessions with DMV's finest house music selectors.
            Washington DC / Maryland / Virginia.
          </p>
        </div>

        {/* Double Line Divider - Logo Inspired */}
        <div className="syber-divider mb-6" />

        {/* Video Container */}
        <div className="border border-[#1A1A1A] bg-black aspect-video relative overflow-hidden mb-6">
          <video
            autoPlay
            muted
            loop
            playsInline
            className="absolute inset-0 w-full h-full object-cover opacity-90"
          >
            <source src="/videos/hero-1.mp4" type="video/mp4" />
          </video>

          {/* Video Overlay Label */}
          <div className="absolute top-4 left-4 font-mono text-xs text-white uppercase tracking-tight flex items-center gap-2">
            <span className="w-2 h-2 bg-[#E21D1D] blink" />
            <span>LIVE_PREVIEW</span>
          </div>

          {/* Technical Data */}
          <div className="absolute bottom-4 right-4 font-mono text-xs text-white/70 uppercase">
            1920×1080 / 24FPS
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-3">
          <Link
            to="/watch"
            className="border border-white/20 px-6 py-3 bg-white text-black font-mono text-xs uppercase tracking-tight hover:border-[#E21D1D] hover:bg-[#E21D1D] hover:text-white transition-all duration-75"
          >
            Watch Sessions
          </Link>
          <Link
            to="/apply"
            className="border border-white/20 px-6 py-3 bg-transparent text-white font-mono text-xs uppercase tracking-tight hover:border-[#E21D1D] hover:text-[#E21D1D] transition-all duration-75"
          >
            Apply to Play // [01]
          </Link>
        </div>
      </div>

      {/* Bottom Border - Double Line */}
      <div className="syber-divider" />
    </section>
  )
}

export default Hero
