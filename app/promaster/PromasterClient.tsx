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
import { useCallback, useMemo, useState } from 'react';
import ContactForm from '@components/Form/ContactForm/ContactForm';
import Modal from '@components/Modal/Modal';
import { ThemeProvider } from '@/contexts/ThemeContext';
import { useRouter } from 'next/navigation';
import SectionRenderer from '@components/SectionRenderer/SectionRenderer';
import { VehicleData } from '@/types/vehicle';
import StructuredData from '@components/StructuredData/StructuredData';
import SkipLink from '@components/SkipLink/SkipLink';

const baseUrl =
  process.env.NEXT_PUBLIC_BASE_URL || 'https://commercialevs.com';

export default function PromasterClient({ data }: { data: VehicleData }) {
    const router = useRouter();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const openModal = useCallback(() => {
        setIsModalOpen(true);
        setIsSubmitted(false);
    }, []);

    const closeModal = useCallback(() => {
        setIsModalOpen(false);
        setIsSubmitted(false);
    }, []);

    const handleSubmit = useCallback(() => {
        setIsSubmitted(true);
        closeModal();
        router.push('/thankyou');
    }, [closeModal, router]);

    const sectionTitles = useMemo(() => {
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
    }, [data]);

    if (!data) return null;

    return (
        <ThemeProvider brandColor={data.siteConfig.brandColor}>
            <StructuredData data={data} baseUrl={baseUrl} />
            <SkipLink />
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

                <Modal
                    isOpen={isModalOpen}
                    onClose={closeModal}
                    isSubmitted={isSubmitted}
                    pageName='Promaster'
                >
                    <ContactForm
                        onSubmit={handleSubmit}
                        siteTitle={data.siteConfig.title}
                    />
                </Modal>
            </div>
        </ThemeProvider>
    );
}
