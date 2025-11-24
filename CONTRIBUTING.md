# Contributing Guidelines

**Last Updated:** January 2025  
**Project:** RAM ProMaster EV Landing Page

---

## Welcome! 👋

Thank you for your interest in contributing to this project! This document provides guidelines and instructions for contributing.

---

## Table of Contents

1. [Code of Conduct](#code-of-conduct)
2. [Getting Started](#getting-started)
3. [Development Setup](#development-setup)
4. [Code Style](#code-style)
5. [Git Workflow](#git-workflow)
6. [Pull Request Process](#pull-request-process)
7. [Commit Message Guidelines](#commit-message-guidelines)
8. [Testing](#testing)
9. [Documentation](#documentation)

---

## Code of Conduct

### Our Standards

- Be respectful and inclusive
- Welcome constructive feedback
- Focus on what is best for the project
- Show empathy towards other contributors

---

## Getting Started

### Prerequisites

- **Node.js** 18.x or higher
- **npm**, **yarn**, or **pnpm**
- **Git**
- **Code Editor** (VS Code recommended)

### Fork and Clone

1. **Fork the repository** on GitHub
2. **Clone your fork:**
   ```bash
   git clone https://github.com/your-username/Landing.git
   cd Landing
   ```
3. **Add upstream remote:**
   ```bash
   git remote add upstream https://github.com/original-owner/Landing.git
   ```

---

## Development Setup

### 1. Install Dependencies

```bash
npm install
# or
yarn install
# or
pnpm install
```

### 2. Set Up Environment Variables

```bash
cp .env.example .env.local
```

Fill in your environment variables in `.env.local`:
- `NEXT_PUBLIC_BASE_URL`
- `NEXT_PUBLIC_RECAPTCHA_SITE_KEY`
- `RECAPTCHA_SECRET_KEY`
- `EMAIL_USER`
- `EMAIL_PASS`
- `EMAIL_TO`

### 3. Run Development Server

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 4. Verify Setup

- [ ] Development server starts without errors
- [ ] Page loads correctly
- [ ] No console errors
- [ ] Environment variables are set

---

## Code Style

### TypeScript

- **Use TypeScript** for all new files
- **Strict mode** enabled - follow TypeScript best practices
- **Type everything** - avoid `any` types
- **Use interfaces** for object types
- **Use type aliases** for unions and intersections

**Example:**
```typescript
interface User {
  firstName: string;
  lastName: string;
  email: string;
}

type Status = 'pending' | 'success' | 'error';
```

### React Components

- **Use functional components** (no class components)
- **Use TypeScript** for component props
- **Server components by default** - only use `'use client'` when needed
- **Extract reusable logic** into custom hooks
- **Keep components small** and focused

**Example:**
```typescript
interface ButtonProps {
  label: string;
  onClick: () => void;
  variant?: 'primary' | 'secondary';
}

export default function Button({ label, onClick, variant = 'primary' }: ButtonProps) {
  return (
    <button onClick={onClick} className={styles[variant]}>
      {label}
    </button>
  );
}
```

### File Naming

- **Components:** PascalCase (e.g., `ContactForm.tsx`)
- **Utilities:** camelCase (e.g., `vehicleService.ts`)
- **Styles:** Component name + `.module.scss` (e.g., `ContactForm.module.scss`)
- **Types:** camelCase + `.ts` (e.g., `vehicle.ts`)

### Import Organization

```typescript
// 1. React and Next.js imports
import { useState } from 'react';
import Image from 'next/image';

// 2. Third-party imports
import nodemailer from 'nodemailer';

// 3. Internal imports (using path aliases)
import { getVehicleData } from '@/utils/vehicleService';
import ContactForm from '@/app/components/Form/ContactForm/ContactForm';

// 4. Styles
import styles from './Component.module.scss';
```

### Path Aliases

Use path aliases for cleaner imports:

```typescript
// ✅ Good
import { getVehicleData } from '@/utils/vehicleService';
import ContactForm from '@components/Form/ContactForm/ContactForm';

// ❌ Bad
import { getVehicleData } from '../../../utils/vehicleService';
```

### SCSS/CSS

- **Use SCSS Modules** for component styles
- **BEM naming** (optional, but consistent)
- **Mobile-first** responsive design
- **Use CSS variables** for theming
- **No inline styles** (except dynamic values)

**Example:**
```scss
.container {
  padding: 1rem;
  
  @media (max-width: 768px) {
    padding: 0.5rem;
  }
}

.title {
  font-size: 2rem;
  color: var(--brand-color);
}
```

### Error Handling

- **Use error boundaries** for component errors
- **Handle API errors** gracefully
- **Show user-friendly messages** in production
- **Log errors** in development mode only

**Example:**
```typescript
try {
  await sendEmail(data);
} catch (error) {
  if (process.env.NODE_ENV === 'development') {
    console.error('Email error:', error);
  }
  return { error: 'Failed to send email' };
}
```

---

## Git Workflow

### Branch Naming

Use descriptive branch names:

```
feature/add-new-section
bugfix/fix-contact-form
docs/update-readme
refactor/optimize-components
```

### Branch Strategy

1. **Create a branch** from `main`:
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make your changes** and commit

3. **Keep branch updated:**
   ```bash
   git fetch upstream
   git rebase upstream/main
   ```

4. **Push to your fork:**
   ```bash
   git push origin feature/your-feature-name
   ```

---

## Commit Message Guidelines

### Format

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Types

- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, etc.)
- `refactor`: Code refactoring
- `perf`: Performance improvements
- `test`: Adding or updating tests
- `chore`: Maintenance tasks

### Examples

```
feat(contact): add form validation

Add client-side validation for email format and required fields.
Show error messages for invalid inputs.

Closes #123
```

```
fix(navbar): fix mobile menu closing issue

The mobile menu was not closing when clicking outside.
Added click outside handler to fix this.

Fixes #456
```

```
docs(readme): update installation instructions

Add Node.js version requirement and environment variable setup.
```

---

## Pull Request Process

### Before Submitting

- [ ] Code follows style guidelines
- [ ] All tests pass (if applicable)
- [ ] Documentation updated (if needed)
- [ ] No console errors
- [ ] Build succeeds (`npm run build`)
- [ ] No TypeScript errors
- [ ] No linter errors

### PR Checklist

- [ ] **Title:** Clear and descriptive
- [ ] **Description:** Explains what and why
- [ ] **Screenshots:** If UI changes
- [ ] **Testing:** How to test the changes
- [ ] **Breaking Changes:** Documented if any
- [ ] **Related Issues:** Linked if applicable

### PR Template

```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Testing
How to test these changes

## Screenshots (if applicable)
Add screenshots here

## Checklist
- [ ] Code follows style guidelines
- [ ] Self-review completed
- [ ] Comments added for complex code
- [ ] Documentation updated
- [ ] No new warnings
- [ ] Tests added/updated (if applicable)
```

### Review Process

1. **Automated Checks:** CI/CD runs automatically
2. **Code Review:** Maintainers review the PR
3. **Feedback:** Address any requested changes
4. **Approval:** Once approved, PR is merged

---

## Testing

### Manual Testing

Before submitting a PR, test:

- [ ] Feature works as expected
- [ ] No console errors
- [ ] Responsive design works
- [ ] Accessibility features work
- [ ] Cross-browser compatibility

### Automated Testing

(When tests are implemented)

```bash
npm test
npm run test:coverage
```

---

## Documentation

### When to Update Documentation

- **New features:** Add to README.md
- **API changes:** Update docs/API.md
- **Architecture changes:** Update docs/ARCHITECTURE.md
- **Configuration changes:** Update README.md

### Documentation Style

- **Clear and concise**
- **Code examples** where helpful
- **Keep up-to-date** with code changes
- **Use markdown** formatting

---

## Project-Specific Guidelines

### Server/Client Components

- **Default to server components** - only use `'use client'` when needed
- **Split large components** into server/client parts
- **Keep client components small** - only interactive parts

### Performance

- **Optimize images** - use Next.js Image component
- **Lazy load** below-fold content
- **Minimize client-side JavaScript**
- **Use server components** for static content

### Accessibility

- **Semantic HTML** - use proper elements
- **ARIA labels** - for screen readers
- **Keyboard navigation** - all interactive elements
- **Color contrast** - WCAG AA compliant
- **Touch targets** - 44x44px minimum

### SEO

- **Structured data** - add schemas where appropriate
- **Metadata** - proper title, description, keywords
- **Alt text** - all images
- **Semantic HTML** - proper heading hierarchy

---

## Getting Help

### Resources

- **Documentation:** Check [`README.md`](./README.md) and [`docs/`](./docs/)
- **Issues:** Search existing issues on GitHub
- **Discussions:** Use GitHub Discussions for questions

### Questions?

- Open an issue for bugs
- Start a discussion for questions
- Contact maintainers for sensitive matters

---

## Recognition

Contributors will be recognized in:
- README.md contributors section
- Release notes
- Project documentation

---

## License

By contributing, you agree that your contributions will be licensed under the same license as the project.

---

## Thank You! 🎉

Your contributions make this project better. Thank you for taking the time to contribute!

---

**Last Updated:** January 2025  
**Contributing Guidelines Version:** 1.0.0

