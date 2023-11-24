import { useRouter } from 'next/router';

import { useAppSelector } from '@/lib/redux/hooks';
import { Photo } from '@/utils/interfaces';
import { Card } from '@/components/Card';
import styles from './SearchResult.module.scss';
import { Routes } from '@/utils/enums';

interface Props {
  searchResult: Photo[] | undefined;
}

const SearchResult: React.FC<Props> = ({ searchResult }) => {
  const router = useRouter();
  const searchQuery = useAppSelector((state) => state.search.query);
  const currentPage = useAppSelector((state) => state.pagination.currentPage);
  const itemsPerPage = useAppSelector((state) => state.itemsPerPage.perPage);

  const handleNavigate = (id: number) => {
    if (searchQuery) {
      router.push(
        `${Routes.ABOUT}/${id}?query=${searchQuery}&page=${currentPage}&per_page=${itemsPerPage}`,
        undefined,
        {
          scroll: false,
        }
      );
    } else {
      router.push(`${Routes.ABOUT}/${id}?page=${currentPage}&per_page=${itemsPerPage}`, undefined, {
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
