'use client';

import { useState } from 'react';

import ProjectsContainer from '@/components/projects/container';
import ScrollToTop from '@/components/shared/scroll-to-top';
import Title from '@/components/title';

export default function Home() {
  const [showIntro, setShowIntro] = useState<boolean>(false);
  const [showCards, setShowCards] = useState<boolean>(false);

  const updateShowContent = () => {
    setShowIntro(true);
    setTimeout(() => {
      setShowCards(true);
    }, 1000);
  };

  return (
    <>
      <Title showIntro={showIntro} updateShowContent={updateShowContent} />
      <ProjectsContainer showCards={showCards} />
      <ScrollToTop />
    </>
  );
}
