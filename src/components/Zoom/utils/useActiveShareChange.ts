import { RefObject } from 'react';

const useActiveShareChange = (
  client: any,
  mediaScreen: any,
  participantShareScreenRef: RefObject<HTMLCanvasElement>
): (() => void) => {
  const onActiveShareChange = (payload: any) => {
    console.log('payload', payload);

    if (payload.state === 'Active') {
      mediaScreen.startShareView(
        participantShareScreenRef.current!,
        payload.userId
      );
      participantShareScreenRef.current!.style.display = 'block';
    } else {
      if (payload.action === 'Inactive') {
        mediaScreen.stopShareView();
        participantShareScreenRef.current!.style.display = 'none';
      }
    }
  };

  client.on('active-share-change', onActiveShareChange);

  return () => {
    client.off('active-share-change', onActiveShareChange);
  };
};

export default useActiveShareChange;
