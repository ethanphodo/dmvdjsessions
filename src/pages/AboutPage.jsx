import { Link } from 'react-router-dom'
import PageHeader from '../components/layout/PageHeader'
import { getUpcomingEvents, getPastEvents } from '../data/events'
import { djs } from '../data/djs'
import EventList from '../components/events/EventList'
import DJGrid from '../components/dj/DJGrid'
import Button from '../components/ui/Button'

export default function AboutPage() {
  const upcomingEvents = getUpcomingEvents()
  const pastEvents = getPastEvents()

  return (
    <div className="min-h-screen bg-[#050505] pt-12">
      <div className="max-w-7xl mx-auto px-6">
        <PageHeader
          sectionNumber="01"
          sectionLabel="ABOUT"
          title="The Story"
          subtitle="We're building something different for the DMV's house music community."
        />

        {/* Story Section */}
        <section className="pb-24">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Origin */}
            <div className="border border-[#1A1A1A] bg-[#0A0A0A] p-8">
              <div className="font-mono text-xs uppercase tracking-tight text-[#888] mb-6">
                ORIGIN
              </div>
              <h3 className="text-2xl font-black uppercase tracking-tighter mb-4 text-white italic">
                Born in DC
              </h3>
              <div className="space-y-4 text-sm text-[#888] leading-relaxed">
                <p>
                  DMV DJ Sessions started in 2024 with a simple idea: create a platform
                  that showcases the incredible house music talent across Washington DC,
                  Maryland, and Virginia.
                </p>
                <p>
                  Too often, local DJs don't get the recognition they deserve. We wanted
                  to change that by providing professional-quality recordings in intimate
                  settings that let the music speak for itself.
                </p>
              </div>
            </div>

            {/* Mission */}
            <div className="border border-[#1A1A1A] bg-[#0A0A0A] p-8">
              <div className="font-mono text-xs uppercase tracking-tight text-[#888] mb-6">
                MISSION
              </div>
              <h3 className="text-2xl font-black uppercase tracking-tighter mb-4 text-white italic">
                Real Sessions
              </h3>
              <div className="space-y-4 text-sm text-[#888] leading-relaxed">
                <p>
                  No gimmicks. No drama. Just great DJs playing great music. Each session
                  features one artist, one hour, and one uninterrupted journey.
                </p>
                <p>
                  We handle the production so DJs can focus on what they do best: playing
                  music. The result is raw, authentic content that captures the essence
                  of the DMV underground.
                </p>
              </div>
            </div>
          </div>

          {/* Values */}
          <div className="grid md:grid-cols-3 gap-6 mt-8">
            <div className="border border-[#1A1A1A] bg-[#0A0A0A] p-6 text-center">
              <div className="text-3xl font-black text-[#E21D1D] mb-2">01</div>
              <h4 className="font-mono text-xs uppercase tracking-tight text-white mb-2">
                Authenticity
              </h4>
              <p className="text-xs text-[#888]">
                Raw, unfiltered sets that showcase real talent
              </p>
            </div>
            <div className="border border-[#1A1A1A] bg-[#0A0A0A] p-6 text-center">
              <div className="text-3xl font-black text-[#E21D1D] mb-2">02</div>
              <h4 className="font-mono text-xs uppercase tracking-tight text-white mb-2">
                Community
              </h4>
              <p className="text-xs text-[#888]">
                Building connections across the DMV scene
              </p>
            </div>
            <div className="border border-[#1A1A1A] bg-[#0A0A0A] p-6 text-center">
              <div className="text-3xl font-black text-[#E21D1D] mb-2">03</div>
              <h4 className="font-mono text-xs uppercase tracking-tight text-white mb-2">
                Quality
              </h4>
              <p className="text-xs text-[#888]">
                Professional production, every time
              </p>
            </div>
          </div>
        </section>

        {/* DJs Section */}
        <section className="pb-24">
          <div className="syber-divider mb-8" />
          <div className="font-mono text-xs uppercase tracking-tight text-[#888] mb-8">
            [ 02 ] THE ROSTER
          </div>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
            <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tighter text-white italic">
              Featured DJs
            </h2>
            <Button to="/apply" variant="secondary">
              Join The Roster →
            </Button>
          </div>
          <DJGrid djs={djs.slice(0, 6)} columns={3} />
        </section>

        {/* Events Section */}
        <section className="pb-24">
          <div className="syber-divider mb-8" />
          <div className="font-mono text-xs uppercase tracking-tight text-[#888] mb-8">
            [ 03 ] EVENTS
          </div>

          {/* Upcoming */}
          <div className="mb-12">
            <h2 className="text-2xl font-black uppercase tracking-tighter text-white italic mb-6">
              Upcoming Events
            </h2>
            <EventList
              events={upcomingEvents}
              emptyMessage="No upcoming events. Follow us for announcements."
            />
          </div>

          {/* Past */}
          {pastEvents.length > 0 && (
            <div>
              <h2 className="text-2xl font-black uppercase tracking-tighter text-[#888] italic mb-6">
                Past Events
              </h2>
              <EventList events={pastEvents} />
            </div>
          )}
        </section>

        {/* Contact Section */}
        <section className="pb-24">
          <div className="syber-divider mb-8" />
          <div className="font-mono text-xs uppercase tracking-tight text-[#888] mb-8">
            [ 04 ] CONTACT
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="border border-[#1A1A1A] bg-[#0A0A0A] p-8">
              <h3 className="text-xl font-black uppercase tracking-tighter mb-4 text-white">
                General Inquiries
              </h3>
              <p className="text-sm text-[#888] mb-4">
                Questions, feedback, or just want to say hi?
              </p>
              <a
                href="mailto:hello@dmvdjsessions.com"
                className="font-mono text-sm text-white hover:text-[#E21D1D] transition-colors"
              >
                → hello@dmvdjsessions.com
              </a>
            </div>
            <div className="border border-[#1A1A1A] bg-[#0A0A0A] p-8">
              <h3 className="text-xl font-black uppercase tracking-tighter mb-4 text-white">
                Partnerships
              </h3>
              <p className="text-sm text-[#888] mb-4">
                Venues, sponsors, and media inquiries.
              </p>
              <Link
                to="/partners"
                className="font-mono text-sm text-white hover:text-[#E21D1D] transition-colors"
              >
                → Submit Partnership Inquiry
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
