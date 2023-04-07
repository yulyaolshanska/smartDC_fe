import React from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route
} from 'react-router-dom';
import ExamplePage2 from '@pages/exmaplePage2';
import ExamplePage from '@pages/examplePage';
import SignUp from '@pages/auth/signUp';
import SignUp2 from '@pages/auth/signUp2';

const PATH = {
  SIGN_UP: "/sign-up",
  SIGN_UP_2: "/sign-up_2",
  FORGOT_PASSWORD: "/forgot-password",
  HOME: "/",
  FORM: "/form",
  RESET_PASS: "/reset-pass",
}

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path={PATH.HOME} element={<ExamplePage />} />
      <Route path={PATH.FORM} element={<ExamplePage2 />} />
      <Route path={PATH.SIGN_UP} element={<SignUp />} />
      <Route path={PATH.SIGN_UP_2} element={<SignUp2 />} />
    </Route>
  )
);
