import React from 'react';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Controller, Control, FieldErrors } from 'react-hook-form';
import CancelBtn from '@components/Appointment/CancelBtn';
import { search, doctor } from '@constants/other';
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
  DoctorItem,
  DoctorItemInfo,
  DoctorName,
  DoctorImg,
  LoadMoreBtn,
} from '@components/Appointment/BookAppointmentForm/SecondStep/styles';
import { ReactComponent as ArrowLeft } from '@assets/arrowLeftIcon.svg';
import defaultDoctorPhoto from '@assets/mockDoctorPhoto.png';
import useAppointmentSecondStepHook from 'hooks/BookAppointment/useAppointmentSecondStep.hook';
import { appointmentApi } from '../../../../services/BookAppointmetService';
import { specialization } from '@constants/auth';


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
  formattedTime
}: Props) => {
  const { t } = useTranslation();

  const {
    page,
    filterName,
    handleClickLoadMore,
    filter,
    filtered,
    visibledoctorsLists,
    selectedDateTime
  } = useAppointmentSecondStepHook({selectedDate, formattedTime});



const { data: allDoctors, isLoading } = appointmentApi.useGetAllAvalibleDoctorsQuery({
    start: selectedDateTime.start,
    end: selectedDateTime.end,
    specialization: 0,
    limit: 10 
});

console.log(`start`, new Date (selectedDateTime.start).toISOString())
console.log(`end`, selectedDateTime.end)



  console.log(`allDoctors`, allDoctors)
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
        {filtered.length > 0 ? (
          filtered.map((doc) => (
            <label htmlFor={doc.id}>
              <DoctorItem key={doc.id}>
                <DoctorItemInfo>
                  <Controller
                    control={control}
                    name="doctor"
                    render={({ field: { onChange } }) => (
                      <input
                        id={doc.id}
                        {...register(`doctor`)}
                        type="radio"
                        value={doc.id}
                        onChange={(e) => onChange(e.target.value)}
                        errors={errors}
                      />
                    )}
                  />
                  <DoctorImg
                    src={defaultDoctorPhoto}
                    alt={doctor}
                    width={32}
                    height={32}
                  />
                  <DoctorName>{doc.name}</DoctorName>
                </DoctorItemInfo>
                <DoctorItemInfo>{doc.speciality}</DoctorItemInfo>
                <DoctorItemInfo> {doc.located}</DoctorItemInfo>
              </DoctorItem>
            </label>
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
          <StepBtn onClick={() => setStep(false)} disabled={!isValid}>
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
  );
};

export default SecondStepAppointment;
