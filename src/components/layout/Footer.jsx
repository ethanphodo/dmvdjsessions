import { Link } from 'react-router-dom'

function Footer() {
  return (
    <footer className="bg-black border-t border-[#1A1A1A]">
      <div className="max-w-5xl mx-auto px-6 py-16 md:py-20">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          {/* Brand */}
          <div>
            <Link
              to="/"
              className="text-white text-sm font-medium uppercase tracking-wide hover:text-[#888] transition-colors"
            >
              DMV DJ Sessions
            </Link>
            <p className="text-xs text-[#666] mt-2 uppercase tracking-wide">
              Where the Next Wave Plays First
            </p>
          </div>

          {/* Links */}
          <div className="flex items-center gap-8 text-sm">
            <Link
              to="/sessions"
              className="link-hover text-[#666] hover:text-white transition-colors uppercase tracking-wide"
            >
              Sessions
            </Link>
            <Link
              to="/submit"
              className="link-hover text-[#666] hover:text-white transition-colors uppercase tracking-wide"
            >
              Submit
            </Link>
            <Link
              to="/about"
              className="link-hover text-[#666] hover:text-white transition-colors uppercase tracking-wide"
            >
              About
            </Link>
          </div>

          {/* Social */}
          <div className="flex items-center gap-6 text-sm">
            <a
              href="https://instagram.com/dmvdjsessions"
              target="_blank"
              rel="noopener noreferrer"
              className="link-hover text-[#666] hover:text-white transition-colors uppercase tracking-wide"
            >
              Instagram
            </a>
            <a
              href="https://youtube.com/@dmvdjsessions"
              target="_blank"
              rel="noopener noreferrer"
              className="link-hover text-[#666] hover:text-white transition-colors uppercase tracking-wide"
            >
              YouTube
            </a>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 pt-8 border-t border-[#1A1A1A]">
          <p className="text-xs text-[#666] uppercase tracking-wide">
            © {new Date().getFullYear()} DMV DJ Sessions. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
