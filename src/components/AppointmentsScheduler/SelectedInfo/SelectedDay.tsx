import React from 'react';
import moment from 'moment';
import { useTranslation } from 'react-i18next';
import { IScheduleItem } from '@components/Scheduler';
import {
  ErrorInfo,
  SelectedDayInfo,
  SelectedInfo,
} from '@components/AppointmentsScheduler/SelectedInfo/styles';

interface ISelectedDateProps {
  selectedDate: Date | undefined;
  appointments: IScheduleItem[];
}

function SelectedDay({ selectedDate, appointments }: ISelectedDateProps) {
  const { t } = useTranslation();

  return (
    <>
      <SelectedDayInfo>
        {moment(selectedDate).format('dddd, D MMMM YYYY')}
      </SelectedDayInfo>
      {appointments.length > 0 ? (
        appointments.map((appointment, index) => (
          <SelectedInfo key={index}>
            <p>{appointment.title}</p>
            <p>
              {moment(appointment.start).format('hh:mm A ')}-{' '}
              {moment(appointment.end).format('hh:mm A')}
            </p>
          </SelectedInfo>
        ))
      ) : (
        <ErrorInfo>{t('Error.noEvents')}</ErrorInfo>
      )}
    </>
  );
}

export default SelectedDay;
