import { getVehicleData } from '@/utils/vehicleService';
import PromasterClient from './PromasterClient';
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
  ],
  alternates: {
    canonical: `${baseUrl}/promaster`,
  },
  openGraph: {
    title: 'RAM ProMaster EV | Specifications & Features',
    description:
      'Explore the 2024 RAM ProMaster EV specifications, features, and capabilities. 110 kWh battery, 162-mile range, 3,020 lb payload.',
    url: `${baseUrl}/promaster`,
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
    title: 'RAM ProMaster EV | Specifications & Features',
    description:
      'Explore the 2024 RAM ProMaster EV specifications, features, and capabilities.',
    images: ['/assets/promaster/promasterEV.webp'],
  },
};

export default async function PromasterPage() {
  const data = await getVehicleData('promaster');

  if (!data) {
    return <div>Error loading data</div>;
  }

  return <PromasterClient data={data} />;
}
