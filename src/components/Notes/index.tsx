import React from 'react';
import { Stack } from '@mui/material';
import AddNoteButton from './AddNoteButton';
import SearchBar from './SearchBar';
import Sort from './Sort';
import Note from './Note';
import CreateNote from './CreateNote';
import LoadMoreButton from '@components/LoadMoreButton';

const Notes = () => {
  const [addNew, setAddNew] = React.useState(false);
  console.log(addNew);

  const handleAddNew = () => {
    setAddNew(!addNew);
  };

  return (
    <Stack gap="16px">
      <AddNoteButton handleAddNew={handleAddNew} />
      <Stack direction="row" alignItems="center" gap="48px">
        <SearchBar />
        <Sort />
      </Stack>
      <CreateNote addNew={addNew} />
      <Note />
      <Stack alignItems="center">
        <LoadMoreButton />
      </Stack>
    </Stack>
  );
};

export default Notes;
