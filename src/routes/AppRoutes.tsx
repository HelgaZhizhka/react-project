import { Route, Routes } from 'react-router-dom';

import { Home } from '../pages/Home';
import { Details } from '../pages/Details';
import { NotFoundPage } from '../pages/NotFoundPage';
import { RoutePaths } from './routes.enum';
import { Layout } from '../pages/Layout';

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path={RoutePaths.HOME} element={<Layout />}>
        <Route index element={<Home />} />
        <Route path={RoutePaths.DETAILS} element={<Details />} />
        <Route path={RoutePaths.ERROR} element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
