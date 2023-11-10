import { useContext } from 'react';

import { Photo } from '@/utils/interfaces';
import { Card } from '@/components/Card';
import styles from './SearchResult.module.scss';
import { SearchResultContext } from '@/contexts';

const SearchResult: React.FC = () => {
  const { searchResult, onItemClick } = useContext(SearchResultContext);

  if (!searchResult) {
    return null;
  }

  return (
    <div className={styles.root}>
      {searchResult.map((item: Photo) => (
        <Card key={item.id} {...item} onItemClick={() => onItemClick(item.id)} />
      ))}
    </div>
  );
};

export default SearchResult;
