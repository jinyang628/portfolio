import { Loader2 } from 'lucide-react';

import { cn } from '@/lib/utils';

export default function PageLoader({ className }: { className?: string }) {
  return (
    <div className={cn('flex h-screen items-center justify-center space-x-2', className)}>
      <Loader2 className="w-30 h-30 animate-spin text-primary/60" />
      <div className="text-2xl text-muted-foreground">Loading...</div>
    </div>
  );
}
