import EventCard from './EventCard'

export default function EventList({
  events,
  emptyMessage = 'No events scheduled.',
  columns = 2,
}) {
  if (events.length === 0) {
    return (
      <div className="border border-[#1A1A1A] bg-[#0A0A0A] p-12 text-center">
        <p className="font-mono text-sm text-[#888] uppercase">
          {emptyMessage}
        </p>
      </div>
    )
  }

  const gridCols = {
    1: 'grid-cols-1',
    2: 'md:grid-cols-2',
    3: 'md:grid-cols-2 lg:grid-cols-3',
  }

  return (
    <div className={`grid gap-6 ${gridCols[columns] || gridCols[2]}`}>
      {events.map((event) => (
        <EventCard key={event.id} event={event} />
      ))}
    </div>
  )
}
