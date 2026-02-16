import { Link } from 'react-router-dom'
import { getFeaturedDJs } from '../../data/djs'
import { getVideosByDJ } from '../../data/videos'
import { GENRES, LOCATIONS } from '../../utils/constants'
import Button from '../ui/Button'

export default function DJSpotlight() {
  const featuredDJs = getFeaturedDJs()
  const spotlightDJ = featuredDJs[0]

  if (!spotlightDJ) return null

  const djVideos = getVideosByDJ(spotlightDJ.id)
  const locationLabel = LOCATIONS.find((l) => l.value === spotlightDJ.location)?.label
  const genreLabels = spotlightDJ.genres.map(
    (g) => GENRES.find((genre) => genre.value === g)?.label || g
  )

  return (
    <div className="border border-[#1A1A1A] bg-[#0A0A0A]">
      {/* Header */}
      <div className="border-b border-[#1A1A1A] px-6 py-4 flex items-center justify-between">
        <span className="font-mono text-xs uppercase tracking-tight text-white">
          FEATURED_DJ
        </span>
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 bg-[#E21D1D] blink" />
          <span className="font-mono text-xs uppercase text-[#888]">SPOTLIGHT</span>
        </div>
      </div>

      {/* Content */}
      <div className="grid md:grid-cols-2">
        {/* Image */}
        <div className="aspect-square md:aspect-auto bg-[#1A1A1A] relative">
          {spotlightDJ.image ? (
            <img
              src={spotlightDJ.image}
              alt={spotlightDJ.name}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="font-mono text-xs text-[#888] uppercase">
                PROFILE_IMG
              </span>
            </div>
          )}
        </div>

        {/* Info */}
        <div className="p-6 md:p-8">
          <h3 className="text-3xl md:text-4xl font-black uppercase tracking-tighter mb-2 text-white italic">
            {spotlightDJ.name}
          </h3>
          <p className="font-mono text-xs text-[#888] uppercase mb-4">
            {locationLabel}
          </p>

          <p className="text-sm text-[#888] leading-relaxed mb-6">
            {spotlightDJ.bio}
          </p>

          {/* Genres */}
          <div className="mb-6">
            <div className="font-mono text-xs text-[#888] uppercase mb-2">
              GENRES
            </div>
            <div className="flex flex-wrap gap-2">
              {genreLabels.map((genre) => (
                <span
                  key={genre}
                  className="px-3 py-1 border border-[#1A1A1A] font-mono text-xs text-white uppercase"
                >
                  {genre}
                </span>
              ))}
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="border border-[#1A1A1A] p-4 text-center">
              <div className="text-2xl font-black text-white">{djVideos.length}</div>
              <div className="font-mono text-[10px] text-[#888] uppercase">Sessions</div>
            </div>
            <div className="border border-[#1A1A1A] p-4 text-center">
              <div className="text-2xl font-black text-white">
                {djVideos.reduce((sum, v) => sum + (v.views || 0), 0).toLocaleString()}
              </div>
              <div className="font-mono text-[10px] text-[#888] uppercase">Total Views</div>
            </div>
          </div>

          {/* CTA */}
          <Button to="/watch" variant="primary">
            Watch Sessions
          </Button>
        </div>
      </div>
    </div>
  )
}
