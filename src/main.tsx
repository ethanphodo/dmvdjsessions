import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App'
import ErrorBoundary from './components/ErrorBoundary'
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

const rootElement = document.getElementById('root')
if (!rootElement) {
  throw new Error('Root element not found')
}

createRoot(rootElement).render(
  <StrictMode>
    <ErrorBoundary name="App">
      <App />
    </ErrorBoundary>
  </StrictMode>,
)
