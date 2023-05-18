import React, { useState, useMemo } from 'react';
import { appointmentApi } from 'services/BookAppointmetService';
import { specializations } from '@constants/mockData';

interface Prop {
  selectedDate: Date;
  formattedTime: string;
  setStep: React.Dispatch<React.SetStateAction<boolean>>;
}

const useAppointmentSecondStepHook = ({
  selectedDate,
  formattedTime,
  setStep,
}: Prop) => {
  const [limit, setLimit] = useState<number>(10);
  const [selectedDoctor, setSelectedDoctor] = useState<number | null>(null);
  const [filter, setFilter] = useState<string>(``);

  // reverse time range for sending to backend
  function reverseFormatTimeRange(timeRange: string) {
    const [start, end] = timeRange
      .split('-')
      .map((time: string) => time.trim());

    const startDate = new Date(selectedDate);
    const endDate = new Date(selectedDate);

    startDate.setHours(getHoursFromTime(start));
    startDate.setMinutes(getMinutesFromTime(start));

    endDate.setHours(getHoursFromTime(end));
    endDate.setMinutes(getMinutesFromTime(end));

    return {
      start: startDate.toISOString(),
      end: endDate.toISOString(),
    };
  }

  function getHoursFromTime(time: string) {
    const [hour] = time.split(':');
    const isPM = time.includes('PM');
    let formattedHour = parseInt(hour.trim());

    if (formattedHour === 12) {
      formattedHour = isPM ? formattedHour : 0;
    } else {
      formattedHour = isPM ? formattedHour + 12 : formattedHour;
    }

    const localTimezoneOffset = new Date().getTimezoneOffset() / 60;
    formattedHour -= localTimezoneOffset;
    return formattedHour;
  }

  function getMinutesFromTime(time: string) {
    const [, minutes] = time.split(':');
    return parseInt(minutes.trim());
  }
  const selectedDateTime = reverseFormatTimeRange(formattedTime);

  //   send info to backend
  const { data: doctors, isLoading } =
    appointmentApi.useGetAllAvalibleDoctorsQuery({
      start: selectedDateTime.start,
      end: selectedDateTime.end,
      specialization: 0,
      limit: limit,
    });

  //work with filter input
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

  function getSpecializationLabel(value: number) {
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

  const handleDoctorChange = (
    value: string,
    onChange: (value: string) => void
  ) => {
    setSelectedDoctor(value);
    onChange(value);
  };

  const onPreviuosStepClick = () => {
    setSelectedDoctor(null);
    setStep(false);
  };
  console.log(`selectedDoctor`, selectedDoctor);

  return {
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
    setStep,
  };
};

export default useAppointmentSecondStepHook;
