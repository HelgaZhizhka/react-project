import { useState } from 'react';

import { Photo } from '../../utils/interfaces';
import { Spinner } from '../Spinner';
import styles from './Card.module.scss';

interface Props extends Photo {}

const assignSizeClass = (width: number, height: number): boolean => {
  const aspectRatio = width / height;

  return aspectRatio >= 1.5;
};

const Card: React.FC<Props> = ({
  width,
  height,
  src,
  photographer,
  url,
  photographer_url,
  avg_color,
  alt,
}) => {
  const [loading, setLoading] = useState(true);

  const handleImageLoad = () => {
    setLoading(false);
  };

  const handleImageError = () => {
    setLoading(false);
  };

  return (
    <div className={`${styles.root} ${assignSizeClass(width, height) ? styles.large : ''}`}>
      <div className={styles.wrapper} style={{ backgroundColor: avg_color }}>
        <a href={url} className={styles.link} target="_blank" rel="noreferrer">
          <img
            className={`${styles.image} ${loading ? styles.hidden : ''}`}
            src={src.medium}
            alt={alt}
            onLoad={handleImageLoad}
            onError={handleImageError}
          />
        </a>
      </div>

      {loading ? (
        <Spinner />
      ) : (
        <div className={styles.content}>
          {photographer && (
            <a href={photographer_url} target="_blank" rel="noreferrer">
              <h2 className={styles.title}>{photographer}</h2>
            </a>
          )}
          {alt && <p className={styles.description}>{alt}</p>}
        </div>
      )}
    </div>
  );
};

export default Card;
