import React from 'react';
import { NameTipStyle } from './styles';
import { ReactComponent as ChatIcon } from '@assets/chatIcon.svg';
import { authApi } from 'services/AuthService';
import { useTranslation } from 'react-i18next';

interface isSelfFullScreenProps {
  isSelfFullScreen: boolean;
}

const NameTip = ({ isSelfFullScreen }: isSelfFullScreenProps) => {
  const { data: doctor } = authApi.useGetMeQuery({});
  return (
    <NameTipStyle isSelfFullScreen={isSelfFullScreen}>
      <p>{doctor.lastName}</p>
    </NameTipStyle>
  );
};

export default NameTip;
