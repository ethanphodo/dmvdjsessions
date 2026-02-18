/**
 * Local Data Adapter
 *
 * Wraps the existing local data files (videos.js, djs.js, events.js, series.js)
 * with the unified adapter interface. This allows the same API to be used
 * regardless of whether data comes from local files or a CMS.
 */

import {
  videos,
  getVideoById as _getVideoById,
  getVideosByDJ as _getVideosByDJ,
  getVideosBySeries as _getVideosBySeries,
  getVideosByGenre as _getVideosByGenre,
  getVideosByMood as _getVideosByMood,
  getLatestVideos as _getLatestVideos,
  getStats as _getStats,
  getRelatedVideos as _getRelatedVideos,
} from '../videos'

import {
  djs,
  getDJById as _getDJById,
  getDJBySlug as _getDJBySlug,
  getFeaturedDJs as _getFeaturedDJs,
  getDJsByGenre as _getDJsByGenre,
  getDJsByLocation as _getDJsByLocation,
  getAllDJs as _getAllDJs,
} from '../djs'

import {
  events,
  getEventById as _getEventById,
  getUpcomingEvents as _getUpcomingEvents,
  getPastEvents as _getPastEvents,
  getEventsByType as _getEventsByType,
} from '../events'

import {
  seriesData,
  getSeriesById as _getSeriesById,
  getActiveSeries as _getActiveSeries,
  getPlannedSeries as _getPlannedSeries,
} from '../series'

/**
 * Local Adapter Class
 * Implements the data adapter interface using local data files
 */
export class LocalAdapter {
  constructor() {
    this.name = 'local'
  }

  // ==========================================
  // Videos/Sessions
  // ==========================================

  async getVideos(options = {}) {
    const { genre, series, mood, search, limit } = options

    let result = [...videos]

    if (genre) {
      result = result.filter((v) => v.genres.includes(genre))
    }

    if (series) {
      result = result.filter((v) => v.series === series)
    }

    if (mood) {
      result = result.filter((v) => v.mood.includes(mood))
    }

    if (search) {
      const searchLower = search.toLowerCase()
      result = result.filter(
        (v) =>
          v.title.toLowerCase().includes(searchLower) ||
          v.djName.toLowerCase().includes(searchLower) ||
          v.description.toLowerCase().includes(searchLower)
      )
    }

    if (limit) {
      result = result.slice(0, limit)
    }

    return result
  }

  async getVideoById(id) {
    return _getVideoById(id)
  }

  async getVideosByDJ(djId) {
    return _getVideosByDJ(djId)
  }

  async getVideosBySeries(series) {
    return _getVideosBySeries(series)
  }

  async getVideosByGenre(genre) {
    return _getVideosByGenre(genre)
  }

  async getVideosByMood(mood) {
    return _getVideosByMood(mood)
  }

  async getLatestVideos(limit = 5) {
    return _getLatestVideos(limit)
  }

  async getRelatedVideos(videoId, limit = 4) {
    return _getRelatedVideos(videoId, limit)
  }

  // ==========================================
  // DJs
  // ==========================================

  async getDJs(options = {}) {
    const { genre, location, featured, limit } = options

    let result = [...djs]

    if (genre) {
      result = result.filter((dj) => dj.genres.includes(genre))
    }

    if (location) {
      result = result.filter((dj) =>
        dj.location.toLowerCase().includes(location.toLowerCase())
      )
    }

    if (featured !== undefined) {
      result = result.filter((dj) => dj.featured === featured)
    }

    if (limit) {
      result = result.slice(0, limit)
    }

    return result
  }

  async getDJById(id) {
    return _getDJById(id)
  }

  async getDJBySlug(slug) {
    return _getDJBySlug(slug)
  }

  async getFeaturedDJs() {
    return _getFeaturedDJs()
  }

  async getDJsByGenre(genre) {
    return _getDJsByGenre(genre)
  }

  async getDJsByLocation(location) {
    return _getDJsByLocation(location)
  }

  async getAllDJs() {
    return _getAllDJs()
  }

  // Get DJ with their videos
  async getDJWithVideos(slug) {
    const dj = await this.getDJBySlug(slug)
    if (!dj) return null

    const djVideos = await this.getVideosByDJ(dj.id)
    return { ...dj, videos: djVideos }
  }

  // ==========================================
  // Events
  // ==========================================

  async getEvents(options = {}) {
    const { type, upcoming, limit } = options

    let result = [...events]

    if (type) {
      result = result.filter((e) => e.type === type)
    }

    if (upcoming === true) {
      result = _getUpcomingEvents()
    } else if (upcoming === false) {
      result = _getPastEvents()
    }

    if (limit) {
      result = result.slice(0, limit)
    }

    return result
  }

  async getEventById(id) {
    return _getEventById(id)
  }

  async getUpcomingEvents() {
    return _getUpcomingEvents()
  }

  async getPastEvents() {
    return _getPastEvents()
  }

  async getEventsByType(type) {
    return _getEventsByType(type)
  }

  // Get event with DJ details populated
  async getEventWithDJs(id) {
    const event = await this.getEventById(id)
    if (!event) return null

    const djDetails = await Promise.all(
      event.lineup.map((djId) => this.getDJById(djId))
    )

    return { ...event, djDetails: djDetails.filter(Boolean) }
  }

  // ==========================================
  // Series
  // ==========================================

  async getSeries() {
    return [...seriesData]
  }

  async getSeriesById(id) {
    return _getSeriesById(id)
  }

  async getActiveSeries() {
    return _getActiveSeries()
  }

  async getPlannedSeries() {
    return _getPlannedSeries()
  }

  // Get series with videos
  async getSeriesWithVideos(id) {
    const series = await this.getSeriesById(id)
    if (!series) return null

    const seriesVideos = await this.getVideosBySeries(id)
    return { ...series, videos: seriesVideos }
  }

  // ==========================================
  // Stats
  // ==========================================

  async getStats() {
    return _getStats()
  }

  // ==========================================
  // Search
  // ==========================================

  async search(query, options = {}) {
    const { types = ['videos', 'djs', 'events'], limit = 10 } = options
    const queryLower = query.toLowerCase()
    const results = {}

    if (types.includes('videos')) {
      results.videos = videos
        .filter(
          (v) =>
            v.title.toLowerCase().includes(queryLower) ||
            v.djName.toLowerCase().includes(queryLower) ||
            v.description.toLowerCase().includes(queryLower)
        )
        .slice(0, limit)
    }

    if (types.includes('djs')) {
      results.djs = djs
        .filter(
          (dj) =>
            dj.name.toLowerCase().includes(queryLower) ||
            dj.bio.toLowerCase().includes(queryLower) ||
            dj.genres.some((g) => g.toLowerCase().includes(queryLower))
        )
        .slice(0, limit)
    }

    if (types.includes('events')) {
      results.events = events
        .filter(
          (e) =>
            e.title.toLowerCase().includes(queryLower) ||
            e.description.toLowerCase().includes(queryLower) ||
            e.location.toLowerCase().includes(queryLower)
        )
        .slice(0, limit)
    }

    return results
  }
}

export default LocalAdapter
