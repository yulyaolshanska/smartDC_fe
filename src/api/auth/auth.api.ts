import axios from 'axios';
import { API_URLS } from 'api';

export interface AuthLoginDto {
    email: string;
    password: string;
}

export const authAPI = {
    login({email, password}: AuthLoginDto) {
        return axios
            .post<AuthLoginDto>(API_URLS.login, {
                email,
                password,
            })
            .then((res) => res.data);
    }
};