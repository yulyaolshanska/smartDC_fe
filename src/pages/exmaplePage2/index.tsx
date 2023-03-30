import React from 'react';
import { Link } from 'react-router-dom';
import ExampleForm from 'src/components/ExamapleForm';

const ExamplePage2 = () => {
  const props = [{ value: 1 }, { value: 1 }];
  return (
    <>
      <ExampleForm />
      <Link to="/">Go to another page</Link>
    </>
  );
};

export default ExamplePage2;
