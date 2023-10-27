import { Component } from 'react';

import styles from './Spinner.module.scss';
import { SIZE, SPINNER_VARIANT } from '../../utils/types';

interface Props {
  size: SIZE;
  variant: SPINNER_VARIANT;
  children?: string;
  className?: string;
}

class Spinner extends Component<Props> {
  static defaultProps = {
    size: 'small',
    variant: 'local',
  };

  render() {
    const { className, children, size, variant } = this.props;

    const spinnerClass = !className ? styles.root : `${styles.root} ${className}`;

    return (
      <div className={`${spinnerClass} ${styles[size]} ${styles[variant]}`}>
        <div className={styles.spinner}>{children}</div>
      </div>
    );
  }
}

export default Spinner;
