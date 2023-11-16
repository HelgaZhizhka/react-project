import { Link, useRouteError } from 'react-router-dom';
import { RoutePaths } from '@/routes/routes.enum';

import { ApiError } from '@/utils/interfaces';
import styles from './NotFoundPage.module.scss';

const NotFoundPage: React.FC = () => {
  const error = useRouteError() as ApiError;

  return (
    <div className={styles.root}>
      {error.status && <h1 className={styles.title}>{error.status}</h1>}
      <p className={styles.subtitle}>Sorry, there&apos;s nothing here 🥲</p>
      {error.message && <p>{error.message}</p>}
      <Link className={styles.link} to={RoutePaths.HOME}>
        Go to home page
      </Link>
    </div>
  );
};

export default NotFoundPage;
