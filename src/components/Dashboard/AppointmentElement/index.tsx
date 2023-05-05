import React from 'react';
import Wrapper from '@components/Wrapper';
import { Stack, Box } from '@mui/system';
import { Typography } from '@mui/material';
import { authApi } from 'services/AuthService';

import { ReactComponent as CameraIcon } from '@assets/Camera.svg';
import { ANOTHER_FUCKING_BLUE, BORDER } from '@constants/colors';
import { VERY_SMALL_FONT_SIZE } from '@constants/fontSizes';

const AppointmentElement = () => {
  const { data: doctor } = authApi.useGetMeQuery({});
  return (
    <Wrapper>
      <Stack>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignContent="center"
          borderBottom={`1px solid ${BORDER}`}
          paddingBottom="12px"
        >
          <Box
            fontSize={VERY_SMALL_FONT_SIZE}
            fontWeight="100"
            fontStyle="italic"
          >
            # 1
          </Box>
          <Stack direction="row" gap="5px">
            <Typography
              fontSize={VERY_SMALL_FONT_SIZE}
              fontWeight="700"
              color={ANOTHER_FUCKING_BLUE}
            >
              Patient Name
            </Typography>
            <Typography fontSize={VERY_SMALL_FONT_SIZE} fontWeight="500">
              Patient Info
            </Typography>
          </Stack>
          <Stack direction="row" alignItems="center">
            <CameraIcon />
            <Typography
              marginLeft="5px"
              marginRight="5px"
              fontSize={VERY_SMALL_FONT_SIZE}
              fontWeight="700"
            >
              Remote -
            </Typography>
            <Typography
              fontSize={VERY_SMALL_FONT_SIZE}
              fontWeight="700"
              color={ANOTHER_FUCKING_BLUE}
            >
              Dr. Wizards
            </Typography>
          </Stack>
        </Stack>
      </Stack>
    </Wrapper>
  );
};

export default AppointmentElement;
