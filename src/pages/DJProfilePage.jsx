import { useMemo, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import SEO from '../components/SEO'
import Breadcrumbs from '../components/ui/Breadcrumbs'
import SessionCard from '../components/sessions/SessionCard'
import VideoModal from '../components/ui/VideoModal'
import { getDJBySlug } from '../data/djs'
import { getVideosByDJ } from '../data/videos'
import { LOCATIONS } from '../utils/constants'

export default function DJProfilePage() {
  const { slug } = useParams()
  const [selectedVideo, setSelectedVideo] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const dj = useMemo(() => getDJBySlug(slug), [slug])
  const videos = useMemo(() => (dj ? getVideosByDJ(dj.id) : []), [dj])

  if (!dj) {
    return (
      <div className="min-h-screen bg-black pt-28">
        <div className="container-main text-center">
          <h1 className="text-4xl font-bold text-white mb-4">DJ Not Found</h1>
          <p className="text-gray-500 mb-8">The DJ you're looking for doesn't exist.</p>
          <Link
            to="/sessions"
            className="inline-flex items-center gap-2 text-white hover:text-gray-400 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 16l-4-4m0 0l4-4m-4 4h18" />
            </svg>
            Back to Sessions
          </Link>
        </div>
      </div>
    )
  }

  const locationLabel = LOCATIONS.find((l) => l.value === dj.location)?.label || dj.location

  const handleVideoClick = (video) => {
    setSelectedVideo({
      ...video,
      youtubeUrl: video.embedUrl,
    })
    setIsModalOpen(true)
  }

  const breadcrumbItems = [
    { label: 'Sessions', path: '/sessions' },
    { label: dj.name },
  ]

  // Social icons map
  const socialIcons = {
    instagram: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
      </svg>
    ),
    soundcloud: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M1.175 12.225c-.051 0-.094.046-.101.1l-.233 2.154.233 2.105c.007.058.05.098.101.098.05 0 .09-.04.099-.098l.255-2.105-.27-2.154c-.009-.06-.052-.1-.084-.1zm-.899 1.624c-.057 0-.096.04-.105.097l-.18 1.53.18 1.483c.009.057.048.097.105.097.05 0 .09-.04.1-.1l.208-1.48-.208-1.53c-.01-.057-.05-.097-.1-.097zm1.83-1.027c-.063 0-.11.047-.116.105l-.203 2.357.203 2.265c.006.058.053.102.116.102.063 0 .108-.044.116-.102l.235-2.265-.235-2.357c-.008-.058-.053-.105-.116-.105zm.91-.63c-.067 0-.12.048-.126.11l-.178 2.987.178 2.817c.006.062.059.109.126.109.065 0 .116-.047.124-.109l.204-2.817-.204-2.987c-.008-.062-.059-.11-.124-.11zm.91-.257c-.074 0-.13.053-.137.116l-.154 3.244.154 2.99c.007.065.063.114.137.114.072 0 .127-.049.135-.114l.178-2.99-.178-3.244c-.008-.063-.063-.116-.135-.116zm.91-.12c-.08 0-.14.055-.147.12l-.13 3.364.13 3.064c.007.068.067.117.147.117.077 0 .136-.049.144-.117l.15-3.064-.15-3.364c-.008-.065-.067-.12-.144-.12zm.912.04c-.083 0-.148.058-.154.123l-.106 3.324.106 3.132c.006.069.071.12.154.12.081 0 .144-.051.152-.12l.122-3.132-.122-3.324c-.008-.065-.071-.123-.152-.123zm.91.202c-.09 0-.158.06-.164.126l-.082 3.122.082 3.2c.006.07.074.122.164.122.088 0 .153-.052.16-.122l.094-3.2-.094-3.122c-.007-.066-.072-.126-.16-.126zm.912-.065c-.093 0-.164.061-.171.129l-.058 3.187.058 3.266c.007.07.078.125.171.125.091 0 .16-.055.168-.125l.067-3.266-.067-3.187c-.008-.068-.077-.129-.168-.129zm5.446 1.56c-.253 0-.497.032-.734.085-.148-1.676-1.563-2.993-3.295-2.993-.423 0-.836.082-1.21.223-.143.053-.18.107-.18.213v6.016c0 .11.078.199.184.21h5.235c1.28 0 2.319-1.03 2.319-2.299 0-1.27-1.039-2.299-2.319-2.299v-.156z" />
      </svg>
    ),
    mixcloud: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M13.57 11.727l-3.063 4.637h-.75l-1.674-3.053-1.674 3.053h-.75l-3.063-4.637h.947l2.244 3.476 1.482-2.662-.712-1.294h.908l1.618 2.952 1.618-2.952h.908l-.712 1.294 1.482 2.662 2.244-3.476h.946zm4.82.28c-.22 0-.433.027-.638.077-.192-2.074-1.924-3.702-4.064-3.702-.527 0-1.029.102-1.49.285v6.987h6.192c1.245 0 2.254-1.01 2.254-2.254 0-1.243-1.009-2.253-2.254-2.253v-.14z" />
      </svg>
    ),
    spotify: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
      </svg>
    ),
  }

  return (
    <div className="min-h-screen bg-black pt-28 pb-16">
      <SEO
        title={`${dj.name} | DMV DJ Sessions`}
        description={dj.bio}
        keywords={`${dj.name}, DMV DJ, ${dj.genres.join(', ')}, ${locationLabel} DJ`}
      />

      <div className="container-main">
        <Breadcrumbs items={breadcrumbItems} />

        {/* DJ Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <div className="flex flex-col md:flex-row gap-8 md:gap-12 items-start">
            {/* DJ Image */}
            <div className="w-full md:w-80 flex-shrink-0">
              <div className="aspect-square rounded-xl overflow-hidden bg-gradient-to-br from-[#1A1A1A] to-black border border-white/10">
                {dj.image ? (
                  <img
                    src={dj.image}
                    alt={dj.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <span className="text-6xl font-bold text-white/10">
                      {dj.name.charAt(0)}
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* DJ Info */}
            <div className="flex-1">
              <p className="text-xs tracking-widest text-gray-500 uppercase mb-3">
                {locationLabel}
              </p>
              <h1 className="font-display text-4xl md:text-5xl font-bold uppercase tracking-tight text-white mb-4">
                {dj.name}
              </h1>
              <p className="text-gray-400 text-lg leading-relaxed mb-6 max-w-xl">
                {dj.bio}
              </p>

              {/* Genres */}
              <div className="flex flex-wrap gap-2 mb-6">
                {dj.genres.map((genre) => (
                  <span
                    key={genre}
                    className="px-3 py-1 border border-white/10 text-gray-500 text-xs uppercase tracking-wide"
                  >
                    {genre}
                  </span>
                ))}
              </div>

              {/* Social Links */}
              {dj.socials && Object.keys(dj.socials).length > 0 && (
                <div className="flex items-center gap-4">
                  {Object.entries(dj.socials).map(([platform, url]) => (
                    <a
                      key={platform}
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-500 hover:text-white transition-colors"
                      aria-label={`${dj.name} on ${platform}`}
                    >
                      {socialIcons[platform] || (
                        <span className="text-xs uppercase">{platform}</span>
                      )}
                    </a>
                  ))}
                </div>
              )}

              {/* Stats */}
              <div className="mt-8 pt-8 border-t border-white/5">
                <div className="flex items-center gap-8">
                  <div>
                    <p className="text-2xl font-bold text-white">{videos.length}</p>
                    <p className="text-xs text-gray-500 uppercase tracking-wide">Sessions</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-white">
                      {videos.reduce((acc, v) => {
                        const [mins] = v.duration.split(':').map(Number)
                        return acc + mins
                      }, 0)}
                    </p>
                    <p className="text-xs text-gray-500 uppercase tracking-wide">Minutes</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Sessions Section */}
        <section>
          <h2 className="text-xs tracking-widest text-gray-600 uppercase mb-8">
            Sessions by {dj.name}
          </h2>

          {videos.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {videos.map((video, index) => (
                <motion.div
                  key={video.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <SessionCard
                    title={video.title}
                    djName={video.djName}
                    date={video.date}
                    series={video.series}
                    thumbnail={video.thumbnail}
                    genres={video.genres}
                    onClick={() => handleVideoClick(video)}
                  />
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="text-gray-500">No sessions available yet.</p>
            </div>
          )}
        </section>
      </div>

      {/* Video Modal */}
      <VideoModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        video={selectedVideo}
      />
    </div>
  )
}
