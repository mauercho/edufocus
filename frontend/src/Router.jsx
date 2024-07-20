import { createBrowserRouter } from 'react-router-dom';
import PageLayout from './components/Layout/PageLayout';
import { HomePage } from './pages/HomePage';
import { NotFoundPage } from './pages/NotFoundPage';

const router = createBrowserRouter([
  {
    path: '',
    element: <PageLayout />,
    errorElement: <NotFoundPage />,
    children: [
      {
        index: true,
        path: '',
        element: <HomePage />,
      },
    ],
  },
]);

export default router;
