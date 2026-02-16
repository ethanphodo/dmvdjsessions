import { Link } from 'react-router-dom'
import { NAV_LINKS } from '../../utils/constants'

function Footer() {
  return (
    <footer className="bg-[#050505]">
      {/* Double Line Divider */}
      <div className="syber-divider" />

      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <div className="font-mono text-xs uppercase tracking-tight text-[#888] mb-3">
              BRAND
            </div>
            <Link
              to="/"
              className="text-lg font-black uppercase tracking-tighter text-white hover:text-[#E21D1D] transition-colors"
            >
              DMV_DJ_SESSIONS
            </Link>
            <p className="font-mono text-xs text-[#888] mt-2">
              Washington DC / Maryland / Virginia
            </p>
          </div>

          {/* Links */}
          <div>
            <div className="font-mono text-xs uppercase tracking-tight text-[#888] mb-3">
              NAVIGATION
            </div>
            <div className="space-y-2">
              <Link
                to="/"
                className="block font-mono text-xs uppercase text-white hover:text-[#E21D1D] transition-colors duration-75"
              >
                → Home
              </Link>
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className="block font-mono text-xs uppercase text-white hover:text-[#E21D1D] transition-colors duration-75"
                >
                  → {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Social */}
          <div>
            <div className="font-mono text-xs uppercase tracking-tight text-[#888] mb-3">
              CONNECT
            </div>
            <div className="space-y-2">
              <a
                href="https://instagram.com/dmvdjsessions"
                target="_blank"
                rel="noopener noreferrer"
                className="block font-mono text-xs uppercase text-white hover:text-[#E21D1D] transition-colors duration-75"
              >
                → Instagram
              </a>
              <a
                href="https://youtube.com/@dmvdjsessions"
                target="_blank"
                rel="noopener noreferrer"
                className="block font-mono text-xs uppercase text-white hover:text-[#E21D1D] transition-colors duration-75"
              >
                → YouTube
              </a>
              <a
                href="mailto:hello@dmvdjsessions.com"
                className="block font-mono text-xs uppercase text-white hover:text-[#E21D1D] transition-colors duration-75"
              >
                → Email
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-[#1A1A1A]">
        <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="font-mono text-xs text-[#888] uppercase">
            © {new Date().getFullYear()} DMV DJ Sessions. All rights reserved.
          </p>
          <div className="font-mono text-xs text-[#888] uppercase">
            Built in the DMV
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
