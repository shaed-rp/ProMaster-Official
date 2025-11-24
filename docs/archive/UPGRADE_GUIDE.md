# Package Upgrade Guide

## Overview
This guide covers upgrading from Next.js 15 to Next.js 16, React 18 to React 19, and related dependencies.

## Current Status
- **Next.js**: 15.5.6 → **16.0.3** (Major)
- **React**: 18.3.1 → **19.2.0** (Major)
- **React-DOM**: 18.3.1 → **19.2.0** (Major)
- **TypeScript**: 5.4.0 → **5.7.0** (Minor)
- **Other packages**: Various minor/patch updates

## ⚠️ Breaking Changes

### Next.js 16
1. **Asynchronous Request APIs**: `cookies()`, `headers()`, and other request APIs are now async
2. **React 19 Required**: Next.js 16 requires React 19
3. **Route Handlers**: May need updates for async APIs

### React 19
1. **useFormState/useFormStatus**: New hooks for form handling
2. **ref as a prop**: Refs can now be passed as regular props
3. **use() hook**: New hook for reading promises and context
4. **TypeScript types**: Updated type definitions

## Migration Steps

### 1. Install Updated Packages
```bash
npm install next@latest react@latest react-dom@latest
npm install -D @types/react@latest @types/react-dom@latest @types/node@latest typescript@latest
npm install nodemailer@latest lucide-react@latest @types/nodemailer@latest
```

### 2. Run Next.js Codemod (Automated Migration)
```bash
npx @next/codemod@canary upgrade latest
```

This will automatically fix many breaking changes, including:
- Converting `cookies()` and `headers()` to async
- Updating route handlers
- Fixing other Next.js 16 compatibility issues

### 3. Manual Code Updates Required

#### Update Route Handlers (if any)
**Before (Next.js 15):**
```typescript
export async function GET(request: Request) {
  const headers = request.headers;
  const cookies = request.cookies;
  // ...
}
```

**After (Next.js 16):**
```typescript
import { cookies, headers } from 'next/headers';

export async function GET(request: Request) {
  const headersList = await headers();
  const cookieStore = await cookies();
  // ...
}
```

#### Update Server Components Using Cookies/Headers
**Before:**
```typescript
import { cookies } from 'next/headers';

export default function Component() {
  const cookieStore = cookies();
  // ...
}
```

**After:**
```typescript
import { cookies } from 'next/headers';

export default async function Component() {
  const cookieStore = await cookies();
  // ...
}
```

### 4. Check Your Codebase

Search for these patterns that need updating:
```bash
# Find uses of cookies()
grep -r "cookies()" app/

# Find uses of headers()
grep -r "headers()" app/

# Find route handlers
grep -r "export.*function.*GET\|POST\|PUT\|DELETE" app/api/
```

### 5. Update TypeScript Configuration (if needed)

Your `tsconfig.json` looks good, but ensure:
- `target` is ES2020 or higher (you have this)
- `moduleResolution` is "bundler" (you have this)

### 6. Test Thoroughly

After migration, test:
- ✅ All pages load correctly
- ✅ API routes work
- ✅ Form submissions
- ✅ Navigation
- ✅ Server components render properly
- ✅ Client components hydrate correctly

## Package-Specific Notes

### nodemailer (6.x → 7.x)
- Minor breaking changes in API
- Check [nodemailer changelog](https://github.com/nodemailer/nodemailer/blob/master/CHANGELOG.md)

### lucide-react (0.400 → 0.554)
- No breaking changes expected
- New icons may be available

### TypeScript (5.4 → 5.7)
- No breaking changes expected
- New type features available

## Rollback Plan

If issues occur, you can rollback:
```bash
npm install next@15.5.6 react@18.3.1 react-dom@18.3.1
npm install -D @types/react@18.3.27 @types/react-dom@18.3.7
```

## Resources

- [Next.js 16 Upgrade Guide](https://nextjs.org/docs/app/guides/upgrading/version-16)
- [React 19 Release Notes](https://react.dev/blog/2024/12/05/react-19)
- [Next.js 16 Blog Post](https://nextjs.org/blog/next-16)

## Recommended Approach

1. **Create a backup branch**: `git checkout -b backup-before-upgrade`
2. **Commit current state**: `git commit -am "Backup before Next.js 16 upgrade"`
3. **Update packages**: Run the install commands above
4. **Run codemod**: `npx @next/codemod@canary upgrade latest`
5. **Review changes**: Check what the codemod changed
6. **Manual fixes**: Apply any remaining manual fixes
7. **Test**: Thoroughly test your application
8. **Deploy**: Once confident, deploy to production

