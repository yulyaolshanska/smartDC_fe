import React from "react";
import {
    createBrowserRouter,
    createRoutesFromElements,
    Route
} from 'react-router-dom';
import SignUpFirstStep from '@pages/auth/signUpFirstStep';
import SignUpSecondStep from '@pages/auth/signUpSecondStep';

export const PATH = {
    SIGN_UP_FIRST_STEP: "/sign-up/first-step",
    SIGN_UP_SECOND_STEP: "/sign-up/second-step",
    HOME: "/",
}

export const router = createBrowserRouter(
    createRoutesFromElements(
        <Route>
            <Route path={PATH.SIGN_UP_FIRST_STEP} element={<SignUpFirstStep />} />
            <Route path={PATH.SIGN_UP_SECOND_STEP} element={<SignUpSecondStep />} />
        </Route>
    )
);
