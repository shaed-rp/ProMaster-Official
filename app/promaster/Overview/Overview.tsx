import styles from './Overview.module.scss';
import OverviewCard from './OverviewCard';
import { Overview as OverviewType } from '@/types/vehicle';

interface OverviewProps {
  overview: OverviewType;
}

const Overview = ({ overview }: OverviewProps) => {
  // Use cardSizes from data, fallback to default if not provided
  const cardSizes: string[] = overview.cardSizes ?? [
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
              key={index}
              spec={spec}
              size={cardSizes[index] || 'small'}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Overview;
