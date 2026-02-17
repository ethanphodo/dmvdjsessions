import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import BottomNav from './components/layout/BottomNav'
import EventPopup from './components/ui/EventPopup'
import { ToastProvider } from './components/ui/Toast'
import AmbientBackground from './components/ui/AmbientBackground'
import HomePage from './pages/HomePage'
import WatchPage from './pages/WatchPage'
import EventsPage from './pages/EventsPage'
import ApplyPage from './pages/ApplyPage'
import AboutPage from './pages/AboutPage'
import PartnersPage from './pages/PartnersPage'
import NotFoundPage from './pages/NotFoundPage'

function App() {
  return (
    <BrowserRouter>
      <ToastProvider>
        <div className="min-h-screen bg-black">
          {/* Skip to content link for accessibility */}
          <a href="#main-content" className="skip-link">
            Skip to content
          </a>
          {/* Audio-Reactive Ambient Background */}
          <AmbientBackground />
          <Navbar />
          <main id="main-content">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/sessions" element={<WatchPage />} />
              <Route path="/events" element={<EventsPage />} />
              <Route path="/submit" element={<ApplyPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/partners" element={<PartnersPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </main>
          <Footer />
          {/* Mobile Bottom Navigation */}
          <BottomNav />
          <EventPopup delay={30000} />
        </div>
      </ToastProvider>
    </BrowserRouter>
  )
}

export default App
