'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import styles from './Technology.module.scss';
import type { ResponsiveType } from 'react-multi-carousel';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const Carousel = dynamic(() => import('react-multi-carousel'), { ssr: false });

interface TechnologyPoint {
  imageUrl: string;
  title: string;
  description: string;
}

interface TechnologyProps {
  technologyPoints: {
    title: string;
    technology: TechnologyPoint[];
  };
}

interface CustomButtonGroupProps {
  next?: () => void;
  previous?: () => void;
}

function CustomButtonGroup({
  next,
  previous,
}: CustomButtonGroupProps) {
  return (
  <div className={styles.customButtonGroup}>
    <button
      className={`${styles.customArrow} ${styles.leftArrow}`}
      onClick={previous}
      aria-label='Previous'
    >
      <ChevronLeft size={36} />
    </button>
    <button
      className={`${styles.customArrow} ${styles.rightArrow}`}
      onClick={next}
      aria-label='Next'
    >
      <ChevronRight size={36} />
    </button>
  </div>
  );
}

export default function Technology({ technologyPoints }: TechnologyProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const responsive: ResponsiveType = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 2,
      slidesToSlide: 2,
    },
    tablet: {
      breakpoint: { max: 1024, min: 600 },
      items: 1,
      slidesToSlide: 1,
    },
    smallTablet: {
      breakpoint: { max: 600, min: 480 },
      items: 1,
      slidesToSlide: 1,
    },
    mobile: {
      breakpoint: { max: 480, min: 0 },
      items: 1,
      slidesToSlide: 1,
    },
  };

  return (
    <section className={styles.technologies} aria-labelledby='technology-section-title'>
      <h2 id='technology-section-title' className={styles.title}>{technologyPoints.title}</h2>
      <div className={styles.carouselContainer}>
        {mounted && (
          <Carousel
            responsive={responsive}
            infinite={true}
            autoPlay={false}
            className={styles.carousel}
            arrows={false}
            customButtonGroup={<CustomButtonGroup />}
            renderButtonGroupOutside={true}
            swipeable={true}
            draggable={true}
            showDots={false}
            keyBoardControl={true}
            transitionDuration={300}
          >
            {technologyPoints.technology.map((point, index) => {
              // Prioritize first technology item image (likely above-the-fold)
              const shouldPriority = index === 0;
              
              return (
                <article 
                  key={`technology-${point.title}-${index}`} 
                  className={styles.chargingOptions}
                  aria-labelledby={`technology-${index}-title`}
                >
                  <div className={styles.imageContainer}>
                    <Image
                      src={point.imageUrl}
                      alt={`2024 RAM ProMaster EV ${point.title} - ${point.description.substring(0, 60).replace(/\.$/, '')} - Commercial Electric Van Technology`}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 50vw"
                      style={{ objectFit: 'contain' }}
                      className={styles.image}
                      loading={shouldPriority ? undefined : 'lazy'}
                      {...(shouldPriority && { priority: true })}
                    />
                  </div>
                  <div className={styles.infoContainer}>
                    <h3 id={`technology-${index}-title`} className={styles.optionTitle}>{point.title}</h3>
                    <p className={styles.optionDescription}>
                      {point.description}
                    </p>
                  </div>
                </article>
              );
            })}
          </Carousel>
        )}
      </div>
    </section>
  );
}
