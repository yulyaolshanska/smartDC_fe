import { useTranslation } from 'react-i18next';
import { PatientsList } from './styles';
import PatientCard from '@components/PatientItem';
import { LoadMoreButton } from '@components/general/styles';
import { useGetPatientsQuery } from '../../services/PatientService';
import { useState } from 'react';

const TWEETS_PER_PAGE = 30;
const TWEETS_PER_LOAD = 10;

interface IProps {
  searchValue: string;
}

function PatientList({ searchValue }: IProps) {
  const { t } = useTranslation();
  const { data: patients } = useGetPatientsQuery('');
  const [currentPage] = useState(1);
  const [displayedTweets, setDisplayedTweets] = useState(TWEETS_PER_PAGE);
  const startIndex = (currentPage - 1) * TWEETS_PER_PAGE;
  const endIndex = displayedTweets;

  const handleLoadMoreClick = () => {
    setDisplayedTweets(displayedTweets + TWEETS_PER_LOAD);
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
