import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import SEO from '../components/SEO'

export default function NotFoundPage() {
  return (
    <div className="min-h-screen flex items-center justify-center px-6" style={{ backgroundColor: '#050505' }}>
      <SEO
        title="Coming Soon | DMV DJ Sessions"
        description="This page is coming soon. Stay tuned."
      />

      <div className="w-full max-w-2xl mx-auto text-center">
        {/* Coming Soon */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="relative mb-12"
        >
          <h1 className="text-6xl md:text-8xl font-bold text-[#F2F0ED] leading-none tracking-tight">
            Coming
            <br />
            <span className="text-[#999591]/60">Soon</span>
          </h1>
        </motion.div>

        {/* Message */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <p className="text-[10px] tracking-[0.3em] text-[#999591] uppercase mb-6">
            Under Construction
          </p>
          <p className="text-[#999591]/80 text-center mx-auto max-w-sm mb-12 leading-relaxed">
            We're working on something special. This page will be available soon.
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
            className="group inline-flex items-center justify-center px-10 py-4 rounded-full text-[#050505] text-xs font-medium uppercase tracking-[0.2em] hover:opacity-90 transition-all"
            style={{ background: 'linear-gradient(135deg, #A68B6A 0%, #8B7355 100%)' }}
          >
            Back Home
            <svg className="w-4 h-4 ml-3 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </motion.div>

        {/* Decorative elements */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-20 flex items-center justify-center gap-8"
        >
          <div className="w-24 h-px bg-gradient-to-r from-transparent to-[#222]" />
          <span className="text-[10px] text-[#999591]/40 uppercase tracking-[0.2em]">
            DMV DJ Sessions
          </span>
          <div className="w-24 h-px bg-gradient-to-l from-transparent to-[#222]" />
        </motion.div>
      </div>
    </div>
  )
}
