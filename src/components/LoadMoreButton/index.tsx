import React from 'react';
import { LoadButton } from './styles';
import { noteApi } from 'services/NoteService';
import { useAppDispatch, useAppSelector } from '@redux/hooks';
import { noteFilterActions } from '@redux/slices/NoteFilterSlice';
import { INotes } from '@components/Notes';
import { useParams } from 'react-router';

//not reusable

interface LoadMoreButtonProps {
  notesLocal: INotes[];
}

const LoadMoreButton = ({ notesLocal }: LoadMoreButtonProps) => {
  const dispatch = useAppDispatch();
  const filterParams = useAppSelector((state) => state.noteFilterReducer);

  const { id: patientId } = useParams();

  const { data: notes, refetch: refetchNotes } = noteApi.useGetPatientNoteQuery(
    { ...filterParams, patientId }
  );

  const notesLocalLength = notesLocal.length;

  const fetchMore = React.useCallback(() => {
    dispatch(noteFilterActions.setSkipAmount());
  }, [notesLocalLength]);

  console.log(notes);
  return (
    <LoadButton
      onClick={fetchMore}
      disabled={notes?.count === notesLocalLength || notes?.count === 0}
    >
      Load More
    </LoadButton>
  );
};

export default LoadMoreButton;
