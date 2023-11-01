import { Movie } from '../../utils/interfaces';
import { Card } from '../Card';
import styles from './SearchResult.module.scss';

interface Props {
  results: Movie[];
}

const SearchResult: React.FC<Props> = ({ results }) => {
  return (
    <>
      {results.map((item: Movie) => (
        <div className={styles.card} key={item.id}>
          <Card {...item} />
        </div>
      ))}
    </>
  );
};

export default SearchResult;
