import React, { useEffect, useMemo, useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import { useTranslation } from 'react-i18next';
import {
  CalendarContainer,
  Title,
} from 'components/AppointmentsScheduler/styles';
import SelectedDay from '@components/AppointmentsScheduler/SelectedInfo/SelectedDay';
import SelectedEvent from '@components/AppointmentsScheduler/SelectedInfo/SelectedEvent';
import { useAppSelector } from '@redux/hooks';
import { Appointment, appointmentApi } from 'services/AppointmentService';
import { IAuth, IPatient } from '@components/general/type';
import { local } from '@constants/other';

export interface IScheduleItem {
  start: Date;
  end: Date;
  patient: IPatient;
  localDoctor: IAuth;
  remoteDoctor: IAuth;
  zoomLink: string;
}

function AppointmentsScheduler() {
  const { t } = useTranslation();

  const doctorData = useAppSelector((state) => state.doctorReducer);

  const { data: appointmentData, refetch: appointmentRefetch } =
    appointmentApi.useGetAppointmentsForDoctorQuery(doctorData?.id || 0);

  const initialEventsWithDateObject = appointmentData?.map(
    (event: Appointment) => ({
      ...event,
      start: new Date(event.startTime),
      end: new Date(event.endTime),
      patient: event.patient,
      localDoctor: event.localDoctor,
      remoteDoctor: event.remoteDoctor,
    })
  );

  useEffect(() => {
    appointmentRefetch();
  }, []);

  const [selectedEvent, setSelectedEvent] = useState<IScheduleItem | null>(
    null
  );

  const [selectedDate, setSelectedDate] = useState<Date | undefined>();

  const [appointmentsForSelectedSlot, setAppointmentsForSelectedSlot] =
    useState<IScheduleItem[]>(initialEventsWithDateObject as IScheduleItem[]);

  const { localizer, scrollToTime } = useMemo(() => {
    return {
      localizer: momentLocalizer(moment),
      scrollToTime: moment().toDate(),
    };
  }, []);

  function handleSelectSlot(slotInfo: { start: Date; end: Date }): void {
    setSelectedDate(slotInfo.start);
    setSelectedEvent(null);
    if (initialEventsWithDateObject) {
      setAppointmentsForSelectedSlot(
        initialEventsWithDateObject.filter((appointment) =>
          moment(appointment.start).isSame(slotInfo.start, 'day')
        )
      );
    }
  }

  function handleSelectEvent(event: IScheduleItem): void {
    setSelectedDate(undefined);
    setSelectedEvent(event);
  }

  function eventComponent({ event }: { event: IScheduleItem }) {
    return (
      <div>
        {moment(event.start).format('hh:mm A ')}-{' '}
        {moment(event.end).format('hh:mm A')}
      </div>
    );
  }

  function AgendaEvent({ event }: { event: IScheduleItem }) {
    const patientAge = `${
      new Date().getFullYear() -
      new Date(event?.patient?.birthDate).getFullYear()
    } ${t('Appointments.years')}`;

    const patientFullName = `${event?.patient.firstName.charAt(0)}. ${
      event?.patient.lastName
    }`;

    const patientGenderAge = `${event?.patient.gender}, ${patientAge}`;

    const doctorName =
      doctorData.role === local
        ? event.remoteDoctor?.lastName
        : event.localDoctor?.lastName;

    const doctorRole =
      doctorData.role === local
        ? t('Appointments.remoteDoctorAgenda')
        : t('Appointments.localDoctorAgenda');

    const doctor = `${doctorRole}: ${t('Appointments.doctor')} ${doctorName}`;
    const patient = `${t(
      'Appointments.patient'
    )}: ${patientFullName} ${patientGenderAge}`;

    return (
      <div>
        {doctor}
        <br />
        {patient}
        <br />
      </div>
    );
  }

  return (
    <>
      <Title>{t('Appointments.myAppointments')}</Title>
      <CalendarContainer>
        <Calendar
          localizer={localizer}
          selectable={true}
          startAccessor="start"
          endAccessor="end"
          scrollToTime={scrollToTime}
          onSelectSlot={handleSelectSlot}
          onSelectEvent={handleSelectEvent}
          events={initialEventsWithDateObject}
          components={{
            event: eventComponent,
            agenda: {
              event: AgendaEvent,
            },
          }}
        />
        {selectedDate && (
          <SelectedDay
            selectedDate={selectedDate}
            appointments={appointmentsForSelectedSlot}
            doctor={doctorData}
          />
        )}
        {selectedEvent && (
          <SelectedEvent selectedEvent={selectedEvent} doctor={doctorData} />
        )}
      </CalendarContainer>
    </>
  );
}

export default AppointmentsScheduler;
