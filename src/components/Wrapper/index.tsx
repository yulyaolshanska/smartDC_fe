import React from 'react';
import { WrapperElement } from '@components/Wrapper/styles';
import { useTranslation } from 'react-i18next';

interface WrapperProps {
  children: React.ReactNode;
}

const Wrapper = ({ children }: WrapperProps) => {
  const { t } = useTranslation();

  return <WrapperElement>{children}</WrapperElement>;
};
export default Wrapper;
