/**
 * JSON-LD Schema component for structured data
 * Supports MusicEvent, Organization, and LocalBusiness schemas
 */

// Organization schema for DMV DJ Sessions
export const organizationSchema = {
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

// Generate MusicEvent schema from event data
export function generateEventSchema(event) {
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

// Generate VideoObject schema for DJ sessions
export function generateVideoSchema(video) {
  return {
    '@context': 'https://schema.org',
    '@type': 'VideoObject',
    name: video.title,
    description: video.description,
    thumbnailUrl: video.thumbnail,
    uploadDate: video.date,
    duration: video.duration ? `PT${video.duration}M` : undefined,
    contentUrl: video.youtubeUrl,
    embedUrl: video.youtubeUrl?.replace('watch?v=', 'embed/'),
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
  }
}

// Helper to convert time string to 24h format
function convertTime(timeStr) {
  if (!timeStr) return '19:00:00'

  const [time, period] = timeStr.split(' ')
  let [hours, minutes] = time.split(':')
  hours = parseInt(hours)

  if (period?.toLowerCase() === 'pm' && hours !== 12) {
    hours += 12
  } else if (period?.toLowerCase() === 'am' && hours === 12) {
    hours = 0
  }

  return `${hours.toString().padStart(2, '0')}:${minutes || '00'}:00`
}

// Helper to extract city from address
function getCity(address) {
  if (!address) return 'Washington'
  const parts = address.split(',')
  return parts[0]?.trim() || 'Washington'
}

// Helper to extract state from address
function getState(address) {
  if (!address) return 'DC'
  if (address.includes('DC')) return 'DC'
  if (address.includes('MD')) return 'MD'
  if (address.includes('VA')) return 'VA'
  return 'DC'
}

// Component to inject JSON-LD into page head
function JsonLdSchema({ schema }) {
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
