export default function AboutPage() {
  return (
    <div className="min-h-screen bg-black pt-24 md:pt-20">
      <div className="max-w-3xl mx-auto px-6 section-padding">
        {/* Header */}
        <h1 className="text-sm font-medium uppercase tracking-wide text-[#666] mb-12 animate-fade-in">
          About
        </h1>

        {/* Mission */}
        <p
          className="text-responsive-xl leading-relaxed mb-16 animate-fade-in"
          style={{ animationDelay: '0.1s' }}
        >
          A platform dedicated to spotlighting the next wave of DMV DJs through high-quality, identity-driven sets.
        </p>

        <div className="divider mb-16" />

        {/* Philosophy */}
        <div className="mb-16">
          <h2 className="text-sm font-medium uppercase tracking-wide text-[#666] mb-8">
            Philosophy
          </h2>
          <div className="space-y-4 text-lg md:text-xl text-[#888]">
            <p className="hover-lift inline-block">Curated over chaotic.</p>
            <p className="hover-lift inline-block">Minimal over loud.</p>
            <p className="hover-lift inline-block">Cinematic over casual.</p>
            <p className="text-white hover-lift inline-block">Performance over personality.</p>
          </div>
        </div>

        <div className="divider mb-16" />

        {/* Series Identity */}
        <div className="mb-16">
          <h2 className="text-sm font-medium uppercase tracking-wide text-[#666] mb-8">
            Series Identity
          </h2>

          <p className="text-lg md:text-xl text-[#888] mb-8">
            Studio. Warehouse. Rooftop.<br />
            <span className="text-white">Each series. A distinct identity.</span>
          </p>

          <div className="grid md:grid-cols-3 gap-8 mt-12">
            <div className="group hover-lift">
              <div className="w-full h-1 bg-[#D6A756] mb-4 group-hover:h-2 transition-all duration-300" />
              <h3 className="text-sm font-medium uppercase tracking-wide mb-1">Studio</h3>
              <p className="text-xs text-[#666]">Washington, DC</p>
            </div>
            <div className="group hover-lift">
              <div className="w-full h-1 bg-[#8B1E2D] mb-4 group-hover:h-2 transition-all duration-300" />
              <h3 className="text-sm font-medium uppercase tracking-wide mb-1">Warehouse</h3>
              <p className="text-xs text-[#666]">Maryland</p>
            </div>
            <div className="group hover-lift">
              <div className="w-full h-1 bg-[#7FAFD4] mb-4 group-hover:h-2 transition-all duration-300" />
              <h3 className="text-sm font-medium uppercase tracking-wide mb-1">Rooftop</h3>
              <p className="text-xs text-[#666]">Virginia</p>
            </div>
          </div>
        </div>

        <div className="divider mb-16" />

        {/* Contact */}
        <div>
          <h2 className="text-sm font-medium uppercase tracking-wide text-[#666] mb-8">
            Contact
          </h2>
          <a
            href="mailto:hello@dmvdjsessions.com"
            className="link-hover text-lg text-white hover:text-[#888] transition-colors"
          >
            hello@dmvdjsessions.com
          </a>

          <div className="flex gap-8 mt-8">
            <a
              href="https://instagram.com/dmvdjsessions"
              target="_blank"
              rel="noopener noreferrer"
              className="link-hover text-sm text-[#666] hover:text-white transition-colors uppercase tracking-wide"
            >
              Instagram
            </a>
            <a
              href="https://youtube.com/@dmvdjsessions"
              target="_blank"
              rel="noopener noreferrer"
              className="link-hover text-sm text-[#666] hover:text-white transition-colors uppercase tracking-wide"
            >
              YouTube
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
