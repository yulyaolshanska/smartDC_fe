export interface ISignUpFirstStep {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  password: string;
  confirmPassword: string;
}
export interface ISignUpSecondStep extends ISignUpFirstStep{
  role: string;
  specialization: string;
  gender: string;
  country: string;
  city: string;
  date_of_birth: string;
  address: string;
  time_zone: string;
}
export interface ISignUp extends ISignUpSecondStep{
  isLoading?: boolean;
  token?:string;
  error?:string | null;
}


export interface IResponse {
  error: string;
}

export type Option = {
  value: string;
};

