import React from 'react';
import { useTranslation } from 'react-i18next';
import Highlighter from 'react-highlight-words';
import { PATH } from '@router/index';

import {
  AccordionBody,
  Arrow,
  Container,
  EditCardLink,
  PatientName,
} from './styles';

type Props = {
  children: any;
  patientFullName: string;
  searchValue: string;
};

const CardWrapper: React.FC<Props> = ({
  children,
  patientFullName,
  searchValue,
}) => {
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
      <Container>
        <PatientName toggle={toggle} onClick={toggleState}>
          <Highlighter
            searchWords={[searchValue]}
            autoEscape={true}
            textToHighlight={patientFullName}
          ></Highlighter>

          <Arrow toggle={!toggle} />
        </PatientName>
        <EditCardLink to={PATH.EDIT_PATIENT_CARD}>
          {t('Patients.editCard')}
        </EditCardLink>
      </Container>
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
