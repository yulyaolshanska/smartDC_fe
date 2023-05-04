import { useTranslation } from 'react-i18next';
import { PATH } from '@router/index';
import {
  CancelBtnSmall,
  CancelIcon,
} from '@components/Appointment/CancelBtn/styles';

function CancelBtn() {
  const { t } = useTranslation();
  return (
    <CancelBtnSmall to={PATH.DASHBOARD}>
      <CancelIcon />
      {t('Patient.cancel') ?? ''}
    </CancelBtnSmall>
  );
}

export default CancelBtn;
