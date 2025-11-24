# Vercel Deployment Guide

Complete guide for deploying the RAM ProMaster EV Landing Page to Vercel.

## ✅ Pre-Deployment Checklist

### Build Verification
- [ ] Build succeeds locally (`npm run build`)
- [ ] No TypeScript errors
- [ ] No linter errors
- [ ] All routes generate correctly
- [ ] Static pages prerender successfully

### Code Quality
- [ ] Next.js 16.0.3 (Vercel compatible)
- [ ] React 19.2.0 (Vercel compatible)
- [ ] API routes use Next.js App Router format
- [ ] Environment variables properly configured
- [ ] Error handling production-safe
- [ ] Code committed to Git
- [ ] `next.config.ts` is valid (no deprecated options like `swcMinify`)
- [ ] `package.json` has correct scripts
- [ ] `.env.example` documents all variables
- [ ] `.gitignore` excludes sensitive files

### Functionality Testing
- [ ] All routes tested locally
- [ ] Contact form works
- [ ] Images load correctly
- [ ] Styles apply correctly
- [ ] Analytics tracking works

## 🚀 Deployment Steps

### Option 1: Deploy via Vercel Dashboard (Recommended)

1. **Push to Git Repository**
   ```bash
   git add .
   git commit -m "Ready for Vercel deployment"
   git push origin main
   ```

2. **Import Project in Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "Add New Project"
   - Import your Git repository
   - Vercel will auto-detect Next.js

3. **Configure Project Settings**
   - **Framework Preset:** Next.js (auto-detected)
   - **Root Directory:** `./` (root)
   - **Build Command:** `npm run build` (default)
   - **Output Directory:** `.next` (default)
   - **Install Command:** `npm install` (default)

4. **Add Environment Variables**
   
   Go to **Settings → Environment Variables** and add:

   ```env
   NEXT_PUBLIC_BASE_URL=https://your-domain.vercel.app
   NEXT_PUBLIC_RECAPTCHA_SITE_KEY=your_recaptcha_site_key
   RECAPTCHA_SECRET_KEY=your_recaptcha_secret_key
   EMAIL_USER=your_gmail_address@gmail.com
   EMAIL_PASS=your_gmail_app_password
   EMAIL_TO=recipient@example.com
   ```

   **Important:**
   - Add variables for **Production**, **Preview**, and **Development** environments
   - Update `NEXT_PUBLIC_BASE_URL` after first deployment with your actual domain
   - Never commit secrets to Git

5. **Deploy**
   - Click "Deploy"
   - Wait for build to complete
   - Your site will be live at `https://your-project.vercel.app`

### Option 2: Deploy via Vercel CLI

1. **Install Vercel CLI**
   ```bash
   npm i -g vercel
   ```

2. **Login to Vercel**
   ```bash
   vercel login
   ```

3. **Deploy**
   ```bash
   vercel
   ```
   
   Follow the prompts:
   - Link to existing project or create new
   - Confirm settings
   - Add environment variables when prompted

4. **Deploy to Production**
   ```bash
   vercel --prod
   ```

## 🔧 Vercel Configuration

### Automatic Configuration

Vercel automatically detects Next.js projects and configures:
- ✅ Build command: `next build`
- ✅ Output directory: `.next`
- ✅ Development command: `next dev`
- ✅ Node.js version: Latest LTS

### Custom Configuration (Optional)

If needed, create `vercel.json`:

```json
{
  "buildCommand": "npm run build",
  "devCommand": "npm run dev",
  "installCommand": "npm install",
  "framework": "nextjs",
  "regions": ["iad1"]
}
```

**Note:** Usually not needed - Vercel auto-detects Next.js projects.

## 🌐 Environment Variables

### Required Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `NEXT_PUBLIC_BASE_URL` | Base URL for metadata | `https://your-domain.vercel.app` |
| `NEXT_PUBLIC_RECAPTCHA_SITE_KEY` | reCAPTCHA site key (public) | `6Le...` |
| `RECAPTCHA_SECRET_KEY` | reCAPTCHA secret key | `6Le...` |
| `EMAIL_USER` | Gmail address | `your-email@gmail.com` |
| `EMAIL_PASS` | Gmail app password | `abcd efgh ijkl mnop` |
| `EMAIL_TO` | Email recipient | `recipient@example.com` |

### Adding Environment Variables

**Via Dashboard:**
1. Go to Project → Settings → Environment Variables
2. Add each variable
3. Select environments (Production, Preview, Development)
4. Click "Save"
5. Redeploy for changes to take effect

**Via CLI:**
```bash
vercel env add NEXT_PUBLIC_BASE_URL
vercel env add RECAPTCHA_SECRET_KEY
# ... etc
```

## 📋 Post-Deployment Checklist

### Immediate Checks
- [ ] Site loads at production URL
- [ ] All routes work (`/`, `/promaster`, `/thankyou`)
- [ ] Images load correctly
- [ ] Styles are applied
- [ ] No console errors

### Functionality Checks
- [ ] Contact form loads
- [ ] reCAPTCHA displays
- [ ] Form submission works
- [ ] Email is sent successfully
- [ ] Thank you page redirects correctly
- [ ] 404 page works

### SEO & Analytics
- [ ] Metadata displays correctly
- [ ] Open Graph tags work
- [ ] Google Analytics tracking works
- [ ] Google Tag Manager works
- [ ] Google Translate widget works

### Performance
- [ ] Page loads quickly
- [ ] Images are optimized
- [ ] Static pages are cached
- [ ] API routes respond quickly

## 🔍 Troubleshooting

### Build Fails

**Issue:** Build fails on Vercel

**Solutions:**
1. Check build logs in Vercel dashboard
2. Verify Node.js version (Vercel uses latest LTS)
3. Ensure all dependencies are in `package.json`
4. Check for TypeScript errors locally first (`npm run build`)
5. Verify `next.config.ts` is valid (no deprecated options like `swcMinify`)
6. Ensure type guards are used when accessing union types (e.g., `SpecItem | string`)
7. Clear `.next` directory and rebuild: `rm -rf .next && npm run build`

### Environment Variables Not Working

**Issue:** Environment variables not accessible

**Solutions:**
1. Verify variables are added in Vercel dashboard
2. Check variable names match exactly (case-sensitive)
3. Ensure `NEXT_PUBLIC_` prefix for client-side variables
4. Redeploy after adding variables
5. Check variable values don't have extra spaces

### API Route Errors

**Issue:** `/api/contact` returns errors

**Solutions:**
1. Check server logs in Vercel dashboard
2. Verify all environment variables are set
3. Test reCAPTCHA keys are valid
4. Verify Gmail credentials are correct
5. Check email service limits

### Images Not Loading

**Issue:** Images return 404

**Solutions:**
1. Verify images are in `public/` directory
2. Check image paths in code
3. Ensure images are committed to Git
4. Check Next.js Image component usage

## 🎯 Vercel-Specific Features

### Automatic HTTPS
- ✅ Vercel provides SSL certificates automatically
- ✅ HTTPS is enabled by default
- ✅ No configuration needed

### Edge Network
- ✅ Content delivered via Vercel's edge network
- ✅ Global CDN for static assets
- ✅ Automatic caching

### Preview Deployments
- ✅ Every Git push creates a preview deployment
- ✅ Preview URLs for pull requests
- ✅ Test before merging to production

### Analytics (Optional)
- Enable Vercel Analytics in dashboard
- Track page views and performance
- No code changes needed

## 📊 Monitoring

### Vercel Dashboard
- View deployment history
- Check build logs
- Monitor function execution
- View analytics

### Logs
- Access logs in Vercel dashboard
- Real-time function logs
- Build logs for debugging

## 🔄 Continuous Deployment

### Automatic Deployments
- ✅ Push to `main` branch → Production
- ✅ Push to other branches → Preview
- ✅ Pull requests → Preview deployment

### Manual Deployments
- Use Vercel CLI: `vercel --prod`
- Or trigger from dashboard

## 🚨 Important Notes

### Security
- ✅ Never commit `.env.local` to Git
- ✅ Use Vercel's environment variables
- ✅ Keep secrets secure
- ✅ Use Gmail App Passwords (not regular passwords)

### Performance
- ✅ Static pages are automatically optimized
- ✅ Images are optimized via Next.js Image
- ✅ API routes run as serverless functions
- ✅ Edge caching for static assets

### Limits
- **Free Tier:**
  - 100GB bandwidth/month
  - 100 serverless function executions/day
  - Unlimited deployments
- **Pro Tier:** Higher limits available

## 📚 Additional Resources

- [Vercel Documentation](https://vercel.com/docs)
- [Next.js on Vercel](https://vercel.com/docs/frameworks/nextjs)
- [Environment Variables](https://vercel.com/docs/concepts/projects/environment-variables)
- [Deployment Guide](https://vercel.com/docs/deployments/overview)

## ✅ Deployment Checklist Summary

Before deploying:
- [x] Code is committed to Git
- [x] Build succeeds locally
- [x] Environment variables documented
- [x] API routes tested
- [x] Error handling production-safe

After deploying:
- [ ] Site loads correctly
- [ ] All routes work
- [ ] Contact form functions
- [ ] Environment variables set
- [ ] Analytics tracking works

---

**Ready for Vercel!** 🚀

The project is fully configured and ready for deployment to Vercel. Follow the steps above to deploy.

