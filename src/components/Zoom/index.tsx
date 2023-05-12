import ZoomComponent from '@components/Zoom';
import { zoomApi } from 'services/ZoomService';
import React, { useEffect } from 'react';
import axios from 'axios';
import ZoomVideo from '@zoom/videosdk';
import { Stack } from '@mui/system';
import { SendButton } from '@components/general/styles';
import { Grid, Typography } from '@mui/material';
import './index.css';

const ZoomComponent = () => {
  const [getSignature, { data: zoomToken }] = zoomApi.useGetSignatureMutation();

  const videoRef = React.useRef<HTMLVideoElement>(null);
  const [stream, setStream] = React.useState<any>(null);
  const [mounted, setMounted] = React.useState<any>(null);

  const client = ZoomVideo.createClient();

  const topic = 'something';
  const token = '';
  const userName = 'doqwewqe';

  const handleSignature = async () => {
    return await getSignature({
      tpc: 'something',
      role_type: 1,
      user_identity: 'doctor_id',
      session_key: '123',
    }).then((res) => {
      return res.error.data;
    });
  };

  const initAndJoinSession = async () => {
    await client.init('en-US', 'CDN');
    const token = await handleSignature();
    try {
      await client.join(topic, token, userName);
      setStream(client.getMediaStream());
      console.log('allUsers', client.getAllUser());

      console.log('client', client);

      client.getAllUser().forEach((user) => {
        console.log('user', user);
        if (user.bVideoOn) {
          console.log('user.bVideoOn', user?.bVideoOn);
          if (stream)
            stream?.renderVideo(
              document.querySelector('#participant-videos-canvas'),
              user.userId
            );
        }
      });
    } catch (e) {
      console.error(e);
    }
  };

  const startSelfVideo = () => {
    console.log(stream);
    if (stream && stream.isRenderSelfViewWithVideoElement()) {
      stream
        .startVideo({
          videoElement: videoRef.current,
        })
        .then(() => {
          videoRef.current.style.display = 'block';
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const stopSelfVideo = () => {
    console.log(stream);
    if (stream && stream.isRenderSelfViewWithVideoElement()) {
      stream
        .stopVideo({
          videoElement: videoRef.current,
        })

        .catch((error) => {
          console.log(error);
        });
    }
  };

  React.useEffect(() => {
    const onPeerVideoStateChange = (payload: any) => {
      console.log('payload', payload);

      if (payload.action === 'Start' && stream) {
        stream?.renderVideo(
          document.querySelector('#participant-videos-canvas'),
          payload.userId
        );

        // participants.map((p, index) => {
        //   stream.renderVideo(
        //     document.querySelector('#participant-videos-canvas'),
        //     p[index].userId,
        //     960,
        //     540,
        //     0,
        //     540,
        //     2
        //   );
        // });
        // stream.renderVideo(
        //   document.querySelector('#participant-videos-canvas'),
        //   payload.userId,
        //   960,
        //   540,
        //   100,
        //   100,
        //   2
        // );
      } else if (payload.action === 'Stop') {
        stream?.stopRenderVideo(
          document.querySelector('#participant-videos-canvas'),
          payload.userId
        );
      }
    };
    initAndJoinSession();

    client.on('peer-video-state-change', onPeerVideoStateChange);

    return () => {
      client.off('peer-video-state-change', onPeerVideoStateChange);
    };
  }, []);

  return (
    <div>
      <Stack direction="column">
        <video
          id="my-self-view-video"
          ref={videoRef}
          width={500}
          height={500}
        ></video>
        <Typography>Participant video</Typography>

        <canvas
          id="participant-videos-canvas"
          width="960px"
          height="540px"
        ></canvas>
      </Stack>

      <Stack gap="10px">
        <button onClick={startSelfVideo}>Start</button>
        <button onClick={stopSelfVideo}>Stop</button>
      </Stack>
    </div>
  );
};

export default ZoomComponent;
