import { useState, useRef } from 'react';

import { Movie } from '../../utils/interfaces';
import { Button } from '../Button';
import { Spinner } from '../Spinner';
import avatar from './avatar.png';
import styles from './Card.module.scss';

interface Props extends Movie {}

const API_IMAGE_URL = import.meta.env.VITE_API_IMAGE_URL;
const DESCRIPTION_THRESHOLD = 300;

const Card: React.FC<Props> = ({ poster_path, title, release_date, overview, vote_average }) => {
  const [expanded, setExpanded] = useState(false);
  const [loading, setLoading] = useState(true);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const posterURL = poster_path ? `${API_IMAGE_URL}/w500${poster_path}` : avatar;

  const toggleDescription = () => {
    setExpanded((prevExpanded) => !prevExpanded);
  };

  const handleImageLoad = () => {
    setLoading(false);
  };

  const handleImageError = () => {
    setLoading(false);
  };

  return (
    <div className={styles.root}>
      <img
        className={`${styles.image} ${loading ? styles.hidden : ''}`}
        src={posterURL}
        alt={title}
        onLoad={handleImageLoad}
        onError={handleImageError}
      />

      {loading ? (
        <Spinner />
      ) : (
        <div className={styles.content}>
          <h2 className={styles.title}>{title}</h2>
          <p className={styles.release}>{release_date}</p>
          <p
            className={`${styles.description} ${expanded ? styles.expanded : ''}`}
            ref={descriptionRef}
          >
            {overview}
          </p>
          {overview.length >= DESCRIPTION_THRESHOLD && (
            <Button className={styles.toggleButton} onClick={toggleDescription}>
              {expanded ? 'Hide' : 'Show more'}
            </Button>
          )}
          {vote_average > 0 && <p className={styles.rating}>Rating: {vote_average}</p>}
        </div>
      )}
    </div>
  );
};

export default Card;
