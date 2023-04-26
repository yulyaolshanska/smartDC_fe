import { useTranslation } from 'react-i18next';
import React from 'react';

import { AccordionBody, Arrow, PatientName } from './styles';

type Props = {
  children: React.ReactNode;
};

const CardWrapper: React.FC<Props> = ({ children }) => {
  const { t } = useTranslation();

  const [toggle, setToggle] = React.useState<boolean>(false);
  const [heightEl, setHeightEl] = React.useState<string>();

  const refHeight = React.useRef<HTMLDivElement>(null);

  const MARGIN_TOP = 20;
  const PADDING = 16;

  React.useEffect(() => {
    if (refHeight.current)
      setHeightEl(`${refHeight.current.scrollHeight + MARGIN_TOP + PADDING}px`);
  }, []);

  const toggleState = (): void => {
    setToggle(!toggle);
  };
  return (
    <>
      {/* <AccordionTitle toggle={toggle} onClick={toggleState}>  */}
      <PatientName toggle={toggle} onClick={toggleState}>
        John Doe
        <Arrow toggle={toggle} />
      </PatientName>
      {/* </AccordionTitle> */}
      <AccordionBody
        toggle={toggle}
        style={{
          height: toggle ? `${heightEl}` : '0px',
          overflow: 'hidden',
          transition: '0.3s all',
        }}
        ref={refHeight}
      >
        {children}
      </AccordionBody>
    </>
  );
};

export default CardWrapper;
