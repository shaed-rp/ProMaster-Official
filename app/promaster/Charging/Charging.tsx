'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import styles from './Charging.module.scss';

interface ChargingOption {
  imageUrl: string;
  title: string;
  description: string;
}

interface ChargingProps {
  chargingPoints: {
    title: string;
    chargingOptions: ChargingOption[];
  };
}

export default function Charging({ chargingPoints }: ChargingProps) {
  const cardRefs = useRef<Array<HTMLDivElement | null>>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add(styles.visible);
          }
        });
      },
      { threshold: 0.1 }
    );

    cardRefs.current.forEach((card) => {
      if (card) observer.observe(card);
    });

    return () => observer.disconnect();
  }, []);

  if (!chargingPoints) {
    return null;
  }

  return (
    <section className={styles.charging} aria-labelledby='charging-section-title'>
      <h2 id='charging-section-title' className={styles.title}>{chargingPoints.title}</h2>
      <div className={styles.content}>
        {chargingPoints.chargingOptions.map((option, index) => (
          <div
            key={index}
            className={`${styles.chargingOptions} ${styles.fadeIn} ${
              index % 2 === 0 ? styles.fromLeft : styles.fromRight
            }`}
            ref={(el: HTMLDivElement | null) => {
              cardRefs.current[index] = el;
            }}
          >
            <div className={styles.imageContainer}>
              <Image
                src={option.imageUrl}
                alt={`RAM ProMaster EV ${option.title} - ${option.description.substring(0, 60)}`}
                fill
                style={{ objectFit: 'cover' }}
                loading='lazy'
              />
            </div>
            <div className={styles.infoContainer}>
              <h3 className={styles.optionTitle}>{option.title}</h3>
              <p className={styles.optionDescription}>{option.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
