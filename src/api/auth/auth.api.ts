import axios from 'axios';
import { API_URLS } from '../index';

export interface AuthSignUpDto {
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    password: string;
    confirmPassword: string;
    role: string;
    specialization: string;
    gender: string;
    country: string;
    city: string;
    date_of_birth: string;
    address: string;
    timezone: string;
}

export interface AuthSignUpResponseDto {
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    password: string;
    confirmPassword: string;
    role: string;
    specialization: string;
    gender: string;
    country: string;
    city: string;
    date_of_birth: string;
    address: string;
    timezone: string;
}

export const authAPI = {
    signUp({firstName, lastName, email, phoneNumber, password, confirmPassword, role, specialization, gender, country, city, date_of_birth, address, timezone,}: AuthSignUpDto) {

        return axios
            .post<AuthSignUpResponseDto>(API_URLS.signUp, {
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
                date_of_birth,
                address,
                timezone,
            })
            .then((res) => res.data);
    }
};