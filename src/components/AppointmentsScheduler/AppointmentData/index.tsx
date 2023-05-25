import React from 'react';
import { Stack, Box } from '@mui/system';
import { Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { ReactComponent as CameraIcon } from '@assets/Camera.svg';
import {
  ACTIVE,
  BLACK,
  BORDER,
  CARLO_BLUE,
  NAVY_BLUE,
} from '@constants/colors';
import { MEDIUM_FONT_SIZE } from '@constants/fontSizes';
import { IAuth, IPatient } from '@components/general/type';
import moment from 'moment';
import { Wrapper } from 'components/AppointmentsScheduler/AppointmentData/styles';
import DoctorInitialState from '@redux/slices/DoctorSlice/types';
import { hash, local } from '@constants/other';
import { timeFormat } from '@constants/format';
import { NavLink } from 'react-router-dom';

interface IAppointmentElement {
  doctor: DoctorInitialState;
  patient: IPatient;
  remoteDoctor: IAuth;
  localDoctor: IAuth;
  start: Date;
  end: Date;
  counter: number;
}

const AppointmentData = ({
  patient,
  remoteDoctor,
  localDoctor,
  start,
  end,
  counter,
  doctor,
}: IAppointmentElement) => {
  const { t } = useTranslation();

  const [show, setShow] = React.useState<boolean>(false);

  const patientAge = `${
    new Date().getFullYear() - new Date(patient?.birthDate).getFullYear()
  } ${t('Appointments.years')}`;

  const patientFullName = `${patient.firstName.charAt(0)}. ${patient.lastName}`;

  const patientGenderAge = `${patient.gender}, ${patientAge}`;

  const doctorRole =
    doctor.role === local
      ? t('Appointments.remoteDoctor')
      : t('Appointments.localDoctor');

  const doctorLastName = `${t('Appointments.doctor')} ${
    doctor.role === local ? remoteDoctor.lastName : localDoctor.lastName
  }`;

  const showLastAppointment = () => {
    const lastAppointment = patient?.notes[0]?.note;

    if (lastAppointment) {
      return show
        ? lastAppointment
        : `${lastAppointment?.substring(0, 250)}...`;
    }
    return t('Appointments.noAppointmentsYet');
  };

  return (
    <Box marginBottom="8px">
      <Wrapper>
        <Stack>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignContent="center"
            borderBottom={`1px solid ${BORDER}`}
            paddingBottom="12px"
            marginBottom="12px"
          >
            <Box
              fontSize={MEDIUM_FONT_SIZE}
              fontWeight="100"
              fontStyle="italic"
            >
              {hash} {counter}
            </Box>
            <Stack direction="row" gap="5px">
              <Typography fontSize={MEDIUM_FONT_SIZE} fontWeight="500">
                {moment(start).format(timeFormat)} -{' '}
                {moment(end).format(timeFormat)}
              </Typography>
            </Stack>
            <NavLink to={`/patient/${patient.id}`}>
              <Stack direction="row" gap="5px">
                <Typography
                  fontSize={MEDIUM_FONT_SIZE}
                  fontWeight="700"
                  color={CARLO_BLUE}
                >
                  {patientFullName}
                </Typography>
                <Typography
                  fontSize={MEDIUM_FONT_SIZE}
                  fontWeight="500"
                  color={BLACK}
                >
                  {patientGenderAge}
                </Typography>
              </Stack>
            </NavLink>
            <Stack direction="row" alignItems="center">
              <CameraIcon />
              <Typography
                marginLeft="5px"
                marginRight="5px"
                fontSize={MEDIUM_FONT_SIZE}
                fontWeight="700"
              >
                {`${doctorRole} -`}
              </Typography>
              <Typography
                fontSize={MEDIUM_FONT_SIZE}
                fontWeight="700"
                color={CARLO_BLUE}
              >
                {doctorLastName}
              </Typography>
            </Stack>
          </Stack>
          <Box>
            <Typography
              display="inline"
              fontStyle="italic"
              fontWeight="300"
              fontSize={MEDIUM_FONT_SIZE}
              color={NAVY_BLUE}
              marginRight="5px"
            >
              {`${t('Appointments.lastAppointment')}:`}
            </Typography>
            {showLastAppointment()}
          </Box>
          <Box
            style={{ cursor: 'pointer' }}
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

export default AppointmentData;
