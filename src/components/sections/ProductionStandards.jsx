import { motion } from 'framer-motion'

const STANDARDS = [
  {
    title: '4K Multi-Cam',
    description: 'Cinematic, not casual. Every angle considered.',
  },
  {
    title: 'Studio-Grade Audio',
    description: 'Direct master-out. Room ambiance. Your sound, preserved.',
  },
  {
    title: 'Curated Audience',
    description: 'No walk-ins. Every session is an invitation.',
  },
]

export default function ProductionStandards() {
  return (
    <section className="section-padding" style={{ backgroundColor: 'var(--black)' }}>
      <div className="container-narrow text-center">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-xs tracking-widest text-[#6B6865] uppercase mb-12"
        >
          Production Standards
        </motion.p>

        <div className="grid md:grid-cols-3 gap-12 md:gap-8">
          {STANDARDS.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="text-center"
            >
              <h3 className="text-lg md:text-xl font-medium text-[#E8E4E0] mb-3 tracking-tight">
                {item.title}
              </h3>
              <p className="text-[#6B6865] text-sm leading-relaxed">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
