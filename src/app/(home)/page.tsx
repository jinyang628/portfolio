'use client';

import { useState } from 'react';

import LanguagesSection from '@/components/languages/languages-section';
import MenuSection from '@/components/menu/menu-section';
import HeaderButtons from '@/components/shared/header/buttons';
import TechStackSection from '@/components/tech-stack/tech-stack';
import Title from '@/components/title';

export default function Home() {
  const [showIntro, setShowIntro] = useState<boolean>(false);
  const [showCards, setShowCards] = useState<boolean>(false);
  const [showTechStack, setShowTechStack] = useState<boolean>(false);
  const [showLanguages, setShowLanguages] = useState<boolean>(false);

  const updateShowContent = () => {
    setShowIntro(true);
    setTimeout(() => {
      setShowCards(true);
      setTimeout(() => {
        setShowTechStack(true);
        setTimeout(() => {
          setShowLanguages(true);
        }, 1000);
      }, 1000);
    }, 1000);
  };

  return (
    <div className="flex flex-col h-screen w-full p-8 min-w-[72rem]">
      <HeaderButtons />
      <Title showIntro={showIntro} updateShowContent={updateShowContent} />
      <MenuSection showCards={showCards} />
      <TechStackSection showTechStack={showTechStack} />
      <LanguagesSection showLanguages={showLanguages} />
    </div>
  );
}
