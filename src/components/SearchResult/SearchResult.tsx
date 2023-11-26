import { Photo } from '@/types/interfaces';
import { Card } from '@/components/Card';
import styles from './SearchResult.module.scss';

type Props = {
  photos: Photo[];
};

const SearchResult: React.FC<Props> = ({ photos }) => {
  if (!photos?.length) {
    return <div className={styles.root}>No cards available</div>;
  }

  return (
    <div className={styles.root}>
      {photos.map((photo: Photo) => (
        <Card key={photo.id} {...photo} />
      ))}
    </div>
  );
};

export default SearchResult;
