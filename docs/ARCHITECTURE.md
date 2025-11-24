# Architecture Documentation

**Last Updated:** January 2025  
**Project:** RAM ProMaster EV Landing Page  
**Framework:** Next.js 16.0.3 with App Router

---

## Overview

This document describes the system architecture, component structure, data flow, and design decisions for the RAM ProMaster EV Landing Page application.

---

## System Architecture

### High-Level Architecture

```
┌─────────────────────────────────────────────────────────┐
│                    Client Browser                        │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐  │
│  │   React 19   │  │   Next.js    │  │  SCSS Modules│  │
│  │   Components │  │   App Router  │  │   Styles     │  │
│  └──────────────┘  └──────────────┘  └──────────────┘  │
└─────────────────────────────────────────────────────────┘
                        │
                        │ HTTP/HTTPS
                        │
┌─────────────────────────────────────────────────────────┐
│              Next.js Server (Vercel)                     │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐  │
│  │ Server       │  │ API Routes  │  │ Static      │  │
│  │ Components   │  │ (/api/      │  │ Generation  │  │
│  │ (SSR)        │  │  contact)   │  │ (SSG)       │  │
│  └──────────────┘  └──────────────┘  └──────────────┘  │
└─────────────────────────────────────────────────────────┘
                        │
        ┌───────────────┼───────────────┐
        │               │               │
┌───────▼──────┐ ┌──────▼──────┐ ┌─────▼──────┐
│   Gmail      │ │  Google     │ │  JSON     │
│   SMTP       │ │  reCAPTCHA  │ │  Data     │
│   (Email)    │ │  API        │ │  Files    │
└──────────────┘ └──────────────┘ └───────────┘
```

---

## Application Structure

### Directory Structure

```
Landing/
├── app/                          # Next.js App Router
│   ├── api/                      # API Routes
│   │   └── contact/
│   │       └── route.ts          # Contact form API
│   ├── components/               # Reusable Components
│   │   ├── Breadcrumb/
│   │   ├── Button/
│   │   ├── ErrorBoundary/
│   │   ├── Footer/
│   │   ├── Form/
│   │   ├── Modal/
│   │   ├── Navbar/
│   │   ├── SectionRenderer/
│   │   ├── SkipLink/
│   │   ├── StructuredData/
│   │   └── ThankYou/
│   ├── promaster/                # ProMaster-specific Components
│   │   ├── Business/
│   │   ├── Capability/
│   │   ├── Charging/
│   │   ├── Design/
│   │   ├── Gallery/
│   │   ├── Hero/
│   │   ├── Overview/
│   │   ├── Specs/
│   │   ├── Technology/
│   │   ├── PromasterClient.tsx   # Client wrapper
│   │   ├── PromasterServer.tsx   # Server content
│   │   └── page.tsx              # ProMaster page
│   ├── layout.tsx                 # Root layout
│   ├── page.tsx                  # Root page
│   ├── not-found.tsx             # 404 page
│   ├── robots.ts                  # robots.txt
│   ├── sitemap.ts                # sitemap.xml
│   └── thankyou/                 # Thank you page
├── config/                        # Configuration
│   └── vehicleConfig.ts          # Vehicle configuration
├── contexts/                      # React Contexts
│   └── ThemeContext.tsx          # Theme context
├── data/                          # Static Data
│   └── promasterData.json        # Vehicle data
├── hooks/                         # Custom Hooks
│   └── useScreenSize.ts           # Screen size hook
├── public/                        # Static Assets
│   ├── assets/                    # Images
│   └── icons/                     # Icons
├── styles/                        # Global Styles
│   └── global.scss                # Global stylesheet
├── types/                         # TypeScript Types
│   ├── global.d.ts                # Global types
│   └── vehicle.ts                 # Vehicle types
└── utils/                         # Utilities
    ├── analytics.ts               # Analytics utilities
    ├── gtranslate.tsx            # Google Translate
    ├── sectionTitles.ts           # Section titles utility
    └── vehicleService.ts          # Vehicle data service
```

---

## Component Architecture

### Server/Client Component Split

The application uses Next.js 13+ App Router patterns with proper server/client component separation:

```
┌─────────────────────────────────────────┐
│         Server Components                │
│  (Rendered on server, no JS sent)       │
├─────────────────────────────────────────┤
│  • page.tsx (root)                      │
│  • PromasterServer.tsx                  │
│  • SectionRenderer.tsx                 │
│  • Overview.tsx (server part)           │
│  • Charging.tsx (server part)          │
│  • Business.tsx (server part)           │
│  • Specs.tsx (server part)             │
│  • Capability.tsx (server part)        │
└─────────────────────────────────────────┘
                    │
                    │ Props
                    │
┌─────────────────────────────────────────┐
│         Client Components               │
│  (Interactive, requires JS)             │
├─────────────────────────────────────────┤
│  • PromasterClient.tsx                 │
│  • OverviewCard.tsx (animations)      │
│  • ChargingCard.tsx (animations)       │
│  • BusinessItem.tsx (animations)      │
│  • SpecSection.tsx (animations)       │
│  • Design.tsx (carousel)               │
│  • Technology.tsx (carousel)           │
│  • Modal.tsx (interactive)            │
│  • ContactForm.tsx (form)             │
│  • Navbar.tsx (navigation)             │
└─────────────────────────────────────────┘
```

### Component Hierarchy

```
app/page.tsx (Server)
└── PromasterClient (Client)
    ├── PromasterServer (Server)
    │   ├── SectionRenderer (Server)
    │   │   ├── Hero (Server)
    │   │   ├── Overview (Server) → OverviewCard (Client)
    │   │   ├── Specs (Server) → SpecSection (Client)
    │   │   ├── Design (Client)
    │   │   ├── Technology (Client)
    │   │   ├── Charging (Server) → ChargingCard (Client)
    │   │   ├── Business (Server) → BusinessItem (Client)
    │   │   ├── Capability (Server) → CapabilityItem (Client)
    │   │   └── Gallery (Server)
    │   ├── StructuredData (Server)
    │   └── Breadcrumb (Server)
    ├── Navbar (Client)
    ├── Footer (Server)
    ├── Modal (Client)
    │   └── ContactForm (Client)
    └── GTranslate (Client)
```

---

## Data Flow

### Static Data Flow

```
promasterData.json
    │
    ▼
vehicleService.ts (React cache)
    │
    ▼
page.tsx (Server)
    │
    ├── Calculates sectionTitles (server-side)
    │
    ▼
PromasterServer.tsx (Server)
    │
    ├── Passes data to SectionRenderer
    │
    ▼
Section Components (Server)
    │
    └── Render static content (HTML)
```

### Dynamic Data Flow (Contact Form)

```
ContactForm (Client)
    │
    ├── User fills form
    ├── reCAPTCHA verification (client)
    │
    ▼
POST /api/contact
    │
    ├── Server-side reCAPTCHA verification
    ├── Email sending via Nodemailer
    │
    ▼
Success Response
    │
    ▼
Redirect to /thankyou
```

---

## Rendering Strategy

### Static Site Generation (SSG)

**Pages:**
- `/` (root)
- `/promaster`
- `/thankyou`
- `/404` (not-found)

**Benefits:**
- Fast page loads
- Better SEO
- Reduced server load
- CDN cacheable

### Server-Side Rendering (SSR)

**Components:**
- All server components render on each request
- Content is fresh and up-to-date

**Benefits:**
- Dynamic content
- SEO-friendly
- No client-side JavaScript for static content

### Client-Side Rendering (CSR)

**Components:**
- Interactive components only
- Animations and interactions
- Form handling

**Benefits:**
- Rich interactivity
- Smooth animations
- Real-time updates

---

## State Management

### Server State

- **Data Source:** `promasterData.json`
- **Caching:** React `cache()` wrapper
- **Location:** `utils/vehicleService.ts`

### Client State

- **Modal State:** Local component state
- **Form State:** Local component state (ContactForm)
- **Navigation State:** Local component state (Navbar)
- **Theme State:** React Context (ThemeContext)

### No Global State Management

The application doesn't use Redux, Zustand, or similar libraries because:
- Simple state requirements
- Server components handle most data
- Minimal client-side state needed

---

## Performance Optimizations

### Bundle Size Reduction

**Strategy:** Server/Client Component Split
- **Before:** ~100% client-side rendering
- **After:** ~40-50% reduction in client bundle
- **Method:** Move static content to server components

### Image Optimization

- **Next.js Image Component:** Automatic optimization
- **Formats:** AVIF, WebP
- **Lazy Loading:** Automatic for below-fold images
- **Responsive Sizes:** Multiple device sizes

### Code Splitting

- **Automatic:** Next.js handles route-based splitting
- **Dynamic Imports:** Used for heavy components
- **Tree Shaking:** Unused code eliminated

### Caching

- **React Cache:** Request deduplication
- **Static Assets:** CDN caching
- **API Responses:** Server-side caching

---

## Security Architecture

### Client-Side Security

- **reCAPTCHA:** Client-side verification
- **Input Validation:** Form validation
- **XSS Protection:** React's built-in escaping
- **CSP Headers:** Content Security Policy

### Server-Side Security

- **reCAPTCHA Verification:** Server-side validation
- **Environment Variables:** Secrets not exposed
- **Error Handling:** No sensitive data in errors
- **Rate Limiting:** (Recommended for production)

### API Security

- **HTTPS Only:** All traffic encrypted
- **CORS:** Configured appropriately
- **Input Validation:** Server-side validation
- **Error Messages:** Generic in production

---

## SEO Architecture

### Structured Data

**11 Schema Types:**
1. Organization
2. WebSite
3. BreadcrumbList
4. Product
5. Vehicle
6. FAQPage (26 questions)
7. Article
8. HowTo (2 types)
9. Comparison
10. ImageObject
11. AggregateRating

### Metadata

- **Dynamic Metadata:** Per-page metadata
- **Open Graph:** Social media sharing
- **Twitter Cards:** Twitter sharing
- **Sitemap:** Auto-generated
- **Robots.txt:** Configured

---

## Accessibility Architecture

### WCAG 2.1 AA Compliance

- **Semantic HTML:** Proper element usage
- **ARIA Labels:** Screen reader support
- **Keyboard Navigation:** Full keyboard support
- **Focus Management:** Proper focus handling
- **Color Contrast:** WCAG AA compliant
- **Touch Targets:** 44x44px minimum

### Features

- **Skip Links:** Skip to main content
- **Focus Traps:** Modal focus management
- **Reduced Motion:** Respects user preferences
- **Screen Reader Support:** ARIA attributes

---

## Deployment Architecture

### Vercel Deployment

```
Git Repository
    │
    ▼
Vercel Platform
    │
    ├── Build Process
    │   ├── Install dependencies
    │   ├── Run build command
    │   └── Generate static pages
    │
    ├── Edge Network
    │   ├── Global CDN
    │   ├── Static asset caching
    │   └── Edge functions
    │
    └── Serverless Functions
        └── API routes (/api/contact)
```

### Environment Variables

- **Build Time:** `NEXT_PUBLIC_*` variables
- **Runtime:** Server-side variables
- **Secrets:** Stored securely in Vercel

---

## Technology Stack

### Core

- **Next.js 16.0.3:** React framework
- **React 19.2.0:** UI library
- **TypeScript 5.7.0:** Type safety

### Styling

- **SCSS Modules:** Component-scoped styles
- **CSS Variables:** Theme system
- **Responsive Design:** Mobile-first approach

### Libraries

- **Nodemailer 7.0.10:** Email sending
- **react-google-recaptcha:** reCAPTCHA integration
- **react-multi-carousel:** Carousel components
- **Lucide React:** Icons

### Build Tools

- **Next.js:** Built-in bundler
- **SWC:** Fast compiler
- **TypeScript:** Type checking

---

## Design Patterns

### Component Patterns

1. **Server/Client Split:** Proper boundary separation
2. **Composition:** Small, reusable components
3. **Container/Presentational:** Separation of concerns
4. **Custom Hooks:** Reusable logic

### Code Patterns

1. **TypeScript:** Strong typing throughout
2. **Path Aliases:** Clean imports
3. **Error Boundaries:** Error handling
4. **Production-Safe Logging:** NODE_ENV checks

---

## Future Architecture Considerations

### Potential Improvements

1. **State Management:** Consider Zustand if state grows
2. **API Layer:** Consider tRPC or GraphQL
3. **Testing:** Add comprehensive test suite
4. **Monitoring:** Add error tracking (Sentry)
5. **Analytics:** Enhanced analytics integration
6. **Caching:** More aggressive caching strategy
7. **Rate Limiting:** API rate limiting
8. **CDN:** Enhanced CDN configuration

---

## Related Documentation

- [`README.md`](../README.md) - Main project documentation
- [`COMPLETE_OPTIMIZATION_SUMMARY.md`](../COMPLETE_OPTIMIZATION_SUMMARY.md) - Optimization details
- [`SERVER_CLIENT_REVIEW.md`](../SERVER_CLIENT_REVIEW.md) - Server/client analysis
- [`docs/TESTING.md`](./TESTING.md) - Testing documentation
- [Next.js App Router](https://nextjs.org/docs/app) - Official documentation

---

**Last Updated:** January 2025  
**Architecture Version:** 1.3.0

