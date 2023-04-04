import React from 'react';
import ExampleComponent from '@components/ExampleComponent';
import { Link } from 'react-router-dom';

const ExamplePage = () => {
  return (
    <div>
      <ExampleComponent />
      <Link to="/form">Go to another page</Link>
    </div>
  );
};

export default ExamplePage;
