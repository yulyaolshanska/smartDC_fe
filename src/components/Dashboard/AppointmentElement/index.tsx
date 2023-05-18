import React from 'react';
import Wrapper from '@components/Wrapper';
import { Stack, Box } from '@mui/system';
import { Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { authApi } from 'services/AuthService';

import { ReactComponent as CameraIcon } from '@assets/Camera.svg';
import { ACTIVE, ANOTHER_FUCKING_BLUE, BORDER } from '@constants/colors';
import { VERY_SMALL_FONT_SIZE } from '@constants/fontSizes';

interface AppointmentElementProps {
  index: number;
  remoteDoctor: Record<string, any>;
  patient: Record<string, any>;
}

const AppointmentElement = ({
  index,
  remoteDoctor,
  patient,
}: AppointmentElementProps) => {
  const [show, setShow] = React.useState<boolean>(false);

  const { t } = useTranslation();

  const fullText = patient.notes[0].note;
  const cuttedText = patient.notes[0].note.slice(0, 100).trim();

  const getPatientAge = () => {
    const birthdate = new Date(patient.birthDate);
    const today = new Date();
    const diffTime = Number(today) - Number(birthdate);
    return Math.floor(diffTime / (1000 * 60 * 60 * 24 * 365));
  };

  const getPatientInfo = React.useMemo(() => {
    {
      return `${patient.gender}, ${patient.lastName} ${getPatientAge()} y.o`;
    }
  }, [patient]);

  const patientName = `${patient.firstName.charAt(0)}. ${patient.lastName}`;

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
          >
            <Box
              fontSize={VERY_SMALL_FONT_SIZE}
              fontWeight="100"
              fontStyle="italic"
            >
              # {index + 1}
            </Box>
            <Stack direction="row" gap="5px">
              <Typography
                fontSize={VERY_SMALL_FONT_SIZE}
                fontWeight="700"
                color={ANOTHER_FUCKING_BLUE}
              >
                {patientName}
              </Typography>
              <Typography fontSize={VERY_SMALL_FONT_SIZE} fontWeight="500">
                {getPatientInfo}
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
                {t('Dashboard.Remote')} -
              </Typography>
              <Typography
                fontSize={VERY_SMALL_FONT_SIZE}
                fontWeight="700"
                color={ANOTHER_FUCKING_BLUE}
              >
                {t('Dashboard.Dr.')} {remoteDoctor.lastName}
              </Typography>
            </Stack>
          </Stack>
          <Box>
            <Typography
              display="inline"
              fontStyle="italic"
              fontWeight="100"
              marginRight="5px"
            >
              {t('Dashboard.LastAppointment')}
            </Typography>
            {fullText.length > 100 && !show ? (
              <Typography display="inline">{fullText}</Typography>
            ) : (
              <p>{cuttedText}</p>
            )}
          </Box>
          {fullText.length > 100 && (
            <Box color={ACTIVE} onClick={() => setShow(!show)}>
              {t('Show')} {show ? 'less' : 'more'}
            </Box>
          )}
        </Stack>
      </Wrapper>
    </Box>
  );
};
export default AppointmentElement;
