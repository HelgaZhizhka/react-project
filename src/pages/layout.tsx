import { Gallery } from '@/components/Gallery';
import styles from '@/styles/Home.module.scss';

interface Prop {
  children?: React.ReactNode;
}

const LayoutHome: React.FC<Prop> = ({ children }) => {
  return (
    <>
      <div className={styles.root}>
        <div className="container">
          <div className={styles.section}>
            <Gallery />
          </div>
        </div>
      </div>
      {children}
    </>
  );
};

export default LayoutHome;
