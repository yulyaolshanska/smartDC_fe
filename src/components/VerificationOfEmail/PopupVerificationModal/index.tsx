import { useTranslation } from 'react-i18next';
import { useEffect } from 'react';
import {
  CancelButton,
  ModalButtonsWrapper,
  ModalContainer,
  ModalContent,
  ModalOverlay,
  SendButton,
  Title,
} from './styles';

interface Props {
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  handleSendLink: () => void;
  showModal: boolean;
}

const PopupVerificationModal = ({
  setShowModal,
  handleSendLink,
  showModal,
}: Props) => {
  const { t } = useTranslation();
  const tWithDefault = (key: string) => {
    const translation = t(key);
    return translation || '';
  };

  useEffect(() => {
    window.addEventListener('keydown', handlerKeyDown);
    function handlerKeyDown(e: React.KeyboardEvent<HTMLDivElement>) {
      if (e.code === 'Escape') {
        setShowModal(false);
      }
    }
    return () => {
      window.removeEventListener('keydown', handlerKeyDown);
    };
  }, [showModal]);

  function onCloseOverlay(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    if (e.target === e.currentTarget) {
      setShowModal(false);
    }
  }

  return (
    <ModalOverlay onClick={(e) => onCloseOverlay(e)}>
      <ModalContainer>
        <ModalContent>
          <Title>{t('Dashboard.receivedVerInfo')}</Title>
          <ModalButtonsWrapper>
            <CancelButton
              onClick={() => setShowModal(false)}
              type="button"
              value={tWithDefault('Dashboard.close')}
            />
            <SendButton
              onClick={handleSendLink}
              disabled={false}
              type="button"
              value={tWithDefault('Dashboard.sendAgain')}
            />
          </ModalButtonsWrapper>
        </ModalContent>
      </ModalContainer>
    </ModalOverlay>
  );
};

export default PopupVerificationModal;
