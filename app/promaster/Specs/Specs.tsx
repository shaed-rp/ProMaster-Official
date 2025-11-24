'use client';

import { useEffect, useRef } from 'react';
import styles from './Specs.module.scss';

interface SpecItem {
  type?: string;
  value?: string;
}

interface SpecSection {
  title: string;
  data: (SpecItem | string)[];
}

interface SpecsProps {
  specPoints: SpecSection[];
}

export default function Specs({ specPoints }: SpecsProps) {
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add(styles.visible);
          }
        });
      },
      { threshold: 0.1 }
    );

    const animatedElements = document.querySelectorAll(
      `.${styles.specSection}`
    );
    animatedElements.forEach((el, index) => {
      if (el instanceof HTMLElement) {
        el.style.transitionDelay = `${index * 0.2}s`;
      }
      observerRef.current?.observe(el);
    });

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);

  const renderPricingPowertrain = (section: SpecSection) => (
    <div className={`${styles.specSection} ${styles.pricingPowertrain}`}>
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

  const renderExteriorFeatures = (section: SpecSection) => (
    <div className={`${styles.specSection} ${styles.exteriorFeatures}`}>
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

  const renderInteriorFeatures = (section: SpecSection) => {
    const middleIndex = Math.ceil((section.data as string[]).length / 2);
    const firstColumn = (section.data as string[]).slice(0, middleIndex);
    const secondColumn = (section.data as string[]).slice(middleIndex);

    return (
      <div className={`${styles.specSection} ${styles.interiorFeatures}`}>
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

  return (
    <section className={styles.specs} aria-labelledby='specs-section-title' itemScope itemType='https://schema.org/Product'>
      <div className={styles.specsContainer}>
        <h2 id='specs-section-title' className={styles.title}>RAM ProMaster EV Specifications</h2>
        <div className={styles.specGrid}>
          <div className={styles.leftColumn}>
            {renderPricingPowertrain(specPoints[0])}
            {renderPricingPowertrain(specPoints[1])}
          </div>
          <div className={styles.rightColumn}>
            {renderExteriorFeatures(specPoints[2])}
          </div>
        </div>
        <div className={styles.bottomSection}>
          {renderInteriorFeatures(specPoints[3])}
        </div>
      </div>
    </section>
  );
}
