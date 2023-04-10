import axios from 'axios';
import { API_URLS } from 'api';

export interface AuthSignUpDto {
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    password: string;
    confirmPassword: string;
    role: string;
    specialization: number;
    gender: string;
    country: string;
    city: string;
    birthDate: string;
    address: string;
    timeZone: string;
}

export const authAPI = {
    signUp({firstName, lastName, email, phoneNumber, password, confirmPassword, role, specialization, gender, country, city, birthDate, address, timeZone,}: AuthSignUpDto) {
        return axios
            .post<AuthSignUpDto>(API_URLS.signUp, {
                firstName ,
                lastName ,
                email,
                phoneNumber,
                password,
                confirmPassword,
                role,
                specialization,
                gender,
                country,
                city,
                birthDate,
                address,
                timeZone
            })
            .then((res) => res.data);
    }
};