import React from "react";
import { LogoContainer, LogoImg, LogoTitle } from "./styles";
import logo from '../../assets/logo.svg'
import {useTranslation} from "react-i18next";

function Logo() {
  const { t } = useTranslation();

  return (
    <LogoContainer>
      <LogoImg src={logo}/>
      <LogoTitle>{t("Logo.title")}</LogoTitle>
    </LogoContainer>
  );
}
export default Logo;