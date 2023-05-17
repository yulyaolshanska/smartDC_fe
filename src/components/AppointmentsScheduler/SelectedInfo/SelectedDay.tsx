import React from 'react';
import moment from 'moment';
import { useTranslation } from 'react-i18next';
import { IScheduleItem } from '@components/AppointmentsScheduler';
import {
  ErrorInfo,
  SelectedDayInfo,
  SelectedInfo,
} from '@components/AppointmentsScheduler/SelectedInfo/styles';
import AppointmentData from '@components/AppointmentsScheduler/AppointmentData';
import DoctorInitialState from '@redux/slices/DoctorSlice/types';
import { fullDateFormat } from '@constants/format';

interface ISelectedDateProps {
  selectedDate: Date | undefined;
  appointments: IScheduleItem[];
  doctor: DoctorInitialState;
}

function SelectedDay({
  selectedDate,
  appointments,
  doctor,
}: ISelectedDateProps) {
  const { t } = useTranslation();

  return (
    <>
      <SelectedDayInfo>
        {moment(selectedDate).format(fullDateFormat)}
      </SelectedDayInfo>
      {appointments.length > 0 ? (
        appointments.map((appointment, index) => (
          <SelectedInfo key={index}>
            <AppointmentData
              doctor={doctor}
              counter={index + 1}
              patient={appointment.patient}
              remoteDoctor={appointment.remoteDoctor}
              localDoctor={appointment.localDoctor}
              start={appointment.start}
              end={appointment.end}
            />
          </SelectedInfo>
        ))
      ) : (
        <ErrorInfo>{t('Error.noEvents')}</ErrorInfo>
      )}
    </>
  );
}

export default SelectedDay;
