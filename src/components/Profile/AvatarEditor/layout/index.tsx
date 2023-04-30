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
import { ToastContainer, toast } from 'react-toastify';

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

const Layout = ({ opened, onClose, setAvatarUrl, avatar }: ChangerProps) => {
  const [image, setImage] = React.useState<File | string>('');
  const [scale, setScale] = React.useState<number>(1);
  const editorRef = React.useRef(null);
  const overlayRef = React.useRef<HTMLDivElement>(null);
  const contentRef = React.useRef<HTMLDivElement>(null);
  const [animationIn, setAnimationIn] = React.useState(false);

  React.useEffect(() => {
    setAnimationIn(opened);
  }, [opened]);

  const [updateDoctorPhoto] = doctorApi.useUpdateDoctorPhotoMutation();
  const { data: doctorData } = authApi.useGetMeQuery({});

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImage(e.target.files[0]);
    }
  };

  const handleScaleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
            <ToastContainer />
            <StyledInput type="file" onChange={handleImageUpload} />
            <Stack direction="row">
              <FileUploadIcon />
              <Typography>Upload your photo</Typography>
            </Stack>
          </InputWrapper>
          <Stack direction="row" gap="10px" alignItems="center" width="90%">
            <Typography>Scale</Typography>
            <RangeInput
              type="range"
              min="1"
              max="2"
              step="0.01"
              value={scale}
              onChange={handleScaleChange}
            />
          </Stack>

          <ExportButton
            disabled={image === ''}
            onClick={() => {
              if (editorRef.current) {
                const canvas = editorRef.current.getImageScaledToCanvas();
                canvas.toBlob((blob: Blob) => {
                  updateDoctorPhoto({ id: doctorData.id, blob }).then(() => {
                    setAvatarUrl(avatar());
                    onClose(!opened);
                  });
                  toast.success('Photo was updated, ');
                });
              }
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
