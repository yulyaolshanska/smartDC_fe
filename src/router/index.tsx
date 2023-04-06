import React from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route
} from 'react-router-dom';
import ExamplePage2 from '@pages/exmaplePage2';
import ExamplePage from '@pages/examplePage';
import SignUpFirstPage from '@pages/auth/signUpFirstPage';
import SignUpSecondPage from '@pages/auth/signUpSecondPage';

export const PATH = {
  SIGN_UP_FIRST_STEP: "/sign-up/first-step",
  SIGN_UP_SECOND_STEP: "/sign-up/second-step",
  HOME: "/",
  FORM: "/form",
}

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path={PATH.HOME} element={<ExamplePage />} />
      <Route path={PATH.FORM} element={<ExamplePage2 />} />
      <Route path={PATH.SIGN_UP_FIRST_STEP} element={<SignUpFirstPage />} />
      <Route path={PATH.SIGN_UP_SECOND_STEP} element={<SignUpSecondPage />} />
    </Route>
  )
);
