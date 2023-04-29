import React from 'react';
import { LoadButton } from './styles';
import { noteApi } from 'services/NoteService';
import { useAppDispatch, useAppSelector } from '@redux/hooks';
import { noteFilterActions } from '@redux/slices/NoteFilterSlice';
import { INotes } from '@components/Notes';

//not reusable

interface LoadMoreButtonProps {
  notesLocal: INotes[];
}

const LoadMoreButton = ({ notesLocal }: LoadMoreButtonProps) => {
  const dispatch = useAppDispatch();
  const filterParams = useAppSelector((state) => state.noteFilterReducer);
  const { data: notes, refetch: refetchNotes } = noteApi.useGetPatientNoteQuery(
    { ...filterParams }
  );

  const notesLocalLength = notesLocal.length;

  const fetchMore = React.useCallback(() => {
    dispatch(noteFilterActions.setSkipAmount());
  }, [notesLocalLength]);

  return (
    <LoadButton
      onClick={() => fetchMore()}
      disabled={notes?.count === notesLocalLength}
    >
      Load More
    </LoadButton>
  );
};

export default LoadMoreButton;
