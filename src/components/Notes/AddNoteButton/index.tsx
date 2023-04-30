import React from 'react';
import { Stack } from '@mui/material';
import { ReactComponent as PlusImage } from '@assets/plusButton.svg';
import { ReactComponent as CancelImage } from '@assets/cross-cancel.svg';
import { Container, Text, PlusButton } from './styles';
import { useTranslation } from 'react-i18next';

interface AddNoteButtonProps {
  addNew: boolean;
  handleAddNew: () => void;
}

const AddNoteButton = ({ handleAddNew, addNew }: AddNoteButtonProps) => {
  const { t } = useTranslation();
  return (
    <Container onClick={handleAddNew}>
      <Stack direction="row" gap="8px">
        {!addNew ? (
          <>
            <Text>{t('Notes.addAppointmentNote')}</Text>
            <PlusButton>{PlusImage()}</PlusButton>
          </>
        ) : (
          <>
            <Text>{t('Notes.discardAdding')}</Text>
            <PlusButton>{CancelImage()}</PlusButton>
          </>
        )}
      </Stack>
    </Container>
  );
};

export default AddNoteButton;
