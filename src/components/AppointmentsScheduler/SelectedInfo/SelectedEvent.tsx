import React from 'react';
import moment from 'moment';
import { IScheduleItem } from '@components/AppointmentsScheduler';
import {
  SelectedDayInfo,
  SelectedInfo,
} from '@components/AppointmentsScheduler/SelectedInfo/styles';
import AppointmentData from '@components/AppointmentsScheduler/AppointmentData';
import DoctorInitialState from '@redux/slices/DoctorSlice/types';

interface ISelectedEventProps {
  selectedEvent: IScheduleItem;
  doctor: DoctorInitialState;
}

function SelectedEvent({ selectedEvent, doctor }: ISelectedEventProps) {
  return (
    <>
      <SelectedDayInfo>
        {moment(selectedEvent.start).format('dddd, D MMMM YYYY')}
      </SelectedDayInfo>
      <SelectedInfo>
        <AppointmentData
          doctor={doctor}
          counter={1}
          patient={selectedEvent.patient}
          remoteDoctor={selectedEvent.remoteDoctor}
          localDoctor={selectedEvent.localDoctor}
          start={selectedEvent.start}
          end={selectedEvent.end}
        />
      </SelectedInfo>
    </>
  );
}

export default SelectedEvent;
