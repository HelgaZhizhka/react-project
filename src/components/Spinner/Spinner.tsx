import { Component } from 'react';

import styles from './Spinner.module.scss';

interface Props {
  children?: string;
  className?: string;
}

class Spinner extends Component<Props> {
  render() {
    const { className, children } = this.props;

    const spinnerClass = !className ? styles.root : `${styles.root} ${className}`;

    return (
      <div className={spinnerClass}>
        <div className={styles.spinner}>{children}</div>
      </div>
    );
  }
}

export default Spinner;
