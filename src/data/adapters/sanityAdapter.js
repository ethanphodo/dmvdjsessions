/**
 * Sanity CMS Adapter (Template)
 *
 * This is a template for implementing the Sanity adapter.
 * To use:
 * 1. Install sanity client: npm install @sanity/client
 * 2. Set environment variables in .env
 * 3. Implement the methods below
 *
 * Configuration:
 * - VITE_SANITY_PROJECT_ID
 * - VITE_SANITY_DATASET
 * - VITE_SANITY_API_VERSION
 *
 * Schema Requirements:
 * - video: title, dj (ref), date, duration, genres, series, mood, thumbnail, embedUrl, description
 * - dj: name, slug, bio, image, genres, location, socials, featured
 * - event: title, date, time, location, address, lineup (refs), ticketUrl, type, description
 * - series: name, shortName, location, description, status, accentColor
 */

// Uncomment when implementing:
// import { createClient } from '@sanity/client'
// import imageUrlBuilder from '@sanity/image-url'

const config = {
  projectId: import.meta.env.VITE_SANITY_PROJECT_ID || '',
  dataset: import.meta.env.VITE_SANITY_DATASET || 'production',
  apiVersion: import.meta.env.VITE_SANITY_API_VERSION || '2024-01-01',
  useCdn: import.meta.env.PROD,
}

/**
 * GROQ Queries
 * Define reusable queries for Sanity
 */
const QUERIES = {
  allVideos: `*[_type == "video"] | order(date desc) {
    _id,
    title,
    "djId": dj->_id,
    "djName": dj->name,
    date,
    duration,
    genres,
    series,
    mood,
    "thumbnail": thumbnail.asset->url,
    embedUrl,
    embedType,
    views,
    description
  }`,

  videoById: `*[_type == "video" && _id == $id][0] {
    _id,
    title,
    "djId": dj->_id,
    "djName": dj->name,
    "dj": dj->{_id, name, slug, image},
    date,
    duration,
    genres,
    series,
    mood,
    "thumbnail": thumbnail.asset->url,
    embedUrl,
    embedType,
    views,
    description
  }`,

  allDJs: `*[_type == "dj"] | order(name asc) {
    _id,
    name,
    slug,
    bio,
    "image": image.asset->url,
    genres,
    location,
    socials,
    featured,
    status
  }`,

  djBySlug: `*[_type == "dj" && slug.current == $slug][0] {
    _id,
    name,
    "slug": slug.current,
    bio,
    "image": image.asset->url,
    genres,
    location,
    socials,
    featured,
    status
  }`,

  allEvents: `*[_type == "event"] | order(date asc) {
    _id,
    title,
    date,
    time,
    location,
    address,
    "lineup": lineup[]->_id,
    "lineupDetails": lineup[]->{_id, name, slug, image},
    ticketUrl,
    status,
    type,
    description,
    capacity
  }`,

  allSeries: `*[_type == "series"] {
    _id,
    name,
    shortName,
    location,
    description,
    longDescription,
    status,
    statusLabel,
    statusColor,
    accentColor,
    "image": image.asset->url
  }`,
}

/**
 * Sanity Adapter Class
 */
export class SanityAdapter {
  constructor() {
    this.name = 'sanity'

    // Uncomment when implementing:
    // this.client = createClient({
    //   projectId: config.projectId,
    //   dataset: config.dataset,
    //   apiVersion: config.apiVersion,
    //   useCdn: config.useCdn,
    // })

    // this.imageBuilder = imageUrlBuilder(this.client)

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
   * Build image URL with transformations
   */
  imageUrl(source) {
    // return this.imageBuilder.image(source)
    return source
  }

  /**
   * Map Sanity video to app model
   */
  mapVideo(doc) {
    if (!doc) return null

    return {
      id: doc._id,
      title: doc.title,
      djId: doc.djId,
      djName: doc.djName || 'Unknown',
      date: doc.date,
      duration: doc.duration,
      genres: doc.genres || [],
      series: doc.series,
      mood: doc.mood || [],
      thumbnail: doc.thumbnail,
      embedUrl: doc.embedUrl,
      embedType: doc.embedType || 'youtube',
      views: doc.views || 0,
      description: doc.description,
    }
  }

  /**
   * Map Sanity DJ to app model
   */
  mapDJ(doc) {
    if (!doc) return null

    return {
      id: doc._id,
      slug: doc.slug,
      name: doc.name,
      bio: doc.bio,
      image: doc.image,
      genres: doc.genres || [],
      location: doc.location,
      socials: doc.socials || {},
      featured: doc.featured || false,
      status: doc.status || 'active',
    }
  }

  /**
   * Map Sanity event to app model
   */
  mapEvent(doc) {
    if (!doc) return null

    return {
      id: doc._id,
      title: doc.title,
      date: doc.date,
      time: doc.time,
      location: doc.location,
      address: doc.address,
      lineup: doc.lineup || [],
      ticketUrl: doc.ticketUrl,
      status: doc.status || 'upcoming',
      type: doc.type,
      description: doc.description,
      capacity: doc.capacity,
    }
  }

  /**
   * Map Sanity series to app model
   */
  mapSeries(doc) {
    if (!doc) return null

    return {
      id: doc._id,
      name: doc.name,
      shortName: doc.shortName,
      location: doc.location,
      description: doc.description,
      longDescription: doc.longDescription,
      status: doc.status,
      statusLabel: doc.statusLabel,
      statusColor: doc.statusColor,
      accentColor: doc.accentColor,
      image: doc.image,
    }
  }

  // ==========================================
  // Videos/Sessions
  // ==========================================

  async getVideos(options = {}) {
    // TODO: Implement with Sanity client
    // const data = await this.client.fetch(QUERIES.allVideos)
    // return data.map(this.mapVideo)

    console.warn('[SanityAdapter] getVideos not implemented')
    return []
  }

  async getVideoById(id) {
    // TODO: Implement
    // const data = await this.client.fetch(QUERIES.videoById, { id })
    // return this.mapVideo(data)

    console.warn('[SanityAdapter] getVideoById not implemented')
    return null
  }

  async getVideosByDJ(djId) {
    // TODO: Implement
    console.warn('[SanityAdapter] getVideosByDJ not implemented')
    return []
  }

  async getVideosBySeries(series) {
    // TODO: Implement
    console.warn('[SanityAdapter] getVideosBySeries not implemented')
    return []
  }

  async getLatestVideos(limit = 5) {
    // TODO: Implement
    console.warn('[SanityAdapter] getLatestVideos not implemented')
    return []
  }

  async getRelatedVideos(videoId, limit = 4) {
    // TODO: Implement
    console.warn('[SanityAdapter] getRelatedVideos not implemented')
    return []
  }

  // ==========================================
  // DJs
  // ==========================================

  async getDJs(options = {}) {
    // TODO: Implement
    console.warn('[SanityAdapter] getDJs not implemented')
    return []
  }

  async getDJById(id) {
    // TODO: Implement
    console.warn('[SanityAdapter] getDJById not implemented')
    return null
  }

  async getDJBySlug(slug) {
    // TODO: Implement
    // const data = await this.client.fetch(QUERIES.djBySlug, { slug })
    // return this.mapDJ(data)

    console.warn('[SanityAdapter] getDJBySlug not implemented')
    return null
  }

  async getFeaturedDJs() {
    // TODO: Implement
    console.warn('[SanityAdapter] getFeaturedDJs not implemented')
    return []
  }

  // ==========================================
  // Events
  // ==========================================

  async getEvents(options = {}) {
    // TODO: Implement
    console.warn('[SanityAdapter] getEvents not implemented')
    return []
  }

  async getEventById(id) {
    // TODO: Implement
    console.warn('[SanityAdapter] getEventById not implemented')
    return null
  }

  async getUpcomingEvents() {
    // TODO: Implement
    console.warn('[SanityAdapter] getUpcomingEvents not implemented')
    return []
  }

  async getPastEvents() {
    // TODO: Implement
    console.warn('[SanityAdapter] getPastEvents not implemented')
    return []
  }

  // ==========================================
  // Series
  // ==========================================

  async getSeries() {
    // TODO: Implement
    console.warn('[SanityAdapter] getSeries not implemented')
    return []
  }

  async getSeriesById(id) {
    // TODO: Implement
    console.warn('[SanityAdapter] getSeriesById not implemented')
    return null
  }

  // ==========================================
  // Stats
  // ==========================================

  async getStats() {
    // TODO: Implement - aggregate from videos
    console.warn('[SanityAdapter] getStats not implemented')
    return {
      sessions: 0,
      totalMinutes: 0,
      totalHours: 0,
      artists: 0,
      series: 0,
    }
  }
}

export default SanityAdapter
