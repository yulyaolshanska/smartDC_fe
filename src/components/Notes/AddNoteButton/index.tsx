import React from 'react';

import { Stack } from '@mui/material';

import { Container, Text, PlusButton } from './styles';
import { ReactComponent as PlusImage } from '@assets/plusButton.svg';
import { ReactComponent as CancelImage } from '@assets/cross-cancel.svg';

interface AddNoteButtonProps {
  addNew: boolean;
  handleAddNew: (arg: boolean) => void;
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
