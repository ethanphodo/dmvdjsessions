/**
 * Event Types
 * Represents events in the DMV DJ Sessions platform
 */

export type EventStatus = 'upcoming' | 'past' | 'cancelled'

export type EventType = 'recording' | 'live' | 'premiere' | 'meetup'

export interface Event {
  id: string
  title: string
  date: string // ISO date string YYYY-MM-DD
  time: string // Format: "HH:MM AM/PM"
  location: string
  address: string
  lineup: string[] // Array of DJ IDs
  ticketUrl: string | null
  status: EventStatus
  type: EventType
  description: string
  capacity?: number
  imageUrl?: string
}

export interface EventFilters {
  status?: EventStatus
  type?: EventType
  startDate?: string
  endDate?: string
}

export interface EventWithDJs extends Event {
  lineupDJs: import('./dj').DJ[]
}
