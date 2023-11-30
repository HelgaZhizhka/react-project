import { Link } from 'react-router-dom';

import { RoutePaths } from '@/routes/routes.enum';
import { Gallery } from '@/components/Gallery';

const Home: React.FC = () => (
  <div>
    <Link to={RoutePaths.UN_CONTROL_FORM}>Form no control</Link>
    <Link to={RoutePaths.CONTROL_FORM}>Form control</Link>
    <Gallery />
  </div>
);

export default Home;
