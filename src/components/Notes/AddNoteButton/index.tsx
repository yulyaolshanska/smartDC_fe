import React from 'react';

import { Stack } from '@mui/material';

import { Container, Text, PlusButton } from './styles';
import { ReactComponent as PlusImage } from '@assets/plusButton.svg';

const AddNoteButton = ({ handleAddNew }) => {
  return (
    <Container onClick={handleAddNew}>
      <Stack direction="row" gap="8px">
        <Text>Add appointment note</Text>
        <PlusButton>{PlusImage()}</PlusButton>
      </Stack>
    </Container>
  );
};

export default AddNoteButton;
