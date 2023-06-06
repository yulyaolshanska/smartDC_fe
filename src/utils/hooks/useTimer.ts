import { useEffect, useState } from 'react';
import {  sec, SEC_PER_MIN } from '@constants/notification';
import { calculateInitialTimer } from 'utils/functions/timeUtils';

export type TimerData = {
  timer: number;
  minutes: number;
  seconds: number;
};

const useTimer = (startTime: string): TimerData => {
  const [timer, setTimer] = useState<number>(0);
  const minutes = Math.floor(timer / SEC_PER_MIN) % SEC_PER_MIN;
  const seconds = Math.floor(timer % SEC_PER_MIN);

  useEffect(() => {
    const initialTimer = calculateInitialTimer(startTime);

    const intervalId = setInterval(() => {
      setTimer((prevTimer) => prevTimer - 1);
    }, sec);

    if (initialTimer > 0) {
      setTimer(initialTimer);
    }

    return () => {
      clearInterval(intervalId);
    };
  }, [startTime]);

  return { timer, minutes, seconds };
};

export default useTimer;
