import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import JsonLdSchema, { organizationSchema, type JsonLdSchemaType } from './JsonLdSchema'

const BASE_URL = 'https://dmvdjsessions.com'

interface SEOProps {
  title?: string
  description?: string
  keywords?: string
  image?: string
  url?: string
  schema?: JsonLdSchemaType | JsonLdSchemaType[] | null
  includeOrgSchema?: boolean
  type?: 'website' | 'article' | 'video' | 'profile'
  publishedTime?: string
  modifiedTime?: string
  author?: string
}

function SEO({
  title = 'DMV DJ Sessions',
  description = 'High-quality DJ sessions spotlighting the next wave of DMV talent.',
  keywords = 'DJ, DMV, Washington DC, Maryland, Virginia, electronic music, house, techno',
  image = '/og-image.jpg',
  url,
  schema = null,
  includeOrgSchema = true,
  type = 'website',
  publishedTime,
  modifiedTime,
  author,
}: SEOProps) {
  const location = useLocation()

  const canonicalUrl = url ?? `${BASE_URL}${location.pathname}`
  const fullImageUrl = image.startsWith('http') ? image : `${BASE_URL}${image}`
  const fullTitle = title.includes('DMV DJ Sessions')
    ? title
    : `${title} | DMV DJ Sessions`

  useEffect(() => {
    // Update document title
    document.title = fullTitle

    // Update or create canonical link
    let canonicalLink = document.querySelector('link[rel="canonical"]')
    if (!canonicalLink) {
      canonicalLink = document.createElement('link')
      canonicalLink.setAttribute('rel', 'canonical')
      document.head.appendChild(canonicalLink)
    }
    canonicalLink.setAttribute('href', canonicalUrl)

    // Update meta tags helper
    const updateMetaTag = (name: string, content: string, isProperty = false) => {
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
    updateMetaTag('og:title', fullTitle, true)
    updateMetaTag('og:description', description, true)
    updateMetaTag('og:image', fullImageUrl, true)
    updateMetaTag('og:type', type, true)
    updateMetaTag('og:url', canonicalUrl, true)
    updateMetaTag('og:site_name', 'DMV DJ Sessions', true)

    // Article-specific OG tags
    if (type === 'article' || type === 'video') {
      if (publishedTime) {
        updateMetaTag('article:published_time', publishedTime, true)
      }
      if (modifiedTime) {
        updateMetaTag('article:modified_time', modifiedTime, true)
      }
      if (author) {
        updateMetaTag('article:author', author, true)
      }
    }

    // Twitter tags
    updateMetaTag('twitter:card', 'summary_large_image')
    updateMetaTag('twitter:title', fullTitle)
    updateMetaTag('twitter:description', description)
    updateMetaTag('twitter:image', fullImageUrl)
    updateMetaTag('twitter:site', '@dmvdjsessions')

    // Additional SEO meta tags
    updateMetaTag('robots', 'index, follow, max-image-preview:large')
    updateMetaTag('googlebot', 'index, follow')

  }, [fullTitle, description, keywords, fullImageUrl, canonicalUrl, type, publishedTime, modifiedTime, author])

  // Build schema array
  const schemas: JsonLdSchemaType[] = []
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
