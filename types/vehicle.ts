export interface SiteConfig {
  title: string;
  description: string;
  url: string;
  faviconUrl: string;
  ogImage: string;
  logoUrl: string;
  brandName: string;
  link: string;
  brandColor: string;
  logoUrlTwo?: string;
}

export interface SectionVisibility {
  overview: boolean;
  capabilities: boolean;
  charging: boolean;
  technologies: boolean;
  design: boolean;
  business: boolean;
  gallery: boolean;
  specs: boolean;
}

export interface HeroPoint {
  backgroundImageUrl?: string;
  backgroundVideo?: string;
  imageUrl: string;
  title: string;
  description: string;
}

export interface OverviewSpec {
  imageUrl?: string;
  title?: string;
  description?: string;
}

export interface Overview {
  title: string;
  navLinkText: string;
  specs: OverviewSpec[];
}

export interface CapabilitySpec {
  label?: string;
  value?: string;
  otherValue?: string;
  imageUrl?: string;
}

export interface Capabilities {
  title: string;
  navLinkText: string;
  specs: CapabilitySpec[];
}

export interface ChargingOption {
  imageUrl: string;
  title: string;
  description: string;
}

export interface Charging {
  title: string;
  navLinkText: string;
  chargingOptions: ChargingOption[];
}

export interface TechnologyPoint {
  imageUrl: string;
  title: string;
  description: string;
}

export interface Technologies {
  title: string;
  navLinkText: string;
  technology: TechnologyPoint[];
}

export interface DesignImage {
  imageUrl: string;
  alt: string;
}

export interface Design {
  title: string;
  navLinkText: string;
  images: DesignImage[];
}

export interface BusinessPoint {
  imageUrl: string;
  alt: string;
  title: string;
  description: string;
  buttonText: string;
  buttonLinkUrl: string;
}

export interface Business {
  title: string;
  navLinkText: string;
  businessPoints: BusinessPoint[];
}

export interface GalleryImage {
  url: string;
  alt: string;
}

export interface Gallery {
  title: string;
  navLinkText: string;
  images: GalleryImage[];
}

export interface SpecItem {
  type?: string;
  value?: string;
}

export interface SpecDetail {
  title: string;
  data: (SpecItem | string)[];
}

export interface Specs {
  navLinkText: string;
  specDetails: SpecDetail[];
}

export interface VehicleData {
  siteConfig: SiteConfig;
  sectionVisibility: SectionVisibility;
  hero: HeroPoint[];
  overview: Overview;
  capabilities: Capabilities;
  charging: Charging;
  technologies: Technologies;
  design: Design;
  business: Business;
  gallery: Gallery;
  specs: Specs;
}

