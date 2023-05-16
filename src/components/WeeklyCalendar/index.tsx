import { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router';
import { getISOWeek } from 'date-fns';
import { useTranslation } from 'react-i18next';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import { CalendarOptions } from '@fullcalendar/core';
import { useGetAppointmentForWeekQuery } from 'services/AppointmentService';
import AppointmentCard from '@components/AppointmentCard';
import {
  AppointmentEvent,
  CalendarContainer,
  CalendarTitle,
  EventContainer,
  EventMain,
} from './styles';
import './index.css';
import { Appointment } from 'services/types/appointment.type';

interface Event {
  start: Date;
  end: Date;
}

function WeeklyCalendar() {
  const { t } = useTranslation();
  const { id } = useParams();
  const calendarRef = useRef<FullCalendar>(null);
  const date = new Date();
  const year = date.getFullYear();
  const week = getISOWeek(date);
  const [currentYear, setCurrentYear] = useState(year);
  const [currentWeek, setCurrentWeek] = useState(week);
  const [currentDay, setCurrentDay] = useState<Date>(new Date());
  const { data: appointments = [] } = useGetAppointmentForWeekQuery({
    id: Number(id),
    year: currentYear,
    week: currentWeek,
  });

  const appointmentEvents: Event[] = appointments.map(
    (appointment: Appointment) => ({
      start: new Date(appointment.startTime),
      end: new Date(appointment.endTime),
    })
  );

  useEffect(() => {
    const calendarApi = calendarRef.current?.getApi();
    if (calendarApi) {
      const handleDatesSet = (arg: any) => {
        const view = arg.view;
        const startDate = view.activeStart;
        setCurrentYear(startDate.getFullYear());
        setCurrentWeek(getISOWeek(startDate) + 1);
      };
      calendarApi.on('datesSet', handleDatesSet);
      return () => {
        calendarApi.off('datesSet', handleDatesSet);
      };
    }
  }, []);

  const EventContent = () => {
    const randomColor = '#' + Math.floor(Math.random() * 16777215).toString(16);

    return (
      <EventContainer>
        <EventMain style={{ backgroundColor: randomColor }}>
          <AppointmentEvent></AppointmentEvent>
        </EventMain>
      </EventContainer>
    );
  };
  const options: CalendarOptions = {
    plugins: [dayGridPlugin],
    initialView: 'dayGridWeek',
    events: appointmentEvents,
    eventContent: EventContent,
    height: '210px',
    dayHeaderFormat: { weekday: 'short', day: 'numeric' },
    eventClick: (info) => {
      setCurrentDay(info.event._instance?.range.start || new Date());
    },
  };

  const getCurrentAppointments = (
    appointments: Appointment[]
  ): Appointment[] => {
    return appointments.filter((appointment) => {
      const startTime = new Date(appointment.startTime);
      return startTime.getDay() === currentDay.getDay();
    });
  };
  const currentAppointments = getCurrentAppointments(appointments);

  return (
    <>
      <CalendarContainer>
        <CalendarTitle>{t('Calendar.calendar')}</CalendarTitle>
        <FullCalendar
          {...options}
          headerToolbar={{
            left: 'today',
            center: 'title',
            right: 'prev,next',
          }}
          ref={calendarRef}
        />
      </CalendarContainer>
      {currentAppointments.map((appointment, index) => (
        <AppointmentCard
          remoteDoctor={appointment.remoteDoctor}
          localDoctor={appointment.localDoctor}
          patient={appointment.patient}
          start={appointment.startTime}
          end={appointment.endTime}
          counter={index + 1}
        />
      ))}
    </>
  );
}

export default WeeklyCalendar;
