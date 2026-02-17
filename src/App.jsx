import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import BottomNav from './components/layout/BottomNav'
import EventPopup from './components/ui/EventPopup'
import AmbientBackground from './components/ui/AmbientBackground'
import HomePage from './pages/HomePage'
import WatchPage from './pages/WatchPage'
import EventsPage from './pages/EventsPage'
import ApplyPage from './pages/ApplyPage'
import AboutPage from './pages/AboutPage'

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-black">
        {/* Audio-Reactive Ambient Background */}
        <AmbientBackground />
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/sessions" element={<WatchPage />} />
            <Route path="/events" element={<EventsPage />} />
            <Route path="/submit" element={<ApplyPage />} />
            <Route path="/about" element={<AboutPage />} />
          </Routes>
        </main>
        <Footer />
        {/* Mobile Bottom Navigation */}
        <BottomNav />
        <EventPopup delay={30000} />
      </div>
    </BrowserRouter>
  )
}

export default App
