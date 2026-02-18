/**
 * JSON-LD Schema component for structured data
 * Supports MusicEvent, Organization, VideoObject, and more
 */

import type { Event, Session } from '../types'

export interface JsonLdSchemaType {
  '@context': string
  '@type': string
  [key: string]: unknown
}

// Organization schema for DMV DJ Sessions
export const organizationSchema: JsonLdSchemaType = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'DMV DJ Sessions',
  alternateName: 'DMVDJS',
  url: 'https://dmvdjsessions.com',
  logo: 'https://dmvdjsessions.com/logo.svg',
  description: 'Curated DJ sessions showcasing emerging talent from Washington DC, Maryland, and Virginia.',
  foundingDate: '2024',
  areaServed: {
    '@type': 'GeoCircle',
    geoMidpoint: {
      '@type': 'GeoCoordinates',
      latitude: 38.9072,
      longitude: -77.0369,
    },
    geoRadius: '50 mi',
  },
  sameAs: [
    'https://instagram.com/dmvdjsessions',
    'https://youtube.com/@dmvdjsessions',
  ],
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'customer service',
    email: 'hello@dmvdjsessions.com',
  },
}

// Website schema for homepage
export const websiteSchema: JsonLdSchemaType = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'DMV DJ Sessions',
  url: 'https://dmvdjsessions.com',
  description: 'Curated DJ sessions showcasing emerging talent from Washington DC, Maryland, and Virginia.',
  potentialAction: {
    '@type': 'SearchAction',
    target: {
      '@type': 'EntryPoint',
      urlTemplate: 'https://dmvdjsessions.com/sessions?search={search_term_string}',
    },
    'query-input': 'required name=search_term_string',
  },
}

// Helper to convert time string to 24h format
function convertTime(timeStr: string): string {
  if (!timeStr) return '19:00:00'

  const parts = timeStr.split(' ')
  const time = parts[0] ?? '19:00'
  const period = parts[1]
  const timeParts = time.split(':')
  let hours = parseInt(timeParts[0] ?? '19', 10)
  const minutes = timeParts[1] ?? '00'

  if (period?.toLowerCase() === 'pm' && hours !== 12) {
    hours += 12
  } else if (period?.toLowerCase() === 'am' && hours === 12) {
    hours = 0
  }

  return `${hours.toString().padStart(2, '0')}:${minutes}:00`
}

// Helper to extract city from address
function getCity(address: string): string {
  if (!address) return 'Washington'
  const parts = address.split(',')
  return parts[0]?.trim() ?? 'Washington'
}

// Helper to extract state from address
function getState(address: string): string {
  if (!address) return 'DC'
  if (address.includes('DC')) return 'DC'
  if (address.includes('MD')) return 'MD'
  if (address.includes('VA')) return 'VA'
  return 'DC'
}

// Generate MusicEvent schema from event data
export function generateEventSchema(event: Event): JsonLdSchemaType {
  const eventDate = new Date(`${event.date}T${convertTime(event.time)}`)

  return {
    '@context': 'https://schema.org',
    '@type': 'MusicEvent',
    name: event.title,
    description: event.description,
    startDate: eventDate.toISOString(),
    eventStatus: event.status === 'upcoming'
      ? 'https://schema.org/EventScheduled'
      : 'https://schema.org/EventCompleted',
    eventAttendanceMode: event.location === 'Online'
      ? 'https://schema.org/OnlineEventAttendanceMode'
      : 'https://schema.org/OfflineEventAttendanceMode',
    location: event.location === 'Online'
      ? {
          '@type': 'VirtualLocation',
          url: 'https://youtube.com/@dmvdjsessions',
        }
      : {
          '@type': 'Place',
          name: event.location,
          address: {
            '@type': 'PostalAddress',
            addressLocality: getCity(event.address),
            addressRegion: getState(event.address),
            addressCountry: 'US',
          },
        },
    organizer: {
      '@type': 'Organization',
      name: 'DMV DJ Sessions',
      url: 'https://dmvdjsessions.com',
    },
    offers: event.ticketUrl
      ? {
          '@type': 'Offer',
          url: event.ticketUrl,
          availability: 'https://schema.org/InStock',
          priceCurrency: 'USD',
        }
      : undefined,
    maximumAttendeeCapacity: event.capacity,
    isAccessibleForFree: !event.ticketUrl,
  }
}

interface VideoSchemaInput extends Partial<Session> {
  youtubeUrl?: string
}

// Generate VideoObject schema for DJ sessions
export function generateVideoSchema(video: VideoSchemaInput): JsonLdSchemaType {
  const durationMinutes = video.duration?.split(':')[0] ?? '60'

  return {
    '@context': 'https://schema.org',
    '@type': 'VideoObject',
    name: video.title,
    description: video.description,
    thumbnailUrl: video.thumbnail ? `https://dmvdjsessions.com${video.thumbnail}` : undefined,
    uploadDate: video.date,
    duration: `PT${durationMinutes}M`,
    contentUrl: video.youtubeUrl ?? video.embedUrl,
    embedUrl: video.embedUrl,
    creator: {
      '@type': 'Person',
      name: video.djName,
    },
    publisher: {
      '@type': 'Organization',
      name: 'DMV DJ Sessions',
      logo: {
        '@type': 'ImageObject',
        url: 'https://dmvdjsessions.com/logo.svg',
      },
    },
    interactionStatistic: video.views
      ? {
          '@type': 'InteractionCounter',
          interactionType: 'https://schema.org/WatchAction',
          userInteractionCount: video.views,
        }
      : undefined,
  }
}

// Generate BreadcrumbList schema
export function generateBreadcrumbSchema(
  items: Array<{ name: string; url?: string }>
): JsonLdSchemaType {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url ? `https://dmvdjsessions.com${item.url}` : undefined,
    })),
  }
}

// Generate ItemList schema for session collections
export function generateSessionListSchema(
  sessions: Session[],
  listName: string
): JsonLdSchemaType {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: listName,
    numberOfItems: sessions.length,
    itemListElement: sessions.map((session, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': 'VideoObject',
        name: session.title,
        description: session.description,
        url: `https://dmvdjsessions.com/sessions/${session.id}`,
        thumbnailUrl: session.thumbnail ? `https://dmvdjsessions.com${session.thumbnail}` : undefined,
      },
    })),
  }
}

interface JsonLdSchemaProps {
  schema: JsonLdSchemaType | JsonLdSchemaType[] | null
}

// Component to inject JSON-LD into page head
function JsonLdSchema({ schema }: JsonLdSchemaProps) {
  if (!schema) return null

  const schemaArray = Array.isArray(schema) ? schema : [schema]

  return (
    <>
      {schemaArray.map((s, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(s, null, 0),
          }}
        />
      ))}
    </>
  )
}

export default JsonLdSchema
