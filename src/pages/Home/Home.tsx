import { Component } from 'react';

import styles from './Home.module.scss';

class Home extends Component {
  render() {
    return (
      <div className={styles.container}>
        <h1>Home page</h1>
      </div>
    );
  }
}

export default Home;
