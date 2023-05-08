import React, { useMemo, useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import { useTranslation } from 'react-i18next';
import {
  CalendarContainer,
  Title,
} from 'components/AppointmentsScheduler/styles';
import { IScheduleItem } from '@components/Scheduler';
import { defaultAppointments } from '@constants/mockData';
import SelectedDay from '@components/AppointmentsScheduler/SelectedInfo/SelectedDay';
import SelectedEvent from '@components/AppointmentsScheduler/SelectedInfo/SelectedEvent';

function AppointmentsScheduler() {
  const { t } = useTranslation();

  const [selectedEvent, setSelectedEvent] = useState<IScheduleItem | null>(
    null
  );

  const [selectedDate, setSelectedDate] = useState<Date | undefined>();

  const [appointmentsForSelectedSlot, setAppointmentsForSelectedSlot] =
    useState(defaultAppointments);

  const appointments = defaultAppointments;

  const { localizer, scrollToTime } = useMemo(() => {
    return {
      localizer: momentLocalizer(moment),
      scrollToTime: moment().toDate(),
    };
  }, []);

  function handleSelectSlot(slotInfo: { start: Date; end: Date }): void {
    setSelectedDate(slotInfo.start);
    setSelectedEvent(null);
    setAppointmentsForSelectedSlot(
      appointments.filter((appointment) =>
        moment(appointment.start).isSame(slotInfo.start, 'day')
      )
    );
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
          events={appointments}
          components={{ event: eventComponent }}
        />
        {selectedDate && (
          <SelectedDay
            selectedDate={selectedDate}
            appointments={appointmentsForSelectedSlot}
          />
        )}
        {selectedEvent && <SelectedEvent selectedEvent={selectedEvent} />}
      </CalendarContainer>
    </>
  );
}

export default AppointmentsScheduler;
