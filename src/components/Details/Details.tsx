import { useNavigate, useParams } from 'react-router-dom';

import { useAppSelector } from '@/hooks';
import { useGetPhotoQuery } from '@/api/apiService';
import { RoutePaths } from '@/routes/routes.enum';
import { Spinner } from '@/components/Spinner';
import { Button } from '@/components/Button';
import { Card } from '@/components/Card';
import styles from './Details.module.scss';

const Details: React.FC = () => {
  const currentPage = useAppSelector((state) => state.pagination.currentPage);
  const searchValue = useAppSelector((state) => state.search.query);

  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { data: photo, isLoading, isError } = useGetPhotoQuery(id ? Number(id) : 0);

  if (isLoading || isError || !photo)
    return (
      <aside className={styles.root}>
        <div className={styles.container} role="loader">
          <Spinner />
        </div>
      </aside>
    );

  const handleCloseDetails = () => {
    if (searchValue) {
      navigate(`${RoutePaths.HOME}?query=${searchValue}&page=${currentPage}`, { replace: true });
    } else {
      navigate(`${RoutePaths.HOME}?page=${currentPage}`, { replace: true });
    }
  };

  return (
    <aside className={styles.root}>
      <div className={styles.container}>
        <Button className={styles.close} onClick={handleCloseDetails}>
          Close
        </Button>
        <Card {...photo} isDetailed={true} />
      </div>
    </aside>
  );
};

export default Details;
