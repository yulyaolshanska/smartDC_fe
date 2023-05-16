import React, { useEffect, useState, useMemo } from 'react';
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
import { specializations } from '@constants/mockData';

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

  const [avalibelDoctors, setAvalibelDoctors] = useState([]);
  const [limit, setLimit] = useState(10);

  const {
    page,
    // filterName,
    handleClickLoadMore,
    // filter,
    // filtered,
    visibledoctorsLists,
    selectedDateTime,
  } = useAppointmentSecondStepHook({
    selectedDate,
    formattedTime,
    avalibelDoctors,
  });

  const { data: doctors, isLoading } =
    appointmentApi.useGetAllAvalibleDoctorsQuery({
      start: selectedDateTime.start,
      end: selectedDateTime.end,
      specialization: 0,
      limit: limit,
    });

  useEffect(() => {
    setAvalibelDoctors(doctors);
  }, [doctors]);

  console.log(`doctors`, doctors);

  //   filter
  const [filter, setFilter] = useState(``);
  let filtered = doctors;

  function filterName(event: React.ChangeEvent<HTMLInputElement>) {
    setFilter(event.currentTarget.value);
  }

  if (!isLoading && doctors?.length > 0) {
    const filterNormilized = filter.toLowerCase().trim();

    filtered = doctors?.filter(
      (doc) =>
        doc?.doctor.firstName.toLowerCase().includes(filterNormilized) ||
        doc?.doctor.lastName.toLowerCase().includes(filterNormilized)
    );
  }

  //   вибір спеціалізаціі
  function getSpecializationLabel(value) {
    const spec = specializations.find((spec) => spec.value === value);
    return spec ? spec.label : '';
  }
  const memoizedGetSpecializationLabel = useMemo(
    () => getSpecializationLabel,
    []
  );

  function handleLoadMore() {
    setLimit((prev) => prev + 10);
  }
  console.log(`limit`, limit);
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
                        name="doctor"
                        render={({ field: { onChange } }) => (
                          <input
                            id={doc.doctor.id}
                            {...register(`doctor`)}
                            type="radio"
                            value={doc.doctor.id}
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
                      <DoctorName>
                        {doc.doctor.firstName}, {doc.doctor.lastName}
                      </DoctorName>
                    </DoctorItemInfo>
                    {/* <DoctorItemInfo>{doc.doctor.specialization}</DoctorItemInfo> */}
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
      ) : (
        <div>...Loading</div>
      )}
    </>
  );
};

export default SecondStepAppointment;
