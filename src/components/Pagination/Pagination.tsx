import styles from './Pagination.module.scss';

interface Props {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<Props> = ({ currentPage, totalPages, onPageChange }) => {
  const handleNextPage = () => {
    if (currentPage < totalPages) onPageChange(currentPage + 1);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) onPageChange(currentPage - 1);
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
