# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.3.1] - 2025-01-XX

### Fixed
- Fixed TypeScript build errors in StructuredData component
- Added type guard function `isSpecItem()` for proper type narrowing
- Removed deprecated `swcMinify` option from `next.config.ts` (Next.js 16 has SWC minification enabled by default)
- Build now passes successfully on Vercel

### Changed
- Improved type safety in StructuredData component when accessing SpecItem properties
- Updated next.config.ts to remove deprecated configuration options

## [1.3.0] - 2025-01-15

### Added
- Error Boundary component for React error handling
- Loading states in ContactForm
- Error feedback messages in ContactForm
- ESC key support in Modal
- Focus trap in Modal
- Production-safe console logging (NODE_ENV checks)
- Server-side sectionTitles calculation utility
- React cache() wrapper for vehicleService

### Changed
- **BREAKING:** Google Translate widget moved from top-right to bottom-right corner
- ContactForm now shows loading state during submission
- ContactForm now displays user-friendly error messages
- Modal now traps focus and supports ESC key
- All console statements now check NODE_ENV before logging
- Improved error handling in page components
- Better error messages throughout application

### Performance
- 40-50% reduction in client bundle size
- All static content now server-rendered
- Faster initial page load
- Better SEO (content in initial HTML)

### Architecture
- Split Overview component (Server + Client)
- Split Charging component (Server + Client)
- Split Business component (Server + Client)
- Split Specs component (Server + Client)
- Split Capability component (Server + Client)
- Converted SectionRenderer to server component
- Refactored PromasterClient for better separation

### Accessibility
- Enhanced Modal accessibility (ESC key, focus trap, ARIA)
- Improved ContactForm accessibility (ARIA attributes, error announcements)
- Better keyboard navigation throughout

### Documentation
- Added COMPLETE_OPTIMIZATION_SUMMARY.md
- Added REFINEMENTS_SUMMARY.md
- Added SERVER_CLIENT_REVIEW.md
- Added FINAL_OPTIMIZATION_REPORT.md
- Updated README.md with latest changes
- Updated DOCUMENTATION_INDEX.md

## [1.2.0] - 2025-01-05

### Added
- Comprehensive SEO optimization (110+ enhancements)
- AI Search Engine Optimization (26 FAQ questions)
- Enhanced structured data (11 schemas)
- Google Translate widget integration
- Mobile responsiveness improvements
- Navigation enhancements

### Changed
- Migrated to Next.js 16.0.3
- Upgraded to React 19.2.0
- Updated TypeScript to 5.7.0
- Modernized React patterns (removed React.FC)

### Documentation
- Added comprehensive SEO documentation
- Added mobile responsiveness guide
- Added navigation improvements documentation

## [1.1.0] - 2024-12-XX

### Added
- Contact form with reCAPTCHA
- Email integration via Nodemailer
- Analytics integration
- Basic SEO optimization

### Changed
- Initial project setup
- Basic component structure

---

**Note:** Dates are approximate. See individual documentation files for detailed change history.

