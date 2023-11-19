import { createMemoryRouter } from 'react-router-dom';

import { Details } from '@/components/Details';
import { Layout } from '@/pages/Layout';
import { Home } from '@/pages/Home';
import { NotFoundPage } from '@/pages/NotFoundPage';
import { RoutePaths } from '@/routes/routes.enum';

export const createTestRouter = (initialEntries = ['/']) => {
  return createMemoryRouter([
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
              path: 'details/:id',
              element: <Details />,
            },
          ],
        },
      ],
    },
  ], {
    initialEntries,
  });
};