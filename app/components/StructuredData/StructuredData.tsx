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
    description: `${data.hero[0]?.description || data.siteConfig.description} The RAM ProMaster EV is a 2024 commercial electric van with zero emissions, 162-mile range, 3,020 lb payload capacity, and 520 cubic feet of cargo space. Features include a 110 kWh battery, 268 HP electric motor, 302 lb-ft torque, walk-in pocket door, rear roll-up door, premium interior amenities, and support for Level 1, Level 2, and Level 3 charging. Starting at $77,995 base price.`,
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
    description: `${data.hero[0]?.description || data.siteConfig.description} The RAM ProMaster EV is a 2024 commercial electric van with zero emissions, 162-mile range, 3,020 lb payload capacity, and 520 cubic feet of cargo space. Features include a 110 kWh battery, 268 HP electric motor, 302 lb-ft torque, walk-in pocket door, rear roll-up door, premium interior amenities, and support for Level 1, Level 2, and Level 3 charging. Starting at $77,995 base price.`,
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

  // FAQ Schema - AI engines love FAQs
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
    </>
  );
}

