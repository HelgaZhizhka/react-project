import styles from './NotFound.module.scss';

const NotFound: React.FC = () => {
  return (
    <div className={styles.root}>
      <p className={styles.subtitle}>Nothing was found.</p>
      <p className={styles.subtitle}>Try another query.</p>
    </div>
  );
};

export default NotFound;
