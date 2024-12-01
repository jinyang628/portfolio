'use client';

import { useEffect, useState } from 'react';

import { ArrowUp } from 'lucide-react';

import ScreenshotSection from '@/components/cv/screenshot';
import PageLoader from '@/components/shared/page-loading-indicator';
import { Button } from '@/components/ui/button';

import { CV_PDF_PATH, PdfState, defaultPdfState, pdfDocumentEnum } from '@/types/pdf';

import { loadPdfImageSrc } from '@/lib/pdf';

const SCROLL_TOP_THRESHOLD = 200;

export default function CV() {
  const [pdfState, setPdfState] = useState<PdfState>(defaultPdfState);
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > SCROLL_TOP_THRESHOLD);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    const loadCV = async () => {
      try {
        setPdfState({
          ...pdfState,
          isLoading: true,
        });
        const imageSrc = await loadPdfImageSrc(CV_PDF_PATH, pdfDocumentEnum.Values.CV);
        console.log(imageSrc);
        setPdfState({
          imageSrc: imageSrc,
          isLoading: false,
        });
      } catch (error) {
        setPdfState({
          imageSrc: '',
          isLoading: false,
        });
        throw error;
      }
    };

    loadCV();
  }, []);

  if (pdfState.isLoading) {
    return <PageLoader />;
  }

  return (
    <div className="flex justify-center m-5">
      <ScreenshotSection imageSrc={pdfState.imageSrc} />
      {showScrollTop && (
        <Button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 rounded-full p-3"
          size="icon"
        >
          <ArrowUp className="h-4 w-4" />
        </Button>
      )}
    </div>
  );
}
