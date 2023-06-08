import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { ToastContainer, toast } from 'react-toastify';
import { authApi } from 'services/AuthService';
import Spinner from '@components/Loaders/Spinner';
import infoIcon from '@assets/Info.svg';
import { InfoWrapper, TextWrapper, Button } from './styles';
import PopupVerificationModal from '@components/VerificationOfEmail/PopupVerificationModal/index'

const VerificationOfEmail = () => {
  const { t } = useTranslation();
  const {
    data: doctor,
    isLoading,
    refetch: doctorRefetch,
  } = authApi.useGetMeQuery({});
  const [reactivationLink] = authApi.useReactivationLinkMutation();
  const [showModal, setShowModal] = useState<boolean>(false);

  useEffect(() => {
    doctorRefetch();
  }, [doctor]);

  const handleSendLink = async () => {
    try {
      await reactivationLink(doctor.id);
      setShowModal(false);
      toast.success(t('Dashboard.notification'), {
        position: toast.POSITION.TOP_CENTER,
      });
    } catch (error) {}
  };

  return (
    <>
      {isLoading ? (
        <Spinner />
      ) : (
        !doctor?.isVerified && (
          <InfoWrapper>
            <TextWrapper>
              <img src={infoIcon} />
              <p>{t('Dashboard.verificationInfo')}</p>
            </TextWrapper>
            <Button onClick={() => setShowModal(true)}>
              {t('Dashboard.details')}
            </Button>
          </InfoWrapper>
        )
      )}
      {showModal && (
        <PopupVerificationModal
          setShowModal={setShowModal}
          handleSendLink={handleSendLink}
          showModal={showModal}
        />
      )}
      <ToastContainer />
    </>
  );
};

export default VerificationOfEmail;
