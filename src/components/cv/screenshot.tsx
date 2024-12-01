import Image from 'next/image';

import ShimmerEffect from '@/components/accessory/shimmer-effect';
import { ScrollArea } from '@/components/ui/scroll-area';

interface ScreenshotSectionProps {
  imageSrc: string;
}

export default function ScreenshotSection({ imageSrc }: ScreenshotSectionProps) {
  return (
    <ScrollArea className="max-w-[80%] max-h-[80%] w-full rounded-md border">
      {imageSrc ? (
        <Image
          src={imageSrc}
          alt="Screenshot"
          width={0}
          height={0}
          sizes="100vw"
          style={{ width: '100%', height: '100%' }}
        />
      ) : (
        <ShimmerEffect />
      )}
    </ScrollArea>
  );
}
