import * as yup from 'yup';

const NAME_PATTERN = /^([A-Z][a-z]{1,11})/;
const PASSWORD_PATTERN = /^(?=.*[a-z])(?=.*[A-Z])(?=.{10,})/;

export const signUpSchema = yup.object().shape({

address:yup
.string()
.required('Field is required'),
 city:yup.string() 
.required('Field is required'),
  country:yup
  .string() 
  .required('Field is required'),
  gender:yup
  .string()
  .required('Field is required'),
  specialization:yup
  .string()
  .required('Field is required'),
  role:yup
  .string()
  .required('Field is required'),
  time_zone:yup
  .string()
  .required('Field is required'),
});
