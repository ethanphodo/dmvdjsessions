import { useEffect } from 'react'

function SEO({
  title = 'DMV DJ Sessions',
  description = 'High-quality DJ sessions spotlighting the next wave of DMV talent.',
  keywords = 'DJ, DMV, Washington DC, Maryland, Virginia, electronic music, house, techno',
  image = '/og-image.jpg',
  url,
}) {
  useEffect(() => {
    // Update document title
    document.title = title.includes('DMV DJ Sessions')
      ? title
      : `${title} | DMV DJ Sessions`

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
    updateMetaTag('og:image', image, true)
    updateMetaTag('og:type', 'website', true)
    if (url) updateMetaTag('og:url', url, true)

    // Twitter tags
    updateMetaTag('twitter:card', 'summary_large_image')
    updateMetaTag('twitter:title', title)
    updateMetaTag('twitter:description', description)
    updateMetaTag('twitter:image', image)

  }, [title, description, keywords, image, url])

  return null
}

export default SEO
