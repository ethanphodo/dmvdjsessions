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
        <span className="text-sm text-[#666]">
          Video unavailable
        </span>
      </div>
    )
  }

  return (
    <div className={`relative aspect-video bg-black rounded-sm overflow-hidden ${className}`}>
      <iframe
        src={url}
        title={title}
        className="absolute inset-0 w-full h-full"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </div>
  )
}
