import styles from './Charging.module.scss';
import ChargingCard from './ChargingCard';

interface ChargingOption {
  imageUrl: string;
  title: string;
  description: string;
}

interface ChargingProps {
  chargingPoints: {
    title: string;
    chargingOptions: ChargingOption[];
  };
}

export default function Charging({ chargingPoints }: ChargingProps) {
  if (!chargingPoints) {
    return null;
  }

  return (
    <section
      className={styles.charging}
      aria-labelledby='charging-section-title'
      itemScope
      itemType='https://schema.org/HowTo'
    >
      <h2 id='charging-section-title' className={styles.title}>
        {chargingPoints.title || 'RAM ProMaster EV Charging'}
      </h2>
      <div className={styles.content}>
        {chargingPoints.chargingOptions.map((option, index) => (
          <ChargingCard 
            key={`charging-${option.title}-${index}`} 
            option={option} 
            index={index} 
          />
        ))}
      </div>
    </section>
  );
}
