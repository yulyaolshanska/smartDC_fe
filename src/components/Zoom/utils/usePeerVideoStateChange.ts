import { RefObject } from 'react';

const usePeerVideoStateChange = async (
  client: any,
  mediaScreen: any,
  participantCanvasRef: RefObject<HTMLCanvasElement>
) => {
  const onPeerVideoStateChange = async (payload: any) => {
    console.log('payload', payload);

    if (payload.action === 'Start') {
      console.log('mediaStart', mediaScreen);
      await mediaScreen.renderVideo(
        participantCanvasRef.current,
        payload.userId,
        1600,
        900,
        0,
        0,
        3
      );

      console.log('ref', participantCanvasRef);
    } else if (payload.action === 'Stop') {
      console.log('mediaStop', mediaScreen);
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
