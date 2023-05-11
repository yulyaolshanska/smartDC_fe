import { useEffect, useRef, useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import { CalendarOptions } from '@fullcalendar/core';
import { getISOWeek } from 'date-fns';
import {
  AppointmentEvent,
  CalendarContainer,
  CalendarTitle,
  EventContainer,
  EventMain,
} from './styles';
import './index.css';
import { useTranslation } from 'react-i18next';
import { useGetAppointmentForWeekQuery } from '../../services/AppointmentService';
import { useAppSelector } from '@redux/hooks';

interface Event {
  start: Date;
  end: Date;
}

function WeeklyCalendar() {
  const id = useAppSelector((state) => state.doctorReducer.id) ?? 1;
  const { t } = useTranslation();
  const calendarRef = useRef<FullCalendar>(null);
  const date = new Date();
  const year = date.getFullYear();
  const week = getISOWeek(date);
  const [currentYear, setCurrentYear] = useState(year);
  const [currentWeek, setCurrentWeek] = useState(week);
  const { data: appointments = [] } = useGetAppointmentForWeekQuery({
    id: id,
    year: currentYear,
    week: currentWeek,
  });
  const appointmentEvents: Event[] = appointments.map((appointment) => ({
    start: appointment.startTime,
    end: appointment.endTime,
  }));

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
      const day = info.event._instance?.range.start.getDay();
      console.log('Clicked on day: ', day);
    },
  };

  return (
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
  );
}

export default WeeklyCalendar;
