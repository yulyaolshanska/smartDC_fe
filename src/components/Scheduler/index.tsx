import React, { ChangeEvent, useEffect, useMemo, useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import { v4 as uuidv4 } from 'uuid';
import moment from 'moment';
import 'moment-timezone';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { CancelButton, ErrorText, SaveButton, SchedulerButtonsWrapper } from './styles';
import { useTranslation } from 'react-i18next';
import PopupDeleteContent from './Modals/PopupDeleteContent';
import PopupCreateContent from './Modals/PopupCreateContent';
import TimezoneSelect from './TimezoneSelect/TimezoneSelect';
import { TFunction } from 'i18next';

const defaultTZ = moment.tz.guess();

export interface ISelectedRange {
    start: null | number | string;
    end: null | number | string;
};

export interface IScheduleItem {
    uuid: string;
    title: string;
    start: Date;
    end: Date;
};
  
function Scheduler() {
    const { t }: { t: TFunction } = useTranslation();

    const [showWarning, setShowWarning] = useState(false);
    const [timezone, setTimezone] = useState(defaultTZ);
    const [showCreatePopup, setShowCreatePopup] = useState(false);
    const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
    const [selectedRange, setSelectedRange] = useState<ISelectedRange>({ start: null, end: null });
    const [eventsData, setEventsData] = useState<IScheduleItem[]>([]);
    const [errorMessage, setErrorMessage] = useState('');
    const [selectedEvent, setSelectedEvent] = useState<IScheduleItem | null>(null);

    const { getNow, localizer, scrollToTime } =
    useMemo(() => {
      moment.tz.setDefault(timezone)
      return {
        getNow: () => moment().toDate(),
        localizer: momentLocalizer(moment),
        scrollToTime: moment().toDate(),
      }
    }, [timezone])

    useEffect(() => {
        return () => {
          moment.tz.setDefault()
        }
    }, [])

    const handleTimezoneChange = (newTimezone: string) => {
        setTimezone(newTimezone);
        if (!showWarning) {
            setShowWarning(true);
        }
    }

    const handleSelectEvent = (event: IScheduleItem): void => {
        setSelectedEvent(event);
    };

    const handleDeleteEvent = () => {
        if (!selectedEvent) return;
        const updatedEvents = eventsData.filter((event) => event.uuid !== selectedEvent.uuid);
        setSelectedEvent(null);
        setEventsData(updatedEvents);
    };
  
    function handleSelectSlot(slotInfo: {start: Date, end: Date}): void {
        setSelectedDate(slotInfo.start);
        setShowCreatePopup(true);
        setSelectedRange({
            start: '',
            end: '',
        });
    };
    
    function handleStartChange(event: ChangeEvent<HTMLInputElement>): void {
        setSelectedRange({ ...selectedRange, start: event.target.value });
    };
    
    function handleEndChange(event: ChangeEvent<HTMLInputElement>): void {
        setSelectedRange({ ...selectedRange, end: event.target.value });
    };
    
    const handleSave = (): void => {
        if (selectedDate) {
            let dayStartValue = new Date(selectedDate.getTime());
            let dayEndValue = new Date(selectedDate.getTime());

            if (!selectedRange.start || !selectedRange.end) {
                let error = t('Error.bothDatesRequired');
                setErrorMessage(error);
                return;
            }
            if (selectedRange.end < selectedRange.start) {
                let error = t('Error.endBeforeStartDateError');
                setErrorMessage(error);
                return;
            }

            let start = selectedRange.start.toString();
            let end = selectedRange.end.toString();
            const [startHours, startMinutes] = start.split(':');
            const [endHours, endMinutes] = end.split(':');

            dayStartValue.setHours(Number(startHours));
            dayEndValue.setHours(Number(endHours));
            dayStartValue.setMinutes(Number(startMinutes));
            dayEndValue.setMinutes(Number(endMinutes));

            const uuid = uuidv4();
            setEventsData([
                ...eventsData,
                {
                    uuid: uuid,
                    title: `Working hours`,
                    start: dayStartValue,
                    end: dayEndValue,
                }
            ]);
            setShowCreatePopup(false);
            setErrorMessage('');
            console.log(eventsData);
        }
    };
    
    function handleSubmit() {
        // TODO: send saved schedule to DB
    }

    function handleCancel() {
        // TODO: clear saved schedule
    }

    return (
        <>
        <TimezoneSelect
          defaultTZ={defaultTZ}
          setTimezone={handleTimezoneChange}
          timezone={timezone}
        />
        {showWarning &&
        <ErrorText>{t('Warning.viewScheduleWarning')}</ErrorText>}
        <Calendar
          events={eventsData}
          localizer={localizer}
          selectable={true}
          onSelectSlot={handleSelectSlot}
          onSelectEvent={handleSelectEvent}
          startAccessor='start'
          endAccessor='end'
          style={{ height: 500 }}
          getNow={getNow}
          scrollToTime={scrollToTime}
        />
        {showCreatePopup && 
        <PopupCreateContent
            handleSave={handleSave}
            handleStartChange={handleStartChange}
            handleEndChange={handleEndChange}
            selectedRange={selectedRange}
            selectedDate={selectedDate}
            errorMessage={errorMessage}
            setShowCreatePopup={setShowCreatePopup}
            setErrorMessage={setErrorMessage}
        />}
        {selectedEvent && 
        <PopupDeleteContent
            setSelectedEvent={setSelectedEvent}
            handleDeleteEvent={handleDeleteEvent}
        />}
        <SchedulerButtonsWrapper>
            <CancelButton
                onClick={handleCancel}
                type='button'
                value={t('Auth.cancel') ?? ''}
            />
            <SaveButton
                onClick={handleSubmit}
                disabled={false}
                type='submit'
                value={t('Calendar.saveSchedule') ?? ''}
            />
        </SchedulerButtonsWrapper>
      </>
    )
}

export default Scheduler;