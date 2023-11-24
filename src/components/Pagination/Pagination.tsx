import { useRouter } from 'next/router';

import styles from './Pagination.module.scss';

interface Props {
  totalPages: number;
  onPageChange: (newPage: number) => void;
}

const Pagination: React.FC<Props> = ({ totalPages, onPageChange }) => {
  const router = useRouter();
  const page = typeof router.query.page === 'string' ? parseInt(router.query.page) : 1;

  const handleNextPage = () => {
    if (page < totalPages) {
      onPageChange(page + 1);
    }
  };

  const handlePrevPage = () => {
    if (page > 1) {
      onPageChange(page - 1);
    }
  };

  return (
    <div className={styles.root}>
      <button className={styles.prev} onClick={handlePrevPage} disabled={page <= 1}>
        Prev
      </button>
      <span className={styles.page}>
        <span className={styles.current}>{page}</span>
        из
        <span className={styles.total}>{totalPages}</span>
      </span>
      <button className={styles.next} onClick={handleNextPage} disabled={page >= totalPages}>
        Next
      </button>
    </div>
  );
};

export default Pagination;
