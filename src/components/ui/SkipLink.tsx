/**
 * Accessible Skip Link Component
 * Allows keyboard users to skip to main content
 */

interface SkipLinkProps {
  href?: string
  label?: string
}

export default function SkipLink({
  href = '#main-content',
  label = 'Skip to main content',
}: SkipLinkProps) {
  return (
    <a
      href={href}
      className="skip-link sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[9999] focus:px-4 focus:py-2 focus:bg-[#8B5CF6] focus:text-white focus:text-sm focus:font-medium focus:rounded focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-black"
    >
      {label}
    </a>
  )
}

/**
 * Multiple skip links for complex pages
 */
interface SkipLinksProps {
  links: Array<{
    href: string
    label: string
  }>
}

export function SkipLinks({ links }: SkipLinksProps) {
  return (
    <nav aria-label="Skip links" className="sr-only focus-within:not-sr-only">
      <ul className="fixed top-4 left-4 z-[9999] space-y-2">
        {links.map((link) => (
          <li key={link.href}>
            <a
              href={link.href}
              className="sr-only focus:not-sr-only focus:block focus:px-4 focus:py-2 focus:bg-[#8B5CF6] focus:text-white focus:text-sm focus:font-medium focus:rounded focus:outline-none focus:ring-2 focus:ring-white"
            >
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}
