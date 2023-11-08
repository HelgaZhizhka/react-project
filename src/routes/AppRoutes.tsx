import { Route, Routes } from 'react-router-dom';

import { Details } from '@/components/Details';
import { Layout } from '@/pages/Layout';
import { Home } from '@/pages/Home';
import { NotFoundPage } from '@/pages/NotFoundPage';
import { RoutePaths } from './routes.enum';

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path={RoutePaths.HOME} element={<Layout />}>
        <Route path={RoutePaths.HOME} element={<Home />}>
          <Route path={RoutePaths.DETAILS} element={<Details />} />
        </Route>
        <Route path={RoutePaths.ERROR} element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
