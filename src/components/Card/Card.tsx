import { useState } from 'react';

import { Photo } from '../../utils/interfaces';
import { Spinner } from '../Spinner';
import styles from './Card.module.scss';

interface Props extends Photo {
  onItemClick?: () => void;
  isDetailed?: boolean;
}

const Card: React.FC<Props> = ({
  src,
  alt,
  avg_color,
  photographer,
  photographer_url,
  onItemClick,
  isDetailed = false,
}) => {
  const [loading, setLoading] = useState(true);

  const handleImageLoad = () => {
    setLoading(false);
  };

  const handleImageError = () => {
    setLoading(false);
  };

  return (
    <div
      className={`${styles.root} ${isDetailed ? styles.detailed : ''}`}
      onClick={() => onItemClick && onItemClick()}
    >
      <div className={styles.wrapper} style={{ backgroundColor: avg_color }}>
        <img
          className={`${styles.image} ${loading ? styles.hidden : ''}`}
          src={src.medium}
          alt={alt}
          onLoad={handleImageLoad}
          onError={handleImageError}
        />
      </div>

      {loading ? (
        <Spinner />
      ) : (
        <div className={styles.content}>
          {alt && <p className={styles.description}>{alt}</p>}
          {photographer && isDetailed && (
            <a href={photographer_url} target="_blank" rel="noopener noreferrer">
              <h2 className={styles.title}>{photographer}</h2>
            </a>
          )}
        </div>
      )}
    </div>
  );
};

export default Card;
