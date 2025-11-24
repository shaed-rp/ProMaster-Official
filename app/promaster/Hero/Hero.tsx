'use client';

import Image from 'next/image';
import styles from './Hero.module.scss';
import { useEffect, useState } from 'react';
import { useScreenSize } from '@/hooks/useScreenSize';
import ContactSalesButton from '@/app/components/Button/ContactButton';
import { HeroPoint, SiteConfig } from '@/types/vehicle';

interface HeroProps {
  heroPoints: HeroPoint[];
  siteConfig: SiteConfig;
  openModal: () => void;
}

const Hero = ({ heroPoints, siteConfig, openModal }: HeroProps) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const { isDesktop } = useScreenSize();
  const point = heroPoints[0];

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const highlightText = (text: string, highlight: string) => {
    const parts = text.split(new RegExp(`(${highlight})`, 'gi'));
    return (
      <span>
        {parts.map((part, i) =>
          part.toLowerCase() === highlight.toLowerCase() ? (
            <span key={i} style={{ color: siteConfig.brandColor }}>
              {part}
            </span>
          ) : (
            part
          )
        )}
      </span>
    );
  };

  const renderBackground = () => {
    if (isDesktop && point.backgroundVideo) {
      return (
        <video
          autoPlay
          loop
          muted
          playsInline
          src={point.backgroundVideo}
          style={{
            borderTopLeftRadius: '30px',
            borderTopRightRadius: '30px',
            width: '100%',
            height: 'auto',
            objectFit: 'cover',
          }}
          className={styles.primaryBgVideo}
        />
      );
    } else if (point.backgroundImageUrl) {
      return (
        <Image
          src={point.backgroundImageUrl}
          alt='2024 RAM ProMaster EV commercial electric van in warehouse setting - Commercial vehicle for business operations'
          fill
          priority
          style={{
            objectFit: 'cover',
            borderTopLeftRadius: '30px',
            borderTopRightRadius: '30px',
          }}
          className={styles.primaryBgImage}
        />
      );
    }
    return null;
  };

  const handleContactClick = () => {
    openModal();
  };

  return (
    <section
      className={`${styles.hero} ${isLoaded ? styles.loaded : ''}`}
      aria-labelledby='hero-section-title'
      itemScope
      itemType='https://schema.org/Vehicle'
    >
      <div className={styles.heroContainer}>
        <div className={styles.imageContainer}>
          {renderBackground()}
          <div
            className={`${styles.vehicleImage} ${isLoaded ? styles.slideInFade : ''
              }`}
          >
            <Image
              src={point.imageUrl}
              alt='2024 RAM ProMaster EV - Commercial Electric Van'
              priority
              width={isDesktop ? 500 : 400}
              height={isDesktop ? 400 : 300}
              style={{ objectFit: 'contain' }}
            />
          </div>
        </div>
        <div className={styles.textContainer}>
          <h1 id='hero-section-title' itemProp='name'>{highlightText(point.title, 'EV')}</h1>
          <p itemProp='description'>{point.description}</p>
          <Image
            src={'/icons/cevTextLogoBlk.png'}
            height={isDesktop ? 50 : 40}
            width={isDesktop ? 300 : 240}
            alt='CommercialEVs.com - Commercial Electric Vehicle Marketplace'
            className={`${styles.cevLogo} ${styles.fadeIn}`}
          />
          <ContactSalesButton
            siteConfig={siteConfig}
            openModal={handleContactClick}
            buttonText='Get A Free Quote'
            id='contact-button-promaster'
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
