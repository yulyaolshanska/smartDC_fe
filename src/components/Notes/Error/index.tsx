import { ACTIVE } from '@constants/colors';
import { LARGE_FONT_SIZE } from '@constants/fontSizes';
import { Typography } from '@mui/material';
import React from 'react';

const Error = ({ text }: { text: string }) => {
  return (
    <Typography fontSize={LARGE_FONT_SIZE} color={ACTIVE}>
      {text}
    </Typography>
  ); //TODO error handling
};

export default Error;
