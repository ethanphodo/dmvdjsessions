import { motion } from 'framer-motion'
import { useRecommendations } from '../../hooks/useRecommendations'
import VideoCard from '../video/VideoCard'
import type { Session } from '../../types'

interface SimilarSessionsProps {
  sessionId: string
  title?: string
  limit?: number
  onSessionSelect?: (session: Session) => void
  className?: string
}

export default function SimilarSessions({
  sessionId,
  title = 'Similar Sessions',
  limit = 4,
  onSessionSelect,
  className = '',
}: SimilarSessionsProps) {
  const { getSimilarSessions } = useRecommendations()

  const sessions = getSimilarSessions(sessionId, limit)

  if (sessions.length === 0) {
    return null
  }

  return (
    <section className={`${className}`}>
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <span className="w-2 h-2 bg-[#EC4899] rounded-full" aria-hidden="true" />
        <h3 className="text-lg font-bold text-white">
          {title}
        </h3>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {sessions.map((session, index) => (
          <motion.div
            key={session.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
          >
            <VideoCard
              video={session}
              onSelect={onSessionSelect}
            />
          </motion.div>
        ))}
      </div>
    </section>
  )
}
