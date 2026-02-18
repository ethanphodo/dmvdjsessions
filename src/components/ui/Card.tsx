import type { ReactNode, HTMLAttributes } from 'react'

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode
  header?: ReactNode
  footer?: ReactNode
  hoverable?: boolean
  className?: string
}

export default function Card({
  children,
  header,
  footer,
  hoverable = false,
  className = '',
  ...props
}: CardProps) {
  const hoverClasses = hoverable
    ? 'hover:border-[#E8E4E0] hover:shadow-[4px_4px_0_0_#E8E4E0] transition-all duration-75 cursor-cross'
    : ''

  return (
    <div
      className={`border border-[#1C1C1C] bg-[#141414] ${hoverClasses} ${className}`}
      {...props}
    >
      {header && (
        <div className="border-b border-[#1C1C1C] px-4 py-3 flex items-center justify-between">
          {header}
        </div>
      )}
      {children}
      {footer && (
        <div className="border-t border-[#1C1C1C] px-4 py-3">
          {footer}
        </div>
      )}
    </div>
  )
}

interface CardSectionProps {
  children: ReactNode
  className?: string
}

export function CardHeader({ children, className = '' }: CardSectionProps) {
  return (
    <div className={`border-b border-[#1C1C1C] px-4 py-3 flex items-center justify-between ${className}`}>
      {children}
    </div>
  )
}

export function CardContent({ children, className = '' }: CardSectionProps) {
  return (
    <div className={`p-6 ${className}`}>
      {children}
    </div>
  )
}

export function CardFooter({ children, className = '' }: CardSectionProps) {
  return (
    <div className={`border-t border-[#1C1C1C] px-4 py-3 ${className}`}>
      {children}
    </div>
  )
}
