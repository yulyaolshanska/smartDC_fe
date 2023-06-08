import { useParams } from 'react-router';
import React from 'react';
import { toast } from 'react-toastify';
import { Stack } from '@mui/material';
import { useTranslation } from 'react-i18next';
import Wrapper from '@components/Wrapper';
import { debounce } from 'utils/functions/debounce';
import { noteApi } from 'services/NoteService';
import { authApi } from 'services/AuthService';
import { useAppSelector } from '@redux/hooks';
import FileUpload from '@components/FileInput';
import { useConditionalRender } from 'utils/hooks/useConditionalRender';
import {numberTen} from '@constants/other';
import {
  Description,
  HintText,
  ErrorText,
  ErrorWrapper,
  TextAreaSection,
  UploaderWrapper,
  Date as StyledDate,
  Doctor,
  AddButton,
  StyledTextArea,
  CreateNoteContainer,
} from './styles';

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
  const render = useConditionalRender(addNew);

  const { id: patientId } = useParams();

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
      patientId: patientId,
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

  const getCurrentFormattedDate = () => {
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

    return `${month} ${date}, ${year} at ${hour
      .toString()
      .padStart(2, '0')}:${minute.toString().padStart(2, '0')} ${amOrPm}`;
  };

  const formattedDate = React.useMemo(() => getCurrentFormattedDate(), []);

  return render(
    <Wrapper>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <StyledDate>{formattedDate}</StyledDate>
        <AddButton onClick={createNote} disabled={value.length < 10}>
          {t('Notes.add')}
        </AddButton>
      </Stack>
      <CreateNoteContainer>
        <Stack>
          <Description>{t('Notes.description')}</Description>
          <TextAreaSection>
          <StyledTextArea onChange={handleTextArea} />
          {value.length < numberTen ? (
              <ErrorWrapper>
              <HintText>{t('Notes.hint')}</HintText>
              <ErrorText>
                {t('Notes.theNoteShouldContainAtLeastSymbols')}
              </ErrorText>
            </ErrorWrapper>
          ) : null}

          </TextAreaSection>
          <UploaderWrapper>
            <Description>{t('Notes.patientsFiles')}</Description>
            <FileUpload updateFilesCb={updateUploadedFiles} />
          </UploaderWrapper>
        </Stack>
      </CreateNoteContainer>
      <Doctor>
        {t('Notes.dr')} {doctor?.firstName} {doctor?.lastName}
      </Doctor>
    </Wrapper>
  );
};

export default CreateNote;
