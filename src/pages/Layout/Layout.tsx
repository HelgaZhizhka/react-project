import { Outlet } from 'react-router-dom';

import { Header } from '../../components/Header';
import { Footer } from '../../components/Footer';
import styles from './Layout.module.scss';

const Layout: React.FC = () => {
  return (
    <>
      <Header />
      <main className={styles.root}>
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default Layout;
