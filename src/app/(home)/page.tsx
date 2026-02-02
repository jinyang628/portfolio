'use client';

import { useState } from 'react';

import ProjectsContainer from '@/components/projects/container';
import ScrollToTop from '@/components/shared/scroll-to-top';
import Title from '@/components/title';
import ChatContainer from '@/components/chat/container';

export default function Home() {
  const [showIntro, setShowIntro] = useState<boolean>(false);
  const [showChat, setShowChat] = useState<boolean>(false);
  const [showCards, setShowCards] = useState<boolean>(false);

  const updateShowContent = () => {
    setShowIntro(true);
    setTimeout(() => {
      setShowChat(true);
      setShowCards(true);
    }, 1000);
  };

  return (
    <>
      <Title showIntro={showIntro} updateShowContent={updateShowContent} />
      <ChatContainer showChat={showChat} />
      <ProjectsContainer showCards={showCards} />
      <ScrollToTop />
    </>
  );
}
