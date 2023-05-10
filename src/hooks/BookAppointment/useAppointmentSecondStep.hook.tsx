import React, { useState, useEffect } from 'react';
import { ListOfDoctors } from '@constants/mockData';

interface Doctor {
  id: string;
  img: string;
  name: string;
  speciality: string;
  located: string;
  rating: string;
}

const useAppointmentSecondStepHook = () => {
  const [filter, setFilter] = useState(``);
  const [page, setPage] = useState(0);
  const [allDoctors, setAllDoctors] = useState<Doctor[]>([]);

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

  return {
    page,
    filterName,
    handleClickLoadMore,
    filter,
    filtered,
    visibledoctorsLists,
  };
};

export default useAppointmentSecondStepHook;
