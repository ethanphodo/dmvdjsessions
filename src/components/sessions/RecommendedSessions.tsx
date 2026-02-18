import { motion } from 'framer-motion'
import { useRecommendations } from '../../hooks/useRecommendations'
import { useScrollReveal } from '../../hooks/useScrollAnimation'
import VideoCard from '../video/VideoCard'
import type { Session } from '../../types'

interface RecommendedSessionsProps {
  title?: string
  subtitle?: string
  limit?: number
  excludeViewed?: boolean
  onSessionSelect?: (session: Session) => void
  className?: string
}

export default function RecommendedSessions({
  title = 'Recommended For You',
  subtitle = 'Based on your preferences and viewing history',
  limit = 6,
  excludeViewed = false,
  onSessionSelect,
  className = '',
}: RecommendedSessionsProps) {
  const { getRecommendedSessions } = useRecommendations()
  const { ref, isInView } = useScrollReveal()

  const sessions = getRecommendedSessions({ limit, excludeViewed })

  if (sessions.length === 0) {
    return null
  }

  return (
    <section
      ref={ref as React.RefObject<HTMLElement>}
      className={`section-padding ${className}`}
    >
      <div className="container-main">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <div className="flex items-center gap-3 mb-2">
            <span className="w-2 h-2 bg-[#8B5CF6] rounded-full" aria-hidden="true" />
            <span className="font-mono text-xs text-[#888] uppercase tracking-wide">
              Personalized
            </span>
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
            {title}
          </h2>
          <p className="text-[#888] text-sm md:text-base">
            {subtitle}
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {sessions.map((session, index) => (
            <motion.div
              key={session.id}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <VideoCard
                video={session}
                onSelect={onSessionSelect}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
