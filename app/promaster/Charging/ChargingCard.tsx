'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import styles from './Charging.module.scss';

interface ChargingCardProps {
  option: {
    imageUrl: string;
    title: string;
    description: string;
  };
  index: number;
}

export default function ChargingCard({ option, index }: ChargingCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // SSR safety check
    if (typeof window === 'undefined') return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.target === cardRef.current) {
            entry.target.classList.add(styles.visible);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
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

  return (
    <div
      ref={cardRef}
      className={`${styles.chargingOptions} ${styles.fadeIn} ${
        index % 2 === 0 ? styles.fromLeft : styles.fromRight
      }`}
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
  );
}

