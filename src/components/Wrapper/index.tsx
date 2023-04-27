import React from 'react';
import WrapperElement from './styles';

interface WrapperProps {
  children: React.ReactNode;
}

const Wrapper = ({ children }: WrapperProps) => {
  return <WrapperElement>{children}</WrapperElement>;
};
export default Wrapper;
