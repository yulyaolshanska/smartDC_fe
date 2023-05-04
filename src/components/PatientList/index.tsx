import { useTranslation } from 'react-i18next';
import { PatientsList } from './styles';
import PatientCard from '@components/PatientItem';
import { LoadMoreButton } from '@components/general/styles';
import { useGetPatientsQuery } from '../../services/PatientService';
import { useState } from 'react';
import { PATIENTS_PER_PAGE, PATIENTS_PER_LOAD } from '@constants/other';

interface IProps {
  searchValue: string;
}

function PatientList({ searchValue }: IProps) {
  const { t } = useTranslation();
  const { data: patients } = useGetPatientsQuery('');
  const [currentPage] = useState<number>(1);
  const [displayedPatients, setDisplayedPatients] =
    useState<number>(PATIENTS_PER_PAGE);
  const startIndex = (currentPage - 1) * PATIENTS_PER_PAGE;
  const endIndex = displayedPatients;

  const handleLoadMoreClick = () => {
    setDisplayedPatients(displayedPatients + PATIENTS_PER_LOAD);
  };

  const getFilteredPatients = (search: string) => {
    if (search !== ' ') {
      return patients?.filter(
        ({ firstName, lastName }) =>
          firstName.toLowerCase().includes(search.toLowerCase()) ||
          lastName.toLowerCase().includes(search.toLowerCase())
      );
    }
  };

  const filteredPatients = getFilteredPatients(searchValue) || patients;

  return (
    <>
      <PatientsList>
        {filteredPatients?.slice(startIndex, endIndex).map((patient) => (
          <PatientCard
            key={patient.id}
            patient={patient}
            searchValue={searchValue}
          />
        ))}
      </PatientsList>
      {filteredPatients && endIndex < filteredPatients.length && (
        <LoadMoreButton onClick={handleLoadMoreClick}>
          {t('Patients.loadMore')}
        </LoadMoreButton>
      )}
    </>
  );
}

export default PatientList;
