import DJSpotlight from '../dj/DJSpotlight'

export default function FeaturedDJ() {
  return (
    <section className="bg-[#050505]">
      <div className="syber-divider" />
      <div className="max-w-7xl mx-auto px-6 py-24">
        <div className="font-mono text-xs uppercase tracking-tight text-[#888] mb-8">
          [ 05 ] FEATURED
        </div>
        <DJSpotlight />
      </div>
    </section>
  )
}
