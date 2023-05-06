import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import { ToastContainer, toast } from 'react-toastify';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  CancelButton,
  SendButton,
  ButtonContainer,
} from '@components/general/styles';
import { Form } from '@components/Patient/styles';
import { AppointmentFormValues, IPatient } from '@components/general/type';
import appointmentSchema from '@validation/bookAppointment.validate';
import { PATH } from '@router/index';
import { useNavigate } from 'react-router-dom';
import SpecializationInput from '@components/Appointment/SpecializationSelect';
import Calendar from '@components/Appointment/Calendar';
import AppointmentTime from '@components/Appointment/TimeSelect';

import { patientApi } from 'services/PatientService';
import { Controller } from 'react-hook-form';
import CancelBtn from '@components/Appointment/CancelBtn';

import { Container, TextField } from '@mui/material';

import Input from '@components/Input';
import defaultDoctorPhoto from '@assets/mockDoctorPhoto.png';

import {
  FormWrapper,
  StepWrapper,
  Text,
  CalendarWrapper,
  FormFooter,
  FormInfo,
  BntWrapper,
  StepBtn,
  YouSelected,
  SelectedDayTime,
} from '@components/Appointment/BookAppointmentForm/styles';

import {
  TextWrapper,
  TextAccent,
  FilterWrapper,
  SearchIcon,
  FilterInput,
  TitlesWrapper,
  TitleItem,
  DoctorsList,
  DoctorItem,
  DoctorItemInfo,
  DoctorName,
  DoctorImg,
  LoadMoreBtn,
} from '@components/Appointment/BookAppointmentForm/SecondStep/styles';
import { ReactComponent as ArrowLeft } from '@assets/arrowLeftIcon.svg';

import { ListOfDoctors } from '@constants/mockData';

const SecondStepAppointment = ({
  isValid,
  control,
  errors,
  setStep,
  register,
}) => {
  const { t } = useTranslation();

  //   console.log(ListOfDoctors);
  const [filter, setFilter] = useState(``);
  const [doctors, setDoctors] = useState(ListOfDoctors);
  const [page, setPage] = useState(0);
  const [allDoctors, setAllDoctors] = useState([]);

  let filtered = allDoctors;
  //   при першрму рендері записуємо в список масив із 4 лікарів
  const chunkSize = 4;
  const visibledoctorsLists = Array.from(
    { length: Math.ceil(ListOfDoctors.length / chunkSize) },
    (_, index) =>
      ListOfDoctors.slice(index * chunkSize, (index + 1) * chunkSize)
  );

  useEffect(() => {
    //   deviding the visibledoctors into 4 members list (4 just like an examle for short list at this moment)
    //   створюємо масив з масивами по 4

    setAllDoctors(visibledoctorsLists[0]);
    console.log(allDoctors);
  }, []);

  //   працюємо з фільтрацією по видимому списку
  function filterName(event) {
    setFilter(event.currentTarget.value);
  }

  const filterNormilized = filter.toLowerCase().trim();

  if (allDoctors.length > 0) {
    filtered = allDoctors.filter((doctor) =>
      doctor.name.toLowerCase().includes(filterNormilized)
    );
  }

  //   додавання ще лікарів у стейт
  const handleClickLoadMore = async () => {
    setPage((prev) => (prev += 1));
    console.log(page);
  };

  useEffect(() => {
    if (page !== 0) {
      setAllDoctors((prev) => [...prev, ...visibledoctorsLists[page]]);
    }
  }, [page]);

  return (
    <>
      <StepWrapper>
        <TextWrapper>
          <Text>{t('BookAppointment.stepTwo')}</Text>
          <p>
            {t('BookAppointment.setectDoctor')}{' '}
            <TextAccent>{t('BookAppointment.remoteDoctor')}</TextAccent>
          </p>
        </TextWrapper>
        <CancelBtn />
      </StepWrapper>
      <FilterWrapper>
        <FilterInput
          inputProps={{
            style: {
              paddingLeft: 52,
            },
          }}
          //   control={control}
          fullWidth
          name="search"
          placeholder="Search"
          value={filter}
          onChange={(event) => {
            filterName(event);
          }}
        />
        <SearchIcon />
      </FilterWrapper>

      <TitlesWrapper>
        <TitleItem> {t('BookAppointment.name')} </TitleItem>
        <TitleItem> {t('BookAppointment.speciality')} </TitleItem>
        <TitleItem> {t('BookAppointment.located')} </TitleItem>
        {/* <span> {t('BookAppointment.rating')} </span> */}
      </TitlesWrapper>

      <DoctorsList>
        {filtered.length > 0 ? (
          filtered.map((doc) => (
            <DoctorItem key={doc.id}>
              <DoctorItemInfo>
                <Controller
                  control={control}
                  name="doctor"
                  render={({ field: { value, onChange } }) => (
                    <input
                      {...register('doctor')}
                      type="radio"
                      value={doc.id}
                      onChange={(e) => onChange(e.target.value)}
                    />
                  )}
                />

                <DoctorImg
                  src={defaultDoctorPhoto}
                  alt="doctor"
                  width={32}
                  height={32}
                />
                <DoctorName>{doc.name}</DoctorName>
              </DoctorItemInfo>
              <DoctorItemInfo>{doc.speciality}</DoctorItemInfo>
              <DoctorItemInfo> {doc.located}</DoctorItemInfo>
              {/* <p>{doc.rating}</p> */}
            </DoctorItem>
          ))
        ) : (
          <p> {t('BookAppointment.noDoctors')}</p>
        )}
      </DoctorsList>
      {visibledoctorsLists.length > page + 1 && (
        <LoadMoreBtn onClick={handleClickLoadMore}>
          {' '}
          {t('BookAppointment.loadMore')}
        </LoadMoreBtn>
      )}

      <FormFooter>
        <BntWrapper>
          <StepBtn onClick={() => setStep(true)} disabled={!isValid}>
            <ArrowLeft />
            {' '}
            {t('BookAppointment.prevStep')}
          </StepBtn>
        </BntWrapper>
      </FormFooter>
    </>
  );
};

export default SecondStepAppointment;
