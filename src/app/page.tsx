import HeaderButtons from "@/components/shared/header/header-buttons";
import Title from "@/components/title";

export default function Home() {
  return (
    <div className={`flex flex-col h-screen w-full p-[2%]`}>
      <HeaderButtons/>
      <Title/>
    </div>
  );
}
