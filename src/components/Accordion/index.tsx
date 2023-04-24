import Wrapper from '@components/Wrapper';
import { useTranslation } from 'react-i18next';
import React from 'react';

import { AccordionBody, AccordionTitle, Arrow } from './styles';

const Accordion: React.FC = () => {
  const { t } = useTranslation();

  const [toggle, setToggle] = React.useState<boolean>(false);
  const [heightEl, setHeightEl] = React.useState<string>();

  const refHeight = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (refHeight.current)
      setHeightEl(`${refHeight.current.scrollHeight + 20 + 16}px`);
  }, []);

  const toggleState = (): void => {
    setToggle(!toggle);
  };
  return (
    <Wrapper>
      <AccordionTitle toggle={toggle} onClick={toggleState}>
        <p> {t('Help.problem')}</p>
        <Arrow toggle={toggle} />
      </AccordionTitle>
      <AccordionBody
        toggle={toggle}
        style={{
          height: toggle ? `${heightEl}` : '0px',
          overflow: 'hidden',
          transition: '0.3s all',
        }}
        ref={refHeight}
      >
        {t('Help.lorem')}
      </AccordionBody>
    </Wrapper>
  );
};

export default Accordion;
