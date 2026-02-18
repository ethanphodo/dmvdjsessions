import { ReactNode } from 'react'

type BadgeVariant = 'default' | 'active' | 'inactive' | 'success' | 'warning'

interface BadgeProps {
  children: ReactNode
  variant?: BadgeVariant
  dot?: boolean
  dotColor?: string
  blink?: boolean
  className?: string
}

const variants: Record<BadgeVariant, string> = {
  default: 'bg-[#1C1C1C] text-white',
  active: 'bg-[#E8E4E0] text-white',
  inactive: 'bg-[#1C1C1C] text-[#888]',
  success: 'bg-green-900/50 text-green-400',
  warning: 'bg-yellow-900/50 text-yellow-400',
}

export default function Badge({
  children,
  variant = 'default',
  dot = false,
  dotColor,
  blink = false,
  className = '',
}: BadgeProps) {
  return (
    <span
      className={`
        inline-flex items-center gap-2
        px-2 py-1
        font-mono text-[10px] uppercase tracking-tight
        ${variants[variant]}
        ${className}
      `}
    >
      {dot && (
        <span
          className={`w-2 h-2 rounded-full ${blink ? 'animate-pulse' : ''}`}
          style={{ backgroundColor: dotColor || '#E8E4E0' }}
          aria-hidden="true"
        />
      )}
      {children}
    </span>
  )
}
