import { VehicleData } from '@/types/vehicle';
import promasterData from '@/data/promasterData.json';

export interface SectionConfig {
  id: string;
  name: string;
  isVisible: boolean;
  hideFromNav?: boolean;
  link?: string;
}

export interface VehicleConfig {
  siteConfig: {
    brandColor: string;
    logoUrl: string;
    logoUrlTwo?: string;
    brandName: string;
  };
  sections: SectionConfig[];
}

// Create vehicle configs based on data
const createPromasterConfig = (): VehicleConfig => {
  const data = promasterData as VehicleData;
  
  return {
    siteConfig: {
      brandColor: data.siteConfig.brandColor,
      logoUrl: data.siteConfig.logoUrl,
      logoUrlTwo: data.siteConfig.logoUrlTwo,
      brandName: data.siteConfig.brandName,
    },
    sections: [
      {
        id: 'overview',
        name: data.overview.navLinkText,
        isVisible: data.sectionVisibility.overview,
      },
      {
        id: 'capabilities',
        name: data.capabilities.navLinkText,
        isVisible: data.sectionVisibility.capabilities,
      },
      {
        id: 'charging',
        name: data.charging.navLinkText,
        isVisible: data.sectionVisibility.charging,
      },
      {
        id: 'technologies',
        name: data.technologies.navLinkText,
        isVisible: data.sectionVisibility.technologies,
      },
      {
        id: 'design',
        name: data.design.navLinkText,
        isVisible: data.sectionVisibility.design,
      },
      {
        id: 'business',
        name: data.business.navLinkText,
        isVisible: data.sectionVisibility.business,
      },
      {
        id: 'gallery',
        name: data.gallery.navLinkText,
        isVisible: data.sectionVisibility.gallery,
      },
      {
        id: 'specs',
        name: data.specs.navLinkText,
        isVisible: data.sectionVisibility.specs,
      },
      {
        id: 'request-info',
        name: 'Get A Free Quote',
        isVisible: true,
      },
    ],
  };
};

export const vehicleConfigs: Record<string, VehicleConfig> = {
  promaster: createPromasterConfig(),
};

