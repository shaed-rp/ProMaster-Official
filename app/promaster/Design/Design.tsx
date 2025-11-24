'use client';

import styles from './Design.module.scss';
import DesignImage from './DesignImage';

interface DesignItem {
  imageUrl: string;
  alt: string;
}

interface DesignProps {
  designPoints: {
    title: string;
    images: DesignItem[];
  };
}

const Design = ({ designPoints }: DesignProps) => {
  const getSizeClass = (index: number): string => {
    if (index === 0) return styles.large;
    if (index === 1) return styles.tall;
    return styles.small;
  };

  return (
    <section
      className={styles.design}
      aria-labelledby='design-section-title'
    >
      <h2 id='design-section-title' className={styles.title}>
        {designPoints.title}
      </h2>
      <div className={styles.imageGrid}>
        {designPoints.images.map((image, index) => (
          <DesignImage
            key={`design-${image.imageUrl}-${index}`}
            image={image}
            index={index}
            sizeClass={getSizeClass(index)}
            onVisible={() => {
              // Callback for potential analytics or side effects
              // Currently unused but kept for future extensibility
            }}
          />
        ))}
      </div>
    </section>
  );
};

export default Design;
