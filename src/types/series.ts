/**
 * Series Types
 * Represents session series in the DMV DJ Sessions platform
 */

import type { SeriesType } from './session'

export type SeriesStatus = 'active' | 'planned' | 'archived'

export type AccentColor = 'amber' | 'blue' | 'orange' | 'red' | 'violet' | 'pink'

export interface Series {
  id: SeriesType
  name: string
  shortName: string
  location: string
  description: string
  longDescription: string
  status: SeriesStatus
  statusLabel: string
  statusColor: string
  accentColor: AccentColor
  episodeCount: number
  image: string
}

export interface SeriesFilters {
  status?: SeriesStatus
}

export interface SeriesWithSessions extends Series {
  sessions: import('./session').Session[]
  latestSession?: import('./session').Session
}
