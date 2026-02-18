import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import ErrorBoundary from './components/ErrorBoundary.jsx'
import { initErrorTracking } from './utils/errorTracking'
import { registerServiceWorker, setupInstallPrompt } from './utils/pwa'

// Initialize error tracking (Sentry) before rendering
initErrorTracking()

// Register service worker for PWA support
registerServiceWorker({
  onSuccess: () => {
    console.log('[App] Content cached for offline use')
  },
  onUpdate: () => {
    console.log('[App] New content available - refresh to update')
  },
})

// Setup install prompt handler
setupInstallPrompt()

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ErrorBoundary name="App">
      <App />
    </ErrorBoundary>
  </StrictMode>,
)
