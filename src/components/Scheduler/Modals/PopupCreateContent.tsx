import React from 'react';
import { useTranslation } from 'react-i18next';
import { ISelectedRange } from '..';
import { CancelButton, Input, ModalButtonsWrapper, ModalContainer, ModalContent, ModalOverlay, SaveButton, Title, WrapperLabelAndInput } from './styles';
import { ErrorText } from '../styles';

interface IPopupCreateContentProps {
    selectedDate: Date | undefined;
    selectedRange: ISelectedRange;
    errorMessage: string;
    handleStartChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    handleEndChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    handleSave: () => void;
    setShowCreatePopup: (show: boolean) => void;
    setErrorMessage: (message: string) => void;
}

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
                        <Input
                            id='start-time'
                            type='time'
                            value={selectedRange?.start ?? ''}
                            onChange={handleStartChange}
                        />
                    </WrapperLabelAndInput>
                    <WrapperLabelAndInput>
                    <label htmlFor='end-time'>{t('Calendar.endTime')}</label>
                        <Input
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
                            type='button'
                            value={t('Auth.save') ?? ''}
                        />
                    </ModalButtonsWrapper>
                </ModalContent>
            </ModalContainer>
        </ModalOverlay>
    );
};

export default PopupCreateContent;
