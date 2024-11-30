import { PdfDocument, pdfContentMapping, pdfDocumentEnum } from '@/types/pdf';

import { logger } from '@/lib/logger';

const loadPdfJs = async () => {
  if (typeof window === 'undefined') {
    logger.error('Not in browser environment');
    return null;
  }

  try {
    const PDFJS = await import('pdfjs-dist');

    PDFJS.GlobalWorkerOptions.workerSrc = '/pdf/pdf.worker.mjs';

    logger.info('Loaded PDFJS');
    return PDFJS;
  } catch (error) {
    console.error('Error loading PDFJS:', error);
    return null;
  }
};

export async function loadPdfImageSrc(
  url: string,
  fileType: PdfDocument,
  removeConcatMargins: boolean = true,
) {
  const PDFJS = await loadPdfJs();
  if (!PDFJS) {
    throw new Error('PDF.js not initialized');
  }

  try {
    const response = await fetch(url);
    const arrayBuffer = await response.arrayBuffer();
    const pdf = await PDFJS.getDocument({ data: arrayBuffer }).promise;

    // Create canvas for combining pages
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (!ctx) throw new Error('Cannot get canvas context');

    let totalHeight = 0;
    let maxWidth = 0;
    const pageCanvases: HTMLCanvasElement[] = [];
    const CONCAT_MARGIN = 75; // Decided purely by observation
    const marginToRemove = removeConcatMargins ? CONCAT_MARGIN : 0; // pixels to remove from top/bottom

    // Render pages
    for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
      const page = await pdf.getPage(pageNum);
      const viewport = page.getViewport({ scale: 1.5 });

      const pageCanvas = document.createElement('canvas');
      const pageCtx = pageCanvas.getContext('2d');
      if (!pageCtx) throw new Error('Cannot get page canvas context');

      pageCanvas.width = viewport.width;
      pageCanvas.height = viewport.height;

      await page.render({
        canvasContext: pageCtx,
        viewport,
      }).promise;

      pageCanvases.push(pageCanvas);
      // Subtract margins from height calculation except for first/last page
      const effectiveHeight =
        viewport.height -
        (pageNum !== 1 && pageNum !== pdf.numPages ? marginToRemove * 2 : marginToRemove);
      totalHeight += effectiveHeight;
      maxWidth = Math.max(maxWidth, viewport.width);
    }

    // Combine pages
    canvas.width = maxWidth;
    canvas.height = totalHeight;

    let currentHeight = 0;
    pageCanvases.forEach((pageCanvas, index) => {
      const isFirstPage = index === 0;
      const isLastPage = index === pageCanvases.length - 1;

      // Source coordinates (where to start copying from)
      const sy = isFirstPage ? 0 : marginToRemove;
      // Height to copy (remove bottom margin except for last page)
      const sHeight =
        pageCanvas.height -
        (isFirstPage ? marginToRemove : marginToRemove * 2) +
        (isLastPage ? marginToRemove : 0);

      ctx.drawImage(
        pageCanvas,
        0,
        sy, // source x, y
        pageCanvas.width,
        sHeight, // source width, height
        0,
        currentHeight, // destination x, y
        pageCanvas.width,
        sHeight, // destination width, height
      );

      currentHeight += sHeight;
    });

    const imageSrc = canvas.toDataURL('image/jpeg', 0.8);

    switch (fileType) {
      case pdfDocumentEnum.Values.CV:
        if (pdfContentMapping.CV) {
          pdfContentMapping.CV.imageSrc = imageSrc;
        }
        break;
      default:
        logger.error(`Unknown PDF file type: ${fileType}`);
        break;
    }

    return imageSrc;
  } catch (error) {
    console.error('Error processing PDF:', error);
    throw error;
  }
}
