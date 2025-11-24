import { MetadataRoute } from 'next';
import { getBaseUrl } from '@/utils/seo';

/**
 * Robots.txt configuration for search engine crawlers
 *
 * Best practices:
 * - Blocks API routes and thank you page from indexing
 * - Points to sitemap for better crawl efficiency
 * - Uses validated and normalized URLs
 *
 * @returns Robots configuration
 */
export default function robots(): MetadataRoute.Robots {
  const baseUrl = getBaseUrl();

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/thankyou'],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}

