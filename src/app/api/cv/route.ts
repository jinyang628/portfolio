import { NextResponse } from 'next/server';

import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

export async function GET() {
  try {
    const publicPath = path.join(process.cwd(), 'public', 'cv');
    const files = fs.readdirSync(publicPath);

    const pngFiles = await Promise.all(
      files
        .filter((file) => file.toLowerCase().endsWith('.png'))
        .map(async (file, index) => {
          const filePath = path.join(publicPath, file);
          const image = sharp(filePath);

          if (index > 0) {
            const metadata = await image.metadata();
            const height = metadata.height || 0;
            const topTrim = Math.floor(height * 0.05); // 5% from top
            const bottomTrim = Math.floor(height * 0.2); // 20% from bottom

            await image.extract({
              left: 0,
              top: topTrim,
              width: metadata.width || 0,
              height: height - (topTrim + bottomTrim),
            });
          }

          const buffer = await image.toBuffer();

          return `data:image/png;base64,${buffer.toString('base64')}`;
        }),
    );

    return NextResponse.json(pngFiles);
  } catch (error) {
    console.error('Error loading CV PNGs:', error);

    return NextResponse.json({ error: 'Failed to load images' }, { status: 500 });
  }
}
