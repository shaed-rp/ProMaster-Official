'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import styles from './Overview.module.scss';
import { OverviewSpec } from '@/types/vehicle';

interface OverviewCardProps {
  spec: OverviewSpec;
  size: string;
  index: number;
}

export default function OverviewCard({ spec, size, index }: OverviewCardProps) {
  const [isAnimated, setIsAnimated] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // SSR safety check
    if (typeof window === 'undefined') return;

    // Optimize threshold for mobile devices (lower threshold = faster trigger)
    const isMobile = window.innerWidth < 768;
    const threshold = isMobile ? 0.05 : 0.1;

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
    if (size === 'medium' && index !== 9) {
      return (
        <>
          <div className={styles.content}>
            {spec.title && (
              <h3 className={styles.pointTitle}>{spec.title}</h3>
            )}
            {spec.description && (
              <p className={styles.pointDescription}>{spec.description}</p>
            )}
          </div>
          {spec.imageUrl && (
            <div className={styles.imageContainer}>
              <Image
                src={spec.imageUrl}
                alt={
                  spec.title
                    ? `RAM ProMaster EV ${spec.title} - ${spec.description || 'Commercial Electric Van Feature'}`
                    : spec.description || '2024 RAM ProMaster EV Commercial Electric Van Feature'
                }
                fill
                style={{ objectFit: 'cover' }}
                className={styles.mainImage}
                loading={index > 2 ? 'lazy' : undefined}
              />
              <div className={styles.imageGradientRight}></div>
            </div>
          )}
        </>
      );
    }

    if (size === 'medium' && index === 9) {
      return (
        <>
          {spec.imageUrl && (
            <div className={styles.imageContainer}>
              <Image
                src={spec.imageUrl}
                alt={
                  spec.title
                    ? `RAM ProMaster EV ${spec.title} - ${spec.description || 'Commercial Electric Van Feature'}`
                    : spec.description || '2024 RAM ProMaster EV Commercial Electric Van Feature'
                }
                fill
                style={{ objectFit: 'cover' }}
                className={styles.mainImage}
                loading={index > 2 ? 'lazy' : undefined}
              />
              <div className={styles.imageGradientLeft}></div>
            </div>
          )}
          <div className={styles.content}>
            {spec.title && (
              <h3 className={styles.pointTitle}>{spec.title}</h3>
            )}
            {spec.description && (
              <p className={styles.pointDescription}>{spec.description}</p>
            )}
          </div>
        </>
      );
    }

    if (size === 'vertical') {
      return (
        <>
          <div className={styles.imageContainer}>
            <Image
              src={spec.imageUrl || ''}
              alt={
                spec.title ||
                spec.description ||
                'RAM ProMaster EV feature'
              }
              fill
              style={{ objectFit: 'cover' }}
              className={styles.mainImage}
              loading={index > 2 ? 'lazy' : undefined}
            />
            <div className={styles.imageGradient}></div>
          </div>
          <div className={styles.content}>
            {spec.title && (
              <h3 className={styles.pointTitle}>{spec.title}</h3>
            )}
            {spec.description && (
              <p className={styles.pointDescription}>{spec.description}</p>
            )}
          </div>
        </>
      );
    }

    // Default: small or large
    return (
      <>
        {spec.imageUrl && (
          <div className={styles.imageContainer}>
            <Image
              src={spec.imageUrl}
              alt={
                spec.title
                  ? `RAM ProMaster EV ${spec.title} - ${spec.description || 'Commercial Electric Van Feature'}`
                  : spec.description || '2024 RAM ProMaster EV Commercial Electric Van Feature'
              }
              width={size === 'large' ? 200 : 200}
              height={size === 'large' ? 200 : 100}
              style={{ objectFit: 'contain' }}
              className={styles.mainImage}
              loading={index > 2 ? 'lazy' : undefined}
            />
          </div>
        )}
        <div className={styles.content}>
          {spec.title && (
            <h3 className={styles.pointTitle}>{spec.title}</h3>
          )}
          {spec.description && (
            <p className={styles.pointDescription}>{spec.description}</p>
          )}
        </div>
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

