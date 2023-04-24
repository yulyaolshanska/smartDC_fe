import React from 'react';
import { useTranslation } from 'react-i18next';
import { ISelectedRange } from '..';
import { ModalButtonsWrapper, ModalContainer, ModalContent, ModalOverlay, Title, WrapperLabelAndInput } from './styles';
import { CancelButton, ErrorText, SaveButton } from '../styles';

interface IPopupCreateContentProps {
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
}: IPopupCreateContentProps) => {
    const { t } = useTranslation();

    const handlePopupClose = () => {
        setShowCreatePopup(false);
        setErrorMessage('');
    };

    return (
        <ModalOverlay>
            <ModalContainer>
                <ModalContent>
                    <Title>{t('Calendar.selectTime')}</Title>
                    {errorMessage &&
                    <ErrorText>{errorMessage}</ErrorText>}
                    {selectedDate &&
                    <p>{t('Calendar.selectedDate')} {selectedDate.toLocaleDateString()}</p>}
                    <WrapperLabelAndInput>
                        <label htmlFor='start-time'>{t('Calendar.startTime')}</label>
                        <input
                            id='start-time'
                            type='time'
                            value={selectedRange?.start ?? ''}
                            onChange={handleStartChange}
                        />
                    </WrapperLabelAndInput>
                    <WrapperLabelAndInput>
                    <label htmlFor='end-time'>{t('Calendar.endTime')}</label>
                        <input
                            id='end-time'
                            type='time'
                            value={selectedRange?.end ?? ''}
                            onChange={handleEndChange}
                        />
                    </WrapperLabelAndInput>
                    <ModalButtonsWrapper>
                        <CancelButton
                            onClick={handlePopupClose}
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
