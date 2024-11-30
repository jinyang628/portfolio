import { z } from 'zod';

export const CV_PDF_FILE_NAME: string = 'Chen Jin Yang CV.pdf';
export const CV_PDF_PATH: string = `/pdf/${CV_PDF_FILE_NAME}`;

export const pdfStateSchema = z.object({
  imageSrc: z.string(),
  isLoading: z.boolean(),
});
export type PdfState = z.infer<typeof pdfStateSchema>;
export const defaultPdfState: PdfState = {
  imageSrc: '',
  isLoading: false,
};

export const pdfDocumentEnum = z.enum(['CV']);
export type PdfDocument = z.infer<typeof pdfDocumentEnum>;

const pdfImageSrcSchema = z.object({
  imageSrc: z.string().nullable(),
});

const pdfContentMappingSchema = z.record(pdfDocumentEnum, pdfImageSrcSchema);
type PdfContentMapping = z.infer<typeof pdfContentMappingSchema>;

export const pdfContentMapping: PdfContentMapping = {
  CV: {
    imageSrc: null,
  },
};
