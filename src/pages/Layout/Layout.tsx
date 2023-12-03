import { Outlet } from 'react-router-dom';

import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

const Layout: React.FC = () => (
  <main className="app">
    <Header />
    <Outlet />
    <Footer />
  </main>
);

export default Layout;
