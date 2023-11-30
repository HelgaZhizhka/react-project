import { Outlet } from 'react-router-dom';

// import { Header } from '@/components/Header';
// import { Footer } from '@/components/Footer';

// import styles from './Layout.module.scss';

const Layout: React.FC = () => (
  <div className="container">
    {/* // <Header /> */}
    <Outlet />
    {/* // <Footer /> */}
  </div>
);

export default Layout;
