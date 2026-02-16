import { useState } from 'react'
import { videos } from '../data/videos'
import { useVideoFilter } from '../hooks/useVideoFilter'
import VideoFilters from '../components/video/VideoFilters'
import VideoGrid from '../components/video/VideoGrid'
import VideoPlayer from '../components/ui/VideoPlayer'

export default function WatchPage() {
  const [selectedVideo, setSelectedVideo] = useState(null)

  const {
    filters,
    filteredVideos,
    updateFilter,
    resetFilters,
    hasActiveFilters,
    resultCount,
    totalCount,
  } = useVideoFilter(videos)

  const handleSelectVideo = (video) => {
    setSelectedVideo(video)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleClosePlayer = () => {
    setSelectedVideo(null)
  }

  return (
    <div className="min-h-screen bg-black pt-20 md:pt-16">
      <div className="max-w-7xl mx-auto px-6">
        {/* Minimal Header */}
        <div className="pt-8 pb-8">
          <h1 className="text-4xl md:text-5xl font-black text-white mb-2">
            Sessions
          </h1>
          <p className="text-[#888] text-lg">
            Discover intimate DJ sets from the DMV scene.
          </p>
        </div>

        {/* Video Player */}
        {selectedVideo && (
          <div className="mb-8">
            <div className="bg-black">
              {/* Player Header */}
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-xl font-bold text-white">
                    {selectedVideo.title}
                  </h2>
                  <p className="text-sm text-[#888]">
                    {selectedVideo.djName}
                  </p>
                </div>
                <button
                  onClick={handleClosePlayer}
                  className="p-2 text-[#888] hover:text-white transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Player */}
              <VideoPlayer
                embedUrl={selectedVideo.embedUrl}
                embedType={selectedVideo.embedType}
                title={selectedVideo.title}
              />

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mt-4">
                {selectedVideo.genres.map((genre) => (
                  <span
                    key={genre}
                    className="px-3 py-1 bg-[#1A1A1A] text-sm text-white rounded-full"
                  >
                    {genre}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Filters - Simplified */}
        <div className="mb-8">
          <VideoFilters
            filters={filters}
            onFilterChange={updateFilter}
            onReset={resetFilters}
            hasActiveFilters={hasActiveFilters}
            resultCount={resultCount}
            totalCount={totalCount}
          />
        </div>

        {/* Video Grid */}
        <div className="pb-24">
          <VideoGrid
            videos={filteredVideos}
            selectedVideo={selectedVideo}
            onSelectVideo={handleSelectVideo}
            emptyMessage="No sessions match your filters."
          />
        </div>
      </div>
    </div>
  )
}
