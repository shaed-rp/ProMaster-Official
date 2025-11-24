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
      breakpoint: { max: 1024, min: 464 },
      items: 1,
      slidesToSlide: 1,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
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
          >
            {technologyPoints.technology.map((point, index) => (
              <div key={index} className={styles.chargingOptions}>
                <div className={styles.imageContainer}>
                  <Image
                    src={point.imageUrl}
                    alt={`RAM ProMaster EV ${point.title} - ${point.description.substring(0, 50)}`}
                    fill
                    style={{ objectFit: 'contain' }}
                    className={styles.image}
                    loading='lazy'
                  />
                </div>
                <div className={styles.infoContainer}>
                  <h3 className={styles.optionTitle}>{point.title}</h3>
                  <p className={styles.optionDescription}>
                    {point.description}
                  </p>
                </div>
              </div>
            ))}
          </Carousel>
        )}
      </div>
    </section>
  );
}
