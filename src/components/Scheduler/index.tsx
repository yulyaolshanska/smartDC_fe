import React, { ChangeEvent, useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import { v4 as uuidv4 } from 'uuid';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { CancelButton, SaveButton, SchedulerButtonsWrapper } from './styles';
import { useTranslation } from 'react-i18next';
import PopupDeleteContent from './Modals/PopupDeleteContent';
import PopupCreateContent from './Modals/PopupCreateContent';

const localizer = momentLocalizer(moment);

export interface ISelectedRange {
    start: null | number | string;
    end: null | number | string;
};
export interface IScheduleItem {
    id: string;
    title: string;
    start: Date;
    end: Date;
};
  
function Scheduler() {
    const { t } = useTranslation();

    const [showCreatePopup, setShowCreatePopup] = useState(false);
    const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
    const [selectedRange, setSelectedRange] = useState<ISelectedRange>({ start: null, end: null });
    const [eventsData, setEventsData] = useState<IScheduleItem[]>([]);
    const [errorMessage, setErrorMessage] = useState('');
    const [selectedEvent, setSelectedEvent] = useState<IScheduleItem | null>(null);

    const handleSelectEvent = (event: IScheduleItem): void => {
        setSelectedEvent(event);
    };

    const handleDeleteEvent = () => {
        if (!selectedEvent) return;
        const updatedEvents = eventsData.filter((event) => event.id !== selectedEvent.id);
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

            const id = uuidv4();
            setEventsData([
                ...eventsData,
                {
                    id: id,
                    title: `Working hours: ${startHours}:${startMinutes}-${endHours}:${endMinutes}`,
                    start: dayStartValue,
                    end: dayEndValue,
                }
            ]);
            setShowCreatePopup(false);
            setErrorMessage('');
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
        <Calendar
          events={eventsData}
          localizer={localizer}
          selectable={true}
          onSelectSlot={handleSelectSlot}
          onSelectEvent={handleSelectEvent}
          startAccessor='start'
          endAccessor='end'
          style={{ height: 500 }}
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