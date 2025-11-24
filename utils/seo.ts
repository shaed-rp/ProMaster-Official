import type { MetadataRoute } from 'next';

/**
 * SEO utility functions for metadata routes (sitemap, robots.txt)
 */

/**
 * Normalizes a URL by ensuring it has a protocol and removing trailing slashes
 * @param url - The URL to normalize
 * @returns Normalized URL
 */
export function normalizeUrl(url: string): string {
  let normalized = url.trim();

  // Ensure URL has a protocol
  if (!normalized.startsWith('http://') && !normalized.startsWith('https://')) {
    normalized = `https://${normalized}`;
  }

  // Remove trailing slash for consistency
  normalized = normalized.replace(/\/$/, '');

  return normalized;
}

/**
 * Validates that a string is a valid URL format
 * @param url - The URL to validate
 * @returns True if valid, false otherwise
 */
export function isValidUrl(url: string): boolean {
  try {
    const urlObj = new URL(url);
    return urlObj.protocol === 'http:' || urlObj.protocol === 'https:';
  } catch {
    return false;
  }
}

/**
 * Gets the base URL with validation and normalization
 * Falls back to default if invalid URL is provided
 * @param defaultUrl - Default URL to use if env var is invalid (default: 'https://commercialevs.com')
 * @returns Normalized base URL
 */
export function getBaseUrl(defaultUrl = 'https://commercialevs.com'): string {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || defaultUrl;
  const normalizedUrl = normalizeUrl(baseUrl);

  if (!isValidUrl(normalizedUrl)) {
    if (process.env.NODE_ENV === 'development') {
      console.warn(
        `Invalid NEXT_PUBLIC_BASE_URL: "${baseUrl}". Using fallback: "${defaultUrl}"`
      );
    }
    return defaultUrl;
  }

  return normalizedUrl;
}

/**
 * Sitemap entry configuration options
 */
export interface SitemapEntryOptions {
  /** The URL path (will be combined with baseUrl) */
  path?: string;
  /** Full URL (if provided, path is ignored) */
  url?: string;
  /** Last modified date */
  lastModified?: Date | string;
  /** Change frequency */
  changeFrequency?: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  /** Priority (0.0 to 1.0) */
  priority?: number;
}

/**
 * Creates a sitemap entry with validation and normalization
 * @param baseUrl - The base URL of the site
 * @param options - Sitemap entry options
 * @returns Validated sitemap entry
 */
export function createSitemapEntry(
  baseUrl: string,
  options: SitemapEntryOptions = {}
): MetadataRoute.Sitemap[0] {
  const {
    path = '',
    url: fullUrl,
    lastModified,
    changeFrequency = 'monthly',
    priority = 0.8,
  } = options;

  // Build the full URL
  const url = fullUrl || `${baseUrl}${path ? `/${path.replace(/^\//, '')}` : ''}`;
  const normalizedUrl = normalizeUrl(url);

  // Validate URL
  if (!isValidUrl(normalizedUrl)) {
    throw new Error(`Invalid sitemap URL: ${url}`);
  }

  // Validate priority
  const validatedPriority = Math.max(0, Math.min(1, priority));

  // Normalize lastModified
  const normalizedLastModified = lastModified
    ? typeof lastModified === 'string'
      ? new Date(lastModified)
      : lastModified
    : undefined;

  return {
    url: normalizedUrl,
    ...(normalizedLastModified && { lastModified: normalizedLastModified }),
    changeFrequency,
    priority: validatedPriority,
  };
}

/**
 * Validates a sitemap entry
 * @param entry - The sitemap entry to validate
 * @returns True if valid, false otherwise
 */
export function validateSitemapEntry(
  entry: MetadataRoute.Sitemap[0]
): boolean {
  if (!entry.url || !isValidUrl(entry.url)) {
    return false;
  }

  if (entry.priority !== undefined) {
    if (entry.priority < 0 || entry.priority > 1) {
      return false;
    }
  }

  const validChangeFrequencies = [
    'always',
    'hourly',
    'daily',
    'weekly',
    'monthly',
    'yearly',
    'never',
  ];
  if (
    entry.changeFrequency &&
    !validChangeFrequencies.includes(entry.changeFrequency)
  ) {
    return false;
  }

  return true;
}

