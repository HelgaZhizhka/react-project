import { Photo } from '@/utils/interfaces';
import { Card } from '@/components/Card';
import styles from './SearchResult.module.scss';

interface Props {
  searchResult: Photo[];
  currentPage: number;
}

const SearchResult: React.FC<Props> = ({ searchResult, currentPage }) => {
  return (
    <div className={styles.root}>
      {searchResult.map((photo: Photo) => (
        <Card key={photo.id} {...photo} currentPage={currentPage} />
      ))}
    </div>
  );
};

export default SearchResult;
