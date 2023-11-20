// import { useState } from 'react';

import { Photo } from '@/utils/interfaces';
// import { Spinner } from '@/components/Spinner';
import styles from './Card.module.scss';

interface Props extends Photo {
  onClickCard?: (id: number) => void;
  isDetailed?: boolean;
}

const Card: React.FC<Props> = ({
  id,
  // src,
  alt,
  avg_color,
  photographer,
  photographer_url,
  onClickCard,
  isDetailed = false,
}) => {
  // const [loading, setLoading] = useState(true);

  // const handleImageLoad = () => {
  //   setLoading(false);
  // };

  // const handleImageError = () => {
  //   setLoading(false);
  // };

  const handleClick = () => {
    if (onClickCard) {
      onClickCard(id);
    }
  };

  return (
    <div
      className={`${styles.root} ${isDetailed ? styles.detailed : ''}`}
      role="listitem"
      onClick={handleClick}
    >
      <div className={styles.wrapper} style={{ backgroundColor: avg_color }}>
        {/* <img
          className={`${styles.image} ${loading ? styles.hidden : ''}`}
          src={src.medium}
          alt={alt}
          onLoad={handleImageLoad}
          onError={handleImageError}
        /> */}
      </div>

      {/* {loading ? (
        <Spinner />
      ) : ( */}
      <div className={styles.content}>
        {photographer && !isDetailed && (
          <h2 className={styles.title}>Photographer: {photographer}</h2>
        )}

        {isDetailed && (
          <>
            {alt && <p className={styles.description}>{alt}</p>}
            <a href={photographer_url} target="_blank" rel="noopener noreferrer">
              <h2 className={styles.title}>{photographer}</h2>
            </a>
          </>
        )}
      </div>
      {/* )} */}
    </div>
  );
};

export default Card;
