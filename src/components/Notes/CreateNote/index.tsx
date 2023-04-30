import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { Stack, Typography } from '@mui/material';

import { HINT, ZAMBEZI } from '@constants/colors';
import {
  MEGA_SMAILL_FONT_SIZE,
  SUPER_SMALL_FONT_SIZE,
} from '@constants/fontSizes';
import Wrapper from '@components/Wrapper';
import { debounce } from 'utils/functions/debounce';
import { noteApi } from 'services/NoteService';
import { authApi } from 'services/AuthService';
import { useAppSelector } from '@redux/hooks';
import FileUpload from '@components/FileInput';
import {
  Date as StyledDate,
  Doctor,
  AddButton,
  StyledTextArea,
  CreateNoteContainer,
} from './styles';
import { useTranslation } from 'react-i18next';

interface CreateNoteResponse {
  error: string;

  data: any;
}
interface CreateNoteProps {
  addNew: boolean;
  setAddNew: (arg: boolean) => void;
  created: boolean;
  setCreated: (arg: boolean) => void;
}

const CreateNote = ({
  addNew,
  setAddNew,
  setCreated,
  created,
}: CreateNoteProps) => {
  const [value, setValue] = React.useState<string>('');
  const [files, setFiles] = React.useState({});

  const filterParams = useAppSelector((state) => state.noteFilterReducer);

  const [createPatientNote, { error: createNoteError }] =
    noteApi.useCreatePatientNoteMutation();
  const { data: doctor } = authApi.useGetMeQuery({});
  const {
    data: notes,
    refetch: refetchNotes,
    error: notesError,
  } = noteApi.useGetPatientNoteQuery({ ...filterParams });

  const handleTextArea = React.useCallback(
    debounce((event: React.ChangeEvent<HTMLInputElement>) => {
      setValue(event.target.value);
    }, 500),
    []
  );

  const updateUploadedFiles = (files: File[]) => setFiles(files);

  const createNote = async (): Promise<void> => {
    await createPatientNote({
      doctorId: doctor.id,
      patientId: 1,
      note: value,
      file: files ? files : null,
    }).then(async (res) => {
      if (res.error) {
        const toastId = 'file-mandatory';
        if (!toast.isActive(toastId)) {
          toast.error('The file is mandatory!', { toastId });
        }
      }
      if (!res.error) {
        setCreated(!created);
        setAddNew(false);
      }
    });
  };

  const { t } = useTranslation();

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
        <AddButton onClick={createNote} disabled={value.length < 10}>
          {t('Notes.add')}
        </AddButton>
      </Stack>
      <CreateNoteContainer>
        <Stack>
          <Typography color={ZAMBEZI} fontSize={SUPER_SMALL_FONT_SIZE}>
            {t('Notes.description')}
          </Typography>
          <StyledTextArea onChange={handleTextArea} />
          <Stack direction="row" alignItems="center" gap="10px">
            <Typography color={HINT} fontSize={MEGA_SMAILL_FONT_SIZE}>
              {t('Notes.hint')}
            </Typography>
            {value.length < 10 ? (
              <Typography color="red" fontSize={MEGA_SMAILL_FONT_SIZE}>
                {t('Notes.theNoteShouldContainAtLeastSymbols')}
              </Typography>
            ) : null}
          </Stack>

          <Stack alignItems="center">
            <FileUpload
              label="Patient's files"
              //  multiple
              updateFilesCb={updateUploadedFiles}
            />
          </Stack>
        </Stack>
      </CreateNoteContainer>
      <Doctor>
        {t('Notes.dr')} {doctor.firstName} {doctor.lastName}
      </Doctor>
    </Wrapper>
  );
};

export default CreateNote;
