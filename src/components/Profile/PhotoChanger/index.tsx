import React from 'react';
import { createPortal } from 'react-dom';
import { useTranslation } from 'react-i18next';
import editIcon from 'assets/edit.svg';
import defaultDoctorPhotoMale from 'assets/mockDoctorPhoto.png';
import defaultDoctorPhotoFemale from 'assets/mockDoctorPhotoFemale.png';
import { authApi } from 'services/AuthService';
import { useMount } from '../AvatarEditor/hooksAvatarEditor';
import { Photo, PhotoChangerWrapper, EditIconContainer, LinkContainer } from './styles';
import AvatarChanger from '../AvatarEditor';
import { getDoctorAvatar } from '../api/getPhoto';
import { ArrowBack } from '@components/general/styles';
import { Link } from 'react-router-dom';
import { PATH } from '@router/index';

const PhotoChanger = () => {
  const [opened, setOpened] = React.useState<boolean>(false);
  const { mounted } = useMount({ opened });
  const { data: doctor } = authApi.useGetMeQuery({});
  const [avatarUrl, setAvatarUrl] = React.useState<string>('');
  const [avatarLoading, setAvatarLoading] = React.useState<boolean>(false);

  const avatar = async () => {
    setAvatarLoading(true);
    const avatarStatic = await getDoctorAvatar(doctor.id);
    setAvatarUrl(avatarStatic);
    setAvatarLoading(false);
  };

  React.useEffect(() => {
    avatar();
  }, []);

  const { t } = useTranslation();
  const finalUrl = import.meta.env.VITE_REACT_APP_BASE_URL_SERVER + avatarUrl;

  return (
    <PhotoChangerWrapper>
      <LinkContainer>
        <Link to={PATH.DASHBOARD}>
          <ArrowBack />
          {t('Dashboard.backToDashboard')}
        </Link>
      </LinkContainer>

      <Photo>
        {!doctor?.photoUrl && (
          <img
            src={
              doctor?.gender === 'Male'
                ? defaultDoctorPhotoMale
                : defaultDoctorPhotoFemale
            }
            alt="Photo"
            width="160px"
          />
        )}
        {doctor?.photoUrl && (
          <img src={finalUrl} alt="Photo" width="160px" />
        )}
        <EditIconContainer onClick={() => setOpened(true)}>
          <img src={editIcon} />
        </EditIconContainer>
      </Photo>

      {mounted
        ? createPortal(
            <AvatarChanger
              opened={opened}
              onClose={setOpened}
              setAvatarUrl={setAvatarUrl}
              avatar={avatar}
            />,
            document.body
          )
        : null}
    </PhotoChangerWrapper>
  );
};

export default PhotoChanger;
