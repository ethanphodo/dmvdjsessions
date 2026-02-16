export default function AboutPage() {
  return (
    <div className="min-h-screen bg-black pt-24 md:pt-20">
      <div className="max-w-3xl mx-auto px-6 py-24 md:py-32">
        {/* Header */}
        <h1 className="text-sm font-medium uppercase tracking-wide text-[#666] mb-12">
          About
        </h1>

        {/* Mission */}
        <p className="text-2xl md:text-3xl font-medium leading-relaxed mb-16">
          A platform dedicated to spotlighting the next wave of DMV DJs through high-quality, identity-driven sets.
        </p>

        {/* Divider */}
        <div className="h-px bg-[#1A1A1A] mb-16" />

        {/* Series */}
        <div className="space-y-2 text-lg text-[#888]">
          <p>Studio. Warehouse. Rooftop.</p>
          <p className="text-white">Each series. A distinct identity.</p>
        </div>

        {/* Series Colors */}
        <div className="mt-16 pt-16 border-t border-[#1A1A1A]">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <div className="w-full h-1 bg-[#D6A756] mb-4" />
              <h3 className="text-sm font-medium uppercase tracking-wide mb-1">Studio</h3>
              <p className="text-xs text-[#666]">Washington, DC</p>
            </div>
            <div>
              <div className="w-full h-1 bg-[#8B1E2D] mb-4" />
              <h3 className="text-sm font-medium uppercase tracking-wide mb-1">Warehouse</h3>
              <p className="text-xs text-[#666]">Maryland</p>
            </div>
            <div>
              <div className="w-full h-1 bg-[#7FAFD4] mb-4" />
              <h3 className="text-sm font-medium uppercase tracking-wide mb-1">Rooftop</h3>
              <p className="text-xs text-[#666]">Virginia</p>
            </div>
          </div>
        </div>

        {/* Contact */}
        <div className="mt-16 pt-16 border-t border-[#1A1A1A]">
          <p className="text-sm text-[#666] mb-4">Contact</p>
          <a
            href="mailto:hello@dmvdjsessions.com"
            className="text-white hover:text-[#888] transition-colors"
          >
            hello@dmvdjsessions.com
          </a>
        </div>
      </div>
    </div>
  )
}
