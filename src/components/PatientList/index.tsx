import { useTranslation } from 'react-i18next';
import { TFunction } from 'i18next';
import { PatientsList } from './styles';
import PatientCard from '@components/PatientItem';

function PatientList() {
  const { t }: { t: TFunction } = useTranslation();

  return (
    <PatientsList>
      <PatientCard />
    </PatientsList>
  );
}

export default PatientList;
