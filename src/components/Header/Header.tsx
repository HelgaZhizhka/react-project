import { ErrorComponent } from '../ErrorComponent';
import styles from './Header.module.scss';

interface Props {
  className?: string;
}

const Header: React.FC<Props> = ({ className }) => {
  const headerClass = !className ? styles.root : `${styles.root} ${className}`;

  return (
    <header className={headerClass}>
      <div className="container">
        <h1 className={styles.title}>Photo gallery</h1>
        <span className={styles.subtitle}>search for unique photos</span>
        <ErrorComponent className={styles.error} />
      </div>
    </header>
  );
};

export default Header;
