/**
 * Recommendation Engine Utilities
 * ML-free collaborative filtering for personalized content
 */

import type { Session, DJ, Genre } from '../types'

interface UserProfile {
  viewedSessions: string[]
  favoriteDJs: string[]
  favoriteGenres: Genre[]
}

interface SessionScore {
  session: Session
  score: number
  reasons: string[]
}

interface DJScore {
  dj: DJ
  score: number
  reasons: string[]
}

/**
 * Calculate genre affinity based on viewing history
 */
export function calculateGenreAffinity(
  sessions: Session[],
  viewedSessionIds: string[]
): Map<Genre, number> {
  const affinity = new Map<Genre, number>()

  viewedSessionIds.forEach((sessionId) => {
    const session = sessions.find((s) => s.id === sessionId)
    if (!session) return

    session.genres.forEach((genre) => {
      const current = affinity.get(genre) ?? 0
      affinity.set(genre, current + 1)
    })
  })

  // Normalize scores
  const maxScore = Math.max(...affinity.values(), 1)
  affinity.forEach((score, genre) => {
    affinity.set(genre, score / maxScore)
  })

  return affinity
}

/**
 * Calculate DJ affinity based on viewing history
 */
export function calculateDJAffinity(
  sessions: Session[],
  viewedSessionIds: string[]
): Map<string, number> {
  const affinity = new Map<string, number>()

  viewedSessionIds.forEach((sessionId) => {
    const session = sessions.find((s) => s.id === sessionId)
    if (!session) return

    const current = affinity.get(session.djId) ?? 0
    affinity.set(session.djId, current + 1)
  })

  // Normalize scores
  const maxScore = Math.max(...affinity.values(), 1)
  affinity.forEach((score, djId) => {
    affinity.set(djId, score / maxScore)
  })

  return affinity
}

/**
 * Score a session based on user profile
 */
export function scoreSession(
  session: Session,
  profile: UserProfile,
  allSessions: Session[]
): SessionScore {
  let score = 0
  const reasons: string[] = []

  // Calculate affinities
  const genreAffinity = calculateGenreAffinity(allSessions, profile.viewedSessions)
  const djAffinity = calculateDJAffinity(allSessions, profile.viewedSessions)

  // Genre matching (max 30 points)
  let genreScore = 0
  session.genres.forEach((genre) => {
    const affinity = genreAffinity.get(genre) ?? 0
    genreScore += affinity * 15
  })
  if (genreScore > 0) {
    score += Math.min(genreScore, 30)
    reasons.push('Matches your genre preferences')
  }

  // DJ affinity (max 25 points)
  const djScore = (djAffinity.get(session.djId) ?? 0) * 25
  if (djScore > 0) {
    score += djScore
    reasons.push(`You've enjoyed ${session.djName}'s sets`)
  }

  // Favorite DJ bonus (20 points)
  if (profile.favoriteDJs.includes(session.djId)) {
    score += 20
    reasons.push('From one of your favorite DJs')
  }

  // Explicit genre preference match (15 points per match)
  const explicitGenreMatches = session.genres.filter((g) =>
    profile.favoriteGenres.includes(g)
  )
  if (explicitGenreMatches.length > 0) {
    score += explicitGenreMatches.length * 15
    reasons.push('Matches your selected genres')
  }

  // Novelty bonus (hasn't watched yet: 10 points)
  if (!profile.viewedSessions.includes(session.id)) {
    score += 10
    reasons.push('New session for you')
  }

  // Popularity factor (normalized, max 10 points)
  const maxViews = Math.max(...allSessions.map((s) => s.views))
  score += (session.views / maxViews) * 10

  return { session, score, reasons }
}

/**
 * Score a DJ based on user profile
 */
export function scoreDJ(
  dj: DJ,
  profile: UserProfile,
  sessions: Session[]
): DJScore {
  let score = 0
  const reasons: string[] = []

  const genreAffinity = calculateGenreAffinity(sessions, profile.viewedSessions)

  // Genre matching (max 40 points)
  let genreScore = 0
  dj.genres.forEach((genre) => {
    const affinity = genreAffinity.get(genre) ?? 0
    genreScore += affinity * 20
  })
  if (genreScore > 0) {
    score += Math.min(genreScore, 40)
    reasons.push('Plays genres you enjoy')
  }

  // Explicit genre preference match (20 points per match)
  const explicitMatches = dj.genres.filter((g) =>
    profile.favoriteGenres.includes(g)
  )
  if (explicitMatches.length > 0) {
    score += explicitMatches.length * 20
    reasons.push('Matches your selected genres')
  }

  // Content availability (max 15 points)
  const djSessions = sessions.filter((s) => s.djId === dj.id)
  score += Math.min(djSessions.length * 3, 15)
  if (djSessions.length > 0) {
    reasons.push(`${djSessions.length} session${djSessions.length > 1 ? 's' : ''} available`)
  }

  // Featured bonus (10 points)
  if (dj.featured) {
    score += 10
    reasons.push('Featured artist')
  }

  // Novelty (not already favorite: 5 points)
  if (!profile.favoriteDJs.includes(dj.id)) {
    score += 5
    reasons.push('New artist to discover')
  }

  return { dj, score, reasons }
}

/**
 * Get top recommended sessions
 */
export function getTopSessionRecommendations(
  sessions: Session[],
  profile: UserProfile,
  limit = 6
): SessionScore[] {
  const scored = sessions.map((session) =>
    scoreSession(session, profile, sessions)
  )

  return scored
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
}

/**
 * Get top recommended DJs
 */
export function getTopDJRecommendations(
  djs: DJ[],
  sessions: Session[],
  profile: UserProfile,
  limit = 4
): DJScore[] {
  const scored = djs.map((dj) => scoreDJ(dj, profile, sessions))

  return scored
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
}

/**
 * Calculate content diversity score for recommendations
 */
export function calculateDiversity(sessions: Session[]): number {
  if (sessions.length === 0) return 0

  const genres = new Set<string>()
  const djs = new Set<string>()
  const series = new Set<string>()

  sessions.forEach((session) => {
    session.genres.forEach((g) => genres.add(g))
    djs.add(session.djId)
    series.add(session.series)
  })

  // Normalize diversity score (0-1)
  const genreDiversity = genres.size / sessions.length
  const djDiversity = djs.size / sessions.length
  const seriesDiversity = series.size / Math.min(sessions.length, 3)

  return (genreDiversity + djDiversity + seriesDiversity) / 3
}

/**
 * Balance recommendations for diversity
 */
export function diversifyRecommendations(
  scored: SessionScore[],
  targetDiversity = 0.5,
  limit = 6
): SessionScore[] {
  if (scored.length <= limit) return scored

  const result: SessionScore[] = []
  const usedDJs = new Set<string>()
  const usedSeries = new Set<string>()

  // Sort by score descending
  const sorted = [...scored].sort((a, b) => b.score - a.score)

  for (const item of sorted) {
    if (result.length >= limit) break

    // Check diversity constraints
    const djUsed = usedDJs.has(item.session.djId)
    const seriesUsed = usedSeries.has(item.session.series)

    // Allow if not too repetitive or if we need items
    if (!djUsed || !seriesUsed || result.length < limit / 2) {
      result.push(item)
      usedDJs.add(item.session.djId)
      usedSeries.add(item.session.series)
    }
  }

  // Fill remaining slots with highest scored items
  while (result.length < limit && result.length < scored.length) {
    const remaining = sorted.find(
      (item) => !result.some((r) => r.session.id === item.session.id)
    )
    if (remaining) {
      result.push(remaining)
    } else {
      break
    }
  }

  return result
}
