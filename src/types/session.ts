/**
 * Video/Session Types
 * Represents a DJ session video in the DMV DJ Sessions platform
 */

export type Genre =
  | 'house'
  | 'deep-house'
  | 'tech-house'
  | 'afro-house'
  | 'afrobeats'
  | 'amapiano'
  | 'techno'
  | 'minimal'
  | 'disco'
  | 'progressive'
  | 'melodic'

export type Mood =
  | 'chill'
  | 'groovy'
  | 'energetic'
  | 'uplifting'
  | 'dark'
  | 'melodic'

export type SeriesType = 'studio' | 'warehouse' | 'rooftop'

export type EmbedType = 'youtube' | 'vimeo'

export interface Session {
  id: string
  title: string
  djId: string
  djName: string
  date: string // ISO date string YYYY-MM-DD
  duration: string // Format: "MM:SS"
  genres: Genre[]
  series: SeriesType
  mood: Mood[]
  thumbnail: string
  embedUrl: string
  embedType: EmbedType
  views: number
  description: string
}

export interface SessionWithScore extends Session {
  score: number
}

export interface SessionFilters {
  genre?: Genre
  series?: SeriesType
  mood?: Mood
  search?: string
  limit?: number
}

export interface SessionStats {
  sessions: number
  totalMinutes: number
  totalHours: number
  artistCount: number
  seriesCount: number
}

export interface VideoChapter {
  id: string
  videoId: string
  title: string
  startTime: number // seconds
  endTime: number // seconds
  description?: string
}
