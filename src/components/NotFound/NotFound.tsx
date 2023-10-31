import { Component } from 'react';

import styles from './NotFound.module.scss';

class NotFound extends Component {
  render() {
    return (
      <div className={styles.root}>
        <h1 className={styles.title}>404</h1>
        <p className={styles.subtitle}>Nothing was found.</p>
        <p className={styles.subtitle}>Try another query.</p>
      </div>
    );
  }
}

export default NotFound;
