/**
 * Data Fetching Hooks
 *
 * React hooks for fetching data through the adapter layer.
 * These hooks handle loading states, errors, and caching.
 *
 * Usage:
 * const { data: videos, loading, error } = useVideos()
 * const { data: dj, loading } = useDJ('marcus-cole')
 */

import { useState, useEffect, useMemo, useCallback } from 'react'
import { getAdapter } from '../data/adapters'

/**
 * Generic data fetching hook
 * @param {Function} fetchFn - Async function to fetch data
 * @param {Array} deps - Dependencies array for re-fetching
 */
export function useAsync(fetchFn, deps = []) {
  const [state, setState] = useState({
    data: null,
    loading: true,
    error: null,
  })

  useEffect(() => {
    let cancelled = false

    const fetch = async () => {
      setState((s) => ({ ...s, loading: true, error: null }))

      try {
        const data = await fetchFn()
        if (!cancelled) {
          setState({ data, loading: false, error: null })
        }
      } catch (error) {
        if (!cancelled) {
          setState({ data: null, loading: false, error })
        }
      }
    }

    fetch()

    return () => {
      cancelled = true
    }
  }, deps)

  return state
}

/**
 * Get all videos with optional filtering
 */
export function useVideos(options = {}) {
  const adapter = useMemo(() => getAdapter(), [])

  return useAsync(
    () => adapter.getVideos(options),
    [JSON.stringify(options)]
  )
}

/**
 * Get a single video by ID
 */
export function useVideo(id) {
  const adapter = useMemo(() => getAdapter(), [])

  return useAsync(
    () => (id ? adapter.getVideoById(id) : Promise.resolve(null)),
    [id]
  )
}

/**
 * Get videos by DJ
 */
export function useVideosByDJ(djId) {
  const adapter = useMemo(() => getAdapter(), [])

  return useAsync(
    () => (djId ? adapter.getVideosByDJ(djId) : Promise.resolve([])),
    [djId]
  )
}

/**
 * Get latest videos
 */
export function useLatestVideos(limit = 5) {
  const adapter = useMemo(() => getAdapter(), [])

  return useAsync(() => adapter.getLatestVideos(limit), [limit])
}

/**
 * Get related videos
 */
export function useRelatedVideos(videoId, limit = 4) {
  const adapter = useMemo(() => getAdapter(), [])

  return useAsync(
    () => (videoId ? adapter.getRelatedVideos(videoId, limit) : Promise.resolve([])),
    [videoId, limit]
  )
}

/**
 * Get all DJs with optional filtering
 */
export function useDJs(options = {}) {
  const adapter = useMemo(() => getAdapter(), [])

  return useAsync(
    () => adapter.getDJs(options),
    [JSON.stringify(options)]
  )
}

/**
 * Get a single DJ by slug
 */
export function useDJ(slug) {
  const adapter = useMemo(() => getAdapter(), [])

  return useAsync(
    () => (slug ? adapter.getDJBySlug(slug) : Promise.resolve(null)),
    [slug]
  )
}

/**
 * Get DJ with their videos
 */
export function useDJWithVideos(slug) {
  const adapter = useMemo(() => getAdapter(), [])

  return useAsync(
    () => (slug ? adapter.getDJWithVideos(slug) : Promise.resolve(null)),
    [slug]
  )
}

/**
 * Get featured DJs
 */
export function useFeaturedDJs() {
  const adapter = useMemo(() => getAdapter(), [])

  return useAsync(() => adapter.getFeaturedDJs(), [])
}

/**
 * Get all events with optional filtering
 */
export function useEvents(options = {}) {
  const adapter = useMemo(() => getAdapter(), [])

  return useAsync(
    () => adapter.getEvents(options),
    [JSON.stringify(options)]
  )
}

/**
 * Get a single event by ID
 */
export function useEvent(id) {
  const adapter = useMemo(() => getAdapter(), [])

  return useAsync(
    () => (id ? adapter.getEventById(id) : Promise.resolve(null)),
    [id]
  )
}

/**
 * Get upcoming events
 */
export function useUpcomingEvents() {
  const adapter = useMemo(() => getAdapter(), [])

  return useAsync(() => adapter.getUpcomingEvents(), [])
}

/**
 * Get past events
 */
export function usePastEvents() {
  const adapter = useMemo(() => getAdapter(), [])

  return useAsync(() => adapter.getPastEvents(), [])
}

/**
 * Get all series
 */
export function useSeries() {
  const adapter = useMemo(() => getAdapter(), [])

  return useAsync(() => adapter.getSeries(), [])
}

/**
 * Get a single series by ID
 */
export function useSeriesById(id) {
  const adapter = useMemo(() => getAdapter(), [])

  return useAsync(
    () => (id ? adapter.getSeriesById(id) : Promise.resolve(null)),
    [id]
  )
}

/**
 * Get site stats
 */
export function useStats() {
  const adapter = useMemo(() => getAdapter(), [])

  return useAsync(() => adapter.getStats(), [])
}

/**
 * Search across all content types
 */
export function useSearch(query, options = {}) {
  const adapter = useMemo(() => getAdapter(), [])
  const [debouncedQuery, setDebouncedQuery] = useState(query)

  // Debounce search query
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(query)
    }, 300)

    return () => clearTimeout(timer)
  }, [query])

  return useAsync(
    () =>
      debouncedQuery
        ? adapter.search(debouncedQuery, options)
        : Promise.resolve({ videos: [], djs: [], events: [] }),
    [debouncedQuery, JSON.stringify(options)]
  )
}

/**
 * Mutation hook for future use with CMS
 * This will be useful when implementing write operations
 */
export function useMutation(mutationFn) {
  const [state, setState] = useState({
    data: null,
    loading: false,
    error: null,
  })

  const mutate = useCallback(
    async (...args) => {
      setState({ data: null, loading: true, error: null })

      try {
        const data = await mutationFn(...args)
        setState({ data, loading: false, error: null })
        return data
      } catch (error) {
        setState({ data: null, loading: false, error })
        throw error
      }
    },
    [mutationFn]
  )

  const reset = useCallback(() => {
    setState({ data: null, loading: false, error: null })
  }, [])

  return { ...state, mutate, reset }
}

export default {
  useAsync,
  useVideos,
  useVideo,
  useVideosByDJ,
  useLatestVideos,
  useRelatedVideos,
  useDJs,
  useDJ,
  useDJWithVideos,
  useFeaturedDJs,
  useEvents,
  useEvent,
  useUpcomingEvents,
  usePastEvents,
  useSeries,
  useSeriesById,
  useStats,
  useSearch,
  useMutation,
}
