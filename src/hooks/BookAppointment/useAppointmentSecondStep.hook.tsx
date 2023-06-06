import React, { useState, useMemo } from 'react';
import { appointmentApi } from 'services/AppointmentService';
import { reverseFormatTimeRange } from 'utils/functions/timeUtils';

interface Prop {
  selectedDate: Date;
  formattedTime: string;
  setStep: React.Dispatch<React.SetStateAction<boolean>>;
  specialization: number;
}

const useAppointmentSecondStepHook = ({
  selectedDate,
  formattedTime,
  setStep,
  specialization,
}: Prop) => {
  const [limit, setLimit] = useState<number>(10);
  const [selectedDoctor, setSelectedDoctor] = useState<number | null>(null);
  const [filter, setFilter] = useState<string>(``);

  const selectedDateTime = useMemo(
    () => reverseFormatTimeRange(formattedTime, selectedDate),
    [formattedTime]
  );

  //   send info to backend
  const { data: doctors, isLoading } =
    appointmentApi.useGetAllAvalibleDoctorsQuery({
      start: selectedDateTime.start,
      end: selectedDateTime.end,
      specialization: specialization,
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

  function handleLoadMore() {
    setLimit((prev) => prev + 10);
  }

  const onPreviuosStepClick = () => {
    setSelectedDoctor(null);
    setStep(false);
  };

  return {
    filtered,
    isLoading,
    filter,
    filterName,
    limit,
    handleLoadMore,
    selectedDoctor,
    setSelectedDoctor,
    onPreviuosStepClick,
    setStep,
  };
};

export default useAppointmentSecondStepHook;
