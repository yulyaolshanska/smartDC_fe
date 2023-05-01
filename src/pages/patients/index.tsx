// import PageWrapper from '@components/PageWrapper';

import { AddButton, ArrowBack, Link } from '@components/general/styles';
import { FormValues, ISearch } from '@components/general/type';
import Input from '@components/Input';
import { LinkContainer } from '@components/Patient/styles';
import PatientList from '@components/PatientList';
import { search } from '@constants/patient';
import { PATH } from '@router/index';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Container, Form } from './styles';

function Patients() {
  const { t } = useTranslation();
  const [searchValue, setSearchValue] = useState('');

  const { handleSubmit, control } = useForm<FormValues>({
    mode: 'onChange',
  });
  const onSubmit = (data: ISearch) => {};

  const handleChange = (e: React.FormEvent<HTMLFormElement>) => {
    setSearchValue(e.currentTarget.search.value);
  };

  return (
    <>
      <LinkContainer>
        <Link to={PATH.DASHBOARD}>
          <ArrowBack />
          {t('Dashboard.backToDashboard')}
        </Link>
      </LinkContainer>
      <Container>
        <Form onSubmit={handleSubmit(onSubmit)} onChange={handleChange}>
          <Input
            control={control}
            fullWidth
            name={search}
            placeholder={t('Patients.search') ?? ''}
          />
        </Form>

        <AddButton to={PATH.CREATE_PATIENT_CARD}>
          {t('Patients.createPatient')}
        </AddButton>
      </Container>
      <PatientList searchValue={searchValue} />
    </>
  );
}

export default Patients;
