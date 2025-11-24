'use client';

import Link from 'next/link';
import styles from './Breadcrumb.module.scss';

interface BreadcrumbProps {
  items: Array<{
    label: string;
    href?: string;
  }>;
}

export default function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <nav aria-label='Breadcrumb' className={styles.breadcrumb}>
      <ol itemScope itemType='https://schema.org/BreadcrumbList' className={styles.breadcrumbList}>
        {items.map((item, index) => (
          <li
            key={index}
            itemProp='itemListElement'
            itemScope
            itemType='https://schema.org/ListItem'
            className={styles.breadcrumbItem}
          >
            {item.href && index < items.length - 1 ? (
              <Link href={item.href} itemProp='item'>
                <span itemProp='name'>{item.label}</span>
              </Link>
            ) : (
              <span itemProp='name' aria-current='page'>{item.label}</span>
            )}
            <meta itemProp='position' content={(index + 1).toString()} />
            {index < items.length - 1 && (
              <span className={styles.separator} aria-hidden='true'>
                /
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

