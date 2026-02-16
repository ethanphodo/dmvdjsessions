// Format date for display
export function formatDate(dateString) {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}

// Format duration (e.g., "60:00" -> "1 hr")
export function formatDuration(duration) {
  const [minutes] = duration.split(':').map(Number)
  if (minutes >= 60) {
    const hours = Math.floor(minutes / 60)
    const mins = minutes % 60
    return mins > 0 ? `${hours}hr ${mins}m` : `${hours}hr`
  }
  return `${minutes}m`
}

// Get YouTube embed URL from various YouTube URL formats
export function getYouTubeEmbedUrl(url) {
  if (!url) return null

  // Already an embed URL
  if (url.includes('youtube.com/embed/')) {
    return url
  }

  // Extract video ID from various formats
  let videoId = null

  // youtu.be/VIDEO_ID
  const shortMatch = url.match(/youtu\.be\/([a-zA-Z0-9_-]+)/)
  if (shortMatch) {
    videoId = shortMatch[1]
  }

  // youtube.com/watch?v=VIDEO_ID
  const watchMatch = url.match(/youtube\.com\/watch\?v=([a-zA-Z0-9_-]+)/)
  if (watchMatch) {
    videoId = watchMatch[1]
  }

  if (videoId) {
    return `https://www.youtube.com/embed/${videoId}`
  }

  return url
}

// Get Vimeo embed URL
export function getVimeoEmbedUrl(url) {
  if (!url) return null

  if (url.includes('player.vimeo.com/video/')) {
    return url
  }

  const match = url.match(/vimeo\.com\/(\d+)/)
  if (match) {
    return `https://player.vimeo.com/video/${match[1]}`
  }

  return url
}

// Slugify a string
export function slugify(text) {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

// Filter array by multiple criteria
export function filterItems(items, filters) {
  return items.filter((item) => {
    for (const [key, value] of Object.entries(filters)) {
      if (!value || value === 'all') continue

      if (Array.isArray(item[key])) {
        if (!item[key].includes(value)) return false
      } else {
        if (item[key] !== value) return false
      }
    }
    return true
  })
}

// Validate email format
export function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

// Validate URL format
export function isValidUrl(url) {
  try {
    new URL(url)
    return true
  } catch {
    return false
  }
}

// Truncate text with ellipsis
export function truncate(text, maxLength = 100) {
  if (text.length <= maxLength) return text
  return text.slice(0, maxLength).trim() + '...'
}

// Generate unique ID
export function generateId(prefix = 'id') {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`
}

// Debounce function
export function debounce(func, wait) {
  let timeout
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout)
      func(...args)
    }
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
  }
}
