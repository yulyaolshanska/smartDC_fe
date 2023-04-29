import React from 'react';
import AvatarEditor from 'react-avatar-editor';

import DoctorPhoto from '@assets/mockDoctorPhoto.png';
import EditIcon from '@assets/edit.svg';
import { Photo, PhotoChangerWrapper, EditIconContainer } from './styles';
import AvatarChanger from '../AvatarEditor';

const PhotoChanger = () => {
  return (
    <PhotoChangerWrapper>
      <p>Edit Profile</p>
      <Photo>
        <img src={DoctorPhoto} alt="Photo" width="160px" />
        <EditIconContainer>
          <img src={EditIcon} />
        </EditIconContainer>
      </Photo>
      <AvatarChanger />
    </PhotoChangerWrapper>
  );
};

export default PhotoChanger;
