import styles from './Business.module.scss';
import BusinessItem from './BusinessItem';

interface BusinessItem {
  imageUrl: string;
  alt: string;
  title: string;
  description: string;
  buttonText: string;
  buttonLinkUrl: string;
}

interface BusinessProps {
  businessPoints: {
    title: string;
    businessPoints: BusinessItem[];
  };
}

export default function Business({ businessPoints }: BusinessProps) {
  return (
    <section
      className={styles.business}
      aria-labelledby='business-section-title'
      itemScope
      itemType='https://schema.org/Service'
    >
      <h2 id='business-section-title' className={styles.title}>
        {businessPoints.title || 'RAM ProMaster EV Business Benefits'}
      </h2>
      <div className={styles.content}>
        {businessPoints.businessPoints.map((point, index) => (
          <BusinessItem key={index} point={point} index={index} />
        ))}
      </div>
    </section>
  );
}
