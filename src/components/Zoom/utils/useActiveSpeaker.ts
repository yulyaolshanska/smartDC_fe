import { RefObject } from 'react';

interface useActiveSpeakerProps {
  client: any;
  selfVideoRef: RefObject<HTMLVideoElement>;
  participantCanvasRef: RefObject<HTMLCanvasElement>;
}

const useActiveSpeaker = (
  client: any,
  selfVideoRef: RefObject<HTMLVideoElement>,
  participantCanvasRef: RefObject<HTMLCanvasElement>,
): (() => void) => {
  let selfVideoTimeout: ReturnType<typeof setTimeout> | undefined;
  let participantCanvasTimeout: ReturnType<typeof setTimeout> | undefined;

  const clearActiveSpeakerTimeout = (
    timeout?: ReturnType<typeof setTimeout>,
  ) => {
    if (timeout) {
      clearTimeout(timeout);
    }
  };

  const setActiveSpeaker = (
    element: HTMLElement,
    timeout?: ReturnType<typeof setTimeout>,
  ) => {
    element.style.border = '2px red solid';
    clearActiveSpeakerTimeout(timeout);
    timeout = setTimeout(() => {
      element.style.border = 'none';
    }, 1000);
  };

  const onActiveSpeakerChange = async (
    payload: [{ userId: number; name: string }],
  ) => {
    const currentUserId = client.getCurrentUserInfo().userId;

    if (currentUserId === payload[0].userId) {
      setActiveSpeaker(selfVideoRef.current!, selfVideoTimeout);
    } else {
      setActiveSpeaker(participantCanvasRef.current!, participantCanvasTimeout);
    }
  };

  client.on('active-speaker', onActiveSpeakerChange);

  return () => {
    client.off('active-speaker', onActiveSpeakerChange);
    clearActiveSpeakerTimeout(selfVideoTimeout);
    clearActiveSpeakerTimeout(participantCanvasTimeout);
  };
};

export default useActiveSpeaker;
