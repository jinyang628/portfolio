import React, { useEffect, useState } from 'react';

import { ArrowUp } from 'lucide-react';

import { Button } from '@/components/ui/button';

const SCROLL_TOP_THRESHOLD = 200;

export default function ScrollToTop() {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > SCROLL_TOP_THRESHOLD);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [SCROLL_TOP_THRESHOLD]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (!showScrollTop) return null;

  return (
    <Button onClick={scrollToTop} className="fixed bottom-8 right-8 rounded-full p-3" size="icon">
      <ArrowUp className="h-4 w-4" />
    </Button>
  );
}
