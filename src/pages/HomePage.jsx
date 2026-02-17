import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
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
          <h2 className="text-xs tracking-widest text-gray-600 uppercase mb-8 md:mb-10">
            Why We Exist
          </h2>

          <div className="space-y-6 text-lg md:text-xl leading-relaxed">
            <p>
              The DMV has no shortage of talent. What it lacks is a consistent stage.
            </p>
            <p className="text-gray-500">
              We built this platform to give emerging DJs a space to perform with intention — in a curated environment where the music leads.
            </p>
          </div>
        </div>
      </section>

      <div className="divider" />

      {/* What Makes Us Different */}
      <section className="bg-black section-padding">
        <div className="container-narrow">
          <h2 className="text-xs tracking-widest text-gray-600 uppercase mb-8 md:mb-10">
            What Makes Us Different
          </h2>

          <ul className="space-y-3 text-gray-400">
            {[
              'Curated talent only',
              'Cinematic performance format',
              'Series-based identity',
              'Quality over quantity',
            ].map((item, i) => (
              <li key={i} className="flex items-start gap-3">
                <span className="text-gray-600">—</span>
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
          <h2 className="text-xs tracking-widest text-gray-600 uppercase mb-10 md:mb-12">
            The Series
          </h2>

          <div className="space-y-12 md:space-y-14">
            {/* Studio */}
            <motion.div
              className="group"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="w-12 h-px bg-[#D6A756] mb-5 group-hover:w-20 transition-all duration-500" />
              <ScrubText
                as="h3"
                className="text-xl md:text-2xl tracking-tight mb-2"
                minWeight={400}
                maxWeight={700}
                enableSkew={false}
              >
                Studio Sessions
              </ScrubText>
              <p className="text-gray-500">
                Controlled lighting. Focused sound. Pure performance.
              </p>
            </motion.div>

            {/* Warehouse */}
            <motion.div
              className="group"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <div className="w-12 h-px bg-[#8B1E2D] mb-5 group-hover:w-20 transition-all duration-500" />
              <ScrubText
                as="h3"
                className="text-xl md:text-2xl tracking-tight mb-2"
                minWeight={400}
                maxWeight={700}
                enableSkew={false}
              >
                Warehouse Series
              </ScrubText>
              <p className="text-gray-500">
                Industrial energy. Dark textures. Harder sounds.
              </p>
            </motion.div>

            {/* Rooftop */}
            <motion.div
              className="group"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="w-12 h-px bg-[#7FAFD4] mb-5 group-hover:w-20 transition-all duration-500" />
              <ScrubText
                as="h3"
                className="text-xl md:text-2xl tracking-tight mb-2"
                minWeight={400}
                maxWeight={700}
                enableSkew={false}
              >
                Rooftop Sessions
              </ScrubText>
              <p className="text-gray-500">
                Golden hour. Open air. Elevated atmosphere.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      <div className="divider" />

      {/* Upcoming Events Teaser */}
      <section className="bg-black section-padding">
        <div className="container-narrow">
          <h2 className="text-xs tracking-widest text-gray-600 uppercase mb-8 md:mb-10">
            Upcoming Events
          </h2>

          <div className="space-y-6 mb-8">
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
                <div key={event.id} className="flex items-start gap-4">
                  <div className="w-1 h-12 rounded-full flex-shrink-0 mt-1" style={{ backgroundColor: accent }} />
                  <div>
                    <p className="text-xs text-gray-600 mb-1">
                      {formatDate(event.date)} · {event.time}
                    </p>
                    <h3 className="text-lg font-medium text-white mb-1">
                      {event.title}
                    </h3>
                    <p className="text-sm text-gray-600">{event.location}</p>
                  </div>
                </div>
              )
            })}
          </div>

          <Link
            to="/events"
            className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-white transition-colors"
          >
            View all events
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </section>

      <div className="divider" />

      {/* For the Artists */}
      <section className="bg-black section-padding">
        <div className="container-narrow">
          <h2 className="text-xs tracking-widest text-gray-600 uppercase mb-8 md:mb-10">
            For Artists
          </h2>

          <p className="text-lg mb-6">We provide:</p>

          <ul className="space-y-3 text-gray-500">
            {[
              'Professional multi-angle video',
              'High-quality audio capture',
              'Short-form clips for social',
              'A platform for discovery',
            ].map((item, i) => (
              <li key={i} className="flex items-start gap-3">
                <span className="text-gray-600">—</span>
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
          <h2 className="text-xs tracking-widest text-gray-600 uppercase mb-8 md:mb-10">
            Vision
          </h2>

          <p className="text-lg md:text-xl leading-relaxed text-gray-400">
            To build a recognizable performance platform rooted in the DMV that grows into a nationally respected stage for emerging electronic artists.
          </p>
        </div>
      </section>

      <div className="divider" />

      {/* Newsletter */}
      <section className="bg-black section-padding">
        <div className="container-narrow text-center">
          <h2 className="text-xs tracking-widest text-gray-600 uppercase mb-6">
            Stay Connected
          </h2>
          <p className="text-xl md:text-2xl font-medium mb-4">
            Get updates
          </p>
          <p className="text-gray-500 mb-8">
            Early access to events, new sessions, and behind-the-scenes content.
          </p>
          <NewsletterSignup />
        </div>
      </section>

      <div className="divider" />

      {/* CTA */}
      <section className="bg-black section-padding">
        <div className="container-narrow text-center">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-xs tracking-widest text-gray-600 uppercase mb-6"
          >
            Ready?
          </motion.p>
          <RevealText
            as="h2"
            className="text-3xl md:text-4xl lg:text-5xl tracking-tight mb-6"
          >
            Play First.
          </RevealText>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-gray-500 mb-10"
          >
            Submit your mix and tell us your sound.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <Link
              to="/submit"
              className="inline-flex items-center justify-center px-6 py-3 bg-white text-black text-sm font-medium hover:bg-gray-200 transition-colors"
            >
              Submit a Set
            </Link>
          </motion.div>
        </div>
      </section>
    </>
  )
}
