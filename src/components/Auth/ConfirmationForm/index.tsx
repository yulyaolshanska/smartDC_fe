import React from 'react';
import {useTranslation} from "react-i18next";
import {
    AuthConfirmationContainer,
    AuthConfirmationImg,
    AuthContainer,
    AuthForm,
    AuthText,
    AuthTitle,
    Form,
} from '@components/Auth/styles';
import checkmark from "@assets/auth/checkmark.svg";

function ConfirmationForm() {
    const { t } = useTranslation();

    return (
        <AuthContainer>
            <AuthForm>
                <Form>
                    <AuthConfirmationContainer>
                        <AuthConfirmationImg src={checkmark}/>
                    </AuthConfirmationContainer>
                    <AuthText>{t("Auth.confirmationText")}</AuthText>
                </Form>
            </AuthForm>
        </AuthContainer>
    );
}

export default ConfirmationForm;