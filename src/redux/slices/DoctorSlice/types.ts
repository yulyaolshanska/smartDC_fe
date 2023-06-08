export default interface DoctorInitialState {
  address?: string;
  birthDate?: string;
  city?: string;
  country?: string;
  email?: string;
  firstName?: string;
  gender?: string;
  id: number;
  isVerified?: boolean;
  lastName?: string;
  phoneNumber?: string;
  photoUrl?: string;
  role?: string;
  specialization?: number;
  timeZone?: string;
  availabilities?: null | string;
}
