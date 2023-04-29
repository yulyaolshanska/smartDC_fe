import React from 'react';
import { Stack } from '@mui/material';
import { ReactComponent as PlusImage } from '@assets/plusButton.svg';
import { ReactComponent as CancelImage } from '@assets/cross-cancel.svg';
import { Container, Text, PlusButton } from './styles';

interface AddNoteButtonProps {
  addNew: boolean;
  handleAddNew: () => void;
}

const AddNoteButton = ({ handleAddNew, addNew }: AddNoteButtonProps) => {
  return (
    <Container onClick={handleAddNew}>
      <Stack direction="row" gap="8px">
        {!addNew ? (
          <>
            <Text>Add appointment note</Text>
            <PlusButton>{PlusImage()}</PlusButton>
          </>
        ) : (
          <>
            <Text>Discard adding</Text>
            <PlusButton>{CancelImage()}</PlusButton>
          </>
        )}
      </Stack>
    </Container>
  );
};

export default AddNoteButton;
