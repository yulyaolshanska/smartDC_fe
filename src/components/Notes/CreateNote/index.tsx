import Wrapper from '@components/Wrapper';
import React from 'react';
import { Stack, Button, Typography, Box } from '@mui/material';
import {
  MainText,
  Date,
  Show,
  Doctor,
  AddButton,
  StyledTextArea,
  CreateNoteContainer,
} from './styles';
import { ReactComponent as PaperclipIcon } from '@assets/paperClip.svg';
import { HINT, ZAMBEZI } from '@constants/colors';
import {
  MEGA_SMAILL_FONT_SIZE,
  SUPER_SMALL_FONT_SIZE,
} from '@constants/fontSizes';

const CreateNote = ({ addNew }) => {
  const [show, setShow] = React.useState<boolean>(false);
  if (!addNew) {
    return null;
  }
  return (
    <Wrapper>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Date> Mar 10,2022 09:00</Date>
        <AddButton>Add</AddButton>
      </Stack>
      <CreateNoteContainer>
        <Stack>
          <Typography color={ZAMBEZI} fontSize={SUPER_SMALL_FONT_SIZE}>
            Description
          </Typography>
          <StyledTextArea />
          <Typography color={HINT} fontSize={MEGA_SMAILL_FONT_SIZE}>
            Hint
          </Typography>
          <Stack direction="row" alignItems="center">
            <Box marginTop="14px">
              <PaperclipIcon />
            </Box>

            <Typography marginTop="10px">attach file</Typography>
          </Stack>
        </Stack>
      </CreateNoteContainer>
      <Doctor>Dr. Elen Malcovsky</Doctor>
    </Wrapper>
  );
};

export default CreateNote;
