import { Link } from 'react-router-dom'

const FOOTER_LINKS = [
  { path: '/about', label: 'ABOUT' },
  { path: '/sessions', label: 'SESSIONS' },
  { path: '/events', label: 'EVENTS' },
  { path: '/djs', label: 'DJS' },
  { path: '/apply', label: 'APPLY' },
  { path: '/partners', label: 'PARTNERSHIPS' },
]

const SOCIAL_LINKS = [
  { href: 'https://youtube.com/@dmvdjsessions', label: 'YOUTUBE' },
  { href: 'https://instagram.com/dmvdjsessions', label: 'INSTAGRAM' },
  { href: 'https://tiktok.com/@dmvdjsessions', label: 'TIKTOK' },
]

function Footer() {
  return (
    <footer className="bg-black border-t border-[#1A1A1A]" itemScope itemType="https://schema.org/Organization">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-16 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
          {/* Column 1: Brand + Navigation */}
          <div>
            <Link
              to="/"
              className="text-white text-sm font-bold uppercase tracking-[0.15em] hover:opacity-70 transition-opacity"
            >
              <span itemProp="name">DMV DJ SESSIONS</span>
            </Link>

            <nav className="mt-8 flex flex-col space-y-4" aria-label="Footer navigation">
              {FOOTER_LINKS.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className="text-[#666] text-sm font-medium uppercase tracking-[0.1em] hover:text-white transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Column 2: Where to Find Us */}
          <div>
            <h3 className="text-white text-sm font-bold uppercase tracking-[0.15em]">
              WHERE TO FIND US
            </h3>

            <div className="mt-8 flex flex-col space-y-4">
              {SOCIAL_LINKS.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#666] text-sm font-medium uppercase tracking-[0.1em] hover:text-white transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          {/* Column 3: Logo/Graphic */}
          <div className="flex justify-start md:justify-end items-start">
            <div className="text-white/10">
              {/* DMV Logo Mark */}
              <svg
                viewBox="0 0 120 60"
                className="w-32 h-16"
                fill="currentColor"
                aria-hidden="true"
              >
                <text x="0" y="45" className="text-4xl font-black" style={{ fontFamily: 'system-ui' }}>
                  DMV
                </text>
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-[#1A1A1A]">
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-6">
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8 text-center">
            <span className="text-[#444] text-xs uppercase tracking-[0.1em]">
              © {new Date().getFullYear()}, DMV DJ SESSIONS
            </span>
            <span className="hidden md:inline text-[#333]">·</span>
            <Link
              to="/privacy"
              className="text-[#444] text-xs uppercase tracking-[0.1em] hover:text-white transition-colors"
            >
              PRIVACY POLICY
            </Link>
            <span className="hidden md:inline text-[#333]">·</span>
            <a
              href="mailto:hello@dmvdjsessions.com"
              className="text-[#444] text-xs uppercase tracking-[0.1em] hover:text-white transition-colors"
              itemProp="email"
            >
              CONTACT
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
