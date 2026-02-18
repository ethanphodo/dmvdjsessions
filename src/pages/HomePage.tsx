import { lazy, Suspense } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import Hero from '../components/Hero'
import SEO from '../components/SEO'
import { ScrubText, RevealText } from '../components/ui/ScrubText'
import NewsletterSignup from '../components/ui/NewsletterSignup'
import ProductionStandards from '../components/sections/ProductionStandards'
import InnerCircle from '../components/sections/InnerCircle'

// Lazy load 3D scene for performance
const HeroScene = lazy(() => import('../components/3d/HeroScene'))

export default function HomePage() {

  return (
    <>
      <SEO
        title="DMV DJ Sessions | Letting the Underground Shine"
        description="High-quality DJ sessions spotlighting the next wave of DMV talent. Curated performances from Washington DC, Maryland, and Virginia."
      />

      {/* Hero with 3D Scene */}
      <div className="relative">
        <Suspense fallback={null}>
          <HeroScene className="opacity-60" />
        </Suspense>
        <Hero />
      </div>

      {/* Production Standards */}
      <ProductionStandards />

      <div className="divider" />

      {/* Why We Exist */}
      <section className="bg-black section-padding liquid-bg">
        <div className="container-narrow relative z-10 text-center">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-xs tracking-widest text-[#6B6865] uppercase mb-8 md:mb-10"
          >
            Why We Exist
          </motion.h2>

          <div className="space-y-6 text-lg md:text-xl leading-relaxed max-w-2xl mx-auto">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-[#E8E4E0]"
            >
              The DMV has no shortage of talent. What it lacks is a consistent stage.
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-[#6B6865]"
            >
              We built this platform to give emerging DJs a space to perform with intention — in a curated environment where the music leads.
            </motion.p>
          </div>
        </div>
      </section>

      <div className="divider" />

      {/* The Series */}
      <section className="bg-black section-padding">
        <div className="container-narrow text-center">
          <h2 className="text-xs tracking-widest text-[#6B6865] uppercase mb-10 md:mb-12">
            The Series
          </h2>

          <div className="grid md:grid-cols-3 gap-12 md:gap-8">
            {/* Studio */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="w-12 h-px bg-[#E8E4E0] mb-5 mx-auto" />
              <ScrubText
                as="h3"
                className="text-xl md:text-2xl tracking-tight mb-2"
                minWeight={400}
                maxWeight={700}
                enableSkew={false}
              >
                Studio Sessions
              </ScrubText>
              <p className="text-[#6B6865] text-sm">
                Controlled lighting. Focused sound. Pure performance.
              </p>
            </motion.div>

            {/* Warehouse */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <div className="w-12 h-px bg-[#8B7355] mb-5 mx-auto" />
              <ScrubText
                as="h3"
                className="text-xl md:text-2xl tracking-tight mb-2"
                minWeight={400}
                maxWeight={700}
                enableSkew={false}
              >
                Warehouse Series
              </ScrubText>
              <p className="text-[#6B6865] text-sm">
                Industrial energy. Dark textures. Harder sounds.
              </p>
            </motion.div>

            {/* Rooftop */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="w-12 h-px bg-[#C4C0BC] mb-5 mx-auto" />
              <ScrubText
                as="h3"
                className="text-xl md:text-2xl tracking-tight mb-2"
                minWeight={400}
                maxWeight={700}
                enableSkew={false}
              >
                Rooftop Sessions
              </ScrubText>
              <p className="text-[#6B6865] text-sm">
                Golden hour. Open air. Elevated atmosphere.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      <div className="divider" />

      {/* Inner Circle Waitlist */}
      <InnerCircle />

      <div className="divider" />

      {/* For Artists */}
      <section className="bg-black section-padding">
        <div className="container-narrow text-center">
          <h2 className="text-xs tracking-widest text-[#6B6865] uppercase mb-8 md:mb-10">
            For Artists
          </h2>

          <p className="text-lg text-[#E8E4E0] mb-8">We provide:</p>

          <ul className="space-y-3 text-[#6B6865]">
            {[
              'Professional multi-angle video',
              'High-quality audio capture',
              'Short-form clips for social',
              'A platform for discovery',
            ].map((item, i) => (
              <motion.li
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="text-center"
              >
                {item}
              </motion.li>
            ))}
          </ul>
        </div>
      </section>

      <div className="divider" />

      {/* Newsletter */}
      <section className="bg-black section-padding">
        <div className="container-narrow text-center">
          <h2 className="text-xs tracking-widest text-[#6B6865] uppercase mb-6">
            Stay Connected
          </h2>
          <p className="text-xl md:text-2xl font-medium text-[#E8E4E0] mb-4">
            Get updates
          </p>
          <p className="text-[#6B6865] mb-8">
            Early access to events, new sessions, and behind-the-scenes content.
          </p>
          <NewsletterSignup />
        </div>
      </section>

      <div className="divider" />

      {/* CTA */}
      <section className="section-padding" style={{ backgroundColor: 'var(--charcoal)' }}>
        <div className="container-narrow text-center">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-xs tracking-widest text-[#6B6865] uppercase mb-6"
          >
            Ready?
          </motion.p>
          <RevealText
            as="h2"
            className="text-3xl md:text-4xl lg:text-5xl tracking-tight mb-6 text-[#E8E4E0]"
          >
            Play First.
          </RevealText>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-[#6B6865] mb-10"
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
              className="inline-flex items-center justify-center px-8 py-4 bg-[#E8E4E0] text-[#0A0A0A] text-sm font-medium tracking-wide uppercase hover:bg-white transition-colors"
            >
              Submit a Set
            </Link>
          </motion.div>
        </div>
      </section>
    </>
  )
}
