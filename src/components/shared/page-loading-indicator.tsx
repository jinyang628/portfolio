import { cn } from '@/lib/utils';

export default function PageLoader({ className }: { className?: string }) {
  return (
    <div className={cn('flex h-screen items-center justify-center space-x-2', className)}>
      <l-spiral color="hsl(var(--primary))" size={200} />
    </div>
  );
}
