import { useRouter } from 'next/router';

import { Photo } from '@/utils/interfaces';
import { Card } from '@/components/Card';
import styles from './SearchResult.module.scss';

interface Props {
  searchResult: Photo[] | undefined;
}

const SearchResult: React.FC<Props> = ({ searchResult }) => {
  const router = useRouter();

  const handleNavigate = (detailsId: number) => {
    router.push(`/${detailsId}`);
  };

  if (!searchResult) {
    return <div className={styles.root}>No cards available</div>;
  }

  return (
    <div className={styles.root}>
      {searchResult.map((photo: Photo) => (
        <Card key={photo.id} {...photo} onClickCard={() => handleNavigate(photo.id)} />
      ))}
    </div>
  );
};

export default SearchResult;
