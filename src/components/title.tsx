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
        options={{
          wrapperClassName: 'text-5xl flex justify-center mt-4',
          cursor: '',
          delay: 30,
        }}
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
      />
      <p className={`fade mt-4 text-center text-3xl ${showIntro ? 'opacity-100' : 'opacity-0'}`}>
        I take building very seriously.
      </p>
    </>
  );
}
