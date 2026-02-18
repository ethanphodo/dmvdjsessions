/**
 * CMS Data Adapter Factory
 *
 * This module provides a unified interface for fetching content from
 * different sources (local, Contentful, Sanity). Components use the
 * same API regardless of the data source.
 *
 * Configuration:
 * - Set VITE_CMS_PROVIDER in .env to 'local', 'contentful', or 'sanity'
 *
 * Usage:
 * import { getAdapter } from './data/adapters'
 * const adapter = getAdapter()
 * const videos = await adapter.getVideos()
 */

// Import adapters
import { LocalAdapter } from './localAdapter'
// These will be implemented when CMS is configured
// import { ContentfulAdapter } from './contentfulAdapter'
// import { SanityAdapter } from './sanityAdapter'

// Configuration
const config = {
  provider: import.meta.env.VITE_CMS_PROVIDER || 'local',
}

// Adapter instance cache
let adapterInstance = null

/**
 * Data Adapter Interface
 * All adapters must implement these methods
 */
export const AdapterInterface = {
  // Videos/Sessions
  getVideos: async () => [],
  getVideoById: async (id) => null,
  getVideosByDJ: async (djId) => [],
  getVideosBySeries: async (series) => [],
  getLatestVideos: async (limit) => [],
  getRelatedVideos: async (videoId, limit) => [],

  // DJs
  getDJs: async () => [],
  getDJById: async (id) => null,
  getDJBySlug: async (slug) => null,
  getFeaturedDJs: async () => [],

  // Events
  getEvents: async () => [],
  getEventById: async (id) => null,
  getUpcomingEvents: async () => [],
  getPastEvents: async () => [],

  // Series
  getSeries: async () => [],
  getSeriesById: async (id) => null,

  // Stats
  getStats: async () => ({}),
}

/**
 * Get the configured data adapter
 * Returns a singleton instance
 */
export const getAdapter = () => {
  if (adapterInstance) {
    return adapterInstance
  }

  switch (config.provider) {
    case 'contentful':
      // Check if Contentful is configured
      if (import.meta.env.VITE_CONTENTFUL_SPACE_ID) {
        console.log('[DataAdapter] Using Contentful adapter')
        // adapterInstance = new ContentfulAdapter()
        // For now, fall back to local
        console.warn('[DataAdapter] Contentful adapter not yet implemented, using local')
        adapterInstance = new LocalAdapter()
      } else {
        console.warn('[DataAdapter] Contentful not configured, falling back to local')
        adapterInstance = new LocalAdapter()
      }
      break

    case 'sanity':
      // Check if Sanity is configured
      if (import.meta.env.VITE_SANITY_PROJECT_ID) {
        console.log('[DataAdapter] Using Sanity adapter')
        // adapterInstance = new SanityAdapter()
        // For now, fall back to local
        console.warn('[DataAdapter] Sanity adapter not yet implemented, using local')
        adapterInstance = new LocalAdapter()
      } else {
        console.warn('[DataAdapter] Sanity not configured, falling back to local')
        adapterInstance = new LocalAdapter()
      }
      break

    case 'local':
    default:
      console.log('[DataAdapter] Using local adapter')
      adapterInstance = new LocalAdapter()
      break
  }

  return adapterInstance
}

/**
 * Reset the adapter instance
 * Useful for testing or switching adapters at runtime
 */
export const resetAdapter = () => {
  adapterInstance = null
}

/**
 * Get the current adapter provider name
 */
export const getAdapterProvider = () => config.provider

export default getAdapter
