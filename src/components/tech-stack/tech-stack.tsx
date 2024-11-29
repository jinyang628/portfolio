import { RiNextjsLine } from 'react-icons/ri';
import { SiLangchain } from 'react-icons/si';
import { SiTensorflow } from 'react-icons/si';
import { SiScikitlearn } from 'react-icons/si';
import { SiKeras } from 'react-icons/si';

import Category from './category';

type TechStackProps = {
  showTechStack: boolean;
};

export default function TechStackSection({ showTechStack }: TechStackProps) {
  return (
    <>
      <Category
        showCategory={showTechStack}
        title="AI Infrastructure"
        iconList={[SiLangchain, SiTensorflow, SiScikitlearn, SiKeras]}
      />

      <div>
        <RiNextjsLine />
      </div>
    </>
  );
}
