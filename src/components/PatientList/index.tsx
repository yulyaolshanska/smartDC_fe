import { useTranslation } from 'react-i18next';
import { PatientsList } from './styles';
import PatientCard from '@components/PatientItem';
import { LoadMoreButton } from '@components/general/styles';
import { useGetPatientsQuery } from '../../services/PatientService';

function PatientList() {
  const { t } = useTranslation();
  const { data: patients } = useGetPatientsQuery('');

  return (
    <>
      <PatientsList>
        {/* {patients?.map((patient) => ( */}
        <PatientCard />
        {/* ))} */}
      </PatientsList>
      <LoadMoreButton>{t('Patients.loadMore')}</LoadMoreButton>
    </>
  );
}

export default PatientList;
