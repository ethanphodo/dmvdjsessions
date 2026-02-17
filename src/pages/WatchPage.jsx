import { useState, useMemo } from 'react'
import PageTitle from '../components/layout/PageTitle'
import SEO from '../components/SEO'
import SessionCard from '../components/sessions/SessionCard'
import FilterBar from '../components/ui/FilterBar'
import NewsletterSignup from '../components/ui/NewsletterSignup'
import { videos, getLatestVideos } from '../data/videos'
import { GENRES, LOCATIONS } from '../utils/constants'

const SERIES_OPTIONS = [
  { value: 'studio', label: 'Studio' },
  { value: 'warehouse', label: 'Warehouse' },
  { value: 'rooftop', label: 'Rooftop' },
]

const MOOD_OPTIONS = [
  { value: 'chill', label: 'Chill' },
  { value: 'energetic', label: 'Energetic' },
  { value: 'dark', label: 'Dark' },
  { value: 'melodic', label: 'Melodic' },
  { value: 'groovy', label: 'Groovy' },
  { value: 'uplifting', label: 'Uplifting' },
]

export default function WatchPage() {
  const [filters, setFilters] = useState({
    search: '',
    genre: 'all',
    series: 'all',
    mood: 'all',
  })

  const latestVideos = getLatestVideos(2)

  const filteredVideos = useMemo(() => {
    return videos.filter((video) => {
      // Search filter
      if (filters.search) {
        const searchLower = filters.search.toLowerCase()
        const matchesSearch =
          video.title.toLowerCase().includes(searchLower) ||
          video.djName.toLowerCase().includes(searchLower) ||
          video.description.toLowerCase().includes(searchLower)
        if (!matchesSearch) return false
      }

      // Genre filter
      if (filters.genre !== 'all' && !video.genres.includes(filters.genre)) {
        return false
      }

      // Series filter
      if (filters.series !== 'all' && video.series !== filters.series) {
        return false
      }

      // Mood filter
      if (filters.mood !== 'all' && !video.mood.includes(filters.mood)) {
        return false
      }

      return true
    })
  }, [filters])

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }))
  }

  const handleReset = () => {
    setFilters({ search: '', genre: 'all', series: 'all', mood: 'all' })
  }

  const hasActiveFilters =
    filters.search || filters.genre !== 'all' || filters.series !== 'all' || filters.mood !== 'all'

  return (
    <div className="min-h-screen bg-black pt-28">
      <SEO
        title="Sessions | DMV DJ Sessions"
        description="Watch cinematic DJ performances from the DMV's rising talent. Deep house, tech house, Afro house, techno and more."
        keywords="DJ sessions, DMV DJs, house music, techno, deep house, Afro house, Washington DC DJ, Maryland DJ, Virginia DJ"
      />
      <div className="container-main">
        <PageTitle title="SESSIONS" />

        {/* Intro */}
        <p className="text-center text-[#888] text-lg max-w-2xl mx-auto mb-12 animate-fade-in">
          Cinematic DJ performances from the DMV's rising talent.
          <br />
          Curated. High-quality. Built to last.
        </p>

        {/* Filters */}
        <FilterBar
          filters={filters}
          onFilterChange={handleFilterChange}
          onReset={handleReset}
          hasActiveFilters={hasActiveFilters}
          resultCount={filteredVideos.length}
          totalCount={videos.length}
          filterOptions={{
            genres: GENRES,
            series: SERIES_OPTIONS,
            moods: MOOD_OPTIONS,
          }}
          className="mb-12"
        />

        {/* Session Grid - Bento Layout */}
        <div className="bento-grid pb-16 animate-fade-in">
          {filteredVideos.map((video, index) => {
            const isNew = latestVideos.some((v) => v.id === video.id)
            const isFeatured = video.views > 10000
            // First item is featured (spans 2 columns on desktop)
            const isFirstFeatured = index === 0 && isFeatured

            return (
              <div
                key={video.id}
                className={isFirstFeatured ? 'bento-wide' : ''}
              >
                <SessionCard
                  title={video.title}
                  djName={video.djName}
                  series={video.series}
                  thumbnail={video.thumbnail}
                  date={new Date(video.date).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric',
                  })}
                  genres={video.genres.map((g) => {
                    const genre = GENRES.find((gen) => gen.value === g)
                    return genre ? genre.label : g
                  })}
                  isNew={isNew}
                  isFeatured={isFeatured}
                />
              </div>
            )
          })}
        </div>

        {filteredVideos.length === 0 && (
          <div className="text-center py-16">
            <p className="text-[#666] text-lg mb-4">No sessions match your filters.</p>
            <button
              onClick={handleReset}
              className="text-sm text-white uppercase tracking-wide hover:text-[#888] transition-colors"
            >
              Clear Filters
            </button>
          </div>
        )}

        {/* Coming Soon Series */}
        <div className="border-t border-[#1A1A1A] pt-16 pb-8">
          <h2 className="text-sm font-medium uppercase tracking-wide text-[#666] mb-8 text-center">
            Coming Soon
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 border border-[#1A1A1A] bg-[#0A0A0A]">
              <div className="w-full h-1 bg-[#8B1E2D] mb-4" />
              <h3 className="text-xl font-bold uppercase tracking-tight mb-2">Warehouse Series</h3>
              <p className="text-sm text-[#888]">Raw industrial energy. Maryland underground.</p>
            </div>
            <div className="p-6 border border-[#1A1A1A] bg-[#0A0A0A]">
              <div className="w-full h-1 bg-[#7FAFD4] mb-4" />
              <h3 className="text-xl font-bold uppercase tracking-tight mb-2">Rooftop Sessions</h3>
              <p className="text-sm text-[#888]">Golden hour vibes. Virginia skylines.</p>
            </div>
          </div>
        </div>
      </div>

      <div className="divider" />

      {/* Newsletter CTA */}
      <div className="container-main section-padding text-center">
        <h2 className="text-sm font-medium uppercase tracking-wide text-[#666] mb-6">
          Never Miss a Drop
        </h2>
        <p className="text-[#888] text-lg mb-8">
          New sessions, events, and exclusive content.
        </p>
        <NewsletterSignup />

        <div className="flex items-center justify-center gap-6 mt-12">
          <a
            href="https://instagram.com/dmvdjsessions"
            target="_blank"
            rel="noopener noreferrer"
            className="link-hover text-[#888] hover:text-white transition-colors"
          >
            <span className="text-sm font-medium uppercase tracking-wide">Instagram</span>
          </a>
          <span className="text-[#333]">·</span>
          <a
            href="https://youtube.com/@dmvdjsessions"
            target="_blank"
            rel="noopener noreferrer"
            className="link-hover text-[#888] hover:text-white transition-colors"
          >
            <span className="text-sm font-medium uppercase tracking-wide">YouTube</span>
          </a>
        </div>
      </div>
    </div>
  )
}
