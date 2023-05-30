import React from 'react';
import PatientCardInfo from '@components/Patient/PatientInfo';
import WeeklyCalendar from '@components/WeeklyCalendar';
import Notes from '@components/Notes';
import GoBackLink from '@components/GoBackLink';

const PatientInfo = () => {
  return (
    <>
      <GoBackLink />
      <PatientCardInfo />
      <WeeklyCalendar />
      <Notes />
    </>
  );
};

export default PatientInfo;
