/**
 * Video Chapters Data for DMV DJ Sessions
 * Chapters allow users to jump to specific timestamps in videos
 */

export const chapters = {
  'vid-001': [
    {
      id: 'ch-001-1',
      title: 'Intro',
      timestamp: 0,
      endTimestamp: 180,
      description: 'Opening deep house vibes',
    },
    {
      id: 'ch-001-2',
      title: 'Warm Up',
      timestamp: 180,
      endTimestamp: 600,
      description: 'Building the groove with classic house',
    },
    {
      id: 'ch-001-3',
      title: 'Peak Time',
      timestamp: 600,
      endTimestamp: 1800,
      description: 'Soulful deep house selections',
    },
    {
      id: 'ch-001-4',
      title: 'Vocal House',
      timestamp: 1800,
      endTimestamp: 2700,
      description: 'Uplifting vocal tracks',
    },
    {
      id: 'ch-001-5',
      title: 'Closing',
      timestamp: 2700,
      endTimestamp: 3600,
      description: 'Winding down with deep cuts',
    },
  ],
  'vid-002': [
    {
      id: 'ch-002-1',
      title: 'Opening',
      timestamp: 0,
      endTimestamp: 300,
      description: 'Afro rhythms introduction',
    },
    {
      id: 'ch-002-2',
      title: 'Tribal Grooves',
      timestamp: 300,
      endTimestamp: 900,
      description: 'Percussive tribal beats',
    },
    {
      id: 'ch-002-3',
      title: 'Peak Energy',
      timestamp: 900,
      endTimestamp: 2100,
      description: 'High-energy Afro house bangers',
    },
    {
      id: 'ch-002-4',
      title: 'Cool Down',
      timestamp: 2100,
      endTimestamp: 3300,
      description: 'Melodic Afro selections',
    },
  ],
  'vid-003': [
    {
      id: 'ch-003-1',
      title: 'Disco Opener',
      timestamp: 0,
      endTimestamp: 420,
      description: 'Classic disco flavors',
    },
    {
      id: 'ch-003-2',
      title: 'Nu-Disco',
      timestamp: 420,
      endTimestamp: 1200,
      description: 'Modern disco edits',
    },
    {
      id: 'ch-003-3',
      title: 'Funky House',
      timestamp: 1200,
      endTimestamp: 2400,
      description: 'Disco-infused house',
    },
    {
      id: 'ch-003-4',
      title: 'Closing Jam',
      timestamp: 2400,
      endTimestamp: 3480,
      description: 'Funky finale',
    },
  ],
}

/**
 * Get chapters for a video
 */
export const getChaptersForVideo = (videoId) => {
  return chapters[videoId] || []
}

/**
 * Get chapter at specific timestamp
 */
export const getChapterAtTime = (videoId, currentTime) => {
  const videoChapters = chapters[videoId]
  if (!videoChapters) return null

  return videoChapters.find(
    (ch) => currentTime >= ch.timestamp && currentTime < ch.endTimestamp
  ) || null
}

/**
 * Get next chapter from current timestamp
 */
export const getNextChapter = (videoId, currentTime) => {
  const videoChapters = chapters[videoId]
  if (!videoChapters) return null

  return videoChapters.find((ch) => ch.timestamp > currentTime) || null
}

/**
 * Get previous chapter from current timestamp
 */
export const getPreviousChapter = (videoId, currentTime) => {
  const videoChapters = chapters[videoId]
  if (!videoChapters) return null

  // Find chapters that start before current time
  const previousChapters = videoChapters.filter((ch) => ch.timestamp < currentTime)
  if (previousChapters.length === 0) return null

  // If we're in the first 3 seconds of current chapter, go to previous
  const currentChapter = getChapterAtTime(videoId, currentTime)
  if (currentChapter && currentTime - currentChapter.timestamp < 3) {
    // Go to chapter before current
    const currentIndex = videoChapters.indexOf(currentChapter)
    return currentIndex > 0 ? videoChapters[currentIndex - 1] : null
  }

  // Otherwise go to start of current chapter
  return currentChapter
}

/**
 * Format timestamp to MM:SS
 */
export const formatTimestamp = (seconds) => {
  const mins = Math.floor(seconds / 60)
  const secs = Math.floor(seconds % 60)
  return `${mins}:${secs.toString().padStart(2, '0')}`
}

/**
 * Parse MM:SS to seconds
 */
export const parseTimestamp = (timestamp) => {
  const parts = timestamp.split(':').map(Number)
  if (parts.length === 2) {
    return parts[0] * 60 + parts[1]
  }
  if (parts.length === 3) {
    return parts[0] * 3600 + parts[1] * 60 + parts[2]
  }
  return 0
}

export default {
  chapters,
  getChaptersForVideo,
  getChapterAtTime,
  getNextChapter,
  getPreviousChapter,
  formatTimestamp,
  parseTimestamp,
}
