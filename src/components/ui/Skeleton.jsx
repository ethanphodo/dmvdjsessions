import { motion } from 'framer-motion'

/**
 * Skeleton loading components for improved perceived performance
 */

// Base skeleton with shimmer animation
function SkeletonBase({ className = '', children }) {
  return (
    <div className={`relative overflow-hidden bg-[#1A1A1A] ${className}`}>
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent"
        animate={{
          x: ['-100%', '100%'],
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
      {children}
    </div>
  )
}

// Session card skeleton
export function SessionCardSkeleton() {
  return (
    <div className="rounded-xl overflow-hidden bg-white/5 border border-white/10">
      <SkeletonBase className="aspect-video" />
      <div className="p-5 space-y-3">
        <SkeletonBase className="h-6 w-3/4 rounded" />
        <SkeletonBase className="h-4 w-1/2 rounded" />
        <div className="flex gap-2 mt-3">
          <SkeletonBase className="h-6 w-16 rounded" />
          <SkeletonBase className="h-6 w-16 rounded" />
        </div>
        <SkeletonBase className="h-3 w-24 rounded mt-3" />
      </div>
    </div>
  )
}

// Event card skeleton
export function EventCardSkeleton() {
  return (
    <div className="rounded-xl overflow-hidden bg-white/5 border border-white/10 p-6">
      <div className="flex gap-4">
        <SkeletonBase className="w-20 h-20 rounded-lg flex-shrink-0" />
        <div className="flex-1 space-y-3">
          <SkeletonBase className="h-6 w-3/4 rounded" />
          <SkeletonBase className="h-4 w-1/2 rounded" />
          <SkeletonBase className="h-4 w-2/3 rounded" />
        </div>
      </div>
    </div>
  )
}

// Text line skeleton
export function TextSkeleton({ lines = 1, className = '' }) {
  return (
    <div className={`space-y-2 ${className}`}>
      {Array.from({ length: lines }).map((_, i) => (
        <SkeletonBase
          key={i}
          className={`h-4 rounded ${i === lines - 1 && lines > 1 ? 'w-2/3' : 'w-full'}`}
        />
      ))}
    </div>
  )
}

// Image skeleton with logo fade-in
export function ImageSkeleton({ className = '' }) {
  return (
    <SkeletonBase className={`flex items-center justify-center ${className}`}>
      <motion.div
        className="text-white/10"
        animate={{ opacity: [0.1, 0.3, 0.1] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
        </svg>
      </motion.div>
    </SkeletonBase>
  )
}

// Grid of session card skeletons
export function SessionGridSkeleton({ count = 6 }) {
  return (
    <div className="bento-grid">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className={i === 0 ? 'bento-wide' : ''}>
          <SessionCardSkeleton />
        </div>
      ))}
    </div>
  )
}

export default SkeletonBase
