import React, { useMemo } from 'react';
import { Stack, Box } from '@mui/system';
import { Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { ReactComponent as CameraIcon } from '@assets/Camera.svg';
import { ACTIVE, BORDER, CARLO_BLUE,LIGHT_BLUE } from '@constants/colors';
import { NORMAL_FONT_SIZE, SMALL_FONT_SIZE } from '@constants/fontSizes';
import { IPatient } from '@components/general/type';
import moment from 'moment';
import { lastAppointmentInfo } from '@constants/mockData';
import { Wrapper, BoxWrapper } from './styles';
import { useAppSelector } from '@redux/hooks';
import { hash, local } from '@constants/other';
import { IDoctor } from 'services/types/appointment.type';
import { timeFormat } from '@constants/format';
import { getLastAppointment } from 'utils/functions/getLastAppointment';

interface IAppointmentElement {
  patient: IPatient;
  remoteDoctor: IDoctor;
  localDoctor: IDoctor;
  start: string;
  end: string;
  counter: number;
}

const AppointmentCard = ({
  patient,
  remoteDoctor,
  localDoctor,
  start,
  end,
  counter,
}: IAppointmentElement) => {
  const { t } = useTranslation();

  const [show, setShow] = React.useState<boolean>(false);
  const doctor = useAppSelector((state) => state.doctorReducer);

  const getPatientAge = useMemo(
    () =>
      `${
        new Date().getFullYear() - new Date(patient?.birthDate).getFullYear()
      } ${t('Appointments.years')}`,
    [patient]
  );

  const getPatientFullName = useMemo(
    () => `${patient.firstName.charAt(0)}. ${patient.lastName}`,
    [patient]
  );

  const getPatientGenderAge = useMemo(
    () => `${patient.gender}, ${getPatientAge}`,
    [patient]
  );

  const getDoctorRole = useMemo(
    () =>
      doctor.role === local
        ? t('Appointments.remoteDoctor')
        : t('Appointments.localDoctor'),
    [doctor]
  );

  const getDoctorLastName = useMemo(
    () =>
      `${t('Appointments.doctor')} ${
        doctor.role === local ? remoteDoctor.lastName : localDoctor.lastName
      }`,
    [doctor]
  );

  const showLastAppointment =  () => getLastAppointment(patient,show)

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
            >
              {hash} {counter}
            </Box>
            <Stack direction="row" gap="5px">
              <Typography fontSize={NORMAL_FONT_SIZE} fontWeight="500">
                {moment(start).format(timeFormat)}-{' '}
                {moment(end).format(timeFormat)}
              </Typography>
            </Stack>
            <Stack direction="row" gap="5px">
              <Typography
                fontSize={NORMAL_FONT_SIZE}
                fontWeight="600"
                color={CARLO_BLUE}
                marginRight="8px"
              >
                {getPatientFullName}
              </Typography>
              <Typography fontSize={NORMAL_FONT_SIZE} fontWeight="500">
                {getPatientGenderAge}
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
                {`${getDoctorRole} -`}
              </Typography>
              <Typography
                fontSize={NORMAL_FONT_SIZE}
                fontWeight="600"
                color={CARLO_BLUE}
              >
                {getDoctorLastName}
              </Typography>
            </Stack>
          </Stack>
          <BoxWrapper>
            <Typography
              display="inline"
              fontWeight="700"
              fontSize={NORMAL_FONT_SIZE}
              color={LIGHT_BLUE}
              marginRight="5px"
            >
              {`${t('Appointments.lastAppointment')}`}
            </Typography>
            {showLastAppointment()}
          </BoxWrapper>
          <Box
         
            sx={{
              '&:hover': {
                cursor: 'pointer',
              },
            }}
            marginTop="5px"

            onClick={() => setShow(!show)}
          > 
           <Typography
            color={ACTIVE}
          fontWeight="700"
          fontSize={SMALL_FONT_SIZE}

          >
            {show ? t('Profile.showLess') : t('Profile.showMore')}
            </Typography>
          </Box>
        </Stack>
      </Wrapper>
    </Box>
  );
};
export default AppointmentCard;
