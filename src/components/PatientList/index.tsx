import { useTranslation } from 'react-i18next';
import { NotFound, PatientsList } from './styles';
import PatientCard from '@components/PatientItem';
import { LoadMoreButton } from '@components/general/styles';
import {
  useGetAllPatientsQuery,
  useGetPatientsForRemoteQuery,
} from 'services/PatientService';
import { useState } from 'react';
import { PATIENTS_PER_PAGE, PATIENTS_PER_LOAD } from '@constants/other';
import { useAppSelector } from '@redux/hooks';
import { IPatient } from '@components/general/type';

interface IProps {
  searchValue: string;
}

function PatientList({ searchValue }: IProps) {
  const { t } = useTranslation();
  const doctorData = useAppSelector((state) => state.doctorReducer);
  const { data: allPatients } = useGetAllPatientsQuery('');
  const { data: patientsForRemote } = useGetPatientsForRemoteQuery(
    doctorData.id
  );
  const [currentPage] = useState<number>(1);
  const [displayedPatients, setDisplayedPatients] =
    useState<number>(PATIENTS_PER_PAGE);
  const startIndex = (currentPage - 1) * PATIENTS_PER_PAGE;
  const endIndex = displayedPatients;

  const handleLoadMoreClick = () => {
    setDisplayedPatients(displayedPatients + PATIENTS_PER_LOAD);
  };

  const getFilteredPatients = (search: string, patients?: IPatient[]) => {
    if (search.trim() !== '') {
      return (patients || []).filter(
        ({ firstName, lastName }) =>
          firstName.toLowerCase().includes(search.toLowerCase()) ||
          lastName.toLowerCase().includes(search.toLowerCase())
      );
    }
    return patients || [];
  };

  const patients =
    doctorData.role === 'Local' ? allPatients : patientsForRemote;
  const filteredPatients = getFilteredPatients(searchValue, patients) || [];

  return (
    <>
      {filteredPatients.length ? (
        <PatientsList>
          {filteredPatients?.slice(startIndex, endIndex).map((patient) => (
            <PatientCard
              key={patient.id}
              patient={patient}
              searchValue={searchValue}
            />
          ))}
        </PatientsList>
      ) : (
        <NotFound>{`${t('Patients.PatientWithName')} "${searchValue}" ${t(
          'Patients.notFound'
        )}.`}</NotFound>
      )}

      {filteredPatients && endIndex < filteredPatients.length && (
        <LoadMoreButton onClick={handleLoadMoreClick}>
          {t('Patients.loadMore')}
        </LoadMoreButton>
      )}
    </>
  );
}

export default PatientList;
