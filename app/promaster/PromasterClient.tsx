'use client';

import { useCallback, useState } from 'react';
import ContactForm from '@components/Form/ContactForm/ContactForm';
import Modal from '@components/Modal/Modal';
import { ThemeProvider } from '@/contexts/ThemeContext';
import { useRouter } from 'next/navigation';
import { VehicleData } from '@/types/vehicle';
import PromasterServer from './PromasterServer';
import ErrorBoundary from '@components/ErrorBoundary/ErrorBoundary';

interface PromasterClientProps {
  data: VehicleData;
  sectionTitles: { [key: string]: string };
}

export default function PromasterClient({
  data,
  sectionTitles,
}: PromasterClientProps) {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const openModal = useCallback(() => {
    setIsModalOpen(true);
    setIsSubmitted(false);
  }, []);

  const closeModal = useCallback(() => {
    setIsModalOpen(false);
    setIsSubmitted(false);
  }, []);

  const handleSubmit = useCallback(() => {
    setIsSubmitted(true);
    closeModal();
    router.push('/thankyou');
  }, [closeModal, router]);

  if (!data) return null;

  return (
    <ErrorBoundary>
      <ThemeProvider brandColor={data.siteConfig.brandColor}>
        <PromasterServer
          data={data}
          sectionTitles={sectionTitles}
          openModal={openModal}
        />
        <Modal
          isOpen={isModalOpen}
          onClose={closeModal}
          isSubmitted={isSubmitted}
          pageName='Promaster'
        >
          <ContactForm
            onSubmit={handleSubmit}
            siteTitle={data.siteConfig.title}
          />
        </Modal>
      </ThemeProvider>
    </ErrorBoundary>
  );
}
