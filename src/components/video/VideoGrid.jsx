import VideoCard from './VideoCard'

export default function VideoGrid({
  videos,
  selectedVideo,
  onSelectVideo,
  emptyMessage = 'No sessions found.',
  columns = 3,
}) {
  if (videos.length === 0) {
    return (
      <div className="border border-[#1A1A1A] bg-[#0A0A0A] p-12 text-center">
        <p className="font-mono text-sm text-[#888] uppercase">
          {emptyMessage}
        </p>
      </div>
    )
  }

  const gridCols = {
    2: 'md:grid-cols-2',
    3: 'md:grid-cols-2 lg:grid-cols-3',
    4: 'md:grid-cols-2 lg:grid-cols-4',
  }

  return (
    <div className={`grid gap-6 ${gridCols[columns] || gridCols[3]}`}>
      {videos.map((video) => (
        <VideoCard
          key={video.id}
          video={video}
          onSelect={onSelectVideo}
          isSelected={selectedVideo?.id === video.id}
        />
      ))}
    </div>
  )
}
