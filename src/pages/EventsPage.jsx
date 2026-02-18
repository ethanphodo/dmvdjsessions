import { useState, useMemo } from 'react'
import PageTitle from '../components/layout/PageTitle'
import SEO from '../components/SEO'
import EventCard from '../components/events/EventCard'
import NewsletterSignup from '../components/ui/NewsletterSignup'
import { getUpcomingEvents, getPastEvents } from '../data/events'
import { generateEventSchema } from '../components/JsonLdSchema'

export default function EventsPage() {
  const [filter, setFilter] = useState('upcoming')

  const upcomingEvents = getUpcomingEvents()
  const pastEvents = getPastEvents()
  const displayEvents = filter === 'upcoming' ? upcomingEvents : pastEvents

  // Generate JSON-LD schemas for all upcoming events
  const eventSchemas = useMemo(() => {
    return upcomingEvents.map(event => generateEventSchema(event))
  }, [upcomingEvents])

  return (
    <div className="min-h-screen bg-black pt-28">
      <SEO
        title="Events | DMV DJ Sessions"
        description="Live recordings, premieres, and exclusive DJ events across Washington DC, Maryland, and Virginia. Limited capacity, curated experiences."
        keywords="DJ events, DMV events, Washington DC DJ, Maryland DJ, Virginia DJ, house music events, techno events, live DJ sessions"
        schema={eventSchemas}
      />
      <div className="container-main">
        <PageTitle title="EVENTS" />

        {/* Intro */}
        <p className="text-center text-[#888] text-lg mb-16 animate-fade-in">
          Live recordings, premieres, and exclusive events across the DMV.
          <br />
          Limited capacity. Curated experiences.
        </p>

        {/* Filter Tabs */}
        <div className="flex items-center justify-center gap-4 mb-16">
          <button
            onClick={() => setFilter('upcoming')}
            className={`px-6 py-3 text-sm font-medium uppercase tracking-wide transition-all ${
              filter === 'upcoming'
                ? 'bg-white text-black'
                : 'border border-[#333] text-[#888] hover:border-white hover:text-white'
            }`}
          >
            Upcoming ({upcomingEvents.length})
          </button>
          <button
            onClick={() => setFilter('past')}
            className={`px-6 py-3 text-sm font-medium uppercase tracking-wide transition-all ${
              filter === 'past'
                ? 'bg-white text-black'
                : 'border border-[#333] text-[#888] hover:border-white hover:text-white'
            }`}
          >
            Past ({pastEvents.length})
          </button>
        </div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16 animate-fade-in">
          {displayEvents.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>

        {displayEvents.length === 0 && (
          <div className="text-center py-16">
            <p className="text-[#666] text-lg">
              {filter === 'upcoming'
                ? 'No upcoming events scheduled yet.'
                : 'No past events to show.'}
            </p>
          </div>
        )}

        <div className="divider" />

        {/* Newsletter CTA */}
        <div className="section-padding">
          <div className="container-narrow text-center">
            <h2 className="text-sm font-medium uppercase tracking-wide text-[#666] mb-6">
              Stay in the Loop
            </h2>
            <p className="text-responsive-xl font-bold uppercase tracking-tight mb-4">
              Never Miss an Event
            </p>
            <p className="text-[#888] text-lg mb-8">
              Get early access to tickets and exclusive invites.
            </p>
            <NewsletterSignup />
          </div>
        </div>
      </div>
    </div>
  )
}
