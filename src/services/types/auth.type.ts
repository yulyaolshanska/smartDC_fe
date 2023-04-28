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

export interface AuthCheckEmailDto {
  email: string;
}

export interface AuthForgotPasswordDto {
  email: string;
}

export interface AuthResetPasswordDto {
  token: string;
  password: string;
}

export interface AuthLoginDto {
  email: string;
  password: string;
}

export interface AuthActivationDto {
  link: string;
}
