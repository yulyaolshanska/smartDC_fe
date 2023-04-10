import React from "react";
import {
    createBrowserRouter,
    createRoutesFromElements,
    Route
} from 'react-router-dom';

import SignUpFirstStep from '@pages/auth/signUpFirstStep';
import SignUpSecondStep from '@pages/auth/signUpSecondStep';
import ResetPassword from "@pages/auth/resetPassword";
import Login from "@pages/auth/login";

export const PATH = {
    SIGN_UP_FIRST_STEP: "/sign-up/first-step",
    SIGN_UP_SECOND_STEP: "/sign-up/second-step",
    RESET_PASS: "/reset-pass",
    LOGIN: "/login",
    HOME: "/",
}

export const router = createBrowserRouter(
    createRoutesFromElements(
        <Route>
            <Route path={PATH.SIGN_UP_FIRST_STEP} element={<SignUpFirstStep />} />
            <Route path={PATH.SIGN_UP_SECOND_STEP} element={<SignUpSecondStep />} />
            <Route path={PATH.LOGIN} element={<Login />} />
            <Route path={PATH.RESET_PASS} element={<ResetPassword />} />
        </Route>
    )
);
