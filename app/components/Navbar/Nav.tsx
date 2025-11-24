'use client';

import Image from 'next/image';
import { useCallback, useState, useEffect, useRef } from 'react';
import styles from './Nav.module.scss';
import { vehicleConfigs } from '@/config/vehicleConfig';
import { usePathname } from 'next/navigation';

interface NavbarProps {
  vehicleId: string;
  openModal: () => void;
  sectionTitles: {
    [key: string]: string;
  };
}

const Navbar = ({ vehicleId, openModal, sectionTitles }: NavbarProps) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedSection, setSelectedSection] = useState('home');
  const sectionRefs = useRef<{ [key: string]: HTMLElement | null }>({});
  const pathname = usePathname();

  const config = vehicleConfigs[vehicleId];
  if (!config) {
    console.error(`No config found for vehicle: ${vehicleId}`);
    return null;
  }
  
  const visibleSections = config.sections.filter(
    (section) =>
      section.isVisible &&
      (section.id === 'request-info' || !section.hideFromNav)
  );

  // Promaster-specific styling
  const isPromaster = true;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);

      const currentScrollPosition = window.scrollY + window.innerHeight / 2;

      for (const section of ['home', ...visibleSections.map((s) => s.id)]) {
        const element = sectionRefs.current[section];
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (
            currentScrollPosition >= offsetTop &&
            currentScrollPosition < offsetTop + offsetHeight
          ) {
            setSelectedSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [visibleSections]);

  useEffect(() => {
    const currentRef = { ...sectionRefs.current };

    const sectionIds = [
      'home',
      ...visibleSections.map((section) => section.id),
    ];
    sectionIds.forEach((id) => {
      sectionRefs.current[id] = document.getElementById(id);
    });

    const observerOptions = {
      root: null,
      rootMargin: '-40% 0px -40% 0px',
      threshold: 0.5,
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setSelectedSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(
      observerCallback,
      observerOptions
    );
    Object.values(currentRef).forEach((section) => {
      if (section) observer.observe(section);
    });

    return () => {
      Object.values(currentRef).forEach((section) => {
        if (section) observer.unobserve(section);
      });
    };
  }, [visibleSections]);

  const scrollToSection = useCallback((sectionId: string) => {
    const section = sectionRefs.current[sectionId];
    if (section) {
      const navbarHeight =
        document.querySelector(`.${styles.navbar}`)?.clientHeight || 0;
      const offsetPosition = section.offsetTop - navbarHeight;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });

      setSelectedSection(sectionId);
    }
  }, []);

  const handleLinkClick = useCallback(
    (event: React.MouseEvent<HTMLAnchorElement>, sectionId: string) => {
      event.preventDefault();
      scrollToSection(sectionId);
      setMenuOpen(false);
    },
    [scrollToSection]
  );

  const toggleMenu = useCallback(() => {
    setMenuOpen((prev) => !prev);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : 'auto';
  }, [menuOpen]);

  const handleModalOpen = (e: React.MouseEvent) => {
    e.preventDefault();
    if (window.dataLayer) {
      window.dataLayer.push({
        event: 'nav_request_info_click',
        vehicle_id: vehicleId,
        page_path: pathname,
        section: selectedSection,
      });
    }
    openModal();
    setMenuOpen(false);
  };

  return (
    <nav
      className={`${styles.navbar} ${isScrolled ? styles.scrolled : ''}`}
      style={
        { '--brand-color': config.siteConfig.brandColor } as React.CSSProperties
      }
      aria-label='Main navigation'
      role='navigation'
    >
      <div className={styles.navContainer}>
        <div className={styles.logo}>
          <a href='#home' onClick={(event) => handleLinkClick(event, 'home')} aria-label='Navigate to home section - RAM ProMaster EV'>
            <Image
              src={config.siteConfig.logoUrl}
              alt={`${config.siteConfig.brandName} - RAM ProMaster EV Commercial Electric Van`}
              width={isPromaster ? 450 : 200}
              height={isPromaster ? 60 : 50}
              className={`${styles.logoOne} ${
                isPromaster ? styles.promasterLogo : ''
              }`}
              style={{ objectFit: 'contain' }}
            />
            {config.siteConfig.logoUrlTwo && (
              <>
                <span style={{ paddingLeft: '20px' }} />
                <Image
                  src={config.siteConfig.logoUrlTwo}
                  alt={`Authorized RAM ProMaster EV Dealer - ${config.siteConfig.brandName}`}
                  width={150}
                  height={50}
                  className={styles.logoTwo}
                  style={{ objectFit: 'contain' }}
                />
              </>
            )}
          </a>
        </div>

        <button
          className={styles.hamburger}
          onClick={toggleMenu}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
          aria-controls='main-navigation'
        >
          <span
            className={`${styles.bar} ${menuOpen ? styles.open : ''}`}
            aria-hidden='true'
          ></span>
          <span
            className={`${styles.bar} ${menuOpen ? styles.open : ''}`}
            aria-hidden='true'
          ></span>
          <span
            className={`${styles.bar} ${menuOpen ? styles.open : ''}`}
            aria-hidden='true'
          ></span>
        </button>
        <ul
          id='main-navigation'
          className={`${styles.navLinks} ${menuOpen ? styles.open : ''}`}
          role='menubar'
        >
          {visibleSections.map((section) => {
            const displayTitle = sectionTitles[section.id] || section.name;

            if (displayTitle) {
              return (
                <li key={section.id}>
                  {section.link ? (
                    <a
                      href={section.link}
                      target='_blank'
                      rel='noopener noreferrer'
                      className={styles.buyNowButton}
                    >
                      {displayTitle}
                    </a>
                  ) : section.id === 'request-info' ? (
                    <a
                      href='#'
                      onClick={handleModalOpen}
                      className={styles.requestInfoButton}
                      style={{ backgroundColor: config.siteConfig.brandColor }}
                      id={`contact-button-nav-${vehicleId}`}
                      aria-label={`${displayTitle} - Request information about RAM ProMaster EV`}
                      title={`${displayTitle} - Get pricing and information about RAM ProMaster EV`}
                    >
                      {displayTitle}
                    </a>
                  ) : (
                    <a
                      href={`#${section.id}`}
                      onClick={(event) => handleLinkClick(event, section.id)}
                      className={
                        selectedSection === section.id ? styles.active : ''
                      }
                      aria-label={`Navigate to ${displayTitle} section`}
                      title={`View ${displayTitle} - RAM ProMaster EV`}
                    >
                      {displayTitle}
                    </a>
                  )}
                </li>
              );
            }
            return null;
          })}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
