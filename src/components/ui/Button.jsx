import { Link } from 'react-router-dom'

const variants = {
  primary: 'bg-white text-black border-white/20 hover:bg-[#E21D1D] hover:border-[#E21D1D] hover:text-white',
  secondary: 'bg-transparent text-white border-white/20 hover:border-[#E21D1D] hover:text-[#E21D1D]',
  danger: 'bg-[#E21D1D] text-white border-[#E21D1D] hover:bg-white hover:text-black hover:border-white',
  ghost: 'bg-transparent text-[#888] border-transparent hover:text-[#E21D1D]',
}

const sizes = {
  sm: 'px-4 py-2 text-[10px]',
  md: 'px-6 py-3 text-xs',
  lg: 'px-8 py-4 text-sm',
}

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  to,
  href,
  disabled = false,
  loading = false,
  className = '',
  ...props
}) {
  const baseClasses = `
    inline-flex items-center justify-center gap-2
    border font-mono uppercase tracking-tight
    transition-all duration-75
    disabled:opacity-50 disabled:cursor-not-allowed
    ${variants[variant]}
    ${sizes[size]}
    ${className}
  `.trim()

  const content = loading ? (
    <>
      <span className="w-3 h-3 border border-current border-t-transparent rounded-full animate-spin" />
      <span>Processing...</span>
    </>
  ) : (
    children
  )

  // Internal link
  if (to) {
    return (
      <Link to={to} className={baseClasses} {...props}>
        {content}
      </Link>
    )
  }

  // External link
  if (href) {
    return (
      <a
        href={href}
        className={baseClasses}
        target="_blank"
        rel="noopener noreferrer"
        {...props}
      >
        {content}
      </a>
    )
  }

  // Button
  return (
    <button
      className={baseClasses}
      disabled={disabled || loading}
      {...props}
    >
      {content}
    </button>
  )
}
