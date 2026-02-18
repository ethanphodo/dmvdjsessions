/**
 * Common/Shared Types
 * Utility types used across the application
 */

import type { ReactNode, ComponentPropsWithoutRef, ElementType } from 'react'

/**
 * Async operation state
 */
export interface AsyncState<T> {
  data: T | null
  loading: boolean
  error: Error | null
}

/**
 * Pagination state
 */
export interface PaginationState {
  page: number
  pageSize: number
  totalItems: number
  totalPages: number
}

/**
 * Search result
 */
export interface SearchResult<T> {
  items: T[]
  query: string
  totalResults: number
}

/**
 * Theme modes
 */
export type ThemeMode = 'light' | 'dark' | 'system'

/**
 * Locale codes
 */
export type Locale = 'en' | 'es'

/**
 * Toast notification types
 */
export type ToastType = 'success' | 'error' | 'warning' | 'info'

export interface Toast {
  id: string
  type: ToastType
  message: string
  duration?: number
}

/**
 * Form validation
 */
export interface ValidationRule {
  required?: boolean
  minLength?: number
  maxLength?: number
  pattern?: RegExp
  custom?: (value: unknown) => boolean
  message: string
}

export interface FieldValidation {
  [fieldName: string]: ValidationRule[]
}

export interface FormErrors {
  [fieldName: string]: string[]
}

/**
 * Polymorphic component props
 * Allows a component to render as different elements while maintaining type safety
 */
export type PolymorphicProps<E extends ElementType, P = object> = P &
  Omit<ComponentPropsWithoutRef<E>, keyof P> & {
    as?: E
  }

/**
 * Children prop helper
 */
export interface WithChildren {
  children: ReactNode
}

/**
 * Optional children prop helper
 */
export interface WithOptionalChildren {
  children?: ReactNode
}

/**
 * Class name prop helper
 */
export interface WithClassName {
  className?: string
}

/**
 * User preferences for personalization
 */
export interface UserPreferences {
  theme: ThemeMode
  locale: Locale
  favoriteGenres: string[]
  viewedSessions: string[]
  favoriteDJs: string[]
  lastVisitedPages: string[]
  notificationsEnabled: boolean
}

/**
 * Analytics event
 */
export interface AnalyticsEvent {
  name: string
  category: string
  properties?: Record<string, unknown>
  timestamp?: number
}

/**
 * API response wrapper
 */
export interface ApiResponse<T> {
  data: T
  success: boolean
  message?: string
  errors?: string[]
}

/**
 * Navigation link
 */
export interface NavLink {
  label: string
  href: string
  icon?: ReactNode
  isExternal?: boolean
}

/**
 * SEO metadata
 */
export interface SEOMetadata {
  title: string
  description: string
  keywords?: string[]
  image?: string
  url?: string
  type?: 'website' | 'article' | 'video' | 'profile'
}
