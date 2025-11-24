# Troubleshooting 500 Internal Server Error

## Issue
Getting 500 Internal Server Error on `http://localhost:3000/` after Next.js 16 migration.

## Error Details
- **Status Code:** 500 (Internal Server Error)
- **Route:** `/` (root)
- **Occurrence:** Multiple GET requests failing

## Potential Causes & Fixes

### 1. ✅ Added Error Handling
**Status:** Fixed
- Added try-catch to `app/layout.tsx` `generateMetadata()`
- Added try-catch to `app/page.tsx` `HomePage()`

### 2. Check Server Logs
**Action Required:** Check terminal output for actual error message

Look for:
- Stack traces
- Import errors
- Type errors
- Missing module errors

### 3. Common Next.js 16 Issues

#### A. JSON Import in Metadata
**Issue:** Next.js 16 may have stricter rules about importing JSON in metadata functions.

**Check:** If error mentions JSON import, try:
```typescript
// Instead of direct import in metadata
import promasterData from '@/data/promasterData.json';

// Use dynamic import or move to page-level
```

#### B. Client Component Import
**Issue:** Server component importing client component incorrectly.

**Check:** `app/page.tsx` imports `PromasterClient` which is marked `'use client'` - this should be fine, but verify.

#### C. Async/Await Issues
**Issue:** Next.js 16 requires proper async handling.

**Check:** All server components are properly async.

### 4. Debugging Steps

1. **Check Terminal Output**
   ```bash
   # Look for error messages in the terminal where `npm run dev` is running
   ```

2. **Check Browser Console**
   - Open DevTools (F12)
   - Check Console tab for client-side errors
   - Check Network tab for failed requests

3. **Test Individual Routes**
   ```bash
   # Try accessing:
   http://localhost:3000/promaster
   http://localhost:3000/thankyou
   ```

4. **Check Data File**
   ```bash
   # Verify JSON is valid
   cat data/promasterData.json | jq .
   ```

5. **Clear Build Cache**
   ```bash
   rm -rf .next
   npm run build
   ```

### 5. Quick Fixes Applied

✅ Added error handling to metadata generation
✅ Added error handling to page component
✅ Verified build succeeds

### 6. Next Steps

1. **Check Dev Server Logs**
   - Look at the terminal where `npm run dev` is running
   - Copy the full error message

2. **Test Build**
   ```bash
   npm run build
   npm start
   ```
   - See if production build works

3. **Check Environment Variables**
   ```bash
   # Verify .env.local exists and has required vars
   cat .env.local
   ```

4. **Verify Dependencies**
   ```bash
   npm install
   ```

## If Error Persists

Please provide:
1. Full error message from terminal
2. Browser console errors
3. Network tab details for failed request
4. Any recent changes made

