import React from 'react';
import { Route, Routes } from 'react-router-dom';
import SignUpFirstStep from '@pages/auth/signUp/signUpFirstStep';
import SignUpSecondFormGoogle from '@components/Auth/SignUpForm/SignUpSecondStepFormGoogle';
import ResetPassword from '@pages/auth/resetPassword';
import Login from '@pages/auth/login';
import ForgotPassword from '@pages/auth/forgotPassword';
import Confirmation from '@pages/auth/forgotPassword/confirmation';
import Profile from '@pages/doctor/profile';
import PageWrapper from '@components/PageWrapper';
import Help from '@pages/help';
import Activation from '@pages/auth/signUp/activation';
import PatientPage from '@pages/patient';
import CreatePatientCard from '@pages/patient/createPatientCard';
import EditPatientCard from '@pages/patient/EditPatientCard';

// import TempScheduler from '@pages/tempScheduler';
import NotFound from '@pages/notFound';
import DoctorScheduler from '@pages/doctorScheduler';
import ProtectedRoute from './protected-route';
import PatientInfo from '@pages/patient/patientInfo';

export const PATH = {
  SIGN_UP: '/auth',
  VERIFICATION: '/auth/activation/:link',
  SIGN_UP_SECOND_STEP_GOOGLE: '/sign-up/second-step/google',
  FORGOT_PASS: '/forgot-pass',
  CONFIRM: '/forgot-pass/confirm',
  RESET_PASS: '/reset-pass/:token',
  LOGIN: '/',
  EDIT_DOCTOR_PROFILE: '/edit-doctor-profile',
  HELP: '/help',
  DASHBOARD: '/dashboard',
  CREATE_PATIENT_CARD: '/create-patient-card',
  EDIT_PATIENT_CARD: '/edit-patient-card',
  AVAILABILITY: '/availability',
  PATIENT_CARD_INFO: '/patient',
  PATIENT: '/patients',
};

const AppRouter = () => {
  return (
    <PageWrapper>
      <Routes>
        {/* Public Routes */}
        <Route path={PATH.SIGN_UP} element={<SignUpFirstStep />} />
        <Route path={PATH.VERIFICATION} element={<Activation />} />
        <Route path={PATH.LOGIN} element={<Login />} />
        <Route path={PATH.RESET_PASS} element={<ResetPassword />} />
        <Route path={PATH.FORGOT_PASS} element={<ForgotPassword />} />
        <Route path={PATH.CONFIRM} element={<Confirmation />} />

        {/* Private Routes */}
        <Route
          path={PATH.SIGN_UP_SECOND_STEP_GOOGLE}
          element={
            <ProtectedRoute allowedRoles={['']}>
              <SignUpSecondFormGoogle />
            </ProtectedRoute>
          }
        />
        <Route
          path={PATH.CREATE_PATIENT_CARD}
          element={
            <ProtectedRoute allowedRoles={['Remote', 'Local']}>
              <CreatePatientCard />
            </ProtectedRoute>
          }
        />
        <Route
          path={PATH.EDIT_PATIENT_CARD}
          element={
            <ProtectedRoute allowedRoles={['Remote', 'Local']}>
              <EditPatientCard />
            </ProtectedRoute>
          }
        /
        <Route
          path={PATH.EDIT_DOCTOR_PROFILE}
          element={
            <ProtectedRoute allowedRoles={['Remote', 'Local']}>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path={PATH.HELP}
          element={
            <ProtectedRoute allowedRoles={['Remote', 'Local']}>
              <Help />
            </ProtectedRoute>
          }
        />

        <Route
          path={PATH.DASHBOARD}
          element={
            <ProtectedRoute allowedRoles={['Remote', 'Local']}>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path={PATH.AVAILABILITY}
          element={
            <ProtectedRoute allowedRoles={['Remote']}>
              <DoctorScheduler />
            </ProtectedRoute>
          }
        />
        <Route
          path={PATH.PATIENT_CARD_INFO}
          element={
            <ProtectedRoute allowedRoles={['Remote', 'Local']}>
              <PatientInfo />
            </ProtectedRoute>
          }
        />
<<<<<<< HEAD
        <Route path={PATH.PATIENT} element={<PatientPage />} />
=======

>>>>>>> aff26228e9d278823c4b016a9a19f436df6a3318
        <Route path={PATH.FORGOT_PASS} element={<ForgotPassword />} />
        <Route path={PATH.CONFIRM} element={<Confirmation />} />
        <Route path={PATH.EDIT_DOCTOR_PROFILE} element={<Profile />} />
        <Route path={PATH.HELP} element={<Help />} />
        <Route path={PATH.DASHBOARD} element={<Profile />} />
        {/* <Route path={PATH.SCHEDULER} element={<TempScheduler />} /> */}
<<<<<<< HEAD
=======
        <Route path="*" element={<NotFound />} />
>>>>>>> aff26228e9d278823c4b016a9a19f436df6a3318
      </Routes>
    </PageWrapper>
  );
};

export default AppRouter;
