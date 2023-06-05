import { notificationCurrentTime } from '@constants/format';
import { timeOptions, PM } from '@constants/other';
import moment from 'moment';

export const getThreeMonthPeriod = (today: Date) => {
  const result = [];

  for (let i = 0; i < 3; i++) {
    const year = today.getFullYear();
    const month = today.getMonth() + i;
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month, day);
      date.setHours(0, 0, 0, 0);
      result.push(date);
    }
  }

  return result;
};

export const formatTimeRange = (startTime: Date, endTime: Date) => {
  const start = new Date(startTime).toLocaleTimeString([], timeOptions);
  const end = new Date(endTime).toLocaleTimeString([], timeOptions);
  return `${start}-${end}`;
};

// reverse time range for sending to backend
function getHoursFromTime(time: string) {
  const [hour] = time.split(':');
  const isPM = time.includes(PM);
  let formattedHour = parseInt(hour.trim());

  if (formattedHour === 12) {
    formattedHour = isPM ? formattedHour : 0;
  } else {
    formattedHour = isPM ? formattedHour + 12 : formattedHour;
  }

  const localTimezoneOffset = new Date().getTimezoneOffset() / 60;
  formattedHour -= localTimezoneOffset;
  return formattedHour;
}

function getMinutesFromTime(time: string) {
  const [, minutes] = time.split(':');
  return parseInt(minutes.trim());
}

export const reverseFormatTimeRange = (
  timeRange: string,
  selectedDate: Date
) => {
  console.log(`selectedDate`, selectedDate);
  const [start, end] = timeRange.split('-').map((time: string) => time.trim());

  const startDate = new Date(selectedDate);
  const endDate = new Date(selectedDate);

  startDate.setHours(getHoursFromTime(start));
  startDate.setMinutes(getMinutesFromTime(start));

  endDate.setHours(getHoursFromTime(end));
  endDate.setMinutes(getMinutesFromTime(end));

  return {
    start: startDate.toISOString(),
    end: endDate.toISOString(),
  };
};

export const getCurrentFormattedTime = () => {
  return moment().format(notificationCurrentTime);
};
