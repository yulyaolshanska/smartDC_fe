import { IPatient } from '@components/general/type';

const millisecondsPerSecond = 1000;
const secondsPerMinute = 60;
const minutesPerHour = 60;
const hoursPerDay = 24;
const daysPerYear = 365;

const getPatientAge = (patient: IPatient): number => {
  const birthdate = new Date(patient.birthDate);
  const today = new Date();
  const diffTime = Number(today) - Number(birthdate);
  return Math.floor(
    diffTime /
      (millisecondsPerSecond *
        secondsPerMinute *
        minutesPerHour *
        hoursPerDay *
        daysPerYear)
  );
};

export default getPatientAge;
