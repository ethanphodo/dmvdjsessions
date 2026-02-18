import { Link, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'

const NAV_ITEMS = [
  {
    path: '/',
    label: 'Home',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
      </svg>
    ),
  },
  {
    path: '/about',
    label: 'About',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    path: '/partners',
    label: 'Partners',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
    ),
  },
  {
    path: '/submit',
    label: 'Submit',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4v16m8-8H4" />
      </svg>
    ),
    accent: true,
  },
]

function BottomNav() {
  const location = useLocation()

  return (
    <>
      {/* Spacer to prevent content from being hidden behind nav */}
      <div className="h-20 md:hidden" />

      {/* Bottom Navigation Bar */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 md:hidden">
        {/* Glassmorphic background */}
        <div className="absolute inset-0 bg-black/80 backdrop-blur-xl border-t border-white/10" />

        {/* Safe area padding for notched devices */}
        <div className="relative px-2 pb-safe">
          <div className="flex items-center justify-around h-16">
            {NAV_ITEMS.map((item) => {
              const isActive = location.pathname === item.path

              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className="relative flex flex-col items-center justify-center w-16 h-full"
                >
                  {/* Active indicator */}
                  {isActive && (
                    <motion.div
                      layoutId="bottomNavIndicator"
                      className="absolute -top-0.5 w-8 h-0.5 bg-[#E8E4E0] rounded-full"
                      transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                    />
                  )}

                  {/* Icon */}
                  <motion.div
                    whileTap={{ scale: 0.9 }}
                    className={`transition-colors duration-200 ${
                      item.accent
                        ? 'text-[#E8E4E0]'
                        : isActive
                        ? 'text-white'
                        : 'text-gray-500'
                    }`}
                  >
                    {item.icon}
                  </motion.div>

                  {/* Label */}
                  <span
                    className={`text-[10px] mt-1 font-medium uppercase tracking-wide transition-colors duration-200 ${
                      item.accent
                        ? 'text-[#E8E4E0]'
                        : isActive
                        ? 'text-white'
                        : 'text-gray-500'
                    }`}
                  >
                    {item.label}
                  </span>

                  {/* Ripple effect on tap */}
                  <motion.div
                    className="absolute inset-0 rounded-full"
                    whileTap={{
                      backgroundColor: 'rgba(255, 255, 255, 0.1)',
                      scale: 1.2,
                    }}
                    transition={{ duration: 0.2 }}
                  />
                </Link>
              )
            })}
          </div>
        </div>
      </nav>
    </>
  )
}

export default BottomNav
