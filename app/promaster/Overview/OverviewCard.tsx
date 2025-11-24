'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import styles from './Overview.module.scss';
import { OverviewSpec } from '@/types/vehicle';

type CardSize = 'small' | 'medium' | 'large' | 'vertical';

interface OverviewCardProps {
  spec: OverviewSpec;
  size: CardSize;
  index: number;
}

// Constants for card rendering
const LAZY_LOAD_THRESHOLD = 2;
const MOBILE_BREAKPOINT = 768;
const MOBILE_THRESHOLD = 0.05;
const DESKTOP_THRESHOLD = 0.1;
const REVERSED_MEDIUM_CARD_INDEX = 9;

// Helper function to generate alt text for images
const generateAltText = (spec: OverviewSpec): string => {
  if (spec.title) {
    return `RAM ProMaster EV ${spec.title} - ${spec.description || 'Commercial Electric Van Feature'}`;
  }
  return spec.description || '2024 RAM ProMaster EV Commercial Electric Van Feature';
};

// Helper component for card content
const CardContent = ({ title, description }: { title?: string; description?: string }) => (
  <div className={styles.content}>
    {title && <h3 className={styles.pointTitle}>{title}</h3>}
    {description && <p className={styles.pointDescription}>{description}</p>}
  </div>
);

// Helper component for image with gradient overlay
interface CardImageProps {
  src: string;
  alt: string;
  size: CardSize;
  index: number;
  gradientType?: 'left' | 'right' | 'bottom' | 'none';
  objectFit?: 'cover' | 'contain';
  useFill?: boolean;
}

const CardImage = ({ 
  src, 
  alt, 
  size, 
  index, 
  gradientType = 'none',
  objectFit = 'cover',
  useFill = false
}: CardImageProps) => {
  if (!src) return null;

  const imageProps = useFill
    ? {
        fill: true as const,
        style: { objectFit } as const,
      }
    : {
        width: size === 'large' ? 200 : 200,
        height: size === 'large' ? 200 : 100,
        style: { objectFit } as const,
      };

  return (
    <div className={styles.imageContainer}>
      <Image
        src={src}
        alt={alt}
        {...imageProps}
        className={styles.mainImage}
        loading={index > LAZY_LOAD_THRESHOLD ? 'lazy' : undefined}
      />
      {gradientType === 'left' && <div className={styles.imageGradientLeft} />}
      {gradientType === 'right' && <div className={styles.imageGradientRight} />}
      {gradientType === 'bottom' && <div className={styles.imageGradient} />}
    </div>
  );
};

export default function OverviewCard({ spec, size, index }: OverviewCardProps) {
  const [isAnimated, setIsAnimated] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // SSR safety check
    if (typeof window === 'undefined') return;

    // Optimize threshold for mobile devices (lower threshold = faster trigger)
    const isMobile = window.innerWidth < MOBILE_BREAKPOINT;
    const threshold = isMobile ? MOBILE_THRESHOLD : DESKTOP_THRESHOLD;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.target === cardRef.current) {
            setIsAnimated(true);
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold,
        // Add root margin for better mobile performance
        rootMargin: isMobile ? '50px' : '100px',
      }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => {
      if (cardRef.current) {
        observer.unobserve(cardRef.current);
      }
      observer.disconnect();
    };
  }, []);

  const renderContent = () => {
    const altText = spec.imageUrl ? generateAltText(spec) : '';
    const isReversedMedium = size === 'medium' && index === REVERSED_MEDIUM_CARD_INDEX;

    // Medium cards (with potential reversal)
    if (size === 'medium') {
      return (
        <>
          {isReversedMedium ? (
            <>
              {spec.imageUrl && (
                <CardImage
                  src={spec.imageUrl}
                  alt={altText}
                  size={size}
                  index={index}
                  gradientType="left"
                  objectFit="cover"
                  useFill={true}
                />
              )}
              <CardContent title={spec.title} description={spec.description} />
            </>
          ) : (
            <>
              <CardContent title={spec.title} description={spec.description} />
              {spec.imageUrl && (
                <CardImage
                  src={spec.imageUrl}
                  alt={altText}
                  size={size}
                  index={index}
                  gradientType="right"
                  objectFit="cover"
                  useFill={true}
                />
              )}
            </>
          )}
        </>
      );
    }

    // Vertical cards
    if (size === 'vertical') {
      return (
        <>
          <CardImage
            src={spec.imageUrl || ''}
            alt={spec.title || spec.description || 'RAM ProMaster EV feature'}
            size={size}
            index={index}
            gradientType="bottom"
            objectFit="cover"
            useFill={true}
          />
          <CardContent title={spec.title} description={spec.description} />
        </>
      );
    }

    // Default: small or large
    return (
      <>
        {spec.imageUrl && (
          <CardImage
            src={spec.imageUrl}
            alt={altText}
            size={size}
            index={index}
            gradientType="none"
            objectFit="contain"
            useFill={false}
          />
        )}
        <CardContent title={spec.title} description={spec.description} />
      </>
    );
  };

  return (
    <div
      ref={cardRef}
      className={`${styles.point} ${styles[size]} ${
        isAnimated ? styles.animate : ''
      }`}
    >
      {renderContent()}
    </div>
  );
}

