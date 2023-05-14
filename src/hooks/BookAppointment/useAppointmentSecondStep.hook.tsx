import React, { useState, useEffect } from 'react';
import { ListOfDoctors } from '@constants/mockData';

interface Doctor {
  id: string;
  img: string;
  name: string;
  speciality: string;
  located: string;
  rating: string;
  selectedDate: Date;
  formattedTime: string;
}

const useAppointmentSecondStepHook = ({ selectedDate, formattedTime }) => {
  const [filter, setFilter] = useState(``);
  const [page, setPage] = useState(0);
  const [allDoctors, setAllDoctors] = useState<Doctor[]>([]);

  console.log(`secondHook`, selectedDate);
  let filtered = allDoctors;

  const chunkSize = 10;
  const visibledoctorsLists = Array.from(
    { length: Math.ceil(ListOfDoctors.length / chunkSize) },
    (_, index) =>
      ListOfDoctors.slice(index * chunkSize, (index + 1) * chunkSize)
  );

  useEffect(() => {
    setAllDoctors(visibledoctorsLists[0]);
  }, []);

  function filterName(event: React.ChangeEvent<HTMLInputElement>) {
    setFilter(event.currentTarget.value);
  }

  const filterNormilized = filter.toLowerCase().trim();

  if (allDoctors.length > 0) {
    filtered = allDoctors.filter((doctor) =>
      doctor.name.toLowerCase().includes(filterNormilized)
    );
  }

  const handleClickLoadMore = async () => {
    setPage((prev) => (prev += 1));
  };

  useEffect(() => {
    if (page !== 0) {
      setAllDoctors((prev: Doctor[]) => [
        ...prev,
        ...visibledoctorsLists[page],
      ]);
    }
  }, [page]);

  //   робота з часом і датою
  function reverseFormatTimeRange(timeRange) {
    const [start, end] = timeRange.split('-').map((time) => time.trim());
  
    const startDate = new Date(selectedDate);
    const endDate = new Date(selectedDate);
  
    startDate.setHours(getHoursFromTime(start));
    startDate.setMinutes(getMinutesFromTime(start));
  
    endDate.setHours(getHoursFromTime(end));
    endDate.setMinutes(getMinutesFromTime(end));
  
    return {
      startTime: startDate.toISOString(),
      endTime: endDate.toISOString(),
    };
  }
  
  function getHoursFromTime(time) {
    const [hour] = time.split(':');
    const isPM = time.includes('PM');
    const formattedHour = parseInt(hour.trim());
  
    if (formattedHour === 12) {
      return isPM ? formattedHour : 0;
    } else {
      return isPM ? formattedHour + 12 : formattedHour;
    }
  }
  
  function getMinutesFromTime(time) {
    const [, minutes] = time.split(':');
    return parseInt(minutes.trim());
  }
  const selectedDateTime = reverseFormatTimeRange(formattedTime);
  console.log(selectedDateTime);  

//   console.log(`HOOK`, selectedDateTime.start, selectedDateTime.end)
  return {
    page,
    filterName,
    handleClickLoadMore,
    filter,
    filtered,
    visibledoctorsLists,
    selectedDateTime,
  };
};

export default useAppointmentSecondStepHook;
