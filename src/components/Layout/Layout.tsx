import { Work_Sans } from 'next/font/google';

import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

import styles from './Layout.module.scss';

const work = Work_Sans({ subsets: ['latin'] });

interface Prop {
  children: React.ReactNode;
}

const Layout: React.FC<Prop> = ({ children }) => (
  <div className={`${styles.root} ${work.className}`}>
    <Header />
    <main className={styles.page}>{children}</main>
    <Footer />
  </div>
);

export default Layout;
