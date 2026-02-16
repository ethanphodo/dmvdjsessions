import { formatDate } from '../../utils/helpers'
import { getDJById } from '../../data/djs'
import Badge from '../ui/Badge'
import Button from '../ui/Button'

export default function EventCard({ event, className = '' }) {
  const {
    title,
    date,
    time,
    location,
    address,
    lineup,
    ticketUrl,
    status,
    type,
    description,
    capacity,
  } = event

  const lineupDJs = lineup.map((id) => getDJById(id)).filter(Boolean)
  const isUpcoming = status === 'upcoming'

  return (
    <div
      className={`
        group border border-[#1A1A1A] bg-[#0A0A0A]
        ${isUpcoming ? 'hover:border-[#E21D1D] hover:shadow-[4px_4px_0_0_#E21D1D]' : ''}
        transition-all duration-75
        ${className}
      `}
    >
      {/* Header */}
      <div className="border-b border-[#1A1A1A] px-4 py-3 flex items-center justify-between">
        <span className="font-mono text-xs uppercase tracking-tight text-white">
          {type.toUpperCase()}
        </span>
        <Badge
          variant={isUpcoming ? 'active' : 'inactive'}
          dot
          dotColor={isUpcoming ? '#E21D1D' : '#888'}
          blink={isUpcoming}
        >
          {status.toUpperCase()}
        </Badge>
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Date */}
        <div className="flex items-center gap-4 mb-4">
          <div className="border border-[#1A1A1A] p-3 text-center min-w-[60px]">
            <div className="font-mono text-xs text-[#888] uppercase">
              {new Date(date).toLocaleDateString('en-US', { month: 'short' })}
            </div>
            <div className="text-2xl font-black text-white">
              {new Date(date).getDate()}
            </div>
          </div>
          <div>
            <h3 className="text-lg font-black uppercase tracking-tighter text-white group-hover:text-[#E21D1D] transition-colors">
              {title}
            </h3>
            <p className="font-mono text-xs text-[#888] uppercase">
              {time} • {location}
            </p>
          </div>
        </div>

        {/* Description */}
        {description && (
          <p className="text-sm text-[#888] leading-relaxed mb-4 line-clamp-2">
            {description}
          </p>
        )}

        {/* Lineup */}
        {lineupDJs.length > 0 && (
          <div className="mb-4">
            <div className="font-mono text-[10px] text-[#888] uppercase mb-2">
              LINEUP
            </div>
            <div className="flex flex-wrap gap-2">
              {lineupDJs.map((dj) => (
                <span
                  key={dj.id}
                  className="px-2 py-1 border border-[#1A1A1A] font-mono text-xs text-white uppercase"
                >
                  {dj.name}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Details */}
        <div className="flex items-center justify-between text-[10px] font-mono text-[#888] uppercase mb-4">
          <span>{address}</span>
          {capacity && <span>Capacity: {capacity}</span>}
        </div>

        {/* CTA */}
        {isUpcoming && ticketUrl && (
          <Button href={ticketUrl} variant="primary" size="sm">
            Get Tickets
          </Button>
        )}
      </div>
    </div>
  )
}
