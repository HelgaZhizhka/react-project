import { Photo } from '@/utils/interfaces';
import { Card } from '@/components/Card';
import styles from './SearchResult.module.scss';

interface Props {
  searchResult: Photo[];
  onClickCard: (id: number) => void;
}

const SearchResult: React.FC<Props> = ({ searchResult, onClickCard }) => {
  return (
    <div className={styles.root}>
      {searchResult.map((photo: Photo) => (
        <Card key={photo.id} {...photo} onClickCard={onClickCard} />
      ))}
    </div>
  );
};

export default SearchResult;
