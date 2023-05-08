import React from 'react';
import Wrapper from '@components/Wrapper';
import { Stack, Box } from '@mui/system';
import { Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { authApi } from 'services/AuthService';

import { ReactComponent as CameraIcon } from '@assets/Camera.svg';
import { ACTIVE, ANOTHER_FUCKING_BLUE, BORDER } from '@constants/colors';
import { VERY_SMALL_FONT_SIZE } from '@constants/fontSizes';

const AppointmentElement = () => {
  const [show, setShow] = React.useState<boolean>(false);
  const { data: doctor } = authApi.useGetMeQuery({});

  const { t } = useTranslation();
  const note = 'something that';
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
        <Box>
          <Typography
            display="inline"
            fontStyle="italic"
            fontWeight="100"
            marginRight="5px"
          >
            Last Apponitment:
          </Typography>
          {note.length > 100 && !show ? (
            <Typography display="inline">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Labore,
              illum quod qui est illo laudantium atque, veritatis recusandae ab
              voluptatibus, repudiandae ipsa delectus quas aspernatur
              repellendus sapiente. Reprehenderit, quod necessitatibus.
            </Typography>
          ) : (
            <p>smaller</p>
          )}
        </Box>
        {note.length > 100 && (
          <Box color={ACTIVE} onClick={() => setShow(!show)}>
            {t('Show')} {show ? 'less' : 'more'}
          </Box>
        )}
      </Stack>
    </Wrapper>
  );
};

export default AppointmentElement;
