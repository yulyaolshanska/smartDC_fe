import React from 'react';

import { Box, Stack } from '@mui/system';
import { authApi } from 'services/AuthService';
import { Typography } from '@mui/material';

import { ReactComponent as PersonIcon } from '@assets/person-icon.svg';
import { ReactComponent as TimeIcon } from '@assets/Time.svg';
import { appointmentsApi } from 'services/AppointmentService';
import AppointmentElement from './AppointmentElement';
import {
  A_LITTLE_BIT_LARGER_THAN_LARGE_FONT_SIZE,
  LARGE_FONT_SIZE,
  SMALL_FONT_SIZE,
} from '@constants/fontSizes';
import { ACTIVE, APPOINTMENT_TIME } from '@constants/colors';

const DashboardComponent = () => {
  const { data: doctor } = authApi.useGetMeQuery({});
  console.log(doctor);
  const { data: appointments } = appointmentsApi.useGetTodayAppointmentQuery({
    doctorId: doctor?.id,
    all: false,
  });
  console.log(appointments);
  return (
    <Stack justifyContent="center" width="100%" alignItems="center">
      <Stack
        justifyContent="center"
        width="100%"
        alignItems="center"
        marginBottom="20px"
      >
        <Typography
          fontWeight="700"
          fontSize={A_LITTLE_BIT_LARGER_THAN_LARGE_FONT_SIZE}
        >
          Welcome, Dr. {doctor.lastName}
        </Typography>
      </Stack>
      <Box marginBottom="20px">Notification</Box>
      <Stack alignSelf="start">
        <Stack direction="row" gap="20px" marginBottom="10px">
          <Typography fontSize={LARGE_FONT_SIZE} fontWeight="700">
            Latest Appointments
          </Typography>
          <Stack direction="row" alignItems="center" gap="5px">
            <PersonIcon />
            <Typography
              fontSize={SMALL_FONT_SIZE}
              fontWeight="100"
              fontStyle="italic"
              color={ACTIVE}
            >
              20
            </Typography>
          </Stack>
        </Stack>
        <Stack direction="row" gap="5px" marginBottom="10px">
          <TimeIcon />
          <Typography
            fontSize={SMALL_FONT_SIZE}
            fontWeight="100"
            fontStyle="italic"
            color={APPOINTMENT_TIME}
          >
            10:00 - 10:30
          </Typography>
        </Stack>
      </Stack>
      <AppointmentElement />
    </Stack>
  );
};

export default DashboardComponent;
