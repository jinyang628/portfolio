import Image from 'next/image';

import ShimmerEffect from '@/components/accessory/shimmer-effect';
import { ScrollArea } from '@/components/ui/scroll-area';

interface ScreenshotSectionProps {
  imageSrc: string;
  isScreenshotLoading: boolean;
}

export default function ScreenshotSection({
  imageSrc,
  isScreenshotLoading,
}: ScreenshotSectionProps) {
  const screenshot =
    // eslint-disable-next-line no-nested-ternary
    !isScreenshotLoading && imageSrc ? (
      <ScrollArea className="h-full w-full rounded-md border">
        <Image
          src={imageSrc}
          alt="Screenshot"
          width={0}
          height={0}
          sizes="100vw"
          style={{ width: '100%', height: 'auto' }}
        />
      </ScrollArea>
    ) : (
      <ShimmerEffect />
    );

  return <div className="h-full">{screenshot}</div>;
}
