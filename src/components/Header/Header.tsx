// import { Link } from 'react-router-dom';

// import { RoutePaths } from '@/routes/routes.enum';
import { ErrorComponent } from '@/components/ErrorComponent';
import styles from './Header.module.scss';

interface Props {
  className?: string;
}

const Header: React.FC<Props> = ({ className }) => {
  const headerClass = !className ? styles.root : `${styles.root} ${className}`;

  return (
    <header className={headerClass}>
      <div className="container">
        {/* <Link to={RoutePaths.HOME}> */}
        <h1 className={styles.title}>Photo gallery</h1>
        {/* </Link> */}
        <span className={styles.subtitle}>search for unique photos</span>
        <ErrorComponent className={styles.error} />
      </div>
    </header>
  );
};

export default Header;
