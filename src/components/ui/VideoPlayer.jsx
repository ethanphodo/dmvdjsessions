import { getYouTubeEmbedUrl, getVimeoEmbedUrl } from '../../utils/helpers'

export default function VideoPlayer({
  embedUrl,
  embedType = 'youtube',
  title = 'Video player',
  className = '',
}) {
  const getEmbedUrl = () => {
    if (embedType === 'youtube') {
      return getYouTubeEmbedUrl(embedUrl)
    }
    if (embedType === 'vimeo') {
      return getVimeoEmbedUrl(embedUrl)
    }
    return embedUrl
  }

  const url = getEmbedUrl()

  if (!url) {
    return (
      <div className={`aspect-video bg-[#1A1A1A] flex items-center justify-center ${className}`}>
        <span className="font-mono text-xs text-[#888] uppercase">
          VIDEO_UNAVAILABLE
        </span>
      </div>
    )
  }

  return (
    <div className={`relative aspect-video bg-black ${className}`}>
      <iframe
        src={url}
        title={title}
        className="absolute inset-0 w-full h-full"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
      {/* Corner Label */}
      <div className="absolute top-0 left-0 px-2 py-1 bg-[#0A0A0A]/90 border-r border-b border-[#1A1A1A]">
        <span className="font-mono text-[10px] uppercase text-[#888]">
          {embedType.toUpperCase()}
        </span>
      </div>
    </div>
  )
}
