import Loader from '@/components/accessory/loader';

export default function ShimmerEffect() {
  return (
    <div className="h-full w-full animate-pulse p-3">
      <div className="flex h-full w-full flex-col items-center justify-center rounded bg-slate-200 pt-4 dark:bg-slate-600">
        <Loader />
      </div>
    </div>
  );
}
