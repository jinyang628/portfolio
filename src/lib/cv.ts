export async function loadCVPng(): Promise<string[]> {
  try {
    const response = await fetch('/api/cv');
    return await response.json();
  } catch (error) {
    console.error('Error loading CV PNGs:', error);
    return [];
  }
}
