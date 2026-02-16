import { Link } from 'react-router-dom'

export default function WatchPage() {
  return (
    <div className="min-h-screen bg-black pt-24 md:pt-20">
      <div className="max-w-5xl mx-auto px-6 section-padding">
        {/* Centered launch state */}
        <div className="text-center">
          <h1 className="text-sm font-medium uppercase tracking-wide text-[#666] mb-6 animate-fade-in">
            Session Archive
          </h1>

          <p
            className="text-responsive-3xl font-bold uppercase tracking-tight mb-8 animate-fade-in"
            style={{ animationDelay: '0.1s' }}
          >
            Launching Soon.
          </p>

          <p
            className="text-[#888] text-lg max-w-sm mx-auto mb-12 animate-fade-in"
            style={{ animationDelay: '0.2s' }}
          >
            First drops coming soon.<br />
            Follow for updates.
          </p>

          {/* Social Links */}
          <div
            className="flex items-center justify-center gap-6 animate-fade-in"
            style={{ animationDelay: '0.3s' }}
          >
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

      <div className="divider" />

      {/* Series indicator */}
      <div className="max-w-5xl mx-auto px-6 section-padding">
        <h2 className="text-sm font-medium uppercase tracking-wide text-[#666] mb-8">
          Coming Series
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="group hover-lift p-6 border border-[#1A1A1A] hover:border-[#333] transition-colors">
            <div className="w-12 h-1 bg-[#D6A756] mb-4 group-hover:w-16 transition-all duration-300" />
            <span className="text-white font-medium">Studio Sessions</span>
            <p className="text-sm text-[#666] mt-1">Pure performance</p>
          </div>
          <div className="group hover-lift p-6 border border-[#1A1A1A] hover:border-[#333] transition-colors">
            <div className="w-12 h-1 bg-[#8B1E2D] mb-4 group-hover:w-16 transition-all duration-300" />
            <span className="text-white font-medium">Warehouse Series</span>
            <p className="text-sm text-[#666] mt-1">Harder sounds</p>
          </div>
          <div className="group hover-lift p-6 border border-[#1A1A1A] hover:border-[#333] transition-colors">
            <div className="w-12 h-1 bg-[#7FAFD4] mb-4 group-hover:w-16 transition-all duration-300" />
            <span className="text-white font-medium">Rooftop Series</span>
            <p className="text-sm text-[#666] mt-1">Open air vibes</p>
          </div>
        </div>
      </div>
    </div>
  )
}
