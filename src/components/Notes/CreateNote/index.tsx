import Wrapper from '@components/Wrapper';
import React from 'react';
import { Stack, Button, Typography, Box, Input } from '@mui/material';
import {
  MainText,
  Date as StyledDate,
  Show,
  Doctor,
  AddButton,
  StyledTextArea,
  CreateNoteContainer,
} from './styles';
import { ReactComponent as PaperclipIcon } from '@assets/paperClip.svg';
import { HINT, ZAMBEZI } from '@constants/colors';
import {
  MEGA_SMAILL_FONT_SIZE,
  SUPER_SMALL_FONT_SIZE,
} from '@constants/fontSizes';
import { debounce } from 'utils/functions/debounce';
import { noteApi } from 'services/NoteService';
import { authApi } from 'services/AuthService';
import { useAppSelector } from '@redux/hooks';
import FileUpload, { FileInput } from '@components/FileInput';

interface CreateNoteProps {
  addNew: boolean;
  setAddNew: (arg: boolean) => void;
}

const CreateNote = ({ addNew, setAddNew }: CreateNoteProps) => {
  const [show, setShow] = React.useState<boolean>(false);
  const [value, setValue] = React.useState<string>('');
  const [files, setFiles] = React.useState({});
  const fileInputField = React.useRef(null);

  const filterParams = useAppSelector((state) => state.noteFilterReducer);

  const [createPatientNote, { error }] = noteApi.useCreatePatientNoteMutation();
  const { data: doctor } = authApi.useGetMeQuery({});
  const { data: notes, refetch: refetchNotes } = noteApi.useGetPatientNoteQuery(
    { ...filterParams }
  );

  const handleTextArea = React.useCallback(
    debounce((event: React.ChangeEvent<HTMLInputElement>) => {
      setValue(event.target.value);
    }, 500),
    []
  );

  const createNote = async () => {
    await createPatientNote({
      doctorId: doctor.id,
      patientId: 1,
      note: value,
      file: '',
    });
    await refetchNotes();
    setAddNew(false);
  };

  const dateObj = new Date();
  const month = dateObj.toLocaleString('en-US', { month: 'long' });
  const date = dateObj.getDate();
  const year = dateObj.getFullYear();
  let hour = dateObj.getHours();
  const minute = dateObj.getMinutes();
  let amOrPm = 'AM';

  if (hour > 12) {
    hour -= 12;
    amOrPm = 'PM';
  }

  const formattedDate = `${month} ${date}, ${year} at ${hour
    .toString()
    .padStart(2, '0')}:${minute.toString().padStart(2, '0')} ${amOrPm}`;

  if (!addNew) {
    return null;
  }
  return (
    <Wrapper>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <StyledDate>{formattedDate}</StyledDate>
        <AddButton onClick={() => createNote()}>Add</AddButton>
      </Stack>
      <CreateNoteContainer>
        <Stack>
          <Typography color={ZAMBEZI} fontSize={SUPER_SMALL_FONT_SIZE}>
            Description
          </Typography>
          <StyledTextArea onChange={handleTextArea} />
          <Typography color={HINT} fontSize={MEGA_SMAILL_FONT_SIZE}>
            Hint
          </Typography>
          <Stack alignItems="center">
            <FileUpload
              accept=".jpg,.png,.jpeg,.docx"
              label="Patient's files"
              multiple
            />
          </Stack>
        </Stack>
      </CreateNoteContainer>
      <Doctor>
        Dr. {doctor.firstName} {doctor.lastName}
      </Doctor>
    </Wrapper>
  );
};

export default CreateNote;
