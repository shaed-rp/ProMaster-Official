'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import styles from './Business.module.scss';

interface BusinessItemProps {
  point: {
    imageUrl: string;
    alt: string;
    title: string;
    description: string;
    buttonText: string;
    buttonLinkUrl: string;
  };
  index: number;
}

export default function BusinessItem({ point, index }: BusinessItemProps) {
  const imageRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // SSR safety check
    if (typeof window === 'undefined') return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.target) {
            entry.target.classList.add(styles.animate);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = [imageRef.current, textRef.current].filter(Boolean);
    elements.forEach((el) => {
      if (el instanceof HTMLElement) {
        el.style.transitionDelay = `${index * 0.1}s`;
        observer.observe(el);
      }
    });

    return () => {
      elements.forEach((el) => {
        if (el) observer.unobserve(el);
      });
      observer.disconnect();
    };
  }, [index]);

  return (
    <div className={styles.businessItem}>
      <div
        ref={imageRef}
        className={`${styles.imageContainer} ${styles.animatedElement} ${styles.fadeInUp}`}
      >
        <Image
          src={point.imageUrl}
          alt={point.alt}
          fill
          style={{ objectFit: 'cover' }}
          className={styles.image}
          loading='lazy'
        />
      </div>
      <div
        ref={textRef}
        className={`${styles.textContent} ${styles.animatedElement} ${styles.fadeInUp}`}
      >
        <h3 className={styles.pointTitle}>{point.title}</h3>
        <p className={styles.pointDescription}>{point.description}</p>
        <a
          href={point.buttonLinkUrl}
          target='_blank'
          rel='noopener noreferrer'
          className={styles.button}
          style={{ backgroundColor: 'var(--brand-color)' }}
          aria-label={`${point.buttonText} - ${point.title} - RAM ProMaster EV`}
          title={`${point.buttonText} - Learn more about ${point.title} for RAM ProMaster EV`}
        >
          {point.buttonText} →
        </a>
      </div>
    </div>
  );
}

