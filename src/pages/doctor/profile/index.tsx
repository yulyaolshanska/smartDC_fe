import React from 'react';
import Wrapper from '@components/Wrapper';
import ProfileComponent from '@components/Profile';
import PhotoChanger from '@components/Profile/PhotoChanger';

const Profile = () => {
  return (
    <Wrapper>
      <PhotoChanger /> <ProfileComponent />
    </Wrapper>
  );
};

export default Profile;
