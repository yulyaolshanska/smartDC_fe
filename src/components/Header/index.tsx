import React from "react";
import { HeaderContainer, LinkToLogin } from "@components/Header/styles";
import Logo from "@components/Logo";
import {PATH} from "@router/index";

function Header() {

    return (
        <HeaderContainer>
                <LinkToLogin to={PATH.LOGIN}>
                    <Logo/>
                </LinkToLogin>
        </HeaderContainer>
    );
}
export default Header;