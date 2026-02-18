import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { NAV_LINKS } from '../../utils/constants'
import ThemeToggle from '../ui/ThemeToggle'

interface NavLink {
  path: string
  label: string
}

function Navbar() {
  const location = useLocation()
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  // Close drawer on route change
  useEffect(() => {
    setDrawerOpen(false)
  }, [location.pathname])

  // Track scroll for navbar style change
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Lock body scroll when drawer is open
  useEffect(() => {
    if (drawerOpen) {
      document.body.classList.add('drawer-open')
    } else {
      document.body.classList.remove('drawer-open')
    }
    return () => {
      document.body.classList.remove('drawer-open')
    }
  }, [drawerOpen])

  return (
    <>
      {/* Fixed Header */}
      <header className="fixed top-0 left-0 right-0 z-40 px-4 md:px-6 py-4">
        <nav
          className={`max-w-6xl mx-auto flex items-center justify-between transition-all duration-500 ${
            scrolled
              ? 'bg-black/80 backdrop-blur-xl border border-white/10 rounded-full px-6 py-3'
              : 'bg-transparent px-2 py-4'
          }`}
          aria-label="Main navigation"
        >
          {/* Left - Location Tag (Desktop) / Hamburger (Mobile) */}
          <div className="flex-1">
            <button
              onClick={() => setDrawerOpen(true)}
              className="md:hidden p-2 -ml-2 text-white hover:text-[#888] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#E21D1D]"
              aria-label="Open menu"
              aria-expanded={drawerOpen}
              aria-controls="mobile-menu"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            <span className="hidden md:block font-mono text-[10px] tracking-[0.2em] text-gray-500 uppercase">
              DMV // DC · MD · VA
            </span>
          </div>

          {/* Center - Logo */}
          <Link
            to="/"
            className="flex-1 flex justify-center hover:opacity-70 transition-opacity focus:outline-none focus-visible:ring-2 focus-visible:ring-[#E21D1D] rounded"
            aria-label="DMV DJ Sessions - Home"
          >
            <h1 className="text-base md:text-lg font-medium tracking-tight text-white">
              DMV DJ Sessions
            </h1>
          </Link>

          {/* Right - Nav Links (Desktop) */}
          <div className="flex-1 flex justify-end">
            <div className="hidden md:flex items-center gap-6">
              {(NAV_LINKS as NavLink[]).map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`text-[10px] uppercase tracking-[0.2em] font-bold transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#E21D1D] rounded px-1 ${
                    location.pathname === link.path
                      ? 'text-[#D6A756]'
                      : 'text-gray-400 hover:text-white'
                  }`}
                  aria-current={location.pathname === link.path ? 'page' : undefined}
                >
                  {link.label}
                </Link>
              ))}
              <ThemeToggle />
            </div>
            {/* Spacer for mobile */}
            <div className="md:hidden w-9" />
          </div>
        </nav>
      </header>

      {/* Overlay */}
      <AnimatePresence>
        {drawerOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-45 bg-black/80 backdrop-blur-sm"
            onClick={() => setDrawerOpen(false)}
            aria-hidden="true"
          />
        )}
      </AnimatePresence>

      {/* Drawer Panel */}
      <AnimatePresence>
        {drawerOpen && (
          <motion.nav
            id="mobile-menu"
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 left-0 z-50 w-full max-w-[400px] h-dvh bg-black border-r border-white/10"
            aria-label="Mobile navigation"
          >
            <div className="flex flex-col h-full px-8 py-6">
              {/* Close button */}
              <button
                onClick={() => setDrawerOpen(false)}
                className="self-start p-2 -ml-2 text-white hover:text-[#888] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#E21D1D]"
                aria-label="Close menu"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              {/* Nav Links */}
              <nav className="flex-1 flex flex-col justify-center space-y-6">
                {(NAV_LINKS as NavLink[]).map((link, i) => (
                  <motion.div
                    key={link.path}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <Link
                      to={link.path}
                      className={`block text-4xl md:text-5xl font-black italic uppercase tracking-tighter transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#E21D1D] ${
                        location.pathname === link.path
                          ? 'text-white'
                          : 'text-gray-600 hover:text-white'
                      }`}
                      aria-current={location.pathname === link.path ? 'page' : undefined}
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ))}
              </nav>

              {/* Social Icons & Theme Toggle */}
              <div className="flex items-center justify-between pt-8 border-t border-white/10">
                <div className="flex items-center gap-6">
                  <a
                    href="https://instagram.com/dmvdjsessions"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-600 hover:text-white transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#E21D1D]"
                    aria-label="Instagram"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                    </svg>
                  </a>
                  <a
                    href="https://youtube.com/@dmvdjsessions"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-600 hover:text-white transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#E21D1D]"
                    aria-label="YouTube"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                    </svg>
                  </a>
                </div>
                <ThemeToggle />
              </div>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </>
  )
}

export default Navbar
