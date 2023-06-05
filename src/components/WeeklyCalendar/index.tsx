import { useEffect, useMemo, useRef, useState } from 'react';
import { useParams } from 'react-router';
import { getISOWeek } from 'date-fns';
import { useTranslation } from 'react-i18next';
import FullCalendar from '@fullcalendar/react';
import { EventClickArg } from 'fullcalendar';
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
import { MAX_COLOR_VALUE } from '@constants/other';

interface Event {
  start: Date;
  end: Date;
}

function WeeklyCalendar() {
  const { t } = useTranslation();
  const { id } = useParams();
  const calendarRef = useRef<FullCalendar>(null);
  const [currentDate, setCurrentDate] = useState(() => {
    const day = new Date();
    const week = getISOWeek(new Date());
    const year = new Date().getFullYear();
    return { day, week, year };
  });
  const { data: appointments = [] } = useGetAppointmentForWeekQuery({
    id: Number(id),
    year: currentDate.year,
    week: currentDate.week,
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
        setCurrentDate((prev) => {
          return {
            ...prev,
            week: getISOWeek(startDate) + 1,
            year: startDate.getFullYear(),
          };
        });
      };
      calendarApi.on('datesSet', handleDatesSet);
      return () => {
        calendarApi.off('datesSet', handleDatesSet);
      };
    }
  }, []);

  const EventContent = useMemo(() => {
    const randomColor =
      '#' + Math.floor(Math.random() * MAX_COLOR_VALUE).toString(16);

    return (
      <EventContainer>
        <EventMain style={{ backgroundColor: randomColor }}>
          <AppointmentEvent></AppointmentEvent>
        </EventMain>
      </EventContainer>
    );
  }, [appointments]);

  const options: CalendarOptions = {
    plugins: [dayGridPlugin],
    initialView: 'dayGridWeek',
    events: appointmentEvents,
    eventContent: EventContent,
    height: '210px',
    dayHeaderFormat: { weekday: 'short', day: 'numeric' },
    eventClick: (info: EventClickArg) => {
      setCurrentDate((prev) => {
        return {
          ...prev,
          day: info.event._instance?.range.start || new Date(),
        };
      });
    },
  };

  const getCurrentAppointments = (
    appointments: Appointment[],
    currentDay: Date
  ): Appointment[] => {
    return appointments.filter((appointment) => {
      const startTime = new Date(appointment.startTime);
      return startTime.getDay() === currentDay.getDay();
    });
  };

  const currentAppointments = useMemo(
    () => getCurrentAppointments(appointments, currentDate.day),
    [appointments, currentDate.day]
  );

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
          key={appointment.id}
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
