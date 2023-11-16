import { useContext } from 'react';

import { Photo } from '@/utils/interfaces';
import { SearchResultContext } from '@/contexts';
import { Card } from '@/components/Card';
import styles from './SearchResult.module.scss';

const SearchResult: React.FC = () => {
  const { searchResult, currentPage } = useContext(SearchResultContext);

  if (!searchResult?.length) {
    return <div>No cards available</div>;
  }

  return (
    <div className={styles.root}>
      {searchResult.map((photo: Photo) => (
        <Card key={photo.id} {...photo} currentPage={currentPage} />
      ))}
    </div>
  );
};

export default SearchResult;
