import React from 'react';
import Wrapper from '@components/Wrapper';
import Drawer from '@components/Drawer';
import { MainContent, PageContainer } from './styles';
import ProfileComponent from '@components/Profile';
import PageWrapper from '@components/PageWrapper';
import PhotoChanger from '@components/Profile/PhotoChanger';
const Profile = () => {
  return (
    <Wrapper>
      <PhotoChanger /> <ProfileComponent />;
    </Wrapper>
  );
};

export default Profile;
