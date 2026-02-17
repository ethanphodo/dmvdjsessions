import { Link } from 'react-router-dom'

function Hero() {
  return (
    <section className="relative min-h-screen w-full bg-black flex items-center justify-center grain">
      {/* Content */}
      <div className="relative container-main py-24 md:py-32 lg:py-40 text-center">
        {/* Headline - two lines */}
        <h1 className="text-responsive-hero font-bold uppercase tracking-tight leading-[0.95] mb-6 md:mb-8 animate-fade-in">
          Where the Next Wave
          <br />
          Plays First.
        </h1>

        {/* Subtext */}
        <p
          className="text-lg md:text-xl text-[#888] mb-10 md:mb-12 animate-fade-in"
          style={{ animationDelay: '0.2s' }}
        >
          High-quality DJ sessions spotlighting DMV's rising talent.
        </p>

        {/* CTAs */}
        <div
          className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in"
          style={{ animationDelay: '0.4s' }}
        >
          <Link
            to="/submit"
            className="btn-hover inline-flex items-center justify-center px-8 py-4 bg-white text-black text-sm font-medium uppercase tracking-wide hover:bg-[#E5E5E5] transition-colors"
          >
            Submit a Set
          </Link>
          <Link
            to="/sessions"
            className="inline-flex items-center justify-center px-8 py-4 border border-[#333] text-white text-sm font-medium uppercase tracking-wide hover:border-white hover:bg-white/5 transition-all"
          >
            Sessions
          </Link>
        </div>
      </div>

      {/* Bottom line */}
      <div className="absolute bottom-0 left-0 right-0 divider" />
    </section>
  )
}

export default Hero
