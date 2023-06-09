import React from 'react';
import Wrapper from '@components/Wrapper';
import ProfileComponent from '@components/Profile';
import PhotoChanger from '@components/Profile/PhotoChanger';
import { LinkContainer } from '@components/general/styles';
import BackToDashboard from '@components/BackToDashboardLink';

const Profile = () => {
  return (
    <>
      <LinkContainer>
        <BackToDashboard />
      </LinkContainer>
      <br/>
      <Wrapper>
        <PhotoChanger />
        <ProfileComponent />
      </Wrapper>
    </>
  );
};

export default Profile;
