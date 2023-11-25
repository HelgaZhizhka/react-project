// import { useRouter } from 'next/router';
// import Link from 'next/link';

import { Photo } from '@/utils/interfaces';
// import { currentPage, defaultPerPage } from '@/utils/constants';
import { Card } from '@/components/Card';
import styles from './SearchResult.module.scss';

type Props = {
  photos: Photo[];
};

const SearchResult: React.FC<Props> = ({ photos }) => {
  // const router = useRouter();
  // const { query = '', page = currentPage, per_page = defaultPerPage } = router.query;
  // const { id = '' } = router.query;

  if (!photos.length) {
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
