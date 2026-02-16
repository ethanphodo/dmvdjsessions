import { Link, useLocation } from 'react-router-dom'
import { NAV_LINKS } from '../../utils/constants'

function Navbar() {
  const location = useLocation()

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/95 backdrop-blur-sm border-b border-[#1A1A1A]">
      <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link
          to="/"
          className="text-white text-sm font-medium uppercase tracking-wide hover:text-[#888] transition-colors"
        >
          DMV DJ Sessions
        </Link>

        {/* Nav Links */}
        <div className="flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`text-sm font-medium uppercase tracking-wide transition-colors ${
                location.pathname === link.path
                  ? 'text-white'
                  : 'text-[#666] hover:text-white'
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
