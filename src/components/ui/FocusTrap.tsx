import { useEffect, useRef, type ReactNode, type KeyboardEvent } from 'react'

interface FocusTrapProps {
  children: ReactNode
  active?: boolean
  onEscape?: () => void
  className?: string
  initialFocus?: boolean
  returnFocus?: boolean
}

/**
 * Focus Trap Component
 * Traps focus within a container for modals and dialogs
 * WCAG 2.2 compliant keyboard navigation
 */
export default function FocusTrap({
  children,
  active = true,
  onEscape,
  className = '',
  initialFocus = true,
  returnFocus = true,
}: FocusTrapProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const previousActiveElement = useRef<HTMLElement | null>(null)

  // Store previously focused element and set initial focus
  useEffect(() => {
    if (!active) return

    previousActiveElement.current = document.activeElement as HTMLElement

    if (initialFocus && containerRef.current) {
      const firstFocusable = getFocusableElements(containerRef.current)[0]
      if (firstFocusable) {
        firstFocusable.focus()
      } else {
        containerRef.current.focus()
      }
    }

    return () => {
      if (returnFocus && previousActiveElement.current) {
        previousActiveElement.current.focus()
      }
    }
  }, [active, initialFocus, returnFocus])

  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (!active || !containerRef.current) return

    // Handle Escape
    if (e.key === 'Escape' && onEscape) {
      e.preventDefault()
      onEscape()
      return
    }

    // Handle Tab
    if (e.key === 'Tab') {
      const focusableElements = getFocusableElements(containerRef.current)

      if (focusableElements.length === 0) {
        e.preventDefault()
        return
      }

      const firstElement = focusableElements[0]!
      const lastElement = focusableElements[focusableElements.length - 1]!

      // Shift + Tab at first element -> go to last
      if (e.shiftKey && document.activeElement === firstElement) {
        e.preventDefault()
        lastElement.focus()
        return
      }

      // Tab at last element -> go to first
      if (!e.shiftKey && document.activeElement === lastElement) {
        e.preventDefault()
        firstElement.focus()
        return
      }
    }
  }

  return (
    <div
      ref={containerRef}
      onKeyDown={handleKeyDown}
      tabIndex={-1}
      className={`outline-none ${className}`}
    >
      {children}
    </div>
  )
}

/**
 * Get all focusable elements within a container
 */
function getFocusableElements(container: HTMLElement): HTMLElement[] {
  const focusableSelectors = [
    'a[href]',
    'button:not([disabled])',
    'input:not([disabled])',
    'select:not([disabled])',
    'textarea:not([disabled])',
    '[tabindex]:not([tabindex="-1"])',
    'audio[controls]',
    'video[controls]',
    '[contenteditable]:not([contenteditable="false"])',
  ]

  const elements = container.querySelectorAll<HTMLElement>(
    focusableSelectors.join(',')
  )

  return Array.from(elements).filter((el) => {
    // Check if element is visible
    const style = window.getComputedStyle(el)
    return (
      style.display !== 'none' &&
      style.visibility !== 'hidden' &&
      !el.hasAttribute('hidden')
    )
  })
}
