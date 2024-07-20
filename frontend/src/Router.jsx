import { createBrowserRouter } from 'react-router-dom';
import PageLayout from './components/Layout/PageLayout';
import NotFoundPage from './pages/NotFoundPage/NotFoundPage';

const router = createBrowserRouter([
  {
    path: '',
    element: <PageLayout />,
    errorElement: <NotFoundPage />,
  },
]);

export default router;
