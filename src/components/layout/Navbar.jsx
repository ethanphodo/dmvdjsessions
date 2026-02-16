import { Link, useLocation } from 'react-router-dom'
import { NAV_LINKS } from '../../utils/constants'

function Navbar() {
  const location = useLocation()

  const getCurrentPageLabel = () => {
    if (location.pathname === '/') return 'HOME'
    const currentLink = NAV_LINKS.find((link) => link.path === location.pathname)
    return currentLink ? currentLink.label.toUpperCase() : 'PAGE'
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#050505] border-b border-[#1A1A1A]">
      <div className="max-w-7xl mx-auto px-6 h-12 flex items-center justify-between">
        {/* Breadcrumb Style Logo */}
        <Link
          to="/"
          className="flex items-center gap-2 font-mono text-xs uppercase tracking-tight hover:text-[#E21D1D] transition-colors duration-75"
        >
          <span className="font-medium text-white">DMV_DJ_SESSIONS</span>
          <span className="text-[#888]">/</span>
          <span className="text-[#888]">{getCurrentPageLabel()}</span>
        </Link>

        {/* Nav Links */}
        <div className="hidden md:flex items-center gap-8 font-mono text-xs uppercase tracking-tight">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`transition-colors duration-75 ${
                location.pathname === link.path
                  ? 'text-[#E21D1D]'
                  : 'text-[#888] hover:text-[#E21D1D]'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Status + Social */}
        <div className="flex items-center gap-6">
          {/* Live indicator */}
          <div className="flex items-center gap-2 font-mono text-xs uppercase text-white">
            <span className="w-2 h-2 bg-[#E21D1D] blink" />
            <span>REC</span>
          </div>

          {/* Social */}
          <div className="flex items-center gap-3">
            <a
              href="https://instagram.com/dmvdjsessions"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-[#E21D1D] transition-colors duration-75"
              aria-label="Instagram"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
              </svg>
            </a>
            <a
              href="https://youtube.com/@dmvdjsessions"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-[#E21D1D] transition-colors duration-75"
              aria-label="YouTube"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
              </svg>
            </a>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className="md:hidden border-t border-[#1A1A1A]">
        <div className="flex items-center justify-around py-2">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`font-mono text-xs uppercase tracking-tight px-3 py-1 ${
                location.pathname === link.path
                  ? 'text-[#E21D1D]'
                  : 'text-[#888]'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  )
}

export default Navbar
