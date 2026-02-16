import { useState, useMemo } from 'react'

export function useVideoFilter(videos) {
  const [filters, setFilters] = useState({
    genre: 'all',
    series: 'all',
    mood: 'all',
    search: '',
  })

  const filteredVideos = useMemo(() => {
    return videos.filter((video) => {
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

      // Search filter
      if (filters.search) {
        const searchLower = filters.search.toLowerCase()
        const matchesTitle = video.title.toLowerCase().includes(searchLower)
        const matchesDJ = video.djName.toLowerCase().includes(searchLower)
        const matchesDescription = video.description?.toLowerCase().includes(searchLower)
        if (!matchesTitle && !matchesDJ && !matchesDescription) {
          return false
        }
      }

      return true
    })
  }, [videos, filters])

  const updateFilter = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }))
  }

  const resetFilters = () => {
    setFilters({
      genre: 'all',
      series: 'all',
      mood: 'all',
      search: '',
    })
  }

  const hasActiveFilters =
    filters.genre !== 'all' ||
    filters.series !== 'all' ||
    filters.mood !== 'all' ||
    filters.search !== ''

  return {
    filters,
    filteredVideos,
    updateFilter,
    resetFilters,
    hasActiveFilters,
    resultCount: filteredVideos.length,
    totalCount: videos.length,
  }
}
