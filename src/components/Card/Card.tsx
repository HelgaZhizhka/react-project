import { Component } from 'react';

import { Movie } from '../../utils/interfaces';
import { Button } from '../Button';
import avatar from './avatar.png';
import styles from './Card.module.scss';

interface State {
  expanded: boolean;
}

class Card extends Component<Movie, State> {
  state = {
    expanded: false,
  };

  toggleDescription = () => {
    this.setState((prevState) => ({ expanded: !prevState.expanded }));
  };

  render() {
    const API_IMAGE_URL = import.meta.env.VITE_API_IMAGE_URL;

    const { poster_path, title, release_date, overview, vote_average } = this.props;

    const posterURL = poster_path ? `${API_IMAGE_URL}/w500${poster_path}` : avatar;

    const { expanded } = this.state;

    return (
      <div className={styles.root}>
        <img className={styles.image} src={posterURL} alt={title} />
        <div className={styles.content}>
          <h2 className={styles.title}>{title}</h2>
          <p className={styles.release}>{release_date}</p>
          <p
            className={styles.description}
            style={{ maxHeight: expanded ? 'none' : '120px', overflow: 'hidden' }}
          >
            {overview}
          </p>
          {overview.length > 100 && (
            <Button className={styles.toggleButton} onClick={this.toggleDescription}>
              {expanded ? 'Hide' : 'Show more'}
            </Button>
          )}
          {vote_average > 0 && <p className={styles.rating}>Rating: {vote_average}</p>}
        </div>
      </div>
    );
  }
}

export default Card;
