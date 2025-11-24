# Deployment Checklist

Quick reference checklist for deploying to Vercel or other platforms.

## ✅ Pre-Deployment

### Code Quality
- [x] Build succeeds locally (`npm run build`)
- [x] No TypeScript errors
- [x] No linter errors
- [x] All routes generate correctly
- [x] Code committed to Git

### Configuration
- [x] `next.config.ts` is valid (no deprecated options like `swcMinify`)
- [x] `package.json` has correct scripts
- [x] `.env.example` documents all variables
- [x] `.gitignore` excludes sensitive files

### Functionality
- [ ] All routes tested locally
- [ ] Contact form works
- [ ] Images load correctly
- [ ] Styles apply correctly
- [ ] Analytics tracking works

## 🔧 Environment Variables

### Required Variables
- [ ] `NEXT_PUBLIC_BASE_URL` - Base URL for metadata
- [ ] `NEXT_PUBLIC_RECAPTCHA_SITE_KEY` - reCAPTCHA site key
- [ ] `RECAPTCHA_SECRET_KEY` - reCAPTCHA secret key
- [ ] `EMAIL_USER` - Gmail address
- [ ] `EMAIL_PASS` - Gmail app password
- [ ] `EMAIL_TO` - Email recipient

### Verification
- [ ] All variables added to deployment platform
- [ ] Variable names match exactly (case-sensitive)
- [ ] `NEXT_PUBLIC_` prefix used for client-side vars
- [ ] No extra spaces in values

## 🚀 Deployment Steps

### Vercel
1. [ ] Push code to Git repository
2. [ ] Import project in Vercel dashboard
3. [ ] Add environment variables
4. [ ] Deploy
5. [ ] Verify deployment success

### Post-Deployment
- [ ] Site loads at production URL
- [ ] All routes accessible
- [ ] Contact form submits successfully
- [ ] Emails are received
- [ ] Analytics tracking works
- [ ] No console errors

## 🐛 Troubleshooting

If deployment fails:
- [ ] Check build logs
- [ ] Verify environment variables
- [ ] Test build locally first (`npm run build`)
- [ ] Check for TypeScript errors (especially union types like `SpecItem | string`)
- [ ] Verify `next.config.ts` has no deprecated options
- [ ] Verify all dependencies installed
- [ ] Clear `.next` directory and rebuild

---

**See [`VERCEL_DEPLOYMENT.md`](./VERCEL_DEPLOYMENT.md) for detailed instructions.**

