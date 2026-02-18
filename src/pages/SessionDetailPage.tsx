import { useMemo, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import SEO from '../components/SEO'
import Breadcrumbs from '../components/ui/Breadcrumbs'
import { SimilarSessions } from '../components/sessions'
import { getVideoById } from '../data/videos'
import { getDJById } from '../data/djs'
import { getSeriesById } from '../data/series'
import { generateVideoSchema } from '../components/JsonLdSchema'
import { SERIES_COLORS } from '../utils/constants'
import { formatDate, formatDuration } from '../utils/helpers'
import { useUserPreferences } from '../hooks/useUserPreferences'
import type { Session } from '../types'

export default function SessionDetailPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { trackSessionView } = useUserPreferences()

  const video = useMemo(() => (id ? getVideoById(id) : undefined), [id])
  const dj = useMemo(() => (video ? getDJById(video.djId) : undefined), [video])
  const series = useMemo(() => (video ? getSeriesById(video.series) : undefined), [video])

  // Track session view
  useEffect(() => {
    if (video) {
      trackSessionView(video.id)
    }
  }, [video, trackSessionView])

  const handleSimilarSessionSelect = (session: Session) => {
    navigate(`/sessions/${session.id}`)
  }

  if (!video) {
    return (
      <div className="min-h-screen bg-black pt-28">
        <div className="container-main text-center">
          <h1 className="text-4xl font-bold text-white mb-4">Session Not Found</h1>
          <p className="text-gray-500 mb-8">The session you're looking for doesn't exist.</p>
          <Link
            to="/sessions"
            className="inline-flex items-center gap-2 text-white hover:text-gray-400 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 16l-4-4m0 0l4-4m-4 4h18" />
            </svg>
            Back to Sessions
          </Link>
        </div>
      </div>
    )
  }

  const seriesColor = SERIES_COLORS[video.series as keyof typeof SERIES_COLORS] ?? SERIES_COLORS.studio
  const videoSchema = generateVideoSchema({
    ...video,
    youtubeUrl: video.embedUrl,
  })

  const breadcrumbItems = [
    { label: 'Sessions', path: '/sessions' },
    { label: video.title },
  ]

  return (
    <div className="min-h-screen bg-black pt-28 pb-16">
      <SEO
        title={`${video.title} | DMV DJ Sessions`}
        description={video.description}
        keywords={`${video.djName}, ${video.genres.join(', ')}, DMV DJ session, ${series?.name ?? ''}`}
        schema={videoSchema}
      />

      <div className="container-main">
        <Breadcrumbs items={breadcrumbItems} />

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
          {/* Video Player Section */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              {/* Series Color Bar */}
              <div
                className="h-1 rounded-t-lg"
                style={{ backgroundColor: seriesColor }}
                aria-hidden="true"
              />

              {/* Video Player */}
              <div className="relative aspect-video bg-black rounded-b-lg overflow-hidden border border-white/10 border-t-0">
                {video.embedUrl ? (
                  <iframe
                    src={`${video.embedUrl}?rel=0&modestbranding=1`}
                    title={video.title}
                    className="absolute inset-0 w-full h-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    loading="lazy"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-white/10 flex items-center justify-center">
                        <svg className="w-8 h-8 text-white/40" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <p className="text-white/60 text-sm">Video coming soon</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Video Info */}
              <div className="mt-6">
                <h1 className="font-display text-3xl md:text-4xl font-bold uppercase tracking-tight text-white mb-3">
                  {video.title}
                </h1>

                {/* DJ Link */}
                {dj && (
                  <Link
                    to={`/dj/${dj.slug}`}
                    className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-4"
                  >
                    <span className="text-lg">{video.djName}</span>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </Link>
                )}

                {/* Description */}
                <p className="text-gray-500 leading-relaxed mb-6">
                  {video.description}
                </p>

                {/* Genres */}
                <div className="flex flex-wrap gap-2" role="list" aria-label="Genres">
                  {video.genres.map((genre) => (
                    <span
                      key={genre}
                      role="listitem"
                      className="px-3 py-1 border border-white/10 text-gray-500 text-xs uppercase tracking-wide"
                    >
                      {genre}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="sticky top-28"
            >
              {/* Metadata Card */}
              <div className="bg-white/5 border border-white/10 rounded-xl p-6 mb-8">
                <h2 className="text-xs tracking-widest text-gray-600 uppercase mb-6">
                  Session Details
                </h2>

                <dl className="space-y-4">
                  <div className="flex justify-between items-center py-3 border-b border-white/5">
                    <dt className="text-gray-500 text-sm">Date</dt>
                    <dd className="text-white text-sm">{formatDate(video.date)}</dd>
                  </div>
                  <div className="flex justify-between items-center py-3 border-b border-white/5">
                    <dt className="text-gray-500 text-sm">Duration</dt>
                    <dd className="text-white text-sm">{formatDuration(video.duration)}</dd>
                  </div>
                  <div className="flex justify-between items-center py-3 border-b border-white/5">
                    <dt className="text-gray-500 text-sm">Series</dt>
                    <dd
                      className="text-sm font-medium px-2 py-1 rounded"
                      style={{ backgroundColor: `${seriesColor}20`, color: seriesColor }}
                    >
                      {series?.shortName ?? video.series}
                    </dd>
                  </div>
                  {video.views > 0 && (
                    <div className="flex justify-between items-center py-3 border-b border-white/5">
                      <dt className="text-gray-500 text-sm">Views</dt>
                      <dd className="text-white text-sm">{video.views.toLocaleString()}</dd>
                    </div>
                  )}
                  <div className="flex justify-between items-center py-3">
                    <dt className="text-gray-500 text-sm">Mood</dt>
                    <dd className="flex gap-1">
                      {video.mood.map((m) => (
                        <span key={m} className="text-white/60 text-xs capitalize">
                          {m}
                        </span>
                      ))}
                    </dd>
                  </div>
                </dl>
              </div>

              {/* DJ Card */}
              {dj && (
                <Link
                  to={`/dj/${dj.slug}`}
                  className="block bg-white/5 border border-white/10 rounded-xl p-6 hover:border-white/20 transition-colors"
                >
                  <h2 className="text-xs tracking-widest text-gray-600 uppercase mb-4">
                    About the DJ
                  </h2>
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-lg overflow-hidden bg-gradient-to-br from-[#1A1A1A] to-black flex-shrink-0">
                      {dj.image ? (
                        <img
                          src={dj.image}
                          alt={dj.name}
                          className="w-full h-full object-cover"
                          loading="lazy"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <span className="text-xl font-bold text-white/20">
                            {dj.name.charAt(0)}
                          </span>
                        </div>
                      )}
                    </div>
                    <div>
                      <p className="text-white font-medium">{dj.name}</p>
                      <p className="text-gray-500 text-sm line-clamp-2">{dj.bio}</p>
                    </div>
                  </div>
                </Link>
              )}
            </motion.div>
          </div>
        </div>

        {/* Similar Sessions */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 pt-16 border-t border-white/5"
        >
          <SimilarSessions
            sessionId={video.id}
            title="Similar Sessions"
            limit={4}
            onSessionSelect={handleSimilarSessionSelect}
          />
        </motion.section>
      </div>
    </div>
  )
}
