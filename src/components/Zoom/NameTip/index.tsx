import React from 'react';
import { NameTipStyle } from './styles';
import { ReactComponent as ChatIcon } from '@assets/chatIcon.svg';
import { authApi } from 'services/AuthService';

interface isSelfFullScreenProps {
  isSelfFullScreen: boolean;
}

const NameTip = ({ isSelfFullScreen }: isSelfFullScreenProps) => {
  const { data: doctor } = authApi.useGetMeQuery({});
  return (
    //@ts-ignore
    <NameTipStyle isSelfFullScreen={isSelfFullScreen}>
      <p>Dr. Who</p>
    </NameTipStyle>
  );
};

export default NameTip;
