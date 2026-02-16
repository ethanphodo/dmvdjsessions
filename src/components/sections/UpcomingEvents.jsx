import { Link } from 'react-router-dom'
import { getUpcomingEvents } from '../../data/events'
import EventList from '../events/EventList'
import Button from '../ui/Button'

export default function UpcomingEvents() {
  const upcomingEvents = getUpcomingEvents().slice(0, 2)

  return (
    <section className="bg-[#050505]">
      <div className="syber-divider" />
      <div className="max-w-7xl mx-auto px-6 py-24">
        <div className="font-mono text-xs uppercase tracking-tight text-[#888] mb-8">
          [ 07 ] EVENTS
        </div>

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
          <div>
            <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tighter leading-tight text-white italic">
              Upcoming
              <br />
              Events
            </h2>
          </div>
          <p className="text-sm text-[#888] max-w-md">
            Catch a live recording, attend a premiere, or experience our sessions
            in person across the DMV.
          </p>
        </div>

        {upcomingEvents.length > 0 ? (
          <EventList events={upcomingEvents} />
        ) : (
          <div className="border border-[#1A1A1A] bg-[#0A0A0A] p-12 text-center">
            <p className="font-mono text-sm text-[#888] uppercase mb-4">
              No upcoming events scheduled.
            </p>
            <p className="text-sm text-[#888]">
              Follow us on social media for announcements.
            </p>
          </div>
        )}

        <div className="mt-8 flex justify-center">
          <Button to="/about" variant="secondary">
            View All Events →
          </Button>
        </div>
      </div>
    </section>
  )
}
