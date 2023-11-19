import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { Details } from '@/components/Details';
// import { detailsLoader } from '@/components/Details/Details';
import { Layout } from '@/pages/Layout';
import { Home } from '@/pages/Home';
import { NotFoundPage } from '@/pages/NotFoundPage';
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
        children: [
          {
            path: `${RoutePaths.DETAILS}/${RoutePaths.DETAILS_ID}`,
            element: <Details />,
            // loader: detailsLoader,
          },
        ],
      },
    ],
  },
];

const router = createBrowserRouter(routes);

const AppRoutes = () => <RouterProvider router={router} />;

export default AppRoutes;
