import { zoomApi } from 'services/ZoomService';
import { devConfig } from './config/dev';
import React from 'react';
import { store } from '@redux/store';
import ZoomVideo from '@zoom/videosdk';
import Video from './Video';
import usePeerVideoStateChange from './utils/usePeerVideoStateChange';
import { Stack } from '@mui/material';
import FinishCallButton from './FinishCallButton';
import ChatButton from './ChatButton';
import { VideoContainer } from './styles';
import './index.scss';
import StartCallButton from './StartCallButton';
import { ToastContainer, toast } from 'react-toastify';
import useActiveSpeaker from './utils/useActiveSpeaker';
import useActiveShareChange from './utils/useActiveShareChange';
import Sheduler from './Sheduler';

import { useAppSelector } from '@redux/hooks';
import { createSocketWithHandlers } from './socket-io';

const dispatch = store.dispatch;
let meetingArgs = { ...devConfig };

const getToken = async () => {
  let token = await dispatch(
    zoomApi.endpoints.getSignature.initiate(meetingArgs)
  );
  return token;
};

if (!meetingArgs.signature && meetingArgs.tpc) {
  getToken().then((res) => {
    meetingArgs.signature = res.error.data;
  });
}

const client = ZoomVideo.createClient();

const ZoomComponent = () => {
  const [loading, setLoading] = React.useState(false);
  const [loadingText, setLoadingText] = React.useState('');
  const [mediaScreen, setMediaScreen] = React.useState<any>(null);
  const [status, setStatus] = React.useState(false);

  const socketNextAppointment = useAppSelector(
    (state) => state.socketAppointmenttReducer.nextAppointment
  );

  const participantCanvasRef = React.useRef<HTMLCanvasElement | null>(null);
  const participantShareScreenRef = React.useRef<HTMLCanvasElement | null>(
    null
  );

  const selfVideoRef = React.useRef<HTMLVideoElement | null>(null);

  // React.useEffect(() => {
  //   createSocketWithHandlers();
  // }, []);
  const init = async () => {
    if (socketNextAppointment) {
      client.init('US-EN', 'CDN');

      try {
        setLoadingText('Joining the session');
        await client
          .join(meetingArgs.tpc, meetingArgs.signature, meetingArgs.name)
          .then(() => {
            setStatus(true);
            toast.success('You joined the session');
          });
        const stream = client.getMediaStream();

        setMediaScreen(stream);
      } catch (error) {
        console.log(error);
      }
    } else {
      toast.info('You have no active upcoming appointments');
    }
  };
  const leaveSession = async () => {
    await client.leave().then(() => {
      setStatus(false);
      toast.info('You left the session');
    });
  };
  React.useEffect(() => {
    const renderForNewParticipants = async () => {
      client.getAllUser().forEach(async (user) => {
        console.log('qwerty', participantCanvasRef);
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
  }, [meetingArgs, mediaScreen]);

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

    console.log('-----------Event listeners connection--------------');
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
