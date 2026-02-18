import type { Series } from '../types'

export const seriesData: Series[] = [
  {
    id: 'studio',
    name: 'Studio Sessions',
    shortName: 'STUDIO',
    location: 'Washington DC',
    description: 'Intimate loft recordings with warm, amber lighting and raw, unfiltered performances.',
    longDescription: 'Our flagship series recorded in a converted DC loft space. Each studio session features one artist, one hour, and one uninterrupted journey through sound. The warm amber lighting and minimal setup lets the music speak for itself.',
    status: 'active',
    statusLabel: 'ACTIVE',
    statusColor: '#E21D1D',
    accentColor: 'amber',
    episodeCount: 8,
    image: '/images/series/studio.jpg',
  },
  {
    id: 'warehouse',
    name: 'Warehouse Sessions',
    shortName: 'WAREHOUSE',
    location: 'Maryland',
    description: 'Raw industrial spaces with electric energy and driving beats.',
    longDescription: 'Taking over abandoned warehouses in Maryland for high-energy sessions. Expect harder sounds, industrial aesthetics, and an underground atmosphere that pushes boundaries.',
    status: 'planned',
    statusLabel: 'COMING SOON',
    statusColor: '#888888',
    accentColor: 'blue',
    episodeCount: 0,
    image: '/images/series/warehouse.jpg',
  },
  {
    id: 'rooftop',
    name: 'Rooftop Sessions',
    shortName: 'ROOFTOP',
    location: 'Virginia',
    description: 'Golden hour sets with stunning city views and sunset vibes.',
    longDescription: 'Summer series on Virginia rooftops, capturing the magic of golden hour with melodic selections and breathtaking views of the DMV skyline.',
    status: 'planned',
    statusLabel: 'SUMMER 2024',
    statusColor: '#888888',
    accentColor: 'orange',
    episodeCount: 0,
    image: '/images/series/rooftop.jpg',
  },
]

export const getSeriesById = (id: string): Series | undefined =>
  seriesData.find((series) => series.id === id)

export const getActiveSeries = (): Series[] =>
  seriesData.filter((series) => series.status === 'active')

export const getPlannedSeries = (): Series[] =>
  seriesData.filter((series) => series.status === 'planned')
