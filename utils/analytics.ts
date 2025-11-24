/**
 * Analytics utility functions for tracking events
 */

interface AnalyticsEvent {
  category: string;
  action: string;
  label?: string;
  value?: number;
  path?: string;
}

/**
 * Track an event using Google Analytics dataLayer
 * @param category - Event category (e.g., 'Engagement', 'Navigation')
 * @param action - Event action (e.g., 'click', 'submit')
 * @param label - Event label (optional)
 * @param value - Event value (optional)
 * @param path - Page path (optional, defaults to current pathname)
 */
export function trackEvent(
  category: string,
  action: string,
  label?: string,
  value?: number,
  path?: string
): void {
  // Check if dataLayer exists (Google Tag Manager)
  if (typeof window !== 'undefined' && window.dataLayer) {
    const event: AnalyticsEvent = {
      category,
      action,
      ...(label && { label }),
      ...(value !== undefined && { value }),
      ...(path && { path }),
    };

    window.dataLayer.push({
      event: 'custom_event',
      eventCategory: category,
      eventAction: action,
      ...(label && { eventLabel: label }),
      ...(value !== undefined && { eventValue: value }),
      ...(path && { page_path: path }),
    });
  } else {
    // Fallback: log to console in development
    if (process.env.NODE_ENV === 'development') {
      console.log('Analytics Event:', { category, action, label, value, path });
    }
  }
}

/**
 * Track page view
 * @param path - Page path
 * @param title - Page title (optional)
 */
export function trackPageView(path: string, title?: string): void {
  if (typeof window !== 'undefined' && window.dataLayer) {
    window.dataLayer.push({
      event: 'page_view',
      page_path: path,
      ...(title && { page_title: title }),
    });
  }
}

/**
 * Track form submission
 * @param formName - Name/ID of the form
 * @param success - Whether submission was successful
 */
export function trackFormSubmission(formName: string, success: boolean): void {
  trackEvent(
    'Form',
    success ? 'submit_success' : 'submit_error',
    formName
  );
}

