import { zero } from '@constants/other';

export type NotificationTextData = {
  isTimerRun: boolean;
  getNotificationText: string;
};

const useNotificationText = (
  t: (key: string) => string,
  minutes: number,
  seconds: number,
  timer: number
): NotificationTextData => {
  const isTimerRun = timer > 0;

  const getNotificationText = isTimerRun
    ? `${t('Notification.youHaveVideoCallIn')} ${`${minutes
        .toString()
        .padStart(2, zero)}:${seconds.toString().padStart(2, zero)}`} ${t(
        'Notification.minutesWith'
      )}`
    : `${t('Notification.youCurrentlyHaveMeeting')}`;

  return { isTimerRun, getNotificationText };
};

export default useNotificationText;
