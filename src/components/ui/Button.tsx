import { Link } from 'react-router-dom'
import type { ReactNode, ButtonHTMLAttributes, AnchorHTMLAttributes } from 'react'

const variants = {
  primary: 'bg-white text-black border-white/20 hover:bg-[#E8E4E0] hover:border-[#E8E4E0] hover:text-white',
  secondary: 'bg-transparent text-white border-white/20 hover:border-[#E8E4E0] hover:text-[#E8E4E0]',
  danger: 'bg-[#E8E4E0] text-white border-[#E8E4E0] hover:bg-white hover:text-black hover:border-white',
  ghost: 'bg-transparent text-[#6B6865] border-transparent hover:text-[#E8E4E0]',
} as const

const sizes = {
  sm: 'px-4 py-2 text-[10px]',
  md: 'px-6 py-3 text-xs',
  lg: 'px-8 py-4 text-sm',
} as const

type ButtonVariant = keyof typeof variants
type ButtonSize = keyof typeof sizes

interface ButtonBaseProps {
  children: ReactNode
  variant?: ButtonVariant
  size?: ButtonSize
  loading?: boolean
  className?: string
}

interface ButtonAsButton extends ButtonBaseProps, Omit<ButtonHTMLAttributes<HTMLButtonElement>, keyof ButtonBaseProps> {
  to?: never
  href?: never
}

interface ButtonAsLink extends ButtonBaseProps {
  to: string
  href?: never
  disabled?: never
}

interface ButtonAsAnchor extends ButtonBaseProps, Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof ButtonBaseProps> {
  href: string
  to?: never
  disabled?: never
}

type ButtonProps = ButtonAsButton | ButtonAsLink | ButtonAsAnchor

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
}: ButtonProps) {
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
      <Link to={to} className={baseClasses} {...(props as Omit<ButtonAsLink, keyof ButtonBaseProps | 'to'>)}>
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
        {...(props as Omit<ButtonAsAnchor, keyof ButtonBaseProps | 'href'>)}
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
      {...(props as Omit<ButtonAsButton, keyof ButtonBaseProps>)}
    >
      {content}
    </button>
  )
}
