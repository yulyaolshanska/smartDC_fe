import React from 'react';
import { useTranslation } from 'react-i18next';
import { CancelButton, DateInput, ErrorText, Label, ModalButtonsWrapper, ModalContainer, ModalContent, ModalOverlay, SaveButton, SelectedDateText, Title, WrapperLabelAndInput } from '../styles';
import { ISelectedRange } from '..';

interface PopupCreateContentProps {
    selectedDate: Date | undefined;
    selectedRange: ISelectedRange;
    errorMessage: string;
    handleStartChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    handleEndChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    handleSave: () => void;
    setShowCreatePopup: (show: boolean) => void;
    setErrorMessage: (message: string) => void;
};

const PopupCreateContent = ({
    selectedDate,
    selectedRange,
    errorMessage,
    handleStartChange,
    handleEndChange,
    handleSave,
    setShowCreatePopup,
    setErrorMessage
}: PopupCreateContentProps) => {
    const { t } = useTranslation();

    return (
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
};

export default PopupCreateContent;
