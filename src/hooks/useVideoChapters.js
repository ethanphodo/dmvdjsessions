/**
 * Video Chapters Hook for DMV DJ Sessions
 * Manages chapter state and navigation for video playback
 */

import { useState, useEffect, useCallback, useMemo } from 'react'
import {
  getChaptersForVideo,
  getChapterAtTime,
  getNextChapter,
  getPreviousChapter,
} from '../data/chapters'

/**
 * Hook for managing video chapters
 * @param {string} videoId - The video ID to get chapters for
 * @param {number} currentTime - Current playback time in seconds
 * @returns {Object} Chapter state and navigation functions
 */
export function useVideoChapters(videoId, currentTime = 0) {
  const [chapters, setChapters] = useState([])

  // Load chapters when video changes
  useEffect(() => {
    const videoChapters = getChaptersForVideo(videoId)
    setChapters(videoChapters)
  }, [videoId])

  // Get current chapter
  const currentChapter = useMemo(() => {
    return getChapterAtTime(videoId, currentTime)
  }, [videoId, currentTime])

  // Get current chapter index
  const currentIndex = useMemo(() => {
    if (!currentChapter) return -1
    return chapters.findIndex((c) => c.id === currentChapter.id)
  }, [chapters, currentChapter])

  // Check if there are chapters
  const hasChapters = chapters.length > 0

  // Check if can go to previous/next
  const canGoPrevious = currentIndex > 0 || (currentChapter && currentTime - currentChapter.timestamp >= 3)
  const canGoNext = currentIndex < chapters.length - 1

  // Get previous chapter timestamp
  const getPreviousTimestamp = useCallback(() => {
    if (!hasChapters) return null

    // If we're more than 3 seconds into current chapter, go to start
    if (currentChapter && currentTime - currentChapter.timestamp >= 3) {
      return currentChapter.timestamp
    }

    // Otherwise go to previous chapter
    const prev = getPreviousChapter(videoId, currentTime)
    return prev ? prev.timestamp : null
  }, [videoId, currentTime, currentChapter, hasChapters])

  // Get next chapter timestamp
  const getNextTimestamp = useCallback(() => {
    if (!hasChapters) return null
    const next = getNextChapter(videoId, currentTime)
    return next ? next.timestamp : null
  }, [videoId, currentTime, hasChapters])

  // Calculate progress within current chapter
  const chapterProgress = useMemo(() => {
    if (!currentChapter) return 0
    const elapsed = currentTime - currentChapter.timestamp
    const duration = currentChapter.endTimestamp - currentChapter.timestamp
    return Math.min(100, Math.max(0, (elapsed / duration) * 100))
  }, [currentChapter, currentTime])

  // Time remaining in current chapter
  const chapterTimeRemaining = useMemo(() => {
    if (!currentChapter) return 0
    return Math.max(0, currentChapter.endTimestamp - currentTime)
  }, [currentChapter, currentTime])

  return {
    chapters,
    currentChapter,
    currentIndex,
    hasChapters,
    canGoPrevious,
    canGoNext,
    getPreviousTimestamp,
    getNextTimestamp,
    chapterProgress,
    chapterTimeRemaining,
  }
}

/**
 * Hook for chapter keyboard navigation
 * @param {Object} options
 * @param {string} options.videoId - Video ID
 * @param {number} options.currentTime - Current playback time
 * @param {function} options.onSeek - Callback when seeking to timestamp
 * @param {boolean} options.enabled - Whether keyboard nav is enabled
 */
export function useChapterKeyboardNav({ videoId, currentTime, onSeek, enabled = true }) {
  const { getPreviousTimestamp, getNextTimestamp, hasChapters } = useVideoChapters(videoId, currentTime)

  useEffect(() => {
    if (!enabled || !hasChapters) return

    const handleKeyDown = (event) => {
      // Skip if user is typing in an input
      if (event.target.tagName === 'INPUT' || event.target.tagName === 'TEXTAREA') {
        return
      }

      // Shift + Left Arrow = Previous chapter
      if (event.shiftKey && event.key === 'ArrowLeft') {
        event.preventDefault()
        const timestamp = getPreviousTimestamp()
        if (timestamp !== null) {
          onSeek?.(timestamp)
        }
      }

      // Shift + Right Arrow = Next chapter
      if (event.shiftKey && event.key === 'ArrowRight') {
        event.preventDefault()
        const timestamp = getNextTimestamp()
        if (timestamp !== null) {
          onSeek?.(timestamp)
        }
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [enabled, hasChapters, getPreviousTimestamp, getNextTimestamp, onSeek])
}

export default useVideoChapters
