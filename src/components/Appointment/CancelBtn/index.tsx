import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';

import {
  CancelBtnSmall,
  CancelIcon,
} from '@components/Appointment/CancelBtn/styles';

function CancelBtn() {
  const { t } = useTranslation();
  const { id: patientId } = useParams();

  return (
    <CancelBtnSmall to={`/patient/${patientId}`}>
      <CancelIcon />
      {t('Patient.cancel') ?? ''}
    </CancelBtnSmall>
  );
}

export default CancelBtn;
