import React from 'react';
import { Stack, Box } from '@mui/system';
import { Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { ReactComponent as CameraIcon } from '@assets/Camera.svg';
import { ACTIVE, BORDER, CARLO_BLUE, NAVY_BLUE } from '@constants/colors';
import { NORMAL_FONT_SIZE } from '@constants/fontSizes';
import { IPatient } from '@components/general/type';
import moment from 'moment';
import { lastAppointmentInfo } from '@constants/mockData';
import DoctorInitialState from '@redux/slices/DoctorSlice/types';
import { Wrapper } from './styles';

interface IAppointmentElement {
  patient: IPatient;
  remoteDoctor: DoctorInitialState;
  start: Date;
  end: Date;
  counter: number;
}

const AppointmentCard = ({
  patient,
  remoteDoctor,
  start,
  end,
  counter,
}: IAppointmentElement) => {
  const { t } = useTranslation();

  const [show, setShow] = React.useState<boolean>(false);

  const text = lastAppointmentInfo;

  const patientAge = `${
    new Date().getFullYear() - new Date(patient?.birthDate).getFullYear()
  } ${t('Appointments.years')}`;

  const patientFullName = `${patient.firstName.charAt(0)}. ${patient.lastName}`;

  const patientGenderAge = `${patient.gender}, ${patientAge}`;

  const remoteDoctorLastName = `${t('Appointments.doctor')} ${
    remoteDoctor.lastName
  }`;

  return (
    <Box marginBottom="8px">
      <Wrapper>
        <Stack>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignContent="center"
            borderBottom={`"1px solid" ${BORDER}`}
            paddingBottom="12px"
            marginBottom="12px"
          >
            <Box
              fontSize={NORMAL_FONT_SIZE}
              fontWeight="100"
              fontStyle="italic"
            >
              # {counter}
            </Box>
            <Stack direction="row" gap="5px">
              <Typography fontSize={NORMAL_FONT_SIZE} fontWeight="500">
                {moment(start).format('hh:mm A ')}-{' '}
                {moment(end).format('hh:mm A')}
              </Typography>
            </Stack>
            <Stack direction="row" gap="5px">
              <Typography
                fontSize={NORMAL_FONT_SIZE}
                fontWeight="700"
                color={CARLO_BLUE}
                marginRight="8px"
              >
                {patientFullName}
              </Typography>
              <Typography fontSize={NORMAL_FONT_SIZE} fontWeight="500">
                {patientGenderAge}
              </Typography>
            </Stack>
            <Stack direction="row" alignItems="center">
              <CameraIcon />
              <Typography
                marginLeft="5px"
                marginRight="5px"
                fontSize={NORMAL_FONT_SIZE}
                fontWeight="700"
              >
                {`${t('Appointments.remoteDoctor')} -`}
              </Typography>
              <Typography
                fontSize={NORMAL_FONT_SIZE}
                fontWeight="700"
                color={CARLO_BLUE}
              >
                {remoteDoctorLastName}
              </Typography>
            </Stack>
          </Stack>
          <Box>
            <Typography
              display="inline"
              fontStyle="italic"
              fontWeight="300"
              fontSize={NORMAL_FONT_SIZE}
              color={NAVY_BLUE}
              marginRight="5px"
            >
              {`${t('Appointments.lastAppointment')}`}
            </Typography>
            {show ? text : `${text.substring(0, 250)}...`}
          </Box>
          <Box
            sx={{
              '&:hover': {
                cursor: 'pointer',
              },
            }}
            color={ACTIVE}
            fontWeight="bold"
            marginTop="5px"
            onClick={() => setShow(!show)}
          >
            {show ? t('Profile.showLess') : t('Profile.showMore')}
          </Box>
        </Stack>
      </Wrapper>
    </Box>
  );
};
export default AppointmentCard;
