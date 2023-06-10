import { Stream, VideoClient } from '@zoom/videosdk';
import { RefObject } from 'react';

interface IonPeerVideoStateChangePayload {
  userId: number;
  action: 'Start' | 'Stop';
}

const usePeerVideoStateChange = async (
  client: typeof VideoClient,
  mediaScreen: typeof Stream,
  participantCanvasRef: RefObject<HTMLCanvasElement>
) => {
  const onPeerVideoStateChange = async (
    payload: IonPeerVideoStateChangePayload
  ) => {
    if (payload.action === 'Start') {
      await mediaScreen.renderVideo(
        participantCanvasRef.current,
        payload.userId,
        1600,
        900,
        0,
        0,
        3
      );
    } else if (payload.action === 'Stop') {
      await mediaScreen.stopRenderVideo(
        participantCanvasRef.current,
        payload.userId
      );
    }
  };

  client.on('peer-video-state-change', onPeerVideoStateChange);

  return () => {
    client.off('peer-video-state-change', onPeerVideoStateChange);
  };
};

export default usePeerVideoStateChange;
