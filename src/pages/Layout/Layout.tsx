import { Outlet, useSearchParams } from 'react-router-dom';

import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

import styles from './Layout.module.scss';

const Layout: React.FC = () => {
  const [searchParams] = useSearchParams();
  const id = searchParams.get('id');

  return (
    <>
      <Header />
      <main className={`${styles.root} ${id ? styles.isDetailed : ''}`}>
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default Layout;
