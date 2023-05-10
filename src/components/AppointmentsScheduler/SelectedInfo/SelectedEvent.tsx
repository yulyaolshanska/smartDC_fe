import React from 'react';
import moment from 'moment';
import { IScheduleItem } from '@components/Scheduler';
import {
  SelectedDayInfo,
  SelectedInfo,
} from '@components/AppointmentsScheduler/SelectedInfo/styles';

interface ISelectedEventProps {
  selectedEvent: IScheduleItem;
}

function SelectedEvent({ selectedEvent }: ISelectedEventProps) {
  return (
    <>
      <SelectedDayInfo>
        {moment(selectedEvent.start).format('dddd, D MMMM YYYY')}
      </SelectedDayInfo>
      <SelectedInfo>
        <p>{selectedEvent.title}</p>
        <p>
          {moment(selectedEvent.start).format('hh:mm A ')}-{' '}
          {moment(selectedEvent.end).format('hh:mm A')}
        </p>
      </SelectedInfo>
    </>
  );
}

export default SelectedEvent;
