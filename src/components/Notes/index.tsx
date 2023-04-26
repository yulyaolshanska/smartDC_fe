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

export interface INotes {
  id: number;
  note: string;
  file: string;
  createdAt: string;
  updatedAt: string;
  doctorId: { firstName: string; lastName: string };
}

const Notes = () => {
  const [addNew, setAddNew] = React.useState<boolean>(false);
  const [notesLocal, setNotesLocal] = React.useState<INotes[] | []>([]);

  const filterParams = useAppSelector((state) => state.noteFilterReducer);
  const {
    data: notes,
    error: getPatientError,
    refetch,
    isLoading,
  } = noteApi.useGetPatientNoteQuery({ ...filterParams });

  const handleAddNew = () => {
    setAddNew(!addNew);
  };

  React.useEffect(() => {
    setTimeout(() => {
      setNotesLocal([...notesLocal, ...notes]);
    }, 0);
  }, [notes]);

  return (
    <Stack gap="16px">
      <AddNoteButton handleAddNew={handleAddNew} addNew={addNew} />
      <Stack direction="row" alignItems="center" gap="48px">
        <SearchBar setNotesLocal={setNotesLocal} />
        <Sort setNotesLocal={setNotesLocal} />
      </Stack>
      <CreateNote addNew={addNew} setAddNew={setAddNew} />
      {isLoading || !notesLocal ? (
        <p>Loading</p>
      ) : (
        notesLocal
          .slice(0, filterParams.skipAmount + filterParams.limit)
          .map((note) => <Note {...note} />)
      )}
      <Stack alignItems="center">
        <LoadMoreButton notesLocal={notesLocal} setNotesLocal={setNotesLocal} />
      </Stack>
    </Stack>
  );
};

export default Notes;
