import React, { ChangeEvent, useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import events from './events';
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
    SelectedDateText,
    Title,
    WrapperLabelAndInput
} from './styles';
import { useTranslation } from 'react-i18next';

const localizer = momentLocalizer(moment);

interface SelectedRange {
    start: null | number | string;
    end: null | number | string;
};

function Scheduler() {
    const { t } = useTranslation();

    const [showPopup, setShowPopup] = useState(false);
    const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
    const [selectedRange, setSelectedRange] = useState<SelectedRange>({ start: null, end: null });
    const [eventsData, setEventsData] = useState(events);
    const [errorMessage, setErrorMessage] = useState('');
  
    function handleSelectSlot(slotInfo: {start: Date, end: Date}) {
        setSelectedDate(slotInfo.start);
        setShowPopup(true);
        setSelectedRange({
            start: '',
            end: '',
        });
    };
    
    function handleStartChange(event: ChangeEvent<HTMLInputElement>) {
        setSelectedRange({ ...selectedRange, start: event.target.value });
    };
    
    function handleEndChange(event: ChangeEvent<HTMLInputElement>) {
        setSelectedRange({ ...selectedRange, end: event.target.value });
    };
    
    const handleSave = () => {
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

            setEventsData([
                ...eventsData,
                {
                    title: 'Working hours',
                    start: dayStartValue,
                    end: dayEndValue,
                }
            ]);
            setShowPopup(false);
            setErrorMessage('');
        }
    };      

    const popupContent = (
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
                            setShowPopup(false);
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

    return (
        <>
        <Calendar
          events={eventsData}
          localizer={localizer}
          selectable={true}
          onSelectSlot={handleSelectSlot}
          startAccessor='start'
          endAccessor='end'
          style={{ height: 500 }}
        />
        {showPopup && popupContent}
      </>
    )
}

export default Scheduler;