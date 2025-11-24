import styles from './Overview.module.scss';
import OverviewCard from './OverviewCard';
import { Overview as OverviewType } from '@/types/vehicle';

interface OverviewProps {
  overview: OverviewType;
}

const Overview = ({ overview }: OverviewProps) => {
  // Use cardSizes from data, fallback to default if not provided
  const defaultCardSizes = [
    'large',
    'small',
    'medium',
    'large',
    'vertical',
    'small',
    'small',
    'small',
    'medium',
    'medium',
  ];
  // Type assertion needed due to optional property access in strict mode
  const overviewWithCardSizes = overview as OverviewType & { cardSizes?: string[] };
  const cardSizes: string[] = overviewWithCardSizes.cardSizes ?? defaultCardSizes;

  return (
    <section
      className={styles.overview}
      aria-labelledby='overview-section-title'
      itemScope
      itemType='https://schema.org/Product'
    >
      <div className={styles.overviewContainer}>
        <h2 id='overview-section-title' className={styles.title}>
          RAM ProMaster EV Overview
        </h2>
        <div className={styles.pointsContainer}>
          {overview.specs.map((spec, index) => (
            <OverviewCard
              key={spec.title ? `${spec.title}-${index}` : `spec-${index}`}
              spec={spec}
              size={(cardSizes[index] || 'small') as 'small' | 'medium' | 'large' | 'vertical'}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Overview;
