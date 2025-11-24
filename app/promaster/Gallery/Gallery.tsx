import Image from 'next/image';
import styles from './Gallery.module.scss';

interface GalleryImage {
  url: string;
  alt: string;
}

interface GalleryProps {
  images: GalleryImage[];
  title?: string;
}

const Gallery = ({ images, title = 'Vehicle Gallery' }: GalleryProps) => {
  const displayImages = images.slice(0, 7);
  
  // First 3 images are above-the-fold and should be prioritized
  const PRIORITY_THRESHOLD = 3;

  return (
    <section className={styles.gallery} aria-labelledby='gallery-section-title' itemScope itemType='https://schema.org/ImageGallery'>
      <h2 id='gallery-section-title' className={styles.title}>{title || 'RAM ProMaster EV Gallery'}</h2>
      <div className={styles.staggeredGrid}>
        <div className={`${styles.imageWrapper} ${styles.tall}`}>
          <Image
            src={displayImages[0].url}
            alt={displayImages[0].alt}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 33vw, 25vw"
            style={{ objectFit: 'cover' }}
            priority
            fetchPriority="high"
          />
        </div>
        <div className={styles.middleSection}>
          <div className={styles.topRow}>
            <div className={`${styles.imageWrapper} ${styles.mediumWide}`}>
              <Image
                src={displayImages[1].url}
                alt={displayImages[1].alt}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 40vw, 20vw"
                style={{ objectFit: 'cover' }}
                priority
                fetchPriority="high"
              />
            </div>
            <div className={`${styles.imageWrapper} ${styles.small}`}>
              <Image
                src={displayImages[2].url}
                alt={displayImages[2].alt}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 20vw, 10vw"
                style={{ objectFit: 'cover' }}
                priority
                fetchPriority="high"
              />
            </div>
          </div>
          <div className={`${styles.imageWrapper} ${styles.fullWidth}`}>
            <Image
              src={displayImages[3].url}
              alt={displayImages[3].alt}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 66vw, 40vw"
              style={{ objectFit: 'cover' }}
              loading='lazy'
            />
          </div>
          <div className={styles.bottomRow}>
            <div className={`${styles.imageWrapper} ${styles.mediumNarrow}`}>
              <Image
                src={displayImages[4].url}
                alt={displayImages[4].alt}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 30vw, 15vw"
                style={{ objectFit: 'cover' }}
                loading='lazy'
              />
            </div>
            <div className={`${styles.imageWrapper} ${styles.medium}`}>
              <Image
                src={displayImages[5].url}
                alt={displayImages[5].alt}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 36vw, 18vw"
                style={{ objectFit: 'cover' }}
                loading='lazy'
              />
            </div>
          </div>
        </div>
        <div className={`${styles.imageWrapper} ${styles.tall}`}>
          <Image
            src={displayImages[6].url}
            alt={displayImages[6].alt}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 33vw, 25vw"
            style={{ objectFit: 'cover' }}
            loading='lazy'
          />
        </div>
      </div>
    </section>
  );
};

export default Gallery;
