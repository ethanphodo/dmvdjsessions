import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { lazy, Suspense } from 'react'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import BottomNav from './components/layout/BottomNav'
import EventPopup from './components/ui/EventPopup'
import CookieConsent from './components/ui/CookieConsent'
import { ToastProvider } from './components/ui/Toast'
import { ThemeProvider } from './contexts/ThemeContext'
import AmbientBackground from './components/ui/AmbientBackground'
import { usePageTracking } from './hooks/useAnalytics'
import Skeleton from './components/ui/Skeleton'

// Lazy load pages for code splitting
const HomePage = lazy(() => import('./pages/HomePage'))
const WatchPage = lazy(() => import('./pages/WatchPage'))
const EventsPage = lazy(() => import('./pages/EventsPage'))
const ApplyPage = lazy(() => import('./pages/ApplyPage'))
const AboutPage = lazy(() => import('./pages/AboutPage'))
const PartnersPage = lazy(() => import('./pages/PartnersPage'))
const DJProfilePage = lazy(() => import('./pages/DJProfilePage'))
const SessionDetailPage = lazy(() => import('./pages/SessionDetailPage'))
const PrivacyPage = lazy(() => import('./pages/PrivacyPage'))
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'))

// Loading fallback component
function PageLoader() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="space-y-4 w-full max-w-md px-4">
        <Skeleton className="h-8 w-3/4" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-5/6" />
        <Skeleton className="h-64 w-full" />
      </div>
    </div>
  )
}

// Wrapper component to use hooks that require router context
function AppContent() {
  // Track page views on route changes
  usePageTracking()

  return (
    <div className="min-h-screen bg-black">
      {/* Skip to content link for accessibility */}
      <a href="#main-content" className="skip-link">
        Skip to content
      </a>
      {/* Audio-Reactive Ambient Background */}
      <AmbientBackground />
      <Navbar />
      <main id="main-content">
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/sessions" element={<WatchPage />} />
            <Route path="/sessions/:id" element={<SessionDetailPage />} />
            <Route path="/dj/:slug" element={<DJProfilePage />} />
            <Route path="/events" element={<EventsPage />} />
            <Route path="/submit" element={<ApplyPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/partners" element={<PartnersPage />} />
            <Route path="/privacy" element={<PrivacyPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Suspense>
      </main>
      <Footer />
      {/* Mobile Bottom Navigation */}
      <BottomNav />
      <EventPopup delay={30000} />
      <CookieConsent />
    </div>
  )
}

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider defaultTheme="dark">
        <ToastProvider>
          <AppContent />
        </ToastProvider>
      </ThemeProvider>
    </BrowserRouter>
  )
}

export default App
