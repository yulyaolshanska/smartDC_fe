import React, { Suspense } from 'react';
import LoginForm from '@components/Auth/LoginForm';
import Header from '@components/Header';

const Login = () => {
  return (
    <>
      <Header />
      <LoginForm />
    </>
  );
};

export default Login;
