export interface Appointment {
  startTime: Date;
  endTime: Date;
  zoomLink: string;
  localDoctor: { id: number };
  remoteDoctor: { id: number };
  patient: { id: number };
  id: number;
}
