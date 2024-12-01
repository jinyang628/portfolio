import Typewriter from 'typewriter-effect';

type TitleProps = {
  showIntro: boolean;
  updateShowContent: () => void;
};

export default function Title({ showIntro, updateShowContent }: TitleProps) {
  const INTRO_TEXT: string = 'Hello! I am Jin Yang';

  return (
    <>
      <Typewriter
        onInit={(typewriter) => {
          typewriter
            .typeString(INTRO_TEXT)
            .callFunction(() => {
              setTimeout(() => {
                updateShowContent();
              }, 100);
            })
            .start();
        }}
        options={{
          wrapperClassName: 'text-5xl flex justify-center mt-4',
          cursor: '',
          delay: 30,
        }}
      />
      <p className={`fade text-3xl mt-4 text-center ${showIntro ? 'opacity-100' : 'opacity-0'}`}>
        I am a builder and entrepreneur at heart
      </p>
    </>
  );
}
