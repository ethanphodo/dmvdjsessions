import { useState } from 'react'
import { videos } from '../data/videos'
import { useVideoFilter } from '../hooks/useVideoFilter'
import PageHeader from '../components/layout/PageHeader'
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
    // Scroll to player
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleClosePlayer = () => {
    setSelectedVideo(null)
  }

  return (
    <div className="min-h-screen bg-[#050505] pt-12">
      <div className="max-w-7xl mx-auto px-6">
        <PageHeader
          sectionNumber="01"
          sectionLabel="WATCH"
          title="Session Library"
          subtitle="Explore our growing collection of intimate DJ sessions recorded across DC, Maryland, and Virginia."
        />

        {/* Video Player */}
        {selectedVideo && (
          <div className="mb-8">
            <div className="border border-[#E21D1D] bg-[#0A0A0A]">
              {/* Player Header */}
              <div className="border-b border-[#1A1A1A] px-6 py-4 flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-black uppercase tracking-tighter text-white">
                    {selectedVideo.title}
                  </h2>
                  <p className="font-mono text-xs text-[#888] uppercase">
                    {selectedVideo.djName}
                  </p>
                </div>
                <button
                  onClick={handleClosePlayer}
                  className="font-mono text-xs uppercase text-[#888] hover:text-[#E21D1D] transition-colors"
                >
                  ✕ CLOSE
                </button>
              </div>

              {/* Player */}
              <VideoPlayer
                embedUrl={selectedVideo.embedUrl}
                embedType={selectedVideo.embedType}
                title={selectedVideo.title}
              />

              {/* Player Info */}
              <div className="p-6">
                <p className="text-sm text-[#888] mb-4">
                  {selectedVideo.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {selectedVideo.genres.map((genre) => (
                    <span
                      key={genre}
                      className="px-2 py-1 border border-[#1A1A1A] font-mono text-xs text-white uppercase"
                    >
                      {genre}
                    </span>
                  ))}
                  {selectedVideo.mood.map((m) => (
                    <span
                      key={m}
                      className="px-2 py-1 bg-[#1A1A1A] font-mono text-xs text-[#888] uppercase"
                    >
                      {m}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Filters */}
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
            emptyMessage="No sessions match your filters. Try adjusting your search."
          />
        </div>
      </div>
    </div>
  )
}
