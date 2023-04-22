import React, { ChangeEvent, useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import { v4 as uuidv4 } from 'uuid';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import {
    CancelButton,
    DateInput,
    ErrorText,
    Label,
    ModalButtonsWrapper,
    ModalContainer,
    ModalContent,
    ModalOverlay,
    SaveButton,
    SchedulerButtonsWrapper,
    SelectedDateText,
    Title,
    WrapperLabelAndInput
} from './styles';
import { useTranslation } from 'react-i18next';

const localizer = momentLocalizer(moment);

interface ISelectedRange {
    start: null | number | string;
    end: null | number | string;
};
interface IScheduleItem {
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

    const popupCreateContent = (
        <ModalOverlay>
            <ModalContainer>
                <ModalContent>
                    <Title>{t('Calendar.selectTime')}</Title>
                    {errorMessage &&
                    <ErrorText>{errorMessage}</ErrorText>}
                    {selectedDate &&
                    <SelectedDateText>{t('Calendar.selectedDate')} {selectedDate.toLocaleDateString()}</SelectedDateText>}
                    <WrapperLabelAndInput>
                        <Label htmlFor='start-time'>{t('Calendar.startTime')}</Label>
                        <DateInput
                            id='start-time'
                            type='time'
                            value={selectedRange?.start ?? ''}
                            onChange={handleStartChange}
                        />
                    </WrapperLabelAndInput>
                    <WrapperLabelAndInput>
                    <Label htmlFor='end-time'>{t('Calendar.endTime')}</Label>
                        <DateInput
                            id='end-time'
                            type='time'
                            value={selectedRange?.end ?? ''}
                            onChange={handleEndChange}
                        />
                    </WrapperLabelAndInput>
                    <ModalButtonsWrapper>
                        <CancelButton 
                            onClick={() => {
                            setShowCreatePopup(false);
                            setErrorMessage('');
                            }}
                            type='button'
                            value={t('Auth.cancel') ?? ''}
                        />
                        <SaveButton
                            onClick={handleSave}
                            disabled={false}
                            type='submit'
                            value={t('Auth.save') ?? ''}
                        />
                    </ModalButtonsWrapper>
                </ModalContent>
            </ModalContainer>
        </ModalOverlay>
    );

    const popupDeleteContent = (
        <ModalOverlay>
            <ModalContainer>
                <ModalContent>
                    <Title>{t('Calendar.deleteTime')}</Title>
                    <ModalButtonsWrapper>
                        <CancelButton 
                            onClick={() => setSelectedEvent(null)}
                            type='button'
                            value={t('Auth.cancel') ?? ''}
                        />
                        <SaveButton
                            onClick={handleDeleteEvent}
                            disabled={false}
                            type='submit'
                            value={t('Auth.delete') ?? ''}
                        />
                    </ModalButtonsWrapper>
                </ModalContent>
            </ModalContainer>
        </ModalOverlay>
    )

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
        {showCreatePopup && popupCreateContent}
        {selectedEvent && popupDeleteContent}
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