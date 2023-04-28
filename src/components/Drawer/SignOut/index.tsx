import React, { useState } from 'react';
import { CancelButton, SendButton, ModalButtonsWrapper, ModalContainer, ModalContent, ModalOverlay, Title } from './styles';

interface IModal {
    confirmText: string;
    cancelTest: string;
    title: string;
    handleSubmitModal: () => void;
    handleCancelModal: () => void;
}

function LogoutModal({confirmText, cancelTest, title, handleSubmitModal, handleCancelModal}: IModal) {
  return (
    <>
        <ModalOverlay>
            <ModalContainer>
                <ModalContent>
                    <Title>{title}</Title>
                    <ModalButtonsWrapper>
                        <CancelButton 
                            disabled={false}
                            type='button'
                            value={cancelTest}
                            onClick={handleCancelModal}/>
                        <SendButton 
                            disabled={false}
                            type='button'
                            value={confirmText}
                            onClick={handleSubmitModal}/>
                    </ModalButtonsWrapper>
                </ModalContent>
            </ModalContainer>
        </ModalOverlay>
    </>
  );
}

export default LogoutModal;