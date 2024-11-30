'use client';

import { useState } from 'react';

import MenuSection from '@/components/menu/menu-section';
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
      <MenuSection showCards={showCards} />
    </>
  );
}
