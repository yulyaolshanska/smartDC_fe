import { Stream, VideoClient } from '@zoom/videosdk';
import { RefObject } from 'react';

interface IonActiveShareChangePayload {
  state: 'Active' | 'Inactive';
  userId: number;
}

const useActiveShareChange = (
  client: typeof VideoClient,
  mediaScreen: typeof Stream,
  participantShareScreenRef: RefObject<HTMLCanvasElement>
): (() => void) => {
  const onActiveShareChange = (payload: IonActiveShareChangePayload) => {
    if (payload.state === 'Active') {
      mediaScreen.startShareView(
        participantShareScreenRef.current!,
        payload.userId
      );
      participantShareScreenRef.current!.style.display = 'block';
    } else if (payload.state === 'Inactive') {
      mediaScreen.stopShareView();
      participantShareScreenRef.current!.style.display = 'none';
    }
  };

  client.on('active-share-change', onActiveShareChange);

  return () => {
    client.off('active-share-change', onActiveShareChange);
  };
};

export default useActiveShareChange;
