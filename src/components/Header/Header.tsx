import Link from 'next/link';

import { Routes } from '@/lib/types/enums';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import { ErrorComponent } from '@/components/ErrorComponent';
import styles from './Header.module.scss';

type Props = {
  className?: string;
};

const Header: React.FC<Props> = ({ className }) => {
  const headerClass = className ? `${styles.root} ${className}` : styles.root;

  return (
    <ErrorBoundary>
      <header className={headerClass}>
        <div className="container">
          <Link href={Routes.HOME}>
            <h1 className={styles.title}>Photo gallery</h1>
          </Link>
          <span className={styles.subtitle}>search for unique photos</span>
          <ErrorComponent className={styles.error} />
        </div>
      </header>
    </ErrorBoundary>
  );
};

export default Header;
