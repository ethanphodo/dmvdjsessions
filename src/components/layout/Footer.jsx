import { Link } from 'react-router-dom'

function Footer() {
  return (
    <footer className="bg-black border-t border-[#1A1A1A]" itemScope itemType="https://schema.org/Organization">
      <div className="container-main py-16 md:py-20 text-center">
        {/* Brand - NAP Info for Local SEO */}
        <Link
          to="/"
          className="text-white text-sm font-medium uppercase tracking-wide hover:text-[#888] transition-colors"
        >
          <span itemProp="name">DMV DJ Sessions</span>
        </Link>

        {/* Tagline */}
        <p className="text-xs text-[#666] mt-3 uppercase tracking-wide" itemProp="description">
          Where the Next Wave Plays First
        </p>

        {/* NAP - Location for Local SEO */}
        <address
          className="text-xs text-[#444] mt-4 not-italic uppercase tracking-wide"
          itemProp="address"
          itemScope
          itemType="https://schema.org/PostalAddress"
        >
          <span itemProp="addressLocality">Washington DC</span> · <span itemProp="addressRegion">Maryland</span> · <span itemProp="addressRegion">Virginia</span>
        </address>
        <a
          href="mailto:hello@dmvdjsessions.com"
          className="text-xs text-[#555] mt-2 inline-block hover:text-white transition-colors"
          itemProp="email"
        >
          hello@dmvdjsessions.com
        </a>

        {/* Social */}
        <div className="flex items-center justify-center gap-6 mt-8">
          <a
            href="https://instagram.com/dmvdjsessions"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#666] hover:text-white transition-colors"
            aria-label="Instagram"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
            </svg>
          </a>
          <a
            href="https://youtube.com/@dmvdjsessions"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#666] hover:text-white transition-colors"
            aria-label="YouTube"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
            </svg>
          </a>
        </div>

        {/* Copyright & Legal Links */}
        <div className="mt-8 space-y-2">
          <p className="text-xs text-[#666] uppercase tracking-wide">
            © {new Date().getFullYear()} DMV DJ Sessions
          </p>
          <Link
            to="/privacy"
            className="text-xs text-[#555] hover:text-white transition-colors"
          >
            Privacy Policy
          </Link>
        </div>
      </div>
    </footer>
  )
}

export default Footer
