import styles from './Specs.module.scss';
import SpecSection from './SpecSection';

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
  return (
    <section
      className={styles.specs}
      aria-labelledby='specs-section-title'
      itemScope
      itemType='https://schema.org/Product'
    >
      <div className={styles.specsContainer}>
        <h2 id='specs-section-title' className={styles.title}>
          RAM ProMaster EV Specifications
        </h2>
        <div className={styles.specGrid}>
          <div className={styles.leftColumn}>
            <SpecSection
              section={specPoints[0]}
              index={0}
              renderType='pricingPowertrain'
            />
            <SpecSection
              section={specPoints[1]}
              index={1}
              renderType='pricingPowertrain'
            />
          </div>
          <div className={styles.rightColumn}>
            <SpecSection
              section={specPoints[2]}
              index={2}
              renderType='exteriorFeatures'
            />
          </div>
        </div>
        <div className={styles.bottomSection}>
          <SpecSection
            section={specPoints[3]}
            index={3}
            renderType='interiorFeatures'
          />
        </div>
      </div>
    </section>
  );
}
