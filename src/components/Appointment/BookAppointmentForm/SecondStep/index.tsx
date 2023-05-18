import React from 'react';
import { useTranslation } from 'react-i18next';
import { Controller, Control, FieldErrors } from 'react-hook-form';
import CancelBtn from '@components/Appointment/CancelBtn';
import { search, doctor } from '@constants/other';
import Spinner from '@components/Loaders/Spinner';
import { ReactComponent as ArrowLeft } from '@assets/arrowLeftIcon.svg';
import defaultDoctorPhoto from '@assets/mockDoctorPhoto.png';
import useAppointmentSecondStepHook from 'hooks/BookAppointment/useAppointmentSecondStep.hook';
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
  formattedTime,
}: Props) => {
  const { t } = useTranslation();

  const {
    filtered,
    isLoading,
    filter,
    filterName,
    limit,
    memoizedGetSpecializationLabel,
    handleLoadMore,
    handleDoctorChange,
    selectedDoctor,
    onPreviuosStepClick,
  } = useAppointmentSecondStepHook({
    selectedDate,
    formattedTime,
    setStep,
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
                <label htmlFor={doc.doctor.id}>
                  <DoctorItem key={doc.doctor.id}>
                    <DoctorItemInfo>
                      <Controller
                        control={control}
                        name={doctor}
                        render={({ field: { onChange } }) => (
                          <input
                            id={doc.doctor.id}
                            {...register(`${doctor}`)}
                            type="radio"
                            value={doc.doctor.id}
                            checked={selectedDoctor == doc.doctor.id}
                            onChange={(e) =>
                              handleDoctorChange(e.target.value, onChange!)
                            }
                            errors={errors}
                          />
                        )}
                      />
                      {doc.doctor.photoUrl ? (
                        <DoctorImg
                          src={doc.doctor.photoUrl}
                          alt={doctor}
                          width={32}
                          height={32}
                        />
                      ) : (
                        <DoctorImg
                          src={defaultDoctorPhoto}
                          alt={doctor}
                          width={32}
                          height={32}
                        />
                      )}

                      <DoctorName>
                        {doc.doctor.firstName}, {doc.doctor.lastName}
                      </DoctorName>
                    </DoctorItemInfo>

                    <DoctorItemInfo>
                      {memoizedGetSpecializationLabel(
                        doc.doctor.specialization
                      )}
                    </DoctorItemInfo>
                    <DoctorItemInfo>
                      {' '}
                      {doc.doctor.city}, {doc.doctor.country}
                    </DoctorItemInfo>
                  </DoctorItem>
                </label>
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
