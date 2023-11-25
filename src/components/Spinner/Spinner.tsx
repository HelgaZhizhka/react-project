import { SIZE, SPINNER_VARIANT } from '@/types/types';
import styles from './Spinner.module.scss';

type Props = {
  size?: SIZE;
  variant?: SPINNER_VARIANT;
  className?: string;
} & React.PropsWithChildren<unknown>;

const Spinner: React.FC<Props> = (props) => {
  const { size = 'small', variant = 'local', className, children } = props;
  const spinnerClass = className ? `${styles.root} ${className}` : styles.root;

  return (
    <div className={`${spinnerClass} ${styles[size]} ${styles[variant]}`}>
      <div className={styles.spinner}>{children}</div>
    </div>
  );
};

export default Spinner;
