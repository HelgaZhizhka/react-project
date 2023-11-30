import { Link } from 'react-router-dom';

import { useAppSelector } from '@/hooks';
import { RoutePaths } from '@/routes/routes.enum';
import { Gallery } from '@/components/Gallery';

const Home: React.FC = () => {
  const formData = useAppSelector((state) => state.formData.values);

  return (
    <div>
      <Link to={RoutePaths.UN_CONTROL_FORM}>Form no control</Link>
      <Link to={RoutePaths.CONTROL_FORM}>Form control</Link>
      <Gallery data={formData} />
    </div>
  );
};

export default Home;
