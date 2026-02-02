import { createWorker } from 'tesseract.js';

export async function loadCVPng(): Promise<string[]> {
  try {
    const response = await fetch('/api/cv');

    return await response.json();
  } catch (error) {
    console.error('Error loading CV PNGs:', error);

    return [];
  }
}

async function extractTextFromPng(path: string) {
  const worker = await createWorker();

  await worker.load();
  await worker.loadLanguage('eng');
  await worker.initialize('eng');

  const { data } = await worker.recognize(path);

  await worker.terminate();

  return data.text;
}

(async () => {
  const text = await extractTextFromPng('image.png');
  console.log('Extracted text:', text);
})();
