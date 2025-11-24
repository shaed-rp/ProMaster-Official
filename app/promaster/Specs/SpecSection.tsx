'use client';

import { useEffect, useRef } from 'react';
import styles from './Specs.module.scss';

interface SpecItem {
  type?: string;
  value?: string;
}

interface SpecSectionProps {
  section: {
    title: string;
    data: (SpecItem | string)[];
  };
  index: number;
  renderType: 'pricingPowertrain' | 'exteriorFeatures' | 'interiorFeatures';
}

export default function SpecSection({
  section,
  index,
  renderType,
}: SpecSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // SSR safety check
    if (typeof window === 'undefined') return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && entries[0].target === sectionRef.current) {
          entries[0].target.classList.add(styles.visible);
          observer.unobserve(entries[0].target);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      sectionRef.current.style.transitionDelay = `${index * 0.2}s`;
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
      observer.disconnect();
    };
  }, [index]);

  const renderPricingPowertrain = () => (
    <div
      ref={sectionRef}
      className={`${styles.specSection} ${styles.pricingPowertrain}`}
    >
      <h3 className={styles.sectionTitle}>{section.title}</h3>
      <div className={styles.sectionContent}>
        {(section.data as SpecItem[]).map((item, itemIndex) => (
          <div key={itemIndex} className={styles.specItem}>
            <span className={styles.specType}>{item.type}</span>
            <span className={styles.specValue}>{item.value}</span>
          </div>
        ))}
      </div>
    </div>
  );

  const renderExteriorFeatures = () => (
    <div
      ref={sectionRef}
      className={`${styles.specSection} ${styles.exteriorFeatures}`}
    >
      <h3 className={styles.sectionTitle}>{section.title}</h3>
      <div className={styles.featureList}>
        {(section.data as string[]).map((item, itemIndex) => (
          <p key={itemIndex} className={styles.feature}>
            {item}
          </p>
        ))}
      </div>
    </div>
  );

  const renderInteriorFeatures = () => {
    const middleIndex = Math.ceil((section.data as string[]).length / 2);
    const firstColumn = (section.data as string[]).slice(0, middleIndex);
    const secondColumn = (section.data as string[]).slice(middleIndex);

    return (
      <div
        ref={sectionRef}
        className={`${styles.specSection} ${styles.interiorFeatures}`}
      >
        <h3 className={styles.sectionTitle}>{section.title}</h3>
        <div className={styles.featureColumns}>
          <div className={styles.featureColumn}>
            {firstColumn.map((item, itemIndex) => (
              <p key={itemIndex} className={styles.feature}>
                {item}
              </p>
            ))}
          </div>
          <div className={styles.featureColumn}>
            {secondColumn.map((item, itemIndex) => (
              <p key={itemIndex} className={styles.feature}>
                {item}
              </p>
            ))}
          </div>
        </div>
      </div>
    );
  };

  switch (renderType) {
    case 'pricingPowertrain':
      return renderPricingPowertrain();
    case 'exteriorFeatures':
      return renderExteriorFeatures();
    case 'interiorFeatures':
      return renderInteriorFeatures();
    default:
      return null;
  }
}

