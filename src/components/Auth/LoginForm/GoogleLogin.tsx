import React from 'react';
import { useGoogleLogin } from "@react-oauth/google";
import { AuthGoogleContainer, GoogleImg, GoogleText } from "../styles";
import { useTranslation } from "react-i18next";
import google from '@assets/auth/google.svg'

function GoogleLoginButton() {
    const { t } = useTranslation();
    const login = useGoogleLogin({});
  
    return (
        <AuthGoogleContainer onClick={() => login()}>
            <GoogleImg src={google}/>
            <GoogleText>{t("Auth.continueWithGoogle")}</GoogleText>
        </AuthGoogleContainer>
    );
}

export default GoogleLoginButton;