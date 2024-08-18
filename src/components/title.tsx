import Typewriter from "typewriter-effect";

type TitleProps = {
  showContent: boolean;
  updateShowContent: () => void;
};

export default function Title({ showContent, updateShowContent }: TitleProps) {
  const INTRO_TEXT: string = "Hello! I am Jin Yang";

  return (
    <>
      <Typewriter
        onInit={(typewriter) => {
          typewriter
            .typeString(INTRO_TEXT)
            .callFunction(() => {
              setTimeout(() => {
                updateShowContent();
              }, 550);
            })
            .start();
        }}
        options={{
          wrapperClassName: "text-5xl flex justify-center mt-4",
          cursor: "",
        }}
      />
      <p
        className={`transition-opacity text-3xl duration-1000 ${showContent ? "opacity-100" : "opacity-0"} mt-4 text-center`}
      >
        Here are some things that define who I am
      </p>
    </>
  );
}
