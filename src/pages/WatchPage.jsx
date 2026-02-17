import PageTitle from '../components/layout/PageTitle'
import SessionCard from '../components/sessions/SessionCard'

const COMING_SESSIONS = [
  {
    id: 1,
    title: 'Studio Sessions',
    djName: 'Various Artists',
    series: 'studio',
    status: 'Coming Soon',
  },
  {
    id: 2,
    title: 'Warehouse Series',
    djName: 'Various Artists',
    series: 'warehouse',
    status: 'Coming Soon',
  },
  {
    id: 3,
    title: 'Rooftop Series',
    djName: 'Various Artists',
    series: 'rooftop',
    status: 'Coming Soon',
  },
]

export default function WatchPage() {
  return (
    <div className="min-h-screen bg-black pt-28">
      <div className="container-main">
        <PageTitle title="SESSIONS" />

        {/* Session Grid */}
        <div className="session-grid pb-24">
          {COMING_SESSIONS.map((session) => (
            <SessionCard
              key={session.id}
              title={session.title}
              djName={session.djName}
              series={session.series}
              status={session.status}
            />
          ))}
        </div>
      </div>

      <div className="divider" />

      {/* Follow CTA */}
      <div className="container-main section-padding text-center">
        <p className="text-[#888] text-lg mb-8">
          First drops coming soon.<br />
          Follow for updates.
        </p>

        <div className="flex items-center justify-center gap-6">
          <a
            href="https://instagram.com/dmvdjsessions"
            target="_blank"
            rel="noopener noreferrer"
            className="link-hover text-[#888] hover:text-white transition-colors"
          >
            <span className="text-sm font-medium uppercase tracking-wide">Instagram</span>
          </a>
          <span className="text-[#333]">·</span>
          <a
            href="https://youtube.com/@dmvdjsessions"
            target="_blank"
            rel="noopener noreferrer"
            className="link-hover text-[#888] hover:text-white transition-colors"
          >
            <span className="text-sm font-medium uppercase tracking-wide">YouTube</span>
          </a>
        </div>
      </div>
    </div>
  )
}
