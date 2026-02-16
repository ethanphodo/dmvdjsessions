const series = [
  {
    id: '01',
    name: 'Studio Sessions',
    location: 'Washington DC',
    description: 'Intimate loft recordings with warm, amber lighting',
    status: 'ACTIVE',
    statusColor: '#E21D1D',
    accentColor: 'amber', // Amber/Gold for Studio Sessions
  },
  {
    id: '02',
    name: 'Warehouse Sessions',
    location: 'Maryland',
    description: 'Raw industrial spaces with electric energy',
    status: 'PLANNED',
    statusColor: '#888',
    accentColor: 'blue', // Electric Blue for Warehouse
  },
  {
    id: '03',
    name: 'Rooftop Sessions',
    location: 'Virginia',
    description: 'Golden hour sets with stunning city views',
    status: 'PLANNED',
    statusColor: '#888',
    accentColor: 'orange', // High-Vis Orange
  },
]

function SeriesPreview() {
  return (
    <section id="sessions" className="bg-[#050505]">
      {/* Double Line Divider */}
      <div className="syber-divider" />

      <div className="max-w-7xl mx-auto px-6 py-24">
        {/* Section Label */}
        <div className="font-mono text-xs uppercase tracking-tight text-[#888] mb-8">
          [ 03 ] SESSIONS
        </div>

        {/* Series Grid */}
        <div className="grid md:grid-cols-3 gap-6">
          {series.map((item) => (
            <div
              key={item.id}
              className="group border border-[#1A1A1A] bg-[#0A0A0A] hover:border-[#E21D1D] hover:shadow-[4px_4px_0_0_#E21D1D] transition-all duration-75 cursor-cross"
            >
              {/* Card Header */}
              <div className="border-b border-[#1A1A1A] px-4 py-3 flex items-center justify-between">
                <span className="font-mono text-xs uppercase tracking-tight text-white">
                  [ {item.id} ] {item.name.split(' ')[0].toUpperCase()}
                </span>
                <div className="flex items-center gap-2">
                  <span
                    className="w-2 h-2"
                    style={{ backgroundColor: item.statusColor }}
                  />
                  <span className="font-mono text-xs uppercase text-[#888]">{item.status}</span>
                </div>
              </div>

              {/* Placeholder Image Area */}
              <div className="aspect-[4/3] bg-[#1A1A1A] border-b border-[#1A1A1A] flex items-center justify-center">
                <span className="font-mono text-xs text-[#888] uppercase">
                  PREVIEW_IMG
                </span>
              </div>

              {/* Card Content */}
              <div className="p-4">
                <h3 className="text-lg font-black uppercase tracking-tighter mb-1 text-white">
                  {item.name}
                </h3>
                <div className="font-mono text-xs text-[#888] uppercase mb-3">
                  {item.location}
                </div>
                <p className="text-sm text-[#888]">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default SeriesPreview
