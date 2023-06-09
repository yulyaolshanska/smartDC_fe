export interface DoctorProps {
  id: number;
  firstName: string;
  lastName: string;
  role: string;
  city: string;
  country: string;
  specialization: number;
  photoUrl: string;
}

export interface AvailabilityProps {
  doctor: DoctorProps;
  id: number;
  start: string;
  end: string;
  title: string;
  uuid: string;
}

export interface INotification {
  message: string;
  action: string;
  actionUrl: string;
}
