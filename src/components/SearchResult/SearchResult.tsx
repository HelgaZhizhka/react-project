import { useContext } from 'react';
import { Link } from 'react-router-dom';

import { Photo } from '@/utils/interfaces';
import { Card } from '@/components/Card';
import styles from './SearchResult.module.scss';
import { SearchResultContext } from '@/contexts';
import { RoutePaths } from '@/routes/routes.enum';

const SearchResult: React.FC = () => {
  const { searchResult, currentPage } = useContext(SearchResultContext);

  if (!searchResult?.length) {
    return <div>No cards available</div>;
  }

  return (
    <div className={styles.root}>
      {searchResult.map((photo: Photo) => (
        <Link key={photo.id} to={`${RoutePaths.DETAILS}/${photo.id}?page=${currentPage}`}>
          <Card {...photo} />
        </Link>
      ))}
    </div>
  );
};

export default SearchResult;
