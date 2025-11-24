# Testing Documentation

**Last Updated:** January 2025  
**Status:** Testing Strategy & Guidelines

---

## Overview

This document outlines the testing strategy, setup, and guidelines for the RAM ProMaster EV Landing Page project. While automated tests are not currently implemented, this guide provides a framework for adding comprehensive testing coverage.

---

## Testing Philosophy

### Goals

- **Reliability:** Ensure the application works correctly across all scenarios
- **Confidence:** Enable safe refactoring and feature additions
- **Documentation:** Tests serve as living documentation
- **Quality:** Catch bugs before they reach production

### Testing Pyramid

```
        /\
       /  \      E2E Tests (Few)
      /____\     
     /      \    Integration Tests (Some)
    /________\   
   /          \  Unit Tests (Many)
  /____________\
```

---

## Testing Types

### 1. Unit Tests

**Purpose:** Test individual functions and components in isolation

**Tools:** Jest, React Testing Library, Vitest

**What to Test:**
- Utility functions (`utils/vehicleService.ts`, `utils/sectionTitles.ts`)
- Component logic (hooks, calculations)
- Type definitions
- Helper functions

**Example:**
```typescript
// __tests__/utils/vehicleService.test.ts
import { getVehicleData } from '@/utils/vehicleService';

describe('vehicleService', () => {
  it('should return promaster data', () => {
    const data = getVehicleData('promaster');
    expect(data).toBeDefined();
    expect(data.name).toBe('RAM ProMaster EV');
  });
});
```

---

### 2. Component Tests

**Purpose:** Test React components in isolation

**Tools:** React Testing Library, Jest

**What to Test:**
- Component rendering
- User interactions
- Props handling
- Accessibility features
- Error states

**Example:**
```typescript
// __tests__/components/ContactForm.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import ContactForm from '@/app/components/Form/ContactForm/ContactForm';

describe('ContactForm', () => {
  it('should render form fields', () => {
    render(<ContactForm />);
    expect(screen.getByLabelText(/first name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
  });

  it('should show validation errors', async () => {
    render(<ContactForm />);
    const submitButton = screen.getByRole('button', { name: /submit/i });
    fireEvent.click(submitButton);
    expect(await screen.findByText(/required/i)).toBeInTheDocument();
  });
});
```

---

### 3. Integration Tests

**Purpose:** Test how components work together

**Tools:** React Testing Library, Jest

**What to Test:**
- Component interactions
- Form submissions
- API calls (mocked)
- Navigation flows
- State management

**Example:**
```typescript
// __tests__/integration/contact-flow.test.tsx
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ContactForm from '@/app/components/Form/ContactForm/ContactForm';

describe('Contact Form Flow', () => {
  it('should submit form successfully', async () => {
    const mockFetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ message: 'Email sent successfully' }),
      })
    );
    global.fetch = mockFetch;

    render(<ContactForm />);
    
    await userEvent.type(screen.getByLabelText(/first name/i), 'John');
    await userEvent.type(screen.getByLabelText(/email/i), 'john@example.com');
    await userEvent.click(screen.getByRole('button', { name: /submit/i }));

    await waitFor(() => {
      expect(mockFetch).toHaveBeenCalledWith('/api/contact', expect.any(Object));
    });
  });
});
```

---

### 4. End-to-End (E2E) Tests

**Purpose:** Test complete user flows

**Tools:** Playwright, Cypress

**What to Test:**
- Complete user journeys
- Cross-browser compatibility
- Real API interactions
- Performance scenarios

**Example:**
```typescript
// e2e/contact-form.spec.ts
import { test, expect } from '@playwright/test';

test('should submit contact form', async ({ page }) => {
  await page.goto('http://localhost:3000');
  
  // Click contact button
  await page.click('text=Get A Free Quote');
  
  // Fill form
  await page.fill('[name="firstName"]', 'John');
  await page.fill('[name="lastName"]', 'Doe');
  await page.fill('[name="email"]', 'john@example.com');
  
  // Handle reCAPTCHA (mock or skip in test)
  // Submit form
  await page.click('button[type="submit"]');
  
  // Verify redirect to thank you page
  await expect(page).toHaveURL(/thankyou/);
});
```

---

## Testing Setup

### Recommended Tools

#### Unit & Component Testing
- **Jest** - Test runner and assertion library
- **React Testing Library** - Component testing utilities
- **@testing-library/jest-dom** - Custom matchers

#### E2E Testing
- **Playwright** - Modern E2E testing framework
- **Cypress** - Alternative E2E framework

#### Code Coverage
- **Jest Coverage** - Built-in coverage reports
- **Codecov** - Coverage reporting service

### Installation

```bash
# Install testing dependencies
npm install --save-dev jest @testing-library/react @testing-library/jest-dom @testing-library/user-event
npm install --save-dev @playwright/test
npm install --save-dev @types/jest
```

### Configuration

#### Jest Configuration (`jest.config.js`)

```javascript
const nextJest = require('next/jest');

const createJestConfig = nextJest({
  dir: './',
});

const customJestConfig = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  testEnvironment: 'jest-environment-jsdom',
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/$1',
    '^@components/(.*)$': '<rootDir>/app/components/$1',
    '^@utils/(.*)$': '<rootDir>/utils/$1',
  },
  collectCoverageFrom: [
    'app/**/*.{js,jsx,ts,tsx}',
    'utils/**/*.{js,jsx,ts,tsx}',
    '!**/*.d.ts',
    '!**/node_modules/**',
    '!**/.next/**',
  ],
};

module.exports = createJestConfig(customJestConfig);
```

#### Jest Setup (`jest.setup.js`)

```javascript
import '@testing-library/jest-dom';
```

#### Playwright Configuration (`playwright.config.ts`)

```typescript
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  use: {
    baseURL: 'http://localhost:3000',
    trace: 'on-first-retry',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
  ],
  webServer: {
    command: 'npm run dev',
    url: 'http://localhost:3000',
    reuseExistingServer: !process.env.CI,
  },
});
```

### Package.json Scripts

```json
{
  "scripts": {
    "test": "jest",
    "test:watch": "jest --watch",
    "test:coverage": "jest --coverage",
    "test:e2e": "playwright test",
    "test:e2e:ui": "playwright test --ui"
  }
}
```

---

## Testing Checklist

### Component Testing Checklist

- [ ] Component renders without errors
- [ ] All props are handled correctly
- [ ] User interactions work (clicks, inputs, etc.)
- [ ] Accessibility features work (ARIA labels, keyboard navigation)
- [ ] Error states display correctly
- [ ] Loading states display correctly
- [ ] Responsive behavior (if applicable)

### Form Testing Checklist

- [ ] All fields render
- [ ] Validation works correctly
- [ ] Error messages display
- [ ] Form submission works
- [ ] Loading states during submission
- [ ] Success/error handling
- [ ] Accessibility (labels, error announcements)

### API Testing Checklist

- [ ] GET endpoint returns correct data
- [ ] POST endpoint accepts valid data
- [ ] POST endpoint rejects invalid data
- [ ] Error handling works correctly
- [ ] reCAPTCHA verification works
- [ ] Email sending works (in test environment)

### E2E Testing Checklist

- [ ] Homepage loads correctly
- [ ] Navigation works
- [ ] Contact form flow works
- [ ] Thank you page displays
- [ ] Mobile menu works
- [ ] All sections render
- [ ] Images load correctly
- [ ] Links work correctly

---

## Test Examples

### Testing Utility Functions

```typescript
// __tests__/utils/sectionTitles.test.ts
import { calculateSectionTitles } from '@/utils/sectionTitles';

describe('sectionTitles', () => {
  it('should calculate section titles correctly', () => {
    const data = {
      sections: [
        { id: 'overview', title: 'Overview' },
        { id: 'specs', title: 'Specifications' },
      ],
    };
    
    const titles = calculateSectionTitles(data);
    expect(titles).toEqual({
      overview: 'Overview',
      specs: 'Specifications',
    });
  });
});
```

### Testing API Routes

```typescript
// __tests__/api/contact.test.ts
import { POST } from '@/app/api/contact/route';
import { NextRequest } from 'next/server';

describe('/api/contact', () => {
  beforeEach(() => {
    process.env.RECAPTCHA_SECRET_KEY = 'test-secret';
    process.env.EMAIL_USER = 'test@example.com';
    process.env.EMAIL_PASS = 'test-password';
    process.env.EMAIL_TO = 'recipient@example.com';
  });

  it('should reject invalid reCAPTCHA', async () => {
    const request = new NextRequest('http://localhost:3000/api/contact', {
      method: 'POST',
      body: JSON.stringify({
        firstName: 'Test',
        lastName: 'User',
        email: 'test@example.com',
        captchaToken: 'invalid-token',
      }),
    });

    const response = await POST(request);
    expect(response.status).toBe(400);
  });
});
```

---

## Coverage Goals

### Recommended Coverage Targets

- **Unit Tests:** 80%+ coverage
- **Component Tests:** 70%+ coverage
- **Integration Tests:** 60%+ coverage
- **E2E Tests:** Critical user flows only

### Priority Areas

1. **High Priority:**
   - API routes
   - Form validation
   - Error handling
   - Critical user flows

2. **Medium Priority:**
   - Component rendering
   - User interactions
   - Navigation

3. **Low Priority:**
   - Static content
   - Styling (visual regression testing)

---

## Continuous Integration

### GitHub Actions Example

```yaml
# .github/workflows/test.yml
name: Tests

on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm ci
      - run: npm run test
      - run: npm run test:coverage
      - run: npm run test:e2e
```

---

## Best Practices

### 1. Test Behavior, Not Implementation

✅ **Good:**
```typescript
expect(screen.getByRole('button', { name: /submit/i })).toBeDisabled();
```

❌ **Bad:**
```typescript
expect(component.state.isSubmitting).toBe(true);
```

### 2. Use Accessible Queries

✅ **Good:**
```typescript
screen.getByRole('button', { name: /submit/i });
screen.getByLabelText(/email/i);
```

❌ **Bad:**
```typescript
screen.getByTestId('submit-button');
```

### 3. Mock External Dependencies

```typescript
jest.mock('nodemailer', () => ({
  createTransport: jest.fn(() => ({
    sendMail: jest.fn(() => Promise.resolve()),
  })),
}));
```

### 4. Clean Up After Tests

```typescript
afterEach(() => {
  jest.clearAllMocks();
});
```

### 5. Test Error Cases

```typescript
it('should handle API errors gracefully', async () => {
  global.fetch = jest.fn(() => Promise.reject(new Error('Network error')));
  // Test error handling
});
```

---

## Manual Testing Checklist

While automated tests are being implemented, use this manual testing checklist:

### Pre-Deployment Testing

- [ ] All pages load correctly
- [ ] Contact form submits successfully
- [ ] Email is received
- [ ] reCAPTCHA works
- [ ] Mobile menu works
- [ ] All links work
- [ ] Images load
- [ ] No console errors
- [ ] No TypeScript errors
- [ ] Build succeeds

### Browser Testing

- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Edge (latest)
- [ ] Mobile Safari (iOS)
- [ ] Chrome Mobile (Android)

### Device Testing

- [ ] Desktop (1920x1080)
- [ ] Tablet (768x1024)
- [ ] Mobile (375x667)
- [ ] Landscape orientation

---

## Related Documentation

- [`README.md`](../README.md) - Main project documentation
- [`docs/API.md`](./API.md) - API documentation
- [`docs/TROUBLESHOOTING.md`](./TROUBLESHOOTING.md) - Troubleshooting guide
- [React Testing Library](https://testing-library.com/react) - Testing utilities
- [Playwright](https://playwright.dev/) - E2E testing framework
- [Jest](https://jestjs.io/) - Testing framework

---

## Next Steps

1. **Set up testing infrastructure** (Jest, React Testing Library)
2. **Write unit tests** for utility functions
3. **Write component tests** for critical components
4. **Set up E2E tests** for critical user flows
5. **Add CI/CD** integration
6. **Set coverage goals** and track progress

---

**Last Updated:** January 2025  
**Status:** Framework Ready - Implementation Pending

