import { Link } from 'react-router-dom'
import Hero from '../components/Hero'
import SEO from '../components/SEO'
import { ScrubText, RevealText } from '../components/ui/ScrubText'
import NewsletterSignup from '../components/ui/NewsletterSignup'
import { getUpcomingEvents } from '../data/events'
import { SERIES_COLORS } from '../utils/constants'

export default function HomePage() {
  return (
    <>
      <SEO
        title="DMV DJ Sessions | Where the Next Wave Plays First"
        description="High-quality DJ sessions spotlighting the next wave of DMV talent. Curated performances from Washington DC, Maryland, and Virginia."
      />
      <Hero />

      {/* Why We Exist */}
      <section className="bg-black section-padding">
        <div className="container-narrow">
          <h2 className="text-sm font-medium uppercase tracking-wide text-[#666] mb-8 md:mb-12">
            Why We Exist
          </h2>

          <div className="space-y-6 text-responsive-xl leading-relaxed">
            <p>
              The DMV has no shortage of talent.<br />
              What it lacks is a consistent stage.
            </p>
            <p className="text-[#888]">
              We built this platform to give emerging DJs a space to perform with intention — not in a crowded club, not in a chaotic livestream — but in a curated environment where the music leads.
            </p>
            <p className="text-[#888]">
              Every set is filmed with purpose.<br />
              Every artist is selected with care.
            </p>
          </div>
        </div>
      </section>

      <div className="divider" />

      {/* What Makes Us Different */}
      <section className="bg-black section-padding">
        <div className="container-narrow">
          <h2 className="text-sm font-medium uppercase tracking-wide text-[#666] mb-8 md:mb-12">
            What Makes Us Different
          </h2>

          <ul className="space-y-4 md:space-y-5 text-lg md:text-xl">
            {[
              'Curated talent only',
              'Cinematic performance format',
              'Series-based identity',
              'Consistent visual language',
              'Quality over quantity',
            ].map((item, i) => (
              <li key={i} className="flex items-start gap-4 hover-lift" style={{ transitionDelay: `${i * 0.05}s` }}>
                <span className="text-[#666] mt-1">—</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <div className="divider" />

      {/* The Series */}
      <section className="bg-black section-padding">
        <div className="container-narrow">
          <h2 className="text-sm font-medium uppercase tracking-wide text-[#666] mb-12 md:mb-16">
            The Series
          </h2>

          <div className="space-y-12 md:space-y-16">
            {/* Studio */}
            <div className="group hover-lift">
              <div className="w-16 h-px bg-[#D6A756] mb-6 group-hover:w-24 transition-all duration-500" />
              <ScrubText
                as="h3"
                className="text-2xl md:text-3xl uppercase tracking-ultra-tight mb-3"
                minWeight={500}
                maxWeight={900}
                minSkew={0}
                maxSkew={-4}
              >
                Studio Sessions
              </ScrubText>
              <p className="text-[#888] text-lg md:text-xl">
                Controlled lighting. Focused sound. Pure performance.
              </p>
            </div>

            {/* Warehouse */}
            <div className="group hover-lift">
              <div className="w-16 h-px bg-[#8B1E2D] mb-6 group-hover:w-24 transition-all duration-500" />
              <ScrubText
                as="h3"
                className="text-2xl md:text-3xl uppercase tracking-ultra-tight mb-3"
                minWeight={500}
                maxWeight={900}
                minSkew={0}
                maxSkew={-4}
              >
                Warehouse Series
              </ScrubText>
              <p className="text-[#888] text-lg md:text-xl">
                Industrial energy. Dark textures. Harder sounds.
              </p>
            </div>

            {/* Rooftop */}
            <div className="group hover-lift">
              <div className="w-16 h-px bg-[#7FAFD4] mb-6 group-hover:w-24 transition-all duration-500" />
              <ScrubText
                as="h3"
                className="text-2xl md:text-3xl uppercase tracking-ultra-tight mb-3"
                minWeight={500}
                maxWeight={900}
                minSkew={0}
                maxSkew={-4}
              >
                Rooftop Sessions
              </ScrubText>
              <p className="text-[#888] text-lg md:text-xl">
                Golden hour. Open air. Elevated atmosphere.
              </p>
            </div>
          </div>
        </div>
      </section>

      <div className="divider" />

      {/* Upcoming Events Teaser */}
      <section className="bg-black section-padding">
        <div className="container-narrow">
          <h2 className="text-sm font-medium uppercase tracking-wide text-[#666] mb-8 md:mb-12">
            Upcoming Events
          </h2>

          <div className="space-y-6 mb-10">
            {getUpcomingEvents().slice(0, 2).map((event) => {
              const getAccent = () => {
                if (event.address.toLowerCase().includes('dc')) return SERIES_COLORS.studio
                if (event.address.toLowerCase().includes('md')) return SERIES_COLORS.warehouse
                if (event.address.toLowerCase().includes('va')) return SERIES_COLORS.rooftop
                return SERIES_COLORS.studio
              }
              const accent = getAccent()
              const formatDate = (dateStr) => {
                const d = new Date(dateStr)
                return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
              }

              return (
                <div key={event.id} className="group flex items-center gap-6 hover-lift">
                  <div className="w-2 h-16 transition-all duration-300" style={{ backgroundColor: accent }} />
                  <div className="flex-1">
                    <p className="text-xs text-[#888] uppercase tracking-wide mb-1">
                      {formatDate(event.date)} · {event.time}
                    </p>
                    <h3 className="text-xl font-bold uppercase tracking-tight text-white group-hover:text-[#888] transition-colors">
                      {event.title}
                    </h3>
                    <p className="text-sm text-[#666]">{event.location}</p>
                  </div>
                </div>
              )
            })}
          </div>

          <Link
            to="/events"
            className="inline-flex items-center gap-2 text-sm font-medium uppercase tracking-wide text-[#888] hover:text-white transition-colors"
          >
            View All Events
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </section>

      <div className="divider" />

      {/* For the Artists */}
      <section className="bg-black section-padding">
        <div className="container-narrow">
          <h2 className="text-sm font-medium uppercase tracking-wide text-[#666] mb-8 md:mb-12">
            For the Artists
          </h2>

          <p className="text-responsive-xl mb-8 md:mb-12">
            We provide:
          </p>

          <ul className="space-y-4 md:space-y-5 text-lg md:text-xl text-[#888]">
            {[
              'Professional multi-angle video',
              'High-quality audio capture',
              'Branded performance format',
              'Short-form clips for social distribution',
              'A platform designed for discovery',
            ].map((item, i) => (
              <li key={i} className="flex items-start gap-4">
                <span className="text-white mt-1">—</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <div className="divider" />

      {/* Our Vision */}
      <section className="bg-black section-padding">
        <div className="container-narrow">
          <h2 className="text-sm font-medium uppercase tracking-wide text-[#666] mb-8 md:mb-12">
            Our Vision
          </h2>

          <p className="text-responsive-xl leading-relaxed">
            To build a recognizable performance platform rooted in the DMV that grows into a nationally respected stage for emerging electronic artists.
          </p>
        </div>
      </section>

      <div className="divider" />

      {/* Our Standard */}
      <section className="bg-black section-padding">
        <div className="container-narrow">
          <h2 className="text-sm font-medium uppercase tracking-wide text-[#666] mb-8 md:mb-12">
            Our Standard
          </h2>

          <p className="text-lg md:text-xl text-[#888] mb-8">
            Every session must meet:
          </p>

          <ul className="space-y-4 md:space-y-5 text-lg md:text-xl">
            {[
              'Performance quality',
              'Sound integrity',
              'Visual consistency',
              'Identity alignment',
            ].map((item, i) => (
              <li key={i} className="flex items-start gap-4">
                <span className="text-[#666] mt-1">—</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>

          <p className="text-[#666] mt-12 md:mt-16 text-lg md:text-xl">
            We don't publish everything.<br />
            We publish what lasts.
          </p>
        </div>
      </section>

      <div className="divider" />

      {/* Newsletter */}
      <section className="bg-black section-padding">
        <div className="container-narrow text-center">
          <h2 className="text-sm font-medium uppercase tracking-wide text-[#666] mb-6">
            Stay Connected
          </h2>
          <p className="text-responsive-xl font-bold uppercase tracking-tight mb-4">
            Get Exclusive Drops
          </p>
          <p className="text-[#888] text-lg mb-8">
            Early access to events, new sessions, and behind-the-scenes content.
          </p>
          <NewsletterSignup />
        </div>
      </section>

      <div className="divider" />

      {/* CTA */}
      <section className="bg-black section-padding">
        <div className="container-narrow text-center">
          <p className="text-sm font-medium uppercase tracking-wide text-[#666] mb-6">
            Ready?
          </p>
          <RevealText
            as="h2"
            className="text-5xl md:text-6xl lg:text-7xl uppercase tracking-ultra-tight mb-6"
          >
            Play First.
          </RevealText>
          <p className="text-[#888] text-lg mb-10 md:mb-12">
            Submit your mix and tell us your sound.
          </p>
          <Link
            to="/submit"
            className="btn-hover inline-flex items-center justify-center px-10 py-4 bg-white text-black text-sm font-medium uppercase tracking-wide hover:bg-[#E5E5E5] transition-colors"
          >
            Submit a Set
          </Link>
        </div>
      </section>
    </>
  )
}
