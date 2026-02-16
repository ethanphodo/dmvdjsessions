import Hero from '../components/Hero'

export default function HomePage() {
  return (
    <>
      <Hero />

      {/* Series Preview */}
      <section className="bg-black py-24 md:py-32">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-sm font-medium uppercase tracking-wide text-[#666] mb-12">
            Series
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Studio */}
            <div className="group">
              <div className="h-px bg-[#D6A756] mb-6" />
              <h3 className="text-xl font-bold uppercase tracking-tight mb-2">
                Studio Sessions
              </h3>
              <p className="text-sm text-[#888]">
                Intimate sets. Warm light. Pure sound.
              </p>
            </div>

            {/* Warehouse */}
            <div className="group">
              <div className="h-px bg-[#8B1E2D] mb-6" />
              <h3 className="text-xl font-bold uppercase tracking-tight mb-2">
                Warehouse Series
              </h3>
              <p className="text-sm text-[#888]">
                Raw energy. Industrial space. No limits.
              </p>
            </div>

            {/* Rooftop */}
            <div className="group">
              <div className="h-px bg-[#7FAFD4] mb-6" />
              <h3 className="text-xl font-bold uppercase tracking-tight mb-2">
                Rooftop Series
              </h3>
              <p className="text-sm text-[#888]">
                Golden hour. City views. Open air.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="h-px bg-[#1A1A1A]" />

      {/* CTA */}
      <section className="bg-black py-24 md:py-32">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold uppercase tracking-tight mb-6">
            Play First.
          </h2>
          <p className="text-[#888] max-w-md mx-auto mb-10">
            We curate emerging DJs across the DMV.<br />
            Submit your mix and tell us your sound.
          </p>
          <a
            href="/submit"
            className="inline-flex items-center justify-center px-8 py-4 bg-white text-black text-sm font-medium uppercase tracking-wide hover:bg-[#888] transition-colors"
          >
            Submit a Set
          </a>
        </div>
      </section>
    </>
  )
}
