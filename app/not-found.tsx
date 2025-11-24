'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import styles from './promaster/page.module.scss';

export default function NotFound() {
  const router = useRouter();
  const [showRedirectText, setShowRedirectText] = useState(false);

  useEffect(() => {
    const path = window.location.pathname;

    if (path !== path.toLowerCase()) {
      router.replace(path.toLowerCase());
    }

    const timeout = setTimeout(() => {
      setShowRedirectText(true);
    }, 3000);

    return () => clearTimeout(timeout);
  }, [router]);

  return (
    <div className={styles.notFoundContainer || 'not-found-container'}>
      <Image
        src='/icons/cevPulseLogo.gif'
        alt='Loading'
        width={450}
        height={250}
        priority
      />
      {showRedirectText && (
        <div className={styles.redirectText || 'redirect-text'}>
          <p>
            It appears the page you&apos;re looking for doesn&apos;t exist.{' '}
            <Link href='/'>Click here to go to the Promaster page.</Link>
          </p>
        </div>
      )}
    </div>
  );
}

