import React from 'react';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from 'react-router-dom';
import SignUpFirstStep from '@pages/auth/signUp/signUpFirstStep';
import SignUpSecondStep from '@pages/auth/signUp/signUpSecondStep';
import ResetPassword from '@pages/auth/resetPassword';
import Login from '@pages/auth/login';
import ForgotPassword from '@pages/auth/forgotPassword';
import Confirmation from '@pages/auth/forgotPassword/confirmation';
import Activation from '@pages/auth/signUp/activation';
import TempScheduler from '@pages/tempScheduler';

export const PATH = {
  SIGN_UP: '/auth',
  VERIFICATION: '/auth/activation/:link',
  FORGOT_PASS: '/forgot-pass',
  CONFIRM: '/forgot-pass/confirm',
  RESET_PASS: `/reset-pass/:token`,
  LOGIN: '/',
  DASHBOARD: '/dashboard',
  SCHEDULER: '/scheduler',
};

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path={PATH.SIGN_UP} element={<SignUpFirstStep />} />
      <Route path={PATH.VERIFICATION} element={<Activation />} />
      <Route path={PATH.LOGIN} element={<Login />} />
      <Route path={PATH.FORGOT_PASS} element={<ForgotPassword />} />
      <Route path={PATH.CONFIRM} element={<Confirmation />} />
      <Route path={PATH.RESET_PASS} element={<ResetPassword />} />
      <Route path={PATH.SCHEDULER} element={<TempScheduler />} />
    </Route>
  )
);
