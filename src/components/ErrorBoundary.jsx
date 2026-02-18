import { Component } from 'react'
import { Link } from 'react-router-dom'
import { captureException, addBreadcrumb } from '../utils/errorTracking'

/**
 * Error Boundary Component
 * Catches JavaScript errors in child component tree and displays fallback UI
 * Reports errors to Sentry when configured
 */
class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
    }
  }

  static getDerivedStateFromError(error) {
    // Update state so next render shows fallback UI
    return { hasError: true, error }
  }

  componentDidCatch(error, errorInfo) {
    // Log error details
    console.error('[ErrorBoundary] Caught error:', error)
    console.error('[ErrorBoundary] Component stack:', errorInfo.componentStack)

    // Update state with error info
    this.setState({ errorInfo })

    // Add breadcrumb for context
    addBreadcrumb({
      category: 'error-boundary',
      message: `Error caught in ${this.props.name || 'Unknown'} boundary`,
      level: 'error',
      data: {
        componentStack: errorInfo.componentStack,
      },
    })

    // Report to Sentry
    captureException(error, {
      componentStack: errorInfo.componentStack,
      boundaryName: this.props.name,
    })

    // Call optional onError callback
    if (this.props.onError) {
      this.props.onError(error, errorInfo)
    }
  }

  handleReset = () => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
    })

    // Call optional onReset callback
    if (this.props.onReset) {
      this.props.onReset()
    }
  }

  render() {
    if (this.state.hasError) {
      // Custom fallback UI if provided
      if (this.props.fallback) {
        return this.props.fallback({
          error: this.state.error,
          errorInfo: this.state.errorInfo,
          reset: this.handleReset,
        })
      }

      // Default fallback UI
      return (
        <div className="min-h-[400px] flex items-center justify-center p-8">
          <div className="max-w-md w-full text-center">
            {/* Error Icon */}
            <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-red-500/10 flex items-center justify-center">
              <svg
                className="w-8 h-8 text-red-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
            </div>

            {/* Error Message */}
            <h2 className="text-xl font-semibold text-white mb-2">
              Something went wrong
            </h2>
            <p className="text-gray-400 mb-6">
              We've been notified and are working on a fix.
              Please try again or return to the homepage.
            </p>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                onClick={this.handleReset}
                className="px-6 py-3 bg-white text-black text-sm font-medium hover:bg-gray-200 transition-colors"
              >
                Try Again
              </button>
              <Link
                to="/"
                className="px-6 py-3 border border-white/20 text-white text-sm hover:border-white/40 transition-colors"
              >
                Go Home
              </Link>
            </div>

            {/* Error Details (Development Only) */}
            {import.meta.env.DEV && this.state.error && (
              <details className="mt-8 text-left">
                <summary className="text-xs text-gray-500 cursor-pointer hover:text-gray-400">
                  Error Details (Development)
                </summary>
                <div className="mt-4 p-4 bg-red-500/5 border border-red-500/20 rounded-lg overflow-auto">
                  <p className="text-red-400 text-sm font-mono mb-2">
                    {this.state.error.toString()}
                  </p>
                  {this.state.errorInfo && (
                    <pre className="text-xs text-gray-500 whitespace-pre-wrap">
                      {this.state.errorInfo.componentStack}
                    </pre>
                  )}
                </div>
              </details>
            )}
          </div>
        </div>
      )
    }

    return this.props.children
  }
}

/**
 * Higher-order component to wrap any component with error boundary
 */
export function withErrorBoundary(WrappedComponent, options = {}) {
  const { name, fallback, onError, onReset } = options

  return function WithErrorBoundary(props) {
    return (
      <ErrorBoundary
        name={name || WrappedComponent.displayName || WrappedComponent.name}
        fallback={fallback}
        onError={onError}
        onReset={onReset}
      >
        <WrappedComponent {...props} />
      </ErrorBoundary>
    )
  }
}

export default ErrorBoundary
