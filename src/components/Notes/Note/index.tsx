import Wrapper from '@components/Wrapper';
import React from 'react';
import { MainText, Date as StyledDate, Show, Doctor } from './styles';
import { noteApi } from 'services/NoteService';
import { useHighlight } from 'utils/hooks/useHighlight';
import { firstName } from './../../../constants/auth';

interface NoteProps {
  createdAt: string;
  note: string;
  doctorId: { firstName: string; lastName: string };
}

const Note = ({ createdAt, note, doctorId }: NoteProps) => {
  const [show, setShow] = React.useState<boolean>(false);
  const highlightedText = useHighlight(note);

  const dateObj = new Date(createdAt);
  const formattedDate = dateObj.toLocaleString('en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    <Wrapper>
      <StyledDate> {formattedDate}</StyledDate>
      <MainText>
        {show ? <p>{highlightedText}</p> : <p>{highlightedText}</p>}
      </MainText>
      <Show onClick={() => setShow(!show)}>Show {show ? 'less' : 'more'}</Show>

      <Doctor>
        Dr. {doctorId.firstName} {doctorId.lastName}
      </Doctor>
    </Wrapper>
  );
};

export default Note;
