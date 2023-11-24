import { useRouter } from 'next/router';

import { Routes } from '@/utils/enums';
import { Photo } from '@/utils/interfaces';
import { Card } from '@/components/Card';
import styles from './SearchResult.module.scss';

interface Props {
  searchResult: Photo[] | undefined;
}

const SearchResult: React.FC<Props> = ({ searchResult }) => {
  const router = useRouter();
  const query = typeof router.query.query === 'string' ? router.query.query : '';
  const page = typeof router.query.page === 'string' ? parseInt(router.query.page) : 1;
  const per_page = typeof router.query.per_page === 'string' ? parseInt(router.query.per_page) : 10;

  const handleNavigate = (id: number) => {
    if (query && query !== '') {
      router.push(
        `${Routes.ABOUT}/${id}?query=${query}&page=${page}&per_page=${per_page}`,
        undefined,
        {
          scroll: false,
        }
      );
    } else {
      router.push(`${Routes.ABOUT}/${id}?page=${page}&per_page=${per_page}`, undefined, {
        scroll: false,
      });
    }
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
