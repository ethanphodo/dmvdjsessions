import PageTitle from '../components/layout/PageTitle'
import SEO from '../components/SEO'

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-black pt-28">
      <SEO
        title="About | DMV DJ Sessions"
        description="A platform dedicated to spotlighting the next wave of DMV DJs through high-quality, identity-driven sets. Studio, Warehouse, and Rooftop series."
      />
      <div className="container-narrow text-center">
        <PageTitle title="ABOUT" />

        {/* Mission */}
        <p className="text-responsive-xl leading-relaxed mb-20 md:mb-24 animate-fade-in">
          A platform dedicated to spotlighting the next wave of DMV DJs through high-quality, identity-driven sets.
        </p>

        <div className="divider mb-20 md:mb-24" />

        {/* Philosophy */}
        <div className="mb-20 md:mb-24">
          <h2 className="text-sm font-medium uppercase tracking-wide text-[#666] mb-10 md:mb-12">
            Philosophy
          </h2>
          <div className="space-y-6 text-lg md:text-xl text-[#888]">
            <p className="hover-lift inline-block">Curated over chaotic.</p>
            <p className="hover-lift inline-block">Minimal over loud.</p>
            <p className="hover-lift inline-block">Cinematic over casual.</p>
            <p className="text-white hover-lift inline-block">Performance over personality.</p>
          </div>
        </div>

        <div className="divider mb-20 md:mb-24" />

        {/* Series Identity */}
        <div className="mb-20 md:mb-24">
          <h2 className="text-sm font-medium uppercase tracking-wide text-[#666] mb-10 md:mb-12">
            Series Identity
          </h2>

          <p className="text-lg md:text-xl text-[#888] mb-10">
            Studio. Warehouse. Rooftop.<br />
            <span className="text-white">Each series. A distinct identity.</span>
          </p>

          <div className="grid md:grid-cols-3 gap-8 md:gap-12 mt-16 text-left">
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

        <div className="divider mb-20 md:mb-24" />

        {/* Contact */}
        <div className="pb-32">
          <h2 className="text-sm font-medium uppercase tracking-wide text-[#666] mb-10 md:mb-12">
            Contact
          </h2>
          <a
            href="mailto:hello@dmvdjsessions.com"
            className="link-hover text-lg text-white hover:text-[#888] transition-colors"
          >
            hello@dmvdjsessions.com
          </a>

          <div className="flex justify-center gap-8 mt-8">
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
