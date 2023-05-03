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
import CreatePatientCard from '@pages/patient/createPatientCard';
import EditPatientCard from '@pages/patient/EditPatientCard';
import TempScheduler from '@pages/tempScheduler';
import NotFound from '@pages/notFound';

import CreateAppointment from "@pages/appointment"

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
  SCHEDULER: '/scheduler',
  APPOINTMENT: '/book-appointment'

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
        <Route
          path={PATH.CREATE_PATIENT_CARD}
          element={<CreatePatientCard />}
        />
          <Route
          path={PATH.EDIT_PATIENT_CARD}
          element={<EditPatientCard />}
        />

        {/* Private Routes */}
        <Route
          path={PATH.SIGN_UP_SECOND_STEP_GOOGLE}
          element={<SignUpSecondFormGoogle />}
        />
        <Route path={PATH.FORGOT_PASS} element={<ForgotPassword />} />
        <Route path={PATH.CONFIRM} element={<Confirmation />} />
        <Route path={PATH.EDIT_DOCTOR_PROFILE} element={<Profile />} />
        <Route path={PATH.HELP} element={<Help />} />
        <Route path={PATH.DASHBOARD} element={<Profile />} />
        <Route path={PATH.SCHEDULER} element={<TempScheduler />} />
        <Route path="*" element={<NotFound />} />
        <Route path={PATH.APPOINTMENT} element={<CreateAppointment />} />
      </Routes>
    </PageWrapper>
  );
};

export default AppRouter;
