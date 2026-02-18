/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_CMS_PROVIDER?: 'local' | 'contentful' | 'sanity'
  readonly VITE_SENTRY_DSN?: string
  readonly VITE_GA_MEASUREMENT_ID?: string
  readonly VITE_PLAUSIBLE_DOMAIN?: string
  readonly VITE_APP_URL?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
