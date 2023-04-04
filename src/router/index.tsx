import { createBrowserRouter } from 'react-router-dom';
import ExamplePage2 from 'pages/exmaplePage2';
import ExamplePage from '../pages/examplePage';
import RegistrationForm2 from 'components/RegistrationForm2';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <ExamplePage />
  },
  {
    path: '/form',
    element: <ExamplePage2 />
  },
  {
    path: '/reg_form2',
    element: <RegistrationForm2 />
  }
]);
