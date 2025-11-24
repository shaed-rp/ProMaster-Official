import { MetadataRoute } from 'next';
import {
  getBaseUrl,
  createSitemapEntry,
  validateSitemapEntry,
} from '@/utils/seo';
import {
  SITEMAP_CONFIG,
  STATIC_PAGES,
  type PageConfig,
} from '@/config/sitemap.config';

/**
 * Sitemap configuration for search engines
 *
 * Best practices implemented:
 * - Only includes indexable pages (excludes /thankyou which is noindex)
 * - Uses canonical URLs to avoid duplicate content
 * - Static lastModified date prevents misleading updates on every build
 * - URL validation and normalization for consistency
 * - Type-safe implementation with proper error handling
 * - Runtime validation of all entries
 * - Easy to extend via configuration file
 * - Centralized configuration management
 *
 * Future enhancements:
 * - Add image sitemap support (if needed)
 * - Add video sitemap support (if needed)
 * - Add sitemap index for large sites (if needed)
 * - Add dynamic page discovery (if needed)
 * - Make async for dynamic content fetching (if needed)
 *
 * @returns Sitemap array with all indexable pages
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = getBaseUrl();
  const entries = buildSitemapEntries(baseUrl);

  // Validate all entries before returning
  const validEntries = entries.filter(validateSitemapEntry);

  if (
    validEntries.length !== entries.length &&
    process.env.NODE_ENV === 'development'
  ) {
    console.warn(
      `Sitemap: ${entries.length - validEntries.length} invalid entries filtered out`
    );
  }

  if (validEntries.length === 0) {
    if (process.env.NODE_ENV === 'development') {
      console.error('Sitemap: No valid entries found!');
    }
    // Return at least the homepage to prevent errors
    return [
      createSitemapEntry(baseUrl, {
        url: baseUrl,
        lastModified: SITEMAP_CONFIG.LAST_MODIFIED,
        changeFrequency: SITEMAP_CONFIG.DEFAULTS.CHANGE_FREQUENCY,
        priority: SITEMAP_CONFIG.DEFAULTS.PRIORITY,
      }),
    ];
  }

  return validEntries;
}

/**
 * Builds all sitemap entries for the site
 * Uses configuration from sitemap.config.ts for easy management
 * @param baseUrl - The normalized base URL
 * @returns Array of sitemap entries
 */
function buildSitemapEntries(baseUrl: string): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  // Process static pages from configuration
  for (const page of STATIC_PAGES) {
    // Skip pages marked as excluded
    if (page.include === false) {
      continue;
    }

    try {
      const entry = createSitemapEntry(baseUrl, {
        path: page.path,
        lastModified: SITEMAP_CONFIG.LAST_MODIFIED,
        changeFrequency:
          page.changeFrequency ||
          SITEMAP_CONFIG.DEFAULTS.CHANGE_FREQUENCY,
        priority: page.priority || SITEMAP_CONFIG.DEFAULTS.PRIORITY,
      });

      entries.push(entry);
    } catch (error) {
      if (process.env.NODE_ENV === 'development') {
        console.error(`Failed to create sitemap entry for ${page.path}:`, error);
      }
      // Continue processing other pages even if one fails
    }
  }

  return entries;
}

