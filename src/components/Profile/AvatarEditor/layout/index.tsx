import React from 'react';
import AvatarEditor from 'react-avatar-editor';
import { CSSTransition } from 'react-transition-group';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import { Typography, Stack } from '@mui/material';
import { doctorApi } from 'services/DoctorService';
import { authApi } from 'services/AuthService';
import { ANIMATION_TIME } from '@constants/animation';
import animationStyles from '../styles/animationStyles.module.scss';
import styles from '../styles/burgerMenu.module.scss';
import { ChangerProps } from '..';
import {
  Container,
  Content,
  ExportButton,
  InputWrapper,
  Overlay,
  RangeInput,
  StyledInput,
} from '../styles/styles';
import { persistor } from '@redux/store';

const overlayAnimation = {
  enter: animationStyles.overlayEnter,
  enterActive: animationStyles.overlayEnterActive,
  exit: animationStyles.overlayExit,
  exitActive: animationStyles.overlayExitActive,
};
const contentAnimation = {
  enter: animationStyles.contentEnter,
  enterActive: animationStyles.contentEnterActive,
  exit: animationStyles.contentExit,
  exitActive: animationStyles.contentExitActive,
};

const Layout: React.FC<ChangerProps> = ({ opened, onClose }) => {
  const [image, setImage] = React.useState(null);
  const [scale, setScale] = React.useState(1);
  const editorRef = React.useRef(null);
  const overlayRef = React.useRef<HTMLDivElement>(null);
  const contentRef = React.useRef<HTMLDivElement>(null);
  const [animationIn, setAnimationIn] = React.useState(false);

  React.useEffect(() => {
    setAnimationIn(opened);
  }, [opened]);

  const [updateDoctorPhoto] = doctorApi.useUpdateDoctorPhotoMutation();
  const { data: doctorData } = authApi.useGetMeQuery({});
  const { data: avatarPhoto, refetch: refetchDoctorPhoto } =
    doctorApi.useGetDoctorAvatarQuery(doctorData.id);
  const handleImageUpload = (e) => {
    setImage(e.target.files[0]);
  };

  const handleScaleChange = (e) => {
    const scale = parseFloat(e.target.value);
    setScale(scale);
  };

  return (
    <Container>
      <CSSTransition
        in={animationIn}
        nodeRef={overlayRef}
        timeout={ANIMATION_TIME}
        mountOnEnter
        unmountOnExit
        classNames={overlayAnimation}
      >
        <Overlay
          ref={overlayRef}
          onClick={() => {
            onClose(false);
            refetchDoctorPhoto();
          }}
        ></Overlay>
      </CSSTransition>
      <CSSTransition
        in={animationIn}
        nodeRef={contentRef}
        timeout={ANIMATION_TIME}
        mountOnEnter
        unmountOnExit
        classNames={contentAnimation}
      >
        <Content ref={contentRef}>
          <AvatarEditor
            ref={editorRef}
            image={image}
            border={100}
            borderRadius={1000}
            color={[255, 255, 255, 0.6]}
            scale={scale}
            rotate={0}
          />
          <InputWrapper>
            <StyledInput type="file" onChange={handleImageUpload} />
            <Stack direction="row">
              <FileUploadIcon />
              <Typography>Upload your photo</Typography>
            </Stack>
          </InputWrapper>

          <RangeInput
            type="range"
            min="1"
            max="2"
            step="0.01"
            value={scale}
            onChange={handleScaleChange}
          />

          <ExportButton
            onClick={() => {
              const canvas = editorRef.current.getImageScaledToCanvas();

              canvas.toBlob((blob) => {
                console.log(blob);
                updateDoctorPhoto({ id: doctorData.id, blob }).then(() =>
                  refetchDoctorPhoto()
                );
              });
            }}
          >
            Export
          </ExportButton>
        </Content>
      </CSSTransition>
    </Container>
  );
};

export default Layout;
