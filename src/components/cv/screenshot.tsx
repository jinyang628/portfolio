import Image from 'next/image';

import PageLoader from '@/components/shared/page-loading-indicator';
import { ScrollArea } from '@/components/ui/scroll-area';

interface ScreenshotSectionProps {
  imageSrcs: string[];
}

export default function ScreenshotSection({ imageSrcs }: ScreenshotSectionProps) {
  if (imageSrcs.length === 0) {
    return <PageLoader />;
  }

  return (
    <ScrollArea className="max-w-[80%] max-h-[80%] w-full rounded-md border">
      {imageSrcs.map((src, index) => (
        <Image
          key={index}
          src={src}
          alt={`Screenshot ${index + 1}`}
          width={0}
          height={0}
          sizes="100vw"
          style={{ width: '100%', height: '100%' }}
        />
      ))}
    </ScrollArea>
  );
}
