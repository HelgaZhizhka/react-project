import { Link, useRouteError } from 'react-router-dom';
import { RoutePaths } from '@/routes/routes.enum';

import styles from './NotFoundPage.module.scss';

interface Error {
  message: string;
  status?: number;
}

const NotFoundPage: React.FC = () => {
  const error = useRouteError() as Error;

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
