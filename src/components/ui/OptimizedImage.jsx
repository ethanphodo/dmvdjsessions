import { useState, useRef, useEffect, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  optimizedImageUrl,
  generateSrcSet,
  generatePlaceholder,
  isCdnConfigured,
} from '../../utils/imageCdn'

/**
 * Optimized image component with:
 * - CDN integration (Cloudinary/Imgix) for automatic optimization
 * - Lazy loading via Intersection Observer
 * - Progressive loading with blur-up effect
 * - Responsive srcset generation
 * - WebP/AVIF automatic format selection
 * - Error fallback
 * - Priority loading option for LCP
 */
function OptimizedImage({
  src,
  alt,
  className = '',
  wrapperClassName = '',
  priority = false,
  aspectRatio = '16/9',
  objectFit = 'cover',
  width,
  height,
  quality,
  sizes,
  widths = [320, 640, 768, 1024, 1280],
  onLoad,
  fallback = null,
  useCdn = true,
  placeholder = 'blur', // 'blur' | 'skeleton' | 'none'
}) {
  const [isLoaded, setIsLoaded] = useState(false)
  const [isInView, setIsInView] = useState(priority)
  const [hasError, setHasError] = useState(false)
  const imgRef = useRef(null)
  const observerRef = useRef(null)

  // Generate CDN URLs if configured
  const cdnEnabled = useCdn && isCdnConfigured()

  const optimizedSrc = useMemo(() => {
    if (!cdnEnabled) return src
    return optimizedImageUrl(src, { width, height, quality })
  }, [src, width, height, quality, cdnEnabled])

  const srcSet = useMemo(() => {
    if (!cdnEnabled) return ''
    return generateSrcSet(src, { height, quality }, widths)
  }, [src, height, quality, widths, cdnEnabled])

  const placeholderSrc = useMemo(() => {
    if (placeholder !== 'blur' || !cdnEnabled) return null
    return generatePlaceholder(src)
  }, [src, placeholder, cdnEnabled])

  // Intersection Observer for lazy loading
  useEffect(() => {
    if (priority || !imgRef.current) return

    observerRef.current = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true)
          observerRef.current?.disconnect()
        }
      },
      {
        rootMargin: '100px', // Start loading 100px before entering viewport
        threshold: 0.01,
      }
    )

    observerRef.current.observe(imgRef.current)

    return () => observerRef.current?.disconnect()
  }, [priority])

  const handleLoad = () => {
    setIsLoaded(true)
    onLoad?.()
  }

  const handleError = () => {
    setHasError(true)
  }

  return (
    <div
      ref={imgRef}
      className={`relative overflow-hidden ${wrapperClassName}`}
      style={{ aspectRatio }}
    >
      {/* Blur placeholder (if CDN provides it) */}
      {placeholder === 'blur' && placeholderSrc && !isLoaded && !hasError && (
        <img
          src={placeholderSrc}
          alt=""
          className="absolute inset-0 w-full h-full object-cover scale-110 blur-lg"
          aria-hidden="true"
        />
      )}

      {/* Skeleton placeholder */}
      <AnimatePresence>
        {placeholder === 'skeleton' && !isLoaded && !hasError && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 bg-[#1A1A1A]"
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent"
              animate={{ x: ['-100%', '100%'] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Default skeleton when no placeholder specified or CDN not configured */}
      <AnimatePresence>
        {!placeholderSrc && placeholder !== 'none' && !isLoaded && !hasError && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 bg-[#1A1A1A]"
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent"
              animate={{ x: ['-100%', '100%'] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Error fallback */}
      {hasError && (
        <div className="absolute inset-0 bg-[#1A1A1A] flex items-center justify-center">
          {fallback || (
            <span className="text-white/30 text-sm uppercase tracking-widest font-mono">
              Image unavailable
            </span>
          )}
        </div>
      )}

      {/* Actual image */}
      {isInView && !hasError && (
        <motion.img
          src={optimizedSrc}
          srcSet={srcSet || undefined}
          sizes={sizes}
          alt={alt}
          className={`w-full h-full ${className}`}
          style={{ objectFit }}
          onLoad={handleLoad}
          onError={handleError}
          loading={priority ? 'eager' : 'lazy'}
          decoding={priority ? 'sync' : 'async'}
          fetchPriority={priority ? 'high' : 'auto'}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{
            opacity: isLoaded ? 1 : 0,
            scale: isLoaded ? 1 : 1.1,
          }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        />
      )}
    </div>
  )
}

/**
 * Hero video component with optimized loading
 * Uses poster image for LCP, then loads video
 */
export function OptimizedVideo({
  src,
  poster,
  className = '',
  autoPlay = true,
  loop = true,
  muted = true,
  priority = true,
}) {
  const [isVideoLoaded, setIsVideoLoaded] = useState(false)
  const videoRef = useRef(null)

  // Optimize poster image if CDN is configured
  const optimizedPoster = useMemo(() => {
    if (!poster || !isCdnConfigured()) return poster
    return optimizedImageUrl(poster, { width: 1920, quality: 80 })
  }, [poster])

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.addEventListener('loadeddata', () => {
        setIsVideoLoaded(true)
      })
    }
  }, [])

  return (
    <div className="relative overflow-hidden">
      {/* Poster image for fast LCP */}
      <AnimatePresence>
        {!isVideoLoaded && optimizedPoster && (
          <motion.img
            src={optimizedPoster}
            alt=""
            className={`absolute inset-0 w-full h-full object-cover ${className}`}
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            loading={priority ? 'eager' : 'lazy'}
            fetchPriority={priority ? 'high' : 'auto'}
          />
        )}
      </AnimatePresence>

      {/* Video element */}
      <video
        ref={videoRef}
        src={src}
        poster={optimizedPoster}
        autoPlay={autoPlay}
        loop={loop}
        muted={muted}
        playsInline
        className={`w-full h-full object-cover ${className}`}
        style={{ opacity: isVideoLoaded ? 1 : 0 }}
        preload={priority ? 'auto' : 'metadata'}
      />
    </div>
  )
}

export default OptimizedImage
