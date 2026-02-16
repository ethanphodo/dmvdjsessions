import Hero from '../components/Hero'
import About from '../components/About'
import SeriesPreview from '../components/SeriesPreview'
import ApplyCTA from '../components/ApplyCTA'
import FeaturedDJ from '../components/sections/FeaturedDJ'
import HowItWorks from '../components/sections/HowItWorks'
import UpcomingEvents from '../components/sections/UpcomingEvents'
import NewsletterForm from '../components/forms/NewsletterForm'

export default function HomePage() {
  return (
    <>
      <Hero />
      <About />
      <SeriesPreview />
      <FeaturedDJ />
      <HowItWorks />
      <UpcomingEvents />
      <ApplyCTA />

      {/* Newsletter Section */}
      <section className="bg-[#050505]">
        <div className="syber-divider" />
        <div className="max-w-7xl mx-auto px-6 py-24">
          <div className="max-w-xl mx-auto">
            <NewsletterForm />
          </div>
        </div>
      </section>
    </>
  )
}
