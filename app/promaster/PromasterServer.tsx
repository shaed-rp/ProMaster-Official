'use client';

import Navbar from '@components/Navbar/Nav';
import Hero from './Hero/Hero';
import Overview from './Overview/Overview';
import Capability from './Capability/Capability';
import Charging from './Charging/Charging';
import Technology from './Technology/Technology';
import Gallery from './Gallery/Gallery';
import PoweredByShaedFooter from '@components/Footer/poweredByShaed';
import styles from './page.module.scss';
import Business from './Business/Business';
import Design from './Design/Design';
import Specs from './Specs/Specs';
import SectionRenderer from '@components/SectionRenderer/SectionRenderer';
import { VehicleData } from '@/types/vehicle';
import StructuredData from '@components/StructuredData/StructuredData';
import SkipLink from '@components/SkipLink/SkipLink';
import Breadcrumb from '@components/Breadcrumb/Breadcrumb';

const baseUrl =
  process.env.NEXT_PUBLIC_BASE_URL || 'https://commercialevs.com';

interface PromasterServerProps {
  data: VehicleData;
  sectionTitles: { [key: string]: string };
  openModal: () => void;
}

export default function PromasterServer({
  data,
  sectionTitles,
  openModal,
}: PromasterServerProps) {
  return (
    <>
      <StructuredData data={data} baseUrl={baseUrl} />
      <SkipLink />
      <Breadcrumb
        items={[
          { label: 'Home', href: '/' },
          { label: 'Commercial Electric Vehicles', href: '/promaster' },
          { label: 'RAM ProMaster EV' },
        ]}
      />
      <div className={styles.home}>
        <Navbar
          vehicleId='promaster'
          openModal={openModal}
          sectionTitles={sectionTitles}
        />
        <main id='home' className={`${styles.section} ${styles.heroSection}`}>
          <div className={styles.sectionContent}>
            <Hero
              heroPoints={data.hero}
              siteConfig={data.siteConfig}
              openModal={openModal}
            />
          </div>
        </main>

        <SectionRenderer
          id='overview'
          isVisible={data.sectionVisibility.overview}
          hasData={data.overview.specs.some(
            (spec) => spec.description || spec.title || spec.imageUrl
          )}
          wrapperClass={`${styles.section} ${styles.overviewSection}`}
          contentClass={styles.sectionContent}
        >
          <Overview overview={data.overview} />
        </SectionRenderer>

        <SectionRenderer
          id='capabilities'
          isVisible={data.sectionVisibility.capabilities}
          hasData={data.capabilities.specs.some(
            (spec) =>
              spec.label || spec.value || spec.imageUrl || spec.otherValue
          )}
          wrapperClass={`${styles.section} ${styles.capabilitySection}`}
          contentClass={styles.sectionContent}
        >
          <Capability capabilities={data.capabilities} />
        </SectionRenderer>

        <SectionRenderer
          id='charging'
          isVisible={data.sectionVisibility.charging}
          hasData={data.charging.chargingOptions.some(
            (option) => option.title || option.description || option.imageUrl
          )}
          wrapperClass={`${styles.section} ${styles.chargingSection}`}
          contentClass={styles.sectionContent}
        >
          <Charging chargingPoints={data.charging} />
        </SectionRenderer>

        <SectionRenderer
          id='technologies'
          isVisible={data.sectionVisibility.technologies}
          hasData={data.technologies.technology.some(
            (tech) => tech.title || tech.description || tech.imageUrl
          )}
          wrapperClass={`${styles.section} ${styles.technologySection}`}
          contentClass={styles.sectionContent}
        >
          <Technology technologyPoints={data.technologies} />
        </SectionRenderer>

        <SectionRenderer
          id='design'
          isVisible={data.sectionVisibility.design}
          hasData={data.design.images.some((image) => image.imageUrl)}
          wrapperClass={`${styles.section} ${styles.designSection}`}
          contentClass={styles.sectionContent}
        >
          <Design designPoints={data.design} />
        </SectionRenderer>

        <SectionRenderer
          id='business'
          isVisible={data.sectionVisibility.business}
          hasData={data.business.businessPoints.some(
            (point) => point.title || point.description
          )}
          wrapperClass={`${styles.section} ${styles.businessSection}`}
          contentClass={styles.sectionContent}
        >
          <Business businessPoints={data.business} />
        </SectionRenderer>

        <SectionRenderer
          id='gallery'
          isVisible={data.sectionVisibility.gallery}
          hasData={data.gallery.images.some((image) => image.url)}
          wrapperClass={`${styles.section} ${styles.gallerySection}`}
          contentClass={styles.sectionContent}
        >
          <Gallery images={data.gallery.images} />
        </SectionRenderer>

        <SectionRenderer
          id='specs'
          isVisible={data.sectionVisibility.specs}
          hasData={data.specs.specDetails.some(
            (section) => section.title || section.data.some((item) => item)
          )}
          wrapperClass={`${styles.section} ${styles.specsSection}`}
          contentClass={styles.sectionContent}
        >
          <Specs specPoints={data.specs.specDetails} />
        </SectionRenderer>

        <PoweredByShaedFooter />
      </div>
    </>
  );
}

