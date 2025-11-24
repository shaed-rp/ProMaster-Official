'use client';

import Image from 'next/image';
import styles from './Overview.module.scss';
import { useCallback, useEffect, useRef, useState } from 'react';

interface OverviewPoint {
  title?: string;
  description?: string;
  imageUrl?: string;
}

interface OverviewProps {
  overview: {
    title: string;
    navLinkText: string;
    specs: OverviewPoint[];
  };
}

const Overview = ({ overview }: OverviewProps) => {
  const [animatedItems, setAnimatedItems] = useState<boolean[]>([]);
  const cardSizes = [
    'large',
    'small',
    'medium',
    'large',
    'vertical',
    'small',
    'small',
    'small',
    'medium',
    'medium',
  ];

  const pointsRef = useRef<(HTMLDivElement | null)[]>([]);

  const setRef = useCallback((el: HTMLDivElement | null, index: number) => {
    pointsRef.current[index] = el;
  }, []);

  useEffect(() => {
    setAnimatedItems(new Array(cardSizes.length).fill(false));

    // Optimize threshold for mobile devices (lower threshold = faster trigger)
    const isMobile = window.innerWidth < 768;
    const threshold = isMobile ? 0.05 : 0.1;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = pointsRef.current.findIndex(
              (ref) => ref === entry.target
            );
            if (index !== -1) {
              setAnimatedItems((prev) => {
                const newAnimatedItems = [...prev];
                newAnimatedItems[index] = true;
                return newAnimatedItems;
              });
              observer.unobserve(entry.target);
            }
          }
        });
      },
      { 
        threshold,
        // Add root margin for better mobile performance
        rootMargin: isMobile ? '50px' : '100px'
      }
    );

    pointsRef.current.forEach((point) => {
      if (point) observer.observe(point);
    });

    return () => observer.disconnect();
  }, [cardSizes.length]);

  return (
    <section className={styles.overview} aria-labelledby='overview-section-title' itemScope itemType='https://schema.org/Product'>
      <div className={styles.overviewContainer}>
        <h2 id='overview-section-title' className={styles.title}>RAM ProMaster EV Overview</h2>
        <div className={styles.pointsContainer}>
          {cardSizes.map((size, index) => (
            <div
              key={index}
              className={`${styles.point} ${styles[size]} ${
                animatedItems[index] ? styles.animate : ''
              }`}
              ref={(el) => setRef(el, index)}
            >
              {overview.specs[index] && (
                <>
                  {size === 'medium' && index !== 9 ? (
                    <>
                      <div className={styles.content}>
                        {overview.specs[index].title && (
                          <h3 className={styles.pointTitle}>
                            {overview.specs[index].title}
                          </h3>
                        )}
                        {overview.specs[index].description && (
                          <p className={styles.pointDescription}>
                            {overview.specs[index].description}
                          </p>
                        )}
                      </div>
                      {overview.specs[index].imageUrl && (
                        <div className={styles.imageContainer}>
                          <Image
                            src={overview.specs[index].imageUrl}
                            alt={
                              overview.specs[index].title
                                ? `RAM ProMaster EV ${overview.specs[index].title} - ${overview.specs[index].description || 'Commercial Electric Van Feature'}`
                                : overview.specs[index].description || '2024 RAM ProMaster EV Commercial Electric Van Feature'
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
                  ) : size === 'medium' ? (
                    <>
                      {overview.specs[index].imageUrl && (
                        <div className={styles.imageContainer}>
                          <Image
                            src={overview.specs[index].imageUrl}
                            alt={
                              overview.specs[index].title
                                ? `RAM ProMaster EV ${overview.specs[index].title} - ${overview.specs[index].description || 'Commercial Electric Van Feature'}`
                                : overview.specs[index].description || '2024 RAM ProMaster EV Commercial Electric Van Feature'
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
                        {overview.specs[index].title && (
                          <h3 className={styles.pointTitle}>
                            {overview.specs[index].title}
                          </h3>
                        )}
                        {overview.specs[index].description && (
                          <p className={styles.pointDescription}>
                            {overview.specs[index].description}
                          </p>
                        )}
                      </div>
                    </>
                  ) : size === 'vertical' ? (
                    <>
                      <div className={styles.imageContainer}>
                        <Image
                          src={overview.specs[index].imageUrl || ''}
                          alt={
                            overview.specs[index].title ||
                            overview.specs[index].description ||
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
                        {overview.specs[index].title && (
                          <h3 className={styles.pointTitle}>
                            {overview.specs[index].title}
                          </h3>
                        )}
                        {overview.specs[index].description && (
                          <p className={styles.pointDescription}>
                            {overview.specs[index].description}
                          </p>
                        )}
                      </div>
                    </>
                  ) : (
                    <>
                      {overview.specs[index].imageUrl && (
                        <div className={styles.imageContainer}>
                          <Image
                            src={overview.specs[index].imageUrl}
                            alt={
                              overview.specs[index].title
                                ? `RAM ProMaster EV ${overview.specs[index].title} - ${overview.specs[index].description || 'Commercial Electric Van Feature'}`
                                : overview.specs[index].description || '2024 RAM ProMaster EV Commercial Electric Van Feature'
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
                        {overview.specs[index].title && (
                          <h3 className={styles.pointTitle}>
                            {overview.specs[index].title}
                          </h3>
                        )}
                        {overview.specs[index].description && (
                          <p className={styles.pointDescription}>
                            {overview.specs[index].description}
                          </p>
                        )}
                      </div>
                    </>
                  )}
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Overview;
