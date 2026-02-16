const variants = {
  default: 'bg-[#1A1A1A] text-white',
  active: 'bg-[#E21D1D] text-white',
  inactive: 'bg-[#1A1A1A] text-[#888]',
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
}) {
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
          className={`w-2 h-2 ${blink ? 'blink' : ''}`}
          style={{ backgroundColor: dotColor || '#E21D1D' }}
        />
      )}
      {children}
    </span>
  )
}
