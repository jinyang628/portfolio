import { toast } from '@/hooks/use-toast';
import { type ClassValue, clsx } from 'clsx';
import { extendTailwindMerge } from 'tailwind-merge';

const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      'font-size': [
        {
          text: [
            '12',
            '13',
            '14',
            '15',
            '16',
            '18',
            '20',
            '22',
            '24',
            '28',
            '32',
            '36',
            '40',
            '44',
            '46',
            '48',
            '52',
            '56',
            '64',
          ],
        },
      ],
    },
  },
});

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function handleCopy(text: string, targetName: string) {
  navigator.clipboard
    .writeText(text)
    .then(() => {
      toast({
        title: 'Copied to clipboard',
        description: `The ${targetName} has been copied to your clipboard.`,
        duration: 3000,
      });
    })
    .catch((err) => {
      // eslint-disable-next-line no-console
      console.error('Failed to copy text: ', err);
      toast({
        title: 'Copy failed',
        description: `Failed to copy the ${targetName}. Please try again.`,
        variant: 'destructive',
        duration: 3000,
      });
    });
}

export function formatBytes(bytes: number): string {
  if (!Number.isFinite(bytes) || bytes <= 0) return '0 B';
  const units = ['B', 'KB', 'MB', 'GB'];
  const power = Math.min(Math.floor(Math.log(bytes) / Math.log(1024)), units.length - 1);
  const value = bytes / Math.pow(1024, power);
  return `${value >= 10 || power === 0 ? Math.round(value) : value.toFixed(1)} ${units[power]}`;
}
