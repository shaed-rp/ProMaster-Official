import { getVehicleData } from '@/utils/vehicleService';
import PromasterClient from './PromasterClient';
import { calculateSectionTitles } from '@/utils/sectionTitles';
import type { Metadata } from 'next';

const baseUrl =
  process.env.NEXT_PUBLIC_BASE_URL || 'https://commercialevs.com';

export const metadata: Metadata = {
  title: 'RAM ProMaster EV | Specifications & Features | CommercialEVs.com',
  description:
    'Explore the 2024 RAM ProMaster EV specifications, features, and capabilities. 110 kWh battery, 162-mile range, 3,020 lb payload, zero emissions. Customize your commercial electric van.',
  keywords: [
    'RAM ProMaster EV specifications',
    'RAM ProMaster EV features',
    'commercial electric van specs',
    'RAM ProMaster EV range',
    'electric van payload',
    'commercial EV capabilities',
    'ProMaster EV price',
    'ProMaster EV charging',
    'ProMaster EV battery',
    'ProMaster EV cargo capacity',
    'ProMaster EV interior features',
    'ProMaster EV exterior features',
    'ProMaster EV powertrain',
    'ProMaster EV warranty',
    'ProMaster EV tax credits',
    'RAM ProMaster EV complete guide',
    'RAM ProMaster EV review',
    'RAM ProMaster EV vs Ford E-Transit',
    'RAM ProMaster EV vs Mercedes eSprinter',
    'best commercial electric van 2024',
    'RAM ProMaster EV charging time',
    'RAM ProMaster EV battery life',
    'RAM ProMaster EV for fleet',
    'commercial electric van comparison',
    'RAM ProMaster EV dimensions',
    'RAM ProMaster EV towing capacity',
    'RAM ProMaster EV interior space',
    'how much does RAM ProMaster EV cost',
    'RAM ProMaster EV tax deduction',
    'commercial EV incentives 2024',
  ],
  alternates: {
    canonical: baseUrl,
  },
  openGraph: {
    title: 'RAM ProMaster EV | Specifications & Features | CommercialEVs.com',
    description:
      'Explore the 2024 RAM ProMaster EV specifications, features, and capabilities. 110 kWh battery, 162-mile range, 3,020 lb payload, 520 cubic feet cargo space. Zero emissions commercial electric van starting at $77,995.',
    url: baseUrl,
    siteName: 'CommercialEVs.com',
    images: [
      {
        url: '/assets/promaster/promasterEV.webp',
        width: 1200,
        height: 630,
        alt: '2024 RAM ProMaster EV - Commercial Electric Van',
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'RAM ProMaster EV | Specifications & Features | CommercialEVs.com',
    description:
      'Explore the 2024 RAM ProMaster EV specifications, features, and capabilities. 110 kWh battery, 162-mile range, 3,020 lb payload, 520 cubic feet cargo space.',
    images: ['/assets/promaster/promasterEV.webp'],
  },
};

export default async function PromasterPage() {
  try {
    const data = await getVehicleData('promaster');

    if (!data) {
      return (
        <div>
          <h1>Error loading data</h1>
          <p>Please try again later.</p>
        </div>
      );
    }

    // Calculate section titles on the server
    const sectionTitles = calculateSectionTitles(data);

    return <PromasterClient data={data} sectionTitles={sectionTitles} />;
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.error('Error in PromasterPage:', error);
    }
    return (
      <div>
        <h1>Error loading page</h1>
        <p>Please try again later.</p>
      </div>
    );
  }
}
