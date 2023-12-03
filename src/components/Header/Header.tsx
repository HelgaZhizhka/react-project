import { NavLink } from 'react-router-dom';

import { RoutePaths } from '@/routes/routes.enum';
import styles from './Header.module.scss';

const Header: React.FC = () => (
  <header className={styles.root}>
    <div className={`${styles.container} container`}>
      <NavLink to={RoutePaths.HOME} className={({ isActive }) => (isActive ? styles.active : '')}>
        <h1 className={styles.title}>Home</h1>
      </NavLink>
      <ul className={styles.menu}>
        <li className={styles.menuItem}>
          <NavLink
            to={RoutePaths.UN_CONTROL_FORM}
            className={({ isActive }) =>
              isActive ? `${styles.active} ${styles.link}` : styles.link
            }
          >
            No control form
          </NavLink>
        </li>
        <li className={styles.menuItem}>
          <NavLink
            to={RoutePaths.CONTROL_FORM}
            className={({ isActive }) =>
              isActive ? `${styles.active} ${styles.link}` : styles.link
            }
          >
            Control form
          </NavLink>
        </li>
      </ul>
    </div>
  </header>
);

export default Header;
