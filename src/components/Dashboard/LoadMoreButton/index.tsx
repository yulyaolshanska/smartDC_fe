import React from 'react';
import { LoadButton } from './styles';
import { noteApi } from 'services/NoteService';
import { useAppDispatch, useAppSelector } from '@redux/hooks';
import { noteFilterActions } from '@redux/slices/NoteFilterSlice';
import { INotes } from '@components/Notes';
import { appointmentsApi } from 'services/AppointmentService';

//not reusable

interface LoadMoreButtonProps {
  setFetchAll: (arg: boolean) => void;
  disabled: boolean;
}

const LoadMoreButton = ({ setFetchAll, disabled }: LoadMoreButtonProps) => {
  return (
    <LoadButton onClick={() => setFetchAll(true)} disabled={disabled}>
      Load More
    </LoadButton>
  );
};

export default LoadMoreButton;
