import React, { useEffect } from 'react';
import styles from './Modal.module.scss';
import { trackEvent } from '@/utils/analytics';
import { useRouter } from 'next/navigation';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  isSubmitted: boolean;
  pageName: string;
}

const Modal = ({
  isOpen,
  onClose,
  children,
  isSubmitted,
  pageName,
}: ModalProps) => {
  const router = useRouter();

  const handleClose = () => {
    trackEvent(
      'Engagement',
      'modal_close',
      `Modal Close - ${pageName}`,
      undefined,
      window.location.pathname
    );
    onClose();
  };

  useEffect(() => {
    if (isSubmitted) {
      localStorage.setItem('returnPath', window.location.pathname);
      router.push('/thankyou');
    }
  }, [isSubmitted, router]);

  useEffect(() => {
    if (!isOpen) return;

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleClose();
      }
    };

    // Trap focus within modal
    const modalContent = document.querySelector(`.${styles.modalContent}`);
    const focusableElements = modalContent?.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    const firstElement = focusableElements?.[0] as HTMLElement;
    const lastElement = focusableElements?.[
      focusableElements.length - 1
    ] as HTMLElement;

    const handleTab = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return;

      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          e.preventDefault();
          lastElement?.focus();
        }
      } else {
        if (document.activeElement === lastElement) {
          e.preventDefault();
          firstElement?.focus();
        }
      }
    };

    document.addEventListener('keydown', handleEscape);
    document.addEventListener('keydown', handleTab);
    firstElement?.focus();

    // Prevent body scroll when modal is open
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.removeEventListener('keydown', handleTab);
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      className={styles.modalOverlay}
      onClick={handleClose}
      role='dialog'
      aria-modal='true'
      aria-labelledby='modal-title'
    >
      <div
        className={styles.modalContent}
        onClick={(e) => e.stopPropagation()}
        role='document'
      >
        <h1 id='modal-title' className={styles.modalHeader}>
          Request Information
        </h1>
        <button
          className={styles.closeButton}
          onClick={handleClose}
          aria-label='Close modal'
          type='button'
        >
          &times;
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
