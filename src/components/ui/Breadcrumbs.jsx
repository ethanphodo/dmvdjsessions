import { Link } from 'react-router-dom'

function Breadcrumbs({ items }) {
  if (!items || items.length === 0) return null

  return (
    <nav aria-label="Breadcrumb" className="mb-6">
      <ol className="flex items-center gap-2 text-sm">
        <li>
          <Link
            to="/"
            className="text-gray-500 hover:text-white transition-colors"
          >
            Home
          </Link>
        </li>
        {items.map((item, index) => {
          const isLast = index === items.length - 1
          return (
            <li key={item.path || item.label} className="flex items-center gap-2">
              <span className="text-gray-600">/</span>
              {isLast ? (
                <span
                  className="text-white"
                  aria-current="page"
                >
                  {item.label}
                </span>
              ) : (
                <Link
                  to={item.path}
                  className="text-gray-500 hover:text-white transition-colors"
                >
                  {item.label}
                </Link>
              )}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}

export default Breadcrumbs
