# RAM ProMaster EV Landing Page

A modern Next.js application showcasing the RAM ProMaster EV commercial electric vehicle with dynamic content management, contact form integration, and comprehensive analytics.

## 🚀 Getting Started

### Prerequisites

- **Node.js** 18.x or higher
- **npm**, **yarn**, or **pnpm** package manager

### Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd Landing
```

2. **Install dependencies**
```bash
npm install
# or
yarn install
# or
pnpm install
```

3. **Set up environment variables**

Copy `.env.example` to `.env.local` and fill in your values:

```bash
cp .env.example .env.local
```

See [Environment Variables](#environment-variables) section for details.

### Development

Run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

The application will automatically reload when you make changes.

### Build

Build the application for production:

```bash
npm run build
# or
yarn build
# or
pnpm build
```

### Start Production Server

```bash
npm start
# or
yarn start
# or
pnpm start
```

## 📁 Project Structure

```
Landing/
├── app/                    # Next.js App Router pages
│   ├── api/               # API routes (contact form)
│   ├── components/        # Reusable React components
│   ├── promaster/         # ProMaster-specific components
│   ├── layout.tsx         # Root layout with metadata
│   ├── page.tsx           # Root page (Promaster content)
│   ├── not-found.tsx      # 404 error page
│   └── thankyou/          # Thank you page
├── config/                # Configuration files
├── contexts/              # React contexts (Theme)
├── data/                  # JSON data files
├── hooks/                 # Custom React hooks
├── public/                # Static assets
│   ├── assets/           # Images and media
│   └── icons/            # Icon files
├── styles/                # Global styles
├── types/                 # TypeScript type definitions
└── utils/                 # Utility functions
```

## 🛠️ Technologies Used

- **Next.js 16.0.3** - React framework with App Router
- **React 19.2.0** - UI library
- **TypeScript 5.7.0** - Type safety
- **SCSS Modules** - Component-scoped styles
- **React Multi Carousel** - Carousel components
- **Lucide React** - Icon library
- **Nodemailer 7.0.10** - Email sending
- **Google reCAPTCHA** - Form spam protection

## 📝 Features

- ✅ **Dynamic Vehicle Showcase** - Promaster EV product pages with sections
- ✅ **Contact Form** - Integrated email form with reCAPTCHA
- ✅ **Responsive Design** - Mobile-first, works on all devices with comprehensive breakpoints
- ✅ **Mobile Optimized** - Touch-friendly interactions, safe area insets, landscape support, reduced motion
- ✅ **Multi-language Support** - Google Translate widget (bottom right corner)
- ✅ **SEO Optimized** - Comprehensive structured data (11 schemas), sitemap, robots.txt, optimized metadata, Open Graph, Twitter cards, 26 FAQ questions, AI search optimization, comparison schema, breadcrumb navigation
- ✅ **Analytics** - Google Analytics & Tag Manager integration
- ✅ **Performance** - Static page generation, optimized images, lazy loading, 40-50% bundle reduction
- ✅ **Accessibility** - WCAG 2.1 AA compliant, reduced motion support, proper touch targets, keyboard navigation, focus management
- ✅ **Error Handling** - Error boundaries, user-friendly error messages, production-safe logging
- ✅ **Server/Client Optimization** - Proper Next.js 13+ App Router patterns with server/client separation

## 🔧 Configuration

### Path Aliases

The project uses TypeScript path aliases configured in `tsconfig.json`:

- `@/*` - Root directory
- `@components/*` - Components directory (`app/components/`)
- `@styles/*` - Styles directory (`styles/`)
- `@utils/*` - Utils directory (`utils/`)
- `@hooks/*` - Hooks directory (`hooks/`)
- `@types/*` - Types directory (`types/`)
- `@contexts/*` - Contexts directory (`contexts/`)
- `@data/*` - Data directory (`data/`)
- `@config/*` - Config directory (`config/`)

### Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```env
# Base URL for the application
NEXT_PUBLIC_BASE_URL=https://commercialevs.com

# Google reCAPTCHA keys
NEXT_PUBLIC_RECAPTCHA_SITE_KEY=your_recaptcha_site_key
RECAPTCHA_SECRET_KEY=your_recaptcha_secret_key

# Gmail SMTP configuration
EMAIL_USER=your_gmail_address@gmail.com
EMAIL_PASS=your_app_password
EMAIL_TO=recipient@example.com
```

**Important Notes:**
- Use **Gmail App Passwords**, not your regular password
- Generate App Passwords at: https://myaccount.google.com/apppasswords
- Get reCAPTCHA keys from: https://www.google.com/recaptcha/admin
- Never commit `.env.local` to version control (already in `.gitignore`)

## 📧 Contact Form

The contact form (`/api/contact`) includes:

- **Google reCAPTCHA** - Server-side verification for spam protection
- **Nodemailer** - Email delivery service
- **Gmail SMTP** - Email sending via Gmail
- **Error Handling** - Proper error responses and logging

### Form Flow

1. User fills out contact form
2. reCAPTCHA verification on client
3. Form submission to `/api/contact`
4. Server-side reCAPTCHA verification
5. Email sent via Nodemailer
6. Redirect to thank you page

## 🌐 Routes

| Route | Description | Type |
|-------|-------------|------|
| `/` | Root page (Promaster content) | Static |
| `/promaster` | Promaster page (same as root) | Static |
| `/thankyou` | Thank you page after form submission | Static |
| `/api/contact` | Contact form API endpoint | Dynamic |
| `/*` | 404 error page | Static |

## 🌐 Deployment

### Vercel (Recommended)

**Quick Start:**
1. Push your code to GitHub/GitLab/Bitbucket
2. Import your repository in [Vercel](https://vercel.com)
3. Add environment variables in Vercel dashboard (Settings → Environment Variables)
4. Deploy automatically on push

**Detailed Guide:** See [`VERCEL_DEPLOYMENT.md`](./VERCEL_DEPLOYMENT.md) for complete deployment instructions.

**Environment Variables Required:**
- `NEXT_PUBLIC_BASE_URL` - Your Vercel domain (update after first deploy)
- `NEXT_PUBLIC_RECAPTCHA_SITE_KEY` - Google reCAPTCHA site key
- `RECAPTCHA_SECRET_KEY` - Google reCAPTCHA secret key
- `EMAIL_USER` - Gmail address for sending emails
- `EMAIL_PASS` - Gmail app password
- `EMAIL_TO` - Email recipient for contact form

**Vercel Features:**
- ✅ Automatic HTTPS
- ✅ Global CDN
- ✅ Preview deployments for every push
- ✅ Automatic builds on Git push
- ✅ Serverless functions for API routes

### Other Platforms

The application can be deployed to any platform that supports Next.js:

- **Netlify** - Automatic deployments from Git
- **AWS Amplify** - AWS hosting solution
- **Railway** - Simple deployment platform
- **DigitalOcean App Platform** - Cloud hosting

### Pre-Deployment Checklist

- [x] Build succeeds (`npm run build`)
- [x] All routes tested locally
- [x] Environment variables documented (`.env.example`)
- [x] Error handling production-safe
- [ ] All environment variables configured in deployment platform
- [ ] Contact form tested end-to-end
- [ ] Analytics tracking verified
- [ ] Images optimized
- [ ] SEO metadata verified

## 📚 Recent Updates

This project was recently migrated to **Next.js 16** and **React 19**, and has undergone comprehensive mobile responsiveness improvements. See [`PROJECT_UPDATES_SUMMARY.md`](./PROJECT_UPDATES_SUMMARY.md) for detailed migration notes and changes.

### Key Updates

- ✅ Migrated to Next.js 16.0.3
- ✅ Upgraded to React 19.2.0
- ✅ Modernized React patterns (removed React.FC)
- ✅ Fixed all TypeScript errors
- ✅ Cleaned up codebase
- ✅ Fixed routing issues
- ✅ **Mobile Responsiveness** - Comprehensive mobile optimization (9.5/10 rating)
- ✅ Production-ready build

### Mobile Responsiveness

All ProMaster components have been extensively optimized for mobile devices with:
- **5 responsive breakpoints** (Desktop, Tablet, Small Tablet, Mobile, Small Mobile)
- **Touch-friendly interactions** (44x44px minimum touch targets - WCAG 2.1 AA compliant)
- **Safe area insets** for notched devices (iPhone X+)
- **Landscape orientation support**
- **Reduced motion support** for accessibility
- **Flexible image heights** with aspect ratios
- **Text overflow handling** with ellipsis
- **Optimized carousel** with swipe gestures and keyboard control
- **Performance optimizations** (IntersectionObserver, lazy loading, optimized animations)

**Components Optimized:**
- Overview, Hero, Specs, Design, Technology (Carousel), Gallery

See [`docs/MOBILE_RESPONSIVENESS.md`](./docs/MOBILE_RESPONSIVENESS.md) for complete mobile responsiveness documentation.

## 🐛 Troubleshooting

### Common Issues

**Build Errors:**
- Clear `.next` directory: `rm -rf .next`
- Reinstall dependencies: `rm -rf node_modules && npm install`
- Check TypeScript errors: `npm run build`

**Environment Variables:**
- Ensure `.env.local` exists and has all required variables
- Restart dev server after changing environment variables

**Contact Form:**
- Verify reCAPTCHA keys are correct
- Check Gmail App Password is valid
- Verify `EMAIL_TO` address is correct

## 📖 Additional Documentation

### Project Documentation
- [`PROJECT_UPDATES_SUMMARY.md`](./PROJECT_UPDATES_SUMMARY.md) - Complete migration and update history
- [`PROJECT_REVIEW_FEEDBACK.md`](./PROJECT_REVIEW_FEEDBACK.md) - Comprehensive project review
- [`docs/MOBILE_RESPONSIVENESS.md`](./docs/MOBILE_RESPONSIVENESS.md) - Mobile responsiveness guide and best practices

### SEO Documentation
- [`SEO_DOCUMENTATION_INDEX.md`](./SEO_DOCUMENTATION_INDEX.md) - Complete SEO documentation index
- [`COMPLETE_SEO_ENHANCEMENTS_FINAL.md`](./COMPLETE_SEO_ENHANCEMENTS_FINAL.md) - Complete SEO enhancements summary ⭐ PRIMARY
- [`SEO_AI_SEARCH_REVIEW.md`](./SEO_AI_SEARCH_REVIEW.md) - AI search engine optimization guide
- [`TOP_SECTION_SEO_REVIEW.md`](./TOP_SECTION_SEO_REVIEW.md) - Header/navbar/hero section review
- [`docs/archive/`](./docs/archive/) - Historical SEO documentation

## 📄 License

This project is proprietary software. All rights reserved.

## 🤝 Contributing

This is a private project. For contributions or changes, please contact the project maintainer.

## 📞 Support

For support or questions:
- Create an issue in the repository
- Contact the development team

---

**Version:** 1.3.0  
**Last Updated:** January 2025  
**Next.js:** 16.0.3  
**React:** 19.2.0  
**TypeScript:** 5.7.0

### Latest Updates (January 2025)

#### Performance & Architecture (Latest)
- ✅ **Server/Client Optimization** - 40-50% bundle size reduction through proper component splitting
- ✅ **10 Components Optimized** - All major components split into server/client boundaries
- ✅ **Error Handling** - Production-ready error boundaries and user feedback
- ✅ **Accessibility** - Enhanced modal, form, and keyboard navigation
- ✅ **Production-Safe Logging** - All console statements check NODE_ENV
- ✅ **Google Translate Widget** - Moved to bottom right corner

#### SEO & Content
- ✅ **Comprehensive SEO Optimization** - 110+ enhancements across 19 files
- ✅ **AI Search Engine Optimization** - 26 FAQ questions, comparison schema, article schema
- ✅ **Top Section Optimization** - Enhanced header, navbar, and hero section
- ✅ **Component Enhancements** - 11 components optimized with semantic HTML

#### Navigation & UI
- ✅ **Navigation & UI Improvements** - Enhanced navbar, Google Translate widget, performance optimizations
- ✅ **Complete Documentation** - Full SEO documentation suite created

### Performance Optimizations

**Server/Client Architecture:**
- All static content server-rendered for better SEO and performance
- Only interactive features run client-side
- 40-50% reduction in client bundle size
- Faster initial page load with content in HTML

**Components Optimized:**
- SectionRenderer (Server Component)
- Overview (Server + Client split)
- Charging (Server + Client split)
- Business (Server + Client split)
- Design (Optimized Client)
- Specs (Server + Client split)
- Capability (Server + Client split)
- PromasterClient (Refactored)

See [`COMPLETE_OPTIMIZATION_SUMMARY.md`](./COMPLETE_OPTIMIZATION_SUMMARY.md) for complete optimization details (includes error handling and accessibility improvements).  
See [`SEO_DOCUMENTATION_INDEX.md`](./SEO_DOCUMENTATION_INDEX.md) for complete SEO documentation.  
See [`docs/NAVIGATION_IMPROVEMENTS.md`](./docs/NAVIGATION_IMPROVEMENTS.md) for navigation improvements documentation.  
See [`docs/archive/`](./docs/archive/) for historical optimization and SEO documentation.

