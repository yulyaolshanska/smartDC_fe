import { createBrowserRouter } from 'react-router-dom';
import ExamplePage2 from 'src/pages/exmaplePage2';
import ExamplePage from '../pages/examplePage';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <ExamplePage />,
  },
  {
    path: '/form',
    element: <ExamplePage2 />,
  },
]);
