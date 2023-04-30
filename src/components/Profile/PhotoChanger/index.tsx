import React from 'react';
import AvatarEditor from 'react-avatar-editor';
import { createPortal } from 'react-dom';
import axios from 'axios';
import editIcon from 'assets/edit.svg';
import defaultDoctorPhoto from '@assets/mockDoctorPhoto.png';
import { doctorApi } from 'services/DoctorService';
import { authApi } from 'services/AuthService';
import { useMount } from '../AvatarEditor/hooksAvatarEditor';
import { Photo, PhotoChangerWrapper, EditIconContainer } from './styles';
import AvatarChanger from '../AvatarEditor';
import { persistor } from '@redux/store';
import cookie from 'utils/functions/cookies';
import { access } from 'fs';

const PhotoChanger = () => {
  const [opened, setOpened] = React.useState<boolean>(false);
  const { mounted } = useMount({ opened });
  const { data: doctor } = authApi.useGetMeQuery({});
  const [avatarUlr, setAvatarUrl] = React.useState<string>('');
  console.log(doctor);

  const reader = new FileReader();
  // if (avatarPhoto) {
  //   refetchDoctorPhoto().then((res) => console.log(res.blob()));
  // }

  const avatar = async () => {
    await axios.get('http://localhost:5000/doctor/1/avatar', {}).then((res) => {
      setAvatarUrl(res.data);
    });
  };

  React.useEffect(() => {
    avatar();
  }, []);

  return (
    <PhotoChangerWrapper>
      <p>Edit Profile</p>
      <Photo>
        {doctor.photoUrl ? (
          <img src={avatarUlr} alt="Photo" width="160px" />
        ) : (
          <img src={defaultDoctorPhoto} alt="Photo" width="160px" />
        )}
        <EditIconContainer onClick={() => setOpened(true)}>
          <img src={editIcon} />
        </EditIconContainer>
      </Photo>
      {mounted
        ? createPortal(
            <AvatarChanger opened={opened} onClose={setOpened} />,
            document.body
          )
        : null}
    </PhotoChangerWrapper>
  );
};

export default PhotoChanger;
