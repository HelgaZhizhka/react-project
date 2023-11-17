import { useAppDispatch, useAppSelector } from '@/hooks';
import { setCurrentPage } from '@/features/pagination/paginationSlice';
import styles from './Pagination.module.scss';

interface Props {
  onPageChange: (newPage: number) => void;
}

const Pagination: React.FC<Props> = ({ onPageChange }) => {
  const dispatch = useAppDispatch();
  const currentPage = useAppSelector((state) => state.pagination.currentPage);
  const totalPages = useAppSelector((state) => state.pagination.totalPages);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
      dispatch(setCurrentPage(currentPage + 1));
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
      dispatch(setCurrentPage(currentPage - 1));
    }
  };

  return (
    <div className={styles.root}>
      <button className={styles.prev} onClick={handlePrevPage} disabled={currentPage <= 1}>
        Prev
      </button>
      <span className={styles.page}>
        <span className={styles.current}>{currentPage}</span>
        из
        <span className={styles.total}>{totalPages}</span>
      </span>
      <button className={styles.next} onClick={handleNextPage} disabled={currentPage >= totalPages}>
        Next
      </button>
    </div>
  );
};

export default Pagination;
