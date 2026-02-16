import { formatDate, formatDuration } from '../../utils/helpers'

export default function VideoCard({
  video,
  onSelect,
  isSelected = false,
  className = '',
}) {
  const {
    title,
    djName,
    date,
    duration,
    genres,
    thumbnail,
    views,
  } = video

  return (
    <div
      onClick={() => onSelect?.(video)}
      className={`
        group cursor-pointer card-hover
        ${isSelected ? 'ring-2 ring-[#E21D1D]' : ''}
        ${className}
      `}
    >
      {/* Thumbnail */}
      <div className="relative aspect-video bg-[#1A1A1A] overflow-hidden thumbnail-hover">
        {thumbnail ? (
          <img
            src={thumbnail}
            alt={title}
            className="w-full h-full object-cover opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-300"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-[#1A1A1A] to-[#0A0A0A]">
            <span className="font-mono text-xs text-[#333] uppercase">
              {title}
            </span>
          </div>
        )}

        {/* Duration Badge */}
        <div className="absolute bottom-3 right-3 px-2 py-1 bg-black/80 backdrop-blur-sm">
          <span className="font-mono text-xs text-white">
            {formatDuration(duration)}
          </span>
        </div>

        {/* Play Button Overlay */}
        <div className="play-overlay absolute inset-0 flex items-center justify-center bg-black/40">
          <div className="w-14 h-14 rounded-full bg-[#E21D1D] flex items-center justify-center shadow-lg">
            <svg
              className="w-6 h-6 text-white ml-1"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
        </div>

        {/* Genre Pills */}
        <div className="absolute top-3 left-3 flex gap-1">
          {genres.slice(0, 1).map((genre) => (
            <span
              key={genre}
              className="px-2 py-0.5 bg-black/60 backdrop-blur-sm font-mono text-[10px] text-white uppercase"
            >
              {genre}
            </span>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="pt-4">
        {/* Title */}
        <h3 className="text-base font-bold text-white group-hover:text-[#E21D1D] transition-colors line-clamp-1">
          {title}
        </h3>

        {/* DJ Name */}
        <p className="font-mono text-sm text-[#888] mt-1">
          {djName}
        </p>

        {/* Meta */}
        <div className="flex items-center gap-2 mt-2 font-mono text-xs text-[#666]">
          <span>{views?.toLocaleString()} views</span>
          <span>•</span>
          <span>{formatDate(date)}</span>
        </div>
      </div>
    </div>
  )
}
