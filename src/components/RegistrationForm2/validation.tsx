import * as Yup from 'yup';

  export const validationSchema = Yup.object().shape({
    role: Yup.string().required('Role is required'),
    specialization: Yup.string().required('Specialization is required'),
    gender: Yup.string().required('Gender is required'),
    date_of_birth: Yup.string().required('Date of birth is required'),
    country: Yup.string().required('Country is required'),
    city: Yup.string().required('City is required'),
    address: Yup.string().required('Address is required'),
    timezone: Yup.string().required('Timezone is required')
  });
