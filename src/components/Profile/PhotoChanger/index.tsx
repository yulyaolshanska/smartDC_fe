import DoctorPhoto from '@assets/mockDoctorPhoto.png';
import EditIcon from '@assets/edit.svg';
import { Photo, PhotoChangerWrapper, EditIconContainer } from './styles';

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
    </PhotoChangerWrapper>
  );
};

export default PhotoChanger;
