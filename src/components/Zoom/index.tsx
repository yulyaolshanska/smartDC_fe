import React from 'react';
import ZoomVideo, { Stream } from '@zoom/videosdk';
import { Stack } from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import { useAppSelector } from '@redux/hooks';
import FinishCallButton from './FinishCallButton';
import ChatButton from './ChatButton';
import { VideoContainer } from './styles';
import './index.scss';
import StartCallButton from './StartCallButton';
import useActiveSpeaker from './utils/useActiveSpeaker';
import useActiveShareChange from './utils/useActiveShareChange';
import Sheduler from './Sheduler';
import Video from './Video';
import usePeerVideoStateChange from './utils/usePeerVideoStateChange';
import { useTranslation } from 'react-i18next';

const client = ZoomVideo.createClient();

const ZoomComponent = () => {
  const [loading, setLoading] = React.useState<boolean>(false);
  const [loadingText, setLoadingText] = React.useState<string>('');
  const [mediaScreen, setMediaScreen] = React.useState<typeof Stream | null>(
    null
  );
  const [status, setStatus] = React.useState<boolean>(false);

  const { t } = useTranslation();

  const socketNextAppointment = useAppSelector(
    (state) => state.socketAppointmenttReducer.nextAppointment
  );

  const socketCallConfig = useAppSelector(
    (state) => state.socketAppointmenttReducer.callConfig
  );

  const participantCanvasRef = React.useRef<HTMLCanvasElement | null>(null);
  const participantShareScreenRef = React.useRef<HTMLCanvasElement | null>(
    null
  );

  const selfVideoRef = React.useRef<HTMLVideoElement | null>(null);

  const init = async () => {
    client.init('US-EN', 'CDN');
    if (socketNextAppointment) {
      try {
        if (socketCallConfig.signature)
          await client
            .join(
              socketCallConfig.tpc,
              socketCallConfig.signature,
              socketCallConfig.name
            )
            .then(() => {
              setStatus(true);
              toast.success(t('Zoom.joined'));
            });
        const stream = client.getMediaStream();

        setMediaScreen(stream);
      } catch (error) {}
    } else {
      toast.info(t('Zoom.noAppointments'));
    }
  };
  const leaveSession = async () => {
    await client.leave().then(() => {
      setStatus(false);
      toast.info(t('Zoom.left'));
    });
  };
  React.useEffect(() => {
    const renderForNewParticipants = async (): Promise<void> => {
      client.getAllUser().forEach(async (user) => {
        if (user.bVideoOn) {
          await mediaScreen.renderVideo(
            participantCanvasRef.current,
            user.userId,
            960,
            540,
            0,
            0,
            3
          );
        }
      });
      client.getAllUser().forEach(async (user) => {
        if (user.sharerOn) {
          await mediaScreen.startShareView(
            participantShareScreenRef.current,
            user.userId
          );
        }
      });
    };
    renderForNewParticipants();
  }, [socketCallConfig, mediaScreen]);

  React.useEffect(() => {
    const handlePeerVideoStateChange = () => {
      usePeerVideoStateChange(client, mediaScreen, participantCanvasRef);
    };

    const handlePeerShareScreen = () => {
      useActiveShareChange(client, mediaScreen, participantShareScreenRef);
    };

    const handleActiveSpeaker = () => {
      useActiveSpeaker(client, selfVideoRef, participantCanvasRef);
    };

    handleActiveSpeaker();
    handlePeerVideoStateChange();
    handlePeerShareScreen();
  }, [mediaScreen, participantCanvasRef, participantShareScreenRef]);

  return (
    <VideoContainer>
      <Sheduler />
      <ToastContainer />
      <Stack
        direction={'row'}
        alignItems={'center'}
        gap={'8px'}
        width={'100%'}
        marginBottom={status ? '12px' : 0}
      >
        {status ? (
          <FinishCallButton leaveSession={leaveSession} />
        ) : (
          <StartCallButton init={init}></StartCallButton>
        )}

        <ChatButton />
      </Stack>
      {status ? (
        <Video
          client={client}
          mediaScreen={mediaScreen}
          participantCanvasRef={participantCanvasRef}
          participantShareScreenRef={participantShareScreenRef}
          selfVideoRef={selfVideoRef}
          setStatus={setStatus}
        />
      ) : null}
    </VideoContainer>
  );
};

export default ZoomComponent;
