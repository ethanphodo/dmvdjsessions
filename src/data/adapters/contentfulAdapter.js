/**
 * Contentful CMS Adapter (Template)
 *
 * This is a template for implementing the Contentful adapter.
 * To use:
 * 1. Install contentful SDK: npm install contentful
 * 2. Set environment variables in .env
 * 3. Implement the methods below
 *
 * Configuration:
 * - VITE_CONTENTFUL_SPACE_ID
 * - VITE_CONTENTFUL_ACCESS_TOKEN
 * - VITE_CONTENTFUL_PREVIEW_TOKEN (optional, for preview mode)
 *
 * Content Model Requirements:
 * - video: title, djRef, date, duration, genres, series, mood, thumbnail, embedUrl, description
 * - dj: name, slug, bio, image, genres, location, socials, featured
 * - event: title, date, time, location, address, lineup (refs), ticketUrl, type, description
 * - series: name, shortName, location, description, status, accentColor
 */

// Uncomment when implementing:
// import { createClient } from 'contentful'

const config = {
  spaceId: import.meta.env.VITE_CONTENTFUL_SPACE_ID || '',
  accessToken: import.meta.env.VITE_CONTENTFUL_ACCESS_TOKEN || '',
  previewToken: import.meta.env.VITE_CONTENTFUL_PREVIEW_TOKEN || '',
  environment: import.meta.env.VITE_CONTENTFUL_ENVIRONMENT || 'master',
}

/**
 * Contentful Adapter Class
 *
 * Implementation guide:
 * 1. Create client in constructor
 * 2. Map Contentful entry fields to your data model
 * 3. Handle references (linked entries)
 * 4. Implement caching for performance
 */
export class ContentfulAdapter {
  constructor(preview = false) {
    this.name = 'contentful'
    this.preview = preview

    // Uncomment when implementing:
    // this.client = createClient({
    //   space: config.spaceId,
    //   accessToken: preview ? config.previewToken : config.accessToken,
    //   host: preview ? 'preview.contentful.com' : 'cdn.contentful.com',
    // })

    // Simple cache
    this.cache = new Map()
    this.cacheTimeout = 5 * 60 * 1000 // 5 minutes
  }

  // ==========================================
  // Helper Methods
  // ==========================================

  /**
   * Get cached data or fetch new
   */
  async getCached(key, fetchFn) {
    const cached = this.cache.get(key)
    if (cached && Date.now() - cached.timestamp < this.cacheTimeout) {
      return cached.data
    }

    const data = await fetchFn()
    this.cache.set(key, { data, timestamp: Date.now() })
    return data
  }

  /**
   * Clear cache
   */
  clearCache() {
    this.cache.clear()
  }

  /**
   * Map Contentful video entry to app model
   */
  mapVideo(entry) {
    if (!entry) return null

    const fields = entry.fields
    return {
      id: entry.sys.id,
      title: fields.title,
      djId: fields.dj?.sys?.id,
      djName: fields.dj?.fields?.name || 'Unknown',
      date: fields.date,
      duration: fields.duration,
      genres: fields.genres || [],
      series: fields.series,
      mood: fields.mood || [],
      thumbnail: fields.thumbnail?.fields?.file?.url
        ? `https:${fields.thumbnail.fields.file.url}`
        : null,
      embedUrl: fields.embedUrl,
      embedType: fields.embedType || 'youtube',
      views: fields.views || 0,
      description: fields.description,
    }
  }

  /**
   * Map Contentful DJ entry to app model
   */
  mapDJ(entry) {
    if (!entry) return null

    const fields = entry.fields
    return {
      id: entry.sys.id,
      slug: fields.slug,
      name: fields.name,
      bio: fields.bio,
      image: fields.image?.fields?.file?.url
        ? `https:${fields.image.fields.file.url}`
        : null,
      genres: fields.genres || [],
      location: fields.location,
      socials: {
        instagram: fields.instagram,
        soundcloud: fields.soundcloud,
        mixcloud: fields.mixcloud,
        spotify: fields.spotify,
      },
      featured: fields.featured || false,
      status: fields.status || 'active',
    }
  }

  /**
   * Map Contentful event entry to app model
   */
  mapEvent(entry) {
    if (!entry) return null

    const fields = entry.fields
    return {
      id: entry.sys.id,
      title: fields.title,
      date: fields.date,
      time: fields.time,
      location: fields.location,
      address: fields.address,
      lineup: fields.lineup?.map((dj) => dj.sys.id) || [],
      ticketUrl: fields.ticketUrl,
      status: fields.status || 'upcoming',
      type: fields.type,
      description: fields.description,
      capacity: fields.capacity,
    }
  }

  /**
   * Map Contentful series entry to app model
   */
  mapSeries(entry) {
    if (!entry) return null

    const fields = entry.fields
    return {
      id: entry.sys.id,
      name: fields.name,
      shortName: fields.shortName,
      location: fields.location,
      description: fields.description,
      longDescription: fields.longDescription,
      status: fields.status,
      statusLabel: fields.statusLabel,
      statusColor: fields.statusColor,
      accentColor: fields.accentColor,
      image: fields.image?.fields?.file?.url
        ? `https:${fields.image.fields.file.url}`
        : null,
    }
  }

  // ==========================================
  // Videos/Sessions
  // ==========================================

  async getVideos(options = {}) {
    // TODO: Implement with Contentful SDK
    // const entries = await this.client.getEntries({
    //   content_type: 'video',
    //   include: 2,
    //   ...options,
    // })
    // return entries.items.map(this.mapVideo)

    console.warn('[ContentfulAdapter] getVideos not implemented')
    return []
  }

  async getVideoById(id) {
    // TODO: Implement
    console.warn('[ContentfulAdapter] getVideoById not implemented')
    return null
  }

  async getVideosByDJ(djId) {
    // TODO: Implement
    console.warn('[ContentfulAdapter] getVideosByDJ not implemented')
    return []
  }

  async getVideosBySeries(series) {
    // TODO: Implement
    console.warn('[ContentfulAdapter] getVideosBySeries not implemented')
    return []
  }

  async getLatestVideos(limit = 5) {
    // TODO: Implement
    console.warn('[ContentfulAdapter] getLatestVideos not implemented')
    return []
  }

  async getRelatedVideos(videoId, limit = 4) {
    // TODO: Implement
    console.warn('[ContentfulAdapter] getRelatedVideos not implemented')
    return []
  }

  // ==========================================
  // DJs
  // ==========================================

  async getDJs(options = {}) {
    // TODO: Implement
    console.warn('[ContentfulAdapter] getDJs not implemented')
    return []
  }

  async getDJById(id) {
    // TODO: Implement
    console.warn('[ContentfulAdapter] getDJById not implemented')
    return null
  }

  async getDJBySlug(slug) {
    // TODO: Implement
    console.warn('[ContentfulAdapter] getDJBySlug not implemented')
    return null
  }

  async getFeaturedDJs() {
    // TODO: Implement
    console.warn('[ContentfulAdapter] getFeaturedDJs not implemented')
    return []
  }

  // ==========================================
  // Events
  // ==========================================

  async getEvents(options = {}) {
    // TODO: Implement
    console.warn('[ContentfulAdapter] getEvents not implemented')
    return []
  }

  async getEventById(id) {
    // TODO: Implement
    console.warn('[ContentfulAdapter] getEventById not implemented')
    return null
  }

  async getUpcomingEvents() {
    // TODO: Implement
    console.warn('[ContentfulAdapter] getUpcomingEvents not implemented')
    return []
  }

  async getPastEvents() {
    // TODO: Implement
    console.warn('[ContentfulAdapter] getPastEvents not implemented')
    return []
  }

  // ==========================================
  // Series
  // ==========================================

  async getSeries() {
    // TODO: Implement
    console.warn('[ContentfulAdapter] getSeries not implemented')
    return []
  }

  async getSeriesById(id) {
    // TODO: Implement
    console.warn('[ContentfulAdapter] getSeriesById not implemented')
    return null
  }

  // ==========================================
  // Stats
  // ==========================================

  async getStats() {
    // TODO: Implement - aggregate from videos
    console.warn('[ContentfulAdapter] getStats not implemented')
    return {
      sessions: 0,
      totalMinutes: 0,
      totalHours: 0,
      artists: 0,
      series: 0,
    }
  }
}

export default ContentfulAdapter
