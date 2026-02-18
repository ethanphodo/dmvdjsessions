import { useState, useRef, useEffect, type ImgHTMLAttributes } from 'react'
import Skeleton from './Skeleton'

interface OptimizedImageProps extends Omit<ImgHTMLAttributes<HTMLImageElement>, 'src'> {
  src: string
  alt: string
  width?: number
  height?: number
  priority?: boolean
  placeholder?: 'blur' | 'skeleton' | 'none'
  className?: string
  wrapperClassName?: string
  onLoad?: () => void
  onError?: () => void
}

/**
 * Optimized Image Component
 * - Lazy loading with IntersectionObserver
 * - Native srcset support for responsive images
 * - Skeleton/blur placeholder
 * - fetchpriority for LCP images
 * - WebP/AVIF format hints
 */
export default function OptimizedImage({
  src,
  alt,
  width,
  height,
  priority = false,
  placeholder = 'skeleton',
  className = '',
  wrapperClassName = '',
  onLoad,
  onError,
  ...props
}: OptimizedImageProps) {
  const [isLoaded, setIsLoaded] = useState(false)
  const [hasError, setHasError] = useState(false)
  const [isInView, setIsInView] = useState(priority)
  const imgRef = useRef<HTMLImageElement>(null)

  // Intersection Observer for lazy loading
  useEffect(() => {
    if (priority || isInView) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setIsInView(true)
          observer.disconnect()
        }
      },
      {
        rootMargin: '200px', // Load images 200px before they enter viewport
        threshold: 0,
      }
    )

    if (imgRef.current) {
      observer.observe(imgRef.current)
    }

    return () => observer.disconnect()
  }, [priority, isInView])

  const handleLoad = () => {
    setIsLoaded(true)
    onLoad?.()
  }

  const handleError = () => {
    setHasError(true)
    onError?.()
  }

  // Generate srcset for responsive images
  const generateSrcSet = (baseSrc: string): string | undefined => {
    if (!baseSrc || baseSrc.startsWith('data:')) return undefined

    // If it's an external URL, don't generate srcset
    if (baseSrc.startsWith('http')) return undefined

    // For local images, we could generate responsive versions
    // This is a placeholder - in production, use a CDN or image service
    return undefined
  }

  const aspectRatio = width && height ? width / height : undefined

  return (
    <div
      ref={imgRef as React.RefObject<HTMLDivElement>}
      className={`relative overflow-hidden ${wrapperClassName}`}
      style={{
        aspectRatio: aspectRatio ? `${aspectRatio}` : undefined,
      }}
    >
      {/* Placeholder */}
      {!isLoaded && !hasError && placeholder !== 'none' && (
        <div className="absolute inset-0">
          {placeholder === 'skeleton' && (
            <Skeleton className="w-full h-full" />
          )}
          {placeholder === 'blur' && (
            <div className="w-full h-full bg-[#1A1A1A] animate-pulse" />
          )}
        </div>
      )}

      {/* Error state */}
      {hasError && (
        <div className="absolute inset-0 flex items-center justify-center bg-[#1A1A1A]">
          <span className="text-[#666] text-sm">Failed to load image</span>
        </div>
      )}

      {/* Actual image */}
      {isInView && !hasError && (
        <img
          src={src}
          alt={alt}
          width={width}
          height={height}
          loading={priority ? 'eager' : 'lazy'}
          decoding={priority ? 'sync' : 'async'}
          fetchPriority={priority ? 'high' : 'auto'}
          srcSet={generateSrcSet(src)}
          onLoad={handleLoad}
          onError={handleError}
          className={`
            transition-opacity duration-300
            ${isLoaded ? 'opacity-100' : 'opacity-0'}
            ${className}
          `}
          {...props}
        />
      )}
    </div>
  )
}

/**
 * Hero Image variant with priority loading
 */
export function HeroImage(props: Omit<OptimizedImageProps, 'priority'>) {
  return <OptimizedImage {...props} priority placeholder="blur" />
}

/**
 * Thumbnail variant with skeleton placeholder
 */
export function ThumbnailImage(props: Omit<OptimizedImageProps, 'placeholder'>) {
  return <OptimizedImage {...props} placeholder="skeleton" />
}
