import React from 'react';
import { useTranslation } from 'react-i18next';
import { Control, FieldErrors } from 'react-hook-form';
import CancelBtn from '@components/Appointment/CancelBtn';
import { search } from '@constants/other';
import Spinner from '@components/Loaders/Spinner';
import { ReactComponent as ArrowLeft } from '@assets/arrowLeftIcon.svg';
import useAppointmentSecondStepHook from 'hooks/BookAppointment/useAppointmentSecondStep.hook';
import DoctorItemComponent from '@components/Appointment/BookAppointmentForm/DoctorItem';
import {
  StepWrapper,
  Text,
  FormFooter,
  BntWrapper,
  StepBtn,
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
  LoadMoreBtn,
} from '@components/Appointment/BookAppointmentForm/SecondStep/styles';

interface Props {
  isValid: boolean;
  control: Control;
  errors: FieldErrors;
  setStep: React.Dispatch<React.SetStateAction<boolean>>;
  register: (param: string) => void;
  handleSubmit: (param: string) => void;
  onSubmit: (param: string) => void;
  selectedDate: Date;
  formattedTime: string;
  specialization: number;
}

const SecondStepAppointment = ({
  isValid,
  control,
  errors,
  setStep,
  register,
  handleSubmit,
  onSubmit,
  selectedDate,
  formattedTime,
  specialization 
}: Props) => {
  const { t } = useTranslation();

  const {
    filtered,
    isLoading,
    filter,
    filterName,
    limit,
    handleLoadMore,
    selectedDoctor,
    setSelectedDoctor,
    onPreviuosStepClick,
  } = useAppointmentSecondStepHook({
    selectedDate,
    formattedTime,
    setStep,
    specialization
  });

  return (
    <>
      {!isLoading ? (
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
                  paddingLeft: 52, //Only inline styles have influence(Mui library)
                },
              }}
              fullWidth
              name={search}
              placeholder={t('BookAppointment.search') ?? ''}
              value={filter}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                filterName(event);
              }}
            />
            <SearchIcon />
          </FilterWrapper>
          <TitlesWrapper>
            <TitleItem> {t('BookAppointment.name')} </TitleItem>
            <TitleItem> {t('BookAppointment.speciality')} </TitleItem>
            <TitleItem> {t('BookAppointment.located')} </TitleItem>
          </TitlesWrapper>
          <DoctorsList>
            {!isLoading && filtered.length > 0 ? (
              filtered.map((doc) => (
                <DoctorItemComponent
                  doc={doc}
                  selectedDoctor={selectedDoctor}
                  errors={errors}
                  register={register}
                  control={control}
                  setSelectedDoctor={setSelectedDoctor}
                />
              ))
            ) : (
              <p> {t('BookAppointment.noDoctors')}</p>
            )}
          </DoctorsList>
          {filtered.length >= limit && (
            <LoadMoreBtn onClick={handleLoadMore}>
              {' '}
              {t('BookAppointment.loadMore')}
            </LoadMoreBtn>
          )}
          <FormFooter>
            <BntWrapper>
              <StepBtn onClick={onPreviuosStepClick} disabled={!isValid}>
                <ArrowLeft /> {t('BookAppointment.prevStep')}
              </StepBtn>
              <StepBtn
                type="submit"
                onClick={handleSubmit(onSubmit)}
                disabled={!isValid}
              >
                {t('BookAppointment.confirm')}
              </StepBtn>
            </BntWrapper>
          </FormFooter>
        </>
      ) : (
        <Spinner />
      )}
    </>
  );
};

export default SecondStepAppointment;
