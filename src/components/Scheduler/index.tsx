import React, { ChangeEvent, useEffect, useMemo, useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import { v4 as uuidv4 } from 'uuid';
import moment from 'moment';
import 'moment-timezone';
import 'react-big-calendar/lib/css/react-big-calendar.css';

import { ErrorText } from './styles';
import { useTranslation } from 'react-i18next';
import PopupDeleteContent from './Modals/PopupDeleteContent';
import PopupCreateContent from './Modals/PopupCreateContent';
import TimezoneSelect from './TimezoneSelect/TimezoneSelect';
import { WHITE } from '@constants/colors';
import { useAppSelector } from '@redux/hooks';
import { ToastContainer, toast } from 'react-toastify';
import { Availability, availabilityApi } from 'services/AvailabilityService';

const defaultTZ = moment.tz.guess();

export interface ISelectedRange {
  start: null | number | string;
  end: null | number | string;
}

export interface IScheduleItem {
  uuid: string;
  title: string;
  start: Date;
  end: Date;
}

const calendarStyle = {
  backgroundColor: WHITE,
  height: '600px',
};

function Scheduler() {
  const { t } = useTranslation();
  const doctorData = useAppSelector((state) => state.doctorReducer);
  const [createAvailability] = availabilityApi.useCreateAvailabilityMutation();
  const [deleteAvailability] =
    availabilityApi.useDeleteAvailabilityByIdMutation();

  const {
    data: availabilityData,
    refetch: availabilityRefetch,
    isLoading: availabilityIsLoading,
  } = availabilityApi.useGetAvailabilitiesForDoctorQuery(doctorData?.id || 0);

  const initialEventsWithDateObject = availabilityData?.map(
    (event: Availability) => ({
      ...event,
      start: new Date(event.start),
      end: new Date(event.end),
    })
  );

  const [showWarning, setShowWarning] = useState<boolean>(false);
  const [timezone, setTimezone] = useState<string>(defaultTZ);
  const [showCreatePopup, setShowCreatePopup] = useState<boolean>(false);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [selectedRange, setSelectedRange] = useState<ISelectedRange>({
    start: null,
    end: null,
  });
  const [eventsData, setEventsData] = useState<IScheduleItem[]>(
    initialEventsWithDateObject as IScheduleItem[]
  );
  const [errorMessage, setErrorMessage] = useState('');
  const [selectedEvent, setSelectedEvent] = useState<IScheduleItem | null>(
    null
  );

  const { getNow, localizer, scrollToTime } = useMemo(() => {
    moment.tz.setDefault(timezone);
    return {
      getNow: () => moment().toDate(),
      localizer: momentLocalizer(moment),
      scrollToTime: moment().toDate(),
    };
  }, [timezone]);

  useEffect(() => {
    return () => {
      moment.tz.setDefault();
    };
  }, []);

  useEffect(() => {
    if (initialEventsWithDateObject) {
      setEventsData(initialEventsWithDateObject);
    }
  }, [initialEventsWithDateObject]);

  const handleTimezoneChange = (newTimezone: string) => {
    setTimezone(newTimezone);
    if (!showWarning) {
      setShowWarning(true);
    }
  };

  const handleSelectEvent = (event: IScheduleItem): void => {
    setSelectedEvent(event);
  };

  const handleDeleteEvent = () => {
    if (!selectedEvent) return;
    setSelectedEvent(null);
    (async () => {
      try {
        await deleteAvailability({
          doctorId: doctorData.id,
          uuid: selectedEvent.uuid,
        }).unwrap();
        toast.success(t('Calendar.successfullySubmited'), {
          position: toast.POSITION.TOP_CENTER,
        });
        availabilityRefetch();
        const updatedEvents = eventsData.filter(
          (event) => event.uuid !== selectedEvent.uuid
        );
        setEventsData(updatedEvents);
      } catch (err) {
        toast.error(t('Error.calendarSlotError'), {
          position: toast.POSITION.TOP_CENTER,
        });
      }
    })();
  };

  function handleSelectSlot(slotInfo: { start: Date; end: Date }): void {
    if (moment(slotInfo.start).isBefore(moment(), 'day')) {
      toast.error(t('Error.pastDateError'), {
        position: toast.POSITION.TOP_CENTER,
      });
      return;
    }
    setSelectedDate(slotInfo.start);
    setShowCreatePopup(true);
    setSelectedRange({
      start: '',
      end: '',
    });
  }

  function handleStartChange(event: ChangeEvent<HTMLInputElement>): void {
    setSelectedRange({ ...selectedRange, start: event.target.value || null });
  }
  
  function handleEndChange(event: ChangeEvent<HTMLInputElement>): void {
    setSelectedRange({ ...selectedRange, end: event.target.value || null });
  }  

  const handleSave = (): void => {
    if (selectedDate) {
      const dayStartValue = new Date(selectedDate.getTime());
      const dayEndValue = new Date(selectedDate.getTime());
  
      if (!selectedRange.start || !selectedRange.end) {
        const error = t('Error.bothDatesRequired');
        setErrorMessage(error);
        return;
      }
      if (selectedRange.end < selectedRange.start) {
        const error = t('Error.endBeforeStartDateError');
        setErrorMessage(error);
        return;
      }
  
      const start = selectedRange.start.toString();
      const end = selectedRange.end.toString();
      const [startHours, startMinutes] = start.split(':');
      const [endHours, endMinutes] = end.split(':');

      dayStartValue.setHours(Number(startHours), Number(startMinutes));
      dayEndValue.setHours(Number(endHours), Number(endMinutes));
  
      const slots = [];
      for (let hour = dayStartValue.getHours(); hour < dayEndValue.getHours(); hour++) {
        const slotStart = new Date(dayStartValue.getTime());
        const slotEnd = new Date(dayStartValue.getTime());
        slotStart.setHours(hour);
        slotStart.setMinutes(0);
        slotEnd.setHours(hour + 1);
        slotEnd.setMinutes(0);

        const uuid = uuidv4();
        const newAvailability = {
          uuid: uuid,
          title: `Working hours`,
          start: slotStart.toISOString(),
          end: slotEnd.toISOString(),
        };
        const newEventAvailability = {
          uuid: uuid,
          title: `Working hours`,
          start: slotStart,
          end: slotEnd,
        };
        
        slots.push(newEventAvailability);
        (async () => {
          try {
            await createAvailability({
              doctorId: doctorData.id,
              availability: newAvailability,
            }).unwrap();
            availabilityRefetch();
          } catch (err) {
            toast.error(t('Error.calendarSlotError'), {
              position: toast.POSITION.TOP_CENTER,
            });
          }
        })();
      }
      
      setEventsData([...eventsData, ...slots]);
      setShowCreatePopup(false);
      setErrorMessage('');
      toast.success(t('Calendar.successfullySubmited'), {
        position: toast.POSITION.TOP_CENTER,
      });
    }
  };  

  if (availabilityIsLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <TimezoneSelect
        defaultTZ={defaultTZ}
        setTimezone={handleTimezoneChange}
        timezone={timezone}
      />
      {showWarning && <ErrorText>{t('Warning.viewScheduleWarning')}</ErrorText>}
      <Calendar
        events={eventsData}
        localizer={localizer}
        selectable={true}
        onSelectSlot={handleSelectSlot}
        onSelectEvent={handleSelectEvent}
        startAccessor="start"
        endAccessor="end"
        style={calendarStyle}
        getNow={getNow}
        scrollToTime={scrollToTime}
      />
      {showCreatePopup && (
        <PopupCreateContent
          handleSave={handleSave}
          handleStartChange={handleStartChange}
          handleEndChange={handleEndChange}
          selectedRange={selectedRange}
          selectedDate={selectedDate}
          errorMessage={errorMessage}
          setShowCreatePopup={setShowCreatePopup}
          setErrorMessage={setErrorMessage}
        />
      )}
      {selectedEvent && (
        <PopupDeleteContent
          setSelectedEvent={setSelectedEvent}
          handleDeleteEvent={handleDeleteEvent}
        />
      )}
      <ToastContainer />
    </>
  );
}

export default Scheduler;