import { IPatient } from '@components/general/type';

export interface Appointment {
  id: string;
  startTime: string;
  endTime: string;
  patient: IPatient;
  localDoctor: IDoctor;
  remoteDoctor: IDoctor;
  zoomLink: string;
}

export interface IDoctor {
  id: string;
  firstName: string;
  lastName: string;
}
