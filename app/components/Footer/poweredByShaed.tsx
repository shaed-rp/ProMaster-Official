import Image from 'next/image';
import styles from './poweredByShaed.module.scss';

export default function PoweredByShaedFooter() {
  return (
    <div className={styles.poweredByShaed}>
      <div>
        <a href='https://shaed.ai' className={styles.shaedLink}>
          <Image src='/icons/shaedSLogo.png' alt='Shaed Logo' width={35} height={35} />
        </a>
      </div>

      <p className={styles.footerText}>Powered by SHAED</p>
    </div>
  );
}
