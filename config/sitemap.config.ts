/**
 * Sitemap configuration file
 * Centralized configuration for sitemap generation
 */

/**
 * Sitemap configuration constants
 */
export const SITEMAP_CONFIG = {
  /** Last modified date - update this when content is actually modified */
  LAST_MODIFIED: new Date('2025-01-01'),

  /** Change frequencies */
  CHANGE_FREQUENCY: {
    ALWAYS: 'always' as const,
    HOURLY: 'hourly' as const,
    DAILY: 'daily' as const,
    WEEKLY: 'weekly' as const,
    MONTHLY: 'monthly' as const,
    YEARLY: 'yearly' as const,
    NEVER: 'never' as const,
  },

  /** Priority levels */
  PRIORITY: {
    HIGHEST: 1.0,
    HIGH: 0.9,
    MEDIUM: 0.7,
    LOW: 0.5,
    LOWEST: 0.3,
  },

  /** Default values */
  DEFAULTS: {
    CHANGE_FREQUENCY: 'monthly' as const,
    PRIORITY: 1.0,
  },
} as const;

/**
 * Page configuration for sitemap entries
 * Add new pages here as the site grows
 */
export interface PageConfig {
  /** URL path (relative to base URL) */
  path: string;
  /** Change frequency */
  changeFrequency?: typeof SITEMAP_CONFIG.CHANGE_FREQUENCY[keyof typeof SITEMAP_CONFIG.CHANGE_FREQUENCY];
  /** Priority (0.0 to 1.0) */
  priority?: number;
  /** Whether to include in sitemap (useful for conditional pages) */
  include?: boolean;
}

/**
 * Static pages configuration
 * Update this array when adding new pages
 */
export const STATIC_PAGES: PageConfig[] = [
  {
    path: '', // Homepage
    changeFrequency: SITEMAP_CONFIG.CHANGE_FREQUENCY.MONTHLY,
    priority: SITEMAP_CONFIG.PRIORITY.HIGHEST,
    include: true,
  },
  // Add more pages here as needed
  // Example:
  // {
  //   path: '/about',
  //   changeFrequency: SITEMAP_CONFIG.CHANGE_FREQUENCY.YEARLY,
  //   priority: SITEMAP_CONFIG.PRIORITY.MEDIUM,
  //   include: true,
  // },
];

