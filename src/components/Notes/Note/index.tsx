import React from 'react';
import axios from 'axios';
import { useHighlight } from 'utils/hooks/useHighlight';
import Wrapper from '@components/Wrapper';
import { Stack } from '@mui/system';
import DownloadIcon from '@mui/icons-material/Download';
import { Typography } from '@mui/material';

import { MainText, Date as StyledDate, Show, Doctor } from './styles';

interface NoteProps {
  createdAt: string;
  note: string;
  doctorId: { firstName: string; lastName: string };
  file: any;
}

const Note = ({ createdAt, note, doctorId, file }: NoteProps) => {
  const [show, setShow] = React.useState<boolean>(false);
  const highlightedTextLess = useHighlight(note.slice(0, 100).trim());
  const highlightedTextMore = useHighlight(note);

  const dateObj = new Date(createdAt);
  const formattedDate = dateObj.toLocaleString('en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

  const handleDownload = () => {
    const url = `${import.meta.env.VITE_REACT_APP_BASE_URL_SERVER}notes/file/${
      file.filename
    }`;
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
          Show {show ? 'less' : 'more'}
        </Show>
      )}
      <Stack direction="row" alignItems="center" gap="30px">
        <Doctor>
          Dr. {doctorId.firstName} {doctorId.lastName}
        </Doctor>
        <Stack
          direction="row"
          gap="5px"
          alignItems="center"
          onClick={() => handleDownload()}
        >
          {file ? (
            <>
              <DownloadIcon color="success" />
              <Typography>Download an attached file</Typography>
            </>
          ) : null}
        </Stack>
      </Stack>
    </Wrapper>
  );
};

export default Note;
