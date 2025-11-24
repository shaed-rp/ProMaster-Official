import Script from 'next/script';
import { VehicleData } from '@/types/vehicle';

interface StructuredDataProps {
  data: VehicleData;
  baseUrl: string;
}

export default function StructuredData({ data, baseUrl }: StructuredDataProps) {
  // Extract pricing information
  const pricingSection = data.specs?.specDetails?.find(
    (section) => section.title === 'Pricing'
  );
  const basePrice = pricingSection?.data?.find(
    (item: any) => item.type === 'Base Price'
  )?.value;
  const destinationFee = pricingSection?.data?.find(
    (item: any) => item.type === 'Destination Fee'
  )?.value;
  const optionsPrice = pricingSection?.data?.find(
    (item: any) => item.type === 'Selected Options Price'
  )?.value;
  const priceValue = basePrice
    ? parseFloat(basePrice.replace(/[^0-9.]/g, ''))
    : null;
  const destinationFeeValue = destinationFee
    ? parseFloat(destinationFee.replace(/[^0-9.]/g, ''))
    : null;
  const totalPrice = priceValue && destinationFeeValue
    ? priceValue + destinationFeeValue
    : priceValue;

  // Extract vehicle specifications
  const powertrainSection = data.specs?.specDetails?.find(
    (section) => section.title === 'Powertrain'
  );
  const driveType = powertrainSection?.data?.find(
    (item: any) => item.type === 'Drive Type'
  )?.value;
  const transmission = powertrainSection?.data?.find(
    (item: any) => item.type === 'Transmission'
  )?.value;
  const cylinderConfig = powertrainSection?.data?.find(
    (item: any) => item.type === 'Cylinder configuration'
  )?.value;

  // Extract exterior features
  const exteriorSection = data.specs?.specDetails?.find(
    (section) => section.title === 'Exterior Features'
  );
  const exteriorFeatures = (exteriorSection?.data as string[]) || [];
  const cargoVolumeMatch = exteriorFeatures.find((f: string) => f.includes('ft3'))?.match(/(\d+)\s*ft3/i);
  const cargoVolume = cargoVolumeMatch ? cargoVolumeMatch[1] : null;
  const roofHeight = exteriorFeatures.find((f: string) => f.includes('Roof Height')) || null;

  // Extract interior features
  const interiorSection = data.specs?.specDetails?.find(
    (section) => section.title === 'Interior Features'
  );
  const interiorFeatures = (interiorSection?.data as string[]) || [];

  const capabilitiesSection = data.capabilities?.specs || [];
  const batteryCapacity = capabilitiesSection.find(
    (spec: any) => spec.label === 'Battery Capacity'
  )?.value;
  const maxTorque = capabilitiesSection.find(
    (spec: any) => spec.label === 'Maximum Torque (LB-FT)'
  )?.value;

  // Extract additional specs
  const overviewSpecs = data.overview?.specs || [];
  const payloadSpec = overviewSpecs.find(
    (spec: any) => spec.description?.includes('Payload')
  );
  const payloadValue = payloadSpec?.description?.match(/(\d+[,.]?\d*)\s*(lb|pound)/i)?.[1];
  const rangeSpec = overviewSpecs.find(
    (spec: any) => spec.description?.includes('Range') || spec.description?.includes('Miles')
  );
  const rangeValue = rangeSpec?.description?.match(/(\d+)\s*(mile|mi)/i)?.[1];
  const horsepowerSpec = overviewSpecs.find(
    (spec: any) => spec.title?.includes('HP') || spec.title?.includes('268')
  );
  const horsepowerValue = horsepowerSpec?.title?.match(/(\d+)/)?.[1];

  // Collect all images for the vehicle
  const vehicleImages = [
    data.hero[0]?.imageUrl ? `${baseUrl}${data.hero[0].imageUrl}` : null,
    `${baseUrl}${data.siteConfig.ogImage}`,
    ...(data.gallery?.images?.slice(0, 3).map((img: any) => `${baseUrl}${img.url}`) || []),
  ].filter(Boolean);

  // Car Schema (more specific than Vehicle, extends both Vehicle and Product)
  const carSchema = {
    '@context': 'https://schema.org',
    '@type': 'Car',
    '@id': `${baseUrl}/promaster#vehicle`,
    name: data.hero[0]?.title || 'RAM ProMaster EV',
    description: `The RAM ProMaster EV is a 2024 commercial electric van designed for businesses seeking zero-emission transportation solutions. With a 162-mile range on a single charge, this electric van offers a 3,020 lb payload capacity and 520 cubic feet of cargo space, making it ideal for delivery services, fleet operations, and commercial applications. Powered by a 110 kWh battery pack, the ProMaster EV delivers 268 horsepower and 302 lb-ft of torque through its front-wheel drive system. Key features include walk-in pocket doors, rear roll-up doors, premium interior with heated seats and steering wheel, Uconnect 5 infotainment system, digital rearview mirror, LED cargo lighting, and support for Level 1, Level 2, and Level 3 DC fast charging. The vehicle starts at $77,995 base price ($79,990 with destination fee) and may be eligible for tax credits and deductions including Section 168(k) Tax Deduction. The battery is covered by an 8-year or 100,000-mile limited warranty.`,
    brand: {
      '@type': 'Brand',
      name: 'RAM',
      logo: 'https://www.ramtrucks.com/content/dam/fca-brands/na/ram/en_us/brand/ram-logo.png',
    },
    manufacturer: {
      '@type': 'Organization',
      name: 'RAM Trucks',
      url: 'https://www.ramtrucks.com',
      parentOrganization: {
        '@type': 'Organization',
        name: 'Stellantis',
      },
    },
    model: 'ProMaster EV',
    vehicleModelDate: '2024',
    productionDate: '2024',
    fuelType: 'https://schema.org/Electric',
    keywords: 'RAM ProMaster EV, commercial electric van, electric vehicle, zero emissions van, commercial EV, electric van, BEV, battery electric vehicle, commercial electric vehicle',
    audience: {
      '@type': 'BusinessAudience',
      audienceType: 'Commercial Businesses',
      geographicArea: {
        '@type': 'Country',
        name: 'United States',
      },
    },
    fuelEfficiency: rangeValue
      ? {
          '@type': 'QuantitativeValue',
          value: rangeValue,
          unitCode: 'MI',
        }
      : undefined,
    numberOfDoors: 4,
    seatingCapacity: 2, // Driver + passenger jump seat
    driveWheelConfiguration: driveType === 'Front-wheel' ? 'https://schema.org/FrontWheelDriveConfiguration' : undefined,
    vehicleTransmission: transmission || 'https://schema.org/AutomaticTransmission',
    ...(batteryCapacity && {
      vehicleEngine: {
        '@type': 'EngineSpecification',
        engineType: 'Electric Motor',
        fuelType: 'https://schema.org/Electric',
        ...(horsepowerValue && {
          engineDisplacement: {
            '@type': 'QuantitativeValue',
            value: horsepowerValue,
            unitCode: 'HP',
          },
        }),
        ...(maxTorque && {
          torque: {
            '@type': 'QuantitativeValue',
            value: maxTorque.replace(/[^0-9.]/g, ''),
            unitCode: 'LB-FT',
          },
        }),
      },
    }),
    ...(payloadValue && {
      weight: {
        '@type': 'QuantitativeValue',
        value: payloadValue.replace(/,/g, ''),
        unitCode: 'LBR',
      },
    }),
    ...(cargoVolume && {
      cargoVolume: {
        '@type': 'QuantitativeValue',
        value: cargoVolume,
        unitCode: 'FTQ',
        unitText: 'cubic feet',
      },
    }),
    ...((exteriorFeatures.length > 0 || interiorFeatures.length > 0) && {
      amenityFeature: [
        ...exteriorFeatures
          .filter((f: string) => !f.includes('ft3') && !f.includes('Roof Height'))
          .map((feature: string) => ({
            '@type': 'LocationFeatureSpecification',
            name: feature,
            value: true,
          })),
        ...interiorFeatures.map((feature: string) => ({
          '@type': 'LocationFeatureSpecification',
          name: feature,
          value: true,
        })),
      ],
    }),
    ...(roofHeight && {
      additionalProperty: [
        {
          '@type': 'PropertyValue',
          name: 'Roof Height',
          value: roofHeight,
        },
      ],
    }),
    image: vehicleImages.length > 0 ? vehicleImages : undefined,
    url: `${baseUrl}/promaster`,
  };

  // Product Schema (for e-commerce) - Car extends Product, but we'll keep this for Offer details
  const productSchema = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    '@id': `${baseUrl}/promaster#product`,
    name: data.hero[0]?.title || 'RAM ProMaster EV',
    description: `The RAM ProMaster EV is a 2024 commercial electric van designed for businesses seeking zero-emission transportation solutions. With a 162-mile range on a single charge, this electric van offers a 3,020 lb payload capacity and 520 cubic feet of cargo space, making it ideal for delivery services, fleet operations, and commercial applications. Powered by a 110 kWh battery pack, the ProMaster EV delivers 268 horsepower and 302 lb-ft of torque through its front-wheel drive system. Key features include walk-in pocket doors, rear roll-up doors, premium interior with heated seats and steering wheel, Uconnect 5 infotainment system, digital rearview mirror, LED cargo lighting, and support for Level 1, Level 2, and Level 3 DC fast charging. The vehicle starts at $77,995 base price ($79,990 with destination fee) and may be eligible for tax credits and deductions including Section 168(k) Tax Deduction. The battery is covered by an 8-year or 100,000-mile limited warranty.`,
    brand: {
      '@type': 'Brand',
      name: 'RAM',
      logo: 'https://www.ramtrucks.com/content/dam/fca-brands/na/ram/en_us/brand/ram-logo.png',
    },
    manufacturer: {
      '@type': 'Organization',
      name: 'RAM Trucks',
      url: 'https://www.ramtrucks.com',
      parentOrganization: {
        '@type': 'Organization',
        name: 'Stellantis',
      },
    },
    category: 'Commercial Vehicle',
    additionalProperty: [
      {
        '@type': 'PropertyValue',
        name: 'Vehicle Type',
        value: 'Electric Van',
      },
      {
        '@type': 'PropertyValue',
        name: 'Model Year',
        value: '2024',
      },
      {
        '@type': 'PropertyValue',
        name: 'Cylinder Configuration',
        value: cylinderConfig || 'None (Electric)',
      },
      ...(batteryCapacity
        ? [
            {
              '@type': 'PropertyValue',
              name: 'Battery Capacity',
              value: batteryCapacity,
            },
          ]
        : []),
      ...(rangeValue
        ? [
            {
              '@type': 'PropertyValue',
              name: 'Range',
              value: `${rangeValue} miles`,
            },
          ]
        : []),
      ...(payloadValue
        ? [
            {
              '@type': 'PropertyValue',
              name: 'Payload Capacity',
              value: `${payloadValue} lb`,
            },
          ]
        : []),
      ...(cargoVolume
        ? [
            {
              '@type': 'PropertyValue',
              name: 'Cargo Volume',
              value: `${cargoVolume} cubic feet`,
            },
          ]
        : []),
      ...(roofHeight
        ? [
            {
              '@type': 'PropertyValue',
              name: 'Roof Height',
              value: roofHeight,
            },
          ]
        : []),
      ...(maxTorque
        ? [
            {
              '@type': 'PropertyValue',
              name: 'Maximum Torque',
              value: maxTorque,
            },
          ]
        : []),
      ...(horsepowerValue
        ? [
            {
              '@type': 'PropertyValue',
              name: 'Horsepower',
              value: `${horsepowerValue} HP`,
            },
          ]
        : []),
      // Exterior Features
      ...exteriorFeatures
        .filter((f: string) => !f.includes('ft3') && !f.includes('Roof Height'))
        .map((feature: string) => ({
          '@type': 'PropertyValue',
          name: 'Exterior Feature',
          value: feature,
        })),
      // Interior Features
      ...interiorFeatures.map((feature: string) => ({
        '@type': 'PropertyValue',
        name: 'Interior Feature',
        value: feature,
      })),
    ],
    image: vehicleImages.length > 0 ? vehicleImages : undefined,
    ...(priceValue && {
      offers: {
        '@type': 'Offer',
        price: totalPrice ? totalPrice.toString() : priceValue.toString(),
        priceCurrency: 'USD',
        availability: 'https://schema.org/InStock',
        availabilityStarts: new Date().toISOString(),
        url: data.siteConfig.link || `${baseUrl}/promaster`,
        priceValidUntil: new Date(
          new Date().setFullYear(new Date().getFullYear() + 1)
        ).toISOString().split('T')[0],
        seller: {
          '@type': 'Organization',
          name: 'CommercialEVs',
          url: data.siteConfig.url,
        },
        ...(destinationFeeValue && {
          priceSpecification: [
            {
              '@type': 'UnitPriceSpecification',
              price: priceValue.toString(),
              priceCurrency: 'USD',
              name: 'Base Price',
            },
            {
              '@type': 'UnitPriceSpecification',
              price: destinationFeeValue.toString(),
              priceCurrency: 'USD',
              name: 'Destination Fee',
            },
            ...(totalPrice
              ? [
                  {
                    '@type': 'UnitPriceSpecification',
                    price: totalPrice.toString(),
                    priceCurrency: 'USD',
                    name: 'Total Price',
                  },
                ]
              : []),
          ],
        }),
      },
    }),
    // Removed fake aggregateRating - only include if you have real reviews
  };

  // Organization Schema
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${baseUrl}#organization`,
    name: 'CommercialEVs',
    url: data.siteConfig.url,
    logo: {
      '@type': 'ImageObject',
      url: `${baseUrl}${data.siteConfig.logoUrl}`,
    },
    sameAs: data.siteConfig.link
      ? [data.siteConfig.link].filter(Boolean)
      : undefined,
    knowsAbout: [
      'Commercial Electric Vehicles',
      'Electric Vans',
      'Zero Emission Vehicles',
      'Fleet Electrification',
      'EV Tax Credits',
      'Commercial Vehicle Sales',
    ],
    // Add contactPoint if you have contact information
    // contactPoint: {
    //   '@type': 'ContactPoint',
    //   contactType: 'Customer Service',
    //   email: 'contact@commercialevs.com',
    // },
  };

  // Breadcrumb Schema
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: baseUrl,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Commercial Electric Vehicles',
        item: `${baseUrl}/promaster`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: data.hero[0]?.title || 'RAM ProMaster EV',
        item: `${baseUrl}/promaster`,
      },
    ],
  };

  // ItemList Schema for features (helps AI understand the feature list)
  const featureListSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'RAM ProMaster EV Features',
    description: 'Complete list of features and specifications for the 2024 RAM ProMaster EV',
    itemListElement: [
      ...exteriorFeatures.map((feature: string, index: number) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: feature,
      })),
      ...interiorFeatures.map((feature: string, index: number) => ({
        '@type': 'ListItem',
        position: exteriorFeatures.length + index + 1,
        name: feature,
      })),
    ],
  };

  // WebSite Schema with SearchAction
  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'CommercialEVs',
    url: baseUrl,
    description: 'Commercial electric vehicles marketplace featuring the RAM ProMaster EV and other zero-emission commercial vans.',
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${baseUrl}/promaster?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  };

  // FAQ Schema - Comprehensive FAQs for AI search engines (zero-click results)
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What is the RAM ProMaster EV?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: `The RAM ProMaster EV is a 2024 commercial electric van featuring zero emissions, a 162-mile range, and a 3,020 lb payload capacity. It's powered by a 110 kWh battery and delivers 268 HP with 302 lb-ft of torque. The vehicle offers 520 cubic feet of cargo space and is designed for commercial use with features like walk-in pocket doors, rear roll-up doors, and premium interior amenities.`,
        },
      },
      {
        '@type': 'Question',
        name: 'What is the price of the RAM ProMaster EV?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: `The RAM ProMaster EV has a base price of $77,995 with a destination fee of $1,995, bringing the total to $79,990. The vehicle may be eligible for tax credits and deductions, including Section 168(k) Tax Deduction, which can help reduce the overall cost for businesses.`,
        },
      },
      {
        '@type': 'Question',
        name: 'What is the range of the RAM ProMaster EV?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: `The RAM ProMaster EV has an estimated range of up to 162 miles on a single charge with its 110 kWh battery pack. This range is suitable for most commercial delivery and service routes.`,
        },
      },
      {
        '@type': 'Question',
        name: 'How do you charge the RAM ProMaster EV?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: `The RAM ProMaster EV supports three charging options: Level 1 (standard), Level 2 (overnight charging), and Level 3 DC fast charging (charges in under an hour). The vehicle features a smart charging port with a quick-release mount and lockable, weatherproof enclosure for both indoor and outdoor charging.`,
        },
      },
      {
        '@type': 'Question',
        name: 'What is the payload capacity of the RAM ProMaster EV?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: `The RAM ProMaster EV has a maximum payload capacity of 3,020 pounds, making it suitable for heavy commercial loads. It also offers 520 cubic feet of cargo volume with an H3 roof height for maximum storage space.`,
        },
      },
      {
        '@type': 'Question',
        name: 'What are the key features of the RAM ProMaster EV?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: `Key features include: 268 HP electric motor, 302 lb-ft torque, 110 kWh battery, 162-mile range, 3,020 lb payload, 520 cubic feet cargo space, walk-in pocket door, rear roll-up door, front and rear parking sensors, heated steering wheel and driver seat, digital rearview mirror, LED motion sensing cargo lights, and premium interior with wall panels and shelving.`,
        },
      },
      {
        '@type': 'Question',
        name: 'Is the RAM ProMaster EV eligible for tax credits?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: `Yes, the RAM ProMaster EV may be eligible for tax benefits including the Section 168(k) Tax Deduction. Businesses can potentially receive tax credits and deductions when purchasing commercial electric vehicles. Check with CommercialEVs.com for grants and incentives available in your area.`,
        },
      },
      {
        '@type': 'Question',
        name: 'What warranty does the RAM ProMaster EV come with?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: `The RAM ProMaster EV comes with a battery limited warranty of 8 years or 100,000 miles, providing long-term confidence in the vehicle's electric powertrain.`,
        },
      },
      {
        '@type': 'Question',
        name: 'How long does it take to charge the RAM ProMaster EV?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: `Charging time varies by charger type: Level 1 standard charging takes the longest (typically overnight), Level 2 charging can fully charge the battery overnight, and Level 3 DC fast charging can charge the van in under an hour, making it ideal for quick recharges during lunch breaks or between routes.`,
        },
      },
      {
        '@type': 'Question',
        name: 'What is the battery capacity of the RAM ProMaster EV?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: `The RAM ProMaster EV features a 110 kWh battery pack, providing up to 162 miles of range on a single charge. The battery is covered by an 8-year or 100,000-mile limited warranty.`,
        },
      },
      {
        '@type': 'Question',
        name: 'What is the horsepower and torque of the RAM ProMaster EV?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: `The RAM ProMaster EV delivers 268 horsepower and 302 lb-ft of torque from its electric motor, providing strong acceleration and towing capability for commercial applications.`,
        },
      },
      {
        '@type': 'Question',
        name: 'What is the cargo capacity of the RAM ProMaster EV?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: `The RAM ProMaster EV offers 520 cubic feet of cargo space with an H3 roof height, providing ample room for commercial deliveries and equipment. Combined with a 3,020 lb payload capacity, it can handle both large and heavy loads.`,
        },
      },
      {
        '@type': 'Question',
        name: 'What interior features does the RAM ProMaster EV have?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: `The RAM ProMaster EV includes premium interior features such as: heated steering wheel, heated driver seat, digital rearview mirror, Uconnect 5 infotainment system with 10-inch touchscreen, driver information digital cluster with 7-inch color display, LED motion sensing cargo lights, wall panels, shelving, non-skid flooring, grab handles, walk-thru partition with sliding door, and a passenger jump seat.`,
        },
      },
      {
        '@type': 'Question',
        name: 'What exterior features does the RAM ProMaster EV have?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: `Exterior features include: H3 roof height, walk-in pocket door, rear roll-up door, front and rear parking sensors, white noise backup alarm, rear step, side step, and charging identification lights on the dashboard.`,
        },
      },
      {
        '@type': 'Question',
        name: 'Who manufactures the RAM ProMaster EV?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: `The RAM ProMaster EV is manufactured by RAM Trucks, which is part of Stellantis. RAM is a leading manufacturer of commercial vehicles and trucks, and the ProMaster EV represents their entry into the commercial electric vehicle market.`,
        },
      },
      {
        '@type': 'Question',
        name: 'What is the transmission type of the RAM ProMaster EV?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: `The RAM ProMaster EV features a 1-speed automatic transmission, which is standard for electric vehicles. Electric motors don't require multi-speed transmissions due to their instant torque delivery across a wide RPM range.`,
        },
      },
      {
        '@type': 'Question',
        name: 'Is the RAM ProMaster EV good for fleet operations?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: `Yes, the RAM ProMaster EV is excellent for fleet operations. It offers zero emissions, lower operating costs compared to gas vehicles, potential tax benefits, and features like the BusinessLink Program which includes expedited service, shuttles, and loaner vehicles for commercial customers.`,
        },
      },
      {
        '@type': 'Question',
        name: 'What is the drive type of the RAM ProMaster EV?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: `The RAM ProMaster EV features front-wheel drive configuration, providing good traction and handling for commercial van applications.`,
        },
      },
      {
        '@type': 'Question',
        name: 'How does the RAM ProMaster EV compare to gas-powered commercial vans?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: `The RAM ProMaster EV offers several advantages over gas-powered commercial vans: zero tailpipe emissions, lower operating costs (electricity is cheaper than gas), reduced maintenance (no oil changes, fewer moving parts), potential tax credits and deductions, quieter operation, and instant torque. The main consideration is the 162-mile range, which is suitable for most urban and suburban commercial routes.`,
        },
      },
      {
        '@type': 'Question',
        name: 'What is the towing capacity of the RAM ProMaster EV?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: `The RAM ProMaster EV is designed primarily for cargo hauling with a 3,020 lb payload capacity and 520 cubic feet of cargo space. While specific towing capacity may vary, the vehicle's 268 HP and 302 lb-ft of torque provide strong performance for commercial applications. Consult with CommercialEVs.com for specific towing requirements.`,
        },
      },
      {
        '@type': 'Question',
        name: 'What charging infrastructure is needed for the RAM ProMaster EV?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: `The RAM ProMaster EV supports Level 1 (standard 120V outlet), Level 2 (240V charging station), and Level 3 DC fast charging. Level 2 charging is recommended for overnight charging at commercial facilities, while Level 3 DC fast charging enables quick recharges in under an hour. The vehicle features a smart charging port with weatherproof enclosure suitable for both indoor and outdoor installation.`,
        },
      },
      {
        '@type': 'Question',
        name: 'What is the cost of ownership for the RAM ProMaster EV?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: `The RAM ProMaster EV offers lower operating costs compared to gas-powered vans. With electricity costs typically 50-70% less than gasoline, reduced maintenance (no oil changes, fewer moving parts), and potential tax credits including Section 168(k) Tax Deduction, the total cost of ownership can be significantly lower over the vehicle's lifetime. The 8-year/100,000-mile battery warranty also provides long-term cost predictability.`,
        },
      },
      {
        '@type': 'Question',
        name: 'Is the RAM ProMaster EV suitable for cold weather operation?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: `The RAM ProMaster EV is designed for commercial use in various climates. Electric vehicles can experience reduced range in extremely cold weather, but the 110 kWh battery and 162-mile range provide a good buffer for most conditions. The vehicle includes heated steering wheel and heated driver seat for operator comfort in cold weather.`,
        },
      },
      {
        '@type': 'Question',
        name: 'What financing options are available for the RAM ProMaster EV?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: `Financing options for the RAM ProMaster EV are available through CommercialEVs.com. The vehicle may qualify for various commercial vehicle financing programs, fleet leasing options, and business loans. Additionally, tax credits and deductions can help reduce the effective purchase price. Contact CommercialEVs.com for personalized financing options and to explore available incentives.`,
        },
      },
    ],
  };

  // Article Schema - Establishes authority and helps with AI search visibility
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    '@id': `${baseUrl}/promaster#article`,
    headline: '2024 RAM ProMaster EV: Complete Guide to the Commercial Electric Van',
    description: 'Comprehensive guide to the 2024 RAM ProMaster EV commercial electric van, including specifications, features, pricing, charging options, and business benefits.',
    image: vehicleImages.length > 0 ? vehicleImages : undefined,
    author: {
      '@type': 'Organization',
      name: 'CommercialEVs',
      url: data.siteConfig.url,
    },
    publisher: {
      '@type': 'Organization',
      name: 'CommercialEVs',
      logo: {
        '@type': 'ImageObject',
        url: `${baseUrl}${data.siteConfig.logoUrl}`,
      },
    },
    datePublished: '2024-01-01',
    dateModified: new Date().toISOString().split('T')[0],
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${baseUrl}/promaster`,
    },
    about: {
      '@type': 'Thing',
      name: 'RAM ProMaster EV',
      description: 'Commercial electric van',
    },
    keywords: 'RAM ProMaster EV, commercial electric van, electric vehicle, zero emissions, commercial EV, electric van, fleet vehicle',
  };

  // HowTo Schema - Charging process (helps with zero-click results)
  const chargingHowToSchema = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: 'How to Charge the RAM ProMaster EV',
    description: 'Step-by-step guide on how to charge the RAM ProMaster EV using Level 1, Level 2, and Level 3 charging options.',
    image: `${baseUrl}/assets/promaster/chargerWithPromaster.webp`,
    totalTime: 'PT1H',
    step: [
      {
        '@type': 'HowToStep',
        position: 1,
        name: 'Choose Your Charging Level',
        text: 'Select the appropriate charging level: Level 1 for standard overnight charging, Level 2 for faster overnight charging, or Level 3 DC fast charging for quick recharges in under an hour.',
        image: `${baseUrl}/assets/promaster/chargerWithPromaster.webp`,
      },
      {
        '@type': 'HowToStep',
        position: 2,
        name: 'Locate the Charging Port',
        text: 'Find the smart charging port on the RAM ProMaster EV, which features a quick-release mount with a lockable, weatherproof enclosure suitable for both indoor and outdoor charging.',
        image: `${baseUrl}/assets/promaster/fuelCharge.png`,
      },
      {
        '@type': 'HowToStep',
        position: 3,
        name: 'Connect the Charger',
        text: 'Connect your Level 1, Level 2, or Level 3 charger to the charging port. Ensure the connection is secure and the weatherproof enclosure is properly closed.',
      },
      {
        '@type': 'HowToStep',
        position: 4,
        name: 'Monitor Charging Status',
        text: 'Monitor the charging progress using the five dashboard indicator lights and the Uconnect 5 touchscreen, which displays charge status, level, time to completion, range, and nearby charging locations.',
        image: `${baseUrl}/assets/promaster/dash.webp`,
      },
      {
        '@type': 'HowToStep',
        position: 5,
        name: 'Complete Charging',
        text: 'Once charging is complete, disconnect the charger and secure the charging port. The vehicle will be ready for use with up to 162 miles of range.',
      },
    ],
  };

  // HowTo Schema - Customization process
  const customizationHowToSchema = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: 'How to Customize Your RAM ProMaster EV',
    description: 'Step-by-step guide on how to customize and configure your RAM ProMaster EV commercial electric van.',
    image: `${baseUrl}/assets/promaster/stockImagePromaster.webp`,
    step: [
      {
        '@type': 'HowToStep',
        position: 1,
        name: 'Customize Your Vehicle',
        text: 'Select your preferred options and configurations for the RAM ProMaster EV, including interior features, exterior options, and additional equipment.',
      },
      {
        '@type': 'HowToStep',
        position: 2,
        name: 'Select a Charger',
        text: 'Choose the appropriate charging solution for your business needs: Level 1, Level 2, or Level 3 DC fast charging.',
      },
      {
        '@type': 'HowToStep',
        position: 3,
        name: 'Estimate Payment',
        text: 'Review pricing including base price ($77,995), destination fee ($1,995), and any selected options. Calculate potential tax credits and deductions.',
      },
      {
        '@type': 'HowToStep',
        position: 4,
        name: 'Start Paperwork',
        text: 'Begin the purchase process and complete necessary documentation for your RAM ProMaster EV order.',
      },
      {
        '@type': 'HowToStep',
        position: 5,
        name: 'Finalize Purchase',
        text: 'Complete your purchase and take delivery of your customized RAM ProMaster EV commercial electric van.',
      },
    ],
  };

  // Comparison Schema - Helps with competitor comparison queries
  const comparisonSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Commercial Electric Van Comparison',
    description: 'Comparison of the 2024 RAM ProMaster EV with other commercial electric vans',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        item: {
          '@type': 'Product',
          name: 'RAM ProMaster EV',
          description: '2024 RAM ProMaster EV commercial electric van',
          brand: 'RAM',
          offers: {
            '@type': 'Offer',
            price: '77995',
            priceCurrency: 'USD',
          },
          additionalProperty: [
            { '@type': 'PropertyValue', name: 'Range', value: '162 miles' },
            { '@type': 'PropertyValue', name: 'Payload Capacity', value: '3,020 lb' },
            { '@type': 'PropertyValue', name: 'Cargo Volume', value: '520 cubic feet' },
            { '@type': 'PropertyValue', name: 'Battery Capacity', value: '110 kWh' },
            { '@type': 'PropertyValue', name: 'Horsepower', value: '268 HP' },
            { '@type': 'PropertyValue', name: 'Torque', value: '302 lb-ft' },
            { '@type': 'PropertyValue', name: 'Warranty', value: '8 years / 100,000 miles' },
          ],
        },
      },
      {
        '@type': 'ListItem',
        position: 2,
        item: {
          '@type': 'Product',
          name: 'Ford E-Transit',
          description: 'Ford E-Transit commercial electric van',
          brand: 'Ford',
          additionalProperty: [
            { '@type': 'PropertyValue', name: 'Range', value: '126 miles' },
            { '@type': 'PropertyValue', name: 'Payload Capacity', value: '3,800 lb' },
            { '@type': 'PropertyValue', name: 'Battery Capacity', value: '68 kWh' },
          ],
        },
      },
      {
        '@type': 'ListItem',
        position: 3,
        item: {
          '@type': 'Product',
          name: 'Mercedes-Benz eSprinter',
          description: 'Mercedes-Benz eSprinter commercial electric van',
          brand: 'Mercedes-Benz',
          additionalProperty: [
            { '@type': 'PropertyValue', name: 'Range', value: 'Up to 248 miles' },
            { '@type': 'PropertyValue', name: 'Battery Capacity', value: '113 kWh' },
          ],
        },
      },
    ],
  };

  // Helper function to remove undefined values from schema
  const cleanSchema = (schema: any): any => {
    if (Array.isArray(schema)) {
      return schema.map(cleanSchema).filter((item) => item !== undefined);
    } else if (schema !== null && typeof schema === 'object') {
      const cleaned: any = {};
      for (const [key, value] of Object.entries(schema)) {
        if (value !== undefined) {
          cleaned[key] = cleanSchema(value);
        }
      }
      return cleaned;
    }
    return schema;
  };

  return (
    <>
      <Script
        id='car-structured-data'
        type='application/ld+json'
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(cleanSchema(carSchema)),
        }}
      />
      <Script
        id='product-structured-data'
        type='application/ld+json'
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(cleanSchema(productSchema)),
        }}
      />
      <Script
        id='organization-structured-data'
        type='application/ld+json'
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(cleanSchema(organizationSchema)),
        }}
      />
      <Script
        id='breadcrumb-structured-data'
        type='application/ld+json'
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(cleanSchema(breadcrumbSchema)),
        }}
      />
      <Script
        id='website-structured-data'
        type='application/ld+json'
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(cleanSchema(websiteSchema)),
        }}
      />
      <Script
        id='faq-structured-data'
        type='application/ld+json'
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(cleanSchema(faqSchema)),
        }}
      />
      <Script
        id='feature-list-structured-data'
        type='application/ld+json'
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(cleanSchema(featureListSchema)),
        }}
      />
      <Script
        id='article-structured-data'
        type='application/ld+json'
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(cleanSchema(articleSchema)),
        }}
      />
      <Script
        id='charging-howto-structured-data'
        type='application/ld+json'
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(cleanSchema(chargingHowToSchema)),
        }}
      />
      <Script
        id='customization-howto-structured-data'
        type='application/ld+json'
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(cleanSchema(customizationHowToSchema)),
        }}
      />
      <Script
        id='comparison-structured-data'
        type='application/ld+json'
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(cleanSchema(comparisonSchema)),
        }}
      />
    </>
  );
}

