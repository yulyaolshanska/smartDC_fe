import React from 'react';
import SimpleButton from './styles';

interface CustomButtonInterface {
  disabled?: boolean;
  type?: string;
  children: string | string[];
}

const CustomButton = ({ disabled, children }: CustomButtonInterface) => {
  return <SimpleButton disabled={disabled}>{children} </SimpleButton>;
};

export default CustomButton;
