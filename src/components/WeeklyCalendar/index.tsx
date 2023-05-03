import { useRef } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import { CalendarOptions } from '@fullcalendar/core';
import {
  AppointmentEvent,
  CalendarContainer,
  CalendarTitle,
  EventContainer,
  EventMain,
} from './styles';
import './index.css';
import { useTranslation } from 'react-i18next';

interface Event {
  title: string;
  start: Date;
  end: Date;
  color?: string;
}

const events: Event[] = [
  {
    title: 'Event 1',
    start: new Date(2023, 4, 3),
    end: new Date(2023, 4, 3),
  },
  {
    title: 'Event 2',
    start: new Date(2023, 4, 4),
    end: new Date(2023, 4, 4),
  },
  {
    title: 'Event 3',
    start: new Date(2023, 4, 5),
    end: new Date(2023, 4, 5),
  },
  {
    title: 'Event 4',
    start: new Date(2023, 4, 5),
    end: new Date(2023, 4, 5),
  },
  {
    title: 'Event 5',
    start: new Date(2023, 4, 5),
    end: new Date(2023, 4, 5),
  },
];

function WeeklyCalendar() {
  const { t } = useTranslation();
  const calendarRef = useRef<HTMLDivElement>(null);

  const EventContent = ({ event }: any) => {
    const randomColor = '#' + Math.floor(Math.random() * 16777215).toString(16);

    return (
      <EventContainer onClick={() => console.log('Show Appointments')}>
        <EventMain style={{ backgroundColor: randomColor }}>
          <AppointmentEvent></AppointmentEvent>
        </EventMain>
      </EventContainer>
    );
  };

  const options: CalendarOptions = {
    plugins: [dayGridPlugin],
    initialView: 'dayGridWeek',
    events: events,
    eventContent: EventContent,
    height: '210px',
    dayHeaderFormat: { weekday: 'short', day: 'numeric' },
  };

  return (
    <CalendarContainer>
      <CalendarTitle>{t('Calendar.calendar')}</CalendarTitle>
      <FullCalendar
        // ref={calendarRef}
        {...options}
        eventClick={() => console.log('Click')}
        headerToolbar={{
          left: 'today',
          center: 'title',
          right: 'prev,next',
        }}
      />
    </CalendarContainer>
  );
}

export default WeeklyCalendar;
