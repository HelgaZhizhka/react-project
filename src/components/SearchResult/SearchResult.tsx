import { Photo } from '../../utils/interfaces';
import { Card } from '../Card';
import styles from './SearchResult.module.scss';

interface Props {
  results: Photo[];
}

const SearchResult: React.FC<Props> = ({ results }) => {
  return (
    <div className={styles.root}>
      {results.map((item: Photo) => (
        <Card key={item.id} {...item} />
      ))}
    </div>
  );
};

export default SearchResult;
