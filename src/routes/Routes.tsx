import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { Layout } from '@/pages/Layout';
import { Home } from '@/pages/Home';
import { UnControlForm } from '@/pages/UnControlForm';
import { NotFoundPage } from '@/pages/NotFoundPage';
import { ControlForm } from '@/pages/ControlForm';
import { RoutePaths } from './routes.enum';

const routes = [
  {
    path: RoutePaths.HOME,
    element: <Layout />,
    errorElement: <NotFoundPage />,
    children: [
      {
        path: RoutePaths.HOME,
        element: <Home />,
      },
      {
        path: RoutePaths.UN_CONTROL_FORM,
        element: <UnControlForm />,
      },
      {
        path: RoutePaths.CONTROL_FORM,
        element: <ControlForm />,
      },
    ],
  },
];

const router = createBrowserRouter(routes);

const Routes = () => <RouterProvider router={router} />;

export default Routes;
