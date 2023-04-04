import React from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route
} from 'react-router-dom';
import ExamplePage2 from 'src/pages/exmaplePage2';
import ExamplePage from '../pages/examplePage';
import SignUp from '../pages/auth/signUp';

const PATH = {
  SIGN_UP: "/sign-up",
  HOME: "/",
  FORM: "/form"
}

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path={PATH.HOME} element={<ExamplePage />} />
      <Route path={PATH.FORM} element={<ExamplePage2 />} />
      <Route path={PATH.SIGN_UP} element={<SignUp />} />
    </Route>
  )
);
