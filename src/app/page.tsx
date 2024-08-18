"use client";

import MenuSection from "@/components/menu/menu-section";
import HeaderButtons from "@/components/shared/header/header-buttons";
import Title from "@/components/title";

import { useState } from "react";

export default function Home() {
  const [showContent, setShowContent] = useState<boolean>(false);

  const updateShowContent = () => {
    setShowContent(true);
  };

  return (
    <div className="flex flex-col h-screen w-full p-[2%]">
      <HeaderButtons />
      <Title showContent={showContent} updateShowContent={updateShowContent} />
      <div className="flex grid-cols-3">
        <MenuSection showContent={showContent} />
      </div>
    </div>
  );
}
