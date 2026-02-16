import { Link } from 'react-router-dom'

function Hero() {
  return (
    <section className="relative min-h-screen w-full bg-black flex items-center grain">
      {/* Content */}
      <div className="relative max-w-5xl mx-auto px-6 py-32 md:py-40">
        <div className="max-w-3xl">
          {/* Headline */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold uppercase tracking-tight leading-[0.95] mb-8">
            Where the Next Wave Plays First.
          </h1>

          {/* Subtext */}
          <p className="text-lg md:text-xl text-[#888] max-w-xl mb-12">
            High-quality DJ sessions spotlighting DMV's rising talent.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              to="/submit"
              className="inline-flex items-center justify-center px-8 py-4 bg-white text-black text-sm font-medium uppercase tracking-wide hover:bg-[#888] transition-colors"
            >
              Submit a Set
            </Link>
            <Link
              to="/sessions"
              className="inline-flex items-center justify-center px-8 py-4 border border-[#333] text-white text-sm font-medium uppercase tracking-wide hover:border-white transition-colors"
            >
              Sessions
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom line accent */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-[#1A1A1A]" />
    </section>
  )
}

export default Hero
