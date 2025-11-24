'use client';

import Image from 'next/image';
import styles from './Capability.module.scss';
import { useEffect, useRef } from 'react';

interface CapabilitySpec {
  label?: string;
  value?: string;
  otherValue?: string;
  imageUrl?: string;
}

interface CapabilitiesProps {
  title: string;
  navLinkText: string;
  specs: CapabilitySpec[];
}

const Capability = ({ capabilities }: { capabilities: CapabilitiesProps }) => {
  const { specs, title } = capabilities;
  const specItemsRef = useRef<(HTMLDivElement | null)[]>([]);

  const splitValue = (value: string) => {
    const [number, unit] = value.split(' ');
    return { number, unit };
  };

  useEffect(() => {
    const currentSpecItems = [...specItemsRef.current];

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add(styles.slideIn);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    currentSpecItems.forEach((item) => {
      if (item) {
        observer.observe(item);
      }
    });

    return () => {
      currentSpecItems.forEach((item) => {
        if (item) {
          observer.unobserve(item);
        }
      });
    };
  }, []);

  return (
    <section className={styles.capability} aria-labelledby='capability-section-title'>
      <div className={styles.capabilityContainer}>
        <h2 id='capability-section-title' className={styles.title}>{title}</h2>
        <div className={styles.content}>
          <div className={styles.specsContainer}>
            {specs.map((spec, index) => (
              <div
                key={index}
                ref={(el) => {
                  specItemsRef.current[index] = el;
                }}
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
                        alt={spec.label ? `RAM ProMaster EV ${spec.label}` : 'RAM ProMaster EV capability feature'}
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
                        <p className={styles.specOtherValue}>
                          {spec.otherValue}
                        </p>
                      )}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Capability;
