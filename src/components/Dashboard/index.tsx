import React from 'react';

import { Box, Stack } from '@mui/system';
import { authApi } from 'services/AuthService';
import { Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import axios from 'axios';

import { ReactComponent as PersonIcon } from '@assets/person-icon.svg';
import { ReactComponent as TimeIcon } from '@assets/Time.svg';
import AppointmentElement from './AppointmentElement';
import {
  A_LITTLE_BIT_LARGER_THAN_LARGE_FONT_SIZE,
  LARGE_FONT_SIZE,
  SMALL_FONT_SIZE,
} from '@constants/fontSizes';
import { ACTIVE, APPOINTMENT_TIME } from '@constants/colors';
import LoadMoreButton from './LoadMoreButton';
import Skeleton from './Skeleton';
import useDashboardComponent from './dashboardHooks';
import MeetNotification from '@components/MeetNotification';

interface AppointmentElement {
  id: number;
  startTime: string;
  endTime: string;
  patient: {};
  remoteDoctor: { id: number };
  zoomLink: string;
}

const DashboardComponent = () => {
  const {
    doctor,
    appointmentsArray,
    isLoadingAppointments,
    groupedAppointments,
    fetchAll,
    setFetchAll,
    refetchAppointments,
    t,
  } = useDashboardComponent();

  if (!appointmentsArray) {
    return (
      <div>
        <Skeleton />
      </div>
    );
  }

  const request = axios
    .get(`http://localhost:5000/auth/google/redirect`)
    .then((res) => console.log(res));

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
          {t('Dashboard.WelcomeDr')} {doctor.lastName}
        </Typography>
      </Stack>
      <MeetNotification />
      <Stack alignSelf="start">
        <Stack direction="row" gap="20px" marginBottom="10px">
          <Typography fontSize={LARGE_FONT_SIZE} fontWeight="700">
            {t('Dashboard.LatestAppointments')}
          </Typography>
          <Stack direction="row" alignItems="center" gap="5px">
            <PersonIcon />
            <Typography
              fontSize={SMALL_FONT_SIZE}
              fontWeight="100"
              fontStyle="italic"
              color={ACTIVE}
            >
              {appointmentsArray.count}
            </Typography>
          </Stack>
        </Stack>
      </Stack>

      <Stack justifyContent="center" width="100%" alignItems="center">
        {!appointmentsArray.appointments.length && (
          <Typography fontSize={LARGE_FONT_SIZE} marginTop={'25%'}>
            You have no appointments today
          </Typography>
        )}
        {groupedAppointments &&
          Object.entries(groupedAppointments)?.map(
            ([timeRange, appointments]) => (
              <Stack
                width="100%"
                key={timeRange}
                direction="column"
                marginBottom="10px"
              >
                <Stack direction="row" gap="5px" marginBottom="10px">
                  <TimeIcon />
                  <Typography
                    fontSize={SMALL_FONT_SIZE}
                    fontWeight="100"
                    fontStyle="italic"
                    color={APPOINTMENT_TIME}
                  >
                    {timeRange}
                  </Typography>
                </Stack>
                {appointments?.map((appointment, index) => {
                  return (
                    <AppointmentElement
                      key={appointment.id}
                      {...appointment}
                      index={index}
                    />
                  );
                })}
              </Stack>
            )
          )}
      </Stack>
      {appointmentsArray.count ? (
        <LoadMoreButton
          setFetchAll={setFetchAll}
          disabled={
            fetchAll || groupedAppointments.length === appointmentsArray.count
          }
        />
      ) : null}
    </Stack>
  );
};

export default DashboardComponent;
