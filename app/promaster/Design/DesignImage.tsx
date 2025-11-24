'use client';

import { useEffect, useState, useRef } from 'react';
import Image from 'next/image';
import styles from './Design.module.scss';

interface DesignImageProps {
  image: {
    imageUrl: string;
    alt: string;
  };
  index: number;
  sizeClass: string;
  onVisible: (index: number) => void;
}

export default function DesignImage({
  image,
  index,
  sizeClass,
  onVisible,
}: DesignImageProps) {
  const [isVisible, setIsVisible] = useState(false);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // SSR safety check
    if (typeof window === 'undefined') return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setTimeout(() => {
            setIsVisible(true);
            onVisible(index);
          }, index * 200);
          observer.unobserve(entries[0].target);
        }
      },
      { threshold: 0.1 }
    );

    if (imageRef.current) {
      observer.observe(imageRef.current);
    }

    return () => {
      if (imageRef.current) {
        observer.unobserve(imageRef.current);
      }
      observer.disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index]);

  return (
    <div
      ref={imageRef}
      className={`${styles.imageContainer} ${sizeClass} ${
        isVisible ? styles.visible : ''
      }`}
    >
      <Image
        src={image.imageUrl}
        alt={image.alt}
        fill
        style={{ objectFit: 'cover' }}
        className={styles.image}
        loading='lazy'
      />
    </div>
  );
}

