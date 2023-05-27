import React from 'react';
import Wrapper from '@components/Wrapper';
import ProfileComponent from '@components/Profile';
import PhotoChanger from '@components/Profile/PhotoChanger';
import BackToDashboard from '@components/BackToDashboardLink';
import { Box } from '@mui/material';
const Profile = () => {
  return (
    <>
      <Box marginBottom={'28px'}>
        <BackToDashboard />
      </Box>

      <Wrapper>
        <PhotoChanger /> <ProfileComponent />
      </Wrapper>
    </>
  );
};

export default Profile;
