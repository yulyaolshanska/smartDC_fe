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
  avalibelDoctors: any;
}

const useAppointmentSecondStepHook = ({
  selectedDate,
  formattedTime,
  avalibelDoctors,
}) => {
  const [filter, setFilter] = useState(``);
  const [page, setPage] = useState(0);
  const [allDoctors, setAllDoctors] = useState<Doctor[]>(avalibelDoctors || []);

//   console.log(`allDoctors`, avalibelDoctors);

//   let filtered = allDoctors;

//   const chunkSize = 10;
//   const visibledoctorsLists = Array.from(
//     { length: Math.ceil(ListOfDoctors.length / chunkSize) },
//     (_, index) =>
//       ListOfDoctors.slice(index * chunkSize, (index + 1) * chunkSize)
//   );

//   useEffect(() => {
//     setAllDoctors(visibledoctorsLists[0]);
//   }, []);

//   function filterName(event: React.ChangeEvent<HTMLInputElement>) {
//     setFilter(event.currentTarget.value);
//   }

//   const filterNormilized = filter.toLowerCase().trim();

//   if (allDoctors.length > 0) {
//     filtered = allDoctors.filter((doctor) =>
//       doctor.name.toLowerCase().includes(filterNormilized)
//     );
//   }

//   const handleClickLoadMore = async () => {
//     setPage((prev) => (prev += 1));
//   };

//   useEffect(() => {
//     if (page !== 0) {
//       setAllDoctors((prev: Doctor[]) => [
//         ...prev,
//         ...visibledoctorsLists[page],
//       ]);
//     }
//   }, [page]);

  //   робота з часом і датою
  function reverseFormatTimeRange(timeRange: string) {
    const [start, end] = timeRange.split('-').map((time: string) => time.trim());

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

  function getHoursFromTime(time:string) {
    const [hour] = time.split(':');
    const isPM = time.includes('PM');
    let formattedHour = parseInt(hour.trim());

    if (formattedHour === 12) {
      formattedHour = isPM ? formattedHour : 0;
    } else {
      formattedHour = isPM ? formattedHour + 12 : formattedHour;
    }

    // Отримання локального часового поясу
    const localTimezoneOffset = new Date().getTimezoneOffset() / 60;
    formattedHour -= localTimezoneOffset;

    return formattedHour;
  }

  function getMinutesFromTime(time: string) {
    const [, minutes] = time.split(':');
    return parseInt(minutes.trim());
  }
  const selectedDateTime = reverseFormatTimeRange(formattedTime);


  return {
    page,
    // filterName,
    // handleClickLoadMore,
    // filter,
    // filtered,
    // visibledoctorsLists,
    selectedDateTime,
  };
};

export default useAppointmentSecondStepHook;
