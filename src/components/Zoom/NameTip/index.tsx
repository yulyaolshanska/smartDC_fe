import React from 'react';
import { NameTipStyle } from './styles';
import { ReactComponent as ChatIcon } from '@assets/chatIcon.svg';
import { authApi } from 'services/AuthService';

const NameTip = ({ isSelfFullScreen }) => {
  const { data: doctor } = authApi.useGetMeQuery({});
  return (
    <NameTipStyle isSelfFullScreen={isSelfFullScreen}>
      <p>Dr. Who</p>
    </NameTipStyle>
  );
};

export default NameTip;
