/**
 * DJ Types
 * Represents a DJ/artist in the DMV DJ Sessions platform
 */

import type { Genre } from './session'

export type Location = 'dc' | 'md' | 'va'

export type DJStatus = 'active' | 'inactive'

export interface DJSocials {
  instagram?: string
  soundcloud?: string
  mixcloud?: string
  spotify?: string
  twitter?: string
  website?: string
}

export interface DJ {
  id: string
  name: string
  slug: string
  bio: string
  image: string
  genres: Genre[]
  location: Location
  socials: DJSocials
  featured: boolean
  status: DJStatus
}

export interface DJFilters {
  genre?: Genre
  location?: Location
  featured?: boolean
  status?: DJStatus
}

export interface DJWithSessions extends DJ {
  sessions: import('./session').Session[]
  sessionCount: number
  totalViews: number
}
