import { useTranslation } from 'react-i18next';
import { PatientsList } from './styles';
import PatientCard from '@components/PatientItem';
import { LoadMoreButton } from '@components/general/styles';

function PatientList() {
  const { t } = useTranslation();

  return (
    <>
      <PatientsList>
        <PatientCard />
      </PatientsList>
      <LoadMoreButton>{t('Patients.loadMore')}</LoadMoreButton>
    </>
  );
}

export default PatientList;
