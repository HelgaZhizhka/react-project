import { Link } from 'react-router-dom';

import { RoutePaths } from '@/routes/routes.enum';
import styles from './NotFoundPage.module.scss';

const NotFoundPage: React.FC = () => (
  <div className={styles.root}>
    <h1 className={styles.title}>404</h1>
    <p className={styles.subtitle}>Sorry, there&apos;s nothing here 🥲</p>
    <Link className={styles.link} to={RoutePaths.HOME}>
      Go to home page
    </Link>
  </div>
);

export default NotFoundPage;
