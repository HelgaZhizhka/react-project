import { Photo } from '../../utils/interfaces';
import { Card } from '../Card';
import styles from './SearchResult.module.scss';

interface Props {
  results: Photo[];
  onItemClick: (id: number) => void;
}

const SearchResult: React.FC<Props> = ({ results, onItemClick }) => {
  return (
    <div className={styles.root}>
      {results.map((item: Photo) => (
        <Card key={item.id} {...item} onItemClick={() => onItemClick(item.id)} />
      ))}
    </div>
  );
};

export default SearchResult;
