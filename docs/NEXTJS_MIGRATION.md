# Next.js Migration Guide

This document outlines the migration path from the current Vite + React setup to Next.js for improved SEO through Server-Side Rendering (SSR) and Static Site Generation (SSG).

## Why Migrate to Next.js?

### Current Limitations (Vite + React SPA)
- **SEO**: Search engines may not fully index JavaScript-rendered content
- **Social Sharing**: OG tags are set via JavaScript, which some crawlers don't execute
- **Performance**: Initial page load requires downloading and executing JS before content appears
- **Caching**: Limited edge caching options for dynamic content

### Next.js Benefits
- **SSR/SSG**: Pre-rendered HTML for better SEO and faster initial load
- **Automatic Code Splitting**: Each page only loads necessary code
- **Image Optimization**: Built-in `next/image` with automatic WebP/AVIF
- **API Routes**: Built-in backend for form handling
- **Edge Caching**: Automatic CDN caching with ISR (Incremental Static Regeneration)
- **Better Developer Experience**: Fast refresh, built-in TypeScript support

---

## Migration Checklist

### Phase 1: Setup (Day 1)
- [ ] Initialize Next.js project
- [ ] Configure Tailwind CSS
- [ ] Set up environment variables
- [ ] Install dependencies

### Phase 2: Pages (Days 2-3)
- [ ] Convert pages from React Router to file-based routing
- [ ] Implement layouts (root layout, nested layouts)
- [ ] Set up dynamic routes for sessions and DJs
- [ ] Add loading and error states

### Phase 3: Components (Day 4)
- [ ] Move components (mostly unchanged)
- [ ] Convert `<Link>` from react-router-dom to next/link
- [ ] Update image components to use next/image
- [ ] Handle client-side only components with 'use client'

### Phase 4: Data Fetching (Day 5)
- [ ] Convert useEffect data fetching to Server Components
- [ ] Implement ISR for semi-static pages
- [ ] Set up API routes for dynamic data
- [ ] Migrate to React Server Components where appropriate

### Phase 5: SEO & Metadata (Day 6)
- [ ] Implement generateMetadata for dynamic SEO
- [ ] Add JSON-LD structured data
- [ ] Generate dynamic sitemap
- [ ] Set up OG image generation

### Phase 6: Testing & Deployment (Day 7)
- [ ] Run Lighthouse audits
- [ ] Test all routes
- [ ] Configure Vercel deployment
- [ ] Set up redirects from old URLs

---

## File Structure Comparison

### Current Structure (Vite + React Router)
```
src/
├── components/
├── pages/
│   ├── HomePage.jsx
│   ├── WatchPage.jsx
│   ├── SessionDetailPage.jsx
│   ├── DJProfilePage.jsx
│   └── ...
├── data/
├── hooks/
├── utils/
├── App.jsx          # Router setup
├── main.jsx         # Entry point
└── index.css
```

### Next.js Structure (App Router)
```
app/
├── layout.jsx                 # Root layout (replaces App.jsx)
├── page.jsx                   # Home page (/)
├── loading.jsx                # Loading UI
├── error.jsx                  # Error UI
├── not-found.jsx              # 404 page
├── sessions/
│   ├── page.jsx               # /sessions
│   └── [id]/
│       └── page.jsx           # /sessions/:id
├── dj/
│   └── [slug]/
│       └── page.jsx           # /dj/:slug
├── events/
│   └── page.jsx               # /events
├── submit/
│   └── page.jsx               # /submit
├── about/
│   └── page.jsx               # /about
├── privacy/
│   └── page.jsx               # /privacy
├── api/                       # API routes
│   ├── contact/
│   │   └── route.js
│   └── newsletter/
│       └── route.js
└── sitemap.js                 # Dynamic sitemap
components/                    # Shared components (unchanged)
lib/                           # Utilities (renamed from utils/)
data/                          # Data layer (unchanged)
hooks/                         # Custom hooks (unchanged)
public/                        # Static assets (unchanged)
```

---

## Code Migration Examples

### 1. Page Component Migration

**Before (React Router):**
```jsx
// src/pages/SessionDetailPage.jsx
import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { getVideoById, getRelatedVideos } from '../data/videos'
import SEO from '../components/SEO'

export default function SessionDetailPage() {
  const { id } = useParams()
  const [video, setVideo] = useState(null)
  const [related, setRelated] = useState([])

  useEffect(() => {
    setVideo(getVideoById(id))
    setRelated(getRelatedVideos(id, 4))
  }, [id])

  if (!video) return <Loading />

  return (
    <>
      <SEO title={video.title} description={video.description} />
      <VideoPlayer video={video} />
      <RelatedVideos videos={related} />
    </>
  )
}
```

**After (Next.js App Router):**
```jsx
// app/sessions/[id]/page.jsx
import { getVideoById, getRelatedVideos } from '@/data/videos'
import { notFound } from 'next/navigation'
import VideoPlayer from '@/components/video/VideoPlayer'
import RelatedVideos from '@/components/video/RelatedVideos'

// Generate static params for SSG
export async function generateStaticParams() {
  const videos = await getVideos()
  return videos.map((video) => ({ id: video.id }))
}

// Generate metadata for SEO
export async function generateMetadata({ params }) {
  const video = await getVideoById(params.id)
  if (!video) return {}

  return {
    title: `${video.title} | DMV DJ Sessions`,
    description: video.description,
    openGraph: {
      title: video.title,
      description: video.description,
      images: [video.thumbnail],
      type: 'video.other',
    },
  }
}

// Server Component - no 'use client' needed
export default async function SessionDetailPage({ params }) {
  const video = await getVideoById(params.id)

  if (!video) {
    notFound()
  }

  const related = await getRelatedVideos(params.id, 4)

  return (
    <>
      <VideoPlayer video={video} />
      <RelatedVideos videos={related} />
    </>
  )
}
```

### 2. Layout Migration

**Before (App.jsx):**
```jsx
// src/App.jsx
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-black">
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            {/* ... */}
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  )
}
```

**After (layout.jsx):**
```jsx
// app/layout.jsx
import { Inter } from 'next/font/google'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import { ToastProvider } from '@/components/ui/Toast'
import '@/styles/globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: {
    default: 'DMV DJ Sessions',
    template: '%s | DMV DJ Sessions',
  },
  description: 'High-quality DJ sessions...',
  // ... more metadata
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className} min-h-screen bg-black`}>
        <ToastProvider>
          <Navbar />
          <main>{children}</main>
          <Footer />
        </ToastProvider>
      </body>
    </html>
  )
}
```

### 3. Link Component Migration

**Before:**
```jsx
import { Link } from 'react-router-dom'

<Link to="/sessions">Sessions</Link>
<Link to={`/dj/${dj.slug}`}>{dj.name}</Link>
```

**After:**
```jsx
import Link from 'next/link'

<Link href="/sessions">Sessions</Link>
<Link href={`/dj/${dj.slug}`}>{dj.name}</Link>
```

### 4. Image Component Migration

**Before:**
```jsx
<img
  src={thumbnail}
  alt={title}
  loading="lazy"
  className="w-full h-full object-cover"
/>
```

**After:**
```jsx
import Image from 'next/image'

<Image
  src={thumbnail}
  alt={title}
  fill
  sizes="(max-width: 768px) 100vw, 50vw"
  className="object-cover"
/>
```

### 5. Client-Side Components

Some components need interactivity and must be marked as client components:

```jsx
// components/ui/VideoModal.jsx
'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function VideoModal({ video, onClose }) {
  // ... client-side logic
}
```

**Components that need 'use client':**
- Forms with state (TalentForm, PartnerForm, NewsletterSignup)
- Modals (VideoModal, CookieConsent)
- Interactive UI (FilterBar, Tabs)
- Animation-heavy components (Hero, ScrubText)
- Hooks using browser APIs (useScroll, useInView)

### 6. API Routes for Form Handling

**Create API route:**
```jsx
// app/api/contact/route.js
import { NextResponse } from 'next/server'

export async function POST(request) {
  const data = await request.json()

  // Validate input
  if (!data.email || !data.name) {
    return NextResponse.json(
      { error: 'Missing required fields' },
      { status: 400 }
    )
  }

  // Process form (send email, save to database, etc.)
  // ...

  return NextResponse.json({ success: true })
}
```

**Use in component:**
```jsx
'use client'

async function handleSubmit(formData) {
  const response = await fetch('/api/contact', {
    method: 'POST',
    body: JSON.stringify(formData),
  })
  const result = await response.json()
  // ...
}
```

### 7. Dynamic Sitemap

```jsx
// app/sitemap.js
import { videos } from '@/data/videos'
import { djs } from '@/data/djs'

const BASE_URL = 'https://dmvdjsessions.com'

export default async function sitemap() {
  const staticPages = [
    { url: BASE_URL, lastModified: new Date(), priority: 1 },
    { url: `${BASE_URL}/sessions`, lastModified: new Date(), priority: 0.9 },
    { url: `${BASE_URL}/events`, lastModified: new Date(), priority: 0.8 },
    // ...
  ]

  const sessionPages = videos.map((video) => ({
    url: `${BASE_URL}/sessions/${video.id}`,
    lastModified: new Date(video.date),
    priority: 0.8,
  }))

  const djPages = djs.map((dj) => ({
    url: `${BASE_URL}/dj/${dj.slug}`,
    lastModified: new Date(),
    priority: 0.7,
  }))

  return [...staticPages, ...sessionPages, ...djPages]
}
```

---

## Environment Variables

**Next.js uses different naming:**
```env
# .env.local (Next.js)

# Public variables (accessible in browser)
NEXT_PUBLIC_ANALYTICS_PROVIDER=plausible
NEXT_PUBLIC_GA4_ID=G-XXXXXXXXXX
NEXT_PUBLIC_SENTRY_DSN=https://...

# Server-only variables
CONTENTFUL_SPACE_ID=...
CONTENTFUL_ACCESS_TOKEN=...
SENTRY_AUTH_TOKEN=...
```

---

## Deployment Configuration

**next.config.js:**
```js
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['res.cloudinary.com', 'images.ctfassets.net'],
    formats: ['image/avif', 'image/webp'],
  },
  async redirects() {
    return [
      // Redirect old paths if needed
      { source: '/watch', destination: '/sessions', permanent: true },
    ]
  },
}

module.exports = nextConfig
```

---

## Incremental Migration Strategy

If a full migration is too risky, consider an incremental approach:

1. **Deploy Next.js alongside Vite**: Run both apps, route specific paths to Next.js
2. **Migrate page by page**: Start with SEO-critical pages (sessions, DJ profiles)
3. **Share components**: Keep components in a shared package
4. **Gradual transition**: Move traffic to Next.js as pages are migrated

---

## Estimated Timeline

| Phase | Tasks | Duration |
|-------|-------|----------|
| Setup | Initialize project, configure tooling | 1 day |
| Pages | Migrate all page components | 2 days |
| Components | Adapt components, fix imports | 1 day |
| Data | Implement server-side data fetching | 1 day |
| SEO | Metadata, sitemap, structured data | 1 day |
| Testing | QA, performance testing, deployment | 1 day |

**Total: ~7 days** for a complete migration

---

## Commands Reference

```bash
# Create new Next.js project
npx create-next-app@latest dmvdjsessions-next --typescript --tailwind --app --src-dir

# Development
npm run dev

# Build
npm run build

# Start production
npm start

# Analyze bundle
ANALYZE=true npm run build
```

---

## Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [App Router Migration Guide](https://nextjs.org/docs/app/building-your-application/upgrading/app-router-migration)
- [Server Components](https://nextjs.org/docs/app/building-your-application/rendering/server-components)
- [Metadata API](https://nextjs.org/docs/app/api-reference/functions/generate-metadata)
- [Image Optimization](https://nextjs.org/docs/app/building-your-application/optimizing/images)
