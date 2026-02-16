import { Link } from 'react-router-dom'
import Hero from '../components/Hero'
import { getLatestVideos } from '../data/videos'
import { getFeaturedDJs } from '../data/djs'
import VideoCard from '../components/video/VideoCard'

export default function HomePage() {
  const latestVideos = getLatestVideos(6)
  const featuredDJs = getFeaturedDJs()

  return (
    <>
      <Hero />

      {/* Latest Sessions */}
      <section className="bg-black py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-end justify-between mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-black text-white">
                Latest Sessions
              </h2>
              <p className="text-[#888] mt-2">Fresh from the studio</p>
            </div>
            <Link
              to="/watch"
              className="text-[#E21D1D] hover:text-white transition-colors text-sm font-medium"
            >
              View All →
            </Link>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {latestVideos.map((video) => (
              <Link key={video.id} to="/watch">
                <VideoCard video={video} />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured DJs */}
      <section className="bg-[#0A0A0A] py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-end justify-between mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-black text-white">
                The Roster
              </h2>
              <p className="text-[#888] mt-2">DMV's finest selectors</p>
            </div>
            <Link
              to="/about"
              className="text-[#E21D1D] hover:text-white transition-colors text-sm font-medium"
            >
              Meet All →
            </Link>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {featuredDJs.slice(0, 3).map((dj) => (
              <div key={dj.id} className="group card-hover">
                <div className="aspect-square bg-[#1A1A1A] overflow-hidden">
                  {dj.image ? (
                    <img
                      src={dj.image}
                      alt={dj.name}
                      className="w-full h-full object-cover opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-300"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <span className="text-[#333] text-4xl font-bold">
                        {dj.name.charAt(0)}
                      </span>
                    </div>
                  )}
                </div>
                <div className="pt-4">
                  <h3 className="text-lg font-bold text-white group-hover:text-[#E21D1D] transition-colors">
                    {dj.name}
                  </h3>
                  <p className="text-sm text-[#888] mt-1">
                    {dj.genres.join(' • ')}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-black py-32">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-black text-white mb-6">
            Ready to Play?
          </h2>
          <p className="text-xl text-[#888] max-w-lg mx-auto mb-10">
            Join Season 1. Submit your mix and become part of the DMV DJ Sessions roster.
          </p>
          <Link
            to="/apply"
            className="inline-flex items-center justify-center px-10 py-4 bg-[#E21D1D] text-white font-medium hover:bg-white hover:text-black transition-all duration-150"
          >
            Apply Now
          </Link>
        </div>
      </section>
    </>
  )
}
