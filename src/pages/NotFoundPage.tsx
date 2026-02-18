import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import SEO from '../components/SEO'

export default function NotFoundPage() {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-6">
      <SEO
        title="404 - Page Not Found | DMV DJ Sessions"
        description="The page you're looking for doesn't exist."
      />

      <div className="w-full max-w-2xl mx-auto text-center">
        {/* Glitch 404 */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="relative mb-8"
        >
          <h1 className="text-[8rem] md:text-[12rem] font-black italic text-white/5 leading-none select-none">
            404
          </h1>
          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            animate={{
              x: [0, -2, 2, -1, 1, 0],
              opacity: [1, 0.8, 1, 0.9, 1],
            }}
            transition={{
              duration: 0.5,
              repeat: Infinity,
              repeatDelay: 3,
            }}
          >
            <span className="text-[8rem] md:text-[12rem] font-black italic text-[#E8E4E0] leading-none">
              404
            </span>
          </motion.div>
        </motion.div>

        {/* Message */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <p className="font-mono text-xs tracking-[0.3em] text-[#666] uppercase mb-4">
            Track Not Found
          </p>
          <h2 className="text-2xl md:text-3xl font-bold uppercase tracking-tight text-white mb-4">
            This page doesn't exist
          </h2>
          <p className="text-[#666] text-center mx-auto max-w-sm mb-8">
            The session you're looking for might have been moved, deleted, or never existed in the first place.
          </p>
        </motion.div>

        {/* Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link
            to="/"
            className="group inline-flex items-center justify-center px-8 py-4 bg-white text-black text-xs font-bold uppercase tracking-[0.1em] hover:bg-[#E8E4E0] transition-colors duration-300"
          >
            Back Home
            <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
          <Link
            to="/sessions"
            className="inline-flex items-center justify-center px-8 py-4 border border-white/20 text-white text-xs font-bold uppercase tracking-[0.1em] hover:border-white hover:bg-white/5 transition-all duration-300"
          >
            Browse Sessions
          </Link>
        </motion.div>

        {/* Decorative elements */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-16 flex items-center justify-center gap-8"
        >
          <div className="w-24 h-px bg-gradient-to-r from-transparent to-white/20" />
          <span className="font-mono text-[10px] text-[#444] uppercase tracking-[0.2em]">
            DMV DJ Sessions
          </span>
          <div className="w-24 h-px bg-gradient-to-l from-transparent to-white/20" />
        </motion.div>
      </div>
    </div>
  )
}
