import React from 'react';
import axios from 'axios';
import { useHighlight } from 'utils/hooks/useHighlight';
import Wrapper from '@components/Wrapper';
import { Stack } from '@mui/system';
import { ReactComponent as PaperClip } from '@assets/paperClip.svg';
import { Typography } from '@mui/material';

import { MainText, Date as StyledDate, Show, Doctor } from './styles';
import { useTranslation } from 'react-i18next';

interface NoteProps {
  createdAt: string;
  note: string;
  doctor: { firstName: string; lastName: string };
  file: any;
}

const Note = ({ createdAt, note, doctor, file }: NoteProps) => {
  const [show, setShow] = React.useState<boolean>(false);
  const highlightedTextLess = useHighlight(note.slice(0, 100).trim());
  const highlightedTextMore = useHighlight(note);

  const { t } = useTranslation();

  const dateObj = new Date(createdAt);
  const formattedDate = dateObj.toLocaleString('en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

  const handleDownload = () => {
    try {
      const url = `${
        import.meta.env.VITE_REACT_APP_BASE_URL_SERVER
      }notes/file/${file.filename}`;
      axios.get(url, { responseType: 'blob' }).then((res) => {
        const blob = res.data;
        const blobUrl = window.URL.createObjectURL(new Blob([blob]));
        const fileName = `${file.originalName}`;
        const aTag = document.createElement('a');
        aTag.href = blobUrl;
        aTag.setAttribute('download', fileName);
        document.body.appendChild(aTag);
        aTag.click();
        aTag.remove();
      });
    } catch (error) {
      `Impossible to download file:${error}`;
    }
  };

  return (
    <Wrapper>
      <StyledDate> {formattedDate}</StyledDate>
      <MainText>
        {note.length > 100 && !show ? (
          <p>{highlightedTextLess}...</p>
        ) : (
          <p>{highlightedTextMore}</p>
        )}
      </MainText>

      {note.length > 100 && (
        <Show onClick={() => setShow(!show)}>
          {t('Notes.show')} {show ? 'less' : 'more'}
        </Show>
      )}
      <Stack direction="row" alignItems="center" gap="30px">
        <Doctor>
          {t('Notes.dr')} {doctor.firstName} {doctor.lastName}
        </Doctor>
        <Stack
          direction="row"
          gap="5px"
          alignItems="center"
          onClick={() => handleDownload()}
        >
          {file ? (
            <>
              <PaperClip />
              <Typography>{file.originalName}</Typography>
            </>
          ) : null}
        </Stack>
      </Stack>
    </Wrapper>
  );
};

export default Note;
