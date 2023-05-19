import React from 'react';

import { Box, Stack } from '@mui/system';
import { authApi } from 'services/AuthService';
import { Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';

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
import LoadMoreButton from './LoadMoreButton';
import Skeleton from './Skeleton';

interface AppointmentElement {
  id: number;
  startTime: string;
  endTime: string;
  patient: {};
  remoteDoctor: { id: number };
  zoomLink: string;
}

const DashboardComponent = () => {
  const [fetchAll, setFetchAll] = React.useState<boolean>(false);
  const { data: doctor } = authApi.useGetMeQuery({});

  const { t } = useTranslation();

  const {
    data: appointmentsArray,
    refetch: refetchAppointments,
    isLoading: isLoadingAppointments,
  } = appointmentsApi.useGetTodayAppointmentQuery({
    doctorId: doctor.id,
    all: fetchAll ? 'all' : '',
  });

  const getItterableAppointments = (): AppointmentElement[] => {
    let copyAppointments;

    if (appointmentsArray) {
      const appointments = appointmentsArray.appointments;

      copyAppointments = [...appointments];
    }
    if (!appointmentsArray) return [];

    return copyAppointments as AppointmentElement[];
  };

  const sortedAppointments = React.useMemo(() => {
    return getItterableAppointments().sort(
      (a: AppointmentElement, b: AppointmentElement) => {
        const startTimeA = new Date(a.startTime);
        const startTimeB = new Date(b.startTime);
        return startTimeA.getTime() - startTimeB.getTime();
      }
    );
  }, [appointmentsArray, getItterableAppointments]);

  const groupedAppointments = React.useMemo(() => {
    return sortedAppointments?.reduce(
      (groups: { [key: string]: AppointmentElement[] }, appointment) => {
        const startTime = new Date(appointment.startTime);
        const startHour = startTime.getHours();
        const startMinutes = startTime.getMinutes();

        const endTime = new Date(appointment.endTime);
        const endHour = endTime.getHours();
        const endMinutes = endTime.getMinutes();

        const roundedStartMinutes = Math.floor(startMinutes / 30) * 30;
        const roundedEndMinutes = Math.floor(endMinutes / 30) * 30;

        const timeRange = `${startHour}:${roundedStartMinutes
          .toString()
          .padStart(2, '0')} - ${endHour}:${roundedEndMinutes
          .toString()
          .padStart(2, '0')}`;

        if (!groups[timeRange]) {
          groups[timeRange] = [];
        }
        groups[timeRange].push(appointment);
        return groups;
      },
      {}
    );
  }, [appointmentsArray, sortedAppointments]);
  if (!appointmentsArray) {
    return (
      <div>
        <Skeleton />
      </div>
    );
  }

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
      <Box marginBottom="20px"> {t('Dashboard.Notification')}</Box>
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
      <LoadMoreButton setFetchAll={setFetchAll} disabled={fetchAll} />
    </Stack>
  );
};

export default DashboardComponent;
