import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import SEO from '../components/SEO'

export default function SessionsPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center" style={{ backgroundColor: '#050505', paddingTop: '10vh', paddingBottom: '15vh' }}>
      <SEO
        title="Sessions Coming Soon | DMV DJ Sessions"
        description="DJ Sessions page coming soon. High-quality recordings from DMV's finest selectors."
      />

      <div className="w-full max-w-[720px] mx-auto px-6 text-center">
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <h1 className="text-5xl md:text-7xl font-bold text-[#999591]/60 leading-tight tracking-tight">
            Coming Soon
          </h1>
        </motion.div>

        {/* Description */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <p className="text-[#C4C0BC] w-full leading-relaxed text-base text-center" style={{ marginBottom: '48px', lineHeight: '1.6' }}>
            We're curating high-quality DJ sessions from the DMV's finest selectors. Check back soon to watch exclusive performances.
          </p>
        </motion.div>

        {/* Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Link
            to="/"
            className="group inline-flex items-center justify-center px-10 py-4 text-[#F2F0ED] text-xs font-medium uppercase tracking-[0.2em] border border-[#333] hover:border-[#F2F0ED] transition-all"
          >
            Back Home
            <svg className="w-4 h-4 ml-3 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </motion.div>
      </div>
    </div>
  )
}
