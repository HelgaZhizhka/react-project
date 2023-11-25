import { useRouter } from 'next/router';
import Image from 'next/image';

import { Routes } from '@/utils/enums';
import { currentPage, defaultPerPage } from '@/utils/constants';
import { Photo } from '@/utils/interfaces';
import styles from './Card.module.scss';

type Props = {
  isDetailed?: boolean;
} & Photo;

const Card: React.FC<Props> = (props) => {
  const {
    id,
    src,
    width,
    height,
    alt,
    avg_color,
    photographer,
    photographer_url,
    isDetailed = false,
  } = props;

  const router = useRouter();
  const { query = '', page = currentPage, per_page = defaultPerPage } = router.query;

  const handleClickCard = () => {
    if (query) {
      router.push(
        `${Routes.ABOUT}/${id}?query=${query}&page=${page}&per_page=${per_page}`,
        undefined,
        {
          scroll: false,
        }
      );
    } else {
      router.push(`${Routes.ABOUT}/${id}?page=${page}&per_page=${per_page}`, undefined, {
        scroll: false,
      });
    }
  };

  return (
    <div
      className={`${styles.root} ${isDetailed ? styles.detailed : ''}`}
      role="listitem"
      onClick={!isDetailed ? handleClickCard : undefined}
    >
      <div className={styles.wrapper} style={{ backgroundColor: avg_color }}>
        <Image
          className={styles.image}
          src={!isDetailed ? src?.medium : src?.large}
          alt={alt}
          width={width}
          height={height}
          priority={isDetailed}
          placeholder="empty"
        />
      </div>

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
    </div>
  );
};

export default Card;
