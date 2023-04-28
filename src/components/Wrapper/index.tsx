import React from 'react';
import {
  ArrowBack,
  LinkContainer,
  WrapperElement,
} from '@components/Wrapper/styles';
import { PATH } from '@router/index';
import { Link } from '@components/general/styles';
import { useTranslation } from 'react-i18next';

interface WrapperProps {
  children: React.ReactNode;
}

const Wrapper = ({ children }: WrapperProps) => {
  const { t } = useTranslation();

  return <WrapperElement>{children}</WrapperElement>;
};
export default Wrapper;
