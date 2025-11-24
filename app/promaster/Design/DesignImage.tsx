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
      observer.disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index]);

  // Prioritize first design image (likely above-the-fold)
  const shouldPriority = index === 0;

  return (
    <figure
      ref={imageRef}
      className={`${styles.imageContainer} ${sizeClass} ${
        isVisible ? styles.visible : ''
      }`}
    >
      <Image
        src={image.imageUrl}
        alt={image.alt}
        fill
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        style={{ objectFit: 'cover' }}
        className={styles.image}
        loading={shouldPriority ? undefined : 'lazy'}
        {...(shouldPriority && { priority: true })}
      />
    </figure>
  );
}

