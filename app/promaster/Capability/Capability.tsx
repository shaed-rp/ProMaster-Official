import styles from './Capability.module.scss';
import CapabilityItem from './CapabilityItem';

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

  return (
    <section
      className={styles.capability}
      aria-labelledby='capability-section-title'
    >
      <div className={styles.capabilityContainer}>
        <h2 id='capability-section-title' className={styles.title}>
          {title}
        </h2>
        <div className={styles.content}>
          <div className={styles.specsContainer}>
            {specs.map((spec, index) => (
              <CapabilityItem key={index} spec={spec} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Capability;
