import React from 'react';
import { LoadButton } from './styles';
import { noteApi } from 'services/NoteService';
import { useAppDispatch, useAppSelector } from '@redux/hooks';
import { noteFilterActions } from '@redux/slices/NoteFilterSlice';
import { INotes } from '@components/Notes';

const LoadMoreButton = ({ notesLocal }: INotes[]) => {
  const dispatch = useAppDispatch();
  const filterParams = useAppSelector((state) => state.noteFilterReducer);
  const { data: notes, refetch: refetchNotes } = noteApi.useGetPatientNoteQuery(
    { ...filterParams }
  );

  const notesLocalLength = notesLocal.length;

  const fetchMore = () => {
    dispatch(noteFilterActions.setSkipAmount(notesLocalLength));
    refetchNotes();

    // setTimeout(() => {
    //   setNotesLocal([...notesLocal, ...notes]);
    // }, 0);
  };

  return <LoadButton onClick={() => fetchMore()}>Load More</LoadButton>;
};

export default LoadMoreButton;
