import { Link } from 'react-router-dom'

export default function WatchPage() {
  return (
    <div className="min-h-screen bg-black pt-24 md:pt-20">
      <div className="max-w-5xl mx-auto px-6 py-24 md:py-32">
        {/* Centered launch state */}
        <div className="text-center">
          <h1 className="text-sm font-medium uppercase tracking-wide text-[#666] mb-6">
            Session Archive
          </h1>

          <p className="text-4xl md:text-5xl font-bold uppercase tracking-tight mb-8">
            Launching Soon.
          </p>

          <p className="text-[#888] max-w-sm mx-auto mb-12">
            First drops coming soon.<br />
            Follow for updates.
          </p>

          {/* Social Links */}
          <div className="flex items-center justify-center gap-6">
            <a
              href="https://instagram.com/dmvdjsessions"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#888] hover:text-white transition-colors"
            >
              <span className="text-sm font-medium uppercase tracking-wide">Instagram</span>
            </a>
            <span className="text-[#333]">·</span>
            <a
              href="https://youtube.com/@dmvdjsessions"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#888] hover:text-white transition-colors"
            >
              <span className="text-sm font-medium uppercase tracking-wide">YouTube</span>
            </a>
          </div>
        </div>
      </div>

      {/* Series indicator */}
      <div className="max-w-5xl mx-auto px-6 pb-24">
        <div className="border-t border-[#1A1A1A] pt-12">
          <h2 className="text-sm font-medium uppercase tracking-wide text-[#666] mb-8">
            Coming Series
          </h2>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-[#D6A756]" />
              <span className="text-sm text-[#888]">Studio Sessions</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-[#8B1E2D]" />
              <span className="text-sm text-[#888]">Warehouse Series</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-[#7FAFD4]" />
              <span className="text-sm text-[#888]">Rooftop Series</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
