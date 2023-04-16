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

export const PATH = {
  SIGN_UP_FIRST_STEP: '/sign-up/first-step',
  SIGN_UP_SECOND_STEP: '/sign-up/second-step',
  FORGOT_PASS: '/forgot-pass',
  CONFIRM: '/forgot-pass/confirm',
  RESET_PASS: `/reset-pass/:token`,
  LOGIN: '/login',
  HOME: '/',
};

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path={PATH.SIGN_UP_FIRST_STEP} element={<SignUpFirstStep />} />
      <Route path={PATH.SIGN_UP_SECOND_STEP} element={<SignUpSecondStep />} />
      <Route path={PATH.LOGIN} element={<Login />} />
      <Route path={PATH.FORGOT_PASS} element={<ForgotPassword />} />
      <Route path={PATH.CONFIRM} element={<Confirmation />} />
      <Route path={PATH.RESET_PASS} element={<ResetPassword />} />
    </Route>
  )
);
