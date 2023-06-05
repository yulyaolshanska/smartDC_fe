import React from 'react';
import { Stack } from '@mui/material';
import AddNoteButton from './AddNoteButton';
import SearchBar from './SearchBar';
import Sort from './Sort';
import Note from './Note';
import CreateNote from './CreateNote';
import LoadMoreButton from '@components/LoadMoreButton';
import { noteApi } from 'services/NoteService';
import { useAppSelector } from '@redux/hooks';
import Skeleton from './Skeleton';
import { ToastContainer, toast } from 'react-toastify';
import Error from './Error';
import { patientApi } from 'services/PatientService';
import { useParams } from 'react-router';

export interface INotes {
  id: number;
  note: string;
  file: string;
  createdAt: string;
  updatedAt: string;
  doctor: { firstName: string; lastName: string };
}

const emptyArray = Array(4).fill(null);

const Notes = () => {
  const [addNew, setAddNew] = React.useState<boolean>(false);
  const [notesLocal, setNotesLocal] = React.useState<INotes[] | []>([]);
  const [created, setCreated] = React.useState<boolean>(false);
  const [mounted, setMounted] = React.useState<boolean>(false);

  const { id: patientId } = useParams();

  const notDuplicatedArray = notesLocal.filter(
    (note, index, self) => self.findIndex((n) => n.id === note.id) === index
  );

  const filterParams = useAppSelector((state) => state.noteFilterReducer);
  const {
    data: notes,
    refetch,
    isLoading,
  } = noteApi.useGetPatientNoteQuery({ ...filterParams, patientId });

  console.log(notes, 'local');

  const handleAddNew = () => {
    setAddNew(!addNew);
  };

  React.useEffect(() => {
    if (notes)
      setTimeout(() => {
        setNotesLocal([...notesLocal, ...notes.notes]);
      }, 0);
  }, [notes]);

  React.useEffect(() => {
    if (mounted) {
      toast.success('Note has been created!');
    } else {
      setMounted(true);
    }
  }, [created]);

  return (
    <Stack gap="16px">
      <ToastContainer limit={1} />
      <AddNoteButton handleAddNew={handleAddNew} addNew={addNew} />
      <Stack direction="row" alignItems="center" gap="48px">
        <SearchBar setNotesLocal={setNotesLocal} />
        <Sort setNotesLocal={setNotesLocal} />
      </Stack>
      <CreateNote
        addNew={addNew}
        setAddNew={setAddNew}
        setCreated={setCreated}
        created={created}
      />
      {isLoading && emptyArray.map((_, index) => <Skeleton key={index} />)}
      {notes?.count && notes?.countWithoutAnyParams
        ? notDuplicatedArray.map((note) => <Note key={note.id} {...note} />)
        : null}
      <Stack alignItems="center">
        {notes?.count && notes?.countWithoutAnyParams ? (
          <LoadMoreButton notesLocal={notesLocal} />
        ) : null}

        {(!notes?.count || !notes?.countWithoutAnyParams) && (
          <Error
            text={
              !notes?.count && !notes?.countWithoutAnyParams
                ? 'There are no notes! Add some!'
                : 'No notes are matching search params! Try to change them!'
            }
          />
        )}
      </Stack>
    </Stack>
  );
};

export default Notes;
