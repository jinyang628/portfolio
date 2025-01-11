'use client';

import { useEffect, useState } from 'react';

import ScreenshotSection from '@/components/cv/screenshot';
import PageLoader from '@/components/shared/page-loading-indicator';
import ScrollToTop from '@/components/shared/scroll-to-top';

import { CVState, defaultCVState } from '@/types/cv';

import { loadCVPng } from '@/lib/cv';

export default function CV() {
  const [pdfState, setPdfState] = useState<CVState>(defaultCVState);

  useEffect(() => {
    const loadCV = async () => {
      try {
        setPdfState({
          ...pdfState,
          isLoading: true,
        });
        const imageSrc: string[] = await loadCVPng();
        console.log(imageSrc);
        setPdfState({
          imageSrcs: imageSrc,
          isLoading: false,
        });
      } catch (error) {
        setPdfState({
          imageSrcs: [],
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
    <div className="m-5 flex justify-center">
      <ScreenshotSection imageSrcs={pdfState.imageSrcs} />
      <ScrollToTop />
    </div>
  );
}
