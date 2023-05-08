import { useTranslation } from 'react-i18next';
import { PATH } from '@router/index';
import {
  CancelBtnSmall,
  CancelIcon,
} from '@components/Appointment/CancelBtn/styles';

function CancelBtn() {
  const { t } = useTranslation();
  return (
    <CancelBtnSmall to={PATH.PATIENT_CARD_INFO}>
      <CancelIcon />
      {t('Patient.cancel') ?? ''}
    </CancelBtnSmall>
  );
}

export default CancelBtn;
