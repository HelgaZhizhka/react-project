import { Component } from 'react';

import { Movie } from '../../types/interfaces';
import { Card } from '../Card';
import styles from './SearchResult.module.scss';

interface Props {
  results: Movie[];
}

class SearchResult extends Component<Props> {
  render() {
    return (
      <>
        {this.props.results.map((item: Movie) => (
          <div className={styles.card} key={item.id}>
            <Card {...item} />
          </div>
        ))}
      </>
    );
  }
}

export default SearchResult;
