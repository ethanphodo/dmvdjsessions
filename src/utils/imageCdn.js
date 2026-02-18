/**
 * Image CDN Utilities for DMV DJ Sessions
 * Supports Cloudinary and Imgix for automatic image optimization
 *
 * Features:
 * - Automatic format selection (WebP/AVIF)
 * - Responsive image srcsets
 * - Quality optimization
 * - Lazy loading with blur placeholders
 * - Art direction with focal points
 */

// Configuration
const config = {
  cloudinary: {
    cloudName: import.meta.env.VITE_CLOUDINARY_CLOUD_NAME || '',
    uploadPreset: import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET || '',
  },
  imgix: {
    domain: import.meta.env.VITE_IMGIX_DOMAIN || '',
  },
}

// Detect which CDN is configured
const getCdnProvider = () => {
  if (config.cloudinary.cloudName) return 'cloudinary'
  if (config.imgix.domain) return 'imgix'
  return 'none'
}

/**
 * Standard breakpoints for responsive images
 */
export const BREAKPOINTS = {
  xs: 320,
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
}

/**
 * Common aspect ratios
 */
export const ASPECT_RATIOS = {
  square: 1,
  video: 16 / 9,
  portrait: 3 / 4,
  landscape: 4 / 3,
  wide: 21 / 9,
  thumbnail: 16 / 9,
}

/**
 * Generate Cloudinary URL with transformations
 * @param {string} publicId - Cloudinary public ID or full URL
 * @param {Object} options - Transformation options
 */
export const cloudinaryUrl = (publicId, options = {}) => {
  const {
    width,
    height,
    quality = 'auto',
    format = 'auto',
    crop = 'fill',
    gravity = 'auto',
    aspectRatio,
    blur,
    effects = [],
  } = options

  if (!config.cloudinary.cloudName) {
    console.warn('[ImageCDN] Cloudinary not configured, returning original URL')
    return publicId
  }

  // Build transformation string
  const transforms = []

  if (width) transforms.push(`w_${width}`)
  if (height) transforms.push(`h_${height}`)
  if (aspectRatio) transforms.push(`ar_${aspectRatio}`)
  if (crop) transforms.push(`c_${crop}`)
  if (gravity) transforms.push(`g_${gravity}`)
  if (quality) transforms.push(`q_${quality}`)
  if (format) transforms.push(`f_${format}`)
  if (blur) transforms.push(`e_blur:${blur}`)

  effects.forEach((effect) => transforms.push(effect))

  const transformString = transforms.join(',')

  // Handle full URLs vs public IDs
  if (publicId.startsWith('http')) {
    // Fetch from URL
    return `https://res.cloudinary.com/${config.cloudinary.cloudName}/image/fetch/${transformString}/${encodeURIComponent(publicId)}`
  }

  // Use public ID
  return `https://res.cloudinary.com/${config.cloudinary.cloudName}/image/upload/${transformString}/${publicId}`
}

/**
 * Generate Imgix URL with transformations
 * @param {string} path - Image path or full URL
 * @param {Object} options - Transformation options
 */
export const imgixUrl = (path, options = {}) => {
  const {
    width,
    height,
    quality = 75,
    format = 'auto',
    fit = 'crop',
    crop = 'faces,entropy',
    aspectRatio,
    blur,
    dpr = 1,
  } = options

  if (!config.imgix.domain) {
    console.warn('[ImageCDN] Imgix not configured, returning original URL')
    return path
  }

  const params = new URLSearchParams()

  if (width) params.set('w', width)
  if (height) params.set('h', height)
  if (aspectRatio) params.set('ar', aspectRatio)
  if (fit) params.set('fit', fit)
  if (crop && fit === 'crop') params.set('crop', crop)
  if (quality) params.set('q', quality)
  if (format) params.set('auto', format === 'auto' ? 'format,compress' : format)
  if (blur) params.set('blur', blur)
  if (dpr > 1) params.set('dpr', dpr)

  const queryString = params.toString()
  const cleanPath = path.startsWith('/') ? path : `/${path}`

  return `https://${config.imgix.domain}${cleanPath}?${queryString}`
}

/**
 * Generate optimized image URL using configured CDN
 * Falls back to original URL if no CDN is configured
 * @param {string} src - Image source URL or path
 * @param {Object} options - Transformation options
 */
export const optimizedImageUrl = (src, options = {}) => {
  const provider = getCdnProvider()

  switch (provider) {
    case 'cloudinary':
      return cloudinaryUrl(src, options)
    case 'imgix':
      return imgixUrl(src, options)
    default:
      return src
  }
}

/**
 * Generate responsive srcset for an image
 * @param {string} src - Image source
 * @param {Object} options - Base options
 * @param {number[]} widths - Array of widths to generate
 */
export const generateSrcSet = (src, options = {}, widths = [320, 640, 768, 1024, 1280, 1536]) => {
  const provider = getCdnProvider()

  if (provider === 'none') {
    return ''
  }

  return widths
    .map((width) => {
      const url = optimizedImageUrl(src, { ...options, width })
      return `${url} ${width}w`
    })
    .join(', ')
}

/**
 * Generate sizes attribute for responsive images
 * @param {Object} sizesConfig - Breakpoint to size mapping
 */
export const generateSizes = (sizesConfig = {}) => {
  const defaultSizes = {
    '(max-width: 640px)': '100vw',
    '(max-width: 1024px)': '50vw',
    default: '33vw',
  }

  const config = { ...defaultSizes, ...sizesConfig }

  return Object.entries(config)
    .map(([breakpoint, size]) => {
      if (breakpoint === 'default') return size
      return `${breakpoint} ${size}`
    })
    .join(', ')
}

/**
 * Generate a low-quality placeholder for blur-up effect
 * @param {string} src - Image source
 */
export const generatePlaceholder = (src, width = 20) => {
  return optimizedImageUrl(src, {
    width,
    quality: 20,
    blur: 10,
  })
}

/**
 * Generate thumbnail URL
 * @param {string} src - Image source
 * @param {number} size - Thumbnail size
 */
export const generateThumbnail = (src, size = 150) => {
  return optimizedImageUrl(src, {
    width: size,
    height: size,
    crop: 'fill',
    quality: 80,
  })
}

/**
 * Generate avatar URL with circular crop
 * @param {string} src - Image source
 * @param {number} size - Avatar size
 */
export const generateAvatar = (src, size = 100) => {
  const provider = getCdnProvider()

  if (provider === 'cloudinary') {
    return cloudinaryUrl(src, {
      width: size,
      height: size,
      crop: 'thumb',
      gravity: 'face',
      quality: 'auto',
      effects: ['r_max'], // Circular crop
    })
  }

  // Imgix or fallback
  return optimizedImageUrl(src, {
    width: size,
    height: size,
    fit: 'crop',
    crop: 'faces',
  })
}

/**
 * Generate hero image URL optimized for large displays
 * @param {string} src - Image source
 * @param {Object} options - Additional options
 */
export const generateHeroImage = (src, options = {}) => {
  return optimizedImageUrl(src, {
    width: 1920,
    quality: 85,
    format: 'auto',
    ...options,
  })
}

/**
 * Generate card image URL
 * @param {string} src - Image source
 * @param {string} aspectRatio - Aspect ratio (default: 16:9)
 */
export const generateCardImage = (src, aspectRatio = '16:9') => {
  return optimizedImageUrl(src, {
    width: 640,
    aspectRatio,
    crop: 'fill',
    quality: 80,
  })
}

/**
 * Get image props for use with <img> tag
 * Returns optimized src, srcset, and sizes
 * @param {string} src - Original image source
 * @param {Object} options - Options for image optimization
 */
export const getImageProps = (src, options = {}) => {
  const {
    width,
    height,
    aspectRatio,
    sizes: customSizes,
    widths = [320, 640, 768, 1024, 1280],
    quality,
    ...rest
  } = options

  const baseOptions = { width, height, aspectRatio, quality, ...rest }

  return {
    src: optimizedImageUrl(src, baseOptions),
    srcSet: generateSrcSet(src, baseOptions, widths),
    sizes: customSizes || generateSizes(),
    loading: 'lazy',
    decoding: 'async',
  }
}

/**
 * Check if image CDN is configured
 */
export const isCdnConfigured = () => getCdnProvider() !== 'none'

/**
 * Get the current CDN provider name
 */
export const getCdnProviderName = getCdnProvider

export default {
  optimizedImageUrl,
  cloudinaryUrl,
  imgixUrl,
  generateSrcSet,
  generateSizes,
  generatePlaceholder,
  generateThumbnail,
  generateAvatar,
  generateHeroImage,
  generateCardImage,
  getImageProps,
  isCdnConfigured,
  getCdnProviderName,
  BREAKPOINTS,
  ASPECT_RATIOS,
}
