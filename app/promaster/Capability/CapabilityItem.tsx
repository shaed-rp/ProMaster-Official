'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import styles from './Capability.module.scss';

interface CapabilityItemProps {
  spec: {
    label?: string;
    value?: string;
    otherValue?: string;
    imageUrl?: string;
  };
  index: number;
}

export default function CapabilityItem({ spec, index }: CapabilityItemProps) {
  const itemRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // SSR safety check
    if (typeof window === 'undefined') return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && entries[0].target === itemRef.current) {
          entries[0].target.classList.add(styles.slideIn);
          observer.unobserve(entries[0].target);
        }
      },
      { threshold: 0.1 }
    );

    if (itemRef.current) {
      observer.observe(itemRef.current);
    }

    return () => {
      if (itemRef.current) {
        observer.unobserve(itemRef.current);
      }
      observer.disconnect();
    };
  }, []);

  const splitValue = (value: string) => {
    const [number, unit] = value.split(' ');
    return { number, unit };
  };

  return (
    <div
      ref={itemRef}
      className={`${styles.specItem} ${
        spec.imageUrl ? styles.withBorder : ''
      } ${index === 2 ? styles.rightAligned : ''}`}
      style={{ animationDelay: `${index * 0.2}s` }}
    >
      {spec.imageUrl ? (
        <div className={styles.imageCard}>
          {spec.label && (
            <div className={styles.textContent}>
              <p className={styles.specLabel}>{spec.label}</p>
            </div>
          )}
          <div className={styles.imageWrapper}>
            <Image
              src={spec.imageUrl}
              alt={
                spec.label
                  ? `RAM ProMaster EV ${spec.label}`
                  : 'RAM ProMaster EV capability feature'
              }
              width={500}
              height={300}
              style={{ objectFit: 'cover' }}
              loading='lazy'
            />
          </div>
        </div>
      ) : (
        <div
          className={`${styles.specContent} ${
            index === 2 ? styles.rightAligned : ''
          }`}
        >
          {spec.label && (
            <div className={styles.labelWrapper}>
              <h3 className={styles.specLabel}>{spec.label}</h3>
            </div>
          )}
          <div className={styles.valueWrapper}>
            {spec.value && (
              <div className={styles.valueContainer}>
                <p className={styles.specValue}>
                  {splitValue(spec.value).number}
                </p>
                <p className={styles.specUnit}>
                  {splitValue(spec.value).unit}
                </p>
              </div>
            )}
            {spec.otherValue && (
              <p className={styles.specOtherValue}>{spec.otherValue}</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

