interface SkeletonProps {
  className?: string
  variant?: 'text' | 'rectangular' | 'circular'
  width?: string | number
  height?: string | number
  animate?: boolean
}

export default function Skeleton({
  className = '',
  variant = 'rectangular',
  width,
  height,
  animate = true,
}: SkeletonProps) {
  const baseClasses = 'bg-[#1C1C1C]'

  const variantClasses = {
    text: 'rounded',
    rectangular: 'rounded',
    circular: 'rounded-full',
  }

  const animationClass = animate ? 'animate-pulse' : ''

  const style: React.CSSProperties = {
    width: width,
    height: height,
  }

  return (
    <div
      className={`${baseClasses} ${variantClasses[variant]} ${animationClass} ${className}`}
      style={style}
      aria-hidden="true"
    />
  )
}

// Preset skeleton components for common use cases
export function SkeletonText({ lines = 3, className = '' }: { lines?: number; className?: string }) {
  return (
    <div className={`space-y-2 ${className}`}>
      {Array.from({ length: lines }).map((_, i) => (
        <Skeleton
          key={i}
          className={`h-4 ${i === lines - 1 ? 'w-3/4' : 'w-full'}`}
          variant="text"
        />
      ))}
    </div>
  )
}

export function SkeletonCard({ className = '' }: { className?: string }) {
  return (
    <div className={`border border-[#1C1C1C] bg-[#141414] ${className}`}>
      <Skeleton className="aspect-video w-full" />
      <div className="p-4 space-y-3">
        <Skeleton className="h-5 w-3/4" />
        <Skeleton className="h-4 w-1/2" />
        <div className="flex gap-2">
          <Skeleton className="h-6 w-16" />
          <Skeleton className="h-6 w-16" />
        </div>
      </div>
    </div>
  )
}

export function SkeletonAvatar({ size = 'md' }: { size?: 'sm' | 'md' | 'lg' }) {
  const sizes = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16',
  }

  return <Skeleton className={sizes[size]} variant="circular" />
}
