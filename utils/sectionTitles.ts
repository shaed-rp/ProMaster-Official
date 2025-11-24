import { VehicleData } from '@/types/vehicle';

/**
 * Calculate section titles for navigation based on vehicle data
 * This runs on the server side to reduce client-side computation
 */
export function calculateSectionTitles(data: VehicleData): {
  [key: string]: string;
} {
  const titles: { [key: string]: string } = {};

  if (
    data.sectionVisibility.overview &&
    data.overview.specs.some(
      (spec) => spec.description || spec.title || spec.imageUrl
    )
  ) {
    titles.overview = data.overview.navLinkText;
  }

  if (
    data.sectionVisibility.capabilities &&
    data.capabilities.specs.some(
      (spec) => spec.label || spec.value || spec.imageUrl || spec.otherValue
    )
  ) {
    titles.capabilities = data.capabilities.navLinkText;
  }

  if (
    data.sectionVisibility.charging &&
    data.charging.chargingOptions.some(
      (option) => option.title || option.description || option.imageUrl
    )
  ) {
    titles.charging = data.charging.navLinkText;
  }

  if (
    data.sectionVisibility.technologies &&
    data.technologies.technology.some(
      (tech) => tech.title || tech.description || tech.imageUrl
    )
  ) {
    titles.technologies = data.technologies.navLinkText;
  }

  if (
    data.sectionVisibility.design &&
    data.design.images.some((image) => image.imageUrl)
  ) {
    titles.design = data.design.navLinkText;
  }

  if (
    data.sectionVisibility.business &&
    data.business.businessPoints.some(
      (point) => point.title || point.description
    )
  ) {
    titles.business = data.business.navLinkText;
  }

  if (
    data.sectionVisibility.gallery &&
    data.gallery.images.some((image) => image.url)
  ) {
    titles.gallery = data.gallery.navLinkText;
  }

  if (
    data.sectionVisibility.specs &&
    data.specs.specDetails.some(
      (section) => section.title || section.data.some((item) => item)
    )
  ) {
    titles.specs = data.specs.navLinkText;
  }

  titles['request-info'] = 'Get A Free Quote';
  return titles;
}

