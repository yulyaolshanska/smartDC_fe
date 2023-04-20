import axios from 'axios';
import { API_URLS } from 'api';
import { AuthSignUpDto } from '@auth/auth.api';

export interface CreatePatientDto {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  gender: string;
  country: string;
  city: string;
  birthDate: string;
  address: string;
  timeZone: string;
  overview: string;
}

export const patientAPI = {
  createPatient(data: CreatePatientDto): Promise<CreatePatientDto> {
    return axios
      .post<CreatePatientDto>(API_URLS.createPatient, data)
      .then((res) => res.data)
      .catch((error) => {
        throw error.response.data;
      });
  },
};
