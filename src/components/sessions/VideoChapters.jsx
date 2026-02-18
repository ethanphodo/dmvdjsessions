import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  getChaptersForVideo,
  getChapterAtTime,
  formatTimestamp,
} from '../../data/chapters'

/**
 * Video Chapters List Component
 * Displays a list of chapters with timestamps for navigation
 */
export default function VideoChapters({
  videoId,
  currentTime = 0,
  onSeek,
  className = '',
  collapsed = false,
}) {
  const [chapters, setChapters] = useState([])
  const [activeChapter, setActiveChapter] = useState(null)
  const [isExpanded, setIsExpanded] = useState(!collapsed)

  useEffect(() => {
    const videoChapters = getChaptersForVideo(videoId)
    setChapters(videoChapters)
  }, [videoId])

  useEffect(() => {
    const chapter = getChapterAtTime(videoId, currentTime)
    setActiveChapter(chapter)
  }, [videoId, currentTime])

  if (chapters.length === 0) {
    return null
  }

  const handleChapterClick = (chapter) => {
    onSeek?.(chapter.timestamp)
  }

  return (
    <div className={`bg-white/5 rounded-xl overflow-hidden ${className}`}>
      {/* Header */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between px-4 py-3 hover:bg-white/5 transition-colors"
      >
        <div className="flex items-center gap-3">
          <svg className="w-5 h-5 text-[#D6A756]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M4 6h16M4 10h16M4 14h16M4 18h16"
            />
          </svg>
          <span className="text-sm font-medium text-white">
            Chapters ({chapters.length})
          </span>
        </div>
        <svg
          className={`w-4 h-4 text-gray-400 transition-transform ${isExpanded ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Chapters List */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="px-2 pb-2 space-y-1">
              {chapters.map((chapter, index) => {
                const isActive = activeChapter?.id === chapter.id
                const isPast = currentTime >= chapter.endTimestamp

                return (
                  <button
                    key={chapter.id}
                    onClick={() => handleChapterClick(chapter)}
                    className={`w-full flex items-start gap-3 px-3 py-2 rounded-lg transition-all text-left ${
                      isActive
                        ? 'bg-[#D6A756]/20 text-white'
                        : isPast
                          ? 'text-gray-500 hover:text-white hover:bg-white/5'
                          : 'text-gray-400 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    {/* Chapter number */}
                    <span
                      className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium ${
                        isActive
                          ? 'bg-[#D6A756] text-black'
                          : 'bg-white/10 text-gray-400'
                      }`}
                    >
                      {index + 1}
                    </span>

                    {/* Chapter info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-sm font-medium truncate">
                          {chapter.title}
                        </span>
                        <span className="flex-shrink-0 text-xs text-gray-500 font-mono">
                          {formatTimestamp(chapter.timestamp)}
                        </span>
                      </div>
                      {chapter.description && (
                        <p className="text-xs text-gray-500 mt-0.5 truncate">
                          {chapter.description}
                        </p>
                      )}
                    </div>

                    {/* Playing indicator */}
                    {isActive && (
                      <span className="flex-shrink-0 flex items-center gap-0.5">
                        <span className="w-1 h-3 bg-[#D6A756] rounded-full animate-pulse" />
                        <span className="w-1 h-4 bg-[#D6A756] rounded-full animate-pulse delay-75" />
                        <span className="w-1 h-2 bg-[#D6A756] rounded-full animate-pulse delay-150" />
                      </span>
                    )}
                  </button>
                )
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

/**
 * Chapter Progress Bar
 * Shows chapter markers on a timeline
 */
export function ChapterProgressBar({
  videoId,
  currentTime = 0,
  duration = 0,
  onSeek,
  className = '',
}) {
  const [chapters, setChapters] = useState([])
  const [hoveredChapter, setHoveredChapter] = useState(null)

  useEffect(() => {
    setChapters(getChaptersForVideo(videoId))
  }, [videoId])

  if (chapters.length === 0 || duration === 0) {
    return null
  }

  const progress = (currentTime / duration) * 100

  return (
    <div className={`relative ${className}`}>
      {/* Progress track */}
      <div className="relative h-2 bg-white/10 rounded-full overflow-hidden">
        {/* Progress fill */}
        <div
          className="absolute left-0 top-0 h-full bg-[#D6A756] transition-all duration-100"
          style={{ width: `${progress}%` }}
        />

        {/* Chapter markers */}
        {chapters.map((chapter) => {
          const position = (chapter.timestamp / duration) * 100
          const isActive = currentTime >= chapter.timestamp && currentTime < chapter.endTimestamp

          return (
            <button
              key={chapter.id}
              className={`absolute top-0 h-full w-0.5 transition-all ${
                isActive ? 'bg-white' : 'bg-white/40'
              }`}
              style={{ left: `${position}%` }}
              onClick={() => onSeek?.(chapter.timestamp)}
              onMouseEnter={() => setHoveredChapter(chapter)}
              onMouseLeave={() => setHoveredChapter(null)}
              aria-label={`Jump to ${chapter.title}`}
            />
          )
        })}
      </div>

      {/* Hover tooltip */}
      <AnimatePresence>
        {hoveredChapter && (
          <motion.div
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 5 }}
            className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 px-3 py-2 bg-black rounded-lg shadow-xl border border-white/10 whitespace-nowrap z-10"
          >
            <div className="text-sm font-medium text-white">{hoveredChapter.title}</div>
            <div className="text-xs text-gray-400">{formatTimestamp(hoveredChapter.timestamp)}</div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Chapter labels below */}
      <div className="relative mt-2 h-6">
        {chapters.map((chapter, index) => {
          const position = (chapter.timestamp / duration) * 100
          const isFirst = index === 0
          const isLast = index === chapters.length - 1

          // Only show labels for first, last, and evenly spaced chapters
          if (!isFirst && !isLast && index % 2 !== 0) return null

          return (
            <button
              key={chapter.id}
              className="absolute text-xs text-gray-500 hover:text-white transition-colors truncate"
              style={{
                left: `${position}%`,
                transform: isFirst ? 'translateX(0)' : isLast ? 'translateX(-100%)' : 'translateX(-50%)',
                maxWidth: '80px',
              }}
              onClick={() => onSeek?.(chapter.timestamp)}
            >
              {chapter.title}
            </button>
          )
        })}
      </div>
    </div>
  )
}

/**
 * Compact Chapter Navigation
 * Previous/Next chapter buttons with current chapter display
 */
export function ChapterNavigation({
  videoId,
  currentTime = 0,
  onSeek,
  className = '',
}) {
  const [chapters, setChapters] = useState([])
  const [currentChapter, setCurrentChapter] = useState(null)
  const [currentIndex, setCurrentIndex] = useState(-1)

  useEffect(() => {
    const videoChapters = getChaptersForVideo(videoId)
    setChapters(videoChapters)
  }, [videoId])

  useEffect(() => {
    const chapter = getChapterAtTime(videoId, currentTime)
    setCurrentChapter(chapter)
    if (chapter) {
      setCurrentIndex(chapters.findIndex((c) => c.id === chapter.id))
    }
  }, [videoId, currentTime, chapters])

  if (chapters.length === 0) {
    return null
  }

  const handlePrevious = () => {
    if (currentIndex > 0) {
      onSeek?.(chapters[currentIndex - 1].timestamp)
    } else if (currentChapter) {
      // Go to start of current chapter
      onSeek?.(currentChapter.timestamp)
    }
  }

  const handleNext = () => {
    if (currentIndex < chapters.length - 1) {
      onSeek?.(chapters[currentIndex + 1].timestamp)
    }
  }

  return (
    <div className={`flex items-center gap-4 ${className}`}>
      {/* Previous button */}
      <button
        onClick={handlePrevious}
        disabled={currentIndex <= 0 && (!currentChapter || currentTime - currentChapter.timestamp < 3)}
        className="p-2 rounded-full hover:bg-white/10 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
        aria-label="Previous chapter"
      >
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M6 6h2v12H6zm3.5 6l8.5 6V6z" />
        </svg>
      </button>

      {/* Current chapter */}
      <div className="flex-1 min-w-0 text-center">
        {currentChapter ? (
          <>
            <div className="text-sm font-medium text-white truncate">
              {currentChapter.title}
            </div>
            <div className="text-xs text-gray-500">
              Chapter {currentIndex + 1} of {chapters.length}
            </div>
          </>
        ) : (
          <div className="text-sm text-gray-500">No chapter</div>
        )}
      </div>

      {/* Next button */}
      <button
        onClick={handleNext}
        disabled={currentIndex >= chapters.length - 1}
        className="p-2 rounded-full hover:bg-white/10 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
        aria-label="Next chapter"
      >
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z" />
        </svg>
      </button>
    </div>
  )
}
