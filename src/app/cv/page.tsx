'use client';

import { useEffect, useState } from 'react';

import ScreenshotSection from '@/components/cv/screenshot';
import PageLoader from '@/components/shared/page-loading-indicator';
import ScrollToTop from '@/components/shared/scroll-to-top';

import { CV_PDF_PATH, PdfState, defaultPdfState, pdfDocumentEnum } from '@/types/pdf';

import { loadPdfImageSrc } from '@/lib/pdf';

export default function CV() {
  const [pdfState, setPdfState] = useState<PdfState>(defaultPdfState);

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
      <ScrollToTop />
    </div>
  );
}
