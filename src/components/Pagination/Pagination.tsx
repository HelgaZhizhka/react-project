import { useRouter } from 'next/router';

import { currentPage, defaultPerPage } from '@/lib/types/constants';
import { Button } from '@/components/Button';
import styles from './Pagination.module.scss';

type Props = {
  totalPages: number;
};

const Pagination: React.FC<Props> = ({ totalPages }) => {
  const router = useRouter();
  const { query = '', page = currentPage, per_page = defaultPerPage } = router.query;

  const onChange = (newPage: number) => {
    if (query) {
      router.push(`/?query=${query}&page=${newPage}&per_page=${per_page}`);
    } else {
      router.push(`/?page=${newPage}&per_page=${per_page}`);
    }
  };

  const handleClickNextPage = () => {
    if (+page < totalPages) {
      onChange(+page + 1);
    }
  };

  const handleClickPrevPage = () => {
    if (+page > 1) {
      onChange(+page - 1);
    }
  };

  if (totalPages === 0) {
    return null;
  }

  return (
    <div className={styles.root}>
      <Button className={styles.prev} disabled={+page <= 1} onClick={handleClickPrevPage}>
        Prev
      </Button>
      <span className={styles.page}>
        <span className={styles.current}>{page}</span>
        из
        <span className={styles.total}>{totalPages}</span>
      </span>
      <Button className={styles.next} disabled={+page >= totalPages} onClick={handleClickNextPage}>
        Next
      </Button>
    </div>
  );
};

export default Pagination;
