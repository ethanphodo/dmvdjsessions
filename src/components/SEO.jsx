import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import JsonLdSchema, { organizationSchema } from './JsonLdSchema'

const BASE_URL = 'https://dmvdjsessions.com'

function SEO({
  title = 'DMV DJ Sessions',
  description = 'High-quality DJ sessions spotlighting the next wave of DMV talent.',
  keywords = 'DJ, DMV, Washington DC, Maryland, Virginia, electronic music, house, techno',
  image = '/og-image.jpg',
  url,
  schema = null, // Additional JSON-LD schema (MusicEvent, VideoObject, etc.)
  includeOrgSchema = true, // Include organization schema by default
}) {
  const location = useLocation()

  // Generate canonical URL from current path if not provided
  const canonicalUrl = url || `${BASE_URL}${location.pathname}`
  const fullImageUrl = image.startsWith('http') ? image : `${BASE_URL}${image}`

  useEffect(() => {
    // Update document title
    document.title = title.includes('DMV DJ Sessions')
      ? title
      : `${title} | DMV DJ Sessions`

    // Update or create canonical link
    let canonicalLink = document.querySelector('link[rel="canonical"]')
    if (!canonicalLink) {
      canonicalLink = document.createElement('link')
      canonicalLink.setAttribute('rel', 'canonical')
      document.head.appendChild(canonicalLink)
    }
    canonicalLink.setAttribute('href', canonicalUrl)

    // Update meta tags
    const updateMetaTag = (name, content, isProperty = false) => {
      const attr = isProperty ? 'property' : 'name'
      let tag = document.querySelector(`meta[${attr}="${name}"]`)
      if (!tag) {
        tag = document.createElement('meta')
        tag.setAttribute(attr, name)
        document.head.appendChild(tag)
      }
      tag.setAttribute('content', content)
    }

    // Standard meta tags
    updateMetaTag('description', description)
    updateMetaTag('keywords', keywords)

    // Open Graph tags
    updateMetaTag('og:title', title, true)
    updateMetaTag('og:description', description, true)
    updateMetaTag('og:image', fullImageUrl, true)
    updateMetaTag('og:type', 'website', true)
    updateMetaTag('og:url', canonicalUrl, true)

    // Twitter tags
    updateMetaTag('twitter:card', 'summary_large_image')
    updateMetaTag('twitter:title', title)
    updateMetaTag('twitter:description', description)
    updateMetaTag('twitter:image', fullImageUrl)

  }, [title, description, keywords, fullImageUrl, canonicalUrl])

  // Build schema array
  const schemas = []
  if (includeOrgSchema) {
    schemas.push(organizationSchema)
  }
  if (schema) {
    if (Array.isArray(schema)) {
      schemas.push(...schema)
    } else {
      schemas.push(schema)
    }
  }

  return schemas.length > 0 ? <JsonLdSchema schema={schemas} /> : null
}

export default SEO
