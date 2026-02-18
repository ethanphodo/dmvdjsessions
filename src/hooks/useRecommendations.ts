import { useMemo, useCallback } from 'react'
import type { Session, DJ, Genre } from '../types'
import { videos, getVideosByDJ } from '../data/videos'
import { djs, getDJById } from '../data/djs'
import { useUserPreferences } from './useUserPreferences'

interface RecommendationOptions {
  limit?: number
  excludeViewed?: boolean
}

/**
 * Hook for generating personalized session and DJ recommendations
 * Uses collaborative filtering based on user preferences and viewing history
 */
export function useRecommendations() {
  const { preferences, getGenreAffinityScores } = useUserPreferences()

  // Calculate session score based on user preferences
  const calculateSessionScore = useCallback(
    (session: Session): number => {
      let score = 0
      const genreScores = getGenreAffinityScores()

      // Genre matching
      session.genres.forEach((genre) => {
        score += genreScores[genre] ?? 0
      })

      // Favorite DJ bonus
      if (preferences.favoriteDJs.includes(session.djId)) {
        score += 15
      }

      // Recency bonus (newer sessions get slight preference)
      const daysSinceRelease = (Date.now() - new Date(session.date).getTime()) / (1000 * 60 * 60 * 24)
      if (daysSinceRelease < 30) {
        score += 5 - Math.floor(daysSinceRelease / 7)
      }

      // Popularity factor (normalized)
      const maxViews = Math.max(...videos.map((v) => v.views))
      score += (session.views / maxViews) * 3

      // Penalize already viewed (if not excluded)
      if (preferences.viewedSessions.includes(session.id)) {
        score -= 5
      }

      return score
    },
    [preferences.favoriteDJs, preferences.viewedSessions, getGenreAffinityScores]
  )

  // Get recommended sessions
  const getRecommendedSessions = useCallback(
    (options: RecommendationOptions = {}): Session[] => {
      const { limit = 6, excludeViewed = false } = options

      let sessions = [...videos]

      // Filter out viewed sessions if requested
      if (excludeViewed) {
        sessions = sessions.filter((s) => !preferences.viewedSessions.includes(s.id))
      }

      // Score and sort
      const scored = sessions.map((session) => ({
        session,
        score: calculateSessionScore(session),
      }))

      scored.sort((a, b) => b.score - a.score)

      return scored.slice(0, limit).map((s) => s.session)
    },
    [calculateSessionScore, preferences.viewedSessions]
  )

  // Get similar sessions based on a reference session
  const getSimilarSessions = useCallback(
    (sessionId: string, limit = 4): Session[] => {
      const session = videos.find((v) => v.id === sessionId)
      if (!session) return []

      const otherSessions = videos.filter((v) => v.id !== sessionId)

      const scored = otherSessions.map((other) => {
        let score = 0

        // Same DJ (highest affinity)
        if (other.djId === session.djId) {
          score += 5
        }

        // Same series
        if (other.series === session.series) {
          score += 3
        }

        // Shared genres
        const sharedGenres = other.genres.filter((g) => session.genres.includes(g))
        score += sharedGenres.length * 2

        // Shared moods
        const sharedMoods = other.mood.filter((m) => session.mood.includes(m))
        score += sharedMoods.length

        return { session: other, score }
      })

      scored.sort((a, b) => b.score - a.score)

      return scored.slice(0, limit).map((s) => s.session)
    },
    []
  )

  // Get recommended DJs
  const getRecommendedDJs = useCallback(
    (limit = 4): DJ[] => {
      const genreScores = getGenreAffinityScores()

      const scored = djs.map((dj) => {
        let score = 0

        // Genre matching
        dj.genres.forEach((genre) => {
          score += genreScores[genre] ?? 0
        })

        // Featured bonus
        if (dj.featured) {
          score += 3
        }

        // Content volume bonus
        const djSessions = getVideosByDJ(dj.id)
        score += Math.min(djSessions.length * 0.5, 3)

        // Already favorite penalty (show new DJs)
        if (preferences.favoriteDJs.includes(dj.id)) {
          score -= 10
        }

        return { dj, score }
      })

      scored.sort((a, b) => b.score - a.score)

      return scored.slice(0, limit).map((s) => s.dj)
    },
    [preferences.favoriteDJs, getGenreAffinityScores]
  )

  // Get DJs similar to a reference DJ
  const getSimilarDJs = useCallback(
    (djId: string, limit = 4): DJ[] => {
      const dj = getDJById(djId)
      if (!dj) return []

      const otherDJs = djs.filter((d) => d.id !== djId)

      const scored = otherDJs.map((other) => {
        let score = 0

        // Shared genres
        const sharedGenres = other.genres.filter((g) => dj.genres.includes(g))
        score += sharedGenres.length * 3

        // Same location
        if (other.location === dj.location) {
          score += 2
        }

        return { dj: other, score }
      })

      scored.sort((a, b) => b.score - a.score)

      return scored.slice(0, limit).map((s) => s.dj)
    },
    []
  )

  // Get "Continue Watching" sessions
  const getContinueWatching = useCallback(
    (limit = 4): Session[] => {
      if (preferences.viewedSessions.length === 0) return []

      // Get the most recently viewed sessions
      const recentlyViewed = preferences.viewedSessions.slice(0, limit)

      return recentlyViewed
        .map((id) => videos.find((v) => v.id === id))
        .filter((v): v is Session => v !== undefined)
    },
    [preferences.viewedSessions]
  )

  // Get trending sessions (most viewed recently)
  const getTrendingSessions = useMemo(
    (): Session[] => {
      return [...videos]
        .sort((a, b) => b.views - a.views)
        .slice(0, 6)
    },
    []
  )

  // Get new releases
  const getNewReleases = useMemo(
    (): Session[] => {
      return [...videos]
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
        .slice(0, 6)
    },
    []
  )

  // Get sessions by favorite genres
  const getSessionsByFavoriteGenres = useCallback(
    (limit = 6): Session[] => {
      if (preferences.favoriteGenres.length === 0) return []

      const matchingSessions = videos.filter((session) =>
        session.genres.some((g) =>
          preferences.favoriteGenres.includes(g as Genre)
        )
      )

      return matchingSessions.slice(0, limit)
    },
    [preferences.favoriteGenres]
  )

  return {
    // Session recommendations
    getRecommendedSessions,
    getSimilarSessions,
    getContinueWatching,
    getTrendingSessions,
    getNewReleases,
    getSessionsByFavoriteGenres,

    // DJ recommendations
    getRecommendedDJs,
    getSimilarDJs,

    // Utilities
    calculateSessionScore,
  }
}

export default useRecommendations
