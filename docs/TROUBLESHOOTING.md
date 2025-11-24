# Troubleshooting Guide

**Last Updated:** January 2025  
**Project:** RAM ProMaster EV Landing Page

---

## Overview

This guide helps you diagnose and resolve common issues when working with this project. If you encounter a problem not covered here, please open an issue on GitHub.

---

## Table of Contents

1. [Installation Issues](#installation-issues)
2. [Build Errors](#build-errors)
3. [Runtime Errors](#runtime-errors)
4. [API Issues](#api-issues)
5. [Environment Variables](#environment-variables)
6. [Performance Issues](#performance-issues)
7. [Deployment Issues](#deployment-issues)
8. [Browser Compatibility](#browser-compatibility)
9. [Common Errors](#common-errors)

---

## Installation Issues

### Issue: `npm install` fails

**Symptoms:**
- Package installation errors
- Dependency conflicts
- Network errors

**Solutions:**

1. **Clear cache and reinstall:**
   ```bash
   rm -rf node_modules package-lock.json
   npm cache clean --force
   npm install
   ```

2. **Check Node.js version:**
   ```bash
   node --version  # Should be 18.x or higher
   ```

3. **Use specific package manager:**
   ```bash
   # Try yarn instead
   yarn install
   
   # Or pnpm
   pnpm install
   ```

4. **Check network/firewall:**
   - Ensure you can access npm registry
   - Check corporate firewall settings
   - Try using a different network

---

### Issue: TypeScript errors after installation

**Symptoms:**
- Type errors in IDE
- Build fails with TypeScript errors

**Solutions:**

1. **Reinstall TypeScript:**
   ```bash
   npm install --save-dev typescript@^5.7.0
   ```

2. **Restart TypeScript server:**
   - VS Code: `Cmd/Ctrl + Shift + P` → "TypeScript: Restart TS Server"

3. **Clear Next.js cache:**
   ```bash
   rm -rf .next
   npm run build
   ```

---

## Build Errors

### Issue: Build fails with "Module not found"

**Symptoms:**
```
Module not found: Can't resolve '@/components/...'
```

**Solutions:**

1. **Check path aliases in `tsconfig.json`:**
   ```json
   {
     "paths": {
       "@/*": ["./*"],
       "@components/*": ["./app/components/*"]
     }
   }
   ```

2. **Verify file exists:**
   ```bash
   ls -la app/components/ComponentName/
   ```

3. **Check import paths:**
   ```typescript
   // ✅ Correct
   import Component from '@/components/ComponentName/Component';
   
   // ❌ Incorrect
   import Component from '../../../components/ComponentName/Component';
   ```

---

### Issue: Build fails with SCSS errors

**Symptoms:**
```
SassError: File to import not found
```

**Solutions:**

1. **Check SCSS file paths:**
   ```scss
   // ✅ Correct
   @import '@styles/global.scss';
   
   // ❌ Incorrect
   @import '../../../styles/global.scss';
   ```

2. **Verify SCSS files exist:**
   ```bash
   ls -la styles/
   ```

3. **Reinstall sass:**
   ```bash
   npm install --save-dev sass@^1.77.0
   ```

---

### Issue: TypeScript build errors with SpecItem type

**Symptoms:**
```
Type error: Property 'value' does not exist on type 'string | SpecItem'.
Property 'value' does not exist on type 'string'.
```

**Cause:**
The `SpecDetail.data` array can contain both `SpecItem` objects and `string` values. When using `.find()` to locate items, TypeScript doesn't know if the result is a `SpecItem` (which has a `value` property) or a `string` (which doesn't).

**Solutions:**

1. **Use type guard function:**
   ```typescript
   // Helper function to check if item is SpecItem
   const isSpecItem = (item: any): item is SpecItem => {
     return typeof item === 'object' && item !== null && 'type' in item && 'value' in item;
   };

   // Use type guard before accessing properties
   const item = pricingSection?.data?.find(
     (item) => isSpecItem(item) && item.type === 'Base Price'
   );
   const basePrice = isSpecItem(item) ? item.value : undefined;
   ```

2. **Type narrowing with type assertion (less safe):**
   ```typescript
   const basePriceItem = pricingSection?.data?.find(
     (item: any) => typeof item === 'object' && item.type === 'Base Price'
   ) as SpecItem | undefined;
   const basePrice = basePriceItem?.value;
   ```

3. **Filter and map pattern:**
   ```typescript
   const basePriceItem = pricingSection?.data
     .filter((item): item is SpecItem => isSpecItem(item))
     .find((item) => item.type === 'Base Price');
   const basePrice = basePriceItem?.value;
   ```

**Note:** The project uses the type guard approach (Solution 1) for better type safety.

---

### Issue: Build fails with deprecated Next.js config options

**Symptoms:**
```
⚠ Invalid next.config.ts options detected: 
⚠     Unrecognized key(s) in object: 'swcMinify'
```

**Cause:**
In Next.js 13+, SWC minification is enabled by default and the `swcMinify` option has been removed. This option is no longer valid in Next.js 16.

**Solutions:**

1. **Remove deprecated option:**
   ```typescript
   // ❌ Remove this
   const nextConfig: NextConfig = {
     swcMinify: true,  // Deprecated in Next.js 16
   };

   // ✅ Correct - SWC minification is enabled by default
   const nextConfig: NextConfig = {
     // No swcMinify needed
   };
   ```

2. **Check Next.js version:**
   ```bash
   npm list next
   # Should show Next.js 16.x
   ```

3. **Verify build:**
   ```bash
   npm run build
   # Should complete without warnings
   ```

**Note:** SWC minification is automatically enabled in Next.js 13+ and cannot be disabled. No configuration is needed.

---

### Issue: Build succeeds but pages don't render

**Symptoms:**
- Build completes successfully
- Pages show blank or errors in browser

**Solutions:**

1. **Check browser console** for errors
2. **Verify environment variables** are set:
   ```bash
   echo $NEXT_PUBLIC_BASE_URL
   ```

3. **Clear browser cache:**
   - Hard refresh: `Cmd/Ctrl + Shift + R`
   - Clear site data in browser settings

4. **Check server logs:**
   ```bash
   npm run dev
   # Look for errors in terminal
   ```

---

## Runtime Errors

### Issue: "Hydration failed" error

**Symptoms:**
```
Warning: Text content did not match. Server: "..." Client: "..."
```

**Solutions:**

1. **Check for client-only code in server components:**
   ```typescript
   // ❌ Bad - using window in server component
   const width = window.innerWidth;
   
   // ✅ Good - use useEffect in client component
   useEffect(() => {
     const width = window.innerWidth;
   }, []);
   ```

2. **Ensure consistent rendering:**
   - Don't use `Math.random()` or `Date.now()` in render
   - Use consistent data sources

3. **Check for browser-only APIs:**
   - `window`, `document`, `localStorage` should only be in client components

---

### Issue: Images not loading

**Symptoms:**
- Images show broken image icon
- 404 errors for images

**Solutions:**

1. **Check image paths:**
   ```typescript
   // ✅ Correct - images in public folder
   <Image src="/assets/promaster/image.webp" alt="..." />
   
   // ❌ Incorrect
   <Image src="./assets/promaster/image.webp" alt="..." />
   ```

2. **Verify images exist:**
   ```bash
   ls -la public/assets/promaster/
   ```

3. **Check Next.js Image configuration:**
   ```typescript
   // next.config.ts
   images: {
     formats: ['image/avif', 'image/webp'],
   }
   ```

4. **Use proper Image component:**
   ```typescript
   import Image from 'next/image';
   // Not <img> tag
   ```

---

### Issue: Styles not applying

**Symptoms:**
- Components render but styles missing
- CSS classes not working

**Solutions:**

1. **Check SCSS Module imports:**
   ```typescript
   // ✅ Correct
   import styles from './Component.module.scss';
   <div className={styles.container}>
   
   // ❌ Incorrect
   <div className="container">
   ```

2. **Verify SCSS file exists:**
   ```bash
   ls -la Component.module.scss
   ```

3. **Check global styles import:**
   ```typescript
   // In layout.tsx
   import '@styles/global.scss';
   ```

4. **Clear Next.js cache:**
   ```bash
   rm -rf .next
   npm run dev
   ```

---

## API Issues

### Issue: Contact form not submitting

**Symptoms:**
- Form submits but no email received
- Error message displayed

**Solutions:**

1. **Check environment variables:**
   ```bash
   # Verify all required variables are set
   echo $EMAIL_USER
   echo $EMAIL_PASS
   echo $EMAIL_TO
   echo $RECAPTCHA_SECRET_KEY
   ```

2. **Test reCAPTCHA:**
   - Verify site key and secret key match
   - Check reCAPTCHA is loading on page
   - Test with valid reCAPTCHA token

3. **Check Gmail credentials:**
   - Use Gmail App Password (not regular password)
   - Enable 2-Step Verification
   - Generate new app password if needed

4. **Check server logs:**
   ```bash
   # In development
   npm run dev
   # Check console for errors
   
   # In production (Vercel)
   # Check function logs in Vercel dashboard
   ```

5. **Test API endpoint directly:**
   ```bash
   curl -X POST http://localhost:3000/api/contact \
     -H "Content-Type: application/json" \
     -d '{
       "firstName": "Test",
       "lastName": "User",
       "email": "test@example.com",
       "siteTitle": "RAM ProMaster EV",
       "captchaToken": "test-token"
     }'
   ```

---

### Issue: reCAPTCHA not loading

**Symptoms:**
- reCAPTCHA widget doesn't appear
- Console errors about reCAPTCHA

**Solutions:**

1. **Check site key:**
   ```bash
   echo $NEXT_PUBLIC_RECAPTCHA_SITE_KEY
   ```

2. **Verify domain in reCAPTCHA settings:**
   - Go to [Google reCAPTCHA Admin](https://www.google.com/recaptcha/admin)
   - Check domain is added to allowed domains
   - For localhost: Add `localhost` and `127.0.0.1`

3. **Check network requests:**
   - Open browser DevTools → Network tab
   - Look for reCAPTCHA API requests
   - Check for CORS or network errors

4. **Test GET endpoint:**
   ```bash
   curl http://localhost:3000/api/contact
   # Should return: {"recaptchaKey": "..."}
   ```

---

## Environment Variables

### Issue: Environment variables not working

**Symptoms:**
- Variables return `undefined`
- Default values used instead

**Solutions:**

1. **Check file name:**
   ```bash
   # ✅ Correct
   .env.local
   
   # ❌ Incorrect
   .env
   env.local
   ```

2. **Verify variable names:**
   ```bash
   # Client-side variables need NEXT_PUBLIC_ prefix
   NEXT_PUBLIC_BASE_URL=...
   
   # Server-side variables don't need prefix
   EMAIL_USER=...
   ```

3. **Restart dev server:**
   ```bash
   # Stop server (Ctrl+C)
   # Start again
   npm run dev
   ```

4. **Check in code:**
   ```typescript
   // Client component
   const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
   
   // Server component/API route
   const emailUser = process.env.EMAIL_USER;
   ```

5. **Verify in production:**
   - Check Vercel dashboard → Settings → Environment Variables
   - Ensure variables are set for correct environment (Production/Preview/Development)

---

## Performance Issues

### Issue: Slow page load

**Symptoms:**
- Page takes long to load
- Poor Lighthouse scores

**Solutions:**

1. **Check bundle size:**
   ```bash
   npm run build
   # Look for bundle size warnings
   ```

2. **Optimize images:**
   - Use Next.js Image component
   - Use WebP/AVIF formats
   - Proper image sizing

3. **Check server/client split:**
   - Ensure static content is server-rendered
   - Minimize client-side JavaScript

4. **Enable compression:**
   ```typescript
   // next.config.ts
   compress: true
   ```

5. **Check network requests:**
   - Open DevTools → Network tab
   - Look for slow requests
   - Check for unnecessary API calls

---

### Issue: Large bundle size

**Symptoms:**
- Build warnings about bundle size
- Slow initial load

**Solutions:**

1. **Analyze bundle:**
   ```bash
   npm run build
   # Check output for large chunks
   ```

2. **Use dynamic imports:**
   ```typescript
   // Lazy load heavy components
   const HeavyComponent = dynamic(() => import('./HeavyComponent'));
   ```

3. **Check for unnecessary dependencies:**
   ```bash
   npm ls
   # Remove unused packages
   ```

4. **Optimize server/client split:**
   - Move static content to server components
   - Keep client components minimal

---

## Deployment Issues

### Issue: Vercel deployment fails

**Symptoms:**
- Build fails on Vercel
- Deployment errors

**Solutions:**

1. **Check build logs:**
   - Go to Vercel dashboard → Deployments
   - Click on failed deployment
   - Review build logs

2. **Verify Node.js version:**
   ```json
   // package.json
   {
     "engines": {
       "node": ">=18.0.0"
     }
   }
   ```

3. **Check environment variables:**
   - Vercel dashboard → Settings → Environment Variables
   - Ensure all required variables are set
   - Check for typos in variable names

4. **Test build locally:**
   ```bash
   npm run build
   # Fix any local build errors first
   ```

5. **Check for build-time errors:**
   - TypeScript errors
   - Missing dependencies
   - Import errors

---

### Issue: Environment variables not available in production

**Symptoms:**
- Variables work locally but not in production
- API calls fail

**Solutions:**

1. **Check variable names:**
   - Client-side: Must have `NEXT_PUBLIC_` prefix
   - Server-side: No prefix needed

2. **Verify in Vercel:**
   - Settings → Environment Variables
   - Check environment (Production/Preview/Development)
   - Ensure variables are set for correct environment

3. **Redeploy after adding variables:**
   - Variables require redeployment to take effect
   - Trigger new deployment after adding variables

4. **Check variable values:**
   - No extra spaces
   - No quotes (unless needed)
   - Correct format

---

## Browser Compatibility

### Issue: Styles look different in Safari

**Symptoms:**
- Layout breaks in Safari
- Styles not applying correctly

**Solutions:**

1. **Check CSS vendor prefixes:**
   ```scss
   // Add prefixes if needed
   display: -webkit-flex;
   display: flex;
   ```

2. **Test safe area insets:**
   ```scss
   // Ensure safe area insets work
   padding: env(safe-area-inset-top);
   ```

3. **Check CSS Grid support:**
   - Safari has good Grid support
   - Use fallbacks if needed

4. **Test on actual device:**
   - Use Safari on iOS device
   - Check responsive behavior

---

### Issue: JavaScript errors in older browsers

**Symptoms:**
- Errors in IE11 or older browsers
- Features not working

**Solutions:**

1. **Check browser support:**
   - This project targets modern browsers
   - No IE11 support (by design)

2. **Use polyfills if needed:**
   ```bash
   npm install core-js
   ```

3. **Check Next.js browser support:**
   - Next.js 16 requires modern browsers
   - Consider adding browserlist config

---

## Common Errors

### Error: "Cannot find module"

**Solution:**
```bash
rm -rf node_modules .next
npm install
npm run dev
```

---

### Error: "Port 3000 already in use"

**Solution:**
```bash
# Kill process on port 3000
# macOS/Linux
lsof -ti:3000 | xargs kill

# Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Or use different port
PORT=3001 npm run dev
```

---

### Error: "Module build failed"

**Solution:**
```bash
# Clear all caches
rm -rf .next node_modules
npm cache clean --force
npm install
```

---

### Error: "Hydration mismatch"

**Solution:**
- Check for client-only code in server components
- Ensure consistent data rendering
- Use `suppressHydrationWarning` if necessary (sparingly)

---

## Getting More Help

### Resources

- **Documentation:** [`README.md`](../README.md)
- **API Docs:** [`docs/API.md`](./API.md)
- **Architecture:** [`docs/ARCHITECTURE.md`](./ARCHITECTURE.md)
- **GitHub Issues:** Search existing issues
- **Next.js Docs:** [nextjs.org/docs](https://nextjs.org/docs)

### Reporting Issues

When reporting an issue, include:

1. **Error message** (full stack trace)
2. **Steps to reproduce**
3. **Expected behavior**
4. **Actual behavior**
5. **Environment:**
   - Node.js version
   - npm/yarn version
   - Operating system
   - Browser (if applicable)

---

## Prevention Tips

### Best Practices

1. **Keep dependencies updated:**
   ```bash
   npm outdated
   npm update
   ```

2. **Test before committing:**
   ```bash
   npm run build
   npm run lint
   ```

3. **Use TypeScript:**
   - Catch errors early
   - Better IDE support

4. **Follow code style:**
   - Consistent formatting
   - Proper imports
   - Clear naming

5. **Document changes:**
   - Update README if needed
   - Add comments for complex code

---

**Last Updated:** January 2025  
**Troubleshooting Guide Version:** 1.0.0

